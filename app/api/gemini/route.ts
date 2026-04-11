import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Models
function getModel() {
    return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

// Helper to safely parse JSON from Gemini responses that may be truncated or wrapped in markdown
function safeParseJSON(text: string): any {
    // Strip markdown code fences if present
    let cleaned = text.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
    cleaned = cleaned.trim();

    try {
        return JSON.parse(cleaned);
    } catch {
        // Try to extract a JSON array
        const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
        if (arrayMatch) {
            try {
                return JSON.parse(arrayMatch[0]);
            } catch {
                // JSON might be truncated — try to repair by closing open strings/objects
                return repairAndParseArray(arrayMatch[0]);
            }
        }
        return null;
    }
}

// Attempt to repair a truncated JSON array by finding the last complete object
function repairAndParseArray(text: string): any[] | null {
    // Find the last complete object boundary (closing })
    let lastClose = text.lastIndexOf('}');
    while (lastClose > 0) {
        const candidate = text.substring(0, lastClose + 1) + ']';
        try {
            const parsed = JSON.parse(candidate);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {
            // keep searching
        }
        lastClose = text.lastIndexOf('}', lastClose - 1);
    }
    return null;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, prompt, fileContent, fileBase64, fileType } = body;

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "GEMINI_API_KEY não configurada" }, { status: 500 });
        }

        const model = getModel();

        if (action === "create_product") {
            return await handleCreateProduct(model, prompt);
        } else if (action === "extract_from_file") {
            return await handleExtractFromFile(model, fileContent, fileBase64, fileType);
        } else if (action === "search_image") {
            return await handleSearchImage(prompt);
        } else {
            return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            { error: error.message || "Erro no processamento" },
            { status: 500 }
        );
    }
}

async function handleCreateProduct(model: any, prompt: string) {
    const systemPrompt = `Tu és um ESPECIALISTA MUNDIAL em perfumaria, cosmética e beleza profissional. Trabalhas com a loja SF Cosmetics.

CONHECIMENTO OBRIGATÓRIO:
- Conheces TODAS as marcas: árabes (Lattafa, Armaf, Al Haramain, Swiss Arabian, Afnan, Ajmal, Ard Al Zaafaran, Al Rehab), europeias (Chanel, Dior, Tom Ford, Creed, Nishane, Xerjoff, Amouage, Jean Paul Gaultier, Versace, Dolce & Gabbana, Paco Rabanne, Hugo Boss, Calvin Klein, Armani, YSL), nicho (Byredo, Le Labo, Maison Margiela, Parfums de Marly, Initio, MFK), brasileiras (O Boticário, Natura), e todas as outras.
- Para cada perfume, DEVES saber as notas olfativas CORRETAS (topo, coração, base), concentração, família olfativa, e país de origem.
- Se o utilizador pede "Asad Bourbon" SABES que é da marca Lattafa (árabe), com notas de baunilha, tabaco, lavanda — NÃO inventes marcas nem mistures com outras.
- Se o utilizador pede perfumes árabes, dá APENAS perfumes de casas árabes reais.
- Se o utilizador pede uma marca específica, responde APENAS com produtos reais dessa marca.

CAMPOS A DEVOLVER (JSON):
- name: nome completo e real do produto (string)
- brand: marca REAL do produto (string) — NUNCA inventes marcas
- description: descrição em português (string, 2-3 frases profissionais)
- long_description: descrição detalhada em português (string, parágrafo completo com informações do perfume/produto)
- price: preço em euros realista para o mercado português (número)
- category: perfumes | corpo | rosto | cabelo | maquiagem | bijuteria | aparelhos | outros
- subcategory: para perfumes usa "Masculino", "Feminino" ou "Unissexo"; para outros, subcategoria relevante (string)
- gender: "Masculino", "Feminino" ou "Unissexo" (string)
- volume: ex. "100ml", "50ml", "200ml" (string)
- concentration: "Eau de Parfum", "Eau de Toilette", "Parfum", "Extrait de Parfum", etc. (string)
- fragrance_family: "Oriental", "Floral", "Woody", "Fresh", "Aromatic", "Chypre", "Gourmand", "Fougère", etc. (string)
- top_notes: notas de topo separadas por vírgula (string) — devem ser as REAIS do produto
- heart_notes: notas de coração separadas por vírgula (string)
- base_notes: notas de base separadas por vírgula (string)
- origin_country: país de origem da marca (string)
- stock: 20 por defeito (número)
- image_url: "" (string vazia)
- show_on_home: false (boolean)
- rating: avaliação realista de 3.5 a 5.0 (número)
- review_count: número realista de avaliações (número)

Se não for perfume (corpo, rosto, cabelo, etc.), adapta os campos — omite notas, concentração, etc., mas inclui brand, volume, e descrições detalhadas.

REGRAS:
- Só produtos REAIS que existam no mercado
- Notas olfativas CORRETAS (não inventar)
- Preços realistas para Portugal
- Responde APENAS com JSON (array), sem texto extra, sem markdown, sem \`\`\`json`;

    const result = await model.generateContent([systemPrompt, `Pedido: ${prompt}`]);
    const text = result.response.text().trim();

    const products = safeParseJSON(text);
    if (products) {
        const arr = Array.isArray(products) ? products : [products];
        const withImages = await searchImagesForProducts(arr);
        return NextResponse.json({ products: withImages });
    }
    return NextResponse.json({ error: "Resposta inválida do Gemini", raw: text.substring(0, 500) }, { status: 500 });
}

async function handleExtractFromFile(model: any, fileContent: string | undefined, fileBase64: string | undefined, fileType: string) {
    const systemPrompt = `Tu és um ESPECIALISTA MUNDIAL em perfumaria, cosmética e beleza. Analisa este catálogo (${fileType}) e extrai TODOS os produtos.

Para CADA produto encontrado, usa o teu conhecimento profissional para preencher:
- name, brand, description, long_description, price, category, subcategory, gender, volume, concentration
- fragrance_family, top_notes, heart_notes, base_notes (notas REAIS baseadas no teu conhecimento)
- origin_country, stock (20), image_url (""), show_on_home (false), rating, review_count

Categorias: perfumes, corpo, rosto, cabelo, maquiagem, bijuteria, aparelhos, outros

REGRAS:
- Extrai até 50 produtos mais relevantes
- Usa informações REAIS — se reconheces o produto, preenche as notas olfativas corretas
- Preços realistas para Portugal
- JSON válido (array), sem texto extra, sem markdown
- Se não encontrares produtos, devolve []`;

    let result;

    if (fileBase64) {
        const parts = [
            { text: systemPrompt },
            { inlineData: { mimeType: "application/pdf", data: fileBase64 } },
            { text: "Extrai todos os produtos deste catálogo PDF com o máximo de detalhe." }
        ];
        result = await model.generateContent(parts);
    } else if (fileContent) {
        const truncated = fileContent.length > 30000 ? fileContent.substring(0, 30000) + "\n...[truncado]" : fileContent;
        result = await model.generateContent([systemPrompt, `Conteúdo:\n${truncated}`]);
    } else {
        return NextResponse.json({ error: "Nenhum conteúdo fornecido" }, { status: 400 });
    }

    const text = result.response.text().trim();
    const products = safeParseJSON(text);
    if (products) {
        const arr = Array.isArray(products) ? products : [products];
        const withImages = await searchImagesForProducts(arr);
        return NextResponse.json({ products: withImages });
    }
    return NextResponse.json({ error: "Não foi possível extrair produtos", raw: text.substring(0, 500) }, { status: 500 });
}

// ============ IMAGE SEARCH (3 TARGETED IMAGES PER PRODUCT) ============

const SEARCH_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
};

// Search 3 specific images per product: bottle only, with box, notes/lifestyle
async function searchImagesForProducts(products: any[]): Promise<any[]> {
    const results = [...products];

    const batchSize = 2;
    for (let i = 0; i < results.length; i += batchSize) {
        const batch = results.slice(i, i + batchSize);
        const imagePromises = batch.map(async (product, idx) => {
            if (product.image_url && product.images?.length) return;
            try {
                const name = product.brand
                    ? `${product.brand} ${product.name}`
                    : product.name;

                // Build a natural ingredients query from the actual fragrance notes
                const notesParts: string[] = [];
                if (product.top_notes) notesParts.push(...product.top_notes.split(',').slice(0, 2).map((n: string) => n.trim()));
                if (product.heart_notes) notesParts.push(...product.heart_notes.split(',').slice(0, 2).map((n: string) => n.trim()));
                if (product.base_notes) notesParts.push(...product.base_notes.split(',').slice(0, 2).map((n: string) => n.trim()));
                const ingredientsQuery = notesParts.length > 0
                    ? `${notesParts.join(' ')} ingredients botanical flat lay aesthetic`
                    : `perfume ingredients spices flowers botanical aesthetic`;

                // 3 targeted searches in parallel
                const [bottleImg, boxImg, notesImg] = await Promise.all([
                    // 1. Just the bottle (clean product shot)
                    searchDuckDuckGoFirstImage(`${name} perfume bottle product photo`),
                    // 2. With box/packaging
                    searchDuckDuckGoFirstImage(`${name} perfume with box packaging`),
                    // 3. Real ingredients artistic photo (vanilla pods, flowers, spices etc.)
                    searchDuckDuckGoFirstImage(ingredientsQuery),
                ]);

                const imageUrls = [bottleImg, boxImg, notesImg].filter(Boolean) as string[];

                if (imageUrls.length > 0) {
                    results[i + idx] = {
                        ...results[i + idx],
                        image_url: imageUrls[0],
                        images: imageUrls,
                    };
                }
            } catch (e) {
                console.error(`Image search failed for ${product.name}:`, e);
            }
        });
        await Promise.all(imagePromises);
    }

    return results;
}

// Get the FIRST (best) image result from DuckDuckGo for a specific query
async function searchDuckDuckGoFirstImage(query: string): Promise<string | null> {
    try {
        const tokenRes = await fetch(
            `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`,
            { headers: SEARCH_HEADERS }
        );
        const html = await tokenRes.text();
        const vqdMatch = html.match(/vqd=["']([^"']+)["']/i) || html.match(/vqd=([\d-]+)/i);
        if (!vqdMatch) return null;

        const imagesUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqdMatch[1]}&f=,,,,,&p=1`;
        const imagesRes = await fetch(imagesUrl, {
            headers: { ...SEARCH_HEADERS, 'Referer': 'https://duckduckgo.com/' },
        });
        const data = await imagesRes.json();

        if (data.results && data.results.length > 0) {
            // Return the best (first) result — prefer full image over thumbnail
            const first = data.results[0];
            return first.image || first.thumbnail || null;
        }
        return null;
    } catch (e) {
        console.error("DDG image search error:", e);
        return null;
    }
}

// Full DDG search for the manual "search_image" action from admin
async function searchDuckDuckGoImages(query: string, count: number = 6): Promise<string[]> {
    try {
        const tokenRes = await fetch(
            `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`,
            { headers: SEARCH_HEADERS }
        );
        const html = await tokenRes.text();
        const vqdMatch = html.match(/vqd=["']([^"']+)["']/i) || html.match(/vqd=([\d-]+)/i);
        if (!vqdMatch) return [];

        const imagesUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqdMatch[1]}&f=,,,,,&p=1`;
        const imagesRes = await fetch(imagesUrl, {
            headers: { ...SEARCH_HEADERS, 'Referer': 'https://duckduckgo.com/' },
        });
        const data = await imagesRes.json();

        if (data.results && data.results.length > 0) {
            return data.results
                .slice(0, count)
                .map((r: any) => r.image || r.thumbnail)
                .filter(Boolean);
        }
        return [];
    } catch (e) {
        console.error("DuckDuckGo image search error:", e);
        return [];
    }
}

async function handleSearchImage(productName: string) {
    const images = await searchDuckDuckGoImages(productName, 6);
    return NextResponse.json({ images });
}

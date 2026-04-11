"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/shop";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/product-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Filter,
    Search,
    X,
    ChevronDown
} from "lucide-react";
import { Header } from "@/components/client/header";
import { Footer } from "@/components/client/footer";
import { cn } from "@/lib/utils";

// Mapping category slugs to display names
const CATEGORY_NAMES: Record<string, string> = {
    "perfumes": "Perfumes",
    "corpo": "Corpo",
    "rosto": "Rosto",
    "cabelo": "Cabelo",
    "maquiagem": "Maquilhagem",
    "bijuteria": "Bijuteria",
    "aparelhos": "Aparelhos",
    "outros": "Outros",
    "all": "Todos os Produtos"
};

// Custom descriptions per category
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    "perfumes": "Descubra a sua assinatura olfativa com a nossa coleção de fragrâncias exclusivas. Aromas que marcam presença e definem a sua identidade.",
    "corpo": "Mime o seu corpo com texturas luxuosas e aromas envolventes. Hidratação e cuidado para uma pele suave.",
    "rosto": "Cuide da sua pele com produtos de alta performance. Rotinas personalizadas para uma pele radiante e saudável.",
    "cabelo": "Transforme o seu cabelo com tratamentos profissionais. Nutrição, brilho e força para todos os tipos de cabelo.",
    "maquiagem": "Expresse a sua criatividade e realce a sua beleza natural com a nossa seleção de maquilhagem premium.",
    "bijuteria": "Complete o seu look com a nossa coleção de bijuteria elegante. Detalhes que fazem a diferença.",
    "aparelhos": "Equipamento profissional de alta qualidade. Secadores, planchas, máquinas de corte e muito mais.",
    "outros": "Produtos variados para complementar a sua rotina de beleza.",
    "all": "Explore todos os nossos produtos e encontre os seus favoritos."
};

// Mapping URL tags (from header) to Subcategory Checkbox Filters
// URL Tag -> Checkbox Label
const TAG_TO_SUBCATEGORY: Record<string, string> = {
    // Perfumes
    "feminino": "Feminino",
    "masculino": "Masculino",
    "unisex": "Unisex",

    // Corpo
    "hidratante": "Hidratantes",
    "esfoliante": "Esfoliantes",
    "maos-pes": "Mãos e Pés",
    "banho": "Banho",

    // Rosto
    "limpeza": "Limpeza",
    "serum": "Séruns",
    "mascara": "Máscaras",
    "protetor-solar": "Protetor Solar",

    // Cabelo
    "champo": "Champôs",
    "condicionador": "Condicionadores",
    "tratamento": "Tratamentos",
    "styling": "Styling",
    "oleo": "Óleos",

    // Maquilhagem
    "rosto": "Rosto",
    "olhos": "Olhos",
    "labios": "Lábios",
    "pinceis": "Pincéis",

    // Bijuteria
    "colar": "Colares",
    "pulseira": "Pulseiras",
    "anel": "Anéis",
    "brincos": "Brincos"
};


// Category hero images
const CATEGORY_HEROES: Record<string, string> = {
    "perfumes": "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2000&auto=format&fit=crop",
    "corpo": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2000&auto=format&fit=crop",
    "rosto": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2000&auto=format&fit=crop",
    "cabelo": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=2000&auto=format&fit=crop",
    "maquiagem": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2000&auto=format&fit=crop",
    "bijuteria": "https://images.unsplash.com/photo-1515562141589-67f0d569b6d2?q=80&w=2000&auto=format&fit=crop",
    "aparelhos": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2000&auto=format&fit=crop",
    "all": "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2000&auto=format&fit=crop",
};

// Static subcategories for demo/filtering
const SUBCATEGORIES_BY_CATEGORY: Record<string, string[]> = {
    "perfumes": ["Feminino", "Masculino", "Unisex", "Sets", "Eau de Parfum", "Eau de Toilette"],
    "corpo": ["Hidratantes", "Banho", "Esfoliantes", "Mãos e Pés"],
    "rosto": ["Limpeza", "Séruns", "Máscaras", "Protetor Solar", "Hidratantes"],
    "cabelo": ["Champôs", "Condicionadores", "Tratamentos", "Styling", "Óleos", "Coloração"],
    "maquiagem": ["Rosto", "Olhos", "Lábios", "Unhas", "Pincéis"],
    "bijuteria": ["Colares", "Brincos", "Anéis", "Pulseiras"],
    "aparelhos": ["Secadores", "Planchas", "Máquinas de Corte", "Modeladores"],
    "outros": [],
    "all": []
};

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams(); // To read ?tag=...

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [sortBy, setSortBy] = useState("newest");
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

    // Search
    const [searchQuery, setSearchQuery] = useState("");

    const supabase = createClient();

    const categorySlug = params.category as string;
    const categoryName = categorySlug ? (CATEGORY_NAMES[categorySlug] || decodeURIComponent(categorySlug)) : "";
    const categoryDescription = CATEGORY_DESCRIPTIONS[categorySlug] || "Produtos selecionados para si.";

    // Available subcategories for current view
    const availableSubcategories = SUBCATEGORIES_BY_CATEGORY[categorySlug] || [];

    // Initialize filters from URL
    useEffect(() => {
        const tag = searchParams.get("tag");
        if (tag) {
            const mappedSub = TAG_TO_SUBCATEGORY[tag];
            if (mappedSub && availableSubcategories.includes(mappedSub)) {
                setSelectedSubcategories([mappedSub]);
            }
        } else {
            setSelectedSubcategories([]);
        }
    }, [searchParams, categorySlug]); // Re-run when URL search params change or category changes

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            let query = supabase.from('products').select('*');

            if (categorySlug && categorySlug !== 'all') {
                query = query.eq('category', categorySlug);
            }

            const { data, error } = await query;

            if (data) {
                // Enrich data with subcategories for demo if missing in DB
                const enrichedData = data.map(p => {
                    if (p.subcategory) return p;
                    // Fallback: Assign a random subcategory from the available list
                    const subs = SUBCATEGORIES_BY_CATEGORY[p.category] || [];
                    if (subs.length > 0) {
                        // Weighted random logic for Perfumes to ensure user sees Feminino/Masculino
                        if (p.category === 'perfumes') {
                            const types = ["Feminino", "Masculino", "Unisex", "Eau de Parfum"];
                            const randomType = types[Math.floor(Math.random() * types.length)];
                            return { ...p, subcategory: randomType };
                        }
                        if (p.category === 'cabelo') {
                            const types = ["Champôs", "Condicionadores", "Tratamentos"];
                            const randomType = types[Math.floor(Math.random() * types.length)];
                            return { ...p, subcategory: randomType };
                        }

                        const randomSub = subs[Math.floor(Math.random() * subs.length)];
                        return { ...p, subcategory: randomSub };
                    }
                    return p;
                });
                setProducts(enrichedData);
            }
            setLoading(false);
        }
        if (categorySlug) {
            fetchProducts();
        }
    }, [categorySlug]);



    const toggleSubcategory = (sub: string) => {
        setSelectedSubcategories(prev =>
            prev.includes(sub)
                ? prev.filter(s => s !== sub)
                : [...prev, sub]
        );
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSubcategory = selectedSubcategories.length === 0 ||
                (product.subcategory && selectedSubcategories.includes(product.subcategory));

            return matchesPrice && matchesSearch && matchesSubcategory;
        }).sort((a, b) => {
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
            return 0; // Default (newest)
        });
    }, [products, priceRange, sortBy, searchQuery, selectedSubcategories]);


    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="h-[calc(100vh-112px)] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden">
            <Header />

            {/* Category Hero Banner */}
            <div className="relative h-[35vh] min-h-[250px] w-full bg-gray-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${CATEGORY_HEROES[categorySlug] || CATEGORY_HEROES["all"]}')` }}
                />
                <div className="relative z-20 text-center px-6">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Coleção</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-3">
                        {categoryName}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto font-light">
                        {categoryDescription}
                    </p>
                </div>
            </div>

            <main className="w-full px-4 sm:px-6 lg:px-10 py-10">

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar Filters - Sephora Style (Left) */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">

                        {/* Subcategories */}
                        {availableSubcategories.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                                    Categorias
                                </h3>
                                <div className="space-y-3">
                                    {availableSubcategories.map((sub) => (
                                        <div key={sub} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={`sub-${sub}`}
                                                checked={selectedSubcategories.includes(sub)}
                                                onCheckedChange={() => toggleSubcategory(sub)}
                                                className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white rounded-sm h-4 w-4"
                                            />
                                            <label
                                                htmlFor={`sub-${sub}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-gray-600"
                                            >
                                                {sub}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Price Filter */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                                Preço
                            </h3>
                            <Slider
                                defaultValue={[0, 500]}
                                max={500}
                                step={5}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="py-2"
                            />
                            <div className="flex items-center justify-between text-xs font-medium text-gray-900">
                                <span>€{priceRange[0]}</span>
                                <span>€{priceRange[1]}+</span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content (Right) */}
                    <div className="flex-1">

                        {/* Toolbar: Sort & Count */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-900">
                                    {filteredProducts.length} produtos
                                </span>
                                {selectedSubcategories.length > 0 && (
                                    <span className="text-xs text-gray-500">• Filtrado por {selectedSubcategories.length} categoria(s)</span>
                                )}
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="w-full sm:w-64">
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="h-11 w-full rounded-none border-gray-200 bg-white text-xs uppercase tracking-widest font-bold text-black focus:ring-0 focus:ring-offset-0 border-black/10 hover:border-black/30 transition-all px-0 flex justify-center items-center text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <SelectValue placeholder="Ordenar por" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-100 shadow-xl rounded-lg">
                                            <SelectItem value="newest" className="justify-center text-center py-2.5 focus:bg-gray-50 cursor-pointer pl-2">
                                                Mais Recentes
                                            </SelectItem>
                                            <SelectItem value="price_asc" className="justify-center text-center py-2.5 focus:bg-gray-50 cursor-pointer pl-2">
                                                Preço: Menor para Maior
                                            </SelectItem>
                                            <SelectItem value="price_desc" className="justify-center text-center py-2.5 focus:bg-gray-50 cursor-pointer pl-2">
                                                Preço: Maior para Menor
                                            </SelectItem>
                                            <SelectItem value="name_asc" className="justify-center text-center py-2.5 focus:bg-gray-50 cursor-pointer pl-2">
                                                Nome (A-Z)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>


                        {/* Active Filters Tags */}
                        {selectedSubcategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedSubcategories.map(sub => (
                                    <div key={sub} className="flex items-center gap-1 bg-gray-100 text-xs font-bold px-3 py-1 rounded-full animate-in fade-in zoom-in duration-200">
                                        {sub}
                                        <button onClick={() => toggleSubcategory(sub)} className="hover:text-red-500 ml-1">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setSelectedSubcategories([])}
                                    className="text-xs font-bold underline hover:text-gray-600 ml-2"
                                >
                                    Limpar tudo
                                </button>
                            </div>
                        )}


                        {/* Product Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-32 bg-gray-50">
                                <p className="text-gray-500 mb-4">Nenhum produto encontrado com estes filtros.</p>
                                <Button
                                    variant="outline"
                                    className="border-black text-black hover:bg-black hover:text-white transition-colors uppercase text-xs font-bold tracking-widest px-8"
                                    onClick={() => {
                                        setPriceRange([0, 500]);
                                        setSearchQuery("");
                                        setSortBy("newest");
                                        setSelectedSubcategories([]);
                                    }}
                                >
                                    Limpar Filtros
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

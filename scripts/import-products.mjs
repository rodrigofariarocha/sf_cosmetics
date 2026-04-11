/**
 * Script de Importação de Produtos via CSV para Supabase
 * 
 * Uso:
 *   node scripts/import-products.mjs data/template-produtos.csv
 * 
 * Requisitos:
 *   Ficheiro .env com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load env
const envPath = resolve(process.cwd(), '.env.local');
let envContent;
try {
    envContent = readFileSync(envPath, 'utf-8');
} catch {
    envContent = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
}
const env = {};
for (const line of envContent.split('\n')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
    }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não encontradas no .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Get CSV file path from args
const csvPath = process.argv[2];
if (!csvPath) {
    console.error('❌ Uso: node scripts/import-products.mjs <caminho-do-csv>');
    console.error('   Exemplo: node scripts/import-products.mjs data/template-produtos.csv');
    process.exit(1);
}

// Parse CSV
function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
        console.error('❌ CSV vazio ou sem dados');
        process.exit(1);
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        const values = [];
        let current = '';
        let inQuotes = false;

        for (const char of lines[i]) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());

        if (values.length === headers.length) {
            const row = {};
            headers.forEach((header, idx) => {
                row[header] = values[idx]?.replace(/^"|"$/g, '') || '';
            });
            rows.push(row);
        }
    }

    return rows;
}

// Main
async function main() {
    const fullPath = resolve(process.cwd(), csvPath);
    console.log(`\n📄 A ler ficheiro: ${fullPath}`);

    const text = readFileSync(fullPath, 'utf-8');
    const rows = parseCSV(text);

    console.log(`📦 ${rows.length} produtos encontrados no CSV\n`);

    let success = 0;
    let errors = 0;

    for (const row of rows) {
        const payload = {
            name: row.name || '',
            description: row.description || '',
            price: parseFloat(row.price) || 0,
            category: row.category || 'outros',
            subcategory: row.subcategory || null,
            stock: parseInt(row.stock) || 0,
            image_url: row.image_url || '',
            show_on_home: row.show_on_home === 'true'
        };

        if (!payload.name || payload.price <= 0) {
            console.log(`  ⚠️  Ignorado: "${row.name || 'sem nome'}" - nome ou preço inválido`);
            errors++;
            continue;
        }

        const { error } = await supabase.from('products').insert(payload);

        if (error) {
            console.log(`  ❌ Erro "${payload.name}": ${error.message}`);
            errors++;
        } else {
            console.log(`  ✅ "${payload.name}" - €${payload.price.toFixed(2)} (${payload.category})`);
            success++;
        }
    }

    console.log(`\n────────────────────────────────`);
    console.log(`✅ Importados: ${success}`);
    console.log(`❌ Erros: ${errors}`);
    console.log(`📊 Total: ${rows.length}`);
    console.log(`────────────────────────────────\n`);
}

main().catch(console.error);

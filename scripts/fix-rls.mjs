/**
 * Script para corrigir RLS policies via Supabase REST API
 * Uso: node scripts/fix-rls.mjs
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
    console.error('❌ Variáveis de ambiente não encontradas');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCRUD() {
    console.log('\n🔍 A testar operações CRUD na tabela products...\n');

    // Test READ
    const { data: products, error: readError } = await supabase
        .from('products')
        .select('id, name')
        .limit(3);

    if (readError) {
        console.log('❌ READ falhou:', readError.message);
    } else {
        console.log(`✅ READ OK - ${products.length} produtos encontrados`);
        if (products.length > 0) {
            console.log('   Exemplo:', products[0].name);
        }
    }

    // Test INSERT
    const testProduct = {
        name: '__TESTE_RLS__',
        price: 1.00,
        category: 'outros',
        stock: 0,
        description: 'Produto de teste - pode apagar'
    };

    const { data: inserted, error: insertError } = await supabase
        .from('products')
        .insert(testProduct)
        .select()
        .single();

    if (insertError) {
        console.log('❌ INSERT falhou:', insertError.message);
        console.log('   → Isto confirma que as RLS policies precisam ser corrigidas.');
        console.log('   → Vai ao Supabase Dashboard > SQL Editor e executa o ficheiro:');
        console.log('     supabase/fix_rls_policies.sql');
    } else {
        console.log(`✅ INSERT OK - Produto teste criado (id: ${inserted.id})`);

        // Test UPDATE
        const { error: updateError } = await supabase
            .from('products')
            .update({ name: '__TESTE_RLS_UPDATED__' })
            .eq('id', inserted.id);

        if (updateError) {
            console.log('❌ UPDATE falhou:', updateError.message);
        } else {
            console.log('✅ UPDATE OK');
        }

        // Test DELETE
        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .eq('id', inserted.id);

        if (deleteError) {
            console.log('❌ DELETE falhou:', deleteError.message);
        } else {
            console.log('✅ DELETE OK - Produto teste removido');
        }
    }

    console.log('\n────────────────────────────');
    console.log('Se alguma operação falhou, executa o SQL em:');
    console.log('  Supabase Dashboard → SQL Editor → fix_rls_policies.sql');
    console.log('────────────────────────────\n');
}

testCRUD().catch(console.error);

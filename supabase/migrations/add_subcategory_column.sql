-- Add subcategory column to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS subcategory TEXT;

-- Optional: Update some existing products with example subcategories
-- Update Perfumes
UPDATE public.products SET subcategory = 'Eau de Parfum' WHERE category = 'perfumes' AND price > 80;
UPDATE public.products SET subcategory = 'Eau de Toilette' WHERE category = 'perfumes' AND price <= 80;

-- Update Corpo
UPDATE public.products SET subcategory = 'Hidratante' WHERE category = 'corpo' AND name ILIKE '%creme%';
UPDATE public.products SET subcategory = 'Banho' WHERE category = 'corpo' AND (name ILIKE '%gel%' OR name ILIKE '%oleo%');

-- Update Rosto
UPDATE public.products SET subcategory = 'Sérum' WHERE category = 'rosto' AND name ILIKE '%sérum%';
UPDATE public.products SET subcategory = 'Limpeza' WHERE category = 'rosto' AND name ILIKE '%limpeza%';

-- Update Maquilhagem
UPDATE public.products SET subcategory = 'Lábios' WHERE category = 'maquiagem' AND name ILIKE '%batom%';
UPDATE public.products SET subcategory = 'Olhos' WHERE category = 'maquiagem' AND (name ILIKE '%sombra%' OR name ILIKE '%máscara%');

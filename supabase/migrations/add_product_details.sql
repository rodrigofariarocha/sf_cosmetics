-- Add rich product details columns to products table
-- These fields enhance perfumes with notes, brand info, multiple images, etc.

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS volume TEXT; -- e.g. "100ml"
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gender TEXT; -- Masculino, Feminino, Unissexo
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS fragrance_family TEXT; -- Oriental, Floral, Woody, Fresh, etc.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS top_notes TEXT; -- comma-separated
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS heart_notes TEXT; -- comma-separated  
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS base_notes TEXT; -- comma-separated
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images TEXT[]; -- array of additional image URLs
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS long_description TEXT; -- detailed description
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS origin_country TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS concentration TEXT; -- EDP, EDT, Parfum, etc.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS rating NUMERIC(2,1) DEFAULT 4.5;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

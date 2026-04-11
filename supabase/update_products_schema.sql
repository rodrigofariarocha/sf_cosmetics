-- Add show_on_home column to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT false;

-- Optional: Set some initial products to show on home (e.g., the first 15)
UPDATE public.products 
SET show_on_home = true 
WHERE id IN (
    SELECT id FROM public.products ORDER BY created_at DESC LIMIT 15
);

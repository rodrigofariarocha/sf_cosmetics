-- SQL Setup for CMS Tables (FRESH START)
-- This script cleans up and recreates the tables to ensure correct schema.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. RESET TABLES (Drop if exists to avoid schema mismatch)
DROP TABLE IF EXISTS public.expenses CASCADE;

-- 3. Navigation Items Table
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    href TEXT,
    parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 4. Content Blocks Table (CMS)
CREATE TABLE IF NOT EXISTS public.content_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    link_url TEXT,
    link_text TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 5. Expenses Table (Re-created with safe names)
CREATE TABLE public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    category TEXT NOT NULL,
    recurrence TEXT DEFAULT 'one_time',
    expense_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 6. Set RLS
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- 7. Permissive Policies (Allow everything for development)
DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow all for navigation" ON public.navigation_items;
    CREATE POLICY "Allow all for navigation" ON public.navigation_items FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all for content" ON public.content_blocks;
    CREATE POLICY "Allow all for content" ON public.content_blocks FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all for expenses" ON public.expenses;
    CREATE POLICY "Allow all for expenses" ON public.expenses FOR ALL USING (true) WITH CHECK (true);
END
$$;

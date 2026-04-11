-- Fix RLS policies for products table
-- Run this in Supabase SQL Editor to allow CRUD operations

-- Ensure RLS is enabled
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "Allow all for products" ON public.products;
DROP POLICY IF EXISTS "Allow read for products" ON public.products;
DROP POLICY IF EXISTS "Allow insert for products" ON public.products;
DROP POLICY IF EXISTS "Allow update for products" ON public.products;
DROP POLICY IF EXISTS "Allow delete for products" ON public.products;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.products;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.products;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.products;

-- Create permissive policy for all operations
CREATE POLICY "Allow all for products" ON public.products 
  FOR ALL USING (true) WITH CHECK (true);

-- Also fix orders table if needed
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for orders" ON public.orders;
CREATE POLICY "Allow all for orders" ON public.orders 
  FOR ALL USING (true) WITH CHECK (true);

-- Fix profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for profiles" ON public.profiles;
CREATE POLICY "Allow all for profiles" ON public.profiles 
  FOR ALL USING (true) WITH CHECK (true);

-- Verify fixes
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public';

-- SQL Seed Data for Navigation Menu
-- Categories: Perfumes, Corpo, Rosto, Cabelo, Maquilhagem, Bijuteria

-- Clear existing navigation (optional)
-- DELETE FROM navigation_items;

-- 1. Perfumes
WITH p_parent AS (
    INSERT INTO navigation_items (label, href, sort_order, is_active)
    VALUES ('Perfumes', '/shop?category=perfumes', 10, true)
    RETURNING id
)
INSERT INTO navigation_items (label, href, parent_id, sort_order, is_active)
SELECT 'Femininos', '/shop?category=perfumes&tag=feminino', id, 1, true FROM p_parent
UNION ALL
SELECT 'Masculinos', '/shop?category=perfumes&tag=masculino', id, 2, true FROM p_parent
UNION ALL
SELECT 'Unisex', '/shop?category=perfumes&tag=unisex', id, 3, true FROM p_parent;

-- 2. Corpo
WITH c_parent AS (
    INSERT INTO navigation_items (label, href, sort_order, is_active)
    VALUES ('Corpo', '/shop?category=corpo', 20, true)
    RETURNING id
)
INSERT INTO navigation_items (label, href, parent_id, sort_order, is_active)
SELECT 'Hidratantes', '/shop?category=corpo&tag=hidratante', id, 1, true FROM c_parent
UNION ALL
SELECT 'Esfoliantes', '/shop?category=corpo&tag=esfoliante', id, 2, true FROM c_parent;

-- 3. Rosto
WITH r_parent AS (
    INSERT INTO navigation_items (label, href, sort_order, is_active)
    VALUES ('Rosto', '/shop?category=rosto', 30, true)
    RETURNING id
)
INSERT INTO navigation_items (label, href, parent_id, sort_order, is_active)
SELECT 'Limpeza', '/shop?category=rosto&tag=limpeza', id, 1, true FROM r_parent
UNION ALL
SELECT 'Séruns', '/shop?category=rosto&tag=serum', id, 2, true FROM r_parent
UNION ALL
SELECT 'Máscaras', '/shop?category=rosto&tag=mascara', id, 3, true FROM r_parent;

-- 4. Cabelo
WITH cab_parent AS (
    INSERT INTO navigation_items (label, href, sort_order, is_active)
    VALUES ('Cabelo', '/shop?category=cabelo', 40, true)
    RETURNING id
)
INSERT INTO navigation_items (label, href, parent_id, sort_order, is_active)
SELECT 'Champôs', '/shop?category=cabelo&tag=champo', id, 1, true FROM cab_parent
UNION ALL
SELECT 'Condicionadores', '/shop?category=cabelo&tag=condicionador', id, 2, true FROM cab_parent
UNION ALL
SELECT 'Tratamentos', '/shop?category=cabelo&tag=tratamento', id, 3, true FROM cab_parent;

-- 5. Maquilhagem
WITH m_parent AS (
    INSERT INTO navigation_items (label, href, sort_order, is_active)
    VALUES ('Maquilhagem', '/shop?category=maquiagem', 50, true)
    RETURNING id
)
INSERT INTO navigation_items (label, href, parent_id, sort_order, is_active)
SELECT 'Rosto', '/shop?category=maquiagem&tag=rosto', id, 1, true FROM m_parent
UNION ALL
SELECT 'Olhos', '/shop?category=maquiagem&tag=olhos', id, 2, true FROM m_parent
UNION ALL
SELECT 'Lábios', '/shop?category=maquiagem&tag=labios', id, 3, true FROM m_parent;

-- 6. Bijuteria
WITH b_parent AS (
    INSERT INTO navigation_items (label, href, sort_order, is_active)
    VALUES ('Bijuteria', '/shop?category=bijuteria', 60, true)
    RETURNING id
)
INSERT INTO navigation_items (label, href, parent_id, sort_order, is_active)
SELECT 'Colares', '/shop?category=bijuteria&tag=colar', id, 1, true FROM b_parent
UNION ALL
SELECT 'Pulseiras', '/shop?category=bijuteria&tag=pulseira', id, 2, true FROM b_parent
UNION ALL
SELECT 'Anéis', '/shop?category=bijuteria&tag=anel', id, 3, true FROM b_parent;

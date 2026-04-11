-- SQL Seed Data for SF Cosmetics
-- Categories: perfumes, corpo, rosto, cabelo, maquiagem, bijuteria

-- Clear existing products (optional, uncomment if needed)
-- DELETE FROM products;

INSERT INTO products (name, description, price, category, stock, image_url) VALUES
-- PERFUMES
('Éclat de Rose', 'Fragrância floral luxuosa com notas de pétalas de rosa e âmbar.', 85.00, 'perfumes', 15, 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400'),
('Mystique Noir', 'Perfume intenso com toque de especiarias orientais e sândalo.', 92.50, 'perfumes', 10, 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400'),
('Citrus Breeze', 'Fragrância fresca de citrinos ideais para o dia-a-dia.', 45.00, 'perfumes', 25, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400'),

-- CORPO
('Creme Hidratante Velvet', 'Hidratação profunda com manteiga de karité e aroma a baunilha.', 22.00, 'corpo', 50, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400'),
('Esfoliante Marinho', 'Remove impurezas deixando a pele macia e renovada.', 18.50, 'corpo', 30, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400'),
('Óleo de Banho Relaxante', 'Óleo essencial de lavanda para um banho terapêutico.', 15.00, 'corpo', 40, 'https://images.unsplash.com/photo-1552046122-03184de85ec0?auto=format&fit=crop&q=80&w=400'),

-- ROSTO
('Sérum Vitamina C+', 'Sérum iluminador para combater sinais de fadiga.', 35.00, 'rosto', 20, 'https://images.unsplash.com/photo-1620916566398-39f1143af7be?auto=format&fit=crop&q=80&w=400'),
('Gel de Limpeza Purificante', 'Limpeza suave sem retirar a barreira natural da pele.', 12.90, 'rosto', 60, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400'),
('Máscara de Argila Verde', 'Ideal para detox facial e controle de oleosidade.', 24.00, 'rosto', 15, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400'),

-- CABELO
('Champô Sólido Nutritivo', 'Champô ecológico rico em óleos naturais para brilho intenso.', 14.00, 'cabelo', 100, 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=400'),
('Máscara Reparadora de Queratina', 'Tratamento intensivo para cabelos danificados.', 28.50, 'cabelo', 20, 'https://images.unsplash.com/photo-1527799822394-4d13e339199d?auto=format&fit=crop&q=80&w=400'),
('Sérum de Brilho Argan', 'Acabamento perfeito e proteção térmica.', 19.90, 'cabelo', 35, 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400'),

-- MAQUILHAGEM
('Batom Matte Ruby', 'Cor intensa e longa duração para lábios definidos.', 16.00, 'maquiagem', 45, 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=400'),
('Paleta de Sombras Nude', '12 tonalidades versáteis para looks dia e noite.', 42.00, 'maquiagem', 18, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400'),
('Máscara de Pestanas Volume+', 'Define e alonga cada pestana sem aglomerar.', 14.50, 'maquiagem', 55, 'https://images.unsplash.com/photo-1631214503851-a3097d9595a6?auto=format&fit=crop&q=80&w=400'),

-- BIJUTERIA
('Colar de Pérolas Elegance', 'Colar clássico com pérolas cultivadas em água doce.', 55.00, 'bijuteria', 8, 'https://images.unsplash.com/photo-1535633302704-b02f4faad36d?auto=format&fit=crop&q=80&w=400'),
('Pulseira de Ouro 18K (Folheada)', 'Acessório sofisticado com acabamento martelado.', 38.00, 'bijuteria', 12, 'https://images.unsplash.com/photo-1573408302355-4e0b7cb39699?auto=format&fit=crop&q=80&w=400'),
('Brincos de Cristal Aurora', 'Brincos pendentes com brilho furta-cor.', 24.50, 'bijuteria', 15, 'https://images.unsplash.com/photo-1535633302704-b02f4faad36d?auto=format&fit=crop&q=80&w=400'),
('Anel Minimalist Silver', 'Anel em prata 925 com design geométrico moderno.', 29.00, 'bijuteria', 20, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400');

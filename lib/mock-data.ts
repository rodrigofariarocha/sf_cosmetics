export type Product = {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    pdfUrl?: string;
};

export const mockProducts: Product[] = [
    {
        id: "1",
        name: "Sérum Anti-Aging Gold Elixir",
        brand: "SF Cosmetics",
        category: "Skincare",
        price: 129.99,
        stock: 5,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
        description: "Um sérum luxuoso com partículas de ouro 24k para uma pele radiante e rejuvenescida. Ideal para uso noturno.",
        pdfUrl: "/docs/serum-specs.pdf"
    },
    {
        id: "2",
        name: "Creme Hidratante Royal Touch",
        brand: "SF Cosmetics",
        category: "Skincare",
        price: 89.90,
        stock: 24,
        image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1000&auto=format&fit=crop",
        description: "Hidratação profunda com textura de seda. Enriquecido com ácido hialurónico e vitamina E.",
    },
    {
        id: "3",
        name: "Batom Matte Velvet Red",
        brand: "SF Cosmetics",
        category: "Makeup",
        price: 35.00,
        stock: 2,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1000&auto=format&fit=crop",
        description: "Cor intensa e acabamento aveludado que dura o dia todo. Não resseca os lábios.",
    },
    {
        id: "4",
        name: "Perfume Midnight Bloom",
        brand: "SF Parfum",
        category: "Fragrance",
        price: 150.00,
        stock: 12,
        image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=1000&auto=format&fit=crop",
        description: "Uma fragrância sedutora com notas de jasmim, orquídea negra e madeira de sândalo.",
    },
    {
        id: "5",
        name: "Iluminador Golden Glow",
        brand: "SF Cosmetics",
        category: "Makeup",
        price: 45.50,
        stock: 8,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1000&auto=format&fit=crop",
        description: "Pó iluminador ultra-fino para um brilho natural e sofisticado.",
    },
    {
        id: "6",
        name: "Óleo Facial Repair",
        brand: "SF Cosmetics",
        category: "Skincare",
        price: 75.00,
        stock: 0,
        image: "https://images.unsplash.com/photo-1601049541289-9b3b7a5689cc?q=80&w=1000&auto=format&fit=crop",
        description: "Óleo reparador noturno. Restaura a barreira da pele enquanto dorme. Esgotado temporariamente.",
    }
];

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { createClient } from "@/lib/supabase/client";
import { Product, ContentBlock } from "@/types/shop";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { LOCAL_PRODUCTS } from "@/lib/local-products";

export function ShopShowcase() {
    const [products, setProducts] = useState<Product[]>([]);
    const [highlights, setHighlights] = useState<ContentBlock[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem: addToCart } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const supabase = createClient();

    useEffect(() => {
        async function fetchData() {
            // Products come from the local catalog (prototype)
            setProducts(LOCAL_PRODUCTS.filter(p => p.show_on_home).slice(0, 15));

            // Fetch Highlights
            const { data: hData } = await supabase
                .from('content_blocks')
                .select('*')
                .eq('section_name', 'highlight')
                .eq('is_active', true)
                .limit(3);

            if (hData && hData.length > 0) {
                setHighlights(hData);
            } else {
                // Fallback
                setHighlights([
                    { id: '1', section_name: 'highlight', title: "Novidades", image_url: "https://images.unsplash.com/photo-1620916566398-39f1143af7be?q=80&w=1587&auto=format&fit=crop", link_url: "/shop", is_active: true },
                    { id: '2', section_name: 'highlight', title: "Mais Vendidos", image_url: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1587&auto=format&fit=crop", link_url: "/shop", is_active: true },
                    { id: '3', section_name: 'highlight', title: "Ofertas", image_url: "https://images.unsplash.com/photo-1556228720-19777f59e9b0?q=80&w=1587&auto=format&fit=crop", link_url: "/shop", is_active: true }
                ] as ContentBlock[]);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        addToCart(product);
    };

    const handleToggleFavorite = async (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite(product.id)) {
            await removeFavorite(product.id);
        } else {
            await addFavorite(product);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="animate-pulse text-xl text-gray-400 font-medium tracking-wide">A carregar coleção...</div>
            </div>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-10 bg-[#FAFAF8]" id="shop-section">
            <div className="w-full">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Os Mais Desejados</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Produtos em Destaque</h2>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-gray-100">
                        <p className="text-gray-400">Ainda não existem produtos disponíveis.</p>
                        <p className="text-sm text-gray-400 mt-2">Visite o painel de administração para adicionar itens.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/shop">
                                <Button variant="outline" className="rounded-none px-10 h-12 text-xs uppercase tracking-[0.2em] font-bold border-black text-black hover:bg-black hover:text-white transition-all">
                                    Ver Loja Completa <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

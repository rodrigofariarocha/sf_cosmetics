"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { Product } from "@/types/shop";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
    const { addItem: addToCart } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success("Adicionado ao carrinho");
    };

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite(product.id)) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    return (
        <div className="group relative flex flex-col h-full overflow-hidden transition-all duration-300">

            {/* Image Container (4:5 Ratio - Category Page Style) */}
            <div className={cn("relative aspect-[4/5] bg-gray-50 overflow-hidden", compact ? "mb-2" : "mb-4")}>
                {/* Wishlist - Absolute Top Right */}
                <button
                    onClick={handleToggleFavorite}
                    className={cn("absolute z-10 transition-transform active:scale-95", compact ? "top-1.5 right-1.5" : "top-2 right-2")}
                >
                    <Heart className={cn("transition-colors drop-shadow-sm", isFavorite(product.id) ? "fill-red-600 text-red-600" : "text-white/80 hover:text-white fill-black/20", compact ? "h-4 w-4" : "h-6 w-6")} />
                </button>

                {/* Badge */}
                {product.stock && Number(product.stock) < 5 && Number(product.stock) > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        Últimas Unidades
                    </span>
                )}

                <Link href={`/products/${product.id}`} className="block w-full h-full">
                    {product.image_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 text-xs uppercase tracking-widest">Sem imagem</div>
                    )}
                </Link>

                <div className={cn("absolute left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 hidden md:block", compact ? "bottom-2" : "bottom-4")}>
                    <Button
                        size="sm"
                        className={cn("w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white font-bold rounded-none gap-2 shadow-lg", compact ? "h-8 text-[10px]" : "h-10 text-[11px]")}
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag className={compact ? "h-3 w-3" : "h-4 w-4"} />
                        Adicionar
                    </Button>
                </div>
            </div>

            {/* Product Info (Category Page Layout) */}
            <div className={cn("flex flex-col flex-1 text-left", compact ? "px-2 pb-2" : "px-4 pb-4")}>
                <div className={compact ? "mb-1" : "mb-2"}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-0.5">{product.brand || product.subcategory || product.category}</p>
                    <Link href={`/products/${product.id}`}>
                        <h3 className={cn("font-bold text-black leading-tight group-hover:underline decoration-1 underline-offset-4 line-clamp-2", compact ? "text-xs min-h-[2.4em]" : "text-sm min-h-[2.5em]")}>
                            {product.name}
                        </h3>
                    </Link>
                    {product.concentration && (
                        <p className="text-[9px] text-gray-400 mt-0.5">{product.concentration} {product.volume && `• ${product.volume}`}</p>
                    )}
                </div>

                {/* Stars */}
                <div className={cn("flex justify-start items-center gap-0.5", compact ? "mb-1" : "mb-2")}>
                    {[1, 2, 3, 4, 5].map(i => {
                        const rating = product.rating || 4.5;
                        return (
                            <Star key={i} className={cn(
                                compact ? "h-2 w-2" : "h-3 w-3",
                                i <= Math.round(rating) ? "fill-black text-black" : "fill-gray-200 text-gray-200"
                            )} />
                        );
                    })}
                    <span className="text-[9px] text-gray-400 ml-1">({product.review_count || 0})</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <span className={cn("font-bold text-black", compact ? "text-[13px]" : "text-sm")}>
                        {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price)}
                    </span>
                </div>

                {/* Mobile Add Button (Visible on Mobile) */}
                <Button
                    className={cn("w-full mt-2 bg-[#D4AF37] hover:bg-[#B8962E] text-white font-bold uppercase tracking-wider md:hidden rounded-none gap-2 shadow-sm", compact ? "h-8 text-[10px]" : "h-10 text-xs")}
                    onClick={handleAddToCart}
                >
                    <ShoppingBag className={compact ? "h-3 w-3" : "h-4 w-4"} />
                    Adicionar
                </Button>
            </div>
        </div>
    );
}

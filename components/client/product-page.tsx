"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types/shop";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Star, Heart, ChevronRight, Droplets } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { LOCAL_PRODUCTS } from "@/lib/local-products";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";

export function ProductPage({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isZooming, setIsZooming] = useState(false);
    const { addItem: addToCart } = useCart();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Related products come from the local catalog (prototype)
    const relatedProducts = LOCAL_PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 5);

    // Build image gallery from images array + image_url
    const allImages = (() => {
        const imgs: string[] = [];
        if (product.image_url) imgs.push(product.image_url);
        if (product.images && Array.isArray(product.images)) {
            product.images.forEach(img => {
                if (img && !imgs.includes(img)) imgs.push(img);
            });
        }
        return imgs;
    })();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product.id]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) addToCart(product);
        toast.success("Adicionado ao Carrinho", {
            description: `${quantity}x ${product.name}`,
        });
    };

    const handleToggleFavorite = () => {
        if (isFavorite(product.id)) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    const isPerfume = product.category === 'perfumes';
    const hasNotes = product.top_notes || product.heart_notes || product.base_notes;
    const rating = product.rating || 4.5;
    const reviewCount = product.review_count || 0;

    const notesList = (notes: string | undefined) =>
        notes ? notes.split(',').map(n => n.trim()).filter(Boolean) : [];

    return (
        <div className="bg-white">
            {/* Breadcrumb */}
            <div className="w-full px-4 sm:px-6 lg:px-10 py-4">
                <nav className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Link href="/" className="hover:text-black transition-colors">Início</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href={`/shop/${product.category}`} className="hover:text-black transition-colors capitalize">{product.category}</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                    {/* LEFT: Image Gallery - Amazon Style */}
                    <div className="flex gap-4 items-start">
                        {/* Vertical Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex flex-col gap-2 shrink-0">
                                {allImages.map((img, i) => (
                                    <button
                                        key={i}
                                        onMouseEnter={() => setSelectedImage(i)}
                                        onClick={() => setSelectedImage(i)}
                                        className={cn(
                                            "relative w-[58px] h-[58px] bg-white overflow-hidden transition-all border rounded-sm",
                                            selectedImage === i
                                                ? "border-[#D4AF37] shadow-sm"
                                                : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400"
                                        )}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain p-1" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main Image with Zoom */}
                        <div className="relative flex-1 overflow-hidden bg-white border border-gray-100 cursor-crosshair"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                setZoomPos({ x, y });
                            }}
                            onMouseEnter={() => setIsZooming(true)}
                            onMouseLeave={() => setIsZooming(false)}
                        >
                            <div className="aspect-square w-full flex items-center justify-center">
                                {allImages.length > 0 ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={allImages[selectedImage]}
                                        alt={product.name}
                                        className="max-w-full max-h-full object-contain transition-transform duration-300 p-8"
                                        style={isZooming ? {
                                            transform: 'scale(2)',
                                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                        } : undefined}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="text-gray-300 uppercase tracking-widest text-xs">Sem imagem</div>
                                )}
                            </div>

                            <button
                                onClick={handleToggleFavorite}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform z-10"
                            >
                                <Heart className={cn("h-5 w-5 transition-colors", isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-400")} />
                            </button>

                            {Number(product.stock) === 0 && (
                                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                                    <span className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-[0.2em]">Esgotado</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="flex flex-col lg:py-4">
                        {product.brand && (
                            <p className="text-[#D4AF37] font-bold uppercase tracking-[0.25em] text-[10px] mb-2">{product.brand}</p>
                        )}

                        <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight tracking-tight mb-3">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-gray-500">
                            {product.subcategory && (
                                <span className="uppercase tracking-wider font-medium">{product.subcategory}</span>
                            )}
                            {product.concentration && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span>{product.concentration}</span>
                                </>
                            )}
                            {product.volume && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span>{product.volume}</span>
                                </>
                            )}
                            {product.origin_country && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span>{product.origin_country}</span>
                                </>
                            )}
                        </div>

                        {reviewCount > 0 && (
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className={cn("h-4 w-4", i <= Math.round(rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-gray-200 text-gray-200")} />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500">{rating.toFixed(1)} ({reviewCount} avaliações)</span>
                            </div>
                        )}

                        <div className="mb-5">
                            <span className="text-3xl font-bold text-black">
                                {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price)}
                            </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-sm mb-6">
                            {product.description || "Sem descrição disponível."}
                        </p>

                        {/* Fragrance Notes */}
                        {isPerfume && hasNotes && (
                            <div className="mb-6 p-5 bg-[#FAFAFA] border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Droplets className="h-4 w-4 text-[#D4AF37]" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Pirâmide Olfativa</h3>
                                </div>
                                <div className="space-y-4">
                                    {product.top_notes && (
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">Notas de Topo</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {notesList(product.top_notes).map(note => (
                                                    <span key={note} className="px-3 py-1 bg-white border border-gray-200 text-[11px] text-gray-700 font-medium">{note}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {product.heart_notes && (
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">Notas de Coração</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {notesList(product.heart_notes).map(note => (
                                                    <span key={note} className="px-3 py-1 bg-white border border-gray-200 text-[11px] text-gray-700 font-medium">{note}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {product.base_notes && (
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">Notas de Base</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {notesList(product.base_notes).map(note => (
                                                    <span key={note} className="px-3 py-1 bg-white border border-gray-200 text-[11px] text-gray-700 font-medium">{note}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {product.fragrance_family && (
                            <div className="flex items-center gap-3 mb-5 text-xs">
                                <span className="text-gray-400 uppercase tracking-wider font-medium">Família Olfativa</span>
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider">{product.fragrance_family}</span>
                            </div>
                        )}

                        <div className="mb-5">
                            {Number(product.stock) > 0 ? (
                                <div className="flex items-center gap-2 text-emerald-700 text-[11px] font-medium">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Em Stock — {product.stock} unidades disponíveis
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-red-600 text-[11px] font-semibold">
                                    <span className="h-2 w-2 rounded-full bg-red-500" />
                                    Temporariamente Indisponível
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="flex items-center border border-gray-200 h-12 w-28 px-3 justify-between bg-white">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} className="text-gray-400 hover:text-black disabled:opacity-30 transition-colors">
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="font-bold text-sm">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= Number(product.stock)} className="text-gray-400 hover:text-black disabled:opacity-30 transition-colors">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                disabled={Number(product.stock) === 0}
                                className="flex-1 h-12 text-xs uppercase tracking-[0.25em] font-bold gap-3 bg-black hover:bg-gray-900 text-white transition-all rounded-none"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                Adicionar ao Carrinho
                            </Button>
                            <button
                                onClick={handleToggleFavorite}
                                className={cn(
                                    "h-12 w-12 border flex items-center justify-center shrink-0 transition-colors",
                                    isFavorite(product.id) ? "bg-red-50 border-red-200" : "border-gray-200 hover:bg-gray-50"
                                )}
                            >
                                <Heart className={cn("h-5 w-5", isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-gray-400")} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-[11px] text-gray-500">
                                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center">
                                    <Truck className="h-4 w-4 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-700">Envio Grátis</p>
                                    <p className="text-[10px]">Compras acima de 50€</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-gray-500">
                                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center">
                                    <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-700">100% Original</p>
                                    <p className="text-[10px]">Autenticidade garantida</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Long Description */}
                {product.long_description && (
                    <div className="mt-16 pt-12 border-t border-gray-100 max-w-3xl">
                        <h2 className="text-lg font-bold text-black uppercase tracking-[0.1em] mb-4">Sobre este produto</h2>
                        <p className="text-gray-600 leading-[1.8] text-sm whitespace-pre-line">{product.long_description}</p>
                    </div>
                )}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold text-black uppercase tracking-[0.1em]">Produtos Relacionados</h2>
                            <Link href={`/shop/${product.category}`} className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#D4AF37] hover:underline underline-offset-4">
                                Ver todos
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {relatedProducts.map((p: Product) => (
                                <ProductCard key={p.id} product={p} compact={true} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

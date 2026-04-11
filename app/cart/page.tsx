"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Header } from "@/components/client/header";
import { Footer } from "@/components/client/footer";

export default function CartPage() {
    const { items: cart, removeItem: removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    // Assuming cart items might be stale if product details are missing, we should filter or handle safely
    // The context logic currently spreads `...item.product` so `item.name` etc should be there.

    // Safety check for invalid items (e.g. if product was deleted from DB but remains in localStorage)
    const validCart = cart.filter(item => item.id && item.name);
    // If we have "phantom" items, validCart length might be 0 even if cart.length > 0
    // But for now let's use validCart

    const hasItems = validCart.length > 0;
    const shippingCost = hasItems ? (cartTotal > 50 ? 0 : 4.99) : 0;
    const finalTotal = cartTotal + shippingCost;

    const handleClearCart = () => {
        if (confirm("Tem a certeza que deseja esvaziar o carrinho?")) {
            clearCart();
            toast.success("Carrinho esvaziado");
        }
    }

    return (
        <>
        <Header />
        <div className="min-h-screen bg-white pt-8 pb-12 px-4">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Header Row */}
                <div className="mb-8 flex items-end justify-between border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Meu Carrinho
                        </h1>
                        {hasItems && (
                            <button
                                onClick={handleClearCart}
                                className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                                title="Esvaziar Carrinho"
                            >
                                <Trash2 className="h-3 w-3" />
                                Limpar
                            </button>
                        )}
                    </div>
                    {hasItems && (
                        <span className="text-sm text-gray-500">{validCart.length} {validCart.length === 1 ? 'item' : 'itens'}</span>
                    )}
                </div>

                {!hasItems ? (
                    // Empty State
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto mt-12">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <ShoppingBag className="h-8 w-8 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">O teu carrinho está vazio</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Parece que ainda não encontraste o produto perfeito.
                        </p>
                        <Link href="/">
                            <Button className="bg-[#D4AF37] hover:bg-[#C5A028] text-white px-6 py-3 rounded-2xl text-base shadow-lg shadow-[#D4AF37]/20">
                                Começar a Comprar
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Cart Items List */}
                        <div className="flex-1 w-full space-y-3">
                            {validCart.map((item) => (
                                <div key={item.id} className="group bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center hover:border-[#D4AF37]/30 transition-all duration-300">
                                    {/* Image */}
                                    <div className="h-20 w-16 relative bg-gray-50 rounded-lg overflow-hidden shrink-0">
                                        {item.image_url ? (
                                            <Image
                                                src={item.image_url}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider mb-0.5">{item.category}</p>
                                                <h3 className="font-bold text-gray-900 text-sm leading-tight truncate pr-4">{item.name}</h3>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                title="Remover"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end mt-auto">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-7">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="w-6 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-l-lg transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-2.5 w-2.5" />
                                                </button>
                                                <span className="w-6 text-center text-xs font-semibold text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-r-lg transition-colors"
                                                >
                                                    <Plus className="h-2.5 w-2.5" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <p className="font-bold text-gray-900 text-base font-display">
                                                {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary styled as Sidebar */}
                        <div className="w-full lg:w-80 shrink-0 sticky top-24">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-50">Resumo</h3>

                                <div className="space-y-3 text-sm mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Envio</span>
                                        {shippingCost === 0 ? (
                                            <span className="text-green-600 font-bold">Grátis</span>
                                        ) : (
                                            <span className="font-medium text-gray-900">{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(shippingCost)}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end border-t border-gray-50 pt-4 mb-6">
                                    <span className="text-base font-bold text-gray-900">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-gray-900 block leading-none font-display">
                                            {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(finalTotal)}
                                        </span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">IVA incluído</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl text-base font-medium shadow-lg shadow-gray-200/50 mb-4 group transition-all hover:scale-[1.02]">
                                    Finalizar Compra
                                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>

                                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 bg-gray-50 py-2 rounded-lg border border-gray-100">
                                    <Lock className="h-3 w-3" />
                                    Checkout 100% Seguro
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
}

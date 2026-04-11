"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem } from "@/types/shop";
import { useAuth } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const supabase = createClient();

    // Load cart from DB when user logs in
    useEffect(() => {
        const controller = new AbortController();

        if (user) {
            const fetchCart = async () => {
                const { data, error } = await supabase
                    .from('cart')
                    .select('*, product:products(*)')
                    .eq('user_id', user.id)
                    .abortSignal(controller.signal);

                if (error) {
                    if (error.message?.includes('aborted')) return;
                    console.error('Error fetching cart:', error.message || error);
                } else if (data) {
                    const cartItems = data.map((item: any) => ({
                        ...item.product,
                        quantity: item.quantity
                    }));
                    setItems(cartItems);
                }
                setLoading(false);
            };

            fetchCart();
        } else {
            // Load from local storage for guests
            const localCart = localStorage.getItem('sf-cart');
            if (localCart) {
                setItems(JSON.parse(localCart));
            }
            setLoading(false);
        }

        return () => controller.abort();
    }, [user, supabase]);

    // Sync to local storage for guests
    useEffect(() => {
        if (!user) {
            localStorage.setItem('sf-cart', JSON.stringify(items));
        }
    }, [items, user]);

    const addItem = async (product: Product, quantity = 1) => {
        const existingItem = items.find(item => item.id === product.id);
        let newItems: CartItem[];

        if (existingItem) {
            newItems = items.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            newItems = [...items, { ...product, quantity }];
        }

        setItems(newItems);
        toast.success("Adicionado ao carrinho");

        if (user) {
            try {
                if (existingItem) {
                    await supabase
                        .from('cart')
                        .update({ quantity: existingItem.quantity + quantity })
                        .eq('user_id', user.id)
                        .eq('product_id', product.id);
                } else {
                    await supabase
                        .from('cart')
                        .insert({
                            user_id: user.id,
                            product_id: product.id,
                            quantity: quantity
                        });
                }
            } catch (error) {
                console.error('Error syncing cart:', error);
                toast.error("Erro ao sincronizar carrinho");
            }
        }
    };

    const removeItem = async (productId: string) => {
        const newItems = items.filter(item => item.id !== productId);
        setItems(newItems);
        toast.success("Removido do carrinho");

        if (user) {
            await supabase
                .from('cart')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return;

        const newItems = items.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setItems(newItems);

        if (user) {
            await supabase
                .from('cart')
                .update({ quantity })
                .eq('user_id', user.id)
                .eq('product_id', productId);
        }
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('sf-cart');
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            loading
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

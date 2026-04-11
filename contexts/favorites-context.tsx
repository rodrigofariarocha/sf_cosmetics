"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product, FavoriteList } from "@/types/shop";
import { useAuth } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface FavoritesContextType {
    favorites: Product[];
    lists: FavoriteList[];
    addFavorite: (product: Product, listId?: string) => Promise<void>;
    removeFavorite: (productId: string) => Promise<void>;
    createList: (name: string) => Promise<void>;
    deleteList: (listId: string) => Promise<void>;
    isFavorite: (productId: string) => boolean;
    favoritesCount: number;
    loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [lists, setLists] = useState<FavoriteList[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const supabase = createClient();

    // Load favorites and lists from DB when user logs in
    useEffect(() => {
        const controller = new AbortController();

        if (user) {
            const fetchData = async () => {
                setLoading(true);

                // Fetch Favorites
                const { data: favData, error: favError } = await supabase
                    .from('favorites')
                    .select('*, product:products(*)')
                    .eq('user_id', user.id)
                    .abortSignal(controller.signal);

                if (favError) {
                    if (!favError.message?.includes('aborted')) {
                        console.error('Error fetching favorites:', favError.message || favError);
                    }
                } else if (favData) {
                    const favoriteProducts = favData
                        .filter((item: any) => item.product) // ensure product exists
                        .map((item: any) => ({
                            ...item.product,
                            _listId: item.list_id // Attach list_id for internal use if needed
                        }));
                    setFavorites(favoriteProducts);
                }

                // Fetch Lists
                const { data: listData, error: listError } = await supabase
                    .from('favorite_lists')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: true })
                    .abortSignal(controller.signal);

                if (listError) {
                    if (!listError.message?.includes('aborted')) {
                        console.error('Error fetching lists:', listError.message || listError);
                    }
                } else if (listData) {
                    setLists(listData);
                }

                setLoading(false);
            };

            fetchData();
        } else {
            // Load from local storage for guests
            const localFavorites = localStorage.getItem('sf-favorites');
            if (localFavorites) {
                setFavorites(JSON.parse(localFavorites));
            }
            setLoading(false);
        }

        return () => controller.abort();
    }, [user, supabase]);

    // Sync to local storage for guests
    useEffect(() => {
        if (!user) {
            localStorage.setItem('sf-favorites', JSON.stringify(favorites));
        }
    }, [favorites, user]);

    const addFavorite = async (product: Product, listId?: string) => {
        // Prevent duplicates in global list for now, or update list_id?
        // Simple logic: If already favorite, maybe just toast "Already in favorites".
        // Improved logic: If listId provided, update it.

        if (favorites.some(f => f.id === product.id)) {
            toast.info("Este produto já está nos teus favoritos");
            return;
        }

        const newFavorites = [...favorites, product];
        setFavorites(newFavorites);
        toast.success(listId ? "Adicionado à lista" : "Adicionado aos favoritos");

        if (user) {
            try {
                await supabase
                    .from('favorites')
                    .insert({
                        user_id: user.id,
                        product_id: product.id,
                        list_id: listId || null
                    });
            } catch (error) {
                console.error('Error syncing favorite:', error);
                toast.error("Erro ao guardar na base de dados");
            }
        }
    };

    const removeFavorite = async (productId: string) => {
        const newFavorites = favorites.filter(f => f.id !== productId);
        setFavorites(newFavorites);
        toast.success("Removido dos favoritos");

        if (user) {
            await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);
        }
    };

    const createList = async (name: string) => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('favorite_lists')
                .insert({
                    user_id: user.id,
                    name: name
                })
                .select()
                .single();

            if (error) throw error;

            setLists([...lists, data]);
            toast.success("Lista criada com sucesso");
        } catch (error) {
            console.error('Error creating list:', error);
            toast.error("Erro ao criar lista");
        }
    };

    const deleteList = async (listId: string) => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('favorite_lists')
                .delete()
                .eq('id', listId);

            if (error) throw error;

            setLists(lists.filter(l => l.id !== listId));
            // Also remove items locally that were in this list? 
            // In DB they cascade delete. Locally we might just refresh or filter.
            // For now, let's refresh page or keep it simple.
            toast.success("Lista eliminada");
        } catch (error) {
            console.error('Error deleting list:', error);
            toast.error("Erro ao eliminar lista");
        }
    };

    const isFavorite = (productId: string) => {
        return favorites.some(f => f.id === productId);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            lists,
            addFavorite,
            removeFavorite,
            createList,
            deleteList,
            isFavorite,
            favoritesCount: favorites.length,
            loading
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}

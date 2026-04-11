"use client";

import { useState } from "react";
import { useFavorites } from "@/contexts/favorites-context";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Folder, FolderOpen, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";
import { Header } from "@/components/client/header";
import { Footer } from "@/components/client/footer";

export default function FavoritesPage() {
    const { favorites, lists, removeFavorite, createList, deleteList } = useFavorites();
    const { addItem } = useCart();

    // State
    const [activeListId, setActiveListId] = useState<string | null>(null); // null = All Items
    const [newListName, setNewListName] = useState("");
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    // Filter logic
    const displayedFavorites = activeListId
        ? favorites.filter(f => (f as any)._listId === activeListId) // Assuming _listId is populated by context
        : favorites;

    // Note: The Context update added _listId mapping. 
    // If _listId logic isn't fully robust in backend yet (we just added the field), 
    // this might show empty for new lists until items are explicitly moved.
    // For now, "All Items" (null) shows everything. 
    // We need a "Move to List" feature on the card to make lists useful, 
    // or we assume items in a list are just filtered views.

    const handleCreateList = async () => {
        if (!newListName.trim()) return;
        await createList(newListName);
        setNewListName("");
        setCreateDialogOpen(false);
    };

    const handleDeleteList = async (e: React.MouseEvent, listId: string) => {
        e.stopPropagation();
        await deleteList(listId);
        if (activeListId === listId) setActiveListId(null);
    };



    return (
        <>
        <Header />
        <div className="min-h-screen bg-white pt-8 pb-12 px-4">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Header Row */}
                <div className="mb-8 flex items-end justify-between border-b border-gray-100 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Meus Favoritos
                    </h1>
                    <span className="text-sm text-gray-500">{favorites.length} {favorites.length === 1 ? 'item' : 'itens'}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* SIDEBAR (Lists) */}
                    <div className="w-full md:w-64 shrink-0 space-y-2 sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-fit">
                        <Button
                            variant={activeListId === null ? "secondary" : "ghost"}
                            className={cn("w-full justify-center mb-0 font-medium h-9 px-4", activeListId === null && "bg-[#D4AF37]/10 text-[#D4AF37]")}
                            onClick={() => setActiveListId(null)}
                        >
                            <span className="truncate text-sm">Todos os Itens - {favorites.length}</span>
                        </Button>

                        <div className="space-y-0.5 mt-4">
                            <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">As minhas pastas</p>
                            {lists.map((list) => (
                                <div key={list.id} className="group relative">
                                    <Button
                                        variant={activeListId === list.id ? "secondary" : "ghost"}
                                        className={cn("w-full justify-start gap-2 font-medium h-9 px-3 pr-8", activeListId === list.id && "bg-[#D4AF37]/10 text-[#D4AF37]")}
                                        onClick={() => setActiveListId(list.id)}
                                    >
                                        {activeListId === list.id ? <FolderOpen className="h-3.5 w-3.5" /> : <Folder className="h-3.5 w-3.5" />}
                                        <span className="truncate text-sm">{list.name}</span>
                                    </Button>
                                    <button
                                        onClick={(e) => handleDeleteList(e, list.id)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                                        title="Apagar lista"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full mt-2 h-9 border-dashed border-gray-300 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] gap-2 text-xs">
                                    <Plus className="h-3.5 w-3.5" />
                                    Nova Pasta
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Nova Pasta de Favoritos</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Nome da pasta (ex: Skincare, Prendas)"
                                            value={newListName}
                                            onChange={(e) => setNewListName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="ghost" onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
                                    <Button
                                        onClick={handleCreateList}
                                        className="bg-[#D4AF37] hover:bg-[#C5A028] text-white"
                                        disabled={!newListName.trim()}
                                    >
                                        Criar Pasta
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* MAIN CONTENT (Grid) */}
                    <div className="flex-1 w-full">
                        {displayedFavorites.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center h-[500px] flex flex-col items-center justify-center">
                                <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    {activeListId ? <FolderOpen className="h-8 w-8 text-gray-300" /> : <Heart className="h-8 w-8 text-gray-300" />}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {activeListId ? "Pasta vazia" : "Ainda não tens favoritos"}
                                </h2>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    {activeListId
                                        ? "Adiciona produtos a esta pasta para os veres aqui."
                                        : "Explora a nossa coleção e guarda os teus produtos preferidos."}
                                </p>
                                {!activeListId && (
                                    <Link href="/">
                                        <Button className="bg-[#D4AF37] hover:bg-[#C5A028] text-white px-6 py-3 rounded-2xl text-base">
                                            Explorar Loja
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {displayedFavorites.map((product) => (
                                    <ProductCard key={product.id} product={product as any} compact={true} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

"use client";

import { useTheme } from "next-themes";
import {
    ShoppingBag,
    Menu,
    Search,
    User,
    Heart,
    ChevronDown,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { NavigationItem } from "@/types/shop";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Image from "next/image";

export function Header() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, signIn, signOut, signInWithGoogle } = useAuth();
    const { cartCount } = useCart();
    const { favoritesCount } = useFavorites();
    const router = useRouter();
    const [navItems, setNavItems] = useState<NavigationItem[]>([]);

    useEffect(() => {
        const fetchNav = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from('navigation_items')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (data && data.length > 0) {
                // Context: The DB might have old URLs like /shop?category=perfumes
                // We MUST transform them to /shop/perfumes to match the new route structure
                const transformedData = data.map((item: any) => {
                    let href = item.href || "";
                    if (href.includes("?category=")) {
                        // Extract category and tag from query param
                        try {
                            const url = new URL(href, "http://localhost"); // Dummy base for parsing
                            const category = url.searchParams.get("category");
                            const tag = url.searchParams.get("tag");

                            if (category) {
                                href = `/shop/${category}`;
                                if (tag) {
                                    href += `?tag=${tag}`;
                                }
                            }
                        } catch (e) {
                            console.error("Error parsing URL:", href);
                        }
                    }
                    return { ...item, href };
                });
                setNavItems(transformedData as NavigationItem[]);
            } else {
                // Fallback Data
                setNavItems([
                    { id: '1', label: 'Perfumes', href: '/shop/perfumes', sort_order: 10, is_active: true },
                    { id: '2', label: 'Corpo', href: '/shop/corpo', sort_order: 20, is_active: true },
                    { id: '3', label: 'Rosto', href: '/shop/rosto', sort_order: 30, is_active: true },
                    { id: '4', label: 'Cabelo', href: '/shop/cabelo', sort_order: 40, is_active: true },
                    { id: '5', label: 'Maquilhagem', href: '/shop/maquiagem', sort_order: 50, is_active: true },
                    { id: '6', label: 'Bijuteria', href: '/shop/bijuteria', sort_order: 60, is_active: true },
                    { id: '7', label: 'Aparelhos', href: '/shop/aparelhos', sort_order: 70, is_active: true },
                ] as NavigationItem[]);
            }
        };
        fetchNav();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            toast.error("Erro ao fazer login", {
                description: error.message,
            });
        } else {
            toast.success("Login efetuado com sucesso!");
            setIsAuthOpen(false);
            setEmail("");
            setPassword("");
        }

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    };

    const handleLogout = async () => {
        await signOut();
        toast.success("Sessão terminada");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm font-sans">

            {/* ROW 1: Logo | Search | Actions */}
            <div className="w-full px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">

                {/* Logo (Left) */}
                <div className="flex-shrink-0">
                    <Link href="/" className="block">
                        <Image
                            src="/logo.png"
                            alt="SF Cosmetics"
                            width={140}
                            height={70}
                            className="h-14 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Search (Center - Truly Centered) */}
                <div className="hidden md:flex flex-1 max-w-lg mx-auto relative">
                    <Input
                        placeholder="O que procura hoje?"
                        className="w-full pl-6 pr-12 h-12 rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:border-black transition-all placeholder:text-gray-400 shadow-sm"
                    />
                    <Button size="icon" variant="ghost" className="absolute right-2 top-1.5 h-9 w-9 rounded-full hover:bg-gray-200">
                        <Search className="h-5 w-5 text-gray-500" />
                    </Button>
                </div>

                {/* Actions (Right) */}
                <div className="flex items-center justify-end gap-2 flex-shrink-0">

                    {/* User Account Dropdown - Minimal */}
                    {user ? (
                        <div className="relative group">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-[#D4AF37] hover:bg-gray-50 rounded-full"
                            >
                                <User className="h-6 w-6" />
                            </Button>

                            {/* Compact Dropdown Menu - Right Side */}
                            <div className="absolute left-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 overflow-hidden z-50 origin-top-left">
                                <div className="py-1">
                                    <Link
                                        href="/account"
                                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                                    >
                                        <User className="h-4 w-4" />
                                        <span>Gerir Conta</span>
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 transition-colors text-left text-sm text-red-600"
                                    >
                                        <LogOut className="h-4 w-4 text-red-600" />
                                        <span className="text-red-600">Sair</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:text-[#D4AF37] hover:bg-gray-50 rounded-full">
                                    <User className="h-6 w-6" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[380px] p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
                                <DialogHeader className="sr-only">
                                    <DialogTitle>Autenticação SF Cosmetics</DialogTitle>
                                </DialogHeader>
                                {/* Clean Header */}
                                <div className="px-8 pt-8 pb-4 bg-white">
                                    <div className="text-center space-y-2">
                                        <div className="h-14 w-14 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] rounded-2xl mx-auto flex items-center justify-center shadow-md">
                                            <User className="h-7 w-7 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold tracking-tight">Bem-vindo</h2>
                                        <p className="text-xs text-gray-500 font-medium">Entre na sua conta SF Cosmetics</p>
                                    </div>
                                </div>

                                {/* Form Section */}
                                <div className="px-8 pb-6 bg-white">
                                    <form onSubmit={handleLogin} className="space-y-3">
                                        {/* Email Form - Primary */}
                                        <div className="space-y-2.5">
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={loading}
                                                className="h-11 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4AF37] transition-all text-sm font-medium placeholder:text-gray-400"
                                            />
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                disabled={loading}
                                                className="h-11 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4AF37] transition-all text-sm font-medium placeholder:text-gray-400"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="gold"
                                            disabled={loading}
                                            className="w-full h-11 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all"
                                        >
                                            {loading ? "A entrar..." : "Entrar"}
                                        </Button>

                                        {/* Footer Links */}
                                        <div className="text-center pt-2 space-y-2">
                                            <button className="text-xs text-gray-500 hover:text-[#D4AF37] font-medium transition-colors block w-full">
                                                Esqueceu a password?
                                            </button>
                                            <div className="text-xs text-gray-500 font-medium">
                                                Não tem conta? {" "}
                                                <Link
                                                    href="/register"
                                                    className="text-[#D4AF37] hover:text-[#C5A028] font-bold transition-colors"
                                                    onClick={() => setIsAuthOpen(false)}
                                                >
                                                    Criar conta
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="relative py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-gray-200" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-2 text-gray-400 font-bold tracking-wider">Ou</span>
                                            </div>
                                        </div>

                                        {/* Google Sign In - Secondary/Footer */}
                                        <Button
                                            type="button"
                                            onClick={handleGoogleLogin}
                                            disabled={loading}
                                            variant="outline"
                                            className="w-full h-10 gap-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                                        >
                                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            Continuar com Google
                                        </Button>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}

                    {/* Wishlist */}
                    <Link href="/favorites">
                        <Button variant="ghost" size="icon" className="relative hover:text-[#D4AF37] hover:bg-gray-50 rounded-full">
                            <Heart className="h-6 w-6" />
                        </Button>
                    </Link>

                    {/* Cart Link */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative hover:text-[#D4AF37] hover:bg-gray-50 rounded-full">
                            <ShoppingBag className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#D4AF37] shadow-sm ring-2 ring-white flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white leading-none block mt-[1px] ml-[1.5px]">
                                        {cartCount}
                                    </span>
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ROW 2: Navigation (Hover Dropdowns) */}
            <div className="hidden md:block border-t border-gray-100">
                <div className="w-full px-4 sm:px-6 lg:px-10">
                    <div className="flex gap-6 h-10 items-center">
                        {navItems.filter(item => !item.parent_id).map((parent) => {
                            const children = navItems.filter(child => child.parent_id === parent.id);
                            const hasChildren = children.length > 0;

                            return (
                                <div key={parent.id} className="group relative h-full flex items-center">
                                    {hasChildren ? (
                                        <>
                                            <Link
                                                href={parent.href || "#"}
                                                className="flex items-center gap-1 text-sm font-medium uppercase tracking-wide hover:text-[#D4AF37] outline-none transition-colors"
                                            >
                                                {parent.label} <ChevronDown className="h-3 w-3" />
                                            </Link>

                                            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 top-full pt-1 w-56 transition-all duration-200 z-[100]">
                                                <div className="rounded-xl p-2 shadow-2xl border border-gray-100 bg-white ring-1 ring-black/5">
                                                    {children.map(child => (
                                                        <Link
                                                            key={child.id}
                                                            href={child.href || "#"}
                                                            className="block rounded-lg px-3 py-2 cursor-pointer font-medium hover:bg-gray-50 text-sm transition-colors text-gray-700 hover:text-black"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={parent.href || "#"}
                                            className="text-sm font-medium uppercase tracking-wide hover:text-[#D4AF37] transition-colors"
                                        >
                                            {parent.label}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
}

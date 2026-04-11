"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
    Trash2,
    Edit,
    Search,
    Plus,
    PackageOpen,
    LayoutDashboard,
    ShoppingBag,
    Users,
    CreditCard,
    TrendingUp,
    TrendingDown,
    Lock,
    LogOut,
    Package,
    Filter,
    ChevronDown,
    Eye,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Type,
    List,
    Image as ImageIcon,
    CornerDownRight,
    GripVertical,
    Info,
    Link as LinkIcon,
    Star,
    Upload,
    FileSpreadsheet,
    CheckCircle2,
    AlertCircle,
    Download,
    Sparkles,
    Send,
    Loader2,
    FileText,
    Bot
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Product, Order, Profile, Expense, ContentBlock, NavigationItem } from "@/types/shop";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, AreaChart, Area } from 'recharts';


// --- LOGIN COMPONENT ---
function AdminLogin({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<Array<{ top: number, left: number, size: number, duration: number }>>([]);

    useEffect(() => {
        // Generate particles only on client-side to avoid hydration mismatch
        const newParticles = Array.from({ length: 20 }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 3 + 2
        }));
        setParticles(newParticles);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate a small delay for better UX feel
        await new Promise(resolve => setTimeout(resolve, 600));

        if (password === "Admin123!") {
            onLogin();
        } else {
            setError(true);
            toast.error("Credenciais inválidas");
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 selection:bg-[#D4AF37] selection:text-black font-sans relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Interactive Spotlight Background */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-50 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.10), transparent 40%)`
                }}
            />

            {/* Ambient Gold Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-[#D4AF37] opacity-20 animate-pulse"
                        style={{
                            top: `${p.top}%`,
                            left: `${p.left}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDuration: `${p.duration}s`
                        }}
                    />
                ))}
            </div>

            <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 z-10">

                {/* Login Card */}
                <Card className="w-full bg-[#111111]/90 backdrop-blur-xl border-[#222] shadow-2xl relative">
                    {/* Subtle border glowing effect */}
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

                    <CardContent className="pt-12 pb-12 px-8 flex flex-col items-center gap-8">

                        {/* Brand Section (Inside Card) */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative w-44 h-32 hover:scale-105 transition-transform duration-500">
                                <Image
                                    src="/logo-nobg.png"
                                    alt="SF Cosmetics"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium text-center mt-4">
                                Área Restrita Administrativa
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                            <div className="space-y-1 relative group">
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="Chave de Segurança"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(false);
                                    }}
                                    className={`
                                        pl-10 bg-[#0a0a0a] border-[#333] text-white h-11 transition-all duration-300
                                        placeholder:text-zinc-600 focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50
                                        ${error ? 'border-red-900 focus:border-red-900 focus:ring-red-900' : ''}
                                    `}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-[#D4AF37] hover:bg-[#b8952b] text-black font-bold tracking-wider uppercase text-xs transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-3 w-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Acedendo...
                                    </span>
                                ) : (
                                    "Aceder ao Sistema"
                                )}
                            </Button>
                        </form>

                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-[10px] text-zinc-700 tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} SF Cosmetics
                </p>
            </div>
        </div>
    );
}


// --- SUB-COMPONENTS ---

// 1. PRODUCTS TABLE
function ProductTable({
    products,
    onDelete,
    onEdit,
}: {
    products: Product[];
    onDelete: (product: Product) => void;
    onEdit: (product: Product) => void;
}) {
    if (products.length === 0) {
        return (
            <div className="p-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
                <div className="flex flex-col items-center gap-3">
                    <PackageOpen className="h-10 w-10 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">Inventário Vazio</h3>
                    <p className="text-gray-500 text-sm">Nenhum produto encontrado. Adicione novos itens para começar.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <table className="w-full caption-bottom text-sm border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500 w-[80px]">Img</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Produto</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Categoria</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Stock</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Preço</th>
                        <th className="h-12 px-6 text-right align-middle font-medium text-gray-500">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 align-middle">
                                <div className="relative h-10 w-10 overflow-hidden rounded-lg border bg-white">
                                    {product.image_url ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-gray-100 text-[10px] text-gray-400">N/A</div>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 align-middle font-medium text-gray-900">
                                <div className="flex items-center gap-2">
                                    {product.name}
                                    {product.show_on_home && (
                                        <div title="Em Destaque na Homepage">
                                            <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 align-middle capitalize text-gray-600">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {product.category}
                                </span>
                            </td>
                            <td className="p-4 align-middle">
                                {product.stock === 0 ? (
                                    <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">Esgotado</Badge>
                                ) : product.stock < 5 ? (
                                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">Crítico ({product.stock})</Badge>
                                ) : (
                                    <span className="text-sm text-gray-600">{product.stock} un.</span>
                                )}
                            </td>
                            <td className="p-4 align-middle font-medium">€{Number(product.price).toFixed(2)}</td>
                            <td className="p-4 align-middle text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(product)} className="h-8 w-8 text-gray-500 hover:text-black hover:bg-gray-100">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onDelete(product)} className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// 2. ORDERS TABLE
function OrderTable({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <div className="p-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
                <div className="flex flex-col items-center gap-3">
                    <ShoppingBag className="h-10 w-10 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">Sem Encomendas</h3>
                    <p className="text-gray-500 text-sm">Ainda não existem encomendas registadas.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <table className="w-full caption-bottom text-sm border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">ID</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Cliente</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Estado</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Pagamento</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Total</th>
                        <th className="h-12 px-6 text-right align-middle font-medium text-gray-500">Data</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 align-middle font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</td>
                            <td className="p-4 align-middle font-medium text-gray-900">
                                {order.profiles?.full_name || "Convidado"}
                            </td>
                            <td className="p-4 align-middle">
                                <Badge variant="outline" className={cn(
                                    "capitalize",
                                    order.status === 'delivered' ? "bg-green-50 text-green-700 border-green-200" :
                                        order.status === 'processing' ? "bg-blue-50 text-blue-700 border-blue-200" :
                                            "bg-gray-50 text-gray-700"
                                )}>
                                    {order.status}
                                </Badge>
                            </td>
                            <td className="p-4 align-middle">
                                <Badge variant="outline" className={cn(
                                    "capitalize",
                                    order.payment_status === 'paid' ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                )}>
                                    {order.payment_status}
                                </Badge>
                            </td>
                            <td className="p-4 align-middle font-medium">€{Number(order.total_amount).toFixed(2)}</td>
                            <td className="p-4 align-middle text-right text-gray-500 text-xs">
                                {new Date(order.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// 3. CUSTOMER TABLE
function CustomerTable({ customers, onViewProfile }: { customers: Profile[], onViewProfile: (profile: Profile) => void }) {
    if (customers.length === 0) {
        return (
            <div className="p-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
                <div className="flex flex-col items-center gap-3">
                    <Users className="h-10 w-10 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">Sem Clientes</h3>
                    <p className="text-gray-500 text-sm">Ainda não existem clientes registados.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <table className="w-full caption-bottom text-sm border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Nome</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Email</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Perfil</th>
                        <th className="h-12 px-6 text-right align-middle font-medium text-gray-500">Data Registo</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {customers.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 align-middle font-medium text-gray-900">{c.full_name || "N/A"}</td>
                            <td className="p-4 align-middle text-gray-600">{c.email}</td>
                            <td className="p-4 align-middle">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onViewProfile(c)}
                                    className="h-8 gap-2 text-gray-500 hover:text-black hover:bg-gray-100"
                                >
                                    <Eye className="h-4 w-4" />
                                    <span className="text-xs">Ver Perfil</span>
                                </Button>
                            </td>
                            <td className="p-4 align-middle text-right text-gray-500 text-xs">
                                {new Date(c.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


// 4. STAT CARD
function StatCard({ title, value, subtext, icon: Icon, trend }: any) {
    return (
        <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                {subtext && (
                    <div className="flex items-center text-xs mt-1">
                        {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
                        {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500 mr-1" />}
                        <span className={trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}>
                            {subtext}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// 5. EXPENSE TABLE
function ExpenseTable({
    expenses,
    onDelete,
    onEdit
}: {
    expenses: Expense[];
    onDelete: (id: string) => void;
    onEdit: (expense: Expense) => void;
}) {
    if (expenses.length === 0) {
        return (
            <div className="p-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
                <div className="flex flex-col items-center gap-3">
                    <CreditCard className="h-10 w-10 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">Sem Despesas Registadas</h3>
                    <p className="text-gray-500 text-sm">Adicione despesas para controlar os custos da operação.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-white overflow-hidden">
            <table className="w-full caption-bottom text-sm border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Descrição</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Categoria</th>
                        <th className="h-12 px-6 text-left align-middle font-medium text-gray-500">Data</th>
                        <th className="h-12 px-6 text-right align-middle font-medium text-gray-500">Valor</th>
                        <th className="h-12 px-6 text-right align-middle font-medium text-gray-500">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 align-middle font-medium text-gray-900">{expense.description}</td>
                            <td className="p-4 align-middle capitalize">
                                <Badge variant="outline" className="bg-gray-50">{expense.category}</Badge>
                            </td>
                            <td className="p-4 align-middle text-gray-500 text-xs">
                                {new Date(expense.expense_date || expense.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4 align-middle text-right font-medium text-red-600">- €{Number(expense.amount).toFixed(2)}</td>
                            <td className="p-4 align-middle text-right">
                                <Button variant="ghost" size="icon" onClick={() => onEdit(expense)} className="h-8 w-8 text-gray-500 hover:text-black hover:bg-gray-100">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => onDelete(expense.id)} className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// 6. CUSTOMER PROFILE MODAL
function CustomerProfileModal({ isOpen, onClose, customer, stats }: { isOpen: boolean, onClose: () => void, customer: Profile | null, stats: { totalOrders: number, totalSpent: number } }) {
    if (!customer) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] bg-white text-black p-0 overflow-hidden border-none shadow-2xl">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle className="text-lg font-bold font-display tracking-wide text-gray-900 flex items-center gap-2 uppercase">
                        <Users className="h-4 w-4 text-[#D4AF37]" />
                        Ficha de Cliente
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 pb-6 space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{customer.full_name || "Sem Nome"}</h3>
                                <Badge variant="outline" className="mt-2 text-[10px] uppercase tracking-wider bg-gray-50 text-gray-500 border-gray-200">
                                    {customer.role}
                                </Badge>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total Gasto</p>
                                <p className="text-xl font-bold text-[#D4AF37]">€ {stats.totalSpent.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <Mail className="h-3.5 w-3.5" />
                            <span className="text-sm">{customer.email}</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100/50 flex flex-col items-center justify-center text-center">
                            <span className="text-2xl font-bold text-gray-900">{stats.totalOrders}</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mt-1">Encomendas</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100/50 flex flex-col items-center justify-center text-center">
                            <span className="text-lg font-bold text-gray-900">{new Date(customer.created_at).toLocaleDateString()}</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mt-1">Registo</span>
                        </div>
                    </div>

                    {/* Details List */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-start gap-4 p-3 hover:bg-gray-50/50 rounded-lg transition-colors">
                            <div className="mt-0.5 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <Phone className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Telefone</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5">{customer.phone || "—"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 hover:bg-gray-50/50 rounded-lg transition-colors">
                            <div className="mt-0.5 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <MapPin className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Morada</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5 leading-relaxed">
                                    {customer.address || "—"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 justify-center pt-2">
                            <span className="text-[10px] font-mono text-gray-300 select-all cursor-pointer hover:text-gray-400 transition-colors" title="ID do Cliente">
                                #{customer.id}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                    <Button onClick={onClose} className="w-full h-11 bg-black text-white hover:bg-gray-800 rounded-lg font-medium tracking-wide text-xs uppercase transition-all shadow-md hover:shadow-lg">
                        Fechar Ficha
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// --- MAIN DASHBOARD LAYOUT ---
export function AdminDashboard() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, orders, customers, finance

    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<Profile[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [priceRange, setPriceRange] = useState("all"); // all, 0-20, 20-50, 50+

    // Dialog States
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);

    // Customer Profile Dialog State
    const [selectedCustomer, setSelectedCustomer] = useState<Profile | null>(null);
    const [isViewCustomerOpen, setIsViewCustomerOpen] = useState(false);

    // CMS State
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
    const [navItems, setNavItems] = useState<NavigationItem[]>([]);

    // CSV Import State
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [csvData, setCsvData] = useState<Array<Record<string, string>>>([]);
    const [csvFileName, setCsvFileName] = useState("");
    const [importLoading, setImportLoading] = useState(false);
    const [importResults, setImportResults] = useState<{ success: number; errors: string[] } | null>(null);

    // Gemini AI State
    const [geminiPrompt, setGeminiPrompt] = useState("");
    const [geminiLoading, setGeminiLoading] = useState(false);
    const [geminiProducts, setGeminiProducts] = useState<any[]>([]);
    const [geminiError, setGeminiError] = useState("");
    const [geminiFileContent, setGeminiFileContent] = useState("");
    const [geminiFileName, setGeminiFileName] = useState("");
    const [geminiMode, setGeminiMode] = useState<"chat" | "file">("chat");

    // CMS Dialog State
    const [isNavDialogOpen, setIsNavDialogOpen] = useState(false);
    const [navItemToEdit, setNavItemToEdit] = useState<NavigationItem | null>(null);
    const [navFormData, setNavFormData] = useState({ label: '', href: '', parent_id: 'none', sort_order: 0 });

    const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
    const [contentToEdit, setContentToEdit] = useState<ContentBlock | null>(null);
    const [contentFormData, setContentFormData] = useState({
        section_name: 'hero',
        title: '',
        description: '',
        image_url: '',
        link_url: '',
        link_text: '',
        is_active: true
    });

    // Pagination & Sort State
    const [customerSort, setCustomerSort] = useState("az");
    const [customerLimit, setCustomerLimit] = useState(10);
    const [orderSort, setOrderSort] = useState("date_desc");
    const [orderLimit, setOrderLimit] = useState(10);

    const [formData, setFormData] = useState({
        name: "",
        category: "perfumes",
        price: "0",
        stock: "0",
        image_url: "",
        description: "",
        show_on_home: false
    });

    const [expenseData, setExpenseData] = useState({
        description: "",
        amount: "",
        category: "supplier",
        recurrence: "one_time"
    });

    const supabase = createClient();

    // Data Fetching
    const fetchData = async () => {
        setLoading(true);

        // 1. Fetch Products
        const { data: pData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (pData) setProducts(pData);

        // 2. Fetch Orders
        const { data: oData } = await supabase.from('orders').select('*, profiles(*)').order('created_at', { ascending: false });
        if (oData) setOrders(oData as unknown as Order[]);

        // 3. Fetch Customers
        const { data: cData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (cData) setCustomers(cData);

        // 4. Fetch Expenses
        const { data: expensesData } = await supabase.from('expenses').select('*').order('created_at', { ascending: false });
        if (expensesData) setExpenses(expensesData as unknown as Expense[]);

        // Fetch Content & Menu (Safe fetch)
        try {
            const { data: contentData } = await supabase.from('content_blocks').select('*');
            if (contentData) setContentBlocks(contentData);

            const { data: navData } = await supabase.from('navigation_items').select('*').order('sort_order');
            if (navData) setNavItems(navData);
        } catch (e) {
            console.log("CMS tables might not exist yet");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) fetchData();
    }, [isAuthenticated]);

    // Handlers
    const handleLogin = () => {
        setIsAuthenticated(true);
        toast.success("Bem-vindo, Administrador.");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setActiveTab("dashboard");
    };

    const confirmDelete = async (product: Product) => {
        const { error } = await supabase.from('products').delete().eq('id', product.id);
        if (error) {
            toast.error("Erro ao eliminar produto");
        } else {
            toast.success("Produto eliminado com sucesso");
            fetchData();
        }
    };



    // --- SORT & PAGINATION LOGIC ---
    const sortedCustomers = [...customers].sort((a, b) => {
        if (customerSort === 'az') return a.full_name.localeCompare(b.full_name);
        if (customerSort === 'za') return b.full_name.localeCompare(a.full_name);
        return 0;
    }).slice(0, customerLimit);

    const sortedOrders = [...orders].sort((a, b) => {
        if (orderSort === 'date_desc') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (orderSort === 'date_asc') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (orderSort === 'amount_desc') return b.total_amount - a.total_amount;
        if (orderSort === 'amount_asc') return a.total_amount - b.total_amount;
        return 0;
    }).slice(0, orderLimit);

    // --- HANDLERS ---
    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            image_url: product.image_url || "",
            description: product.description || "",
            show_on_home: product.show_on_home || false
        });
        setIsEditOpen(true);
    };

    const handleAddClick = () => {
        setIsAddOpen(true);
        // Reset form...
        setFormData({
            name: "",
            category: "perfumes",
            price: "",
            stock: "",
            image_url: "",
            description: "",
            show_on_home: false
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            image_url: formData.image_url,
            description: formData.description,
            show_on_home: formData.show_on_home
        };

        // Validation: Max 15 products on home
        if (formData.show_on_home) {
            const currentFeatured = products.filter(p => p.show_on_home).length;
            // If editing, we exclude the current product from count if it was already featured (but here we check if we are *changing* it)
            // Logic: count how many *others* are featured.
            const isSelfFeatured = isEditOpen && selectedProduct?.show_on_home;
            const countOthers = isSelfFeatured ? currentFeatured - 1 : currentFeatured;

            if (countOthers >= 15) {
                toast.error("Máximo de 15 produtos na página inicial atingido!");
                return;
            }
        }

        if (isEditOpen && selectedProduct) {
            const { error } = await supabase.from('products').update(payload).eq('id', selectedProduct.id);
            if (!error) {
                toast.success("Produto atualizado!");
                setIsEditOpen(false);
                fetchData();
            }
        } else if (isAddOpen) {
            const { error } = await supabase.from('products').insert(payload);
            if (!error) {
                toast.success("Produto criado!");
                setIsAddOpen(false);
                fetchData();
            }
        }
    };



    const handleEditExpenseClick = (expense: Expense) => {
        setSelectedExpense(expense);
        setExpenseData({
            description: expense.description,
            amount: expense.amount.toString(),
            category: expense.category,
            recurrence: expense.recurrence || "one_time"
        });
        setIsEditExpenseOpen(true);
    }

    const handleAddExpenseClick = () => {
        setExpenseData({ description: "", amount: "", category: "supplier", recurrence: "one_time" });
        setIsExpenseOpen(true);
    }

    const handleSaveExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            description: expenseData.description,
            amount: parseFloat(expenseData.amount),
            category: expenseData.category,
            recurrence: expenseData.recurrence, // Add recurrence
            expense_date: new Date().toISOString()
        };

        if (isEditExpenseOpen && selectedExpense) {
            const { error } = await supabase.from('expenses').update(payload).eq('id', selectedExpense.id);
            if (!error) {
                toast.success("Despesa atualizada!");
                setIsEditExpenseOpen(false);
                fetchData();
            } else {
                console.error("ERRO NO UPDATE:", error);
                toast.error(`Erro ao atualizar: ${error.message} (${error.code})`);
            }
        } else {
            const { error } = await supabase.from('expenses').insert(payload);
            if (!error) {
                toast.success("Despesa registada!");
                setIsExpenseOpen(false);
                fetchData();
            } else {
                console.error("ERRO NO INSERT:", error);
                toast.error(`Erro ao registar: ${error.message} (${error.code})`);
            }
        }
    }

    const handleDeleteExpense = async (id: string) => {
        const { error } = await supabase.from('expenses').delete().eq('id', id);
        if (!error) {
            toast.success("Despesa removida");
            fetchData();
        } else {
            toast.error("Erro ao remover despesa");
        }
    }

    // --- CSV IMPORT HANDLERS ---
    const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCsvFileName(file.name);
        setImportResults(null);

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim());
            if (lines.length < 2) {
                toast.error("CSV vazio ou sem dados");
                return;
            }

            const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
            const rows: Array<Record<string, string>> = [];

            for (let i = 1; i < lines.length; i++) {
                const values: string[] = [];
                let current = '';
                let inQuotes = false;

                for (const char of lines[i]) {
                    if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === ',' && !inQuotes) {
                        values.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }
                values.push(current.trim());

                if (values.length === headers.length) {
                    const row: Record<string, string> = {};
                    headers.forEach((header, idx) => {
                        row[header] = values[idx]?.replace(/^"|"$/g, '') || '';
                    });
                    rows.push(row);
                }
            }

            setCsvData(rows);
            toast.success(`${rows.length} produtos encontrados no CSV`);
        };
        reader.readAsText(file, 'UTF-8');
    };

    const handleCsvImport = async () => {
        if (csvData.length === 0) return;
        setImportLoading(true);
        let success = 0;
        const errors: string[] = [];

        for (const row of csvData) {
            const payload = {
                name: row.name || '',
                description: row.description || '',
                price: parseFloat(row.price) || 0,
                category: row.category || 'outros',
                subcategory: row.subcategory || null,
                stock: parseInt(row.stock) || 0,
                image_url: row.image_url || '',
                show_on_home: row.show_on_home === 'true'
            };

            if (!payload.name || payload.price <= 0) {
                errors.push(`Linha ignorada: "${row.name || 'sem nome'}" - nome ou preço inválido`);
                continue;
            }

            const { error } = await supabase.from('products').insert(payload);
            if (error) {
                errors.push(`Erro "${payload.name}": ${error.message}`);
            } else {
                success++;
            }
        }

        setImportResults({ success, errors });
        setImportLoading(false);

        if (success > 0) {
            toast.success(`${success} produtos importados com sucesso!`);
            fetchData();
        }
        if (errors.length > 0) {
            toast.error(`${errors.length} erros durante a importação`);
        }
    };

    const handleDownloadTemplate = () => {
        const template = 'name,description,price,category,subcategory,stock,image_url,show_on_home\n"Exemplo Produto","Descrição do produto",19.90,cabelo,tratamento,50,,false';
        const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'template-produtos.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    // --- GEMINI AI HANDLERS ---
    const handleGeminiChat = async () => {
        if (!geminiPrompt.trim()) return;
        setGeminiLoading(true);
        setGeminiError("");
        setGeminiProducts([]);

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "create_product", prompt: geminiPrompt })
            });
            const data = await res.json();
            if (data.error) {
                setGeminiError(data.error);
            } else if (data.products) {
                setGeminiProducts(data.products);
                toast.success(`${data.products.length} produto(s) gerado(s) pelo Gemini!`);
            }
        } catch (err: any) {
            setGeminiError(err.message || "Erro de conexão");
        }
        setGeminiLoading(false);
    };

    const handleGeminiFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setGeminiFileName(file.name);
        setGeminiError("");
        setGeminiProducts([]);

        const reader = new FileReader();
        const isPdf = file.name.toLowerCase().endsWith('.pdf');
        reader.onload = (event) => {
            if (isPdf) {
                // Store base64 for PDFs (strip the data:...;base64, prefix)
                const base64 = (event.target?.result as string).split(',')[1];
                setGeminiFileContent(`__PDF_BASE64__${base64}`);
            } else {
                setGeminiFileContent(event.target?.result as string);
            }
            toast.success(`Ficheiro "${file.name}" carregado`);
        };
        if (isPdf) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file, 'UTF-8');
        }
    };

    const handleGeminiExtractFile = async () => {
        if (!geminiFileContent) return;
        setGeminiLoading(true);
        setGeminiError("");
        setGeminiProducts([]);

        try {
            const isPdf = geminiFileContent.startsWith('__PDF_BASE64__');
            const fileType = isPdf ? 'PDF' : geminiFileName.endsWith('.csv') ? 'CSV' : 'texto';
            const payload: any = {
                action: "extract_from_file",
                fileType
            };
            if (isPdf) {
                payload.fileBase64 = geminiFileContent.replace('__PDF_BASE64__', '');
            } else {
                payload.fileContent = geminiFileContent;
            }
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.error) {
                setGeminiError(data.error);
            } else if (data.products) {
                setGeminiProducts(data.products);
                toast.success(`${data.products.length} produto(s) extraído(s) do ficheiro!`);
            }
        } catch (err: any) {
            setGeminiError(err.message || "Erro de conexão");
        }
        setGeminiLoading(false);
    };

    const handleGeminiImport = async (productsToImport: any[]) => {
        let success = 0;
        const errors: string[] = [];

        for (const product of productsToImport) {
            const payload: Record<string, any> = {
                name: product.name,
                description: product.description || '',
                price: parseFloat(product.price) || 0,
                category: product.category || 'outros',
                subcategory: product.subcategory || null,
                stock: parseInt(product.stock) || 20,
                image_url: product.image_url || '',
                show_on_home: product.show_on_home || false,
            };

            // Rich fields
            if (product.brand) payload.brand = product.brand;
            if (product.volume) payload.volume = product.volume;
            if (product.gender) payload.gender = product.gender;
            if (product.concentration) payload.concentration = product.concentration;
            if (product.fragrance_family) payload.fragrance_family = product.fragrance_family;
            if (product.top_notes) payload.top_notes = product.top_notes;
            if (product.heart_notes) payload.heart_notes = product.heart_notes;
            if (product.base_notes) payload.base_notes = product.base_notes;
            if (product.long_description) payload.long_description = product.long_description;
            if (product.origin_country) payload.origin_country = product.origin_country;
            if (product.rating) payload.rating = parseFloat(product.rating) || 4.5;
            if (product.review_count) payload.review_count = parseInt(product.review_count) || 0;
            if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                payload.images = product.images;
            }

            if (!payload.name || payload.price <= 0) {
                errors.push(`"${product.name || 'sem nome'}" - nome ou preço inválido`);
                continue;
            }

            const { error } = await supabase.from('products').insert(payload);
            if (error) {
                errors.push(`"${payload.name}": ${error.message}`);
            } else {
                success++;
            }
        }

        if (success > 0) {
            toast.success(`${success} produto(s) importado(s) com sucesso!`);
            fetchData();
        }
        if (errors.length > 0) {
            toast.error(`${errors.length} erro(s): ${errors[0]}`);
            setGeminiError(errors.join('\n'));
        }

        return { success, errors };
    };

    // --- FILTERS LOGIC ---
    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
        let matchesPrice = true;
        if (priceRange === "0-20") matchesPrice = p.price < 20;
        if (priceRange === "20-50") matchesPrice = p.price >= 20 && p.price <= 50;
        if (priceRange === "50+") matchesPrice = p.price > 50;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // --- FINANCE LOGIC (UPDATED) ---
    const totalRevenue = orders.reduce((acc, order) => order.payment_status === 'paid' ? acc + Number(order.total_amount) : acc, 0);
    const totalExpenses = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);
    const netProfit = totalRevenue - totalExpenses;

    const ordersToday = orders.filter(o => {
        const d = new Date(o.created_at);
        const today = new Date();
        return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    }).length;

    // MONTHLY FINANCIAL DATA (2026)
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthlyData = months.map((month, index) => {
        // Filter orders for this month in 2026 (or 2025/current year if strict)
        // For demo, let's assume we want to show 2026, or just general monthly aggregation regardless of year if data is sparse,
        // BUT user asked precisely for "all months of 2026".
        const currentYear = 2026;

        const monthRevenue = orders
            .filter(o => {
                const d = new Date(o.created_at);
                return d.getMonth() === index && (d.getFullYear() === currentYear || d.getFullYear() === 2025); // Including 2025 for demo data visibility if 2026 is empty
            })
            .reduce((acc, o) => o.payment_status === 'paid' ? acc + Number(o.total_amount) : acc, 0);

        const monthExpenses = expenses
            .filter(e => {
                const d = new Date(e.expense_date || e.created_at);
                return d.getMonth() === index && (d.getFullYear() === currentYear || d.getFullYear() === 2025);
            })
            .reduce((acc, e) => acc + Number(e.amount), 0);

        return {
            name: month,
            Receita: monthRevenue,
            Despesa: monthExpenses
        };
    });

    const expensesByCategory = expenses.reduce((acc: any, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
    }, {});

    const pieData = Object.keys(expensesByCategory).map((key, index) => ({
        name: key,
        value: expensesByCategory[key],
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const customerStats = useMemo(() => {
        if (!selectedCustomer) return { totalOrders: 0, totalSpent: 0 };
        const userOrders = orders.filter(o => o.user_id === selectedCustomer.id);
        const totalSpent = userOrders.reduce((acc, o) => o.payment_status === 'paid' ? acc + Number(o.total_amount) : acc, 0);
        return { totalOrders: userOrders.length, totalSpent };
    }, [selectedCustomer, orders]);

    if (!isAuthenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    // --- CMS HANDLERS ---
    const handleAddNavClick = () => {
        setNavItemToEdit(null);
        setNavFormData({ label: '', href: '', parent_id: 'none', sort_order: navItems.length + 1 });
        setIsNavDialogOpen(true);
    };

    const handleEditNavClick = (item: NavigationItem) => {
        setNavItemToEdit(item);
        setNavFormData({
            label: item.label,
            href: item.href || '',
            parent_id: item.parent_id || 'none',
            sort_order: item.sort_order
        });
        setIsNavDialogOpen(true);
    };

    const handleDeleteNavItem = async (id: string) => {
        const supabase = createClient();
        const { error } = await supabase.from('navigation_items').delete().eq('id', id);

        if (error) {
            toast.error("Erro ao eliminar item: " + error.message);
        } else {
            toast.success("Item eliminado com sucesso!");
            fetchData();
        }
    };

    const handleSaveNavItem = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();

        const payload = {
            label: navFormData.label,
            href: navFormData.href,
            parent_id: navFormData.parent_id === 'none' ? null : navFormData.parent_id,
            sort_order: navFormData.sort_order,
            is_active: true
        };

        let error;
        if (navItemToEdit) {
            const { error: err } = await supabase
                .from('navigation_items')
                .update(payload)
                .eq('id', navItemToEdit.id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('navigation_items')
                .insert([payload]);
            error = err;
        }

        if (error) {
            toast.error("Erro ao guardar item: " + error.message);
        } else {
            toast.success(navItemToEdit ? "Item atualizado!" : "Item criado!");
            setIsNavDialogOpen(false);
            fetchData();
        }
    };

    const handleDeleteContent = async (id: string) => {
        const supabase = createClient();
        const { error } = await supabase.from('content_blocks').delete().eq('id', id);
        if (!error) {
            toast.success("Bloco removido!");
            fetchData();
        } else {
            toast.error("Erro ao remover bloco");
        }
    };

    const handleEditContent = (block: ContentBlock) => {
        setContentToEdit(block);
        setContentFormData({
            section_name: block.section_name,
            title: block.title,
            description: block.description || '',
            image_url: block.image_url || '',
            link_url: block.link_url || '',
            link_text: block.link_text || '',
            is_active: block.is_active
        });
        setIsContentDialogOpen(true);
    };

    const handleSaveContent = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        const payload = { ...contentFormData };

        let error;
        if (contentToEdit) {
            const { error: err } = await supabase.from('content_blocks').update(payload).eq('id', contentToEdit.id);
            error = err;
        } else {
            const { error: err } = await supabase.from('content_blocks').insert([payload]);
            error = err;
        }

        if (error) {
            toast.error("Erro ao guardar conteúdo: " + error.message);
        } else {
            toast.success("Conteúdo guardado!");
            setIsContentDialogOpen(false);
            fetchData();
        }
    };

    const handleSeedInitialContent = async () => {
        const supabase = createClient();
        const initialBlocks = [
            {
                section_name: 'hero',
                title: 'Beleza Redefinida',
                description: 'Descubra a nossa coleção exclusiva de produtos premium.',
                image_url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000',
                link_url: '/shop',
                link_text: 'Explorar Coleção',
                is_active: true
            },
            {
                section_name: 'highlight',
                title: 'Novidades',
                image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143af7be?q=80&w=1587',
                link_url: '/shop',
                link_text: 'Ver Agora',
                is_active: true
            },
            {
                section_name: 'highlight',
                title: 'Mais Vendidos',
                image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1587',
                link_url: '/shop',
                link_text: 'Ver Agora',
                is_active: true
            },
            {
                section_name: 'highlight',
                title: 'Ofertas',
                image_url: 'https://images.unsplash.com/photo-1556228720-19777f59e9b0?q=80&w=1587',
                link_url: '/shop',
                link_text: 'Ver Agora',
                is_active: true
            }
        ];

        const { error } = await supabase.from('content_blocks').insert(initialBlocks);

        if (error) {
            toast.error("Erro ao popular: " + error.message);
        } else {
            toast.success("Conteúdo inicial criado com sucesso!");
            fetchData();
        }
    };

    const handleAddNewContent = () => {
        setContentToEdit(null);
        setContentFormData({
            section_name: 'hero',
            title: '',
            description: '',
            image_url: '',
            link_url: '',
            link_text: '',
            is_active: true
        });
        setIsContentDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 bg-black text-white shrink-0 flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold font-display tracking-widest text-[#D4AF37]">SF COSMETICS</h1>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Painel de Gestão</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={LayoutDashboard}>Visão Geral</NavButton>
                    <NavButton active={activeTab === "products"} onClick={() => setActiveTab("products")} icon={Package}>Produtos & Stock</NavButton>
                    <NavButton active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon={ShoppingBag}>Encomendas</NavButton>
                    <NavButton active={activeTab === "customers"} onClick={() => setActiveTab("customers")} icon={Users}>Clientes</NavButton>
                    <NavButton active={activeTab === "finance"} onClick={() => setActiveTab("finance")} icon={CreditCard}>Financeiro</NavButton>
                    <NavButton active={activeTab === "content"} onClick={() => setActiveTab("content")} icon={ImageIcon}>Conteúdo Site</NavButton>
                    <NavButton active={activeTab === "menu"} onClick={() => setActiveTab("menu")} icon={List}>Menu Navegação</NavButton>
                    <div className="border-t border-gray-800 my-3" />
                    <NavButton active={activeTab === "gemini"} onClick={() => setActiveTab("gemini")} icon={Sparkles}>Gemini AI</NavButton>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Sair
                    </Button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-auto h-screen">
                <div className="p-8 max-w-7xl mx-auto space-y-8">

                    {/* Header Section */}
                    <div className="w-full border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                                    {activeTab === "dashboard" && "Dashboard"}
                                    {activeTab === "products" && "Gestão de Produtos"}
                                    {activeTab === "orders" && "Encomendas"}
                                    {activeTab === "customers" && "Clientes"}
                                    {activeTab === "finance" && "Departamento Financeiro"}
                                    {activeTab === "content" && "Gestão de Conteúdo"}
                                    {activeTab === "menu" && "Menu de Navegação"}
                                    {activeTab === "gemini" && "Assistente Gemini AI"}
                                </h2>
                                <p className="text-gray-500 mt-1">Bem-vindo de volta, Admin.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {activeTab === "products" && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="gap-2 border-dashed border-gray-300 text-gray-600 hover:text-black hover:border-black"
                                            onClick={() => { setIsImportOpen(true); setCsvData([]); setCsvFileName(''); setImportResults(null); }}
                                        >
                                            <Upload className="h-4 w-4" /> Importar CSV
                                        </Button>
                                        <Button className="bg-black hover:bg-gray-800 text-white gap-2 shadow-lg hover:shadow-xl transition-all" onClick={handleAddClick}>
                                            <Plus className="h-4 w-4" /> Novo Produto
                                        </Button>
                                    </div>
                                )}
                                {activeTab === "content" && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 border-dashed border-gray-300 text-gray-500 hover:text-black hover:border-black"
                                            onClick={handleSeedInitialContent}
                                        >
                                            Popular com Base de Dados
                                        </Button>
                                        <Button
                                            onClick={handleAddNewContent}
                                            className="h-9 bg-black text-white hover:bg-gray-800 shadow-sm gap-2"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Novo Bloco
                                        </Button>
                                    </div>
                                )}
                                {activeTab === "menu" && (
                                    <Button className="bg-black hover:bg-gray-800 text-white gap-2 shadow-lg hover:shadow-xl transition-all" onClick={handleAddNavClick}>
                                        <Plus className="h-4 w-4" /> Novo Item Principal
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CONTENT VIEWS */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <StatCard title="Receita (Líq.)" value={`€ ${netProfit.toFixed(2)}`} subtext="Após despesas" trend={netProfit > 0 ? "up" : "down"} icon={CreditCard} />
                                <StatCard title="Encomendas" value={orders.length} subtext={`${ordersToday} hoje`} trend="neutral" icon={ShoppingBag} />
                                <StatCard title="Clientes" value={customers.length} subtext="Total Registado" trend="neutral" icon={Users} />
                                <StatCard title="Produtos" value={products.length} subtext="Em catálogo" trend="neutral" icon={Package} />
                            </div>

                            {/* Recent Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader><CardTitle>Últimas Encomendas</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {orders.slice(0, 5).map(order => (
                                                <div key={order.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                    <div>
                                                        <p className="font-medium">Encomenda #{order.id.slice(0, 8)}</p>
                                                        <p className="text-sm text-gray-500">{order.profiles?.full_name || "Cliente"} • {new Date(order.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    <Badge variant="outline" className={order.payment_status === 'paid' ? "text-green-600 bg-green-50" : "text-yellow-600 bg-yellow-50"}>
                                                        {order.payment_status}
                                                    </Badge>
                                                </div>
                                            ))}
                                            {orders.length === 0 && <p className="text-sm text-gray-500 italic">Sem encomendas recentes.</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle>Destaques de Stock</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {products.slice(0, 3).map(p => (
                                                <div key={p.id} className="flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-gray-100 rounded-md relative overflow-hidden">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    {p.image_url && <img src={p.image_url} className="w-full h-full object-cover" alt="" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm">{p.name}</p>
                                                        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1">
                                                            <div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: `${Math.min(p.stock * 2, 100)}%` }} />
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500">{p.stock} un.</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "products" && (
                        <div className="space-y-4">
                            {/* FILTERS TOOLBAR */}
                            <Card className="p-4 border-none shadow-sm flex flex-wrap gap-4 items-end">
                                <div className="flex-1 min-w-[200px]">
                                    <Label className="text-xs text-gray-500 mb-1.5 block">Pesquisar</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Nome ou categoria..."
                                            className="pl-10 h-9 bg-gray-50 border-gray-200"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-[180px]">
                                    <Label className="text-xs text-gray-500 mb-1.5 block">Categoria</Label>
                                    <div className="relative">
                                        <select
                                            className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                        >
                                            <option value="all">Todas</option>
                                            <option value="perfumes">Perfumes</option>
                                            <option value="corpo">Corpo</option>
                                            <option value="rosto">Rosto</option>
                                            <option value="cabelo">Cabelo</option>
                                            <option value="maquiagem">Maquilhagem</option>
                                            <option value="bijuteria">Bijuteria</option>
                                            <option value="aparelhos">Aparelhos</option>
                                            <option value="outros">Outros</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="w-[180px]">
                                    <Label className="text-xs text-gray-500 mb-1.5 block">Preço</Label>
                                    <div className="relative">
                                        <select
                                            className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                                            value={priceRange}
                                            onChange={(e) => setPriceRange(e.target.value)}
                                        >
                                            <option value="all">Todos os Preços</option>
                                            <option value="0-20">Até €20</option>
                                            <option value="20-50">€20 - €50</option>
                                            <option value="50+">Mais de €50</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500" onClick={() => { setSearchTerm(""); setCategoryFilter("all"); setPriceRange("all"); }}>
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </Card>

                            <Card className="border-none shadow-sm">
                                <CardContent className="p-0">
                                    <ProductTable products={filteredProducts} onDelete={confirmDelete} onEdit={handleEditClick} />
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mb-2">
                                <div className="text-sm text-gray-500">
                                    Total de Encomendas: <strong>{orders.length}</strong>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <select
                                            className="h-8 rounded-md border border-gray-200 bg-white px-2 py-0 text-xs outline-none focus:border-black appearance-none cursor-pointer pr-8"
                                            value={orderSort}
                                            onChange={(e) => setOrderSort(e.target.value)}
                                        >
                                            <option value="date_desc">Mais Recentes</option>
                                            <option value="date_asc">Mais Antigas</option>
                                            <option value="amount_desc">Maior Valor</option>
                                            <option value="amount_asc">Menor Valor</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <div className="relative">
                                        <select
                                            className="h-8 rounded-md border border-gray-200 bg-white px-2 py-0 text-xs outline-none focus:border-black appearance-none cursor-pointer pr-8"
                                            value={orderLimit}
                                            onChange={(e) => setOrderLimit(Number(e.target.value))}
                                        >
                                            <option value={10}>10 por página</option>
                                            <option value={20}>20 por página</option>
                                            <option value={50}>50 por página</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle>Histórico de Encomendas</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <OrderTable orders={sortedOrders} />
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "customers" && (
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mb-2">
                                <div className="text-sm text-gray-500">
                                    Total de Clientes: <strong>{customers.length}</strong>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <select
                                            className="h-8 rounded-md border border-gray-200 bg-white px-2 py-0 text-xs outline-none focus:border-black appearance-none cursor-pointer pr-8"
                                            value={customerSort}
                                            onChange={(e) => setCustomerSort(e.target.value)}
                                        >
                                            <option value="az">A-Z</option>
                                            <option value="za">Z-A</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    <div className="relative">
                                        <select
                                            className="h-8 rounded-md border border-gray-200 bg-white px-2 py-0 text-xs outline-none focus:border-black appearance-none cursor-pointer pr-8"
                                            value={customerLimit}
                                            onChange={(e) => setCustomerLimit(Number(e.target.value))}
                                        >
                                            <option value={10}>10 por página</option>
                                            <option value={20}>20 por página</option>
                                            <option value={50}>50 por página</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle>Base de Clientes</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <CustomerTable customers={sortedCustomers} onViewProfile={(c) => { setSelectedCustomer(c); setIsViewCustomerOpen(true); }} />
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "finance" && (
                        <div className="space-y-8">
                            {/* Financial Overview Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-white border-none shadow-sm">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Receita Bruta</CardTitle></CardHeader>
                                    <CardContent><div className="text-2xl font-bold text-green-600">€ {totalRevenue.toFixed(2)}</div></CardContent>
                                </Card>
                                <Card className="bg-white border-none shadow-sm">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Despesas Totais</CardTitle></CardHeader>
                                    <CardContent><div className="text-2xl font-bold text-red-600">€ {totalExpenses.toFixed(2)}</div></CardContent>
                                </Card>
                                <Card className="bg-black text-white border-none shadow-sm">
                                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Lucro Líquido</CardTitle></CardHeader>
                                    <CardContent><div className="text-2xl font-bold text-[#D4AF37]">€ {netProfit.toFixed(2)}</div></CardContent>
                                </Card>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Balanço Financeiro (2026)</CardTitle>
                                        <CardDescription>Evolução mensal de receitas e despesas.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                                <Area type="monotone" dataKey="Receita" stroke="#10b981" fillOpacity={1} fill="url(#colorReceita)" />
                                                <Area type="monotone" dataKey="Despesa" stroke="#ef4444" fillOpacity={1} fill="url(#colorDespesa)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-sm h-full flex flex-col">
                                    <CardHeader className="flex flex-row items-start justify-between pb-2 mb-4">
                                        <div className="space-y-1">
                                            <CardTitle className="mb-2">Distribuição de Despesas</CardTitle>
                                            <CardDescription>Por categoria de custo.</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={handleAddExpenseClick} className="ml-auto h-7 px-3 text-[10px] gap-1 uppercase tracking-wider font-semibold">
                                            <Plus className="h-3 w-3" /> Gerir
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="flex-1 min-h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    label={({ name, percent }: { name?: string, percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                                    labelLine={false}
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend verticalAlign="bottom" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                <Card className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Histórico de Despesas</CardTitle>
                                        <CardDescription>Gestão detalhada de custos operacionais.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <ExpenseTable expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpenseClick} />
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Histórico de Receitas</CardTitle>
                                        <CardDescription>Entradas financeiras recentes (Encomendas).</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="rounded-md border bg-white overflow-hidden max-h-[400px] overflow-y-auto">
                                            <table className="w-full caption-bottom text-sm border-collapse">
                                                <thead className="bg-gray-50 border-b sticky top-0">
                                                    <tr>
                                                        <th className="h-10 px-4 text-left font-medium text-gray-500">ID</th>
                                                        <th className="h-10 px-4 text-left font-medium text-gray-500">Data</th>
                                                        <th className="h-10 px-4 text-right font-medium text-gray-500">Valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {orders.filter(o => o.payment_status === 'paid').map((order) => (
                                                        <tr key={order.id} className="hover:bg-gray-50/50">
                                                            <td className="p-3 font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</td>
                                                            <td className="p-3 text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                                            <td className="p-3 text-right font-medium text-green-600">+ €{Number(order.total_amount).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                    {orders.filter(o => o.payment_status === 'paid').length === 0 && (
                                                        <tr>
                                                            <td colSpan={3} className="p-4 text-center text-sm text-gray-500">Sem receitas registadas.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* CMS CONTENT VIEW */}
                    {activeTab === "content" && (
                        <div className="flex flex-col space-y-4 w-full">
                            {/* Filter Card */}
                            <Card className="p-4 border-none shadow-sm flex flex-wrap gap-4 items-end">
                                <div className="flex-1 min-w-[200px]">
                                    <Label className="text-xs text-gray-500 mb-1.5 block">Pesquisar</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Nome do bloco, título..."
                                            className="pl-10 h-9 bg-gray-50 border-gray-200 focus:bg-white transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm bg-white overflow-hidden">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 pl-6 h-12">Secção</TableHead>
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 h-12">Título</TableHead>
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 h-12">Link</TableHead>
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 text-right pr-6 h-12">Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {contentBlocks.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-40 text-center text-gray-500">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <PackageOpen className="h-8 w-8 text-gray-300" />
                                                            <p>Nenhum conteúdo configurado.</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                contentBlocks.map((block) => (
                                                    <TableRow key={block.id} className="group hover:bg-gray-50/50 transition-colors">
                                                        <TableCell className="font-medium text-gray-900 pl-6 py-4 lowercase first-letter:uppercase">
                                                            {block.section_name === 'highlight' ? 'Destaque' : block.section_name}
                                                        </TableCell>
                                                        <TableCell className="py-4">{block.title}</TableCell>
                                                        <TableCell className="py-4">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 font-mono">
                                                                {block.link_url || '-'}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-right pr-6 py-4">
                                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                                    onClick={() => handleEditContent(block)}
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                                    onClick={() => handleDeleteContent(block.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* CMS MENU VIEW */}
                    {activeTab === "menu" && (
                        <div className="flex flex-col space-y-4 w-full">
                            {/* Filter Card */}
                            <Card className="p-4 border-none shadow-sm flex flex-wrap gap-4 items-end">
                                <div className="flex-1 min-w-[200px]">
                                    <Label className="text-xs text-gray-500 mb-1.5 block">Pesquisar</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Nome do link, url..."
                                            className="pl-10 h-9 bg-gray-50 border-gray-200 focus:bg-white transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-none shadow-sm bg-white overflow-hidden">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 pl-6 h-12 w-[40%]">Nome do Link</TableHead>
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 h-12">Destino (URL)</TableHead>
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 text-right h-12">Ordem</TableHead>
                                                <TableHead className="font-semibold text-xs uppercase tracking-wider text-gray-500 text-right pr-6 h-12">Ações</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {navItems.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-40 text-center text-gray-500">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <p className="text-sm font-medium">Menu vazio.</p>
                                                            <Button variant="link" className="text-[#D4AF37] h-auto p-0">Adicionar item inicial</Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                navItems.filter(i => !i.parent_id).map((parent) => (
                                                    <React.Fragment key={parent.id}>
                                                        <TableRow key={parent.id} className="group hover:bg-gray-50/30 transition-colors border-b border-gray-100">
                                                            <TableCell className="font-bold text-gray-900 flex items-center gap-3 pl-6 py-4">
                                                                <div className="p-1.5 rounded-md text-gray-300 hover:text-[#D4AF37] hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors">
                                                                    <GripVertical className="h-4 w-4" />
                                                                </div>
                                                                {parent.label}
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">{parent.href || "#"}</code>
                                                            </TableCell>
                                                            <TableCell className="text-right text-gray-500 font-mono text-xs py-4">{parent.sort_order}</TableCell>
                                                            <TableCell className="text-right pr-6 py-4">
                                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" onClick={() => handleEditNavClick(parent)}>
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" onClick={() => handleDeleteNavItem(parent.id)}>
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                        {navItems.filter(child => child.parent_id === parent.id).map(child => (
                                                            <TableRow key={child.id} className="hover:bg-gray-50/30 transition-colors border-b border-gray-50">
                                                                <TableCell className="pl-12 py-3 flex items-center gap-3">
                                                                    <CornerDownRight className="h-4 w-4 text-gray-300" />
                                                                    <span className="text-gray-600 text-sm">{child.label}</span>
                                                                </TableCell>
                                                                <TableCell className="py-3">
                                                                    <code className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{child.href}</code>
                                                                </TableCell>
                                                                <TableCell className="text-right text-gray-400 text-xs font-mono py-3">{child.sort_order}</TableCell>
                                                                <TableCell className="text-right pr-6 py-3">
                                                                    <div className="flex items-center justify-end gap-1">
                                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg" onClick={() => handleEditNavClick(child)}>
                                                                            <Edit className="h-3 w-3" />
                                                                        </Button>
                                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg" onClick={() => handleDeleteNavItem(child.id)}>
                                                                            <Trash2 className="h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* GEMINI AI VIEW */}
                    {activeTab === "gemini" && (
                        <div className="space-y-6">
                            {/* Mode Switcher */}
                            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                                <button
                                    onClick={() => { setGeminiMode("chat"); setGeminiProducts([]); setGeminiError(""); }}
                                    className={cn(
                                        "px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                                        geminiMode === "chat" ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    <Bot className="h-4 w-4" /> Chat com Gemini
                                </button>
                                <button
                                    onClick={() => { setGeminiMode("file"); setGeminiProducts([]); setGeminiError(""); }}
                                    className={cn(
                                        "px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                                        geminiMode === "file" ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    <FileText className="h-4 w-4" /> Extrair de Ficheiro
                                </button>
                            </div>

                            {/* Chat Mode */}
                            {geminiMode === "chat" && (
                                <Card className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                                            Criar Produtos com IA
                                        </CardTitle>
                                        <CardDescription>
                                            Escreve o que queres e o Gemini cria os produtos automaticamente. Exemplos:
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Example prompts */}
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Adiciona um perfume masculino Asad Bourbon a 30€",
                                                "Cria 5 champôs profissionais entre 10€ e 25€",
                                                "Adiciona uma plancha Babyliss Pro a 89.90€",
                                                "Cria um kit de maquilhagem Andreia com 3 produtos",
                                            ].map((example) => (
                                                <button
                                                    key={example}
                                                    onClick={() => setGeminiPrompt(example)}
                                                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-gray-600 transition-colors"
                                                >
                                                    {example}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Input */}
                                        <div className="flex gap-2">
                                            <textarea
                                                value={geminiPrompt}
                                                onChange={(e) => setGeminiPrompt(e.target.value)}
                                                placeholder="Ex: Adiciona um perfume masculino chamado Asad Bourbon a 30 euros e procura uma foto dele..."
                                                className="flex-1 min-h-[80px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none resize-none"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleGeminiChat();
                                                    }
                                                }}
                                            />
                                            <Button
                                                onClick={handleGeminiChat}
                                                disabled={geminiLoading || !geminiPrompt.trim()}
                                                className="bg-[#D4AF37] text-black hover:bg-[#b8952b] font-bold px-6 self-end"
                                            >
                                                {geminiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* File Mode */}
                            {geminiMode === "file" && (
                                <Card className="border-none shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-[#D4AF37]" />
                                            Extrair Produtos de Ficheiro
                                        </CardTitle>
                                        <CardDescription>
                                            Carrega um CSV ou ficheiro de texto e o Gemini extrai os produtos automaticamente.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#D4AF37] transition-colors">
                                            <input
                                                type="file"
                                                accept=".csv,.txt,.tsv,.pdf"
                                                onChange={handleGeminiFileUpload}
                                                className="hidden"
                                                id="gemini-file-upload"
                                            />
                                            <label htmlFor="gemini-file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                                <FileSpreadsheet className="h-8 w-8 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {geminiFileName || "Clica para selecionar um ficheiro (CSV, TXT, PDF)"}
                                                </span>
                                            </label>
                                        </div>

                                        {geminiFileContent && (
                                            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                    <span className="text-sm text-green-700 font-medium">{geminiFileName} carregado</span>
                                                </div>
                                                <Button
                                                    onClick={handleGeminiExtractFile}
                                                    disabled={geminiLoading}
                                                    className="bg-[#D4AF37] text-black hover:bg-[#b8952b] font-bold gap-2"
                                                >
                                                    {geminiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                                    Extrair Produtos
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Loading */}
                            {geminiLoading && (
                                <Card className="border-none shadow-sm">
                                    <CardContent className="flex flex-col items-center gap-4 py-12">
                                        <div className="relative">
                                            <Loader2 className="h-10 w-10 text-[#D4AF37] animate-spin" />
                                            <Sparkles className="h-4 w-4 text-[#D4AF37] absolute -top-1 -right-1 animate-pulse" />
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium">Gemini a processar... (a pesquisar imagens reais pode demorar um pouco)</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Error */}
                            {geminiError && (
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                        <span className="text-sm text-red-700 font-medium">Erro</span>
                                    </div>
                                    <p className="text-xs text-red-600 whitespace-pre-wrap">{geminiError}</p>
                                </div>
                            )}

                            {/* Generated Products Preview */}
                            {geminiProducts.length > 0 && (
                                <Card className="border-none shadow-sm">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">
                                                {geminiProducts.length} Produto(s) Gerado(s)
                                            </CardTitle>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setGeminiProducts([])}
                                                >
                                                    Limpar
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-[#D4AF37] text-black hover:bg-[#b8952b] font-bold gap-2"
                                                    onClick={async () => {
                                                        const result = await handleGeminiImport(geminiProducts);
                                                        if (result.success > 0) {
                                                            setGeminiProducts([]);
                                                        }
                                                    }}
                                                >
                                                    <Upload className="h-3.5 w-3.5" />
                                                    Importar Todos para a Loja
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {geminiProducts.map((product, idx) => (
                                                <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                                                    <div className="relative h-40 w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center group">
                                                        {product.image_url ? (
                                                            /* eslint-disable-next-line @next/next/no-img-element */
                                                            <img
                                                                src={product.image_url}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                                }}
                                                            />
                                                        ) : null}
                                                        <div className={cn("flex flex-col items-center gap-2 text-gray-400 absolute inset-0 items-center justify-center bg-gray-100", product.image_url ? "hidden" : "flex")}>
                                                            <ImageIcon className="h-8 w-8" />
                                                            <span className="text-[10px]">Sem imagem</span>
                                                        </div>
                                                    </div>
                                                    {/* Image URL input */}
                                                    <div className="flex gap-1">
                                                        <input
                                                            type="url"
                                                            placeholder="Colar URL de imagem..."
                                                            defaultValue={product.image_url || ''}
                                                            className="flex-1 text-[10px] border border-gray-200 rounded px-2 py-1 focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                                                            onBlur={(e) => {
                                                                const url = e.target.value.trim();
                                                                if (url !== (product.image_url || '')) {
                                                                    setGeminiProducts(prev => prev.map((p, i) =>
                                                                        i === idx ? { ...p, image_url: url } : p
                                                                    ));
                                                                }
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const url = (e.target as HTMLInputElement).value.trim();
                                                                    setGeminiProducts(prev => prev.map((p, i) =>
                                                                        i === idx ? { ...p, image_url: url } : p
                                                                    ));
                                                                }
                                                            }}
                                                        />
                                                        <a
                                                            href={`https://www.google.com/search?q=${encodeURIComponent(product.name + ' produto')}&tbm=isch&udm=2`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="shrink-0 inline-flex items-center px-1.5 py-1 border border-gray-200 rounded text-[10px] text-gray-500 hover:bg-gray-50"
                                                            title="Pesquisar no Google Images"
                                                        >
                                                            <Search className="h-3 w-3" />
                                                        </a>
                                                    </div>
                                                    <div>
                                                        {product.brand && (
                                                            <p className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">{product.brand}</p>
                                                        )}
                                                        <h4 className="font-bold text-sm text-gray-900">{product.name}</h4>
                                                        {product.concentration && (
                                                            <p className="text-[10px] text-gray-400">{product.concentration} {product.volume && `• ${product.volume}`}</p>
                                                        )}
                                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                                                    </div>
                                                    {(product.top_notes || product.heart_notes || product.base_notes) && (
                                                        <div className="text-[10px] text-gray-500 space-y-0.5 border-t pt-2">
                                                            {product.top_notes && <p><span className="font-semibold">Topo:</span> {product.top_notes}</p>}
                                                            {product.heart_notes && <p><span className="font-semibold">Coração:</span> {product.heart_notes}</p>}
                                                            {product.base_notes && <p><span className="font-semibold">Base:</span> {product.base_notes}</p>}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-[#D4AF37]">€{parseFloat(product.price || 0).toFixed(2)}</span>
                                                        <div className="flex gap-1">
                                                            {product.fragrance_family && <Badge variant="outline" className="text-[10px]">{product.fragrance_family}</Badge>}
                                                            <Badge variant="outline" className="text-[10px] capitalize">{product.category}</Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1 h-7 text-xs"
                                                            onClick={() => {
                                                                setGeminiProducts(prev => prev.filter((_, i) => i !== idx));
                                                            }}
                                                        >
                                                            <Trash2 className="h-3 w-3 mr-1" /> Remover
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1 h-7 text-xs"
                                                            onClick={async () => {
                                                                toast.info(`A pesquisar imagens para "${product.name}"...`);
                                                                try {
                                                                    const searchQuery = [product.name, product.brand, 'perfume'].filter(Boolean).join(' ');
                                                                    const res = await fetch("/api/gemini", {
                                                                        method: "POST",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({ action: "search_image", prompt: searchQuery })
                                                                    });
                                                                    const data = await res.json();
                                                                    if (data.images?.length > 0) {
                                                                        setGeminiProducts(prev => prev.map((p, i) =>
                                                                            i === idx ? { ...p, image_url: data.images[0], images: data.images } : p
                                                                        ));
                                                                        toast.success(`${data.images.length} imagem(ns) encontrada(s)!`);
                                                                    } else {
                                                                        toast.error("Nenhuma imagem encontrada");
                                                                    }
                                                                } catch {
                                                                    toast.error("Erro na pesquisa");
                                                                }
                                                            }}
                                                        >
                                                            <ImageIcon className="h-3 w-3 mr-1" /> Imagem
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="flex-1 h-7 text-xs bg-black text-white hover:bg-gray-800"
                                                            onClick={async () => {
                                                                await handleGeminiImport([product]);
                                                                setGeminiProducts(prev => prev.filter((_, i) => i !== idx));
                                                            }}
                                                        >
                                                            <Plus className="h-3 w-3 mr-1" /> Adicionar
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Tips Card */}
                            <Card className="border-none shadow-sm bg-gradient-to-r from-gray-50 to-white">
                                <CardContent className="py-6">
                                    <div className="flex items-start gap-3">
                                        <Info className="h-5 w-5 text-[#D4AF37] mt-0.5 shrink-0" />
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-bold text-gray-900">Dicas de utilização</h4>
                                            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                                                <li><strong>Chat:</strong> &quot;Adiciona um perfume masculino Sauvage a 85€&quot;</li>
                                                <li><strong>Chat:</strong> &quot;Cria 10 produtos de cabelo de marcas profissionais entre 8€ e 30€&quot;</li>
                                                <li><strong>Chat:</strong> &quot;Adiciona todos os produtos do catálogo Babyliss&quot;</li>
                                                <li><strong>Ficheiro:</strong> Carrega um CSV com listagem de produtos e preços</li>
                                                <li>Depois de gerar, podes remover produtos individuais antes de importar</li>
                                                <li>As imagens são sugeridas pelo Gemini — podes depois alterar no editor de produto</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main >

            {/* DIALOGS */}
            < DashboardModal
                isOpen={isAddOpen || isEditOpen
                }
                onClose={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                title={isAddOpen ? "Novo Produto" : "Editar Produto"}
                onSubmit={handleSave}
            >
                {/* ... (Existing Product Form) ... */}
                < div className="grid gap-4 py-4" >
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome do Produto</Label>
                        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 relative">
                            <Label htmlFor="category">Categoria</Label>
                            <div className="relative">
                                <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none appearance-none cursor-pointer" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="perfumes">Perfumes</option>
                                    <option value="corpo">Corpo</option>
                                    <option value="rosto">Rosto</option>
                                    <option value="cabelo">Cabelo</option>
                                    <option value="maquiagem">Maquilhagem</option>
                                    <option value="bijuteria">Bijuteria</option>
                                    <option value="aparelhos">Aparelhos</option>
                                    <option value="outros">Outros</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Preço (€)</Label>
                            <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image_url">Imagem (URL)</Label>
                            <Input id="image_url" placeholder="https://..." value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <textarea id="description" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="show_on_home"
                            checked={formData.show_on_home}
                            onChange={(e) => setFormData({ ...formData, show_on_home: e.target.checked })}
                            className="h-4 w-4 accent-[#D4AF37] cursor-pointer"
                        />
                        <Label htmlFor="show_on_home" className="cursor-pointer font-medium text-sm text-gray-700">Mostrar na Homepage (Explorar Produtos)</Label>
                    </div>
                </div >
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>Cancelar</Button>
                    <Button type="submit" className="bg-[#D4AF37] text-black hover:bg-[#b8952b] font-bold">Guardar</Button>
                </DialogFooter>
            </DashboardModal >

            <DashboardModal
                isOpen={isExpenseOpen || isEditExpenseOpen}
                onClose={() => { setIsExpenseOpen(false); setIsEditExpenseOpen(false); }}
                title={isEditExpenseOpen ? "Editar Despesa" : "Registar Nova Despesa"}
                onSubmit={handleSaveExpense}
            >
                <div className="grid gap-4 py-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="desc" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Descrição</Label>
                        <Input
                            id="desc"
                            placeholder="Ex: Renda Mensal"
                            value={expenseData.description}
                            onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-all h-9"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="amount" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Valor (€)</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                value={expenseData.amount}
                                onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-all h-9"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recorrência</Label>
                            <div className="flex bg-gray-100 p-1 rounded-md h-9 items-center">
                                {['monthly', 'weekly', 'one_time'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setExpenseData({ ...expenseData, recurrence: type })}
                                        className={cn(
                                            "flex-1 text-[10px] font-medium h-full rounded-sm transition-all uppercase tracking-wide flex items-center justify-center",
                                            expenseData.recurrence === type
                                                ? "bg-black text-white shadow-sm"
                                                : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        {type === 'monthly' && 'Mensal'}
                                        {type === 'weekly' && 'Semanal'}
                                        {type === 'one_time' && 'Única'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1.5 relative">
                        <Label htmlFor="cat" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoria</Label>
                        <div className="relative">
                            <select
                                id="cat"
                                className="flex h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm outline-none focus:bg-white transition-all appearance-none cursor-pointer"
                                value={expenseData.category}
                                onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                            >
                                <option value="supplier">Fornecedor</option>
                                <option value="rent">Renda/Aluguer</option>
                                <option value="marketing">Marketing</option>
                                <option value="software">Software</option>
                                <option value="logistics">Logística</option>
                                <option value="other">Outros</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => { setIsExpenseOpen(false); setIsEditExpenseOpen(false); }}
                        className="text-gray-500 hover:text-gray-900"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        className="bg-black text-white hover:bg-gray-800 font-medium px-6"
                    >
                        {isEditExpenseOpen ? "Guardar" : "Registar"}
                    </Button>
                </div>
            </DashboardModal>





            {/* CSV IMPORT DIALOG */}
            <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
                <DialogContent className="sm:max-w-[700px] bg-white text-black max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
                            <FileSpreadsheet className="h-5 w-5 text-[#D4AF37]" />
                            Importar Produtos via CSV
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Instructions */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Formato do CSV:</h4>
                            <p className="text-xs text-gray-500 mb-3">O ficheiro deve ter as seguintes colunas (separadas por vírgula):</p>
                            <code className="text-[10px] bg-gray-100 p-2 rounded block text-gray-600 font-mono">
                                name,description,price,category,subcategory,stock,image_url,show_on_home
                            </code>
                            <div className="mt-3 flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={handleDownloadTemplate}>
                                    <Download className="h-3 w-3" /> Download Template
                                </Button>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                <p><strong>Categorias válidas:</strong> perfumes, corpo, rosto, cabelo, maquiagem, bijuteria, aparelhos, outros</p>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#D4AF37] transition-colors">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleCsvFileChange}
                                className="hidden"
                                id="csv-upload"
                            />
                            <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">
                                    {csvFileName || "Clica para selecionar o ficheiro CSV"}
                                </span>
                                <span className="text-xs text-gray-400">Apenas ficheiros .csv</span>
                            </label>
                        </div>

                        {/* Preview Table */}
                        {csvData.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        Pré-visualização ({csvData.length} produtos)
                                    </h4>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        Pronto a importar
                                    </Badge>
                                </div>
                                <div className="rounded-md border bg-white overflow-x-auto max-h-[300px] overflow-y-auto">
                                    <table className="w-full text-xs">
                                        <thead className="bg-gray-50 border-b sticky top-0">
                                            <tr>
                                                <th className="p-2 text-left font-medium text-gray-500">#</th>
                                                <th className="p-2 text-left font-medium text-gray-500">Nome</th>
                                                <th className="p-2 text-left font-medium text-gray-500">Categoria</th>
                                                <th className="p-2 text-left font-medium text-gray-500">Preço</th>
                                                <th className="p-2 text-left font-medium text-gray-500">Stock</th>
                                                <th className="p-2 text-left font-medium text-gray-500">Home</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {csvData.map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="p-2 text-gray-400">{i + 1}</td>
                                                    <td className="p-2 font-medium text-gray-900 max-w-[200px] truncate">{row.name}</td>
                                                    <td className="p-2 capitalize text-gray-600">{row.category}</td>
                                                    <td className="p-2">€{parseFloat(row.price || '0').toFixed(2)}</td>
                                                    <td className="p-2">{row.stock || '0'}</td>
                                                    <td className="p-2">{row.show_on_home === 'true' ? '⭐' : '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Import Results */}
                        {importResults && (
                            <div className="space-y-2">
                                {importResults.success > 0 && (
                                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-green-700 font-medium">{importResults.success} produtos importados com sucesso!</span>
                                    </div>
                                )}
                                {importResults.errors.length > 0 && (
                                    <div className="p-3 bg-red-50 rounded-lg border border-red-200 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <span className="text-sm text-red-700 font-medium">{importResults.errors.length} erros:</span>
                                        </div>
                                        <ul className="text-xs text-red-600 pl-6 list-disc max-h-[100px] overflow-y-auto">
                                            {importResults.errors.map((err, i) => <li key={i}>{err}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsImportOpen(false)}>Fechar</Button>
                        <Button
                            onClick={handleCsvImport}
                            disabled={csvData.length === 0 || importLoading}
                            className="bg-[#D4AF37] text-black hover:bg-[#b8952b] font-bold gap-2"
                        >
                            {importLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-3 w-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    A importar...
                                </span>
                            ) : (
                                <><Upload className="h-4 w-4" /> Importar {csvData.length} Produtos</>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* CUSTOMER PROFILE MODAL */}
            <CustomerProfileModal
                isOpen={isViewCustomerOpen}
                onClose={() => setIsViewCustomerOpen(false)}
                customer={selectedCustomer}
                stats={customerStats}
            />

            {/* MENU EDIT DIALOG */}
            <DashboardModal
                isOpen={isNavDialogOpen}
                onClose={() => setIsNavDialogOpen(false)}
                title={navItemToEdit ? "Editar Item de Menu" : "Novo Item de Menu"}
                onSubmit={handleSaveNavItem}
            >
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Nome do Link</Label>
                        <Input
                            value={navFormData.label}
                            onChange={(e) => setNavFormData({ ...navFormData, label: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>URL de Destino (ex: /shop?tag=new)</Label>
                        <Input
                            value={navFormData.href}
                            onChange={(e) => setNavFormData({ ...navFormData, href: e.target.value })}
                            placeholder="/..."
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Categoria Pai (Opcional)</Label>
                        <select
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={navFormData.parent_id}
                            onChange={(e) => setNavFormData({ ...navFormData, parent_id: e.target.value })}
                        >
                            <option value="none">Nenhuma (Item Principal)</option>
                            {navItems.filter(i => !i.parent_id && i.id !== navItemToEdit?.id).map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Ordem de Exibição</Label>
                        <Input
                            type="number"
                            value={navFormData.sort_order}
                            onChange={(e) => setNavFormData({ ...navFormData, sort_order: parseInt(e.target.value) })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsNavDialogOpen(false)}>Cancelar</Button>
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800">Guardar</Button>
                </DialogFooter>
            </DashboardModal>

            {/* CONTENT EDIT DIALOG */}
            <DashboardModal
                isOpen={isContentDialogOpen}
                onClose={() => setIsContentDialogOpen(false)}
                title={contentToEdit ? "Editar Bloco de Conteúdo" : "Novo Bloco de Conteúdo"}
                onSubmit={handleSaveContent}
            >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Secção</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={contentFormData.section_name}
                                onChange={(e) => setContentFormData({ ...contentFormData, section_name: e.target.value })}
                            >
                                <option value="hero">Banner Principal (Topo)</option>
                                <option value="highlight">Destaque (Coleção)</option>
                                <option value="banner">Banner Intermédio (Promoção)</option>
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Ativo</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={contentFormData.is_active ? 'true' : 'false'}
                                onChange={(e) => setContentFormData({ ...contentFormData, is_active: e.target.value === 'true' })}
                            >
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Título</Label>
                        <Input
                            value={contentFormData.title}
                            onChange={(e) => setContentFormData({ ...contentFormData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Descrição</Label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={contentFormData.description}
                            onChange={(e) => setContentFormData({ ...contentFormData, description: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>URL da Imagem</Label>
                        <Input
                            value={contentFormData.image_url}
                            onChange={(e) => setContentFormData({ ...contentFormData, image_url: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Texto do Botão</Label>
                            <Input
                                value={contentFormData.link_text}
                                onChange={(e) => setContentFormData({ ...contentFormData, link_text: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Link do Botão</Label>
                            <Input
                                value={contentFormData.link_url}
                                onChange={(e) => setContentFormData({ ...contentFormData, link_url: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsContentDialogOpen(false)}>Cancelar</Button>
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800">Guardar</Button>
                </DialogFooter>
            </DashboardModal>

        </div >
    );
}

function NavButton({ active, onClick, icon: Icon, children }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                active
                    ? "bg-[#D4AF37] text-black shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
            )}
        >
            <Icon className="mr-3 h-5 w-5" />
            {children}
        </button>
    );
}

function DashboardModal({ isOpen, onClose, title, children, onSubmit }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold font-display">{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    {children}
                </form>
            </DialogContent>
        </Dialog>
    );
}

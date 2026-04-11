"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        newsletter: true,
    });
    const [loading, setLoading] = useState(false);
    const { signUp, signInWithGoogle } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error("As passwords não coincidem");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("A password deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        const { error } = await signUp(formData.email, formData.password, {
            full_name: formData.fullName,
            phone: formData.phone,
            newsletter_subscribed: formData.newsletter,
        });

        if (error) {
            toast.error("Erro ao criar conta", {
                description: error.message,
            });
        } else {
            toast.success("Conta criada com sucesso!", {
                description: "Verifique o seu email para confirmar a conta.",
            });
            router.push("/");
        }

        setLoading(false);
    };

    const handleGoogleSignUp = async () => {
        await signInWithGoogle();
    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 overflow-hidden">
            <div className="w-full max-w-5xl h-[90vh] flex flex-col">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#D4AF37] transition-colors mb-3"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar à loja
                </Link>

                {/* Registration Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex-1">
                    <div className="grid md:grid-cols-2 h-full">
                        {/* Left Side - Branding */}
                        <div className="bg-gradient-to-br from-[#D4AF37] to-[#C5A028] p-8 text-white flex flex-col justify-center">
                            <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg mb-4">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold mb-3">Criar Conta</h1>
                            <p className="text-white/90 mb-6 text-sm">
                                Junte-se à SF Cosmetics e desfrute de uma experiência premium de beleza
                            </p>

                            {/* Quick Sign Up with Google */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-white/30"></div>
                                    <span className="text-xs text-white/80 font-medium">Registo rápido</span>
                                    <div className="h-px flex-1 bg-white/30"></div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleGoogleSignUp}
                                    disabled={loading}
                                    className="w-full h-11 gap-2 bg-white text-gray-700 hover:bg-gray-50 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm"
                                >
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Continuar com Google
                                </Button>
                            </div>

                            {/* Benefits */}
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-xs text-white/80">Produtos exclusivos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-xs text-white/80">Ofertas personalizadas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-xs text-white/80">Envio prioritário</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="p-8 flex flex-col justify-center">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Registo Rápido</h2>

                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Nome Completo <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        placeholder="João Silva"
                                        className="h-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4AF37] transition-all text-sm"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        placeholder="exemplo@email.com"
                                        className="h-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4AF37] transition-all text-sm"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Telemóvel
                                    </label>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="+351 912 345 678"
                                        className="h-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4AF37] transition-all text-sm"
                                    />
                                </div>

                                {/* Password Fields in Grid */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            placeholder="Min. 6 caracteres"
                                            className="h-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4AF37] transition-all text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Confirmar <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            placeholder="Repetir"
                                            className="h-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#D4AF37] transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Newsletter */}
                                <div className="flex items-start gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        name="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="h-3.5 w-3.5 mt-0.5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                                    />
                                    <label className="text-xs text-gray-600 leading-tight">
                                        Quero receber novidades e promoções exclusivas
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69020] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all mt-4"
                                >
                                    {loading ? "A criar conta..." : "Criar Conta"}
                                </Button>

                                {/* Login Link */}
                                <div className="text-center pt-2">
                                    <p className="text-xs text-gray-600">
                                        Já tem conta?{" "}
                                        <Link
                                            href="/"
                                            className="font-bold text-[#D4AF37] hover:text-[#C5A028] transition-colors"
                                        >
                                            Fazer login
                                        </Link>
                                    </p>
                                </div>

                                {/* Terms */}
                                <p className="text-[10px] text-gray-500 text-center pt-1 leading-tight">
                                    Ao criar conta, concorda com os{" "}
                                    <a href="#" className="underline hover:text-[#D4AF37]">
                                        Termos
                                    </a>{" "}
                                    e{" "}
                                    <a href="#" className="underline hover:text-[#D4AF37]">
                                        Política de Privacidade
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

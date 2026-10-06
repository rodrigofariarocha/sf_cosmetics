"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useFavorites } from "@/contexts/favorites-context";
import { ProductCard } from "@/components/product-card";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    User,
    ShoppingBag,
    Heart,
    Shield,
    LogOut,
    Camera,
    Save,
    MapPin,
    Phone,
    Mail,
    CheckCircle2,
    Loader2
} from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/client/header";
import { Footer } from "@/components/client/footer";

export default function AccountPage() {
    const { user, signOut, loading: authLoading } = useAuth();
    const { favorites } = useFavorites();
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [activeTab, setActiveTab] = useState("profile");

    // Refs for OTP inputs
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Focus first input when modal opens
    useEffect(() => {
        if (showOtpModal) {
            setTimeout(() => {
                otpInputRefs.current[0]?.focus();
            }, 100);
        }
    }, [showOtpModal]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) {
            // Check for paste
            if (value.length === 6) {
                setOtpCode(value);
                // Fill inputs visually (optional depending on how we render, usually re-render covers it)
                otpInputRefs.current[5]?.focus();
                return;
            }
            return;
        }

        const newOtp = otpCode.split("");
        // Ensure array has 6 elements
        while (newOtp.length < 6) newOtp.push("");

        newOtp[index] = value;
        const newCode = newOtp.join("").slice(0, 6);
        setOtpCode(newCode);

        // Auto advance
        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otpCode[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const [profile, setProfile] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        newsletter_subscribed: false
    });

    const [initialProfile, setInitialProfile] = useState<any>(null);

    // Fetch user profile
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/");
            return;
        }

        if (user) {
            const fetchProfile = async () => {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                // Fallback to user metadata (used on error or when no profile row exists)
                let profileData = {
                    full_name: user.user_metadata.full_name || "",
                    email: user.email || "",
                    phone: user.user_metadata.phone || "",
                    address: "",
                    city: "",
                    postal_code: "",
                    newsletter_subscribed: false
                };
                if (error) {
                    console.error('Error fetching profile:', error);
                } else if (data) {
                    profileData = {
                        full_name: data.full_name || "",
                        email: user.email || "", // Always use auth email
                        phone: data.phone || "",
                        address: data.address || "",
                        city: data.city || "",
                        postal_code: data.postal_code || "",
                        newsletter_subscribed: data.newsletter_subscribed || false
                    };
                }

                setProfile(profileData);
                setInitialProfile(profileData); // Save initial state for comparison
                setLoading(false);
            };

            fetchProfile();
        }
    }, [user, authLoading, router, supabase]);

    const hasChanges = JSON.stringify(profile) !== JSON.stringify(initialProfile);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: profile.full_name,
                    phone: profile.phone,
                    address: profile.address,
                    city: profile.city,
                    postal_code: profile.postal_code,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user?.id);

            if (error) throw error;
            setInitialProfile(profile); // Update initial state
            toast.success("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("Erro ao atualizar perfil");
        } finally {
            setSaving(false);
        }
    };

    const handleSendOtp = async () => {
        if (!profile.phone) {
            toast.error("Por favor adicione um número de telemóvel primeiro.");
            return;
        }

        setVerifying(true);
        try {
            // Robust formatting for E.164
            let startToken = profile.phone.startsWith('+') ? '+' : '';
            let rawNumbers = profile.phone.replace(/\D/g, ''); // keep only numbers
            let formattedPhone = '';

            if (startToken === '+') {
                formattedPhone = '+' + rawNumbers;
            } else if (rawNumbers.startsWith('00')) {
                formattedPhone = '+' + rawNumbers.substring(2);
            } else if (rawNumbers.startsWith('351') && rawNumbers.length === 12) {
                // User typed 351 9...
                formattedPhone = '+' + rawNumbers;
            } else if (rawNumbers.length === 9) {
                // User typed 9...
                formattedPhone = '+351' + rawNumbers;
            } else {
                // Fallback: assume user knows what they are doing or it's another country
                formattedPhone = '+' + rawNumbers;
            }

            console.log("Sending OTP to:", formattedPhone); // Debug log

            const { error } = await supabase.auth.updateUser({
                phone: formattedPhone
            });

            if (error) throw error;

            toast.success("Código enviado!", {
                description: "Verifique o seu telemóvel para o código de confirmação."
            });
            setShowOtpModal(true);
        } catch (error: any) {
            toast.error("Erro ao enviar código", {
                description: error.message
            });
        } finally {
            setVerifying(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otpCode) return;

        setVerifying(true);
        try {
            const { error } = await supabase.auth.verifyOtp({
                phone: profile.phone,
                token: otpCode,
                type: 'phone_change'
            });

            if (error) throw error;

            toast.success("Telemóvel verificado!", {
                description: "O seu número foi confirmado com sucesso."
            });
            setShowOtpModal(false);
            setOtpCode("");
        } catch (error: any) {
            toast.error("Código inválido", {
                description: "Por favor tente novamente."
            });
        } finally {
            setVerifying(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <>
        <Header />
        <div className="min-h-screen bg-white pt-8 pb-12 px-4 flex flex-col">
            <div className="w-full px-4 sm:px-6 lg:px-10 flex-1 flex flex-col">

                {/* Page Title */}
                <div className="mb-8 border-b border-gray-100 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Minha Conta</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie as suas informações pessoais</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">

                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-60 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            {/* User User Info */}
                            <div className="p-5 bg-white border-b border-gray-100">
                                <div className="flex flex-col">
                                    <p className="font-bold text-base text-gray-900 truncate">{profile.full_name || "Utilizador"}</p>
                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="p-2 space-y-1">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === "profile"
                                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <User className="h-4 w-4" />
                                    Perfil & Dados
                                </button>

                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === "orders"
                                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                    Encomendas
                                </button>

                                <button
                                    onClick={() => setActiveTab("favorites")}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === "favorites"
                                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Heart className="h-4 w-4" />
                                    Favoritos
                                </button>

                                <button
                                    onClick={() => setActiveTab("security")}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === "security"
                                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Shield className="h-4 w-4" />
                                    Segurança
                                </button>

                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-all"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sair
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0 relative pb-16">
                        {/* PROFILE TAB */}
                        {activeTab === "profile" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {/* Personal Info Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
                                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                        <h2 className="text-base font-bold text-gray-900">Informações Pessoais</h2>
                                    </div>

                                    <div className="p-5 space-y-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="fullName" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome Completo</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="fullName"
                                                    value={profile.full_name}
                                                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                                    className="pl-10 h-10 text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="email"
                                                    value={profile.email}
                                                    disabled
                                                    className="pl-10 h-10 text-base bg-gray-50 text-gray-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telemóvel</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="phone"
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                    className="pl-10 h-10 text-base"
                                                    placeholder="+351 ... "
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="secondary"
                                                    className="absolute right-1 top-1 h-8 px-3 text-xs"
                                                    onClick={handleSendOtp}
                                                    disabled={verifying || !profile.phone}
                                                >
                                                    {user?.phone_confirmed_at && user.phone === profile.phone ? (
                                                        <span className="text-green-600 flex items-center font-medium">
                                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                                            Verificado
                                                        </span>
                                                    ) : (
                                                        "Verificar"
                                                    )}
                                                </Button>
                                            </div>
                                            <p className="text-[10px] text-gray-400 pl-1">
                                                Necessário para recuperação de conta via SMS.
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                {/* Address Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit flex flex-col">
                                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                                        <h2 className="text-base font-bold text-gray-900">Endereço de Entrega</h2>
                                    </div>

                                    <div className="p-5 space-y-4 flex-1">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="address" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Morada</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="address"
                                                    value={profile.address}
                                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                    className="pl-10 h-10 text-base"
                                                    placeholder="Rua, Número, Andar"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="city" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cidade</Label>
                                                <Input
                                                    id="city"
                                                    value={profile.city}
                                                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                                    className="h-10 text-base"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="postalCode" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Código Postal</Label>
                                                <Input
                                                    id="postalCode"
                                                    value={profile.postal_code}
                                                    onChange={(e) => setProfile({ ...profile, postal_code: e.target.value })}
                                                    placeholder="0000-000"
                                                    className="h-10 text-base"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Smart Save Button moved here */}
                                    {hasChanges && (
                                        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end animate-in slide-in-from-bottom-2">
                                            <Button
                                                onClick={handleUpdateProfile}
                                                disabled={saving}
                                                className="bg-[#D4AF37] hover:bg-[#C5A028] text-white rounded-md px-5 py-1.5 h-9 text-xs font-medium shadow-sm transition-all"
                                            >
                                                {saving ? (
                                                    <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                ) : null}
                                                Guardar Alterações
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ORDERS TAB */}
                        {activeTab === "orders" && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <ShoppingBag className="h-6 w-6 text-gray-400" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Sem encomendas</h3>
                                <p className="text-sm text-gray-500 mt-1 mb-4">Ainda não realizou nenhuma encomenda na nossa loja.</p>
                                <Button
                                    size="sm"
                                    className="bg-[#D4AF37] hover:bg-[#C5A028] text-white"
                                    onClick={() => router.push('/')}
                                >
                                    Começar a comprar
                                </Button>
                            </div>
                        )}

                        {/* FAVORITES TAB */}
                        {activeTab === "favorites" && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {favorites.length === 0 ? (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                                        <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Heart className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">Lista de desejos vazia</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-4">Guarde os seus produtos favoritos para comprar mais tarde.</p>
                                        <Button
                                            size="sm"
                                            className="bg-[#D4AF37] hover:bg-[#C5A028] text-white"
                                            onClick={() => router.push('/')}
                                        >
                                            Explorar produtos
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                        {favorites.map((product) => (
                                            <ProductCard key={product.id} product={product} compact={true} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === "security" && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                    <Shield className="h-6 w-6 text-[#D4AF37]" />
                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">Segurança da Conta</h2>
                                        <p className="text-xs text-gray-500">Gerencie sua senha e métodos de acesso</p>
                                    </div>
                                </div>

                                <div className="space-y-3 max-w-sm">
                                    <Button variant="outline" size="sm" className="w-full justify-start h-10" onClick={() => toast.info("Funcionalidade em desenvolvimento")}>
                                        Alterar palavra-passe
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => toast.info("Funcionalidade em desenvolvimento")}>
                                        Eliminar conta
                                    </Button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* OTP Verification Modal */}
            <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center">Verificar Telemóvel</DialogTitle>
                        <DialogDescription className="text-center">
                            Introduza o código de 6 dígitos enviado para <br />
                            <span className="font-semibold text-gray-900">{profile.phone}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <Input
                                    key={index}
                                    ref={(el) => { otpInputRefs.current[index] = el }}
                                    value={otpCode[index] || ""}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold p-0 rounded-lg border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                    maxLength={1}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                />
                            ))}
                        </div>

                        <Button
                            onClick={handleVerifyOtp}
                            disabled={verifying || otpCode.length < 6}
                            className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-white h-12 text-base"
                        >
                            {verifying ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    A verificar...
                                </>
                            ) : (
                                "Confirmar Código"
                            )}
                        </Button>

                        <div className="text-center text-xs text-gray-500">
                            Não recebeu o código? <button onClick={handleSendOtp} className="text-[#D4AF37] hover:underline font-medium">Reenviar</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
        <Footer />
        </>
    );
}


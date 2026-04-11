"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AuthCodeErrorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="h-16 w-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Erro na Autenticação
                </h1>

                <p className="text-gray-600 mb-6">
                    Ocorreu um erro ao processar a autenticação. Por favor, tente novamente.
                </p>

                <div className="space-y-3">
                    <Link href="/register">
                        <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69020] text-white font-semibold rounded-xl h-12">
                            Tentar Novamente
                        </Button>
                    </Link>

                    <Link href="/">
                        <Button variant="outline" className="w-full rounded-xl h-12">
                            Voltar à Loja
                        </Button>
                    </Link>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    Se o problema persistir, entre em contacto com o suporte.
                </p>
            </div>
        </div>
    );
}

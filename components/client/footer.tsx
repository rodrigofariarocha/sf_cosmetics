"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display tracking-widest text-[#D4AF37]">SF COSMETICS</h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
                            Elevando a sua beleza natural com produtos de luxo e excelência. A sua jornada para uma pele radiante começa aqui.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Navegação</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span className="h-[1px] w-2 bg-[#D4AF37]" /> Início</Link></li>
                            <li><Link href="/shop" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span className="h-[1px] w-2 bg-[#D4AF37]" /> Loja Online</Link></li>
                            <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span className="h-[1px] w-2 bg-[#D4AF37]" /> Sobre Nós</Link></li>
                            <li><Link href="/account" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><span className="h-[1px] w-2 bg-[#D4AF37]" /> Minha Conta</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Contactos</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0" />
                                <span>Rua da Liberdade, 123<br />1250-001 Lisboa, Portugal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-[#D4AF37] shrink-0" />
                                <span>+351 210 000 000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-[#D4AF37] shrink-0" />
                                <span>geral@sfcosmetics.pt</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">Horário</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-[#D4AF37] shrink-0" />
                                <div>
                                    <p className="text-white font-medium">Segunda - Sexta</p>
                                    <p>09:00 - 19:00</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-[#D4AF37] shrink-0" />
                                <div>
                                    <p className="text-white font-medium">Sábado</p>
                                    <p>10:00 - 18:00</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} SF Cosmetics. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-gray-400 transition-colors">Política de Privacidade</Link>
                        <Link href="/terms" className="hover:text-gray-400 transition-colors">Termos e Condições</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

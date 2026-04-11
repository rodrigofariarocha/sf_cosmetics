"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/client/header";
import { Footer } from "@/components/client/footer";
import { Button } from "@/components/ui/button";
import { ShopShowcase } from "@/components/client/shop-showcase";
import { createClient } from "@/lib/supabase/client";
import { ContentBlock } from "@/types/shop";
import { Truck, ShieldCheck, Sparkles, RefreshCw, ArrowRight, Star, Quote } from "lucide-react";

const BENEFITS = [
  { icon: Truck, title: "Envio Grátis", desc: "Em compras acima de 50€" },
  { icon: ShieldCheck, title: "100% Original", desc: "Autenticidade garantida" },
  { icon: Sparkles, title: "Qualidade Premium", desc: "Marcas de confiança" },
  { icon: RefreshCw, title: "Devoluções Fáceis", desc: "30 dias para devolver" },
];

const CATEGORY_IMAGES = [
  { name: "Perfumes", slug: "perfumes", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1200&auto=format&fit=crop", desc: "Fragrâncias exclusivas" },
  { name: "Cuidado Facial", slug: "rosto", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop", desc: "Pele radiante" },
  { name: "Corpo", slug: "corpo", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop", desc: "Hidratação & cuidado" },
  { name: "Maquilhagem", slug: "maquiagem", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop", desc: "Realce a sua beleza" },
  { name: "Cabelo", slug: "cabelo", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop", desc: "Tratamentos profissionais" },
  { name: "Bijuteria", slug: "bijuteria", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop", desc: "Acessórios elegantes" },
];

const TESTIMONIALS = [
  { name: "Maria S.", text: "Adoro a qualidade dos produtos! Encomendo sempre os meus perfumes aqui.", rating: 5 },
  { name: "Ana R.", text: "O melhor site de cosmética premium em Portugal. Entrega rápida e embalagem perfeita.", rating: 5 },
  { name: "Sofia T.", text: "Encontrei marcas que não existem em mais lado nenhum. Recomendo a 100%!", rating: 5 },
];

export default function Home() {
  const [hero, setHero] = useState<ContentBlock | null>(null);
  const [banners, setBanners] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: heroData } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('section_name', 'hero')
        .eq('is_active', true)
        .limit(1)
        .single();
      if (heroData) setHero(heroData);

      const { data: bannerData } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('section_name', 'banner')
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      if (bannerData) setBanners(bannerData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const heroContent = hero || {
    title: "Beleza Redefinida",
    description: "Descubra a nossa coleção exclusiva de produtos premium.",
    image_url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000&auto=format&fit=crop",
    link_url: "#shop-section",
    link_text: "Explorar Coleção"
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ═══ HERO ═══ */}
        <section className="relative h-[85vh] w-full bg-gray-900 text-white flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
            style={{ backgroundImage: `url('${heroContent.image_url}')` }}
          />
          <div className="relative z-20 text-center space-y-5 max-w-3xl px-6">
            <p className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-[#D4AF37]">
              Nova Coleção
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9]">
              {heroContent.title}
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto font-light">
              {heroContent.description}
            </p>
            <Link href={heroContent.link_url || "#shop-section"}>
              <Button variant="gold" size="lg" className="rounded-none px-10 mt-6 text-xs uppercase tracking-[0.25em] font-bold h-14 shadow-2xl hover:scale-105 transition-transform duration-300">
                {heroContent.link_text || "Explorar Coleção"}
              </Button>
            </Link>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="w-[1px] h-12 bg-white/40" />
          </div>
        </section>

        {/* ═══ BENEFITS STRIP ═══ */}
        <section className="bg-black text-white">
          <div className="w-full px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-center justify-center gap-3 py-5 px-4">
                  <b.icon className="h-5 w-5 text-[#D4AF37] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">{b.title}</p>
                    <p className="text-[10px] text-gray-400">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CATEGORY GRID ═══ */}
        <section className="py-20 px-4 sm:px-6 lg:px-10 bg-white">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Explore</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">As Nossas Categorias</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {CATEGORY_IMAGES.map((cat) => (
              <Link key={cat.slug} href={`/shop/${cat.slug}`} className="group relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-1">{cat.desc}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{cat.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-white/80 uppercase tracking-wider font-medium group-hover:text-[#D4AF37] transition-colors">
                    Ver Produtos <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ PRODUCTS SHOWCASE ═══ */}
        <ShopShowcase />

        {/* ═══ PROMO BANNER ═══ */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000&auto=format&fit=crop')" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-6">
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-4">Exclusivo Online</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">A Sua Pele Merece o Melhor</h2>
            <p className="text-gray-300 max-w-lg mx-auto mb-8 font-light">Descubra a nossa gama de tratamentos faciais e corporais de luxo.</p>
            <Link href="/shop/rosto">
              <Button variant="gold" size="lg" className="rounded-none px-10 text-xs uppercase tracking-[0.25em] font-bold h-14">
                Descobrir Agora
              </Button>
            </Link>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="py-20 px-4 sm:px-6 lg:px-10 bg-[#FAFAF8]">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Testemunhos</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">O Que Dizem as Nossas Clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-8 border border-gray-100 text-center">
                <Quote className="h-6 w-6 text-[#D4AF37] mx-auto mb-4 rotate-180" />
                <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex justify-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= t.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-gray-200 text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-900">{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ DYNAMIC CMS BANNERS ═══ */}
        {banners.map((banner) => (
          <section key={banner.id} className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${banner.image_url}')` }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="w-full relative z-10 px-4 sm:px-6 lg:px-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{banner.title}</h2>
              <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto font-light">{banner.description}</p>
              {banner.link_url && (
                <Link href={banner.link_url}>
                  <Button variant="gold" size="lg" className="rounded-none px-10 text-xs uppercase tracking-[0.25em] font-bold h-14">
                    {banner.link_text || "Ver Mais"}
                  </Button>
                </Link>
              )}
            </div>
          </section>
        ))}

        {/* ═══ NEWSLETTER ═══ */}
        <section className="py-20 px-4 sm:px-6 lg:px-10 bg-black text-white">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-3">Newsletter</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Fique a Par das Novidades</h2>
            <p className="text-gray-400 mb-8 text-sm font-light">Receba promoções exclusivas e lançamentos em primeira mão.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="O seu email" className="flex-1 h-12 px-5 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
              <Button variant="gold" className="h-12 px-8 rounded-none text-xs uppercase tracking-[0.2em] font-bold shrink-0">
                Subscrever
              </Button>
            </form>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

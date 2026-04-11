import { createClient } from "@/lib/supabase/client";
import { ProductPage } from "@/components/client/product-page";
import { Header } from "@/components/client/header";
import { Footer } from "@/components/client/footer";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = createClient();

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !product) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                <ProductPage product={product} />
            </main>
            <Footer />
        </>
    );
}

import { ProductPage } from "@/components/client/product-page";
import { Header } from "@/components/client/header";
import { Footer } from "@/components/client/footer";
import { notFound } from "next/navigation";
import { LOCAL_PRODUCTS } from "@/lib/local-products";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Products come from the local catalog (prototype)
    const product = LOCAL_PRODUCTS.find(p => p.id === id);

    if (!product) {
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

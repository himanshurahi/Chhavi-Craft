import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  );
}

import { notFound } from "next/navigation";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductDetailClient from "@/components/ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) notFound();

  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main>
        <ProductDetailClient slug={slug} />
      </main>
      <Footer />
    </div>
  );
}

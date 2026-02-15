import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PageDesigner from "@/components/PageDesigner";

export const metadata = {
  title: "Page Designer | Chhavi Craft",
  description:
    "Design and customize your images with crop, blur, shapes, drawing, and text. Create personalized graphics for your gifts.",
};

export default function DesignerPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-normal text-[var(--foreground)] sm:text-4xl">
            Page Designer
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Upload an image and edit it with crop, blur, shapes, drawing, and text. Download your design when you&apos;re done.
          </p>
        </header>
        <PageDesigner />
      </main>
      <Footer />
    </div>
  );
}

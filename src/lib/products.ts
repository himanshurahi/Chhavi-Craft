export const products = [
  {
    id: 1,
    slug: "acrylic-qr-stand",
    name: "Acrylic QR Scan Stand",
    variant: "Your Name / Logo",
    description:
      "Premium acrylic QR code stand with your name or logo engraved. Perfect for restaurants, cafes, or personal use. Place your QR code and let customers scan with ease.",
    price: 599,
    originalPrice: 1198,
    tag: "Sale",
    category: "QR Stands",
    features: ["Laser engraved", "Premium acrylic", "Scratch resistant", "Personalised"],
    visualBg: "from-[var(--background)] to-[var(--border)]",
  },
  {
    id: 2,
    slug: "dog-tag",
    name: "Personalised Dog Tag",
    variant: "Engraved name",
    description:
      "Durable metal dog tag with your pet's name engraved. Lightweight and comfortable for all breeds. Add a phone number for easy identification.",
    price: 399,
    originalPrice: 798,
    tag: "Sale",
    category: "Dog Tags",
    features: ["Metal construction", "Laser engraved", "Custom text", "Lightweight"],
    visualBg: "from-amber-50 to-amber-100/50",
  },
  {
    id: 3,
    slug: "qr-menu-stand",
    name: "QR Menu Stand",
    variant: "Your menu link",
    description:
      "QR menu stand for restaurants and cafes. Display your digital menu link—customers scan and browse. Add your logo for a professional look.",
    price: 490,
    originalPrice: 780,
    tag: "Sale",
    category: "QR Stands",
    features: ["Table stand", "Your menu link", "Logo engraved", "Sturdy base"],
    visualBg: "from-emerald-50 to-teal-50",
  },
  {
    id: 4,
    slug: "photo-album",
    name: "Personalised Photo Album",
    variant: "Your name on cover",
    description:
      "Elegant photo album with your name or message on the cover. Holds cherished memories. Perfect for weddings, birthdays, or as a thoughtful gift.",
    price: 890,
    originalPrice: 1780,
    tag: "Sale",
    category: "Photo Albums",
    features: ["Premium cover", "Name on cover", "Multiple pages", "Gift ready"],
    visualBg: "from-rose-50 to-pink-50",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

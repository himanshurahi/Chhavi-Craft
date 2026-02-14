export const productCategories: Record<
  string,
  { name: string; description: string; slug: string }
> = {
  pens: {
    name: "Pens and Boxes",
    description:
      "Personalised pens and gift boxes. Perfect for corporate gifting, promotional giveaways, or everyday use. Add your name or logo to make it uniquely yours.",
    slug: "pens",
  },
  diaries: {
    name: "Diaries & Notebook",
    description:
      "Corporate diaries, planners, and notebooks. Professional and personalisable—ideal for offices, students, or anyone who loves to organise. Your name on every page.",
    slug: "diaries",
  },
  organizers: {
    name: "Desk Organizers",
    description:
      "Keep your desk tidy with our personalised desk organisers. Pen holders, file trays, and more—crafted for professionals and home offices.",
    slug: "organizers",
  },
  combos: {
    name: "Gift Combos",
    description:
      "Curated gift sets combining pens, diaries, organisers, and more. Perfect for corporate events, client appreciation, or thoughtful gifting.",
    slug: "combos",
  },
  "qr-stands": {
    name: "QR Stands",
    description:
      "Acrylic QR code stands for menus, visiting cards, or personal links. Add your name or logo—customers scan with ease.",
    slug: "qr-stands",
  },
  "photo-albums": {
    name: "Photo Albums",
    description:
      "Personalised photo albums with your name on the cover. Perfect for weddings, birthdays, and cherished memories.",
    slug: "photo-albums",
  },
  "dog-tags": {
    name: "Dog Tags",
    description:
      "Durable personalised dog tags. Engrave your pet's name and contact—stylish and practical.",
    slug: "dog-tags",
  },
  planners: {
    name: "Planners & Calendars",
    description:
      "Monthly planners and calendars. Stay organised with personalised covers and layouts.",
    slug: "planners",
  },
  mugs: {
    name: "Mugs & Bottles",
    description:
      "Personalised mugs and water bottles. Great for offices, events, or everyday use.",
    slug: "mugs",
  },
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  variant?: string;
  description: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  category: string;
  categorySlug: string;
  productType: string;
  brand: string;
  features: string[];
  visualBg: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "acrylic-qr-stand",
    name: "Acrylic QR Scan Stand",
    variant: "Your Name / Logo",
    description:
      "Premium acrylic QR code stand with your name or logo engraved. Perfect for restaurants, cafes, or personal use.",
    price: 599,
    originalPrice: 1198,
    tag: "Sale",
    category: "QR Stands",
    categorySlug: "qr-stands",
    productType: "QR Stand",
    brand: "Chhavi Craft",
    features: ["Laser engraved", "Premium acrylic", "Scratch resistant", "Personalised"],
    visualBg: "from-[var(--background)] to-[var(--border)]",
  },
  {
    id: 2,
    slug: "dog-tag",
    name: "Personalised Dog Tag",
    variant: "Engraved name",
    description:
      "Durable metal dog tag with your pet's name engraved. Lightweight and comfortable for all breeds.",
    price: 399,
    originalPrice: 798,
    tag: "Sale",
    category: "Dog Tags",
    categorySlug: "dog-tags",
    productType: "Pet Accessory",
    brand: "Chhavi Craft",
    features: ["Metal construction", "Laser engraved", "Custom text", "Lightweight"],
    visualBg: "from-amber-50 to-amber-100/50",
  },
  {
    id: 3,
    slug: "qr-menu-stand",
    name: "QR Menu Stand",
    variant: "Your menu link",
    description:
      "QR menu stand for restaurants and cafes. Display your digital menu link—customers scan and browse.",
    price: 490,
    originalPrice: 780,
    tag: "Sale",
    category: "QR Stands",
    categorySlug: "qr-stands",
    productType: "QR Stand",
    brand: "Chhavi Craft",
    features: ["Table stand", "Your menu link", "Logo engraved", "Sturdy base"],
    visualBg: "from-emerald-50 to-teal-50",
  },
  {
    id: 4,
    slug: "photo-album",
    name: "Personalised Photo Album",
    variant: "Your name on cover",
    description:
      "Elegant photo album with your name or message on the cover. Holds cherished memories.",
    price: 890,
    originalPrice: 1780,
    tag: "Sale",
    category: "Photo Albums",
    categorySlug: "photo-albums",
    productType: "Photo Album",
    brand: "Chhavi Craft",
    features: ["Premium cover", "Name on cover", "Multiple pages", "Gift ready"],
    visualBg: "from-rose-50 to-pink-50",
  },
  {
    id: 5,
    slug: "personalised-pen-gift-box",
    name: "Personalised Pen Gift Box",
    variant: "Your name / logo",
    description:
      "Premium pen with gift box. Perfect for corporate gifting or special occasions. Engrave your name or logo.",
    price: 299,
    originalPrice: 499,
    tag: "Sale",
    category: "Pens and Boxes",
    categorySlug: "pens",
    productType: "Pen",
    brand: "Chhavi Craft",
    features: ["Metal body", "Gift box included", "Laser engraved", "Premium finish"],
    visualBg: "from-slate-50 to-slate-100",
  },
  {
    id: 6,
    slug: "dual-colour-planner",
    name: "A5 Dual-Colour Monthly Planner Diary",
    variant: "Softbound, Brown and Grey",
    description:
      "Monthly planner with dual-colour softbound cover. Personalise with your name. Ideal for professionals.",
    price: 349,
    originalPrice: 549,
    category: "Diaries & Notebook",
    categorySlug: "diaries",
    productType: "Diary",
    brand: "Chhavi Craft",
    features: ["Monthly layout", "Softbound", "Name on cover", "Premium paper"],
    visualBg: "from-amber-50 to-stone-100",
  },
  {
    id: 7,
    slug: "leather-planner",
    name: "B5 Leather-Look Planner",
    variant: "Hardcover, Elastic Lock",
    description:
      "Leather-look monthly planner with elastic lock. Hardcover notebook for office, journal writing.",
    price: 549,
    originalPrice: 899,
    tag: "Sale",
    category: "Diaries & Notebook",
    categorySlug: "diaries",
    productType: "Planner",
    brand: "Chhavi Craft",
    features: ["Leather-look", "Elastic lock", "Hardcover", "6.9 x 9.8 inch"],
    visualBg: "from-amber-100 to-amber-200",
  },
  {
    id: 8,
    slug: "pen-holder-organizer",
    name: "Desk Pen Holder Organizer",
    variant: "Wooden, 6 slots",
    description:
      "Wooden pen holder with 6 slots. Keep your desk organised. Personalise with your name or logo.",
    price: 449,
    originalPrice: 699,
    category: "Desk Organizers",
    categorySlug: "organizers",
    productType: "Organizer",
    brand: "Chhavi Craft",
    features: ["Wooden", "6 pen slots", "Name engraved", "Compact"],
    visualBg: "from-amber-50 to-amber-100",
  },
  {
    id: 9,
    slug: "desk-tray-set",
    name: "Desk File Tray Set",
    variant: "2-tier, Acrylic",
    description:
      "Acrylic file tray set for desk. Stack papers neatly. Add your name for a personalised touch.",
    price: 599,
    category: "Desk Organizers",
    categorySlug: "organizers",
    productType: "Organizer",
    brand: "Chhavi Craft",
    features: ["Acrylic", "2 trays", "Name engraved", "Modern design"],
    visualBg: "from-slate-100 to-slate-200",
  },
  {
    id: 10,
    slug: "best-dad-trophy",
    name: "Best Dad Trophy Wall Plaque",
    variant: "Black Metal, Gold Trophy Design",
    description:
      "Black metal plaque with gold trophy design. Perfect Father's Day gift. Personalise with name.",
    price: 449,
    originalPrice: 699,
    tag: "Sale",
    category: "Gift Combos",
    categorySlug: "combos",
    productType: "Wall Plaque",
    brand: "Chhavi Craft",
    features: ["Metal", "16 x 9 cm", "Gold design", "Wall mount"],
    visualBg: "from-slate-200 to-slate-300",
  },
  {
    id: 11,
    slug: "name-pendant-couple",
    name: "2 in 1 Personalised Name Pendant for Couple",
    variant: "Valentines Gift, Color: Black",
    description:
      "Matching name pendants for couples. Valentine's or anniversary gift. Engrave both names.",
    price: 599,
    originalPrice: 999,
    tag: "Sale",
    category: "Gift Combos",
    categorySlug: "combos",
    productType: "Jewellery",
    brand: "Chhavi Craft",
    features: ["2 pendants", "Black finish", "Engraved names", "Gift box"],
    visualBg: "from-slate-100 to-slate-200",
  },
  {
    id: 12,
    slug: "corporate-pen-set",
    name: "Corporate Pen Set with Diary",
    variant: "Gift combo",
    description:
      "Pen and diary combo. Ideal corporate gift. Both personalised with logo or name.",
    price: 699,
    originalPrice: 1099,
    tag: "Sale",
    category: "Gift Combos",
    categorySlug: "combos",
    productType: "Gift Set",
    brand: "Chhavi Craft",
    features: ["Pen + Diary", "Gift box", "Logo/name", "Corporate ready"],
    visualBg: "from-amber-50 to-rose-50",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getUniqueProductTypes() {
  return [...new Set(products.map((p) => p.productType))].sort();
}

export function getUniqueBrands() {
  return [...new Set(products.map((p) => p.brand))].sort();
}

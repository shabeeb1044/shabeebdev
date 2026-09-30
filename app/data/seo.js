import { profile, projects, services } from "./profile";

export const siteConfig = {
  name: profile.name,
  title: "Web Developer in Kerala | Muhammed Shabeeb",
  titleTemplate: "%s | Muhammed Shabeeb",
  description:
    "Muhammed Shabeeb is a full-stack web developer in Malappuram, Kerala. Hire for website development, low cost website development, MERN stack apps, WordPress sites, and affordable web design across Kerala — Kochi, Calicut, Thrissur, and India.",
  metaDescription:
    "Full-stack web developer in Malappuram, Kerala. Websites, MERN and Next.js apps, WordPress, and low-cost web design across Kerala.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://muhammedshabeeb.com",
  locale: "en_IN",
  ogImage: "/og.png",
};

/** Primary + long-tail keywords to rank for local website searches */
export const seoKeywords = [
  // Core intent
  "web developer in Kerala",
  "website developer in Kerala",
  "website development Kerala",
  "web development Kerala",
  "low cost website development",
  "affordable website development Kerala",
  "cheap website development Kerala",
  "budget website developer Kerala",
  "freelance web developer Kerala",
  "hire web developer Kerala",
  "best web developer in Kerala",
  "professional website developer Kerala",

  // Location variants
  "web developer Malappuram",
  "website developer Malappuram",
  "web developer Kochi",
  "web developer Calicut",
  "web developer Kozhikode",
  "web developer Thrissur",
  "web developer Trivandrum",
  "web developer Ernakulam",
  "web developer Palakkad",
  "website development Kochi",
  "website development Calicut",
  "website development Malappuram",
  "website designer Kerala",
  "web designer in Kerala",

  // Service keywords
  "custom website development",
  "business website development",
  "ecommerce website development Kerala",
  "WordPress website development Kerala",
  "React developer Kerala",
  "Next.js developer Kerala",
  "MERN stack developer Kerala",
  "full stack developer Kerala",
  "Node.js developer Kerala",
  "PHP website developer Kerala",
  "responsive website design Kerala",
  "landing page development Kerala",
  "company website design Kerala",
  "startup website development",
  "small business website Kerala",
  "portfolio website development",
  "school website development",
  "restaurant website development",
  "AI automation Kerala",
  "n8n automation",
  "Zapier automation",
  "AI assistant integration",
  "WhatsApp automation Kerala",

  // Cost / value intent
  "low cost website design",
  "affordable web design Kerala",
  "cheap website design India",
  "cost effective website development",
  "website development under budget",
  "low price website developer",
  "affordable freelance web developer",

  // Broader ranking terms
  "website development company Kerala",
  "web development services Kerala",
  "website maintenance Kerala",
  "website hosting and development",
  "SEO friendly website development",
  "mobile friendly website Kerala",
  "fast website development Kerala",
  "modern website developer India",
  "Muhammed Shabeeb web developer",
  "Muhammed Shabeeb Kerala",
];

export const seoFaq = [
  {
    question: "Who is a reliable web developer in Kerala?",
    answer:
      "Muhammed Shabeeb is a backend developer in Malappuram, Kerala. His main work is backend development, deployment, and VPS server management, with website design and development when a project needs a full site.",
  },
  {
    question: "Do you offer low cost website development in Kerala?",
    answer:
      "Yes. I provide affordable and low cost website development for startups, shops, schools, and local businesses — clear pricing, responsive design, and production-ready delivery without unnecessary extras.",
  },
  {
    question: "What website development services do you provide?",
    answer:
      "The main services are backend development, production deployment, VPS server management, corporate website maintenance, web troubleshooting, hacked or malware-infected website recovery, and AI automation with n8n, Zapier, or custom software. Website design and development with React, Next.js, WordPress, and PHP are available when a project needs a full site.",
  },
  {
    question: "Can I hire a freelance web developer in Kochi, Calicut, or Malappuram?",
    answer:
      "Yes. I work with clients in Malappuram, Kochi (Ernakulam), Calicut (Kozhikode), Thrissur, Trivandrum, and remotely across India for website design and development projects.",
  },
];

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Full-stack Web Developer",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    email: profile.email,
    telephone: profile.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malappuram",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "Web development",
      "Website development",
      "Low cost website development",
      "MERN stack",
      "Next.js",
      "React",
      "WordPress",
      "Website maintenance",
      "Hacked website recovery",
      "SEO friendly websites",
    ],
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${profile.name} — Web Developer Kerala`,
    alternateName: "Low Cost Website Development Kerala",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    email: profile.email,
    telephone: profile.phoneHref.replace("tel:", ""),
    priceRange: "₹₹",
    areaServed: [
      { "@type": "State", name: "Kerala" },
      { "@type": "City", name: "Malappuram" },
      { "@type": "City", name: "Kochi" },
      { "@type": "City", name: "Kozhikode" },
      { "@type": "City", name: "Thrissur" },
      { "@type": "Country", name: "India" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malappuram",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.041,
      longitude: 76.081,
    },
    knowsLanguage: ["en", "ml"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website development services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
        },
      })),
    },
    keywords: seoKeywords.slice(0, 40).join(", "),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Website development portfolio",
    itemListElement: projects.slice(0, 12).map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/portfolio/${project.slug}`,
      name: project.title,
    })),
  };
}

export function buildBlogListJsonLd() {
  // Lazy import avoided — blogs listed via sitemap + page schema;
  // keep graph lean with top traffic guides.
  const guides = [
    {
      slug: "hire-web-developer-kerala",
      name: "How to Hire a Web Developer in Kerala in 2026",
    },
    {
      slug: "low-cost-website-development-kerala",
      name: "Low Cost Website Development in Kerala",
    },
    {
      slug: "website-development-cost-kerala",
      name: "Website Development Cost in Kerala (2026)",
    },
    {
      slug: "seo-friendly-website-development",
      name: "SEO Friendly Website Development",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SEO website development guides",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/blog/${guide.slug}`,
      name: guide.name,
    })),
  };
}

export function getJsonLdGraph() {
  const nodes = [
    buildPersonJsonLd(),
    buildLocalBusinessJsonLd(),
    buildWebsiteJsonLd(),
    buildFaqJsonLd(),
    buildItemListJsonLd(),
    buildBlogListJsonLd(),
  ].map((node) => {
    const { "@context": _context, ...rest } = node;
    return rest;
  });

  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function jsonLdHtml(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// src/utils/seo.ts
export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  author?: string;
}

const SITE = {
  name: "Younick Design Studio",
  url: "https://younickdesign.com",
  logo: "https://younickdesign.com/younick-logo.PNG",
  telephone: "+91 8854883058",
  email: "studioyounick@gmail.com",
  address: {
    street: "3008, Third Floor, Orbit Mall, Civil Lines",
    locality: "Jaipur",
    region: "Rajasthan",
    postalCode: "302001",
    country: "IN",
  },
  sameAs: [
    "https://www.instagram.com/studio.younick",
    "https://www.facebook.com/studioyounick",
    "https://www.youtube.com/@Younickdesignstudio",
    "https://wa.me/918854883058",
  ],
};

export const defaultSEO: SEOData = {
  title: `${SITE.name} — Interior Design & Construction | Rajasthan`,
  description:
    "Younick Design Studio — Interior design, construction, and 3D visualization studio based in Rajasthan. We create beautiful, functional spaces that inspire.",
  keywords:
    "interior design, construction, 3d visualization, renovation, architecture, Jaipur, Rajasthan",
  url: SITE.url,
  image: SITE.logo,
  author: SITE.name,
};

/**
 * Structured data — Organization (JSON-LD)
 * This will be merged with page-specific schema in SEOHead when provided.
 */
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    telephone: SITE.telephone,
    email: SITE.email,
    sameAs: SITE.sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
  } as Record<string, unknown>,
};

/**
 * Page-specific SEO presets (useful to pass into SEOHead as pageSEO.home etc.)
 * Edit titles/descriptions as you refine content.
 */
export const pageSEO: Record<string, SEOData> = {
  home: {
    title: `${SITE.name} — Home | Interior Design & Construction`,
    description:
      "Discover Younick Design Studio — expert interior design, construction and visualization services across Rajasthan. View our projects and get started on your next space.",
    keywords:
      "interior design jaipur, architecture rajasthan, construction jaipur, 3d visualization",
    url: `${SITE.url}/`,
    image: SITE.logo,
    author: SITE.name,
  },
  projects: {
    title: `${SITE.name} — Projects | Portfolio`,
    description:
      "Explore our portfolio of residential and commercial projects — villas, apartments, offices and boutique hotels designed and executed by Younick Design Studio.",
    url: `${SITE.url}/projects`,
    image: SITE.logo,
    author: SITE.name,
  },
  team: {
    title: `${SITE.name} — Our Team`,
    description:
      "Meet the designers, architects and construction professionals behind Younick Design Studio.",
    url: `${SITE.url}/team`,
    image: SITE.logo,
    author: SITE.name,
  },
  contact: {
    title: `${SITE.name} — Contact`,
    description:
      "Get in touch with Younick Design Studio for interior design, construction, and visualization services. We are based in Jaipur, Rajasthan.",
    url: `${SITE.url}/contact`,
    image: SITE.logo,
    author: SITE.name,
  },
about: {
    title: "About Younick Design Studio — Our Story, Values & Team",
    description: "Learn about Younick Design Studio — our philosophy, process and the people who bring design to life across Rajasthan.",
    url: "https://younickdesign.com/about",
    image: "/younick-about-hero.jpg",
    keywords: "about, younick design, interior design studio, rajasthan"
  }
  // Add more page presets if needed, e.g. blog posts or project detail pages
};

/**
 * Helper: build a simple page schema for e.g. article or web page
 * You can import and customize this when you need page-specific structured data.
 */
export const buildPageSchema = (opts: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) => {
  const {
    title = defaultSEO.title,
    description = defaultSEO.description,
    url = defaultSEO.url,
    image = defaultSEO.image,
    datePublished,
    dateModified,
    authorName = defaultSEO.author,
  } = opts;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    ...(image ? { image } : {}),
  };

  if (datePublished) {
    schema.datePublished = datePublished;
  }
  if (dateModified) {
    schema.dateModified = dateModified;
  }
  if (authorName) {
    schema.author = {
      "@type": "Person",
      name: authorName,
    };
  }
  return schema;
};

export default {
  SITE,
  defaultSEO,
  structuredData,
  pageSEO,
  buildPageSchema,
};

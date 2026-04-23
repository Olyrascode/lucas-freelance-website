import { siteName, siteUrl } from "@/lib/metadata";
import { baseProjects } from "@/data/projects";
import { faqEntries, services } from "@/data/services";

export type JsonLd = Record<string, unknown>;

export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: siteName,
    givenName: "Lucas",
    familyName: "Aufrère",
    jobTitle: "Développeur front-end créatif freelance",
    description:
      "Développeur web front-end freelance spécialisé Next.js, WordPress, animations GSAP et SEO technique. Création de sites sur-mesure pour marques, agences et studios.",
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    email: "lucas@lucas-aufrere.com",
    telephone: "+33756853435",
    nationality: {
      "@type": "Country",
      name: "France",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clermont-Ferrand",
      addressRegion: "Auvergne-Rhône-Alpes",
      postalCode: "63000",
      addressCountry: "FR",
    },
    worksFor: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Fyconic",
      url: "https://fyconic.fr",
    },
    knowsAbout: [
      "Développement web",
      "Développement front-end",
      "Next.js",
      "React",
      "TypeScript",
      "GSAP",
      "WebGL",
      "Three.js",
      "WordPress",
      "Bricks Builder",
      "WooCommerce",
      "Animations web",
      "Motion design web",
      "SEO technique",
      "Core Web Vitals",
      "Performance web",
      "Accessibilité web",
      "UI/UX Development",
      "Design éditorial digital",
      "White-label development",
    ],
    knowsLanguage: [
      {
        "@type": "Language",
        name: "Français",
        alternateName: "fr",
      },
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Développeur web front-end freelance",
      occupationLocation: {
        "@type": "City",
        name: "Clermont-Ferrand",
      },
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        name: "Taux journalier moyen",
        currency: "EUR",
        duration: "P1D",
        median: 500,
      },
      skills:
        "Next.js, React, TypeScript, GSAP, WordPress, SEO technique, animations web, Three.js",
    },
    sameAs: [
      "https://www.linkedin.com/in/lucas-aufrere-27455210b/",
      "https://www.malt.fr/profile/lucasaufrere",
      "https://fyconic.fr",
    ],
  };
}

export interface ServiceSchemaInput {
  readonly name: string;
  readonly description: string;
  readonly priceFrom?: string;
}

export function serviceSchema({
  name,
  description,
  priceFrom,
}: ServiceSchemaInput): JsonLd {
  const schema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Person",
      name: siteName,
      url: siteUrl,
    },
    areaServed: "FR",
  };
  if (priceFrom) {
    schema.offers = {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: priceFrom,
        priceCurrency: "EUR",
      },
    };
  }
  return schema;
}

export interface CreativeWorkSchemaInput {
  readonly name: string;
  readonly description: string;
  readonly dateCreated?: string;
  readonly url?: string;
}

export function creativeWorkSchema({
  name,
  description,
  dateCreated,
  url,
}: CreativeWorkSchemaInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    ...(dateCreated ? { dateCreated } : {}),
    ...(url ? { url } : {}),
    author: {
      "@type": "Person",
      name: siteName,
      url: siteUrl,
    },
  };
}

// CollectionPage for /projets — references each base project as a
// CreativeWork in hasPart so search engines can surface them as a
// portfolio collection. Each work is attributed to the same Person @id
// the layout's personSchema exposes.
export function projectsCollectionSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/projets/#collection`,
    name: `Projets — ${siteName}`,
    description:
      "Sélection de projets web sur-mesure par Lucas Aufrère.",
    url: `${siteUrl}/projets`,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    hasPart: baseProjects.map((project) => {
      const work: JsonLd = {
        "@type": "CreativeWork",
        name: project.name,
        description: project.summary,
        dateCreated: project.year,
        image: `${siteUrl}${project.image}`,
        creator: { "@id": `${siteUrl}/#person` },
        keywords: project.schemaKeywords,
      };
      if (project.liveUrl) {
        work.url = project.liveUrl;
      }
      return work;
    }),
  };
}

// /contact schemas -----------------------------------------------------

export function contactPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact/#contact`,
    name: `Contact — ${siteName}`,
    description:
      "Contactez Lucas Aufrère pour un projet web sur-mesure : sites éditoriaux, animations GSAP, white-label, SEO technique. Réponse sous 48h ouvrées.",
    url: `${siteUrl}/contact`,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteName,
      email: "lucas@fyconic.fr",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "lucas@fyconic.fr",
        availableLanguage: ["French", "English"],
        areaServed: "FR",
      },
    },
  };
}

export function contactBreadcrumbSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${siteUrl}/contact`,
      },
    ],
  };
}

// /a-propos schemas ----------------------------------------------------

export function aboutPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/a-propos/#about`,
    name: `À propos — ${siteName}`,
    description:
      "Lucas Aufrère, développeur front-end créatif freelance basé à Clermont-Ferrand. Parcours, approche éditoriale, stack Next.js / React / GSAP, collaborations régulières avec studios et agences.",
    url: `${siteUrl}/a-propos`,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#person` },
    about: { "@id": `${siteUrl}/#person` },
  };
}

export function aboutBreadcrumbSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "À propos",
        item: `${siteUrl}/a-propos`,
      },
    ],
  };
}

// /services schemas ----------------------------------------------------

export function servicesItemListSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/services/#list`,
    name: `Prestations — ${siteName}`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${siteUrl}/services/#${service.slug}`,
        name: service.title,
        serviceType: service.schemaServiceType,
        description: service.description,
        provider: { "@id": `${siteUrl}/#person` },
        areaServed: "FR",
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            minPrice: service.pricing.minPriceEur,
          },
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/services`,
        },
      },
    })),
  };
}

export function servicesBreadcrumbSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
    ],
  };
}

export function servicesFaqSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/services/#faq`,
    mainEntity: faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function projectsBreadcrumbSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projets",
        item: `${siteUrl}/projets`,
      },
    ],
  };
}

export function stringifyJsonLd(schema: JsonLd): string {
  return JSON.stringify(schema);
}

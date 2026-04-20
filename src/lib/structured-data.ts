import { siteName, siteUrl } from "@/lib/metadata";

export type JsonLd = Record<string, unknown>;

export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    jobTitle: "Développeur front-end créatif freelance",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clermont-Ferrand",
      addressCountry: "FR",
    },
    sameAs: [
      "https://www.linkedin.com/in/lucas-aufrere/",
      "https://github.com/lucas-aufrere",
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

export function stringifyJsonLd(schema: JsonLd): string {
  return JSON.stringify(schema);
}

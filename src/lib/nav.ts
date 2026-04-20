import type { NavItem } from "@/types";

export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projets", href: "/projets" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav: readonly NavItem[] = [
  ...primaryNav,
  { label: "Mentions légales", href: "/mentions-legales" },
] as const;

export const contactLinks: readonly NavItem[] = [
  { label: "contact@lucas-aufrere.com", href: "mailto:contact@lucas-aufrere.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lucas-aufrere/" },
  { label: "GitHub", href: "https://github.com/lucas-aufrere" },
] as const;

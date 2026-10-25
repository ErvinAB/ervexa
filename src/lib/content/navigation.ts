export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation. Product first — the studio's own apps are the headline,
 * games are a smaller exploratory arm, and client work is deliberately NOT in
 * this tier so it does not read as an agency site.
 */
export const navigation: NavItem[] = [
  { label: "Apps", href: "/apps" },
  { label: "Games", href: "/games" },
  { label: "Notes", href: "/notes" },
  { label: "Studio", href: "/about" },
];

/**
 * Secondary links, shown in the footer and in the mobile menu.
 *
 * Inkline sits here rather than in the primary navigation on purpose: it is a
 * thing we made, not a section of the studio, and a studio whose front door
 * leads with a puzzle has stopped being a product studio.
 */
export const secondaryNavigation: NavItem[] = [
  { label: "Inkline", href: "/play" },
  { label: "Client work", href: "/client-work" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = {
  github: "https://github.com/ErvinAB",
  linkedin: "https://www.linkedin.com/in/ervin-abedin/",
  linkedinCompany: "https://www.linkedin.com/company/stagbyte/",
  email: "e.abedin@arvionix.com",
};

export const contactDetails = {
  email: socialLinks.email,
  location: "Skopje, North Macedonia",
  availability: "Open to selective client work and remote collaboration.",
};

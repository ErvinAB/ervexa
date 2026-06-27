export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Workflows", href: "/workflows" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = {
  github: "https://github.com/ErvinAB",
  linkedin: "https://www.linkedin.com/in/ervin-abedin/",
  linkedinCompany: "https://www.linkedin.com/company/stagbyte/",
  email: "e.abedin@arvionix.com",
};

import { Domain, Registration } from "@prisma/client";

interface Page {
  index: number;
  name: string;
  route: string;
  group: string;
  visible: boolean;
  type: string;
}

export const pages = (
  registrations: Registration[] | undefined = undefined
) => {
  const formVisibility = (domain: Domain) => {
    if (!registrations) return true;

    let x = registrations.find((x) => x.domain === domain);
    return Boolean(x && !x.formSubmittedAt);
  };

  return [
    {
      index: 0,
      group: "domain",
      type: "md",
      name: "research.md",
      route: "research",
      visible: true,
    },
    {
      index: 1,
      group: "domain",
      type: "md",
      name: "web.md",
      route: "web",
      visible: true,
    },
    {
      index: 2,
      group: "domain",
      type: "md",
      name: "app.md",
      route: "app",
      visible: true,
    },
    {
      index: 3,
      group: "domain",
      type: "md",
      name: "management.md",
      route: "management",
      visible: true,
    },
    {
      index: 4,
      group: "domain",
      type: "md",
      name: "cc.md",
      route: "cc",
      visible: true,
    },
    {
      index: 5,
      group: "domain",
      type: "md",
      name: "design.md",
      route: "design",
      visible: true,
    },
    {
      index: 6,
      group: "extras",
      type: "md",
      name: "events.md",
      route: "events",
      visible: true,
    },
    {
      index: 7,
      group: "extras",
      type: "md",
      name: "faqs.md",
      route: "faqs",
      visible: true,
    },
    {
      index: 8,
      group: "extras",
      type: "md",
      name: "whois.md",
      route: "whois",
      visible: true,
    },
    {
      index: 9,
      group: "forms",
      type: "py",
      name: "research.py",
      route: "research",
      visible: formVisibility("research"),
    },
    {
      index: 10,
      group: "forms",
      type: "py",
      name: "web.py",
      route: "web",
      visible: formVisibility("web"),
    },
    {
      index: 11,
      group: "forms",
      type: "py",
      name: "app.py",
      route: "app",
      visible: formVisibility("app"),
    },
    {
      index: 12,
      group: "forms",
      type: "py",
      name: "management.py",
      route: "management",
      visible: formVisibility("management"),
    },
    {
      index: 13,
      group: "forms",
      type: "py",
      name: "cc.py",
      route: "cc",
      visible: formVisibility("cc"),
    },
    {
      index: 14,
      group: "forms",
      type: "py",
      name: "design.py",
      route: "design",
      visible: formVisibility("design"),
    },
    {
      index: 15,
      group: "instructions",
      type: "md",
      name: "instructions.md",
      route: "instructions",
      visible: true,
    },
  ].filter((x: Page) => x.visible);
};

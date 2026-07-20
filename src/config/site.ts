export type HomeItem = {
  label: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
  prefix?: string;
};

export type HomeSection = {
  title: string;
  items?: HomeItem[];
  volumes?: {
    include?: number[];
    exclude?: number[];
    sort?: "asc" | "desc";
    showEmpty?: boolean;
  };
};

export type SiteConfig = {
  name: string;
  description: string;
  homeAsciiArt: string;
  homeSections: HomeSection[];
};

export const siteConfig: SiteConfig = {
  name: "Exile On Street",
  description: "A collection of visual experiments and portfolio templates.",
  homeAsciiArt: `▓█████  ███▄    █ ▄▄▄█████▓ ██▀███   ▒█████   ██▓███   ██▓ ▄████▄
▓█   ▀  ██ ▀█   █ ▓  ██▒ ▓▒▓██ ▒ ██▒▒██▒  ██▒▓██░  ██▒▓██▒▒██▀ ▀█
▒███   ▓██  ▀█ ██▒▒ ▓██░ ▒░▓██ ░▄█ ▒▒██░  ██▒▓██░ ██▓▒▒██▒▒▓█    ▄
▒▓█  ▄ ▓██▒  ▐▌██▒░ ▓██▓ ░ ▒██▀▀█▄  ▒██   ██░▒██▄█▓▒ ▒░██░▒▓▓▄ ▄██▒
░▒████▒▒██░   ▓██░  ▒██▒ ░ ░██▓ ▒██▒░ ████▓▒░▒██▒ ░  ░░██░▒ ▓███▀ ░
░░ ▒░ ░░ ▒░   ▒ ▒   ▒ ░░   ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ▒▓▒░ ░  ░░▓  ░ ░▒ ▒  ░
 ░ ░  ░░ ░░   ░ ▒░    ░      ░▒ ░ ▒░  ░ ▒ ▒░ ░▒ ░      ▒ ░  ░  ▒
   ░      ░   ░ ░   ░        ░░   ░ ░ ░ ░ ▒  ░░        ▒ ░░
   ░  ░         ░             ░         ░ ░            ░  ░ ░
                                                        ░`,
  homeSections: [
    {
      title: "TL;DR",
      items: [
        {
          label: "Cybersecurity enthusiast. Idealist. Purist."
        },
        {
          label: "Researcher @RaptX",
          linkLabel: "@RaptX",
          href: "https://raptx.org/",
          external: true
        },
        { label: "My CVEs", href: "/cves/" }
      ]
    },
    {
      title: "Philes",
      items: [
        { label: "Design / Photography Portfolio", href: "/design-photography-portfolio/" },
        { label: "Grunge", href: "/grunge/" },
        { label: "Self Esteem", href: "/self-esteem/" },
        { label: "Token Template", href: "/token-template/" },
        { label: "Swissfolio", href: "/swissfolio/" }
      ]
    },
    {
      title: "Research",
      items: [
        { label: "Binary Exploitation" },
        { label: "Windows Security" },
        { label: "IoT Security" },
        { label: "Automation" }
      ]
    },
    {
      title: "Contact",
      items: [
        { label: "root -at- cubeyond -dot- net" },
        {
          label: "PGP Encryption Key",
          href: "/key.asc"
        },
        {
          label: "github@plt",
          href: "https://github.com/CuB3y0nd/",
          external: true,
          prefix: "~ call"
        },
        {
          label: "memos@plt",
          href: "https://memos.cubeyond.net/",
          external: true,
          prefix: "~ call"
        },
        {
          label: "kofi@plt",
          href: "https://ko-fi.com/cub3y0nd",
          external: true,
          prefix: "~ call"
        }
      ]
    }
  ]
};

import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const output = join(root, "site");
const workspace = mkdtempSync(join(tmpdir(), "exile-on-street-themes-"));
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const themes = [
  { name: "entropic", repository: "https://github.com/CuB3y0nd/entropic.git", mount: "" },
  { name: "design-photography-portfolio", repository: "https://github.com/pysunday/DesignPhotographyPortfolio.git", mount: "design-photography-portfolio" },
  { name: "grunge", repository: "https://github.com/jessgaspardev/grunge.git", mount: "grunge" },
  { name: "self-esteem", repository: "https://github.com/m-durana/self-esteem-astro.git", mount: "self-esteem" },
  { name: "token-template", repository: "https://github.com/ArnavK-09/token-template.git", mount: "token-template" },
  { name: "swissfolio", repository: "https://github.com/michael-andreuzza/swissfolio.git", mount: "swissfolio" }
];

function run(command, args, cwd = root) {
  execFileSync(command, args, { cwd, stdio: "inherit" });
}

function configure(theme, directory) {
  const config = join(directory, "astro.config.mjs");
  let source = readFileSync(config, "utf8");
  const base = theme.mount ? `\n  base: "/${theme.mount}",` : "";
  source = source.replace(/export default defineConfig\(\{/, (match) => `${match}${base}`);
  source = source.replace(/site:\s*["'][^"']+["']/, 'site: "https://exileonstreet.github.io"');
  writeFileSync(config, source);

  if (theme.name !== "entropic") return;

  const siteConfig = join(directory, "src", "config", "site.ts");
  let home = readFileSync(siteConfig, "utf8");
  home = home.replace('name: "Entropic"', 'name: "Exile On Street"');
  home = home.replace('description: "Security Research Philes"', 'description: "A collection of visual experiments and portfolio templates."');
  home = home.replace(
    /title: "Philes",\s*volumes: \{\s*sort: "asc",\s*showEmpty: false\s*\}/,
    `title: "Philes",\n      items: [\n        { label: "Design / Photography Portfolio", href: "/design-photography-portfolio/" },\n        { label: "Grunge", href: "/grunge/" },\n        { label: "Self Esteem", href: "/self-esteem/" },\n        { label: "Token Template", href: "/token-template/" },\n        { label: "Swissfolio", href: "/swissfolio/" }\n      ]`
  );
  writeFileSync(siteConfig, home);
}

try {
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });

  for (const theme of themes) {
    const directory = join(workspace, theme.name);
    run("git", ["clone", "--depth", "1", theme.repository, directory]);
    configure(theme, directory);
    run(pnpm, ["install", "--no-frozen-lockfile"], directory);
    run(pnpm, ["exec", "astro", "build"], directory);
    cpSync(join(directory, "dist"), theme.mount ? join(output, theme.mount) : output, { recursive: true });
  }

  writeFileSync(join(output, ".nojekyll"), "");
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

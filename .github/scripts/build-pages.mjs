import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "site");
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

const themes = [
  { directory: root, mount: "", installer: [pnpm, ["install", "--frozen-lockfile"]], runner: pnpm },
  { directory: join(root, "themes", "design-photography-portfolio"), mount: "design-photography-portfolio", installer: [npm, ["ci"]], runner: npm },
  { directory: join(root, "themes", "grunge"), mount: "grunge", installer: [npm, ["ci"]], runner: npm },
  { directory: join(root, "themes", "self-esteem"), mount: "self-esteem", installer: [npm, ["ci"]], runner: npm },
  { directory: join(root, "themes", "token-template"), mount: "token-template", installer: [npm, ["install", "--no-package-lock"]], runner: npm },
  { directory: join(root, "themes", "swissfolio"), mount: "swissfolio", installer: [npm, ["ci"]], runner: npm }
];

function run(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: "inherit" });
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const theme of themes) {
  const [installer, installArgs] = theme.installer;
  run(installer, installArgs, theme.directory);
  run(theme.runner, ["exec", "astro", "build"], theme.directory);
  cpSync(join(theme.directory, "dist"), theme.mount ? join(output, theme.mount) : output, {
    recursive: true
  });
}

writeFileSync(join(output, ".nojekyll"), "");

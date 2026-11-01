import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
async function walk(dir) {
  const paths = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (item.name.startsWith('.') || item.name === 'node_modules') continue;
    const file = path.join(dir, item.name);
    paths.push(...(item.isDirectory() ? await walk(file) : [file]));
  }
  return paths;
}
const files = await walk(root);
const htmls = files.filter(p => p.endsWith('.html'));
let checked = 0;
const errors = [];
const forbidden = /buscando minha primeira|primeira experiência formal|sem experiência profissional em qa|em transição para qa|ainda não trabalhei formalmente/i;
for (const file of htmls) {
  const html = await readFile(file, 'utf8');
  const name = path.relative(root, file);
  if (!html.includes('<html lang="pt-BR">')) errors.push(`${name}: idioma`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) errors.push(`${name}: H1 único`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${name}: descrição`);
  if (forbidden.test(html)) errors.push(`${name}: posicionamento não autorizado`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${name}: ids duplicados`);
  if (!ids.includes('conteudo')) errors.push(`${name}: destino de navegação acessível`);
  if (/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b|sb_secret_|ghp_[A-Za-z0-9]{20}|SUPABASE_SERVICE_ROLE_KEY\s*=/.test(html)) errors.push(`${name}: dado privado`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    const [route, anchor] = href.split('#');
    const target = route ? path.resolve(route.startsWith('/') ? root : path.dirname(file), route.startsWith('/') ? '.' + route : decodeURIComponent(route)) : file;
    let destination = target;
    try { if ((await stat(destination)).isDirectory()) destination = path.join(destination, 'index.html'); await stat(destination); }
    catch { errors.push(`${name}: destino ausente ${href}`); continue; }
    if (anchor && destination.endsWith('.html')) {
      const content = await readFile(destination, 'utf8');
      if (!content.includes(`id="${anchor}"`)) errors.push(`${name}: âncora ausente ${href}`);
    }
    checked++;
  }
}
const resume = await stat(path.join(root, 'downloads/Otavio_Alves_Curriculo_QA.pdf'));
if (resume.size < 1000 || resume.size > 2_000_000) errors.push('Currículo ausente ou tamanho inadequado');
const css = await readFile(path.join(root, 'assets/style.css'), 'utf8');
if (!css.includes('prefers-reduced-motion') || !css.includes(':focus-visible')) errors.push('Acessibilidade de movimento/foco');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`${htmls.length} páginas e ${checked} referências locais verificadas. Sem destinos ausentes, âncoras inválidas ou dados privados detectados nos HTMLs.`);

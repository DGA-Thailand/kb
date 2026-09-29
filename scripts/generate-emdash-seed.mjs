import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { markdownToPortableText } from 'emdash/client';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDirectory = path.join(root, 'src/content/docs');
const outputDirectory = path.join(root, 'seed');
const outputFile = path.join(outputDirectory, 'legacy-docs.json');
const auditFile = path.join(root, 'scripts/emdash-content-audit.json');

async function findDocuments(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) return findDocuments(resolved);
    return /\.(md|mdx)$/i.test(entry.name) ? [resolved] : [];
  }));
  return files.flat().sort();
}

function splitFrontmatter(source) {
  if (!source.startsWith('---\n')) return { data: {}, body: source };
  const end = source.indexOf('\n---', 4);
  if (end < 0) return { data: {}, body: source };
  const frontmatter = source.slice(4, end);
  const bodyStart = source.indexOf('\n', end + 4);
  return { data: YAML.parse(frontmatter) ?? {}, body: bodyStart < 0 ? '' : source.slice(bodyStart + 1) };
}

function routeFor(relativeFile) {
  const parsed = path.posix.parse(relativeFile.split(path.sep).join('/'));
  const page = parsed.name === 'index' || parsed.name === '_index' ? '' : parsed.name.replaceAll('.', '');
  return `/${[parsed.dir, page].filter(Boolean).join('/')}` || '/';
}

function categoryFor(route) {
  const segment = route.split('/').filter(Boolean)[0];
  return segment ? segment.replaceAll('-', ' ') : 'general';
}

function titleFor(route) {
  const last = route.split('/').filter(Boolean).at(-1) ?? 'Home';
  return last.replaceAll('-', ' ');
}

function cleanMdx(body) {
  return body.replace(/^\s*(import|export)\s+[^\n]+;?\s*$/gm, '').trim();
}

const files = await findDocuments(docsDirectory);
const audit = [];
const documents = await Promise.all(files.map(async (file) => {
  const source = await readFile(file, 'utf8');
  const { data, body } = splitFrontmatter(source);
  const relative = path.relative(docsDirectory, file);
  const route = routeFor(relative);
  const cleaned = cleanMdx(body);
  const issues = [];
  if (/^\s*<(?!https?:)[A-Z][\w.:-]*/m.test(cleaned)) issues.push('custom MDX component');
  if (/@assets\//.test(cleaned)) issues.push('local asset reference must be uploaded to EmDash media');
  if (/\{[^}]+\}/.test(cleaned)) issues.push('MDX expression requires manual review');
  if (issues.length) audit.push({ source: relative, route, issues });
  return {
    id: `document-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}`,
    status: 'published',
    data: {
      title: typeof data.title === 'string' ? data.title : titleFor(route),
      description: typeof data.description === 'string' ? data.description : '',
      path: route,
      category: categoryFor(route),
      source_path: relative,
      body: markdownToPortableText(cleaned),
      migration_notes: issues.join('; '),
    },
  };
}));

const seed = {
  $schema: 'https://emdashcms.com/seed.schema.json',
  version: '1',
  defaultLocale: 'th',
  meta: { name: 'DGA Resource Center', description: 'Seeded from the repository Starlight documentation.', author: 'DGA Thailand' },
  settings: { title: 'DGA Resource Center', tagline: 'One-Stop Resource Hub for DGA Services', url: 'https://kb.dga.or.th', timezone: 'Asia/Bangkok' },
  collections: [{
    slug: 'documents', label: 'Documents', labelSingular: 'Document',
    description: 'DGA knowledge-base pages migrated from Starlight.',
    supports: ['drafts', 'revisions', 'preview', 'search', 'seo'], routable: false,
    titleField: 'title', admin: { listColumns: ['path', 'category'] },
    fields: [
      { slug: 'title', label: 'Title', type: 'string', required: true, searchable: true },
      { slug: 'description', label: 'Description', type: 'text', searchable: true },
      { slug: 'path', label: 'Legacy path', type: 'string', required: true, unique: true, indexed: true, translatable: false },
      { slug: 'category', label: 'Category', type: 'string', indexed: true },
      { slug: 'source_path', label: 'Source file', type: 'string', translatable: false },
      { slug: 'body', label: 'Content', type: 'portableText', searchable: true },
      { slug: 'migration_notes', label: 'Migration notes', type: 'text', translatable: false }
    ]
  }],
  content: { documents }
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, `${JSON.stringify(seed, null, 2)}\n`);
await writeFile(auditFile, `${JSON.stringify({ total: documents.length, needsReview: audit.length, entries: audit }, null, 2)}\n`);
console.log(`Generated ${path.relative(root, outputFile)} with ${documents.length} documents (${audit.length} need review).`);

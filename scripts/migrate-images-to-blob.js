/**
 * Migration script: Upload all images from public/website-assets to Vercel Blob.
 *
 * Requires: BLOB_READ_WRITE_TOKEN environment variable
 * Run: BLOB_READ_WRITE_TOKEN=xxx node scripts/migrate-images-to-blob.js
 *
 * Options:
 *   --dry-run     List files without uploading
 *   --apply       After upload, update projects.json and src files with Blob URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'public', 'website-assets');

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const DRY_RUN = process.argv.includes('--dry-run');
const APPLY = process.argv.includes('--apply');

function getAllImages(dir, base = dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...getAllImages(full, base));
    } else if (IMAGE_EXT.includes(path.extname(e.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function toWebPath(absPath) {
  const rel = path.relative(path.join(root, 'public'), absPath);
  return '/' + rel.replace(/\\/g, '/');
}

async function main() {
  const files = getAllImages(assetsDir);
  console.log(`Found ${files.length} images in public/website-assets`);

  const mapping = {};

  if (DRY_RUN) {
    files.forEach((f) => {
      const webPath = toWebPath(f);
      console.log(`  ${webPath}`);
    });
    console.log('\nRun without --dry-run to upload. Set BLOB_READ_WRITE_TOKEN.');
    return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Error: BLOB_READ_WRITE_TOKEN is required. Run:');
    console.error('  vercel env pull   # or export BLOB_READ_WRITE_TOKEN=xxx');
    process.exit(1);
  }

  for (let i = 0; i < files.length; i++) {
    const absPath = files[i];
    const webPath = toWebPath(absPath);
    const pathname = webPath.replace(/^\//, '');
    const buffer = fs.readFileSync(absPath);
    const ext = path.extname(absPath).toLowerCase();
    const contentType =
      ext === '.jpg' || ext === '.jpeg'
        ? 'image/jpeg'
        : ext === '.png'
          ? 'image/png'
          : ext === '.webp'
            ? 'image/webp'
            : ext === '.gif'
              ? 'image/gif'
              : 'application/octet-stream';

    try {
      const blob = await put(pathname, buffer, {
        access: 'public',
        contentType,
        addRandomSuffix: false,
      });
      mapping[webPath] = blob.url;
      console.log(`[${i + 1}/${files.length}] ${webPath} -> ${blob.url}`);
    } catch (err) {
      console.error(`Failed: ${webPath}`, err.message);
      process.exit(1);
    }
  }

  const mappingPath = path.join(root, 'scripts', 'blob-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log(`\nMapping saved to ${mappingPath}`);

  if (APPLY) {
    applyMapping(mapping);
  } else {
    console.log('\nRun with --apply to update projects.json and src files.');
  }
}

function applyMapping(mapping) {
  const projectsPath = path.join(root, 'public', 'projects.json');
  if (fs.existsSync(projectsPath)) {
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
    let changed = false;
    for (const p of projects) {
      if (p.image_url && mapping[p.image_url]) {
        p.image_url = mapping[p.image_url];
        changed = true;
      }
      if (Array.isArray(p.gallery_images)) {
        for (let i = 0; i < p.gallery_images.length; i++) {
          if (mapping[p.gallery_images[i]]) {
            p.gallery_images[i] = mapping[p.gallery_images[i]];
            changed = true;
          }
        }
      }
    }
    if (changed) {
      fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
      console.log('Updated public/projects.json');
    }
  }

  const srcDir = path.join(root, 'src');
  const contentDir = path.join(root, 'content', 'projects');
  if (fs.existsSync(contentDir)) {
    const mdFiles = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
    for (const f of mdFiles) {
      const fp = path.join(contentDir, f);
      let content = fs.readFileSync(fp, 'utf-8');
      let fileChanged = false;
      for (const [oldPath, blobUrl] of Object.entries(mapping)) {
        const quoted = "'" + oldPath + "'";
        if (content.includes(quoted)) {
          content = content.split(quoted).join("'" + blobUrl + "'");
          fileChanged = true;
        }
      }
      if (fileChanged) {
        fs.writeFileSync(fp, content);
        console.log(`Updated content/projects/${f}`);
      }
    }
  }

  const srcFiles = [
    'views/Projects.jsx',
    'views/ProjectDetail.jsx',
    'views/Investors.jsx',
    'views/InvestmentStrategy.jsx',
    'views/About.jsx',
    'views/Team.jsx',
    'components/home/Hero.jsx',
    'components/home/FeaturedProjects.jsx',
    'components/navigation/Header.jsx',
  ];
  for (const rel of srcFiles) {
    const fp = path.join(srcDir, rel);
    if (!fs.existsSync(fp)) continue;
    let content = fs.readFileSync(fp, 'utf-8');
    let fileChanged = false;
    for (const [oldPath, blobUrl] of Object.entries(mapping)) {
      const escaped = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, blobUrl);
        fileChanged = true;
      }
    }
    if (fileChanged) {
      fs.writeFileSync(fp, content);
      console.log(`Updated ${rel}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

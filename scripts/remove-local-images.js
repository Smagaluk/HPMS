/**
 * Remove local image folders from public/website-assets after migration to Vercel Blob.
 * Run this ONLY after migrate-images-to-blob.js --apply has completed successfully
 * and you have verified the site works with Blob URLs.
 *
 * Run: node scripts/remove-local-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'public', 'website-assets');

function removeDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      removeDir(full);
    } else {
      fs.unlinkSync(full);
      console.log(`Removed ${path.relative(root, full)}`);
    }
  }
  fs.rmdirSync(dir);
  console.log(`Removed directory ${path.relative(root, dir)}`);
}

function main() {
  if (!fs.existsSync(assetsDir)) {
    console.log('No website-assets directory found.');
    return;
  }
  const entries = fs.readdirSync(assetsDir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(assetsDir, e.name);
    if (e.isDirectory()) {
      removeDir(full);
    } else {
      fs.unlinkSync(full);
      console.log(`Removed ${path.relative(root, full)}`);
    }
  }
  if (fs.readdirSync(assetsDir).length === 0) {
    fs.rmdirSync(assetsDir);
    console.log('Removed empty website-assets directory');
  }
  console.log('Done.');
}

main();

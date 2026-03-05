# Vercel Blob Image Migration

This project stores images in Vercel Blob instead of the `public/` folder to avoid the 250 MB serverless function size limit on Vercel.

## Prerequisites

1. **Create a Vercel Blob store**
   - Go to your Vercel project → Storage → Create Database → Blob
   - Set access to **Public**
   - The `BLOB_READ_WRITE_TOKEN` env var is created automatically

2. **Pull environment variables locally**
   ```bash
   vercel env pull
   ```

## Migration Steps

### 1. Run the migration (uploads images and updates all references)

```bash
npm run blob:migrate
```

This will:
- Upload all 107+ images from `public/website-assets/` to Vercel Blob
- Save a mapping to `scripts/blob-mapping.json`
- Update `public/projects.json`, `content/projects/*.md`, and all `src/` files with Blob URLs

### 2. Verify the site works

```bash
npm run build
npm run dev
```

Check that all images load correctly.

### 3. Remove local image folders (after verification)

```bash
npm run blob:remove-local
```

This removes `public/website-assets/` to reduce deployment size.

### 4. Commit and deploy

```bash
git add -A
git commit -m "Migrate images to Vercel Blob"
git push
```

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run blob:migrate:dry` | List images that would be uploaded (no upload) |
| `npm run blob:migrate` | Upload images and update all references |
| `npm run blob:remove-local` | Remove local image folders (run after migration) |

## New Uploads

The `/api/admin/upload` route now uploads to Vercel Blob. New images added via the Projects manage page will automatically use Blob URLs.

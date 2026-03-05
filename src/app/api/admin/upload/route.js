import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

function isProd() {
  return process.env.NODE_ENV === 'production';
}

export async function POST(request) {
  if (isProd()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const formData = await request.formData();
    const slug = formData.get('slug');
    const files = [
      ...(formData.getAll('file') || []),
      ...(formData.getAll('files') || []),
    ].filter(Boolean);
    if (!files.length) {
      return NextResponse.json(
        { error: 'No file(s) provided' },
        { status: 400 }
      );
    }
    const safeSlug = String(slug || 'uploads').replace(/[^a-zA-Z0-9-_]/g, '-');
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (typeof file === 'string') continue;
      const name = file.name || `image-${Date.now()}-${i}`;
      const safeName = name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const pathname = `website-assets/projects/${safeSlug}/${safeName}`;
      const blob = await put(pathname, file, {
        access: 'public',
        addRandomSuffix: false,
      });
      urls.push(blob.url);
    }
    if (urls.length === 1) {
      return NextResponse.json({ file_url: urls[0] });
    }
    return NextResponse.json({ file_urls: urls });
  } catch (err) {
    console.error('POST /api/admin/upload', err);
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

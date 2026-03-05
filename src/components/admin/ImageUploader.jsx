"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';

export default function ImageUploader({ onUpload, slug, accept = 'image/*', multiple = false }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError(null);
    setProgress(0);
    try {
      const total = files.length;
      let completed = 0;
      const urls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        if (slug) formData.append('slug', slug);
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Upload failed');
        }
        const data = await res.json();
        urls.push(data.file_url);
        completed++;
        setProgress(Math.round((completed / total) * 100));
      }
      onUpload?.(urls.length === 1 ? urls[0] : urls);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleUpload}
        className="hidden"
        id="image-uploader-input"
        disabled={uploading}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="border-dashed border-[#1B2944]/30 text-[#1B2944] hover:bg-[#1B2944]/10"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading {progress}%
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Upload images
          </>
        )}
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

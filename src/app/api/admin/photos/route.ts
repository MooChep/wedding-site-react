import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET — toutes les photos avec leur statut
export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:mariage')
      .with_field('tags')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const photos = result.resources.map((r: { public_id: string; secure_url: string; tags: string[] }) => ({
      public_id: r.public_id,
      secure_url: r.secure_url,
      approved: r.tags?.includes('approved') ?? false,
    }));

    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ photos: [] }, { status: 500 });
  }
}

// POST — approuver ou rejeter une photo
export async function POST(req: Request) {
  try {
    const { public_id, action } = await req.json();

    if (action === 'approve') {
      await cloudinary.uploader.add_tag('approved', [public_id]);
    } else {
      await cloudinary.uploader.remove_tag('approved', [public_id]);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
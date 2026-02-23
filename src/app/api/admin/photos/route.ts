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
      rejected: r.tags?.includes('rejected') ?? false,
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
      await cloudinary.uploader.remove_tag('rejected', [public_id]);
    } else {
      await cloudinary.uploader.remove_tag('approved', [public_id]);
      await cloudinary.uploader.add_tag('rejected', [public_id]);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// DELETE — supprimer définitivement une ou plusieurs photos
export async function DELETE(req: Request) {
  try {
    const { public_ids } = await req.json();

    if (!public_ids || public_ids.length === 0) {
      return NextResponse.json({ error: 'Aucun identifiant fourni' }, { status: 400 });
    }

    await cloudinary.api.delete_resources(public_ids);

    return NextResponse.json({ success: true, deleted: public_ids.length });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

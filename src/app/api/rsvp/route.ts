import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'rsvps.json');

function readRSVPs() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, '[]');
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

// GET — lire tous les RSVPs (pour la page admin)
export async function GET() {
  const rsvps = readRSVPs();
  return NextResponse.json(rsvps);
}

// POST — soumettre un nouveau RSVP
export async function POST(req: NextRequest) {
  const body = await req.json();
  const rsvps = readRSVPs();

  const newEntry = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...body,
  };

  rsvps.push(newEntry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2));

  return NextResponse.json({ success: true }, { status: 201 });
}

// DELETE — supprimer un RSVP par id
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const rsvps = readRSVPs().filter((r: any) => r.id !== id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2));
  return NextResponse.json({ success: true });
}
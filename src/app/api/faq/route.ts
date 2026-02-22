import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'faqs.json');

// Initial FAQ data migrated from hardcoded version
const INITIAL_FAQS = [
  { id: 1, question: "Quelle est la date et l'heure du mariage ?", answer: "Notre mariage aura lieu le 19 septembre 2026. La cérémonie commence à 14h au Domaine les 3 Rivages, suivie du vin d'honneur à 15h et du dîner à partir de 18h.", visible: true },
  { id: 2, question: "Dois-je confirmer ma présence ?", answer: "Oui, veuillez confirmer votre présence avant le 1er septembre 2026. Vous pouvez remplir le formulaire RSVP en ligne ou nous contacter directement à camille.ilan1909@gmail.com.", visible: true },
  { id: 3, question: "Puis-je amener un accompagnant ?", answer: "Votre invitation indiquera si un accompagnant est autorisé. Si vous avez des questions, veuillez nous le faire savoir lors de votre confirmation.", visible: true },
  { id: 4, question: "Quelle est la tenue recommandée ?", answer: "Une tenue chic et festive avec un accessoire de couleur.", visible: true },
  { id: 5, question: "Y aura-t-il des options végétariennes ?", answer: "Absolument ! Lors de votre confirmation, vous pourrez indiquer vos restrictions ou préférences alimentaires.", visible: true },
  { id: 6, question: "Y a-t-il un stationnement disponible ?", answer: "Oui, un parking gratuit est disponible au Domaine les 3 Rivages.", visible: true },
  { id: 7, question: "À quelle heure dois-je arriver ?", answer: "Veuillez arriver à partir de 13h30 pour la cérémonie. Cela nous donne du temps pour installer tout le monde avant de commencer.", visible: true },
  { id: 8, question: "Y aura-t-il un groupe de musique en direct ou un DJ ?", answer: "Nous aurons les deux ! Un groupe pour le vin d'honneur et le dîner, suivi d'un DJ pour danser jusqu'à la fin de la nuit.", visible: true },
  { id: 9, question: "Y a-t-il un hébergement sur place ?", answer: "Oui, plusieurs gîtes sont disponibles au Domaine les 3 Rivages. Contactez nous !", visible: true },
];

function readFAQs() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_FAQS, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeFAQs(data: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET — fetch all FAQs (public: only visible ones; admin: all)
export async function GET(req: NextRequest) {
  const faqs = readFAQs();
  const { searchParams } = new URL(req.url);
  const admin = searchParams.get('admin') === 'true';
  return NextResponse.json(admin ? faqs : faqs.filter((f: any) => f.visible));
}

// POST — create a new FAQ
export async function POST(req: NextRequest) {
  const body = await req.json();
  const faqs = readFAQs();
  const newFaq = {
    id: Date.now(),
    question: body.question,
    answer: body.answer,
    visible: body.visible ?? true,
  };
  faqs.push(newFaq);
  writeFAQs(faqs);
  return NextResponse.json(newFaq, { status: 201 });
}

// PUT — update a FAQ (edit text or toggle visibility)
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const faqs = readFAQs();
  const index = faqs.findIndex((f: any) => f.id === body.id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  faqs[index] = { ...faqs[index], ...body };
  writeFAQs(faqs);
  return NextResponse.json(faqs[index]);
}

// DELETE — remove a FAQ
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const faqs = readFAQs().filter((f: any) => f.id !== id);
  writeFAQs(faqs);
  return NextResponse.json({ success: true });
}
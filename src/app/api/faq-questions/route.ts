import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'faq-questions.json');

function readQuestions() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, '[]');
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeQuestions(data: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET — fetch all questions received via contact form
export async function GET() {
  return NextResponse.json(readQuestions());
}

// POST — submit a new question from the contact form
export async function POST(req: NextRequest) {
  const body = await req.json();
  const questions = readQuestions();
  const newQuestion = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    name: body.name,
    email: body.email,
    question: body.question,
    treated: false,
  };
  questions.push(newQuestion);
  writeQuestions(questions);
  return NextResponse.json({ success: true }, { status: 201 });
}

// PUT — mark a question as treated/untreated
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const questions = readQuestions();
  const index = questions.findIndex((q: any) => q.id === body.id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  questions[index] = { ...questions[index], ...body };
  writeQuestions(questions);
  return NextResponse.json(questions[index]);
}

// DELETE — remove a question
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const questions = readQuestions().filter((q: any) => q.id !== id);
  writeQuestions(questions);
  return NextResponse.json({ success: true });
}
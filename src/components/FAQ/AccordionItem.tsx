'use client';
import { useMemo } from 'react';
import DashedBox from '../DashedBox';

interface AccordionItemProps {
  id: number;
  question: string;
  answer: string;
}

const BORDER_COLORS = [
  '#88bfff', // palette-1: blue
  '#f8bf0b', // palette-2: yellow
  '#f867c8', // palette-3: pink
  '#5aba32', // palette-4: green
];

export default function AccordionItem({
  id,
  question,
  answer,
}: Readonly<AccordionItemProps>) {
  const borderColor = useMemo(() => {
    return BORDER_COLORS[id % BORDER_COLORS.length];
  }, [id]);

  return (
    <DashedBox color={borderColor} padding={20} strokeWidth={3} borderRadius={25} dashLength={13} gapLength={13}>
      <h3 className="text-lg text-center mb-3">{question}</h3>
      <p className="text-gray-500 text-center leading-relaxed">{answer}</p>
    </DashedBox>
  );
}

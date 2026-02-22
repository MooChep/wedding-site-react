'use client';

import Link from 'next/link';
import { useState } from 'react';
import AccueilButton from './navigation/navbar/AccueilButton';
import FaqButton from './navigation/navbar/FaqButton';
import PhotosButton from './navigation/navbar/PhotosButton';
import ReservationButton from './navigation/navbar/ReservationButton';
import CustomHrLine from './CustomHrLine';
import CrossButton from './images/CrossButton';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20 gap-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10">
            <Link href="/">
              <AccueilButton/>
            </Link>
            <Link href="/rsvp">
              <ReservationButton/>
            </Link>
            <Link href="/faq">
              <FaqButton/>
            </Link>
            <Link href="/gallery">
              <PhotosButton/>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            // Menu icon to the left of the screen, with a larger clickable area
            className="md:hidden absolute right-4 p-2 text-gray-700 focus:outline-none rounded-lg scale-160"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 ">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-700"
            >
              <CrossButton/>
            </button>
            <Link href="/" onClick={() => setIsOpen(false)}>
              <AccueilButton/>
            </Link>
            <Link href="/rsvp" onClick={() => setIsOpen(false)}>
              <ReservationButton/>
            </Link>
            <Link href="/faq" onClick={() => setIsOpen(false)}>
              <FaqButton/>
            </Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)}>
              <PhotosButton/>
            </Link>
          </div>
        )}
      </div>
      <CustomHrLine/>
    </nav>
  );
}
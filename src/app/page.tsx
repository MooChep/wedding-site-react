'use client';

import CustomHrLine from "@/components/CustomHrLine";
import DashedBox from "@/components/DashedBox";
import Calendar from "@/components/images/calendar";
import Horloge from "@/components/images/horloge";
import MapSVG from "@/components/images/map";
import Mariés from "@/components/images/Mariés";
import MariésTenue from "@/components/images/Mariés-tenue";
import MapLink from "@/components/MapLink";
import ConfirmPresenceButton from "@/components/navigation/ConfirmPresenceButton";
import InfoProgramme from "@/components/navigation/InfoProgramme";
import { useEffect, useState } from "react";

export default function Home() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Date du mariage : 19 septembre 2026 à 14h
    const weddingDate = new Date('2026-09-19T14:00:00').getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        setIsExpired(false);
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    // Mise à jour initiale
    updateCountdown();

    // Mise à jour toutes les secondes
    const interval = setInterval(updateCountdown, 1000);

    // Nettoyage
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="pb-20 pt-4">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
          {/* Titre principal */}
          <h1 className="font-schoolbell text-4xl md:text-5xl text-gray-900 mb-2">
            Camille & Ilan
          </h1>
          
          {/* Sous-titre */}
          <p className="font-schoolbell text-lg md:text-xl text-gray-700 mb-4">
            Notre Mariage - 19 septembre 2026
          </p>
          
          {/* SVG Illustration couple - PLACEHOLDER */}
          <div className="flex justify-center">
            <Mariés/>
          </div>
          
          {/* Boutons CTA */}
          <div className="flex flex-col items-center gap-2 mb-16">
            <a 
              href="/rsvp"             >
              <ConfirmPresenceButton/>
            </a>
            <a 
              href="/faq"             >
              <InfoProgramme/>
            </a>
          </div>
          
          {/* Compte à rebours */}
          {!isExpired && (
          <div className="font-schoolbell text-lg text-gray-700">
            <p className="mb-2">Dans...</p>
            <div className="flex justify-center gap-6 text-2xl md:text-3xl">
              <div className="flex flex-col items-center">
                <span className="font-bold text-4xl md:text-5xl" style={{ color: 'var(--palette-3)' }}>
                  {timeRemaining.days}
                </span>
                <span className="text-sm md:text-base">jour{timeRemaining.days > 1 ? 's' : ''}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-4xl md:text-5xl" style={{ color: 'var(--palette-1)' }}>
                  {timeRemaining.hours}
                </span>
                <span className="text-sm md:text-base">heure{timeRemaining.hours > 1 ? 's' : ''}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-4xl md:text-5xl" style={{ color: 'var(--palette-4)' }}>
                  {timeRemaining.minutes}
                </span>
                <span className="text-sm md:text-base">minute{timeRemaining.minutes > 1 ? 's' : ''}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-4xl md:text-5xl" style={{ color: 'var(--palette-2)' }}>
                  {timeRemaining.seconds}
                </span>
                <span className="text-sm md:text-base">seconde{timeRemaining.seconds > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>)}
        </div>
        <CustomHrLine/>
      </section>

      {/* Details Section */}
      <section className="py-20 display:flex flex-col gap-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl mb-10">Le déroulé du week-end</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <DashedBox color="var(--color-pink)" padding={20} strokeWidth={3} borderRadius={30} dashLength={13} gapLength={13}>
              <h3 className="text-xl font-bold mb-2">Vendredi</h3>
              <div className="flex justify-center">
                <Horloge/>
              </div>
              <p className="text-gray-400 w-50">
                Vous arrivez dès le vendredi ?
                Venez partager une pizza avec nous dès 19h !
              </p>
              </DashedBox>
            </div>

            <div className="text-center">
              <DashedBox color="var(--color-yellow)" padding={20} strokeWidth={3} borderRadius={30} dashLength={13} gapLength={13}>
              <h3 className="text-xl font-bold mb-2">Samedi</h3>
              <div className="flex justify-center">
              <Calendar/>
              </div>
              <p className="text-gray-400">
                Rendez vous à 14h pour la cérémonie, suivie du vin d’honneur à 15h et du diner à partir de 18h !
              </p>
              </DashedBox>
            </div>

            <div className="text-center">
              <DashedBox color="var(--color-blue)" padding={20} strokeWidth={3} borderRadius={30} dashLength={13} gapLength={13}>
              <h3 className="text-xl font-bold mb-2">Dimanche</h3>
              <div className="flex justify-center">
              <MariésTenue/>
              </div>
              <p className="text-gray-400">
                Repas à 12h et activités sur le domaine l'après-midi
              </p>
              </DashedBox>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-black font-bold mb-8">Lieu du mariage</h2>
          <a className="text-black hover:text-rose-600 transition mb-6 inline-block" href="https://www.google.com/maps/dir/?api=1&destination=Domaine+les+3+Rivages" target="_blank" rel="noopener noreferrer">
            Domaine Les 3 Rivages
          </a>
          {/* LES ELEMENTS SONT ALIGNES A LHORIZONTAL */}

          <DashedBox color="var(--color-green)" padding={20} strokeWidth={3} borderRadius={30} dashLength={13} gapLength={13}>
          <div className="flex flex-row items-center gap-6">
          <MapLink/>
          <div className="flex justify-center">
            <iframe 
              title="Google maps"
              src="https://www.google.com/maps?q=Domaine+les+3+Rivages&output=embed" 
              loading="lazy"
              className="w-full h-96 rounded-lg shadow-lg"
              referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>
              </div>
              </DashedBox>
        </div>
      </section>
    
    </div>
  );
}
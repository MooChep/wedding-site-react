'use client';

import DashedBox from '@/components/DashedBox';
import RSVPForm from '@/components/RSVP/RSVPForm';

export default function RSVP() {
  return (
    <div>
      {/* Hero */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl font-semi-bold text-gray-900 mb-4">RÉPONDEZ S'IL VOUS PLAÎT !</h1>
          <p className="text-md text-gray-600">Merci de remplir le formulaire ci-dessous pour confirmer votre présence avant le 1er juillet 2026 !</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashedBox color='#DDD' padding={4} strokeWidth={3} borderRadius={30} dashLength={13} gapLength={13}>
          <RSVPForm />
        </DashedBox>
        </div>
      </section>

    </div>
  );
}

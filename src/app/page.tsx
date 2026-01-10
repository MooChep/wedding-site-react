import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            19 septembre 2026
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Le grand jour approche ! Nous nous dirons oui dans :
          </p>
          <div className="text-2xl font-semibold text-rose-600 mb-4">
            251 jours, 15h 28m 3s
          </div>
          <a href="/rsvp" className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition">
            Je suis présent(e)
          </a>
        </div>
      </section>
      

      {/* Details Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl mb-10">Le déroulé du week-end</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Vendredi</h3>
              <p className="text-gray-400">
                Venez commencer le week-end à 18h autour de pizzas et d'un karaoké
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">Samedi</h3>
              <p className="text-gray-400">
                Rendez vous à 14h pour la cérémonie, suivie du vin d’honneur à 15h et du diner à partir de 18h !
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🎂</div>
              <h3 className="text-xl font-bold mb-2">Dimanche</h3>
              <p className="text-gray-400">
                Repas à 12h et activités sur le domaine l'après-midi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-black font-bold mb-8">Lieu du mariage</h2>
          <a className="text-black hover:text-rose-600 transition mb-6 inline-block" href="https://www.google.com/maps/dir/?api=1&destination=Domaine+les+3+Rivages" target="_blank" rel="noopener noreferrer">
            Domaine Les 3 Rivages
          </a>
          <div className="flex justify-center mt-8">
            <iframe 
              title="Google maps"
              src="https://www.google.com/maps?q=Domaine+les+3+Rivages&output=embed" 
              loading="lazy"
              className="w-full h-96 rounded-lg shadow-lg"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    
    </div>
  );
}
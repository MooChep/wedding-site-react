import CustomHrLine from "@/components/CustomHrLine";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">

      <CustomHrLine/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-around w-full py-10 text-center">
          
          <div>
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-blue)' }}>
              Informations & Contacts
            </h3>
            <p className="text-gray-700 mb-3">Domaine les 3 Rivages</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Domaine+les+3+Rivages"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-rose-400 transition mb-3 inline-block"
            >
              Voir l'itinéraire sur GoogleMaps
            </a>
            <br/>
            <a href="mailto:camille.ilan1909@gmail.com" className="text-gray-700 hover:text-rose-400 transition mt-3 inline-block">
              Camille.ilan1909@gmail.com
            </a>
          </div>

          <div>
            <h4 className="font-schoolbell text-xl font-bold mb-6" style={{ color: 'var(--color-pink)' }}>
              Actions rapides
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li><a href="/" className="hover:text-rose-400 transition">Retour à l'accueil</a></li>
              <li><a href="/faq" className="hover:text-rose-400 transition">Poser une question</a></li>
              <li><a href="/rsvp" className="hover:text-rose-400 transition">Confirmer sa présence</a></li>
              <li><a href="/gallery" className="hover:text-rose-400 transition">Partager une photo</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
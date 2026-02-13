export default function Footer() {
  return (
    <footer className="text-white mt-20">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center w-full py-10">
          <div>
            <h3 className="text-xl font-bold mb-4 var(--color-rose)">Informations & Contact</h3>
            <p className="text-gray-400">Domaine Les 3 Rivages</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Domaine+les+3+Rivages"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:underline mt-2 inline-block"
            >
              Voir l’itinéraire sur Google Maps
            </a>

            <a href="mailto:camille.ilan1909@gmail.com" className="text-rose-400 hover:underline mt-2 inline-block">
              Envoyer un email
            </a>
          </div>

          <div>
            <h4 className="font-bold mb-4">Actions rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-rose-400 transition">Retour à l'accueil</a></li>
              <li><a href="/faq" className="hover:text-rose-400 transition">Poser une question</a></li>
              <li><a href="/rsvp" className="hover:text-rose-400 transition">Confirmer sa présence</a></li>
              <li><a href="/gallery" className="hover:text-rose-400 transition">Partager une photo</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 FLX. Tous droits reservés.</p>
        </div>
      </div>
    </footer>
  );
}

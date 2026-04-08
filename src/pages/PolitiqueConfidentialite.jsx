import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'

export default function PolitiqueConfidentialite() {
  return (
    <PageTransition>
      <SEOHead
        title="Politique de Confidentialité | BNK Conseil"
        description="Politique de confidentialité de BNK Conseil : données collectées, utilisation, droits RGPD, contact DPO."
        canonical="https://bnk-conseil.com/politique-confidentialite"
      />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Politique de confidentialité</h1>
          <p className="text-gray-400 text-sm mb-8">Dernière mise à jour : 6 avril 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Responsable du traitement</h2>
              <p>
                <strong>BNK Conseil</strong>, Théo Benkirane<br />
                Email : <a href="mailto:conseil.bnk@gmail.com" className="text-violet-600 hover:underline">conseil.bnk@gmail.com</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Données collectées</h2>
              <p>Lorsque vous remplissez le formulaire de contact, nous collectons :</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Prénom et nom</li>
                <li>Adresse email</li>
                <li>Nom de votre société (optionnel)</li>
                <li>Message libre</li>
              </ul>
              <p className="mt-3">
                Ces données sont transmises via <strong>Formspree</strong> (formspree.io) et utilisées uniquement pour répondre à votre demande.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Finalité et base légale</h2>
              <p>
                Les données collectées sont traitées sur la base de votre <strong>consentement</strong> (article 6.1.a RGPD), exprimé lors de l'envoi du formulaire, dans le but exclusif de vous répondre et, le cas échéant, de gérer la relation commerciale.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Durée de conservation</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, et au maximum <strong>3 ans</strong> à compter du dernier contact.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Partage des données</h2>
              <p>
                Vos données ne sont ni vendues, ni louées, ni partagées avec des tiers à des fins commerciales. Elles peuvent être transmises à des prestataires techniques strictement nécessaires au fonctionnement du service (Formspree, Vercel) dans le cadre de leurs propres politiques de confidentialité.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Vos droits (RGPD)</h2>
              <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement (« droit à l'oubli »)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d'opposition</li>
                <li>Droit à la portabilité</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:conseil.bnk@gmail.com" className="text-violet-600 hover:underline">conseil.bnk@gmail.com</a>. Vous pouvez également introduire une réclamation auprès de la <a href="https://www.cnil.fr" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">CNIL</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies</h2>
              <p>
                Ce site n'utilise pas de cookies de traçage ou de publicité. Aucun cookie tiers n'est déposé sans votre consentement.
              </p>
            </div>

          </div>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <Link to="/" className="text-violet-600 hover:text-violet-700 text-sm font-medium">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

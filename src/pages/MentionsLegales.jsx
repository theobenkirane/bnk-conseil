import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'

export default function MentionsLegales() {
  return (
    <PageTransition>
      <SEOHead
        title="Mentions Légales | BNK Conseil"
        description="Mentions légales du site BNK Conseil — éditeur, hébergeur, propriété intellectuelle, responsabilité."
        canonical="https://bnk-conseil-1z3b.vercel.app/mentions-legales"
      />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions légales</h1>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Éditeur du site</h2>
              <p>
                Le site <strong>bnk-conseil-1z3b.vercel.app</strong> est édité par :<br />
                <strong>BNK Conseil</strong><br />
                Fondateur : Théo Benkirane<br />
                Statut : Auto-entrepreneur / Consultant indépendant<br />
                Email : <a href="mailto:conseil.bnk@gmail.com" className="text-violet-600 hover:underline">conseil.bnk@gmail.com</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Hébergement</h2>
              <p>
                Le site est hébergé par :<br />
                <strong>Vercel Inc.</strong><br />
                340 Pine Street, Suite 701<br />
                San Francisco, CA 94104 — États-Unis<br />
                Site : <a href="https://vercel.com" className="text-violet-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive de BNK Conseil, sauf mention contraire. Toute reproduction, distribution ou modification sans autorisation écrite préalable est interdite.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Responsabilité</h2>
              <p>
                BNK Conseil s'efforce de maintenir les informations publiées sur ce site à jour et exactes. Cependant, BNK Conseil ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées. BNK Conseil ne saurait être tenu responsable des dommages directs ou indirects pouvant résulter de l'utilisation du site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens vers des sites tiers. BNK Conseil n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français sont seuls compétents.
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

import { Helmet } from 'react-helmet-async'

// Composant réutilisable pour les meta tags SEO par page
export default function SEOHead({ title, description, canonical, ogTitle, ogDescription }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}

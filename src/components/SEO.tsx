import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage = '/src/assets/LOGO.png',
  ogUrl,
  ogType = 'website'
}: SEOProps) {
  const { i18n, t } = useTranslation();

  // Usar traducción del key si se proporciona, sino usar el valor directo
  const finalTitle = title || t('home.title');
  const finalDescription = description || t('home.description');
  const finalKeywords = keywords || t('home.keywords');
  const currentLang = i18n.language;
  const finalUrl = ogUrl || `https://toolify-xi.vercel.app/${currentLang}`;

  return (
    <Helmet>
      {/* Título y Descripción */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta httpEquiv="content-language" content={currentLang} />

      {/* Open Graph - Redes Sociales */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Toolify" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Optimización General */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content={currentLang} />
      <meta name="author" content="Toolify" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />

      {/* hreflang para multiidioma */}
      <link rel="alternate" hrefLang="es" href={finalUrl.replace(/\/en($|\/)/, '/es$1').replace(/\/(en|es)$/, '/es')} />
      <link rel="alternate" hrefLang="en" href={finalUrl.replace(/\/es($|\/)/, '/en$1').replace(/\/(en|es)$/, '/en')} />
      <link rel="alternate" hrefLang="x-default" href="https://toolify-xi.vercel.app" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Toolify',
          'description': finalDescription,
          'url': 'https://toolify-xi.vercel.app',
          'inLanguage': currentLang,
          'applicationCategory': 'Utility',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'image': ogImage
        })}
      </script>
    </Helmet>
  );
}

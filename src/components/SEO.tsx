import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}

export default function SEO({
  title = 'Toolify - Herramientas Online Gratuitas',
  description = 'Toolify es una colección de herramientas online gratuitas para editar imágenes, comprimir, redimensionar, convertir formatos y mucho más. Herramientas rápidas, fáciles de usar y sin publicidad.',
  keywords = 'herramientas online, editar imágenes, comprimir imágenes, convertir imágenes, redimensionar imágenes, toolify',
  ogImage = '/src/assets/LOGO.png',
  ogUrl = 'https://toolify-xi.vercel.app',
  ogType = 'website'
}: SEOProps) {
  return (
    <Helmet>
      {/* Título y Descripción */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph - Redes Sociales */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="Toolify" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Optimización General */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="language" content="es" />
      <meta name="author" content="Toolify" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={ogUrl} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Toolify',
          'description': description,
          'url': 'https://toolify-xi.vercel.app',
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

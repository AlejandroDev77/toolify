export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
      
      <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introducción</h2>
          <p>
            En <strong>Toolify</strong>, respetamos su privacidad y estamos comprometidos a proteger la información personal de nuestros usuarios. 
            Esta Política de Privacidad explica cómo recopilamos, usamos y divulgamos información sobre usted. 
            Nuestra premisa principal es que el procesamiento de las herramientas (como redimensionar fotos) se realiza del lado del cliente siempre que es posible, garantizando su privacidad.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Cookies y Tecnologías de Rastreo (Google AdSense)</h2>
          <p>
            Utilizamos servicios de terceros como <strong>Google AdSense</strong> para mostrar anuncios cuando visita nuestro sitio web. 
            Estos terceros pueden utilizar cookies, balizas web y otras tecnologías de seguimiento para recopilar información sobre usted cuando visita nuestro sitio web.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Los proveedores, incluido Google, utilizan cookies para mostrar anuncios relevantes basándose en las visitas anteriores de un usuario a nuestro sitio web o a otros sitios web.</li>
            <li>El uso de cookies de publicidad permite a Google y a sus socios mostrar anuncios a nuestros usuarios basados en sus visitas a nuestros sitios y/o a otros sitios de Internet.</li>
            <li>Los usuarios pueden inhabilitar la publicidad personalizada. Para ello, deberán acceder a <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Configuración de anuncios</a>. (También puede indicar a los usuarios que pueden inhabilitar el uso de cookies para la publicidad personalizada por parte de terceros accediendo a www.aboutads.info.)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Procesamiento de Archivos e Imágenes</h2>
          <p>
            Nuestro núcleo de negocio se basa en la privacidad. Cuando utiliza nuestras herramientas (Redimensionar, Comprimir, etc.):
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>La mayoría de las manipulaciones de archivos o imágenes se realizan localmente en su navegador (Client-side).</li>
            <li>Nosotros <strong>no</strong> almacenamos, revisamos, ni hacemos copias de seguridad de sus archivos.</li>
            <li>Una vez que cierra su navegador o refresca la página, los datos temporales del archivo desaparecen.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Enlaces a otros sitios web</h2>
          <p>
            Nuestro sitio web puede contener enlaces a otros sitios de interés. Sin embargo, una vez que haya utilizado estos enlaces y abandone nuestro sitio, debe tener en cuenta que no tenemos ningún control sobre ese otro sitio web. Por lo tanto, no podemos ser responsables de la protección y privacidad de cualquier información que proporcione al visitar dichos sitios web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contacto</h2>
          <p>
            Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos a través de nuestra página de <a href="/contact" className="text-indigo-600 hover:underline">Contacto</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Términos del Servicio</h1>
      
      <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
        <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el sitio web de <strong>Toolify</strong> (en adelante "el Servicio"), usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos, entonces no tiene permiso para acceder al Servicio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Uso del Servicio</h2>
          <p>
            El Servicio se proporciona "tal cual" y "según disponibilidad". Toolify ofrece herramientas gratuitas para la manipulación y optimización de imágenes. Usted acepta utilizar el Servicio solo para fines lícitos y abstenerse de:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Subir contenido ilegal, violento, pornográfico o que infrinja los derechos de autor de terceros.</li>
            <li>Intentar eludir las medidas de seguridad del sitio o sobrecargar los servidores con ataques DDoS.</li>
            <li>Usar scripts automatizados de manera maliciosa que puedan degradar la calidad del servicio para otros.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Limitación de Responsabilidad</h2>
          <p>
            Toolify, sus desarrolladores, directores y empleados, en ningún caso serán responsables por ningún daño indirecto, punitivo, incidental, especial o consecuente, incluyendo, sin limitación, la pérdida de beneficios, datos, uso o de otras pérdidas intangibles resultantes del acceso o uso indebido de nuestras herramientas.
            Tenga en cuenta que no guardamos sus imágenes, por lo que no nos hacemos responsables por la pérdida incidental de archivos procesados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Propiedad Intelectual</h2>
          <p>
            Todo el contenido, marcas registradas, logotipos y derechos de propiedad intelectual del diseño y estructura de Toolify nos pertenecen o estamos licenciados para usarlos. El usuario retiene absolutamente todos los derechos de propiedad intelectual sobre los archivos e imágenes que suba para su procesamiento.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Modificaciones</h2>
          <p>
            Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Al continuar accediendo o utilizando nuestro Servicio después de que se hagan efectivos los cambios, usted acepta estar legalmente sujeto a los términos revisados.
          </p>
        </section>
      </div>
    </div>
  );
}

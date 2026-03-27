export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Acerca de nosotros</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Nuestra misión es hacer la edición y el procesamiento de imágenes fáciles, accesibles y gratuitos para todos, en cualquier parte del mundo.
        </p>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Qué es Toolify?</h2>
          <p>
            <strong>Toolify</strong> es una plataforma integral de herramientas web que te permiten editar, redimensionar, comprimir y convertir el formato de tus imágenes directamente desde el navegador, sin necesidad de descargar software pesado y sin registros.
          </p>
          <p>
            Entendemos lo valioso que es tu tiempo y lo importante que es tener herramientas que funcionen de manera rápida y segura. Por eso, nos enfocamos en que casi todo el procesamiento ocurra en tu dispositivo, manteniendo tus archivos privados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Por qué usar Toolify?</h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Siempre es Gratis:</strong> Creemos que las herramientas esenciales de desarrollo, diseño y productividad deberían estar al alcance de todos.</li>
            <li><strong>Orientado a la Privacidad:</strong> No guardamos, copiamos ni analizamos tus imágenes privadas. Una vez convertidas o editadas, desaparecen al cerrar la página.</li>
            <li><strong>Fácil de Usar:</strong> Diseñamos cada herramienta para que sea intuitiva y la curva de aprendizaje sea prácticamente nula.</li>
            <li><strong>Rápido y Eficiente:</strong> Procesamiento impulsado por tecnologías web modernas que minimiza los tiempos de espera.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestro Compromiso</h2>
          <p>
            Trabajamos día a día probando nuevas tecnologías, manteniendo los servidores y mejorando la interfaz para asegurarnos de que siempre obtengas el mejor resultado. Queremos ser la primera página que guardes en tus marcadores cuando necesites manipular una imagen.
          </p>
        </section>
      </div>
    </div>
  );
}

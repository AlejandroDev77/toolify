import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'' | 'success' | 'submitting'>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate sending an email
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ¿Tienes dudas, sugerencias o encontraste un problema en la plataforma? Nos encantaría escucharte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
          {status === 'success' ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200">
              <h3 className="font-bold text-lg mb-2">¡Mensaje Enviado!</h3>
              <p>Gracias por contactarnos. Responderemos a tu solicitud lo más pronto posible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje o Sugerencia</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Consultas Empresariales y Colaboraciones</h3>
            <p className="text-gray-600">
              Para oportunidades de negocio, patrocinadores (incluyendo consultas de AdSense), sugerencias comerciales o problemas graves de la plataforma, también puedes escribirnos directamente mediante el formulario.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tiempos de Respuesta</h3>
            <p className="text-gray-600">
              Como equipo de desarrollo, intentamos leer todos los correos entrantes. El tiempo de respuesta estándar es de 24 a 48 horas hábiles.  
              Agradecemos tu paciencia si hay retrasos; intentamos mantener la plataforma al 100% todo el tiempo posible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

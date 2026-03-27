import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Toolify</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Herramientas online gratuitas y fáciles de usar para editar, comprimir y convertir imágenes. 
              No guardamos tus archivos, todo el procesamiento se realiza de forma segura.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Herramientas
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tool/resize-image" className="text-gray-500 hover:text-indigo-600 transition-colors">
                  Redimensionar Imagen
                </Link>
              </li>
              <li>
                <Link to="/tool/compress-image" className="text-gray-500 hover:text-indigo-600 transition-colors">
                  Comprimir Imagen
                </Link>
              </li>
              <li>
                <Link to="/tool/crop-image" className="text-gray-500 hover:text-indigo-600 transition-colors">
                  Recortar Imagen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Legal y Ayuda
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-indigo-600 transition-colors">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-indigo-600 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-500 hover:text-indigo-600 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-500 hover:text-indigo-600 transition-colors">
                  Términos del Servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Toolify. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

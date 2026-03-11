import { Link, useLocation } from "react-router-dom";
import { Home, Info } from "lucide-react";
import logo from "../../assets/LOGO.png";

export default function Header() {
  const location = useLocation();

  const navLinks = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Acerca de", path: "/about", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center transition-transform origin-left z-50 hover:scale-105 -ml-6 md:-ml-10"
        >
          <img
            src={logo}
            alt="Toolify Logo"
            className="w-32 md:w-40 h-auto object-contain mix-blend-multiply drop-shadow-md transition-all"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex justify-end md:w-[130px]"></div>
      </div>
    </header>
  );
}

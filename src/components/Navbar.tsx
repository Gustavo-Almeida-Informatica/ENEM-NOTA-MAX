import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  Clock, 
  Network, 
  Quote, 
  Menu, 
  X, 
  Compass, 
  FileText,
  CalendarCheck
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Mural', path: '/', icon: Compass },
    { label: 'Vídeos', path: '/videos', icon: Video },
    { label: 'Resumos', path: '/#mural', icon: FileText },
    { label: 'Dicas de tempo', path: '/dicas', icon: Clock },
    { label: 'Mapas mentais', path: '/mapas', icon: Network },
    { label: 'Citações', path: '/citacoes', icon: Quote },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    if (path === '/#mural') return currentPath === '/' || currentPath.startsWith('/assunto');
    return currentPath.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Brand Zone - Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('/')}
            className="text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 -ml-1 text-left flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              M
            </span>
            <span className="font-extrabold text-slate-900 tracking-tight">
              ENEM <span className="text-indigo-600 font-black">Nota Max</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`transition-colors py-1 relative whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded ${
                  isActive(item.path)
                    ? 'text-indigo-600 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 after:rounded-full'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('/dicas')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Planejar Tempo</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            <p className="px-3 py-1 text-xs font-medium text-slate-400 uppercase tracking-wider">
              Navegação
            </p>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive(item.path)
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive(item.path) ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 px-1">
              <button
                onClick={() => handleLinkClick('/dicas')}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Abrir Planejador de Tempo</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Tab Bar for Quick Ergonomic Thumb Access */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 pb-safe"
        aria-label="Navegação rápida inferior"
      >
        <div className="grid grid-cols-5 items-center h-14">
          <button
            onClick={() => handleLinkClick('/')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath === '/' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Mural</span>
          </button>

          <button
            onClick={() => handleLinkClick('/videos')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/videos') ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Video className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Vídeos</span>
          </button>

          <button
            onClick={() => handleLinkClick('/mapas')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/mapas') ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Network className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Mapas</span>
          </button>

          <button
            onClick={() => handleLinkClick('/dicas')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/dicas') ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Dicas</span>
          </button>

          <button
            onClick={() => handleLinkClick('/citacoes')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/citacoes') ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Quote className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Citações</span>
          </button>
        </div>
      </nav>
    </>
  );
};

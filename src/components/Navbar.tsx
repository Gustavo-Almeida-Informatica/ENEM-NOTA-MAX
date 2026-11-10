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
  CalendarCheck,
  Sun,
  Moon,
  PenTool,
  Flame,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Reta Final', path: '/reta-final', icon: Flame },
    { label: 'Mural', path: '/', icon: Compass },
    { label: 'Vídeos', path: '/videos', icon: Video },
    { label: 'Corretor', path: '/corretor', icon: PenTool },
    { label: 'Resumos', path: '/#mural', icon: FileText },
    { label: 'Dicas de tempo', path: '/dicas', icon: Clock },
    { label: 'Mapas mentais', path: '/mapas', icon: Network },
    { label: 'Repertório', path: '/repertorio', icon: BookOpen },
    { label: 'Equipe', path: '/equipe', icon: Users },
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    if (path === '/reta-final') return currentPath.startsWith('/reta-final');
    if (path === '/equipe') return currentPath.startsWith('/equipe');
    if (path === '/#mural') return currentPath === '/' || currentPath.startsWith('/assunto');
    if (path === '/repertorio') return currentPath.startsWith('/repertorio') || currentPath.startsWith('/citacoes');
    return currentPath.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Brand Zone - Wordmark */}
          <button
            onClick={() => handleLinkClick('/')}
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 -ml-1 text-left flex items-center gap-2 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              M
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">
              ENEM <span className="text-indigo-600 dark:text-indigo-400 font-black">Nota Max</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((item) => (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`transition-colors py-1 relative whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded flex items-center gap-1 cursor-pointer ${
                  isActive(item.path)
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400 after:rounded-full'
                    : item.path === '/reta-final'
                      ? 'text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 dark:hover:text-amber-300'
                      : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.path === '/reta-final' && <Flame className="w-3.5 h-3.5 text-amber-500" />}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button (Desktop & Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/90 dark:border-slate-800 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
              title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-200" />
              )}
            </button>

            {/* Desktop Quick Action */}
            <button
              onClick={() => handleLinkClick('/dicas')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Planejar Tempo</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between px-3 py-1">
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Navegação
              </p>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Modo Escuro</span>
                  </>
                )}
              </button>
            </div>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive(item.path)
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive(item.path) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
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
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-lg px-2 pb-safe transition-colors"
        aria-label="Navegação rápida inferior"
      >
        <div className="grid grid-cols-6 items-center h-14">
          <button
            onClick={() => handleLinkClick('/')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath === '/' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Mural</span>
          </button>

          <button
            onClick={() => handleLinkClick('/corretor')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/corretor') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Corretor</span>
          </button>

          <button
            onClick={() => handleLinkClick('/videos')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/videos') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Vídeos</span>
          </button>

          <button
            onClick={() => handleLinkClick('/mapas')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/mapas') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Network className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Mapas</span>
          </button>

          <button
            onClick={() => handleLinkClick('/dicas')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/dicas') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Dicas</span>
          </button>

          <button
            onClick={() => handleLinkClick('/repertorio')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              currentPath.startsWith('/repertorio') || currentPath.startsWith('/citacoes') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Repertório</span>
          </button>
        </div>
      </nav>
    </>
  );
};

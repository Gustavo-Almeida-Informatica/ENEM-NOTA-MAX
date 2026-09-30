import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { VideosPage } from './pages/VideosPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { TimeTipsPage } from './pages/TimeTipsPage';
import { MindMapsPage } from './pages/MindMapsPage';
import { CitationsPage } from './pages/CitationsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      // Check if path is embedded via hash (e.g. #/videos or #/assunto/slug)
      if (hash && hash.startsWith('#/')) {
        return hash.slice(1);
      }
      return `${path}${search}${hash}` || '/';
    }
    return '/';
  });

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      if (hash && hash.startsWith('#/')) {
        setCurrentPath(hash.slice(1));
      } else {
        setCurrentPath(`${path}${search}${hash}` || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (targetPath: string) => {
    // If navigating to #mural anchor
    if (targetPath === '/#mural' || targetPath === '#mural') {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/#mural');
        setCurrentPath('/#mural');
      }
      setTimeout(() => {
        const el = document.getElementById('mural');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    try {
      window.history.pushState({}, '', targetPath);
    } catch {
      // In strict sandboxes, fallback to hash
      window.location.hash = targetPath;
    }

    setCurrentPath(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching logic
  const renderCurrentRoute = () => {
    // Clean path without query or hash for route matching
    const [pathPart, queryPart] = currentPath.split('?');
    const cleanPath = pathPart.split('#')[0] || '/';

    // Route 1: Home
    if (cleanPath === '/' || cleanPath === '') {
      return <HomePage onNavigate={handleNavigate} />;
    }

    // Route 2: Videos
    if (cleanPath === '/videos') {
      return <VideosPage onNavigate={handleNavigate} />;
    }

    // Route 3: Subject Detail
    if (cleanPath.startsWith('/assunto/')) {
      const slug = cleanPath.replace('/assunto/', '').trim();
      return <SubjectDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    // Route 4: Time Tips & Planner
    if (cleanPath === '/dicas') {
      return <TimeTipsPage onNavigate={handleNavigate} />;
    }

    // Route 5: Mind Maps
    if (cleanPath === '/mapas') {
      let initialMapId: string | undefined;
      if (queryPart) {
        const params = new URLSearchParams(queryPart);
        initialMapId = params.get('id') || undefined;
      }
      return <MindMapsPage initialMapId={initialMapId} onNavigate={handleNavigate} />;
    }

    // Route 6: Citations & Repertoire
    if (cleanPath === '/citacoes') {
      return <CitationsPage onNavigate={handleNavigate} />;
    }

    // 404 Fallback
    return <NotFoundPage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderCurrentRoute()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

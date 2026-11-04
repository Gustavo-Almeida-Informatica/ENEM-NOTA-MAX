import React from 'react';
import { SeoMeta } from '../components/SeoMeta';
import { Instagram, Github, ExternalLink, Sparkles, ArrowRight, BookOpen, Flame, Heart } from 'lucide-react';

interface EquipePageProps {
  onNavigate: (path: string) => void;
}

export const EquipePage: React.FC<EquipePageProps> = ({ onNavigate }) => {
  return (
    <>
      <SeoMeta
        title="Nossa equipe | ENEM Nota Max"
        description="Conheça Gustavo Almeida e Max, os desenvolvedores do ENEM Nota Max."
      />

      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#08051b] text-[#f8f5ff] selection:bg-purple-500/30 selection:text-white">
        {/* Ambient atmospheric gradients matching original design */}
        <div 
          className="pointer-events-none absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full bg-purple-600/20 blur-[100px]" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute top-1/3 -right-24 w-[36rem] h-[36rem] rounded-full bg-indigo-600/20 blur-[110px]" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute -bottom-24 left-1/3 w-[32rem] h-[32rem] rounded-full bg-fuchsia-600/15 blur-[120px]" 
          aria-hidden="true" 
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col justify-between">
          
          {/* Hero Header */}
          <section className="text-center max-w-3xl mx-auto pt-2 pb-8 sm:pb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/40 bg-purple-900/30 text-purple-300 text-xs font-bold uppercase tracking-widest backdrop-blur-sm mb-6 shadow-sm shadow-purple-950/50">
              <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
              <span>Por trás da plataforma</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Quem faz o{' '}
              <span className="text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]">
                ENEM Nota Max?
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal max-w-2xl mx-auto">
              Conheça os dois desenvolvedores por trás do projeto. Nosso objetivo é aproximar tecnologia e educação e oferecer ferramentas que apoiem a preparação dos estudantes para o ENEM.
            </p>
          </section>

          {/* Team Cards Grid */}
          <section 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-4" 
            aria-label="Equipe de desenvolvimento"
          >
            {/* Card 1: Gustavo Almeida */}
            <article className="relative group overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#241349]/90 to-[#160d31]/95 p-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-purple-500/60 hover:-translate-y-1 hover:shadow-purple-900/30">
              {/* Top ambient glow inside card */}
              <div 
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-purple-500/25 blur-3xl transition-opacity duration-300 group-hover:bg-purple-500/35" 
                aria-hidden="true" 
              />

              {/* Avatar with glowing ring */}
              <div className="relative mx-auto mb-6 w-40 h-40 rounded-full p-1.5 bg-gradient-to-br from-purple-400 via-indigo-500 to-amber-300 shadow-[0_0_30px_rgba(139,53,255,0.45)]">
                <img
                  src="/assets/gustavo-almeida.jpg"
                  alt="Foto de perfil de Gustavo Almeida"
                  className="w-full h-full object-cover object-center rounded-full border-[3px] border-[#140b2c]"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to relative path if absolute asset proxy fails
                    (e.currentTarget as HTMLImageElement).src = '/equipe/assets/gustavo-almeida.jpg';
                  }}
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Gustavo Almeida
              </h2>

              <div className="mt-1.5 inline-block text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                Desenvolvedor
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-sm mx-auto">
                Participa do desenvolvimento do ENEM Nota Max, trabalhando para transformar ideias em recursos que apoiem a jornada dos estudantes.
              </p>

              <div className="mt-6 pt-2">
                <a
                  href="https://www.instagram.com/gustavo.almeida.ofc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Gustavo Almeida"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-purple-400/50 bg-purple-950/40 text-white font-semibold text-sm hover:bg-purple-600 hover:border-purple-400 transition-all duration-200 hover:-translate-y-0.5 shadow-md group-hover:border-purple-300"
                >
                  <Instagram className="w-4 h-4 text-purple-300" />
                  <span>@gustavo.almeida.ofc</span>
                </a>
              </div>
            </article>

            {/* Card 2: Max */}
            <article className="relative group overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#241349]/90 to-[#160d31]/95 p-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-purple-500/60 hover:-translate-y-1 hover:shadow-purple-900/30">
              {/* Top ambient glow inside card */}
              <div 
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-purple-500/25 blur-3xl transition-opacity duration-300 group-hover:bg-purple-500/35" 
                aria-hidden="true" 
              />

              {/* Avatar with glowing ring */}
              <div className="relative mx-auto mb-6 w-40 h-40 rounded-full p-1.5 bg-gradient-to-br from-purple-400 via-indigo-500 to-amber-300 shadow-[0_0_30px_rgba(139,53,255,0.45)]">
                <img
                  src="/assets/max.jpg"
                  alt="Foto de perfil de Max, um gato preto com olhos azuis"
                  className="w-full h-full object-cover object-center rounded-full border-[3px] border-[#140b2c]"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to relative path if absolute asset proxy fails
                    (e.currentTarget as HTMLImageElement).src = '/equipe/assets/max.jpg';
                  }}
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Max
              </h2>

              <div className="mt-1.5 inline-block text-amber-300 font-extrabold text-xs uppercase tracking-widest">
                Desenvolvedor
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-sm mx-auto">
                Faz parte da equipe responsável pelo desenvolvimento e evolução do ENEM Nota Max.
              </p>

              <div className="mt-6 pt-2">
                <a
                  href="https://www.instagram.com/max_silveira_2023/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Max"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-purple-400/50 bg-purple-950/40 text-white font-semibold text-sm hover:bg-purple-600 hover:border-purple-400 transition-all duration-200 hover:-translate-y-0.5 shadow-md group-hover:border-purple-300"
                >
                  <Instagram className="w-4 h-4 text-purple-300" />
                  <span>@max_silveira_2023</span>
                </a>
              </div>
            </article>
          </section>

          {/* Mission & Links Card */}
          <section className="mt-10 sm:mt-14 rounded-3xl border border-purple-500/30 bg-[#160d30]/80 p-8 sm:p-10 text-center backdrop-blur-md shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tecnologia a serviço da educação.
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              O ENEM Nota Max reúne recursos para ajudar estudantes a organizar os estudos, revisar conteúdos e se preparar com mais clareza para o exame.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('/')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4 text-slate-950" />
                <span>Explorar Conteúdos do Site</span>
              </button>

              <button
                onClick={() => onNavigate('/reta-final')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                <span>Central da Reta Final</span>
              </button>

              <a
                href="https://github.com/Gustavo-Almeida-Informatica/ENEM-NOTA-MAX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-purple-400/40 bg-purple-900/30 hover:bg-purple-800/50 text-white font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4 text-purple-300" />
                <span>Ver repositório no GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </section>

          {/* Subfooter */}
          <div className="mt-12 text-center text-xs text-purple-300/70 py-4 border-t border-purple-900/40">
            <p className="flex items-center justify-center gap-1.5 flex-wrap">
              <strong className="text-purple-300 font-semibold">ENEM Nota Max</strong>
              <span>·</span>
              <span>Estude</span>
              <span>•</span>
              <span>Planeje</span>
              <span>•</span>
              <span>Conquiste</span>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

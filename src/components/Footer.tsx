import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                M
              </span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                ENEM <span className="text-indigo-400">Nota Max</span>
              </span>
            </div>
            <p className="text-base text-slate-300 font-medium italic">
              "Estude menos tempo perdido, mire a nota máxima."
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Plataforma autoral de estudos objetivos para o ENEM. Resumos dos 60 assuntos mais cobrados, diagramas mentais interativos, biblioteca de videoaulas e repertório sociocultural para nota 1000.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Matriz de Referência do INEP
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Dados Verificados
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Navegação
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors text-left"
                >
                  Mural de Assuntos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/videos')}
                  className="hover:text-white transition-colors text-left"
                >
                  Biblioteca de Vídeos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/mapas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Mapas Mentais Interativos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/dicas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Dicas & Planejador de Tempo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/citacoes')}
                  className="hover:text-white transition-colors text-left"
                >
                  Banco de Repertório & Citações
                </button>
              </li>
            </ul>
          </div>

          {/* Areas of Knowledge */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Áreas do ENEM
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/#mural')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Linguagens e Códigos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/#mural')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Matemática e Exatas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/#mural')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Ciências Humanas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/#mural')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Ciências da Natureza
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/#mural')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Redação Nota 1000
                </button>
              </li>
            </ul>
          </div>

          {/* Methodology & Commitment */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Compromisso
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conteúdo com linguagem simples e direta, sintetizado por tópicos essenciais para otimizar suas horas de estudo e garantir a máxima pontuação pela régua TRI.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300">
              <span className="font-semibold text-white block mb-0.5">Dica de Ouro:</span>
              3 minutos por questão é a meta. Não trave nas difíceis: garanta todas as fáceis primeiro!
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ENEM Nota Max. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito para estudantes de todo o Brasil que miram a nota máxima.
          </p>
        </div>
      </div>
    </footer>
  );
};

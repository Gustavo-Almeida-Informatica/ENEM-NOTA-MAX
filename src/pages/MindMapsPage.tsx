import React, { useState, useEffect } from 'react';
import { Network, Sparkles, CheckCircle2, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { MIND_MAPS, getMindMapById } from '../data/mindmaps';
import { MindMapViewer } from '../components/MindMapViewer';
import { SeoMeta } from '../components/SeoMeta';

interface MindMapsPageProps {
  initialMapId?: string;
  onNavigate: (path: string) => void;
}

export const MindMapsPage: React.FC<MindMapsPageProps> = ({ 
  initialMapId, 
  onNavigate 
}) => {
  const [selectedMapId, setSelectedMapId] = useState<string>(
    initialMapId && getMindMapById(initialMapId) ? initialMapId : MIND_MAPS[0].id
  );

  useEffect(() => {
    if (initialMapId && getMindMapById(initialMapId)) {
      setSelectedMapId(initialMapId);
    }
  }, [initialMapId]);

  const activeMindMap = getMindMapById(selectedMapId) || MIND_MAPS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      <SeoMeta 
        title={`${activeMindMap.title} - Mapas Mentais Interativos`} 
        description="Mapas mentais interativos para o ENEM: explore nós conceituais, ramos coloridos, explicações objetivas e dicas de prova." 
      />

      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          <Network className="w-3.5 h-3.5 text-emerald-600" />
          <span>Diagramas de Fixação Rápida</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Mapas Mentais Interativos do ENEM
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Navegue pelas conexões conceituais dos temas mais recorrentes da prova. Clique nos nós para ler explicações concisas, arraste para explorar o diagrama ou use o modo lista no celular.
        </p>
      </div>

      {/* Theme Selector Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Escolha o Tema do Mapa Mental:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {MIND_MAPS.map((map) => {
            const isSelected = selectedMapId === map.id;
            return (
              <button
                key={map.id}
                onClick={() => setSelectedMapId(map.id)}
                className={`p-3 rounded-xl border text-left transition-all text-xs font-bold flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <span>{map.theme}</span>
                <span className="text-[10px] text-slate-400 font-normal mt-1">
                  {map.rootNode.children?.length || 0} ramos
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Active Mind Map Component */}
      <section className="space-y-4">
        <MindMapViewer 
          mindMap={activeMindMap}
          onNavigateToSubject={(slug) => onNavigate(`/assunto/${slug}`)}
        />
      </section>

      {/* How to use mind maps effectively in your study routine */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base sm:text-lg font-bold">
            Como usar Mapas Mentais para Fixação no ENEM
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 block">1. Visão Panorâmica</span>
            <p>
              Entenda como os subtemas se conectam antes de tentar memorizar fórmulas ou datas isoladas.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 block">2. Memória Espacial</span>
            <p>
              Cores e posições no plano ativam a memória fotográfica durante o estresse das 5 horas de prova.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
            <span className="font-bold text-slate-900 block">3. Revisão Relâmpago</span>
            <p>
              Passe 5 minutos revisando cada nó na semana da prova para resgatar termos e repertórios essenciais.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

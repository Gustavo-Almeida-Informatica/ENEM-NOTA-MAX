import React, { useState, useRef } from 'react';
import { 
  MindMap, 
  MindMapNode 
} from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ListTree, 
  Sparkles, 
  ArrowRight, 
  X, 
  ExternalLink,
  Info,
  Maximize2
} from 'lucide-react';

interface MindMapViewerProps {
  mindMap: MindMap;
  onNavigateToSubject?: (slug: string) => void;
}

export const MindMapViewer: React.FC<MindMapViewerProps> = ({ 
  mindMap, 
  onNavigateToSubject 
}) => {
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'visual' | 'outline'>('visual');

  const containerRef = useRef<HTMLDivElement>(null);

  const root = mindMap.rootNode;
  const children = root.children || [];
  const totalChildren = children.length;

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2.2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.6));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch drag support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Node position calculation in a radial layout
  // Center is at (450, 300) in a 900x600 SVG coordinate space
  const centerX = 450;
  const centerY = 300;
  const radius = 220;

  const nodePositions = children.map((node, index) => {
    const angle = (index * 2 * Math.PI) / totalChildren - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { node, x, y, angle };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Mind Map Header & Controls */}
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
        <div>
          <div className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: root.color || '#6366F1' }} 
            />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {mindMap.title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {mindMap.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setViewMode(viewMode === 'visual' ? 'outline' : 'visual')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'visual' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Alternar entre Diagrama e Lista"
          >
            <ListTree className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {viewMode === 'visual' ? 'Modo Lista' : 'Modo Diagrama'}
            </span>
          </button>

          {viewMode === 'visual' && (
            <>
              <div className="w-px h-4 bg-slate-200 my-auto" />
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Diminuir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Resetar Posição"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Visual Canvas Area */}
      {viewMode === 'visual' ? (
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[520px] bg-slate-900/95 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle Grid Backdrop */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <svg
            className="w-full h-full"
            viewBox="0 0 900 600"
            preserveAspectRatio="xMidYMid meet"
          >
            <g 
              transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
              style={{ transformOrigin: '450px 300px', transition: isDragging ? 'none' : 'transform 0.15s ease-out' }}
            >
              {/* Connecting Curved Lines */}
              {nodePositions.map(({ node, x, y }) => {
                // Bezier curve from center to target node
                const controlX = (centerX + x) / 2;
                const controlY = (centerY + y) / 2 + (x > centerX ? 15 : -15);
                const isSelected = selectedNode?.id === node.id;

                return (
                  <g key={`link-${node.id}`}>
                    <path
                      d={`M ${centerX} ${centerY} Q ${controlX} ${controlY} ${x} ${y}`}
                      fill="none"
                      stroke={node.color || '#6366F1'}
                      strokeWidth={isSelected ? 3.5 : 2}
                      strokeOpacity={isSelected ? 1 : 0.6}
                      strokeDasharray={isSelected ? 'none' : '4, 4'}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}

              {/* Central Root Node */}
              <g 
                onClick={() => setSelectedNode(root)}
                className="cursor-pointer group"
                transform={`translate(${centerX}, ${centerY})`}
              >
                <circle
                  r={56}
                  fill="#1E293B"
                  stroke={root.color || '#6366F1'}
                  strokeWidth={4}
                  className="transition-transform group-hover:scale-105 shadow-xl"
                />
                <circle
                  r={50}
                  fill="url(#centerGrad)"
                  opacity={0.15}
                />
                <text
                  textAnchor="middle"
                  dy="-6"
                  fill="#FFFFFF"
                  className="text-xs font-black tracking-wide uppercase select-none pointer-events-none"
                >
                  TEMA CENTRAL
                </text>
                <text
                  textAnchor="middle"
                  dy="14"
                  fill="#F8FAFC"
                  className="text-sm font-extrabold select-none pointer-events-none max-w-[90px]"
                >
                  {root.label.length > 18 ? `${root.label.slice(0, 16)}...` : root.label}
                </text>
              </g>

              {/* Radial Branch Nodes */}
              {nodePositions.map(({ node, x, y }) => {
                const isSelected = selectedNode?.id === node.id;
                const nodeColor = node.color || '#6366F1';

                return (
                  <g
                    key={node.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(node);
                    }}
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing selection aura */}
                    {isSelected && (
                      <circle
                        r={42}
                        fill={nodeColor}
                        opacity={0.25}
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      r={34}
                      fill="#0F172A"
                      stroke={nodeColor}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200 group-hover:scale-110 shadow-md"
                    />

                    {/* Node title wrapped */}
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#FFFFFF"
                      className="text-[11px] font-bold select-none pointer-events-none"
                    >
                      {node.label.length > 12 ? `${node.label.slice(0, 11)}...` : node.label}
                    </text>

                    {/* Small dot accent */}
                    <circle
                      cx={24}
                      cy={-24}
                      r={4}
                      fill={nodeColor}
                    />
                  </g>
                );
              })}

              <defs>
                <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#6366F1" />
                </radialGradient>
              </defs>
            </g>
          </svg>

          {/* Floating Instruction Tag */}
          <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-xs text-slate-300 text-[11px] px-3 py-1.5 rounded-lg border border-slate-700/60 pointer-events-none flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>Toque ou clique em um nó para abrir a explicação</span>
          </div>
        </div>
      ) : (
        /* Accessible Mobile/Outline View */
        <div className="p-5 space-y-4 max-h-[520px] overflow-y-auto">
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block mb-1">
              Conceito Raiz
            </span>
            <h3 className="text-lg font-bold">{root.label}</h3>
            <p className="text-sm text-indigo-900/80 mt-1">{root.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {children.map((child) => (
              <div
                key={child.id}
                onClick={() => setSelectedNode(child)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all hover:border-indigo-300 hover:shadow-xs ${
                  selectedNode?.id === child.id 
                    ? 'border-indigo-500 bg-indigo-50/30' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: child.color || '#6366F1' }} 
                    />
                    <h4 className="text-sm font-bold text-slate-900">{child.label}</h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {child.summary}
                </p>
                {child.enemTips && (
                  <span className="inline-block mt-2 text-[11px] font-medium text-indigo-600">
                    Dica de prova disponível →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Node Details Drawer/Modal */}
      {selectedNode && (
        <div className="border-t border-slate-200 bg-white p-5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: selectedNode.color || '#6366F1' }} 
                />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Explicação do Ramo
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedNode.label}
              </h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Fechar detalhes do nó"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-slate-700 mt-3 leading-relaxed">
            {selectedNode.summary}
          </p>

          {selectedNode.enemTips && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">O que mais cai no ENEM:</span>
                <p className="text-amber-800 leading-relaxed">{selectedNode.enemTips}</p>
              </div>
            </div>
          )}

          {selectedNode.relatedSubjectSlug && onNavigateToSubject && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => onNavigateToSubject(selectedNode.relatedSubjectSlug!)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                <span>Ver Resumo Completo do Assunto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

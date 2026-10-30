import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  MindMapNode, 
  MindMap 
} from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ListTree, 
  Sparkles, 
  X, 
  Video, 
  ChevronRight, 
  ChevronLeft,
  Download,
  Info,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { VideoEmbed } from './VideoEmbed';

interface NotebookMindMapViewerProps {
  mindMap: MindMap;
  onNavigateToSubject?: (slug: string) => void;
}

interface LayoutNode {
  node: MindMapNode;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
  branchColor: string;
  isCollapsed: boolean;
  hasChildren: boolean;
  parentId?: string;
  path: string[];
}

const BRANCH_COLORS = [
  '#059669', // Emerald
  '#0284C7', // Sky
  '#D97706', // Amber
  '#7C3AED', // Purple
  '#E11D48', // Rose
  '#0D9488', // Teal
];

export const NotebookMindMapViewer: React.FC<NotebookMindMapViewerProps> = ({ 
  mindMap, 
  onNavigateToSubject 
}) => {
  const [selectedNode, setSelectedNode] = useState<{ node: MindMapNode; path: string[] } | null>(null);
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 40, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'visual' | 'outline'>('visual');
  const [exporting, setExporting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Toggle node expand/collapse
  const toggleCollapse = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  // Compute 2D horizontal layout (NotebookLM style)
  const { layoutNodes, connections, maxBounds } = useMemo(() => {
    const nodes: LayoutNode[] = [];
    const conns: { from: LayoutNode; to: LayoutNode; color: string }[] = [];

    const NODE_WIDTH = 220;
    const NODE_HEIGHT = 68;
    const LEVEL_SPACING = 270;
    const VERTICAL_GAP = 20;

    let leafY = 40;

    // Helper to calculate subtree height and assign y coordinates
    function positionSubtree(
      currentNode: MindMapNode, 
      level: number, 
      branchIndex: number, 
      parentLayout?: LayoutNode,
      parentPath: string[] = []
    ): LayoutNode {
      const currentPath = [...parentPath, currentNode.label];
      const isCollapsed = collapsedNodes.has(currentNode.id);
      const rawChildren = currentNode.children || [];
      const hasChildren = rawChildren.length > 0;
      const visibleChildren = isCollapsed ? [] : rawChildren;

      const branchColor = level === 0 
        ? '#4F46E5' 
        : BRANCH_COLORS[branchIndex % BRANCH_COLORS.length];

      let childLayouts: LayoutNode[] = [];
      let calculatedY: number;

      if (!hasChildren || isCollapsed || visibleChildren.length === 0) {
        // Leaf node or collapsed node gets current leafY
        calculatedY = leafY;
        leafY += NODE_HEIGHT + VERTICAL_GAP;
      } else {
        // Position children recursively
        childLayouts = visibleChildren.map((child, idx) => 
          positionSubtree(child, level + 1, level === 0 ? idx : branchIndex, undefined, currentPath)
        );
        // Center parent between its first and last child
        const firstY = childLayouts[0].y;
        const lastY = childLayouts[childLayouts.length - 1].y;
        calculatedY = (firstY + lastY) / 2;
      }

      const layoutNode: LayoutNode = {
        node: currentNode,
        id: currentNode.id,
        x: 40 + level * LEVEL_SPACING,
        y: calculatedY,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        level,
        branchColor,
        isCollapsed,
        hasChildren,
        parentId: parentLayout?.id,
        path: currentPath
      };

      nodes.push(layoutNode);

      // Create connections
      childLayouts.forEach((child) => {
        conns.push({
          from: layoutNode,
          to: child,
          color: child.branchColor
        });
      });

      return layoutNode;
    }

    const root = mindMap.rootNode;
    positionSubtree(root, 0, 0, undefined, []);

    let maxX = 800;
    let maxY = 600;
    nodes.forEach((n) => {
      if (n.x + n.width + 100 > maxX) maxX = n.x + n.width + 100;
      if (n.y + n.height + 100 > maxY) maxY = n.y + n.height + 100;
    });

    return { 
      layoutNodes: nodes, 
      connections: conns, 
      maxBounds: { width: Math.max(maxX, 1100), height: Math.max(maxY, 650) } 
    };
  }, [mindMap, collapsedNodes]);

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 40, y: 40 });
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

  // Touch drag
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

  // Export image handler (PNG download via Canvas)
  const handleExportImage = async () => {
    if (!svgRef.current) return;
    setExporting(true);
    try {
      const svg = svgRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const DOMURL = window.URL || window.webkitURL || window;
      const url = DOMURL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = maxBounds.width * 1.5;
        canvas.height = maxBounds.height * 1.5;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `mapa-mental-${mindMap.theme.toLowerCase().replace(/\s+/g, '-')}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
        DOMURL.revokeObjectURL(url);
        setExporting(false);
      };
      img.src = url;
    } catch (err) {
      console.error('Failed to export map as image:', err);
      setExporting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-colors">
      {/* Top Controls Toolbar */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-900">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {mindMap.title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Estilo NotebookLM: nó à esquerda expandindo para a direita. Clique em um nó para abrir explicações e vídeos.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <button
            onClick={() => setViewMode(viewMode === 'visual' ? 'outline' : 'visual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'visual' 
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
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
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 my-auto" />
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Diminuir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Resetar Posição"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 my-auto" />
              <button
                onClick={handleExportImage}
                disabled={exporting}
                className="px-2.5 py-1.5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Exportar como Imagem PNG"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{exporting ? 'Exportando...' : 'Exportar PNG'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main View Area with Optional Side Panel */}
      <div className="relative flex flex-col lg:flex-row w-full h-[580px] overflow-hidden bg-slate-950">
        {viewMode === 'visual' ? (
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing select-none overflow-hidden"
          >
            {/* Subtle Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            <svg
              ref={svgRef}
              className="w-full h-full"
              viewBox={`0 0 ${maxBounds.width} ${maxBounds.height}`}
            >
              <g 
                transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                style={{ transformOrigin: '0 0', transition: isDragging ? 'none' : 'transform 0.1s ease-out' }}
              >
                {/* Curved Bezier Connectors */}
                {connections.map((conn, idx) => {
                  const startX = conn.from.x + conn.from.width;
                  const startY = conn.from.y + conn.from.height / 2;
                  const endX = conn.to.x;
                  const endY = conn.to.y + conn.to.height / 2;
                  const deltaX = Math.max((endX - startX) * 0.5, 40);

                  const pathD = `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`;
                  const isHighlighted = selectedNode?.node.id === conn.to.id;

                  return (
                    <path
                      key={`conn-${idx}`}
                      d={pathD}
                      fill="none"
                      stroke={conn.color}
                      strokeWidth={isHighlighted ? 3 : 2}
                      strokeOpacity={isHighlighted ? 0.95 : 0.45}
                      className="transition-all duration-200"
                    />
                  );
                })}

                {/* Nodes rendering */}
                {layoutNodes.map((item) => {
                  const isSelected = selectedNode?.node.id === item.id;
                  const isRoot = item.level === 0;

                  return (
                    <g
                      key={item.id}
                      transform={`translate(${item.x}, ${item.y})`}
                      onClick={() => setSelectedNode({ node: item.node, path: item.path })}
                      className="cursor-pointer group"
                    >
                      {/* Selection Glow */}
                      {isSelected && (
                        <rect
                          x={-3}
                          y={-3}
                          width={item.width + 6}
                          height={item.height + 6}
                          rx={15}
                          fill="none"
                          stroke={item.branchColor}
                          strokeWidth={2}
                          strokeOpacity={0.8}
                          className="animate-pulse"
                        />
                      )}

                      {/* Card Background */}
                      <rect
                        width={item.width}
                        height={item.height}
                        rx={12}
                        fill={isRoot ? '#1E293B' : '#0F172A'}
                        stroke={isSelected ? item.branchColor : '#334155'}
                        strokeWidth={isRoot ? 2.5 : 1.5}
                        className="transition-all duration-200 group-hover:stroke-indigo-400 shadow-md"
                      />

                      {/* Accent Color Left Border Bar */}
                      <rect
                        x={0}
                        y={0}
                        width={6}
                        height={item.height}
                        rx={3}
                        fill={item.branchColor}
                      />

                      {/* Label Text */}
                      <text
                        x={16}
                        y={24}
                        fill="#FFFFFF"
                        className="text-xs font-bold select-none pointer-events-none"
                      >
                        {item.node.label.length > 24 
                          ? `${item.node.label.slice(0, 22)}...` 
                          : item.node.label}
                      </text>

                      {/* Subtitle / summary preview */}
                      <text
                        x={16}
                        y={42}
                        fill="#94A3B8"
                        className="text-[10px] select-none pointer-events-none font-normal"
                      >
                        {item.node.summary 
                          ? item.node.summary.slice(0, 32) + '...' 
                          : 'Toque para detalhes'}
                      </text>

                      {/* Video indicator badge icon if videoQuery present */}
                      {item.node.videoQuery && (
                        <g transform={`translate(${item.width - 24}, 8)`}>
                          <circle r={8} cx={8} cy={8} fill="#EF4444" />
                          <path
                            d="M 6 5 L 12 8 L 6 11 Z"
                            fill="#FFFFFF"
                          />
                        </g>
                      )}

                      {/* Expand / Collapse Button ("<" or ">") on nodes with children */}
                      {item.hasChildren && (
                        <g
                          transform={`translate(${item.width - 20}, ${item.height / 2 - 10})`}
                          onClick={(e) => toggleCollapse(item.id, e)}
                          className="cursor-pointer"
                        >
                          <circle
                            r={10}
                            cx={10}
                            cy={10}
                            fill="#1E293B"
                            stroke={item.branchColor}
                            strokeWidth={1.5}
                            className="hover:fill-indigo-600 transition-colors"
                          />
                          <text
                            x={10}
                            y={14}
                            textAnchor="middle"
                            fill="#FFFFFF"
                            className="text-[11px] font-bold select-none"
                          >
                            {item.isCollapsed ? '+' : '<'}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Instruction Callout */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-slate-300 text-[11px] px-3 py-1.5 rounded-lg border border-slate-700/60 pointer-events-none flex items-center gap-1.5 shadow-sm">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Use o botão "&lt;" para recolher/expandir ou clique no bloco para ver explicação e vídeo.</span>
            </div>
          </div>
        ) : (
          /* Outline List Mode for Accessibility and Mobile Scanning */
          <div className="flex-1 p-6 overflow-y-auto max-h-[580px] bg-slate-900 text-white space-y-4">
            <div className="p-4 rounded-xl bg-indigo-950/70 border border-indigo-500/40">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-1">
                Tema Raiz
              </span>
              <h3 className="text-lg font-bold">{mindMap.rootNode.label}</h3>
              <p className="text-sm text-slate-300 mt-1">{mindMap.rootNode.summary}</p>
            </div>

            <div className="space-y-3">
              {mindMap.rootNode.children?.map((child, idx) => (
                <div 
                  key={child.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: BRANCH_COLORS[idx % BRANCH_COLORS.length] }} 
                      />
                      <h4 className="text-sm font-bold text-white">{child.label}</h4>
                    </div>
                    <button
                      onClick={() => setSelectedNode({ node: child, path: [mindMap.rootNode.label, child.label] })}
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>Abrir Detalhes</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">{child.summary}</p>

                  {/* Level 2 Sub-nodes */}
                  {child.children && child.children.length > 0 && (
                    <div className="pl-4 border-l border-slate-700 space-y-2 mt-2">
                      {child.children.map((subChild) => (
                        <div 
                          key={subChild.id}
                          onClick={() => setSelectedNode({ 
                            node: subChild, 
                            path: [mindMap.rootNode.label, child.label, subChild.label] 
                          })}
                          className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 cursor-pointer border border-slate-700/60 flex items-center justify-between transition-colors"
                        >
                          <div>
                            <span className="text-xs font-semibold text-slate-200 block">
                              {subChild.label}
                            </span>
                            <span className="text-[11px] text-slate-400 line-clamp-1">
                              {subChild.summary}
                            </span>
                          </div>
                          {subChild.videoQuery && (
                            <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Vídeo
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Node Details Side Panel (NotebookLM Drawer) */}
        {selectedNode && (
          <div className="w-full lg:w-96 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-right duration-200 z-20">
            <div className="space-y-4">
              {/* Breadcrumb Path */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  Painel de Detalhes
                </span>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Fechar painel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Path hierarchy */}
              <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                {selectedNode.path.join(' > ')}
              </div>

              {/* Title */}
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {selectedNode.node.label}
              </h3>

              {/* Summary */}
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700">
                {selectedNode.node.summary}
              </p>

              {/* ENEM Tips Callout */}
              {selectedNode.node.enemTips && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Como cai no ENEM:</span>
                  </div>
                  <p className="leading-relaxed text-amber-900 dark:text-amber-200">
                    {selectedNode.node.enemTips}
                  </p>
                </div>
              )}

              {/* Video Player if videoQuery is present */}
              {selectedNode.node.videoQuery && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400">
                    <Video className="w-4 h-4" />
                    <span>Videoaula Explicativa do Tópico</span>
                  </div>
                  <VideoEmbed
                    query={selectedNode.node.videoQuery}
                    title={selectedNode.node.label}
                  />
                </div>
              )}
            </div>

            {/* Bottom link to related subject if available */}
            {selectedNode.node.relatedSubjectSlug && onNavigateToSubject && (
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onNavigateToSubject(selectedNode.node.relatedSubjectSlug!)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ver Resumo Completo do Assunto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

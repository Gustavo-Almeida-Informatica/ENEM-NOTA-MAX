import React, { useState, useEffect, useRef } from 'react';
import { 
  PenTool, 
  Camera, 
  Upload, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  RefreshCw,
  Compass,
  X,
  Check,
  FileDown
} from 'lucide-react';
import { SeoMeta } from '../components/SeoMeta';
import { UploadedImage, RedacaoAnaliseResultado, RedacaoHistoryItem } from '../types/corretor';
import { compressImage } from '../utils/imageCompressor';
import { 
  loadPdfDocument, 
  renderPdfPageToUploadedImage, 
  renderPdfThumbnail, 
  PdfDocumentInfo 
} from '../utils/pdfConverter';
import { TranscriptionReviewer } from '../components/corretor/TranscriptionReviewer';
import { RedacaoResultViewer } from '../components/corretor/RedacaoResultViewer';
import { CorretorEvolutionChart } from '../components/corretor/CorretorEvolutionChart';

interface CorretorPageProps {
  onNavigate: (path: string) => void;
}

const HISTORY_STORAGE_KEY = 'enem_nota_max_redacao_history';

type InputMode = 'texto' | 'foto';
type Step = 1 | 2 | 3 | 4;

interface PdfPageSelectionState {
  file: File;
  docInfo: PdfDocumentInfo;
  thumbnails: Record<number, string>;
  selectedPages: number[];
  isLoadingThumbnails: boolean;
}

export const CorretorPage: React.FC<CorretorPageProps> = ({ onNavigate }) => {
  // Controle de fluxo das 4 etapas do corretor
  const [step, setStep] = useState<Step>(1);
  const [inputMode, setInputMode] = useState<InputMode>('foto');

  // Estados dos campos de entrada
  const [tema, setTema] = useState('');
  const [pastedTexto, setPastedTexto] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  // Detecção de ponteiro touch (celulares/tablets vs computadores)
  // Por quê: a flag '(any-pointer: coarse)' identifica com precisão dispositivos móveis e tablets
  // sem falsos positivos em computadores onde a câmera via navegador seria inútil.
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Controle de arraste e soltura (drag and drop) em computadores
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Estados para processamento e modal de seleção de páginas de PDF
  const [pdfPendingSelection, setPdfPendingSelection] = useState<PdfPageSelectionState | null>(null);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number } | null>(null);
  const cancelPdfProcessingRef = useRef<boolean>(false);

  // Estados de transcrição OCR e análise da banca
  const [transcribedTexto, setTranscribedTexto] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<RedacaoAnaliseResultado | null>(null);

  // Controle de tempo e mensagens dinâmicas animadas a cada 3 segundos
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Mensagem de erro amigável ao usuário
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estados e referências para validação interativa com foco e destaque visual
  // Por quê: em vez de desativar o botão sem explicação, deixamos o botão sempre clicável,
  // exibimos a lista de pendências em tempo real e, ao clicar, rolamos até o campo que falta.
  const [temaError, setTemaError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [pastedTextoError, setPastedTextoError] = useState(false);
  const temaInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);
  const pastedTextoRef = useRef<HTMLTextAreaElement>(null);

  // Referências para controle de requisições e inputs de arquivo
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Detecção de touch pointer na montagem
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsTouchDevice(window.matchMedia('(any-pointer: coarse)').matches);
    }
  }, []);

  // Temporizador para atualizar segundos decorridos e ciclar mensagens de progresso a cada 3s
  // Por quê: mantém o usuário informado com feedback dinâmico e animado nas etapas de processamento.
  useEffect(() => {
    if (!isTranscribing && !isAnalyzing) {
      setElapsedSeconds(0);
      setLoadingMessageIndex(0);
      return;
    }

    setElapsedSeconds(0);
    setLoadingMessageIndex(0);

    const timerInterval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(messageInterval);
    };
  }, [isTranscribing, isAnalyzing]);

  // Mensagens rotativas obrigatórias
  const transcriptionMessages = [
    'Lendo a folha...',
    'Identificando palavras duvidosas...',
    'Montando o texto...'
  ];

  const analysisMessages = [
    'Corretor 1 avaliando...',
    'Corretor 2 avaliando...',
    'Comparando as notas...'
  ];

  // Histórico local de redações salvas no navegador
  const [history, setHistory] = useState<RedacaoHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (err) {
        console.error('Falha ao recuperar histórico do localStorage:', err);
      }
    }
    return [];
  });

  const saveToHistory = (res: RedacaoAnaliseResultado) => {
    try {
      const now = new Date();
      const newItem: RedacaoHistoryItem = {
        id: `redacao-${Date.now()}`,
        dataIso: now.toISOString(),
        dataFormatada: now.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        tema: res.tema,
        notaTotal: res.notaTotal,
        anulada: res.anulacao.aplica,
        notasCompetencias: res.competencias.reduce((acc, c) => {
          acc[c.id] = c.nota;
          return acc;
        }, {} as any),
        textoPreview: res.texto.slice(0, 120) + (res.texto.length > 120 ? '...' : ''),
        resultado: res
      };

      const updated = [newItem, ...history.filter((h) => h.id !== newItem.id)].slice(0, 30);
      setHistory(updated);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Falha ao salvar redação no histórico:', err);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (_) {}
  };

  // Helper para verificar o tipo do arquivo (MIME ou extensão)
  // Por quê: alguns gerenciadores de arquivos do Android e navegadores móveis devolvem file.type vazio.
  const isPdfFile = (file: File): boolean => {
    const mime = (file.type || '').toLowerCase();
    const name = (file.name || '').toLowerCase();
    return mime === 'application/pdf' || name.endsWith('.pdf');
  };

  const isImageFile = (file: File): boolean => {
    const mime = (file.type || '').toLowerCase();
    const name = (file.name || '').toLowerCase();
    if (isPdfFile(file)) return false;
    return (
      mime.startsWith('image/') ||
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg') ||
      name.endsWith('.png') ||
      name.endsWith('.webp') ||
      name.endsWith('.heic') ||
      name.endsWith('.heif')
    );
  };

  // Processamento unificado de arquivos recebidos por input nativo ou drag and drop
  const processSelectedFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setErrorMessage(null);

    // Separação de PDFs e Fotos
    const pdfFiles = files.filter(isPdfFile);
    const imgFiles = files.filter(isImageFile);

    // Valida se houve arquivo com formato desconhecido
    if (pdfFiles.length === 0 && imgFiles.length === 0) {
      setErrorMessage('Formato não suportado. Envie fotos (JPG, PNG, WEBP) ou documentos PDF escaneados.');
      return;
    }

    // Processamento de Fotos Convencionais
    if (imgFiles.length > 0) {
      const remainingSlots = 3 - images.length;
      if (imgFiles.length > remainingSlots) {
        setErrorMessage('Você pode anexar no máximo 3 fotos (páginas) da folha de redação.');
        return;
      }

      setIsCompressing(true);
      try {
        const compressedList: UploadedImage[] = [];
        for (const file of imgFiles) {
          const compressed = await compressImage(file);
          compressedList.push(compressed);
        }
        setImages((prev) => [...prev, ...compressedList].slice(0, 3));
      } catch (err: any) {
        setErrorMessage(err?.message || 'Falha ao processar as fotos selecionadas.');
      } finally {
        setIsCompressing(false);
      }
    }

    // Processamento de Arquivo PDF
    if (pdfFiles.length > 0) {
      const pdfFile = pdfFiles[0]; // Processa 1 arquivo PDF por vez

      // Validação de limite de 25 MB do PDF
      if (pdfFile.size > 25 * 1024 * 1024) {
        setErrorMessage('O arquivo PDF excede o limite máximo permitido de 25 MB.');
        return;
      }

      const availableSlots = 3 - images.length;
      if (availableSlots <= 0) {
        setErrorMessage('Você já atingiu o limite de 3 páginas da folha de redação.');
        return;
      }

      try {
        setIsCompressing(true);
        const docInfo = await loadPdfDocument(pdfFile);

        // Se o PDF tem 3 ou menos páginas, converte direto ou valida espaço
        if (docInfo.numPages <= 3) {
          if (docInfo.numPages > availableSlots) {
            setErrorMessage(`Você pode anexar no máximo 3 páginas. Você já tem ${images.length} foto(s) e o PDF possui ${docInfo.numPages} páginas.`);
            setIsCompressing(false);
            return;
          }

          // Converte página por página mostrando barra indeterminada e botão Cancelar
          cancelPdfProcessingRef.current = false;
          const renderedPages: UploadedImage[] = [];

          for (let p = 1; p <= docInfo.numPages; p++) {
            if (cancelPdfProcessingRef.current) {
              break;
            }
            setPdfProgress({ current: p, total: docInfo.numPages });
            const pageImage = await renderPdfPageToUploadedImage(docInfo.pdfDoc, p, pdfFile.name);
            renderedPages.push(pageImage);
          }

          setPdfProgress(null);

          if (!cancelPdfProcessingRef.current) {
            setImages((prev) => [...prev, ...renderedPages].slice(0, 3));
          }
        } else {
          // PDF com mais de 3 páginas: abre modal com miniaturas para o aluno escolher até 3
          // Por quê: permite que o participante selecione apenas as folhas com o texto final da redação.
          const initialSelection = [1, 2, 3].slice(0, availableSlots);
          const state: PdfPageSelectionState = {
            file: pdfFile,
            docInfo,
            thumbnails: {},
            selectedPages: initialSelection,
            isLoadingThumbnails: true
          };
          setPdfPendingSelection(state);

          // Gera miniaturas em segundo plano
          (async () => {
            const thumbs: Record<number, string> = {};
            for (let i = 1; i <= Math.min(docInfo.numPages, 10); i++) {
              try {
                thumbs[i] = await renderPdfThumbnail(docInfo.pdfDoc, i);
              } catch (e) {
                console.warn(`Erro ao gerar miniatura da página ${i}:`, e);
              }
            }
            setPdfPendingSelection((curr) => {
              if (!curr) return null;
              return { ...curr, thumbnails: thumbs, isLoadingThumbnails: false };
            });
          })();
        }
      } catch (err: any) {
        setPdfProgress(null);
        setErrorMessage(err?.message || 'Falha ao ler e converter o arquivo PDF escaneado.');
      } finally {
        setIsCompressing(false);
      }
    }
  };

  // Handler para o input nativo de arquivos
  const handleNativeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(e.target.files);
    }
    // Zera o valor do input permitindo que o mesmo arquivo seja selecionado em sequência
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handler para a câmera nativa (capture="environment")
  const handleCameraFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(e.target.files);
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  // Confirmação da seleção de páginas no modal de PDF longo (>3 páginas)
  const handleConfirmPdfPages = async () => {
    if (!pdfPendingSelection) return;
    const { docInfo, file, selectedPages } = pdfPendingSelection;

    if (selectedPages.length === 0) {
      setErrorMessage('Selecione ao menos 1 página do PDF para continuar.');
      return;
    }

    setPdfPendingSelection(null);
    setIsCompressing(true);
    cancelPdfProcessingRef.current = false;

    try {
      const renderedPages: UploadedImage[] = [];
      for (let i = 0; i < selectedPages.length; i++) {
        if (cancelPdfProcessingRef.current) {
          break;
        }
        const pageNum = selectedPages[i];
        setPdfProgress({ current: i + 1, total: selectedPages.length });
        const pageImg = await renderPdfPageToUploadedImage(docInfo.pdfDoc, pageNum, file.name);
        renderedPages.push(pageImg);
      }

      setPdfProgress(null);

      if (!cancelPdfProcessingRef.current) {
        setImages((prev) => [...prev, ...renderedPages].slice(0, 3));
      }
    } catch (err: any) {
      setPdfProgress(null);
      setErrorMessage(err?.message || 'Falha ao renderizar as páginas selecionadas do PDF.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleTogglePdfPage = (pageNum: number) => {
    if (!pdfPendingSelection) return;
    const maxSelectable = Math.max(1, 3 - images.length);
    const isAlreadySelected = pdfPendingSelection.selectedPages.includes(pageNum);

    if (isAlreadySelected) {
      setPdfPendingSelection({
        ...pdfPendingSelection,
        selectedPages: pdfPendingSelection.selectedPages.filter((p) => p !== pageNum)
      });
    } else {
      if (pdfPendingSelection.selectedPages.length >= maxSelectable) {
        setErrorMessage(`Você pode selecionar no máximo ${maxSelectable} página(s) deste PDF.`);
        return;
      }
      setPdfPendingSelection({
        ...pdfPendingSelection,
        selectedPages: [...pdfPendingSelection.selectedPages, pageNum].sort((a, b) => a - b)
      });
    }
  };

  // Manipulação de imagens na lista de pré-visualização (mover e remover)
  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    setImages((prev) => {
      if (toIndex < 0 || toIndex >= prev.length) return prev;
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  // Limpa o erro de upload assim que o usuário seleciona ou fotografa ao menos 1 página
  useEffect(() => {
    if (images.length > 0) {
      setUploadError(false);
      if (errorMessage === 'Envie ao menos 1 foto ou PDF.') {
        setErrorMessage(null);
      }
    }
  }, [images.length, errorMessage]);

  // Etapa 2: Chamada de Transcrição OCR
  // Validação ativa e transparente: o botão nunca fica desabilitado sem o usuário saber o porquê.
  // Se faltar o tema ou a imagem, o sistema rola a página suavemente até o campo pendente,
  // concede foco e exibe um destaque vermelho com mensagem explicativa.
  const handleStartTranscription = async () => {
    // Se o navegador estiver ocupado comprimindo imagens ou convertendo páginas do PDF, ignora cliques
    if (isCompressing || pdfProgress) {
      return;
    }

    const hasTema = Boolean(tema.trim());
    const hasImages = images.length > 0;

    // Se ambos faltarem, destaca ambos e rola até o tema (primeiro campo)
    if (!hasTema && !hasImages) {
      setTemaError(true);
      setUploadError(true);
      setErrorMessage('Informe o tema da redação para continuar.');
      if (temaInputRef.current) {
        temaInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        temaInputRef.current.focus();
      }
      return;
    }

    // Se faltar apenas o tema da proposta
    if (!hasTema) {
      setTemaError(true);
      setErrorMessage('Informe o tema da redação para continuar.');
      if (temaInputRef.current) {
        temaInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        temaInputRef.current.focus();
      }
      return;
    }

    // Se faltar apenas a foto ou PDF da folha manuscrita
    if (!hasImages) {
      setUploadError(true);
      setErrorMessage('Envie ao menos 1 foto ou PDF.');
      if (uploadAreaRef.current) {
        uploadAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setTemaError(false);
    setUploadError(false);
    setErrorMessage(null);
    setStep(2);
    setIsTranscribing(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const payloadImages = images.map((img) => ({
        data: img.dataUrl,
        name: img.name,
        mimeType: 'image/jpeg'
      }));

      const res = await fetch('/api/redacao/transcrever', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: payloadImages }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const rawText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Resposta inesperada do servidor (status ${res.status}).`);
      }

      if (!res.ok) {
        throw new Error(data?.error || `Erro na transcrição (status ${res.status}).`);
      }

      if (!data?.texto) {
        throw new Error('A IA não retornou texto transcrito. Verifique a qualidade da foto.');
      }

      setTranscribedTexto(data.texto);
      setStep(3); // Avança para a tela de revisão
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('Erro na transcrição:', err);
      if (err?.name === 'AbortError') {
        setErrorMessage('Tempo limite de 60s esgotado ao transcrever a foto. Verifique sua conexão e tente novamente.');
      } else {
        setErrorMessage(err?.message || 'Falha ao transcrever a foto manuscrita.');
      }
      setStep(1);
    } finally {
      setIsTranscribing(false);
      abortControllerRef.current = null;
    }
  };

  // Modo Texto: segue direto para a Etapa 3 com validação e foco no campo pendente
  const handleProceedWithPastedText = () => {
    const hasTema = Boolean(tema.trim());
    const hasPasted = Boolean(pastedTexto.trim());

    if (!hasTema) {
      setTemaError(true);
      setErrorMessage('Informe o tema da redação para continuar.');
      if (temaInputRef.current) {
        temaInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        temaInputRef.current.focus();
      }
      return;
    }

    if (!hasPasted) {
      setPastedTextoError(true);
      setErrorMessage('Por favor, digite ou cole o texto da redação.');
      if (pastedTextoRef.current) {
        pastedTextoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        pastedTextoRef.current.focus();
      }
      return;
    }

    setTemaError(false);
    setPastedTextoError(false);
    setErrorMessage(null);
    setTranscribedTexto(pastedTexto);
    setStep(3);
  };

  // Etapa 4: Avaliação completa com a Banca Oficial do ENEM
  const handleStartAnalysis = async () => {
    const textToAnalyze = transcribedTexto.trim();
    if (!textToAnalyze) {
      setErrorMessage('O texto da redação está vazio.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);
    setStep(4);

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const res = await fetch('/api/redacao/analisar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tema: tema.trim(),
          texto: textToAnalyze
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const rawText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Resposta inesperada do servidor (status ${res.status}).`);
      }

      if (!res.ok) {
        throw new Error(data?.error || `Erro na análise da redação (status ${res.status}).`);
      }

      setAnalysisResult(data);
      saveToHistory(data);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('Erro na análise:', err);
      if (err?.name === 'AbortError') {
        setErrorMessage('Tempo limite de 60s esgotado ao analisar a redação. Tente novamente.');
      } else {
        setErrorMessage(err?.message || 'Falha ao analisar a redação com a banca examinadora.');
      }
      setStep(3); // Volta para a tela de revisão em caso de falha
    } finally {
      setIsAnalyzing(false);
      abortControllerRef.current = null;
    }
  };

  const handleNewCorrection = () => {
    setStep(1);
    setTema('');
    setPastedTexto('');
    setImages([]);
    setTranscribedTexto('');
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleSelectHistoryItem = (item: RedacaoHistoryItem) => {
    setTema(item.tema);
    setTranscribedTexto(item.resultado.texto);
    setAnalysisResult(item.resultado);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      <SeoMeta
        title="Corretor de Redação com IA | ENEM Nota Max"
        description="Envie sua redação manuscrita por foto ou texto digitado. Transcrição OCR inteligente e dupla correção simultânea nos critérios oficiais do ENEM com nota de 0 a 1000."
      />

      {/* Indicador visual de progresso em 4 etapas */}
      <div className="space-y-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <PenTool className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Banca Examinadora com Dupla Avaliação Oficial</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Corretor de Redação do ENEM
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Envie sua redação manuscrita por foto, arquivo PDF escaneado ou texto digitado. Nossa IA transcreve a caligrafia e simula dois corretores independentes do INEP nas 5 competências oficiais.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {[
            { num: 1, label: '1. Envio do Tema e Texto' },
            { num: 2, label: '2. Transcrição da Caligrafia' },
            { num: 3, label: '3. Revisão do Texto' },
            { num: 4, label: '4. Análise e Nota' }
          ].map((s) => {
            const isActive = step === s.num;
            const isCompleted = step > s.num;

            return (
              <div
                key={s.num}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isActive ? 'bg-white text-indigo-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {s.num}
                    </span>
                  )}
                  <span className="truncate">{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerta de erro com visual suave */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 text-xs sm:text-sm space-y-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <strong className="block text-amber-900 dark:text-amber-100">
                Aviso do Corretor:
              </strong>
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-amber-700 dark:text-amber-300 hover:text-amber-950 p-1 rounded"
              title="Fechar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ETAPA 1: ENVIO */}
      {step === 1 && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Campo obrigatório de tema */}
            {/* 
              3) Campo do tema
              - Placeholder mais claro e diferente do texto digitado (cor mais fraca e itálico): "Digite aqui o tema da sua redação".
              - Exemplo como texto de ajuda abaixo do campo, não como placeholder.
              - Destaque com borda vermelha e foco automático caso o usuário tente enviar sem preencher.
            */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Tema da Redação (Obrigatório) <span className="text-rose-500">*</span>
              </label>
              <input
                ref={temaInputRef}
                type="text"
                value={tema}
                onChange={(e) => {
                  setTema(e.target.value);
                  if (temaError) setTemaError(false);
                  if (errorMessage === 'Informe o tema da redação para continuar.') {
                    setErrorMessage(null);
                  }
                }}
                placeholder="Digite aqui o tema da sua redação"
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/60 dark:bg-slate-950/60 text-slate-900 dark:text-white text-sm font-medium focus:outline-none transition-all placeholder:italic placeholder:font-normal placeholder:text-slate-400/80 dark:placeholder:text-slate-500/80 ${
                  temaError
                    ? 'border-rose-500 ring-2 ring-rose-500/20 dark:border-rose-500'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                }`}
              />
              {temaError && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Informe o tema da redação para continuar.</span>
                </p>
              )}
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Exemplo: Desafios para a valorização de comunidades tradicionais no Brasil.
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                A proposta orienta a avaliação das Competências 2 (tema e repertório) e 3 (projeto de texto e coerência).
              </p>
            </div>

            {/* Seletor de modalidade: Foto/PDF vs Texto */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Como deseja enviar a sua redação?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInputMode('foto')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                    inputMode === 'foto'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${inputMode === 'foto' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm block">Enviar foto ou PDF escaneado</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block leading-relaxed">
                      Envie fotos da folha manuscrita ou arquivo PDF. A IA transcreve a caligrafia na hora.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setInputMode('texto')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                    inputMode === 'texto'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${inputMode === 'texto' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm block">Digitar ou colar o texto</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block leading-relaxed">
                      Cole a redação digitada para ir direto à revisão e análise dos corretores oficiais.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Modo Foto / PDF */}
            {inputMode === 'foto' && (
              <div className="space-y-4 pt-2">
                {/* 
                  Input nativo de arquivos:
                  - accept="image/*,.jpg,.jpeg,.png,.webp,application/pdf,.pdf" e multiple
                  - sr-only para ficar visualmente escondido sem display: none
                  - acionado via ref dentro do evento de clique de um <button>
                  - sem capture="environment" no seletor geral
                  - sem image/heic (o iOS converte HEIC automaticamente quando não listado)
                  - sem showOpenFilePicker / File System Access API
                */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.jpg,.jpeg,.png,.webp,application/pdf,.pdf"
                  multiple
                  onChange={handleNativeFileChange}
                  className="sr-only"
                  tabIndex={-1}
                  id="redacao-native-files-input"
                />

                {/* Segundo input específico para câmera com capture="environment", exibido apenas em touch */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*,.jpg,.jpeg,.png,.webp"
                  capture="environment"
                  onChange={handleCameraFileChange}
                  className="sr-only"
                  tabIndex={-1}
                  id="redacao-camera-capture-input"
                />

                {/* 
                  4) Dica da foto:
                  Orientação para garantir que a imagem contenha a folha inteira com nitidez e boa iluminação.
                */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Fotografe a folha inteira, de cima, com boa luz e sem sombra. Fotos cortadas ou com muitas marcas podem gerar uma transcrição incompleta.
                  </span>
                </div>

                {/* Área de envio / arrastar e soltar (Drag and Drop) */}
                {images.length < 3 && (
                  <div
                    ref={uploadAreaRef}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(false);
                      if (e.dataTransfer.files) {
                        processSelectedFiles(e.dataTransfer.files);
                      }
                    }}
                    className={`rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all ${
                      uploadError
                        ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30 dark:bg-rose-950/20 ring-4 ring-rose-500/20'
                        : isDraggingOver
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 ring-4 ring-indigo-500/20'
                        : 'border-indigo-300 dark:border-indigo-800/80 bg-indigo-50/30 dark:bg-indigo-950/20 hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          {/* Botão primário: Escolher arquivos nativo */}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Escolher arquivos</span>
                          </button>

                          {/* Botão secundário: Tirar foto com a câmera, visível SOMENTE em touch devices */}
                          {isTouchDevice && (
                            <button
                              type="button"
                              onClick={() => cameraInputRef.current?.click()}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold text-xs sm:text-sm transition-colors"
                            >
                              <Camera className="w-4 h-4" />
                              <span>Tirar foto</span>
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                          Fotos (JPG, PNG, WEBP) ou PDF escaneado{!isTouchDevice && ' • ou arraste os arquivos aqui'}
                        </p>
                        {/* 
                          2) Textos que dão a ideia de "precisa de 3 páginas":
                          Substituído para deixar claro que uma única folha já é suficiente para correção completa.
                        */}
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                          Envie de 1 a 3 páginas. Uma só já funciona.
                        </p>
                        {uploadError && images.length === 0 && (
                          <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center justify-center gap-1.5 pt-2 animate-fade-in">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Envie ao menos 1 foto ou PDF.</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Barra de progresso indeterminada durante leitura e renderização de PDF */}
                {pdfProgress && (
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-3" role="status" aria-live="polite">
                    <div className="flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200 font-bold">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                        <span>Lendo página {pdfProgress.current} de {pdfProgress.total}...</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          cancelPdfProcessingRef.current = true;
                          setPdfProgress(null);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline font-semibold"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                      <div className="h-full bg-indigo-600 rounded-full animate-indeterminate w-full" />
                    </div>
                  </div>
                )}

                {/* Feedback de compressão de fotos */}
                {isCompressing && !pdfProgress && (
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Otimizando imagens no navegador (1600px JPEG)...</span>
                  </div>
                )}

                {/* Lista de prévias com reordenar e remover */}
                {images.length > 0 && (
                  <div className="space-y-2">
                    {/* 
                      2) Textos que dão a ideia de "precisa de 3 páginas":
                      Substituído por texto claro e amigável.
                    */}
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      {images.length === 1
                        ? '1 página adicionada (você pode enviar até 3):'
                        : `${images.length} páginas adicionadas (você pode enviar até 3):`}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {images.map((img, idx) => (
                        <div
                          key={img.id}
                          className="relative group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-xs space-y-2"
                        >
                          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                            <img
                              src={img.dataUrl}
                              alt={`Página ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[11px] font-bold backdrop-blur-xs">
                              Página {idx + 1}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="truncate max-w-[120px] font-medium">{img.name}</span>
                            <div className="flex items-center gap-1">
                              {idx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(idx, idx - 1)}
                                  title="Mover para cima"
                                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {idx < images.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(idx, idx + 1)}
                                  title="Mover para baixo"
                                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                title="Remover foto"
                                className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Modo Texto Digitado */}
            {inputMode === 'texto' && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  Texto da Redação
                </label>
                <textarea
                  ref={pastedTextoRef}
                  rows={14}
                  value={pastedTexto}
                  onChange={(e) => {
                    setPastedTexto(e.target.value);
                    if (pastedTextoError) setPastedTextoError(false);
                    if (errorMessage === 'Por favor, digite ou cole o texto da redação.') {
                      setErrorMessage(null);
                    }
                  }}
                  placeholder="Cole ou digite aqui os parágrafos da sua dissertação-argumentativa (Introdução, D1, D2 e Proposta de Intervenção)..."
                  className={`w-full p-4 rounded-xl border bg-slate-50/60 dark:bg-slate-950/60 text-slate-900 dark:text-white font-editorial text-base leading-relaxed focus:outline-none transition-all ${
                    pastedTextoError
                      ? 'border-rose-500 ring-2 ring-rose-500/20 dark:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                  }`}
                />
                {pastedTextoError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5 animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Por favor, digite ou cole o texto da redação.</span>
                  </p>
                )}
              </div>
            )}

            {/* Aviso de Privacidade Obrigatório */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>Aviso de privacidade:</strong> As imagens e textos são processados na hora e <strong>não ficam salvos no servidor</strong>.
              </span>
            </div>

            {/* 
              1) Botão "Transcrever Redação com IA" e lista de pendências em tempo real:
              - Nunca utiliza 'disabled' quando falta o tema ou fotos/PDF, permitindo clique a qualquer momento.
              - Acima do botão, exibe badges em tempo real: "Falta: tema da redação" e/ou "Falta: 1 foto ou PDF".
              - Quando ambos estiverem preenchidos, exibe "Tudo pronto" em verde com ícone de confirmação.
              - 'aria-disabled' é utilizado estritamente durante a compressão ou leitura de PDF.
            */}
            <div className="pt-2 flex flex-col items-stretch sm:items-end gap-3">
              {inputMode === 'foto' ? (
                <>
                  {/* Lista de pendências em tempo real */}
                  <div className="flex items-center justify-end" role="status" aria-live="polite">
                    {!tema.trim() || images.length === 0 ? (
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {!tema.trim() && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-semibold animate-fade-in">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Falta: tema da redação</span>
                          </span>
                        )}
                        {images.length === 0 && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-semibold animate-fade-in">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Falta: 1 foto ou PDF</span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold animate-fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Tudo pronto</span>
                      </span>
                    )}
                  </div>

                  {/* Botão de transcrição: sempre clicável quando faltam dados; aria-disabled apenas durante compressão/leitura de PDF */}
                  <button
                    type="button"
                    onClick={handleStartTranscription}
                    aria-disabled={isCompressing || Boolean(pdfProgress)}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md transition-all ${
                      isCompressing || Boolean(pdfProgress)
                        ? 'opacity-60 cursor-not-allowed'
                        : 'cursor-pointer hover:shadow-lg'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Transcrever Redação com IA</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  {/* Lista de pendências em tempo real para o modo texto digitado */}
                  <div className="flex items-center justify-end" role="status" aria-live="polite">
                    {!tema.trim() || !pastedTexto.trim() ? (
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {!tema.trim() && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-semibold animate-fade-in">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Falta: tema da redação</span>
                          </span>
                        )}
                        {!pastedTexto.trim() && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-semibold animate-fade-in">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Falta: texto da redação</span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold animate-fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Tudo pronto</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedWithPastedText}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Revisar e Analisar Redação</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Modal de seleção de páginas de PDF com mais de 3 páginas */}
          {pdfPendingSelection && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Selecione até 3 páginas deste PDF
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      O arquivo <strong>"{pdfPendingSelection.file.name}"</strong> contém {pdfPendingSelection.docInfo.numPages} páginas. O ENEM limita a redação oficial a no máximo 3 folhas.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPdfPendingSelection(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Grade de miniaturas das páginas */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Array.from({ length: Math.min(pdfPendingSelection.docInfo.numPages, 10) }, (_, i) => i + 1).map((pageNum) => {
                    const isSelected = pdfPendingSelection.selectedPages.includes(pageNum);
                    const thumbUrl = pdfPendingSelection.thumbnails[pageNum];

                    return (
                      <div
                        key={pageNum}
                        onClick={() => handleTogglePdfPage(pageNum)}
                        className={`cursor-pointer rounded-2xl border-2 p-2.5 transition-all text-center space-y-2 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="aspect-[3/4] rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center">
                          {thumbUrl ? (
                            <img
                              src={thumbUrl}
                              alt={`Página ${pageNum}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-xs text-slate-400 font-medium animate-pulse">
                              Carregando...
                            </div>
                          )}

                          <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 border border-slate-300 dark:border-slate-700'
                          }`}>
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : pageNum}
                          </div>
                        </div>

                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Página {pageNum}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium">
                    {pdfPendingSelection.selectedPages.length} de {Math.max(1, 3 - images.length)} página(s) selecionada(s)
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setPdfPendingSelection(null)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmPdfPages}
                      disabled={pdfPendingSelection.selectedPages.length === 0}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Confirmar páginas selecionadas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Histórico e Gráfico de Evolução */}
          {history.length > 0 && (
            <CorretorEvolutionChart
              history={history}
              onSelectHistoryItem={handleSelectHistoryItem}
              onClearHistory={clearHistory}
            />
          )}
        </div>
      )}

      {/* ETAPA 2: TRANSCRIÇÃO (Barra indeterminada animada + mensagens a cada 3s + contador) */}
      {step === 2 && (
        <div 
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-12 text-center shadow-sm space-y-6 animate-fade-in"
          role="status"
          aria-live="polite"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {transcriptionMessages[loadingMessageIndex]}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              O modelo de visão paleográfica está transcrevendo exatamente a caligrafia manuscrita e identificando termos ilegíveis entre <code className="text-indigo-600 dark:text-indigo-400 font-bold">[?...?]</code>.
            </p>
          </div>

          {/* Barra indeterminada animada */}
          <div className="max-w-xs mx-auto space-y-2">
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
              <div className="h-full bg-indigo-600 rounded-full animate-indeterminate w-full" />
            </div>
            <span className="text-xs text-slate-400 font-medium block">
              {elapsedSeconds}s decorridos
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (abortControllerRef.current) abortControllerRef.current.abort();
              setStep(1);
            }}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline font-semibold transition-colors"
          >
            Cancelar transcrição
          </button>
        </div>
      )}

      {/* ETAPA 3: REVISÃO DA DIGITALIZAÇÃO */}
      {step === 3 && (
        <TranscriptionReviewer
          images={images}
          texto={transcribedTexto}
          onUpdateTexto={setTranscribedTexto}
          onConfirmAnalysis={handleStartAnalysis}
          onBack={() => setStep(1)}
          isAnalyzing={isAnalyzing}
        />
      )}

      {/* ETAPA 4: ANÁLISE (Barra indeterminada animada + mensagens a cada 3s + contador) ou RESULTADO */}
      {step === 4 && (
        <>
          {isAnalyzing ? (
            <div 
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-12 text-center shadow-sm space-y-6 animate-fade-in"
              role="status"
              aria-live="polite"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {analysisMessages[loadingMessageIndex]}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Calculando as notas de C1 a C5 em múltiplos de 40, conferindo desvios gramaticais, projeto de texto e os 5 elementos da proposta de intervenção.
                </p>
              </div>

              {/* Barra indeterminada animada */}
              <div className="max-w-xs mx-auto space-y-2">
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  <div className="h-full bg-indigo-600 rounded-full animate-indeterminate w-full" />
                </div>
                <span className="text-xs text-slate-400 font-medium block">
                  {elapsedSeconds}s decorridos
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (abortControllerRef.current) abortControllerRef.current.abort();
                  setStep(3);
                }}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline font-semibold transition-colors"
              >
                Cancelar análise
              </button>
            </div>
          ) : analysisResult ? (
            <div className="space-y-8 animate-fade-in">
              <RedacaoResultViewer
                resultado={analysisResult}
                onNewCorrection={handleNewCorrection}
              />

              {history.length > 0 && (
                <CorretorEvolutionChart
                  history={history}
                  onSelectHistoryItem={handleSelectHistoryItem}
                  onClearHistory={clearHistory}
                />
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

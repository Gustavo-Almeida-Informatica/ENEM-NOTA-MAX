import pdfjsWorkerUrl from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
import { UploadedImage } from '../types/corretor';
import { compressImage } from './imageCompressor';

// Referência em cache para o módulo carregado dinamicamente
let cachedPdfjsLib: any = null;

/**
 * Carrega a biblioteca PDF.js build legacy sob demanda (Dynamic Import).
 * Por quê: evita que o bundle inicial do site carregue mais de 1MB de código desnecessário
 * quando o usuário envia apenas fotos ou cola texto digitado.
 * O build legacy garante compatibilidade com versões antigas do Safari, Chrome e Firefox.
 */
export async function loadPdfjs(): Promise<any> {
  if (cachedPdfjsLib) {
    return cachedPdfjsLib;
  }

  try {
    // Importação dinâmica para não pesar no carregamento inicial
    const lib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    if (lib.GlobalWorkerOptions) {
      lib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
    }
    cachedPdfjsLib = lib;
    return lib;
  } catch (err: any) {
    console.error('Falha ao carregar pdfjs-dist legacy:', err);
    throw new Error('Não foi possível carregar o visualizador de PDF no seu navegador. O envio de fotos continua disponível.');
  }
}

export interface PdfDocumentInfo {
  pdfDoc: any;
  numPages: number;
}

/**
 * Lê o arquivo PDF no navegador e valida tamanho (máximo 25 MB) e proteção por senha.
 */
export async function loadPdfDocument(file: File): Promise<PdfDocumentInfo> {
  // Limite estrito de 25 MB por PDF
  const MAX_PDF_BYTES = 25 * 1024 * 1024;
  if (file.size > MAX_PDF_BYTES) {
    throw new Error('O arquivo PDF excede o limite máximo permitido de 25 MB.');
  }

  const pdfjs = await loadPdfjs();

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new Error('Não foi possível ler o arquivo PDF. Tente selecioná-lo novamente.');
  }

  try {
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    return {
      pdfDoc,
      numPages: pdfDoc.numPages
    };
  } catch (err: any) {
    const errorMsg = String(err?.message || err);
    const errorName = String(err?.name || '');

    // Identificação de PDF protegido com senha
    if (
      errorName === 'PasswordException' ||
      errorMsg.includes('password') ||
      errorMsg.includes('PasswordException')
    ) {
      throw new Error('Este PDF tem senha. Remova a senha e envie de novo.');
    }

    // Identificação de PDF corrompido ou inválido
    throw new Error('Não foi possível abrir o arquivo PDF. O documento pode estar corrompido ou ilegível.');
  }
}

/**
 * Renderiza uma miniatura rápida (baixa resolução, ~200px) para exibição na seleção de páginas.
 * Libera a memória do canvas imediatamente após gerar a imagem.
 */
export async function renderPdfThumbnail(pdfDoc: any, pageNumber: number): Promise<string> {
  const page = await pdfDoc.getPage(pageNumber);
  const unscaledViewport = page.getViewport({ scale: 1 });

  // Escala para miniatura com lado maior de 200px
  const maxDim = Math.max(unscaledViewport.width, unscaledViewport.height);
  const scale = maxDim > 0 ? 200 / maxDim : 0.3;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.width = 0;
    canvas.height = 0;
    return '';
  }

  // Fundo branco limpo para folha escaneada
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: ctx,
    viewport
  }).promise;

  const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

  // Liberação de memória do canvas
  canvas.width = 0;
  canvas.height = 0;

  return dataUrl;
}

/**
 * Renderiza uma página do PDF em alta resolução (lado maior ~1600px),
 * converte para Blob JPEG, passa pelo compressImage existente e libera o canvas.
 * Por quê: renderizar uma página por vez evita estourar a memória de celulares e tablets.
 */
export async function renderPdfPageToUploadedImage(
  pdfDoc: any,
  pageNumber: number,
  baseFileName: string
): Promise<UploadedImage> {
  const page = await pdfDoc.getPage(pageNumber);
  const unscaledViewport = page.getViewport({ scale: 1 });

  // Calcula escala para que o lado maior da página fique com cerca de 1600px
  const maxDim = Math.max(unscaledViewport.width, unscaledViewport.height);
  const targetMax = 1600;
  const scale = maxDim > 0 ? Math.min(3.0, targetMax / maxDim) : 1.5;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.width = 0;
    canvas.height = 0;
    throw new Error('Falha ao inicializar o renderizador gráfico de páginas.');
  }

  // Fundo branco sólido para digitalização perfeita
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: ctx,
    viewport
  }).promise;

  // Exporta em JPEG de alta qualidade
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.90);
  });

  // Libera a memória do canvas antes da próxima página
  canvas.width = 0;
  canvas.height = 0;

  if (!blob) {
    throw new Error(`Falha ao converter a página ${pageNumber} do PDF para imagem.`);
  }

  const cleanBaseName = baseFileName.replace(/\.pdf$/i, '');
  const pageName = `${cleanBaseName} (Página ${pageNumber}).jpg`;

  // Passa pelo compressor padrão que valida teto de 3.5 MB e gera dataUrl
  return await compressImage(blob, pageName);
}

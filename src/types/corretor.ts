export type CompetenceId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5';

export interface TrechoProblema {
  trecho: string;
  problema: string;
  sugestao: string;
}

export interface CompetenciaResultado {
  id: CompetenceId;
  nome: string;
  nota: number;
  justificativa: string;
  trechos: TrechoProblema[];
}

export interface AnulacaoInfo {
  aplica: boolean;
  motivo: string;
}

export interface AvaliadorDetalhe {
  total: number;
  notas: Record<CompetenceId, number>;
  comentario?: string;
}

export interface RedacaoAnaliseResultado {
  tema: string;
  texto: string;
  notaTotal: number;
  anulacao: AnulacaoInfo;
  competencias: CompetenciaResultado[];
  comentarioGeral: string;
  avaliadores?: {
    avaliador1: AvaliadorDetalhe;
    avaliador2: AvaliadorDetalhe;
    avaliador3?: AvaliadorDetalhe;
    houveDiscrepancia: boolean;
  };
  modelUsed?: string;
  dataIso: string;
}

export interface RedacaoHistoryItem {
  id: string;
  dataIso: string;
  dataFormatada: string;
  tema: string;
  notaTotal: number;
  anulada: boolean;
  notasCompetencias: Record<CompetenceId, number>;
  textoPreview: string;
  resultado: RedacaoAnaliseResultado;
}

export interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string; // base64 data URI
  sizeBytes: number;
  width: number;
  height: number;
}

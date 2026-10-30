import { UploadedImage } from '../types/corretor';

/**
 * Comprime uma imagem no navegador antes do envio.
 * Limita a dimensão máxima em 1600px e exporta como JPEG de alta fidelidade visual.
 * Libera a memória do canvas após o uso para evitar estouro de RAM em dispositivos móveis.
 */
export async function compressImage(file: File | Blob, customName?: string): Promise<UploadedImage> {
  const fileName = customName || (file instanceof File ? file.name : 'pagina.jpg');
  const lowerName = fileName.toLowerCase();
  const fileType = file.type || '';

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Falha ao ler o arquivo de imagem selecionado.'));

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => {
        // Detecta se o arquivo é HEIC/HEIF não suportado nativamente pelo navegador
        if (
          lowerName.endsWith('.heic') ||
          lowerName.endsWith('.heif') ||
          fileType.includes('heic') ||
          fileType.includes('heif')
        ) {
          reject(new Error('Não foi possível abrir esta imagem (HEIC). Tire um print ou exporte como JPG e tente de novo.'));
        } else {
          reject(new Error('Falha ao carregar a imagem para compressão.'));
        }
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        try {
          const maxDim = 1600;
          let { width, height } = img;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Não foi possível inicializar o canvas para compressão.');
          }

          // Fundo branco caso a imagem possua transparência (PNG ou WebP)
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.85;
          let dataUrl = canvas.toDataURL('image/jpeg', quality);

          // Calcula o tamanho aproximado em bytes da string base64
          let sizeBytes = Math.ceil((dataUrl.length * 3) / 4);

          // Se passar de 3.5 MB, rebaixa a qualidade para garantir que fique bem abaixo do teto de 4 MB
          if (sizeBytes > 3.5 * 1024 * 1024) {
            quality = 0.65;
            dataUrl = canvas.toDataURL('image/jpeg', quality);
            sizeBytes = Math.ceil((dataUrl.length * 3) / 4);
          }

          resolve({
            id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: fileName,
            dataUrl,
            sizeBytes,
            width,
            height
          });
        } catch (err) {
          reject(err);
        } finally {
          // Libera a memória do canvas zerando suas dimensões (requisito para navegadores móveis)
          canvas.width = 0;
          canvas.height = 0;
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

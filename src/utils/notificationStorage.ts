// Gerenciador de Armazenamento Persistente para Notificações — ENEM Nota Máxima
// Suporta persistência individual por ID único de notificação, salvando em localStorage
// e respeitando o ciclo de vida e preferências do estudante.

const STORAGE_KEY_PREFIX = 'enem_notif_dismissed_';
const STORAGE_LIST_KEY = 'enem_dismissed_notifications_list';

/**
 * Verifica se uma notificação com identificador único foi marcada como "Não mostrar novamente".
 */
export function isNotificationDismissed(notificationId: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    // 1. Checagem direta por chave individual
    const directKey = `${STORAGE_KEY_PREFIX}${notificationId}`;
    if (localStorage.getItem(directKey) === 'true') {
      return true;
    }

    // 2. Checagem na lista consolidada de IDs
    const rawList = localStorage.getItem(STORAGE_LIST_KEY);
    if (rawList) {
      const list: string[] = JSON.parse(rawList);
      if (Array.isArray(list) && list.includes(notificationId)) {
        return true;
      }
    }

    // 3. Checagem de compatibilidade com chaves de etapa legadas
    if (notificationId.includes('etapa1') && localStorage.getItem('enem_2026_dismissed_etapa1') === 'true') {
      return true;
    }
    if (notificationId.includes('etapa2') && localStorage.getItem('enem_2026_dismissed_etapa2') === 'true') {
      return true;
    }

    return false;
  } catch (err) {
    console.error('Erro ao ler preferência de notificação:', err);
    return false;
  }
}

/**
 * Salva a preferência de "Não mostrar novamente" para uma notificação específica.
 */
export function setNotificationDismissed(notificationId: string, dismissed: boolean = true): void {
  if (typeof window === 'undefined') return;

  try {
    const directKey = `${STORAGE_KEY_PREFIX}${notificationId}`;

    if (dismissed) {
      localStorage.setItem(directKey, 'true');

      // Atualiza a lista consolidada
      const rawList = localStorage.getItem(STORAGE_LIST_KEY);
      let list: string[] = [];
      if (rawList) {
        try {
          const parsed = JSON.parse(rawList);
          if (Array.isArray(parsed)) list = parsed;
        } catch (_) {}
      }
      if (!list.includes(notificationId)) {
        list.push(notificationId);
        localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(list));
      }

      // Compatibilidade legada com etapa
      if (notificationId.includes('etapa1')) {
        localStorage.setItem('enem_2026_dismissed_etapa1', 'true');
      } else if (notificationId.includes('etapa2')) {
        localStorage.setItem('enem_2026_dismissed_etapa2', 'true');
      }
    } else {
      localStorage.removeItem(directKey);

      // Remove da lista consolidada
      const rawList = localStorage.getItem(STORAGE_LIST_KEY);
      if (rawList) {
        try {
          const parsed: string[] = JSON.parse(rawList);
          if (Array.isArray(parsed)) {
            const filtered = parsed.filter(id => id !== notificationId);
            localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(filtered));
          }
        } catch (_) {}
      }

      if (notificationId.includes('etapa1')) {
        localStorage.removeItem('enem_2026_dismissed_etapa1');
      } else if (notificationId.includes('etapa2')) {
        localStorage.removeItem('enem_2026_dismissed_etapa2');
      }
    }
  } catch (err) {
    console.error('Erro ao salvar preferência de notificação:', err);
  }
}

/**
 * Remove todas as dispensas salvas (útil para testes e reinicializações).
 */
export function clearAllDismissedNotifications(): void {
  if (typeof window === 'undefined') return;
  try {
    const rawList = localStorage.getItem(STORAGE_LIST_KEY);
    if (rawList) {
      const list: string[] = JSON.parse(rawList);
      if (Array.isArray(list)) {
        list.forEach(id => localStorage.removeItem(`${STORAGE_KEY_PREFIX}${id}`));
      }
    }
    localStorage.removeItem(STORAGE_LIST_KEY);
    localStorage.removeItem('enem_2026_dismissed_etapa1');
    localStorage.removeItem('enem_2026_dismissed_etapa2');
  } catch (_) {}
}

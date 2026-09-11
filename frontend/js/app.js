document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabViews = document.querySelectorAll('.tab-view');

  const modalOverlay = document.getElementById('modal-overlay');
  const modalJugador = document.getElementById('modal-jugador');
  const modalVideojuego = document.getElementById('modal-videojuego');
  const modalPuntuacion = document.getElementById('modal-puntuacion');
  const allModals = [modalJugador, modalVideojuego, modalPuntuacion];

  const btnOpenJugador = document.getElementById('btn-open-modal-jugador');
  const btnOpenVideojuego = document.getElementById('btn-open-modal-videojuego');
  const btnOpenPuntuacion = document.getElementById('btn-open-modal-puntuacion');
  const shortcutButtons = document.querySelectorAll('[data-open-modal]');

  const closeButtons = document.querySelectorAll('.btn-close-modal');

  function switchTab(targetTabId) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === targetTabId);
    });

    tabViews.forEach(view => {
      const isTarget = view.id === `view-${targetTabId}`;
      view.classList.toggle('active', isTarget);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  function openModal(modalElement) {
    if (!modalElement || !modalOverlay) return;
    allModals.forEach(m => m.classList.add('hidden'));
    modalElement.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('hidden');
    allModals.forEach(m => m.classList.add('hidden'));
  }

  btnOpenJugador?.addEventListener('click', () => openModal(modalJugador));
  btnOpenVideojuego?.addEventListener('click', () => openModal(modalVideojuego));
  btnOpenPuntuacion?.addEventListener('click', () => openModal(modalPuntuacion));

  shortcutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.openModal;
      const targetModal = document.getElementById(modalId);
      openModal(targetModal);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
      closeModal();
    }
  });

  window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.2s ease-out';
      setTimeout(() => toast.remove(), 200);
    }, 3500);
  };
});

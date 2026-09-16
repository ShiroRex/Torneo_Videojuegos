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
  const cancelButtons = document.querySelectorAll('.btn-cancel-modal');

  const formJugador = document.getElementById('form-jugador');
  const formVideojuego = document.getElementById('form-videojuego');
  const formPuntuacion = document.getElementById('form-puntuacion');

  const btnSubmitJugador = document.getElementById('btn-submit-jugador') || formJugador?.querySelector('button[type="submit"]');
  const btnSubmitVideojuego = document.getElementById('btn-submit-videojuego') || formVideojuego?.querySelector('button[type="submit"]');
  const btnSubmitPuntuacion = document.getElementById('btn-submit-puntuacion') || formPuntuacion?.querySelector('button[type="submit"]');

  const selectGenero = document.getElementById('videojuego-genero');
  const wrapperGeneroOtro = document.getElementById('wrapper-genero-otro');
  const inputGeneroOtro = document.getElementById('videojuego-genero-otro');

  const selectPuntuacionJugador = document.getElementById('puntuacion-jugador');
  const selectPuntuacionVideojuego = document.getElementById('puntuacion-videojuego');
  const hintPuntuacionJugador = document.getElementById('puntuacion-jugador-hint');
  const hintPuntuacionVideojuego = document.getElementById('puntuacion-videojuego-hint');

  const statsContainer = document.getElementById('stats-container');
  const rankingContainer = document.getElementById('ranking-container');
  const playersTableContainer = document.getElementById('players-table-container');
  const inputSearchJugador = document.getElementById('input-search-jugador');
  const searchResultsCounter = document.getElementById('search-results-counter');

  let jugadores = [];
  let videojuegos = [];
  let ranking = [];
  let estadisticas = {
    total_jugadores: 0,
    total_videojuegos: 0,
    total_puntuaciones: 0,
    puntuacion_promedio: 0
  };

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

  function renderStatsView() {
    if (!statsContainer || !window.Components) return;
    statsContainer.innerHTML = window.Components.renderStats(estadisticas);
  }

  function renderRankingView() {
    if (!rankingContainer || !window.Components) return;
    rankingContainer.innerHTML = window.Components.renderRankingTable(ranking);
  }

  function renderPlayersView(listToRender) {
    if (!playersTableContainer || !window.Components) return;
    const list = listToRender !== undefined ? listToRender : jugadores;
    playersTableContainer.innerHTML = window.Components.renderPlayersTable(list);

    if (searchResultsCounter) {
      const cantidad = list.length;
      searchResultsCounter.textContent = `${cantidad} ${cantidad === 1 ? 'jugador encontrado' : 'jugadores encontrados'}`;
    }
  }

  function updateScoreSelects() {
    if (!selectPuntuacionJugador || !selectPuntuacionVideojuego) return;

    selectPuntuacionJugador.innerHTML = '<option value="" disabled selected>Selecciona un jugador...</option>';
    if (!jugadores || jugadores.length === 0) {
      hintPuntuacionJugador?.classList.remove('hidden');
      selectPuntuacionJugador.disabled = true;
    } else {
      hintPuntuacionJugador?.classList.add('hidden');
      selectPuntuacionJugador.disabled = false;
      jugadores.forEach(j => {
        const opt = document.createElement('option');
        opt.value = j.id;
        opt.textContent = `${j.gamertag} (${j.nombre})`;
        selectPuntuacionJugador.appendChild(opt);
      });
    }

    selectPuntuacionVideojuego.innerHTML = '<option value="" disabled selected>Selecciona un videojuego...</option>';
    if (!videojuegos || videojuegos.length === 0) {
      hintPuntuacionVideojuego?.classList.remove('hidden');
      selectPuntuacionVideojuego.disabled = true;
    } else {
      hintPuntuacionVideojuego?.classList.add('hidden');
      selectPuntuacionVideojuego.disabled = false;
      videojuegos.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.id;
        opt.textContent = `${v.nombre} [${v.genero}]`;
        selectPuntuacionVideojuego.appendChild(opt);
      });
    }

    if (btnSubmitPuntuacion && !formPuntuacion?.dataset.submitting) {
      btnSubmitPuntuacion.disabled = (!jugadores || jugadores.length === 0 || !videojuegos || videojuegos.length === 0);
    }
  }

  function renderAll() {
    renderStatsView();
    renderRankingView();
    renderPlayersView();
    updateScoreSelects();
  }

  function openModal(modalElement) {
    if (!modalElement || !modalOverlay) return;
    if (modalElement === modalPuntuacion) {
      updateScoreSelects();
    }
    allModals.forEach(m => m?.classList.add('hidden'));
    modalElement.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('hidden');
    allModals.forEach(m => m?.classList.add('hidden'));
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

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
  cancelButtons.forEach(btn => btn.addEventListener('click', closeModal));

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
      closeModal();
    }
  });

  selectGenero?.addEventListener('change', () => {
    if (selectGenero.value === 'otro') {
      wrapperGeneroOtro?.classList.remove('hidden');
      if (inputGeneroOtro) inputGeneroOtro.required = true;
    } else {
      wrapperGeneroOtro?.classList.add('hidden');
      if (inputGeneroOtro) {
        inputGeneroOtro.required = false;
        inputGeneroOtro.value = '';
      }
    }
  });

  async function executeFormSubmission(form, submitButton, actionCallback) {
    if (!form || !submitButton) return;
    if (form.dataset.submitting === 'true') return;

    form.dataset.submitting = 'true';
    const originalHtml = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';

    try {
      await actionCallback();
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalHtml;
      delete form.dataset.submitting;
    }
  }

  let searchTimer = null;
  inputSearchJugador?.addEventListener('input', () => {
    const query = inputSearchJugador.value.trim();
    if (!query) {
      renderPlayersView(jugadores);
      return;
    }

    clearTimeout(searchTimer);
    searchTimer = setTimeout(async () => {
      try {
        const resultados = await window.API.buscarJugadores(query);
        renderPlayersView(Array.isArray(resultados) ? resultados : []);
      } catch (err) {
        renderPlayersView([]);
        window.showToast(err.message, 'error');
      }
    }, 250);
  });

  formJugador?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombreInput = document.getElementById('jugador-nombre');
    const gamertagInput = document.getElementById('jugador-gamertag');
    const correoInput = document.getElementById('jugador-correo');

    const nombre = nombreInput?.value.trim() || '';
    const gamertag = gamertagInput?.value.trim() || '';
    const correo = correoInput?.value.trim() || '';

    if (!nombre || !gamertag || !correo) {
      window.showToast('Nombre, Gamertag y correo son obligatorios.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      window.showToast('Ingresa un correo electronico valido.', 'error');
      return;
    }

    await executeFormSubmission(formJugador, btnSubmitJugador, async () => {
      try {
        const data = await window.API.crearJugador({ nombre, gamertag, correo });
        formJugador.reset();
        closeModal();
        window.showToast(data.mensaje || `Jugador ${gamertag} registrado con exito.`, 'success');
        await loadAllData();
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    });
  });

  formVideojuego?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombreInput = document.getElementById('videojuego-nombre');
    const nombre = nombreInput?.value.trim() || '';

    let genero = selectGenero?.value || '';
    if (genero === 'otro') {
      genero = inputGeneroOtro?.value.trim() || '';
    }

    if (!nombre || !genero) {
      window.showToast('Nombre y genero del videojuego son obligatorios.', 'error');
      return;
    }

    await executeFormSubmission(formVideojuego, btnSubmitVideojuego, async () => {
      try {
        const data = await window.API.crearVideojuego({ nombre, genero });
        formVideojuego.reset();
        wrapperGeneroOtro?.classList.add('hidden');
        closeModal();
        window.showToast(data.mensaje || `Videojuego ${nombre} registrado con exito.`, 'success');
        await loadAllData();
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    });
  });

  formPuntuacion?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const jugadorId = selectPuntuacionJugador?.value;
    const videojuegoId = selectPuntuacionVideojuego?.value;
    const puntuacionInput = document.getElementById('puntuacion-valor');
    const puntuacionStr = puntuacionInput?.value.trim() || '';

    if (!jugadorId || !videojuegoId || puntuacionStr === '') {
      window.showToast('Todos los campos son obligatorios.', 'error');
      return;
    }

    const puntuacionNum = Number(puntuacionStr);
    if (isNaN(puntuacionNum) || puntuacionNum < 0) {
      window.showToast('La puntuacion no puede ser un valor negativo.', 'error');
      return;
    }

    await executeFormSubmission(formPuntuacion, btnSubmitPuntuacion, async () => {
      try {
        const data = await window.API.crearPuntuacion({
          jugador_id: Number(jugadorId),
          videojuego_id: Number(videojuegoId),
          puntuacion: puntuacionNum
        });

        formPuntuacion.reset();
        closeModal();
        window.showToast(data.mensaje || 'Puntuacion registrada con exito.', 'success');
        await loadAllData();
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    });
  });

  window.showToast = function (message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    else if (type === 'error') iconClass = 'fa-circle-exclamation';

    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.25s ease-out';
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  };

  async function loadAllData() {
    try {
      const [resJugadores, resVideojuegos, resRanking, resStats] = await Promise.all([
        window.API.getJugadores(),
        window.API.getVideojuegos(),
        window.API.getRanking(),
        window.API.getEstadisticas()
      ]);

      jugadores = Array.isArray(resJugadores) ? resJugadores : [];
      videojuegos = Array.isArray(resVideojuegos) ? resVideojuegos : [];
      ranking = Array.isArray(resRanking) ? resRanking : [];
      estadisticas = resStats || {};
    } catch (err) {
      window.showToast(err.message, 'error');
    }

    renderAll();
  }

  loadAllData();
});

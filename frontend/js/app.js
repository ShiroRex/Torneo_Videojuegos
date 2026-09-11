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

  const selectGenero = document.getElementById('videojuego-genero');
  const wrapperGeneroOtro = document.getElementById('wrapper-genero-otro');
  const inputGeneroOtro = document.getElementById('videojuego-genero-otro');

  const selectPuntuacionJugador = document.getElementById('puntuacion-jugador');
  const selectPuntuacionVideojuego = document.getElementById('puntuacion-videojuego');
  const hintPuntuacionJugador = document.getElementById('puntuacion-jugador-hint');
  const hintPuntuacionVideojuego = document.getElementById('puntuacion-videojuego-hint');
  const btnSubmitPuntuacion = document.getElementById('btn-submit-puntuacion');

  const statsContainer = document.getElementById('stats-container');
  const rankingContainer = document.getElementById('ranking-container');
  const playersTableContainer = document.getElementById('players-table-container');
  const inputSearchJugador = document.getElementById('input-search-jugador');
  const searchResultsCounter = document.getElementById('search-results-counter');

  let jugadores = [];
  let videojuegos = [];
  let puntuaciones = [];

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

  function calculateStats() {
    const totalJugadores = jugadores.length;
    const totalVideojuegos = videojuegos.length;
    const totalPuntuaciones = puntuaciones.length;
    const sumaPuntuaciones = puntuaciones.reduce((acc, curr) => acc + curr.puntuacion, 0);
    const promedioPuntuacion = totalPuntuaciones === 0 ? '0' : (sumaPuntuaciones / totalPuntuaciones).toFixed(1);

    return {
      totalJugadores,
      totalVideojuegos,
      totalPuntuaciones,
      promedioPuntuacion
    };
  }

  function renderStatsView() {
    if (!statsContainer || !window.Components) return;
    const stats = calculateStats();
    statsContainer.innerHTML = window.Components.renderStats(stats);
  }

  function renderRankingView() {
    if (!rankingContainer || !window.Components) return;
    rankingContainer.innerHTML = window.Components.renderRankingTable(puntuaciones, jugadores, videojuegos);
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

  function renderAll() {
    renderStatsView();
    renderRankingView();
    renderPlayersView();
    updateScoreSelects();
  }

  function updateScoreSelects() {
    if (!selectPuntuacionJugador || !selectPuntuacionVideojuego) return;

    selectPuntuacionJugador.innerHTML = '<option value="" disabled selected>Selecciona un jugador...</option>';
    if (jugadores.length === 0) {
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
    if (videojuegos.length === 0) {
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

    if (btnSubmitPuntuacion) {
      btnSubmitPuntuacion.disabled = (jugadores.length === 0 || videojuegos.length === 0);
    }
  }

  function openModal(modalElement) {
    if (!modalElement || !modalOverlay) return;
    if (modalElement === modalPuntuacion) {
      updateScoreSelects();
    }
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

  inputSearchJugador?.addEventListener('input', () => {
    const query = inputSearchJugador.value.trim().toLowerCase();
    if (!query) {
      renderPlayersView(jugadores);
      return;
    }

    const filtered = jugadores.filter(j => {
      const matchNombre = j.nombre ? j.nombre.toLowerCase().includes(query) : false;
      const matchGamertag = j.gamertag ? j.gamertag.toLowerCase().includes(query) : false;
      return matchNombre || matchGamertag;
    });

    renderPlayersView(filtered);
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
      window.showToast('Todos los campos son obligatorios.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      window.showToast('Ingresa un correo electrónico válido.', 'error');
      return;
    }

    const existeGamertag = jugadores.some(j => j.gamertag.toLowerCase() === gamertag.toLowerCase());
    if (existeGamertag) {
      window.showToast('El Gamertag ya se encuentra registrado.', 'error');
      return;
    }

    let nuevoId = Date.now();

    try {
      const response = await fetch('http://localhost:3000/api/jugadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, gamertag, correo })
      });

      const resData = await response.json();

      if (!response.ok) {
        window.showToast(resData.error || 'Error al registrar jugador en el servidor.', 'error');
        return;
      }

      if (resData.id) {
        nuevoId = resData.id;
      }
    } catch (err) {}

    const nuevoJugador = {
      id: nuevoId,
      nombre,
      gamertag,
      correo,
      fecha_registro: new Date().toISOString()
    };

    jugadores.push(nuevoJugador);
    formJugador.reset();
    closeModal();
    window.showToast(`Jugador ${gamertag} registrado con éxito.`, 'success');
    renderAll();
  });

  formVideojuego?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreInput = document.getElementById('videojuego-nombre');
    const nombre = nombreInput?.value.trim() || '';

    let genero = selectGenero?.value || '';
    if (genero === 'otro') {
      genero = inputGeneroOtro?.value.trim() || '';
    }

    if (!nombre || !genero) {
      window.showToast('Nombre y género del videojuego son obligatorios.', 'error');
      return;
    }

    const existeVideojuego = videojuegos.some(v => v.nombre.toLowerCase() === nombre.toLowerCase());
    if (existeVideojuego) {
      window.showToast('Ya existe un videojuego registrado con ese nombre.', 'error');
      return;
    }

    const nuevoVideojuego = {
      id: Date.now(),
      nombre,
      genero
    };

    videojuegos.push(nuevoVideojuego);
    formVideojuego.reset();
    wrapperGeneroOtro?.classList.add('hidden');
    closeModal();
    window.showToast(`Videojuego ${nombre} registrado con éxito.`, 'success');
    renderAll();
  });

  formPuntuacion?.addEventListener('submit', (e) => {
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
      window.showToast('La puntuación no puede ser un número negativo.', 'error');
      return;
    }

    const jugador = jugadores.find(j => String(j.id) === String(jugadorId));
    const videojuego = videojuegos.find(v => String(v.id) === String(videojuegoId));

    if (!jugador || !videojuego) {
      window.showToast('El jugador o videojuego seleccionado no existe.', 'error');
      return;
    }

    const nuevaPuntuacion = {
      id: Date.now(),
      jugador_id: jugador.id,
      videojuego_id: videojuego.id,
      gamertag: jugador.gamertag,
      videojuego: videojuego.nombre,
      puntuacion: puntuacionNum,
      fecha: new Date().toISOString()
    };

    puntuaciones.push(nuevaPuntuacion);
    formPuntuacion.reset();
    closeModal();
    window.showToast(`Puntuación de ${puntuacionNum} para ${jugador.gamertag} guardada con éxito.`, 'success');
    renderAll();
  });

  window.showToast = function (message, type = 'info') {
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

  async function loadInitialData() {
    try {
      const res = await fetch('http://localhost:3000/api/jugadores');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          jugadores = data;
        }
      }
    } catch (err) {}
    renderAll();
  }

  loadInitialData();
});

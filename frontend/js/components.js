const Components = {
  renderPlayersTable(jugadores) {
    if (!jugadores || jugadores.length === 0) {
      return `
        <div class="empty-state">
          <i class="fa-solid fa-users-slash"></i>
          <p>No se encontraron jugadores registrados.</p>
        </div>
      `;
    }

    const rows = jugadores.map(j => `
      <tr>
        <td><strong>${j.gamertag}</strong></td>
        <td>${j.nombre}</td>
        <td>${j.correo}</td>
        <td><span class="date-badge">${j.fecha_registro ? j.fecha_registro.replace('T', ' ').substring(0, 16) : 'Reciente'}</span></td>
      </tr>
    `).join('');

    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>Gamertag</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  },

  renderRankingTable(rankingData, filterName = '') {
    if (!rankingData || rankingData.length === 0) {
      const emptyMessage = filterName
        ? `No hay puntuaciones registradas para ${filterName}.`
        : 'Aún no hay puntuaciones registradas en el torneo.';
      return `
        <div class="empty-state">
          <i class="fa-solid fa-trophy"></i>
          <p>${emptyMessage}</p>
        </div>
      `;
    }

    const rows = rankingData.map((item, index) => {
      const posicion = item.posicion !== undefined ? Number(item.posicion) : (index + 1);
      let posClass = 'rank-badge';
      if (posicion === 1) posClass += ' rank-1';
      else if (posicion === 2) posClass += ' rank-2';
      else if (posicion === 3) posClass += ' rank-3';

      const gamertag = item.jugador || item.gamertag || 'Desconocido';
      const juegoNombre = item.videojuego || 'Desconocido';
      const puntuacion = Number(item.puntuacion) || 0;

      return `
        <tr>
          <td><span class="${posClass}">${posicion}</span></td>
          <td><strong>${gamertag}</strong></td>
          <td>${juegoNombre}</td>
          <td><span class="score-value">${puntuacion.toLocaleString()}</span></td>
        </tr>
      `;
    }).join('');

    return `
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 80px;">Posición</th>
            <th>Jugador</th>
            <th>Videojuego</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  },

  renderStats(stats = {}) {
    const totalJugadores = stats.total_jugadores ?? 0;
    const totalVideojuegos = stats.total_videojuegos ?? 0;
    const totalPuntuaciones = stats.total_puntuaciones ?? 0;
    const promedioPuntuacion = stats.puntuacion_promedio ?? '0';

    return `
      <div class="stat-card">
        <div class="stat-icon-wrapper">
          <i class="fa-solid fa-users"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Total Jugadores</span>
          <strong class="stat-value">${totalJugadores}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper">
          <i class="fa-solid fa-gamepad"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Total Videojuegos</span>
          <strong class="stat-value">${totalVideojuegos}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper">
          <i class="fa-solid fa-award"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Puntuaciones Registradas</span>
          <strong class="stat-value">${totalPuntuaciones}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Puntuación Promedio</span>
          <strong class="stat-value">${promedioPuntuacion}</strong>
        </div>
      </div>
    `;
  }
};

window.Components = Components;

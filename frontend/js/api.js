/**
 * Servicio de comunicación con la API del Backend (MySQL)
 */
const API_BASE_URL = 'http://localhost:3000/api';

const API = {
  /**
   * Helper para manejar respuestas y errores HTTP/red
   */
  async _fetchJSON(endpoint, options = {}) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMsg = data.error || data.mensaje || `Error del servidor (${res.status})`;
        throw new Error(errorMsg);
      }

      return data;
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error('No hay conexión con el servidor. Verifica que el backend esté corriendo en http://localhost:3000');
      }
      throw err;
    }
  },

  // ----------------------------------------
  // Jugadores (RF01, RF04, RF07)
  // ----------------------------------------
  async getJugadores() {
    return this._fetchJSON('/jugadores');
  },

  async crearJugador(payload) {
    return this._fetchJSON('/jugadores', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async buscarJugadores(termino) {
    return this._fetchJSON(`/jugadores/buscar?q=${encodeURIComponent(termino)}`);
  },

  // ----------------------------------------
  // Videojuegos (RF02)
  // ----------------------------------------
  async getVideojuegos() {
    return this._fetchJSON('/videojuegos');
  },

  async crearVideojuego(payload) {
    return this._fetchJSON('/videojuegos', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // ----------------------------------------
  // Puntuaciones (RF03, RF05)
  // ----------------------------------------
  async crearPuntuacion(payload) {
    return this._fetchJSON('/puntuaciones', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // ----------------------------------------
  // Dashboard: Ranking y Estadísticas (RF06, RF08)
  // ----------------------------------------
  async getRanking() {
    return this._fetchJSON('/ranking');
  },

  async getEstadisticas() {
    return this._fetchJSON('/estadisticas');
  }
};

window.API = API;

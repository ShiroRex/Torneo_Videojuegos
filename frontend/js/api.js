const API_BASE_URL = 'http://localhost:3000/api';

const API = {
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
        throw new Error('No hay conexion con el servidor. Verifica que el backend este activo en http://localhost:3000');
      }
      throw err;
    }
  },

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

  async getVideojuegos() {
    return this._fetchJSON('/videojuegos');
  },

  async crearVideojuego(payload) {
    return this._fetchJSON('/videojuegos', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async crearPuntuacion(payload) {
    return this._fetchJSON('/puntuaciones', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async getRanking() {
    return this._fetchJSON('/ranking');
  },

  async getEstadisticas() {
    return this._fetchJSON('/estadisticas');
  }
};

window.API = API;

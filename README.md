# Sistema de torneo de videojuegos

## Requisitos Funcionales (RF)

*   **RF01 - Registrar Jugadores:** 
    *   El sistema maneja: ID, Nombre, Gamertag o Alias, Correo electrónico y Fecha de registro.
    *   *Reglas:* Nombre, Gamertag y correo son obligatorios; no se permiten Gamertags repetidos y el ID identifica de manera única a cada jugador.
*   **RF02 - Registrar Videojuegos:** 
    *   El sistema maneja: ID, Nombre y Género.
    *   *Reglas:* Nombre y género son obligatorios; no deben existir dos videojuegos con el mismo nombre.
*   **RF03 - Registrar Puntuaciones:** 
    *   El sistema maneja: Jugador, Videojuego, Puntuación y Fecha.
    *   *Reglas:* El jugador y el videojuego deben existir previamente; la puntuación no puede ser negativa; un jugador puede registrar múltiples puntuaciones y participar en diferentes videojuegos.
*   **RF04 - Consultar Jugadores:** 
    *   La aplicación muestra los jugadores registrados obteniendo la información directamente desde MySQL con el formato: `GAMERTAG | CORREO | FECHA DE REGISTRO`.
*   **RF05 - Registrar una Puntuación desde la Interfaz:** 
    *   Permite seleccionar un jugador y un videojuego existente, introducir la puntuación, guardarla y mostrar un mensaje de confirmación de éxito o error.
*   **RF06 - Mostrar Clasificación:** 
    *   El sistema muestra un ranking ordenado de mayor a menor puntuación bajo el formato: `POSICIÓN | JUGADOR | VIDEOJUEGO | PUNTUACIÓN`.
*   **RF07 - Buscar Jugadores:** 
    *   Permite buscar un jugador específico ingresando su Nombre o Gamertag y mostrando las coincidencias en pantalla.
*   **RF08 - Estadísticas:** 
    *   Calcula y muestra métricas clave desde MySQL: número total de jugadores, total de videojuegos, total de puntuaciones registradas y la puntuación promedio general.
 
## Tecnologías

*   **Frontend:** JavaScript, HTML, CSS.
*   **Backend:** Node.js.
*   **Base de Datos:** MySQL.

## Instrucciones de Clonación del proyecto.
### 1. Clonar el repositorio
* Usar la opción de GitHub y usaremos GitHub desktop.
* Clonamos el repositorio.
* Seleccionamos abrir con visual studio code
### 2. Abrir el proyecto en visual studio code
* Abrir una terminal
* Hacer un cd backend
* Hacer npm install
* Usar npm start para prender el back.
### 3. Frontend
* Abrir una nueva terminal
* Hacer un cd a frontend
* Hacer npm install
* Seleccionamos index.html y le damos abrir y nos llevará a la app.
### 4. Configurar Mysql Workbench 
* Abre MySQL Workbench
* Crea el esquema/base de datos para el proyecto (torneo_videojuegos)
* Pegamos el scrip de base de datos
* Insertamos datos de prueba incluidos en el script.
* Creamos un archivo .env dentro de backend y configuramos con nuestro usuario y contraseña.
### 5. Probar la aplicación 
* Una vez hecho eso podremos usar la app de torneo.

### Script 
*-- 1. Tabla de Jugadores 
*CREATE TABLE IF NOT EXISTS jugadores (
*  id int(11) NOT NULL AUTO_INCREMENT,
*  nombre varchar(100) NOT NULL,
*  gamertag varchar(50) NOT NULL,
*  correo varchar(100) NOT NULL,
*  fecha_registro datetime DEFAULT CURRENT_TIMESTAMP,
*  PRIMARY KEY (id),
*  UNIQUE KEY gamertag (gamertag)
*) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*
*-- 2. Tabla de Videojuegos 
*CREATE TABLE IF NOT EXISTS videojuegos (
*  id int(11) NOT NULL AUTO_INCREMENT,
*  nombre varchar(100) NOT NULL,
*  genero varchar(50) NOT NULL,
*  PRIMARY KEY (id),
*  UNIQUE KEY nombre (nombre)
*) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*
*-- 3. Tabla de Puntuaciones 
*CREATE TABLE IF NOT EXISTS puntuaciones (
*  id int(11) NOT NULL AUTO_INCREMENT,
*  jugador_id int(11) NOT NULL,
*  videojuego_id int(11) NOT NULL,
*  puntuacion int(11) NOT NULL,
*  fecha datetime DEFAULT CURRENT_TIMESTAMP,
*  PRIMARY KEY (id),
*  KEY jugador_id (jugador_id),
*  KEY videojuego_id (videojuego_id),
*  CONSTRAINT puntuaciones_ibfk_1 FOREIGN KEY (jugador_id) REFERENCES jugadores (id) ON DELETE CASCADE,
*  CONSTRAINT puntuaciones_ibfk_2 FOREIGN KEY (videojuego_id) REFERENCES videojuegos (id) ON DELETE CASCADE
*) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*
*-- ==========================================================
*-- DATOS PRUEBA
*-- ==========================================================
*
*-- Insertar Videojuegos iniciales
*INSERT INTO videojuegos (id, nombre, genero) VALUES
*  (1, 'League of Legends', 'MOBA'),
*  (2, 'Valorant', 'Shooter / FPS'),
*  (3, 'Street Fighter 6', 'Lucha / Fighting'),
*  (4, 'Rocket League', 'Deportes')
*ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
*
*-- Insertar Jugadores iniciales
*INSERT INTO jugadores (id, nombre, gamertag, correo) VALUES
*  (1, 'David Gallardo', 'Naked', 'gal@gmaia.com'),
*  (2, 'Carlos Mendoza', 'ShadowHunter', 'carlos@correo.com'),
*  (3, 'Valeria Rios', 'Valkyrie', 'valeria@correo.com'),
*  (4, 'Mateo Gomez', 'Nexus', 'mateo@correo.com'),
*  (5, 'Sofia Castro', 'Nova', 'sofia@correo.com')
*ON DUPLICATE KEY UPDATE gamertag = VALUES(gamertag);
*
*-- Insertar Puntuaciones iniciales para poblar Dashboard y Ranking
*INSERT INTO puntuaciones (id, jugador_id, videojuego_id, puntuacion) VALUES
*  (1, 1, 1, 15000),
*  (2, 2, 2, 18500),
*  (3, 3, 1, 14200),
*  (4, 4, 3, 9800),
*  (5, 5, 2, 21000),
*  (6, 1, 4, 12300),
*  (7, 2, 1, 16400)
*ON DUPLICATE KEY UPDATE puntuacion = VALUES(puntuacion);

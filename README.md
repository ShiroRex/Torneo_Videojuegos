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
* Abrir terminal y pon el comando:
* ```bash
*git clone [https://github.com/ShiroRex/Torneo_Videojuegos.git](https://github.com/ShiroRex/Torneo_Videojuegos.git)
cd Torneo_Videojuegos
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

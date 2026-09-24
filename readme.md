# NBA API

Archivo editorial de la NBA (Parcial 1 · Aplicaciones Híbridas). Express + MongoDB (driver nativo) con separación web / API.

## Requisitos

- Node.js 18+
- Una base de MongoDB Atlas accesible

## Instalación

```bash
npm install
cp config/db.example.js config/db.js
```

Completar `config/db.js` con la URI real de MongoDB Atlas. **Ese archivo está en `.gitignore` y no se sube a GitHub.**

## Ejecución

```bash
npm start      # node main.js
npm run dev    # nodemon main.js
```

El servidor queda en `http://localhost:3333`.

## Configuración

La conexión a MongoDB vive en `config/db.js` (`connectDB` / `getDB`); los services la consumen con `getDB()`.

- Base de datos: `AH20232CP1` (pedida en la consigna)
- Colecciones: `equipos`, `jugadores`, `partidos`

## Estructura

```
main.js                 # Express: static + urlencoded + json + rutas
page/
  utils.js              # createPage, componentes y formularios
  styles.js             # CSS propio (sin Bootstrap)
routes/                 # Rutas web  → controllers → views/services
controllers/            # Controllers web
views/                  # Vistas HTML dinámicas
api/
  routes/               # Rutas API  → controllers → services
  controllers/          # Controllers API (JSON)
services/               # Acceso a MongoDB + validación
data/                   # Datos estáticos (divisiones, leyendas)
public/                 # Archivos estáticos (vacío; GET / es dinámico)
```

Flujo: `Route → Controller → View/Service`.

## Menú (7 secciones)

`/` · `/equipos` · `/jugadores` · `/posiciones` · `/partidos` · `/estadisticas` · `/leyendas`

## ABM de equipos (web)

| Acción | Ruta |
|---|---|
| Listar | `GET /equipos` |
| Ver | `GET /equipos/:id` |
| Nuevo (form) | `GET /equipos/nuevo` |
| Crear | `POST /equipos/nuevo` |
| Editar (form) | `GET /equipos/editar/:id` |
| Reemplazar | `POST /equipos/editar/:id` |
| Confirmar borrado | `GET /equipos/borrar/:id` |
| Borrar (lógico) | `POST /equipos/borrar/:id` |

Mismo patrón para `/jugadores`.

## API REST (JSON)

### Equipos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/equipos` | Listar (filtros: `name`, `division`, `conference`, `city`, `page`, `limit`, `sort_by`, `sort_order`) |
| GET | `/api/equipos/:id` | Ver uno |
| POST | `/api/equipos` | Crear |
| PUT | `/api/equipos/:id` | Reemplazar |
| PATCH | `/api/equipos/:id` | Actualizar parcial |
| DELETE | `/api/equipos/:id` | Borrar (lógico) |
| GET | `/api/equipos/division/:division` | Por división |
| GET | `/api/equipos/conferencia/:conference` | Por conferencia |
| GET | `/api/equipos/:id/jugadores` | Jugadores del equipo |

### Jugadores

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/jugadores` | Listar (filtros: `name`, `position`, `equipo_id`, `page`, `limit`, `sort_by`, `sort_order`) |
| GET | `/api/jugadores/:id` | Ver uno |
| POST | `/api/jugadores` | Crear |
| PUT | `/api/jugadores/:id` | Reemplazar |
| PATCH | `/api/jugadores/:id` | Actualizar parcial |
| DELETE | `/api/jugadores/:id` | Borrar (lógico) |
| GET | `/api/jugadores/equipo/:equipoId` | Jugadores de un equipo |

### Secciones

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/standings` | Posiciones (`conference` opcional) |
| GET | `/api/estadisticas` | Líderes (`stat`: ppg, rpg, apg, spg, fgPct; `limit`) |
| GET | `/api/partidos` | Partidos (`status`, `date`, `order`) |
| GET | `/api/partidos/:id` | Ver un partido |

- La URL identifica el **recurso**, no la acción.
- Se usan verbos HTTP para la acción: `GET` obtener, `POST` crear, `PUT` reemplazar, `PATCH` actualizar, `DELETE` borrar.
- JSON como formato de intercambio de datos.
- Estados: `1xx` informativos, `2xx` OK, `3xx` redirección, `4xx` error del cliente, `5xx` error del servidor.

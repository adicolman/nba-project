# NBA API

Archivo editorial de la NBA (Parcial 1 · Aplicaciones Híbridas). Express + MongoDB.

## Requisitos

- Node.js 18+
- Una base de MongoDB Atlas accesible

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start      # node main.js
npm run dev    # nodemon main.js
```

El servidor queda en `http://localhost:3333`.

## Configuración

La conexión a MongoDB vive en `config/db.js` (`connectDB` / `getDB`); los services la consumen con `getDB()`.

- Base de datos: `AH20232CP1` 
- Colecciones: `equipos`, `jugadores`, `partidos`

## Estructura

```
main.js                 # Express: static + urlencoded + json + rutas
config/
  db.js                 # Conexión a MongoDB 
page/
  utils.js              # createPage, componentes y formularios
  styles.js             # CSS propio (se inyecta sobre Bootstrap CDN)
routes/                 # Rutas web  → controllers → views/services
controllers/            # Controllers web
views/                  # Vistas HTML dinámicas
api/
  routes/               # Rutas API  → controllers → services
  controllers/          # Controllers API (JSON)
services/               # Acceso a MongoDB + validación
data/                   # Datos estáticos (divisiones, leyendas)
public/                 # Archivos estáticos (sin index: GET / es dinámico)
```

Flujo: `Route → Controller → View/Service`.

## Menú (7 secciones)

| Ruta | Descripción |
|---|---|
| `/` | Inicio |
| `/equipos` | Directorio de equipos (`?conference=`, `?division=`, `?name=`) |
| `/equipos/nuevo` · `/equipos/editar/:id` · `/equipos/borrar/:id` | ABM de equipos |
| `/equipos/:id` | Detalle de equipo |
| `/divisiones/:division` | Equipos por división |
| `/jugadores` | Directorio de jugadores (`?position=`, `?equipo_id=`, `?name=`) |
| `/jugadores/nuevo` · `/jugadores/editar/:id` · `/jugadores/borrar/:id` | ABM de jugadores |
| `/jugadores/:id` | Detalle de jugador |
| `/posiciones` | Tabla de posiciones (`?conference=Eastern\|Western`) |
| `/partidos` | Calendario (`?status=programado\|final`) |
| `/estadisticas` | Líderes (`?stat=ppg\|rpg\|apg\|spg\|fgPct`) |
| `/leyendas` · `/leyendas/:nombre` | Leyendas y detalle |

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
| GET | `/api/equipos` | Listar (filtros: `name`, `division`, `conference`, `city`, `sort_by`, `sort_order`) |
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
| GET | `/api/jugadores` | Listar (filtros: `name`, `position`, `equipo_id`, `sort_by`, `sort_order`) |
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

## Estados de respuesta

| Código | Cuándo |
|---|---|
| `200` | `GET` correcto |
| `201` | `POST` creado |
| `202` | `PUT` / `PATCH` / `DELETE` aceptados |
| `400` | Cuerpo o campos inválidos (validación del service) |
| `404` | Recurso inexistente o `eliminado: true` |
| `500` | Error de servidor (MongoDB, inesperado) |

En la web, `page/utils.js` concentra las respuestas de error: `page404()`, `sendNotFound(res)` y `sendError(res, error)` (usa `error.status` si el service lo marcó con `400`).

## Borrado

Los equipos y jugadores usan **borrado lógico**: `DELETE` / `POST .../borrar/:id` marcan `eliminado: true`. El documento sigue en MongoDB pero desaparece de los listados, detalles y formularios (`eliminado: { $ne: true }` en todos los services).
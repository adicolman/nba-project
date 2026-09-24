import { Router } from "express"
import * as equipoController from "../controllers/equipos.controller.js"

const router = Router()

// Rutas específicas antes que /:id para evitar conflictos
router.get("/api/equipos/division/:division", equipoController.getEquiposByDivision)
router.get("/api/equipos/conferencia/:conference", equipoController.getEquiposByConference)
router.get("/api/equipos/:id/jugadores", equipoController.getJugadoresByEquipo)
router.get("/api/equipos", equipoController.getEquipos)
router.post("/api/equipos", equipoController.saveEquipo)
router.get("/api/equipos/:id", equipoController.getEquipoById)
router.put("/api/equipos/:id", equipoController.replaceEquipo)
router.patch("/api/equipos/:id", equipoController.updateEquipo)
router.delete("/api/equipos/:id", equipoController.deleteEquipo)

export default router

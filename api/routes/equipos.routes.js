import * as equipoController from "../controllers/equipos.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/equipos", equipoController.getEquipos)
router.get("/api/equipos/:id", equipoController.getEquipoById)
router.post("/api/equipos", equipoController.saveEquipo)
router.put("/api/equipos/:id", equipoController.replaceEquipo) // reemplazar
router.patch("/api/equipos/:id", equipoController.updateEquipo) // actualizar
router.delete("/api/equipos/:id", equipoController.deleteEquipo) // borrado lógico

router.get("/api/equipos/division/:division", equipoController.getEquiposByDivision)
router.get("/api/equipos/conferencia/:conference", equipoController.getEquiposByConference)
router.get("/api/equipos/:id/jugadores", equipoController.getJugadoresByEquipo)

export default router

import { Router } from "express"
import * as seccionesController from "../controllers/secciones.controller.js"

const router = Router()

router.get("/api/standings", seccionesController.getStandings)
router.get("/api/estadisticas", seccionesController.getEstadisticas)
router.get("/api/partidos", seccionesController.getPartidos)
router.get("/api/partidos/:id", seccionesController.getPartidoById)

export default router

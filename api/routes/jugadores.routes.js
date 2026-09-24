import { Router } from "express"
import * as jugadorController from "../controllers/jugadores.controller.js"

const router = Router()

// Rutas específicas antes que /:id para evitar conflictos
router.get("/api/jugadores/equipo/:equipoId", jugadorController.getJugadoresByEquipoId)
router.get("/api/jugadores", jugadorController.getJugadores)
router.post("/api/jugadores", jugadorController.saveJugador)
router.get("/api/jugadores/:id", jugadorController.getJugadorById)
router.put("/api/jugadores/:id", jugadorController.replaceJugador)
router.patch("/api/jugadores/:id", jugadorController.updateJugador)
router.delete("/api/jugadores/:id", jugadorController.deleteJugador)

export default router

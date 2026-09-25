import * as jugadorController from "../controllers/jugadores.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/jugadores", jugadorController.getJugadores)
router.get("/api/jugadores/:id", jugadorController.getJugadorById)
router.post("/api/jugadores", jugadorController.saveJugador)
router.put("/api/jugadores/:id", jugadorController.replaceJugador) // reemplazar
router.patch("/api/jugadores/:id", jugadorController.updateJugador) // actualizar
router.delete("/api/jugadores/:id", jugadorController.deleteJugador) // borrado lógico

router.get("/api/jugadores/equipo/:equipoId", jugadorController.getJugadoresByEquipoId)

export default router

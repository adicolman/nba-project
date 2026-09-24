import { Router } from "express"
import * as jugadorController from "../controllers/jugadores.controller.js"

const router = Router()

router.get("/jugadores", jugadorController.getJugadores)
router.get("/jugadores/nuevo", jugadorController.newJugadorForm)         // Route -> Controller -> View/Service
router.get("/jugadores/editar/:id", jugadorController.editJugadorForm)   // Route -> Controller -> View/Service
router.post("/jugadores/editar/:id", jugadorController.editJugador)      // Route -> Controller -> View/Service
router.get("/jugadores/borrar/:id", jugadorController.deleteJugadorForm) // Route -> Controller -> View/Service
router.post("/jugadores/borrar/:id", jugadorController.deleteJugador)    // Route -> Controller -> View/Service
router.post("/jugadores/nuevo", jugadorController.saveJugador)           // Route -> Controller -> View/Service
router.get("/jugadores/:id", jugadorController.getJugadorById)           // Route -> Controller -> View/Service

export default router

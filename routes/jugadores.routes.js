import * as jugadorController from "../controllers/jugadores.controller.js"
import { Router } from "express"

const router = Router()

router.get("/jugadores", jugadorController.getJugadores)
router.get("/jugadores/nuevo", jugadorController.newJugadorForm)        
router.get("/jugadores/editar/:id", jugadorController.editJugadorForm)   
router.post("/jugadores/editar/:id", jugadorController.editJugador)      
router.get("/jugadores/borrar/:id", jugadorController.deleteJugadorForm) 
router.post("/jugadores/borrar/:id", jugadorController.deleteJugador)    
router.post("/jugadores/nuevo", jugadorController.saveJugador)          
router.get("/jugadores/:id", jugadorController.getJugadorById)           

export default router

import * as equipoController from "../controllers/equipos.controller.js"
import { Router } from "express"

const router = Router()

router.get("/divisiones/:division", equipoController.getEquiposByDivision)
router.get("/equipos", equipoController.getEquipos)
router.get("/equipos/nuevo", equipoController.newEquipoForm)         
router.get("/equipos/editar/:id", equipoController.editEquipoForm)  
router.post("/equipos/editar/:id", equipoController.editEquipo)      
router.get("/equipos/borrar/:id", equipoController.deleteEquipoForm) 
router.post("/equipos/borrar/:id", equipoController.deleteEquipo)    
router.post("/equipos/nuevo", equipoController.saveEquipo)           
router.get("/equipos/:id", equipoController.getEquipoById)           

export default router

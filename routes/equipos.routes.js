import { Router } from "express"
import * as equipoController from "../controllers/equipos.controller.js"

const router = Router()

router.get("/", equipoController.home)
router.get("/divisiones/:division", equipoController.getEquiposByDivision)
router.get("/equipos", equipoController.getEquipos)
router.get("/equipos/nuevo", equipoController.newEquipoForm)         // Route -> Controller -> View/Service
router.get("/equipos/editar/:id", equipoController.editEquipoForm)   // Route -> Controller -> View/Service
router.post("/equipos/editar/:id", equipoController.editEquipo)      // Route -> Controller -> View/Service
router.get("/equipos/borrar/:id", equipoController.deleteEquipoForm) // Route -> Controller -> View/Service
router.post("/equipos/borrar/:id", equipoController.deleteEquipo)    // Route -> Controller -> View/Service
router.post("/equipos/nuevo", equipoController.saveEquipo)           // Route -> Controller -> View/Service
router.get("/equipos/:id", equipoController.getEquipoById)           // Route -> Controller -> View/Service

export default router

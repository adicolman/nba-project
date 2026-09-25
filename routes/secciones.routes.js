import * as seccionesController from "../controllers/secciones.controller.js"
import { Router } from "express"

const router = Router()

router.get("/", seccionesController.home)                           
router.get("/posiciones", seccionesController.posiciones)             
router.get("/partidos", seccionesController.partidos)                 
router.get("/estadisticas", seccionesController.estadisticas)         
router.get("/leyendas", seccionesController.leyendasList)             
router.get("/leyendas/:nombre", seccionesController.leyendaDetail)    

export default router

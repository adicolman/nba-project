import { Router } from "express"
import * as seccionesController from "../controllers/secciones.controller.js"

const router = Router()

router.get("/posiciones", seccionesController.posiciones)
router.get("/partidos", seccionesController.partidos)
router.get("/estadisticas", seccionesController.estadisticas)
router.get("/leyendas", seccionesController.leyendasList)
router.get("/leyendas/:nombre", seccionesController.leyendaDetail)

export default router

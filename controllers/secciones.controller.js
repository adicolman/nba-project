import * as equipoService from "../services/equipos.services.js"
import * as partidoService from "../services/partidos.services.js"
import * as seccionesView from "../views/secciones.views.js"
import { sendError, sendNotFound } from "../page/utils.js"
import { leyendas } from "../data/leyendas.js"

async function equiposMap() {
    const equipos = await equipoService.getEquipos()
    return new Map(equipos.filter(e => e._id).map(e => [String(e._id), e]))
}

export async function home(req, res) {
    try {
        const [equipos, standings, rpg, apg] = await Promise.all([
            equipoService.getEquipos(),
            equipoService.getStandings(),
            equipoService.getLeaders("rpg", 5),
            equipoService.getLeaders("apg", 5)
        ])
        res.send(seccionesView.homePage({ equipos, standings, rpg, apg, leyendas }))
    } catch (error) {
        sendError(res, error)
    }
}

export async function posiciones(req, res) {
    try {
        const conference = req.query.conference || ""
        const standings = await equipoService.getStandings(conference || null)
        res.send(seccionesView.posicionesPage(standings, conference))
    } catch (error) {
        sendError(res, error)
    }
}

export async function partidos(req, res) {
    try {
        const status = req.query.status || ""
        const filtros = { order: status === "programado" ? "asc" : "desc" }
        if (status) filtros.status = status
        const partidosDocs = await partidoService.getPartidos(filtros)
        const map = await equiposMap()
        res.send(seccionesView.partidosPage(partidosDocs, map, status))
    } catch (error) {
        sendError(res, error)
    }
}

export async function estadisticas(req, res) {
    try {
        const stat = req.query.stat || "ppg"
        const valido = ["ppg", "rpg", "apg", "spg", "fgPct"].includes(stat) ? stat : "ppg"
        const lideres = await equipoService.getLeaders(valido, 10)
        const map = await equiposMap()
        res.send(seccionesView.estadisticasPage(lideres, valido, map))
    } catch (error) {
        sendError(res, error)
    }
}

export function leyendasList(req, res) {
    try {
        res.send(seccionesView.leyendasPage())
    } catch (error) {
        sendError(res, error)
    }
}

export function leyendaDetail(req, res) {
    try {
        const nombre = req.params?.nombre
        const leyenda = leyendas.find(l => l.name === nombre)
        if (!leyenda) return sendNotFound(res)
        res.send(seccionesView.leyendaDetail(leyenda))
    } catch (error) {
        sendError(res, error)
    }
}

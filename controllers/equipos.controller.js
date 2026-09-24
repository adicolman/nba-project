import * as equipoService from "../services/equipos.services.js"
import * as jugadorService from "../services/jugadores.services.js"
import * as partidoService from "../services/partidos.services.js"
import * as equipoView from "../views/equipos.views.js"
import { leyendas } from "../data/leyendas.js"

export async function home(req, res) {
    try {
        const [equipos, standings, proximos, recientes, ppg, rpg, apg] = await Promise.all([
            equipoService.getEquipos({ limit: 12 }),
            equipoService.getStandings(),
            partidoService.getPartidos({ status: "programado", order: "asc" }),
            partidoService.getPartidos({ status: "final", order: "desc" }),
            equipoService.getLeaders("ppg", 5),
            equipoService.getLeaders("rpg", 5),
            equipoService.getLeaders("apg", 5)
        ])
        res.send(equipoView.homePage({ equipos, standings, proximos, recientes, ppg, rpg, apg, leyendas }))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function getEquiposByDivision(req, res) {
    try {
        const division = req.params.division
        const equipos = await equipoService.getEquiposByDivision(division)
        res.send(equipoView.divisionPage(division, equipos))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function getEquipos(req, res) {
    try {
        const filtros = { ...req.query }
        if (!filtros.limit) filtros.limit = 24
        const equipos = await equipoService.getEquipos(filtros)
        res.send(equipoView.equipoList(equipos, filtros))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function getEquipoById(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.getEquipoById(id)
        if (!equipo) return res.send(equipoView.page404())
        const jugadores = await jugadorService.getJugadoresByEquipoId(equipo._id.toString())
        res.send(equipoView.equipoDetail(equipo, jugadores))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export function newEquipoForm(req, res) {
    try {
        res.send(equipoView.newEquipoForm())
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function editEquipoForm(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.getEquipoById(id)
        if (!equipo) return res.send(equipoView.page404())
        res.send(equipoView.editEquipoForm(equipo))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function saveEquipo(req, res) {
    try {
        const equipo = await equipoService.saveEquipo(req.body)
        res.send(equipoView.equipoDetail(equipo, []))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function editEquipo(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.replaceEquipo(id, req.body)
        const jugadores = await jugadorService.getJugadoresByEquipoId(id)
        res.send(equipoView.equipoDetail(equipo, jugadores))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function deleteEquipoForm(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.getEquipoById(id)
        if (!equipo) return res.send(equipoView.page404())
        res.send(equipoView.deleteEquipoForm(equipo))
    } catch (error) {
        res.send(equipoView.page404())
    }
}

export async function deleteEquipo(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.deleteEquipo(id)
        res.send(equipoView.equipoDetail(equipo, []))
    } catch (error) {
        res.send(equipoView.page404())
    }
}
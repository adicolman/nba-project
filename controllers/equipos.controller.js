import * as equipoService from "../services/equipos.services.js"
import * as jugadorService from "../services/jugadores.services.js"
import * as equipoView from "../views/equipos.views.js"
import { sendError, sendNotFound } from "../page/utils.js"

export async function getEquiposByDivision(req, res) {
    try {
        const division = req.params.division
        const equipos = await equipoService.getEquiposByDivision(division)
        res.send(equipoView.divisionPage(division, equipos))
    } catch (error) {
        sendError(res, error)
    }
}

export async function getEquipos(req, res) {
    try {
        const filtros = { ...req.query }
        const equipos = await equipoService.getEquipos(filtros)
        res.send(equipoView.equipoList(equipos, filtros))
    } catch (error) {
        sendError(res, error)
    }
}

export async function getEquipoById(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.getEquipoById(id)
        if (!equipo) return sendNotFound(res)
        const jugadores = await jugadorService.getJugadoresByEquipoId(equipo._id.toString())
        res.send(equipoView.equipoDetail(equipo, jugadores))
    } catch (error) {
        sendError(res, error)
    }
}

export function newEquipoForm(req, res) {
    try {
        res.send(equipoView.newEquipoForm())
    } catch (error) {
        sendError(res, error)
    }
}

export async function editEquipoForm(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.getEquipoById(id)
        if (!equipo) return sendNotFound(res)
        res.send(equipoView.editEquipoForm(equipo))
    } catch (error) {
        sendError(res, error)
    }
}

export async function saveEquipo(req, res) {
    try {
        const equipo = await equipoService.saveEquipo(req.body)
        res.send(equipoView.equipoDetail(equipo, []))
    } catch (error) {
        sendError(res, error)
    }
}

export async function editEquipo(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.editEquipo(id, req.body)
        if (!equipo) return sendNotFound(res)
        const jugadores = await jugadorService.getJugadoresByEquipoId(equipo._id.toString())
        res.send(equipoView.equipoDetail(equipo, jugadores))
    } catch (error) {
        sendError(res, error)
    }
}

export async function deleteEquipoForm(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.getEquipoById(id)
        if (!equipo) return sendNotFound(res)
        res.send(equipoView.deleteEquipoForm(equipo))
    } catch (error) {
        sendError(res, error)
    }
}

export async function deleteEquipo(req, res) {
    try {
        const id = req.params?.id
        const equipo = await equipoService.deleteEquipoLogico(id)
        if (!equipo) return sendNotFound(res)
        return res.redirect(303, "/equipos")
    } catch (error) {
        sendError(res, error)
    }
}

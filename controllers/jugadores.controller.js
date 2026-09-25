import * as jugadorService from "../services/jugadores.services.js"
import * as equipoService from "../services/equipos.services.js"
import * as jugadorView from "../views/jugadores.views.js"
import { sendError, sendNotFound } from "../page/utils.js"

export async function getJugadores(req, res) {
    try {
        const filtros = { ...req.query }
        const jugadores = await jugadorService.getJugadores(filtros)
        const equipos = await equipoService.getEquipos()
        res.send(jugadorView.jugadorList(jugadores, filtros, equipos))
    } catch (error) {
        sendError(res, error)
    }
}

export async function getJugadorById(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.getJugadorById(id)
        if (!jugador) return sendNotFound(res)
        const equipo = jugador.equipo_id ? await equipoService.getEquipoById(jugador.equipo_id) : null
        res.send(jugadorView.jugadorDetail(jugador, equipo))
    } catch (error) {
        sendError(res, error)
    }
}

export async function newJugadorForm(req, res) {
    try {
        const equipos = await equipoService.getEquipos()
        res.send(jugadorView.newJugadorForm(equipos))
    } catch (error) {
        sendError(res, error)
    }
}

export async function editJugadorForm(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.getJugadorById(id)
        if (!jugador) return sendNotFound(res)
        const equipos = await equipoService.getEquipos()
        res.send(jugadorView.editJugadorForm(jugador, equipos))
    } catch (error) {
        sendError(res, error)
    }
}

export async function saveJugador(req, res) {
    try {
        const jugador = await jugadorService.saveJugador(req.body)
        const equipo = jugador.equipo_id ? await equipoService.getEquipoById(jugador.equipo_id) : null
        res.send(jugadorView.jugadorDetail(jugador, equipo))
    } catch (error) {
        sendError(res, error)
    }
}

export async function editJugador(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.editJugador(id, req.body)
        if (!jugador) return sendNotFound(res)
        const equipo = jugador.equipo_id ? await equipoService.getEquipoById(jugador.equipo_id) : null
        res.send(jugadorView.jugadorDetail(jugador, equipo))
    } catch (error) {
        sendError(res, error)
    }
}

export async function deleteJugadorForm(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.getJugadorById(id)
        if (!jugador) return sendNotFound(res)
        res.send(jugadorView.deleteJugadorForm(jugador))
    } catch (error) {
        sendError(res, error)
    }
}

export async function deleteJugador(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.deleteJugadorLogico(id)
        if (!jugador) return sendNotFound(res)
        return res.redirect(303, "/jugadores")
    } catch (error) {
        sendError(res, error)
    }
}

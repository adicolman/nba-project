import * as jugadorService from "../services/jugadores.services.js"
import * as equipoService from "../services/equipos.services.js"
import * as jugadorView from "../views/jugadores.views.js"

export async function getJugadores(req, res) {
    try {
        const filtros = { ...req.query }
        if (!filtros.limit) filtros.limit = 24
        const jugadores = await jugadorService.getJugadores(filtros)
        const equipos = await equipoService.getEquipos({ limit: 100 })
        res.send(jugadorView.jugadorList(jugadores, filtros, equipos))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}

export async function getJugadorById(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.getJugadorById(id)
        if (!jugador) return res.send(jugadorView.page404())
        const equipo = jugador.equipo_id ? await equipoService.getEquipoById(jugador.equipo_id) : null
        res.send(jugadorView.jugadorDetail(jugador, equipo))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}

export async function newJugadorForm(req, res) {
    try {
        const equipos = await equipoService.getEquipos({ limit: 100 })
        res.send(jugadorView.newJugadorForm(equipos))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}

export async function editJugadorForm(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.getJugadorById(id)
        if (!jugador) return res.send(jugadorView.page404())
        const equipos = await equipoService.getEquipos({ limit: 100 })
        res.send(jugadorView.editJugadorForm(jugador, equipos))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}

export async function saveJugador(req, res) {
    try {
        const jugador = await jugadorService.saveJugador(req.body)
        const equipo = jugador.equipo_id ? await equipoService.getEquipoById(jugador.equipo_id) : null
        res.send(jugadorView.jugadorDetail(jugador, equipo))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}

export async function editJugador(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.replaceJugador(id, req.body)
        const equipo = jugador.equipo_id ? await equipoService.getEquipoById(jugador.equipo_id) : null
        res.send(jugadorView.jugadorDetail(jugador, equipo))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}

export async function deleteJugadorForm(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.getJugadorById(id)
        if (!jugador) return res.send(jugadorView.page404())
        res.send(jugadorView.deleteJugadorForm(jugador))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}

export async function deleteJugador(req, res) {
    try {
        const id = req.params?.id
        const jugador = await jugadorService.deleteJugador(id)
        const equipo = jugador?.equipo_id ? await equipoService.getEquipoById(jugador.equipo_id) : null
        res.send(jugadorView.jugadorDetail(jugador, equipo))
    } catch (error) {
        res.send(jugadorView.page404())
    }
}
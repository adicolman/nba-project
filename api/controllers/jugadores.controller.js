import * as jugadorService from "../../services/jugadores.services.js"

export async function getJugadores(req, res) {
    try {
        const filtros = req.query
        const jugadores = await jugadorService.getJugadores(filtros)
        res.status(200).json(jugadores)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function getJugadorById(req, res) {
    try {
        const id = req.params.id
        const jugador = await jugadorService.getJugadorById(id)
        if (!jugador) return res.status(404).json({ message: "Jugador no encontrado" })
        res.status(200).json(jugador)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function saveJugador(req, res) {
    try {
        const jugador = await jugadorService.saveJugador(req.body)
        res.status(201).json(jugador)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function replaceJugador(req, res) {
    try {
        const id = req.params.id
        const jugador = await jugadorService.editJugador(id, req.body)
        if (!jugador) return res.status(404).json({ message: "Jugador no encontrado" })
        res.status(202).json(jugador)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function updateJugador(req, res) {
    try {
        const id = req.params.id
        const jugador = await jugadorService.updateJugador(id, req.body)
        if (!jugador) return res.status(404).json({ message: "Jugador no encontrado" })
        res.status(202).json(jugador)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function deleteJugador(req, res) {
    try {
        const id = req.params.id
        const jugador = await jugadorService.deleteJugadorLogico(id)
        if (!jugador) return res.status(404).json({ message: "Jugador no encontrado" })
        res.status(202).json(jugador)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function getJugadoresByEquipoId(req, res) {
    try {
        const equipoId = req.params.equipoId
        const jugadores = await jugadorService.getJugadoresByEquipoId(equipoId)
        res.status(200).json(jugadores)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}
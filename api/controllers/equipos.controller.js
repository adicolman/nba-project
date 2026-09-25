import * as equipoService from "../../services/equipos.services.js"
import * as jugadorService from "../../services/jugadores.services.js"

export async function getEquipos(req, res) {
    try {
        const filtros = req.query
        const equipos = await equipoService.getEquipos(filtros)
        res.status(200).json(equipos)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function getEquipoById(req, res) {
    try {
        const id = req.params.id
        const equipo = await equipoService.getEquipoById(id)
        if (!equipo) return res.status(404).json({ message: "Equipo no encontrado" })
        res.status(200).json(equipo)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function saveEquipo(req, res) {
    try {
        const equipo = await equipoService.saveEquipo(req.body)
        res.status(201).json(equipo)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function replaceEquipo(req, res) {
    try {
        const id = req.params.id
        const equipo = await equipoService.editEquipo(id, req.body)
        if (!equipo) return res.status(404).json({ message: "Equipo no encontrado" })
        res.status(202).json(equipo)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function updateEquipo(req, res) {
    try {
        const id = req.params.id
        const equipo = await equipoService.updateEquipo(id, req.body)
        if (!equipo) return res.status(404).json({ message: "Equipo no encontrado" })
        res.status(202).json(equipo)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function deleteEquipo(req, res) {
    try {
        const id = req.params.id
        const equipo = await equipoService.deleteEquipoLogico(id)
        if (!equipo) return res.status(404).json({ message: "Equipo no encontrado" })
        res.status(202).json(equipo)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function getEquiposByDivision(req, res) {
    try {
        const division = req.params.division
        const equipos = await equipoService.getEquiposByDivision(division)
        res.status(200).json(equipos)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function getEquiposByConference(req, res) {
    try {
        const conference = req.params.conference
        const equipos = await equipoService.getEquiposByConference(conference)
        res.status(200).json(equipos)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}

export async function getJugadoresByEquipo(req, res) {
    try {
        const id = req.params.id
        const jugadores = await jugadorService.getJugadoresByEquipoId(id)
        res.status(200).json(jugadores)
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message })
    }
}
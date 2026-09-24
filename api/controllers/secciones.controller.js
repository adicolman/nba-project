import * as equipoService from "../../services/equipos.services.js"
import * as partidoService from "../../services/partidos.services.js"

export async function getStandings(req, res) {
    try {
        const standings = await equipoService.getStandings(req.query.conference || null)
        res.status(200).json(standings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getEstadisticas(req, res) {
    try {
        const stat = ["ppg", "rpg", "apg", "spg", "fgPct"].includes(req.query.stat) ? req.query.stat : "ppg"
        const limit = parseInt(req.query.limit) || 10
        const lideres = await equipoService.getLeaders(stat, limit)
        res.status(200).json(lideres)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPartidos(req, res) {
    try {
        const partidos = await partidoService.getPartidos(req.query)
        res.status(200).json(partidos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPartidoById(req, res) {
    try {
        const partido = await partidoService.getPartidoById(req.params.id)
        if (!partido) return res.status(404).json({ message: "Partido no encontrado" })
        res.status(200).json(partido)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

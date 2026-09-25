import { ObjectId } from "mongodb"
import { getDB } from "../config/db.js"
import { divisiones } from "../data/divisiones.js"

const db = getDB()  // Conexión centralizada en config/db.js

function toObjectId(id) {
    if (id === undefined || id === null || !ObjectId.isValid(String(id))) return null
    return new ObjectId(String(id))
}

// Error de validación -> 4xx en la API (errores del cliente)
function invalido(message) {
    const error = new Error(message)
    error.status = 400
    return error
}

// Solo se guardan los campos permitidos; parcial = true omite los obligatorios (PATCH)
function equipoValido(equipo, parcial = false) {
    if (!equipo || typeof equipo !== "object") throw invalido("El cuerpo de la petición no es válido")

    if (!parcial) {
        if (!equipo.name) throw invalido("Falta el campo obligatorio: name")
        if (!equipo.city) throw invalido("Falta el campo obligatorio: city")
        if (!equipo.logo) throw invalido("Falta el campo obligatorio: logo")
        if (!equipo.description) throw invalido("Falta el campo obligatorio: description")
        if (!equipo.arena) throw invalido("Falta el campo obligatorio: arena")
        if (!equipo.conference) throw invalido("Falta el campo obligatorio: conference")
        if (!equipo.division) throw invalido("Falta el campo obligatorio: division")
        if (!equipo.website) throw invalido("Falta el campo obligatorio: website")
        if (equipo.founded === undefined || isNaN(equipo.founded)) throw invalido("Falta el campo obligatorio: founded")
        if (equipo.championships === undefined || isNaN(equipo.championships)) throw invalido("Falta el campo obligatorio: championships")
    }

    const documento = {}
    if (typeof equipo.name === "string") documento.name = equipo.name
    if (typeof equipo.city === "string") documento.city = equipo.city
    if (typeof equipo.logo === "string") documento.logo = equipo.logo
    if (typeof equipo.description === "string") documento.description = equipo.description
    if (typeof equipo.arena === "string") documento.arena = equipo.arena
    if (typeof equipo.conference === "string") documento.conference = equipo.conference
    if (typeof equipo.division === "string") documento.division = equipo.division
    if (typeof equipo.website === "string") documento.website = equipo.website
    if (equipo.founded !== undefined && !isNaN(equipo.founded)) documento.founded = parseInt(equipo.founded)
    if (equipo.championships !== undefined && !isNaN(equipo.championships)) documento.championships = parseInt(equipo.championships)
    if (equipo.wins !== undefined && !isNaN(equipo.wins)) documento.wins = parseInt(equipo.wins)
    if (equipo.losses !== undefined && !isNaN(equipo.losses)) documento.losses = parseInt(equipo.losses)
    if (typeof equipo.color === "string") documento.color = equipo.color

    if (typeof documento.conference === "string" && !["Eastern", "Western"].includes(documento.conference)) {
        throw invalido("La conferencia debe ser Eastern o Western")
    }
    if (typeof documento.division === "string" && !divisiones.some(d => d.name === documento.division)) {
        throw invalido("La división no es válida")
    }

    return documento
}

export async function getEquipos(filtros = {}) {
    const filter = { eliminado: { $ne: true } }

    const sortBy = filtros.sort_by || "name"
    const sortOrder = filtros.sort_order === "asc" ? 1 : -1
    const orderOptions = { [sortBy]: sortOrder }

    if (filtros?.division) filter.division = { $eq: filtros.division }
    if (filtros?.conference) filter.conference = { $eq: filtros.conference }
    if (filtros?.city) filter.city = { $eq: filtros.city }
    if (filtros?.name) filter.$text = { $search: filtros.name }

    const equipos = await db.collection("equipos")
        .find(filter)
        .sort(orderOptions)
        .toArray()

    return equipos
}

export async function getEquipoById(id) {
    const _id = toObjectId(id)
    if (!_id) return null
    const equipo = await db.collection("equipos").findOne({ _id, eliminado: { $ne: true } })
    return equipo
}

export async function saveEquipo(equipo) {
    const documento = equipoValido(equipo)
    const resultado = await db.collection("equipos").insertOne(documento)
    return { ...documento, _id: resultado.insertedId }
}

export async function editEquipo(id, equipo) {
    const _id = toObjectId(id)
    if (!_id) return null

    const documento = equipoValido(equipo)
    const resultado = await db.collection("equipos").replaceOne(
        { _id, eliminado: { $ne: true } }, documento
    )
    if (!resultado.matchedCount) return null

    return { ...documento, _id }
}

export async function updateEquipo(id, equipo) {
    const _id = toObjectId(id)
    if (!_id) return null

    const documento = equipoValido(equipo, true)
    const resultado = await db.collection("equipos").updateOne(
        { _id, eliminado: { $ne: true } }, { $set: documento }
    )
    if (!resultado.matchedCount) return null

    return documento
}

export async function deleteEquipoLogico(id) {
    const _id = toObjectId(id)
    if (!_id) return null

    // Borrado lógico atómico: el documento deja de formar parte de las consultas activas.
    return await db.collection("equipos").findOneAndUpdate(
        { _id, eliminado: { $ne: true } },
        { $set: { eliminado: true } },
        { returnDocument: "after" }
    )
}

export async function getEquiposByDivision(division) {
    const equipos = await db.collection("equipos")
        .find({ division: division, eliminado: { $ne: true } })
        .toArray()
    return equipos
}

export async function getEquiposByConference(conference) {
    const equipos = await db.collection("equipos")
        .find({ conference: conference, eliminado: { $ne: true } })
        .toArray()
    return equipos
}

export async function getStandings(conference = null) {
    const filter = { eliminado: { $ne: true } }
    if (conference) filter.conference = conference

    const equipos = await db.collection("equipos").find(filter).toArray()

    const conBalance = equipos.map(e => {
        const wins = e.wins ?? 0
        const losses = e.losses ?? 0
        const games = wins + losses
        return {
            ...e,
            wins,
            losses,
            games,
            pct: games > 0 ? wins / games : 0
        }
    })

    conBalance.sort((a, b) => b.pct - a.pct || b.wins - a.wins)
    conBalance.forEach((e, i) => { e.rank = i + 1 })

    return conBalance
}

export async function getLeaders(stat = "ppg", limit = 10) {
    const jugadores = await db.collection("jugadores")
        .find({ eliminado: { $ne: true }, [`stats.${stat}`]: { $exists: true } })
        .sort({ [`stats.${stat}`]: -1 })
        .limit(limit)
        .toArray()
    return jugadores
}
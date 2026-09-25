import { ObjectId } from "mongodb"
import { getDB } from "../config/db.js"
import { posiciones } from "../data/divisiones.js"

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
function jugadorValido(jugador, parcial = false) {
    if (!jugador || typeof jugador !== "object") throw invalido("El cuerpo de la petición no es válido")

    if (!parcial) {
        if (!jugador.name) throw invalido("Falta el campo obligatorio: name")
        if (!jugador.foto) throw invalido("Falta el campo obligatorio: foto")
        if (!jugador.description) throw invalido("Falta el campo obligatorio: description")
        if (jugador.number === undefined || isNaN(jugador.number)) throw invalido("Falta el campo obligatorio: number")
        if (!jugador.position) throw invalido("Falta el campo obligatorio: position")
        if (!jugador.equipo_id) throw invalido("Falta el campo obligatorio: equipo_id")
        if (!jugador.nationality) throw invalido("Falta el campo obligatorio: nationality")
        if (jugador.height === undefined || isNaN(jugador.height)) throw invalido("Falta el campo obligatorio: height")
    }

    const documento = {}
    if (typeof jugador.name === "string") documento.name = jugador.name
    if (typeof jugador.foto === "string") documento.foto = jugador.foto
    if (typeof jugador.description === "string") documento.description = jugador.description
    if (jugador.number !== undefined && !isNaN(jugador.number)) documento.number = parseInt(jugador.number)
    if (typeof jugador.position === "string" && posiciones.includes(jugador.position)) documento.position = jugador.position
    if (jugador.equipo_id) documento.equipo_id = jugador.equipo_id
    if (typeof jugador.nationality === "string") documento.nationality = jugador.nationality
    if (jugador.height !== undefined && !isNaN(jugador.height)) documento.height = parseInt(jugador.height)

    const statsIn = jugador.stats && typeof jugador.stats === "object" ? jugador.stats : {
        ppg: jugador.ppg, rpg: jugador.rpg, apg: jugador.apg, spg: jugador.spg, fgPct: jugador.fgPct
    }
    const stats = {}
    for (const key of ["ppg", "rpg", "apg", "spg", "fgPct"]) {
        if (statsIn[key] !== undefined && statsIn[key] !== "" && !isNaN(statsIn[key])) stats[key] = parseFloat(statsIn[key])
    }
    if (Object.keys(stats).length) documento.stats = stats

    return documento
}

export async function getJugadores(filtros = {}) {
    const filter = { eliminado: { $ne: true } }

    const sortBy = filtros.sort_by || "name"
    const sortOrder = filtros.sort_order === "asc" ? 1 : -1
    const orderOptions = { [sortBy]: sortOrder }

    if (filtros?.equipo_id) filter.equipo_id = { $eq: filtros.equipo_id }
    if (filtros?.position) filter.position = { $eq: filtros.position }
    if (filtros?.name) filter.$text = { $search: filtros.name }

    const jugadores = await db.collection("jugadores")
        .find(filter)
        .sort(orderOptions)
        .toArray()

    return jugadores
}

export async function getJugadorById(id) {
    const _id = toObjectId(id)
    if (!_id) return null
    const jugador = await db.collection("jugadores").findOne({ _id, eliminado: { $ne: true } })
    return jugador
}

export async function saveJugador(jugador) {
    const documento = jugadorValido(jugador)
    const resultado = await db.collection("jugadores").insertOne(documento)
    return { ...documento, _id: resultado.insertedId }
}

export async function editJugador(id, jugador) {
    const _id = toObjectId(id)
    if (!_id) return null

    const documento = jugadorValido(jugador)
    const resultado = await db.collection("jugadores").replaceOne(
        { _id, eliminado: { $ne: true } }, documento
    )
    if (!resultado.matchedCount) return null

    return { ...documento, _id }
}

export async function updateJugador(id, jugador) {
    const _id = toObjectId(id)
    if (!_id) return null

    const documento = jugadorValido(jugador, true)
    const resultado = await db.collection("jugadores").updateOne(
        { _id, eliminado: { $ne: true } }, { $set: documento }
    )
    if (!resultado.matchedCount) return null

    return documento
}

export async function deleteJugadorLogico(id) {
    const _id = toObjectId(id)
    if (!_id) return null

    return await db.collection("jugadores").findOneAndUpdate(
        { _id, eliminado: { $ne: true } },
        { $set: { eliminado: true } },
        { returnDocument: "after" }
    )
}

export async function getJugadoresByEquipoId(equipoId) {
    const jugadores = await db.collection("jugadores")
        .find({ equipo_id: equipoId, eliminado: { $ne: true } })
        .toArray()
    return jugadores
}
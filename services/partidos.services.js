import { ObjectId } from "mongodb"
import { getDB } from "../config/db.js"

const db = getDB()  // Conexión centralizada en config/db.js

export async function getPartidos(filtros = {}) {
    const filter = {}
    if (filtros?.status) filter.status = { $eq: filtros.status }
    if (filtros?.date) filter.date = { $eq: filtros.date }

    const orden = filtros?.order === "asc" ? 1 : -1
    const partidos = await db.collection("partidos")
        .find(filter)
        .sort({ date: orden })
        .toArray()
    return partidos
}

export async function getPartidoById(id) {
    const partido = await db.collection("partidos").findOne({ _id: new ObjectId(id) })
    return partido
}
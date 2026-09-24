export const divisiones = [
    { name: "Atlantic",  abbr: "ATL", conference: "Eastern", color: "#0F766E" },
    { name: "Central",   abbr: "CEN", conference: "Eastern", color: "#B45309" },
    { name: "Southeast", abbr: "SE",  conference: "Eastern", color: "#9F1239" },
    { name: "Northwest", abbr: "NW",  conference: "Western", color: "#4F46E5" },
    { name: "Pacific",   abbr: "PAC", conference: "Western", color: "#0369A1" },
    { name: "Southwest", abbr: "SW",  conference: "Western", color: "#7E22CE" }
]

export const conferencias = [
    { name: "Eastern", divisiones: divisiones.filter(d => d.conference === "Eastern") },
    { name: "Western", divisiones: divisiones.filter(d => d.conference === "Western") }
]

export function divisionInfo(name) {
    return divisiones.find(d => d.name === name) || null
}

export const posiciones = ["Base", "Escolta", "Alero", "Ala-Pívot", "Pívot"]
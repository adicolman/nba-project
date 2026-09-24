import { createPage, pageHead, emptyState, sectionHead, standingsTable, leaderCards, fixturesList, legendCard, tabs } from "../page/utils.js"
import { leyendas } from "../data/leyendas.js"

export function posicionesPage(standings, conference = "") {
    const confTabs = [
        { href: "/posiciones", value: "", label: "Todas" },
        { href: "/posiciones?conference=Eastern", value: "Eastern", label: "Eastern" },
        { href: "/posiciones?conference=Western", value: "Western", label: "Western" }
    ]
    return createPage("Posiciones", `
        ${pageHead("Posiciones", "Balance de la temporada ordenado por porcentaje de victorias.")}
        <section class="section section-dark">
            <div class="container">
                ${tabs(confTabs, conference, { dark: true })}
                ${standingsTable(standings, { dark: true, showDivision: true })}
            </div>
        </section>`, "/posiciones")
}

export function partidosPage(partidos, equiposMap, status = "") {
    const statusTabs = [
        { href: "/partidos", value: "", label: "Todos" },
        { href: "/partidos?status=programado", value: "programado", label: "Programados" },
        { href: "/partidos?status=final", value: "final", label: "Finalizados" }
    ]
    return createPage("Partidos", `
        ${pageHead("Partidos", "Calendario y resultados de la temporada.")}
        <section class="section">
            <div class="container">
                ${tabs(statusTabs, status)}
                ${partidos.length ? fixturesList(partidos, equiposMap) : emptyState("Sin partidos", "No hay partidos con ese estado.")}
            </div>
        </section>`, "/partidos")
}

export function estadisticasPage(lideres, stat = "ppg", equiposMap) {
    const labels = { ppg: "Puntos por partido", rpg: "Rebotes por partido", apg: "Asistencias por partido", spg: "Robos por partido", fgPct: "% de tiros de campo" }
    const statTabs = Object.keys(labels).map(k => ({
        href: `/estadisticas?stat=${k}`,
        value: k,
        label: labels[k]
    }))
    return createPage("Estadísticas", `
        ${pageHead("Estadísticas", "Líderes de la liga por categoría.")}
        <section class="section section-dark">
            <div class="container">
                ${tabs(statTabs, stat, { dark: true })}
                <div class="leaders-grid">
                    ${leaderCards(lideres, stat, labels[stat] ?? stat, equiposMap)}
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                ${sectionHead("Tabla de posiciones", { kicker: "Contexto de liga", link: "/posiciones", linkLabel: "Ver completa" })}
                <p class="muted">Los promedios individuales se leen mejor con el balance colectivo: revisá cómo viene cada franquicia en la tabla.</p>
                <a class="btn btn-outline" href="/posiciones">Ir a posiciones</a>
            </div>
        </section>`, "/estadisticas")
}

export function leyendasPage() {
    return createPage("Leyendas", `
        ${pageHead("NBA Legends", "Siete figuras que definieron la historia de la liga.")}
        <section class="section">
            <div class="container">
                <div class="row g-4">
                    ${leyendas.map(l => `<div class="col-12 col-sm-6 col-lg-3">${legendCard(l)}</div>`).join("")}
                </div>
            </div>
        </section>`, "/leyendas")
}

export function leyendaDetail(leyenda) {
    return createPage(leyenda.name, `
        <section class="player-hero">
            <div class="player-hero-photo">
                <span class="ph-number">${leyenda.numero}</span>
                <img src="${leyenda.foto}" alt="${leyenda.name}">
            </div>
            <div class="player-hero-info">
                <a class="ph-team" href="/leyendas">NBA Legends</a>
                <h1>${leyenda.name}</h1>
                <div class="ph-meta">
                    <div class="pm"><div class="pm-label">Número</div><div class="pm-value">${leyenda.numero}</div></div>
                    <div class="pm"><div class="pm-label">Posición</div><div class="pm-value">${leyenda.position}</div></div>
                    <div class="pm"><div class="pm-label">Equipo</div><div class="pm-value">${leyenda.equipo}</div></div>
                    <div class="pm"><div class="pm-label">Carrera</div><div class="pm-value">${leyenda.years}</div></div>
                </div>
                <p class="ph-desc">${leyenda.description}</p>
                <div class="ph-actions">
                    <a class="btn" href="/leyendas">Todas las leyendas</a>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                ${sectionHead("Palmarés", { kicker: "Distinciones" })}
                <div class="prose">
                    <p class="lead">${leyenda.titulos}</p>
                    <p>${leyenda.description}</p>
                </div>
            </div>
        </section>`, "/leyendas")
}

export function leyenda404() {
    return createPage("404", `
        <section class="section">
            <div class="container">
                ${emptyState("Leyenda no encontrada", "No existe esa leyenda en el archivo.", `<a class="btn" href="/leyendas">Ver leyendas</a>`)}
            </div>
        </section>`, "/leyendas")
}

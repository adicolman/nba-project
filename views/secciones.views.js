import { createPage, pageHead, emptyState, sectionHead, standingsTable, teamRow, leaderCards, fixturesList, legendCard, tabs } from "../page/utils.js"
import { leyendas } from "../data/leyendas.js"

export function homePage({ equipos, standings, rpg, apg, leyendas }) {
    const equiposMap = new Map((equipos || []).map(e => [String(e._id), e]))
    const top6 = standings.slice(0, 6)
    const topLeyendas = (leyendas || []).slice(0, 4)
    return createPage("Inicio", `
        <section class="hero">
            <div class="container hero-grid">
                <div class="row g-5 align-items-end">
                    <div class="col-md-7 hero-copy">
                        <span class="kicker gold">Archivo de la liga · Temporada 2025-26</span>
                        <h1>La NBA,<br><span class="accent">franquicia por franquicia</span></h1>
                        <p class="dek">Doce equipos, veinticuatro jugadores, posiciones, estadísticas y leyendas. Un archivo editorial para recorrer la liga equipo por equipo.</p>
                        <div class="hero-actions">
                            <a class="btn" href="/equipos">Ver equipos</a>
                            <a class="btn btn-outline-light" href="/posiciones">Tabla de posiciones</a>
                        </div>
                    </div>
                    <div class="col-md-5 hero-photo">
                        <span class="jersey">30</span>
                        <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" alt="Stephen Curry">
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-dark">
            <div class="container">
                ${sectionHead("Tabla de posiciones", { kicker: "Temporada en curso", link: "/posiciones", linkLabel: "Ver completa", dark: true })}
                ${standingsTable(top6, { dark: true, showDivision: true })}
            </div>
        </section>

        <section class="section section-paper">
            <div class="container">
                ${sectionHead("Equipos de la liga", { kicker: "12 franquicias", link: "/equipos", linkLabel: "Directorio completo" })}
                ${(equipos || []).slice(0, 6).map(teamRow).join("")}
            </div>
        </section>

        <section class="section section-dark">
            <div class="container">
                <div class="row g-5">
                    <div class="col-md-6">
                        ${sectionHead("Máximos reboteadores", { kicker: "Pizarrón", link: "/estadisticas?stat=rpg", linkLabel: "Ver más", dark: true })}
                        <div class="row g-0">
                            ${leaderCards(rpg, "rpg", "RPG", equiposMap).replaceAll("class=\"leader-card\"", "class=\"leader-card col-md-4\"")}
                        </div>
                    </div>
                    <div class="col-md-6">
                        ${sectionHead("Máximos asistentes", { kicker: "Pizarrón", link: "/estadisticas?stat=apg", linkLabel: "Ver más", dark: true })}
                        <div class="row g-0">
                            ${leaderCards(apg, "apg", "APG", equiposMap).replaceAll("class=\"leader-card\"", "class=\"leader-card col-md-4\"")}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                ${sectionHead("NBA Legends", { kicker: "Sala de la fama viva", link: "/leyendas", linkLabel: "Todas las leyendas" })}
                <div class="row g-4">
                    ${topLeyendas.map(l => `<div class="col-12 col-sm-6 col-lg-3">${legendCard(l)}</div>`).join("")}
                </div>
            </div>
        </section>`, "/")
}

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


import { createPage, pageHead, equipoForm, emptyState, sectionHead, teamRow, playerRow, standingsTable, leaderCards, fixturesList, legendCard, dataRow, tabs } from "../page/utils.js"
import { divisionInfo, divisiones } from "../data/divisiones.js"

export function homePage({ equipos, standings, proximos, recientes, ppg, rpg, apg, leyendas }) {
    const equiposDocs = (equipos || []).filter(e => e.documentos === undefined)
    const equiposMap = new Map(equiposDocs.map(e => [String(e._id), e]))
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

        <section class="section">
            <div class="container">
                <div class="row g-5">
                    <div class="col-md-7">
                        ${sectionHead("Líderes de anotación", { kicker: "Estadísticas", link: "/estadisticas", linkLabel: "Todas" })}
                        <div class="row g-0" style="border-top: 1px solid var(--line);">
                            ${leaderCards(ppg, "ppg", "PPP", equiposMap).replaceAll("class=\"leader-card\"", "class=\"leader-card lc-light col-md-4\"")}
                        </div>
                    </div>
                    <div class="col-md-5">
                        ${sectionHead("Próximos partidos", { link: "/partidos", linkLabel: "Calendario" })}
                        ${fixturesList(proximos.slice(0, 4), equiposMap)}
                    </div>
                </div>
            </div>
        </section>

        <section class="section section-paper">
            <div class="container">
                ${sectionHead("Equipos de la liga", { kicker: "12 franquicias", link: "/equipos", linkLabel: "Directorio completo" })}
                ${equiposDocs.slice(0, 6).map(teamRow).join("")}
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
        </section>

        <section class="section section-paper">
            <div class="container">
                ${sectionHead("Resultados recientes", { kicker: "Últimos días", link: "/partidos?status=final", linkLabel: "Todos" })}
                ${fixturesList(recientes.slice(0, 5), equiposMap)}
            </div>
        </section>`, "/")
}

export function equipoList(equipos, filtros = {}) {
    const meta = equipos.find(e => e.documentos !== undefined)
    const docs = equipos.filter(e => e.documentos === undefined)
    const confTabs = [
        { href: "/equipos", value: "", label: "Todas" },
        { href: "/equipos?conference=Eastern", value: "Eastern", label: "Eastern" },
        { href: "/equipos?conference=Western", value: "Western", label: "Western" },
        ...divisiones.map(d => ({ href: `/equipos?division=${d.name}`, value: d.name, label: d.name }))
    ]
    const active = filtros.division || filtros.conference || ""
    return createPage("Equipos", `
        ${pageHead("Equipos", "Las franquicias de la liga con balance, fundación, campeonatos y plantel.", `<a class="btn" href="/equipos/nuevo">Nuevo equipo</a>`)}
        <section class="section">
            <div class="container">
                <form class="searchbar input-group" method="get" action="/equipos">
                    <input class="form-control" type="search" name="name" placeholder="Buscar equipo por nombre…" value="${filtros.name ?? ""}">
                    <button class="btn" type="submit">Buscar</button>
                </form>
                ${tabs(confTabs, active)}
                ${docs.length ? docs.map(teamRow).join("") : emptyState("Sin resultados", "No hay equipos con esos filtros.")}
                ${meta && meta.totalPages > 1 ? paginationHtml(meta, "/equipos", filtros) : ""}
            </div>
        </section>`, "/equipos")
}

function paginationHtml(meta, base, filtros = {}) {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(filtros)) {
        if (v && k !== "page") params.set(k, v)
    }
    const link = p => {
        params.set("page", p)
        return `${base}?${params.toString()}`
    }
    return `
    <div class="row-actions" style="margin-top:28px; justify-content:center;">
        ${meta.currentPage > 1 ? `<a class="btn btn-outline btn-sm" href="${link(meta.currentPage - 1)}">Anterior</a>` : ""}
        <span class="meta">Página ${meta.currentPage} de ${meta.totalPages} · ${meta.documentos} resultados</span>
        ${meta.currentPage < meta.totalPages ? `<a class="btn btn-outline btn-sm" href="${link(meta.currentPage + 1)}">Siguiente</a>` : ""}
    </div>`
}

export function divisionPage(division, equipos) {
    const info = divisionInfo(division)
    return createPage(division, `
        ${pageHead(`División ${division}`, `Equipos de la división ${division} de la conferencia ${info?.conference ?? ""}.`)}
        <section class="section">
            <div class="container">
                ${equipos.length ? equipos.map(teamRow).join("") : emptyState("Sin equipos", "No hay equipos en esta división.")}
            </div>
        </section>`, "/equipos")
}

export function equipoDetail(equipo, jugadores) {
    const accent = equipo.color || "#FF6A00"
    const record = equipo.wins !== undefined ? `${equipo.wins}-${equipo.losses ?? 0}` : "—"
    const info = dataRow([
        { label: "Fundación", value: equipo.founded ?? "—" },
        { label: "Campeonatos", value: equipo.championships ?? 0 },
        { label: "Balance", value: record, small: true },
        { label: "Conferencia", value: equipo.conference, small: true },
        { label: "División", value: equipo.division, small: true },
        { label: "Arena", value: equipo.arena, small: true }
    ])
    return createPage(equipo.name, `
        <section class="masthead" style="--mh-accent: ${accent}; border-bottom-color: ${accent};">
            <div class="masthead-inner">
                <div class="mh-logo"><img src="${equipo.logo}" alt="${equipo.name}"></div>
                <div>
                    <div class="mh-sub">${equipo.city} · ${equipo.conference} Conference · ${equipo.division}</div>
                    <h1>${equipo.name}</h1>
                </div>
                <div class="mh-actions">
                    <a class="btn" href="/equipos/editar/${equipo._id}">Editar</a>
                    <a class="btn btn-outline-light" href="/equipos/borrar/${equipo._id}">Eliminar</a>
                    <a class="btn btn-outline-light" href="${equipo.website}" target="_blank" rel="noopener">Sitio oficial</a>
                </div>
            </div>
        </section>
        ${info}
        <section class="section">
            <div class="container">
                <div class="row g-5">
                    <div class="col-md-6">
                        ${sectionHead("La franquicia", { kicker: "Identidad" })}
                        <div class="prose">
                            <p class="lead">${equipo.description}</p>
                            <p>Sede en ${equipo.city}, cancha propia en ${equipo.arena}. Fundada en ${equipo.founded}, con ${equipo.championships} campeonatos en el historial.</p>
                        </div>
                        <div class="row-actions" style="margin-top:24px;">
                            <a class="btn btn-outline" href="/jugadores?equipo_id=${equipo._id}">Ver plantel en la API</a>
                            <a class="btn btn-outline" href="/posiciones">Ver posiciones</a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        ${sectionHead("Plantel", { kicker: `${jugadores.length} jugadores` })}
                        ${jugadores.length ? jugadores.map(j => playerRow(j, equipo)).join("") : emptyState("Sin jugadores", "Todavía no hay jugadores cargados para este equipo.")}
                    </div>
                </div>
            </div>
        </section>`, "/equipos")
}

export function newEquipoForm() {
    return createPage("Nuevo equipo", `
        ${pageHead("Nuevo equipo", "Cargá los datos de la franquicia: identidad, conferencia, división y balance.")}
        <section class="section">
            <div class="container">${equipoForm(null, "/equipos/nuevo")}</div>
        </section>`, "/equipos")
}

export function editEquipoForm(equipo) {
    return createPage(`Editar ${equipo.name}`, `
        ${pageHead(`Editar ${equipo.name}`, "Modificá los datos de la franquicia.")}
        <section class="section">
            <div class="container">${equipoForm(equipo, `/equipos/editar/${equipo._id}`)}</div>
        </section>`, "/equipos")
}

export function deleteEquipoForm(equipo) {
    return createPage(`Eliminar ${equipo.name}`, `
        ${pageHead("Eliminar equipo", "Esta acción marca el equipo como eliminado.")}
        <section class="section">
            <div class="container">
                <div class="form-card">
                    <div class="prose mb-24">
                        <p class="lead">¿Eliminar <strong>${equipo.name}</strong>?</p>
                        <p>El equipo ${equipo.name} (${equipo.city}) dejará de aparecer en el directorio. Esta acción no borra a sus jugadores.</p>
                    </div>
                    <div class="form-actions">
                        <form method="post" action="/equipos/borrar/${equipo._id}" style="display:inline;">
                            <button class="btn btn-danger" type="submit">Sí, eliminar</button>
                        </form>
                        <a class="btn btn-outline" href="/equipos/${equipo._id}">Cancelar</a>
                    </div>
                </div>
            </div>
        </section>`, "/equipos")
}

export function page404() {
    return createPage("404", `
        <section class="section">
            <div class="container">
                ${emptyState("Página no encontrada", "El recurso no existe o fue eliminado.", `<a class="btn" href="/">Volver al inicio</a>`)}
            </div>
        </section>`)
}

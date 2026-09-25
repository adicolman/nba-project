import { createPage, pageHead, equipoForm, emptyState, sectionHead, teamRow, playerRow, dataRow, tabs, esc } from "../page/utils.js"
import { divisionInfo, divisiones } from "../data/divisiones.js"

export function equipoList(equipos, filtros = {}) {
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
                    <input class="form-control" type="search" name="name" placeholder="Buscar equipo por nombre…" value="${esc(filtros.name)}">
                    <button class="btn" type="submit">Buscar</button>
                </form>
                ${tabs(confTabs, active)}
                ${equipos.length ? equipos.map(teamRow).join("") : emptyState("Sin resultados", "No hay equipos con esos filtros.")}
            </div>
        </section>`, "/equipos")
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
                            <a class="btn btn-outline" href="/jugadores?equipo_id=${equipo._id}">Ver plantel completo</a>
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

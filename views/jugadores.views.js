import { createPage, pageHead, jugadorForm, emptyState, sectionHead, playerRow, statsBar, tabs, dataRow, esc } from "../page/utils.js"
import { posiciones } from "../data/divisiones.js"

export function jugadorList(jugadores, filtros = {}, equipos = []) {
    const equiposMap = new Map(equipos.map(e => [String(e._id), e]))

    const posTabs = [
        { href: "/jugadores", value: "", label: "Todos" },
        ...posiciones.map(p => ({ href: `/jugadores?position=${encodeURIComponent(p)}`, value: p, label: p }))
    ]
    const active = filtros.position || ""

    const searchForm = `
    <form class="searchbar input-group" method="get" action="/jugadores" style="max-width:640px;">
        <input class="form-control" type="search" name="name" placeholder="Buscar jugador…" value="${esc(filtros.name)}">
        <button class="btn" type="submit">Buscar</button>
    </form>`

    return createPage("Jugadores", `
        ${pageHead("Jugadores", "Ficha completa: foto, posición, número, equipo, nacionalidad, altura y estadísticas.", `<a class="btn" href="/jugadores/nuevo">Nuevo jugador</a>`)}
        <section class="section">
            <div class="container">
                ${searchForm}
                ${tabs(posTabs, active)}
                ${jugadores.length ? jugadores.map(j => playerRow(j, equiposMap.get(String(j.equipo_id)))).join("") : emptyState("Sin resultados", "No hay jugadores con esos filtros.")}
            </div>
        </section>`, "/jugadores")
}

export function jugadorDetail(jugador, equipo) {
    const s = jugador.stats ?? {}
    return createPage(jugador.name, `
        <section class="player-hero">
            <div class="player-hero-photo">
                <span class="ph-number">${jugador.number}</span>
                <img src="${jugador.foto}" alt="${jugador.name}">
            </div>
            <div class="player-hero-info">
                ${equipo ? `<a class="ph-team" href="/equipos/${equipo._id}">${equipo.name}</a>` : `<span class="ph-team">Sin equipo</span>`}
                <h1>${jugador.name}</h1>
                <div class="ph-meta">
                    <div class="pm"><div class="pm-label">Número</div><div class="pm-value">${jugador.number}</div></div>
                    <div class="pm"><div class="pm-label">Posición</div><div class="pm-value">${jugador.position}</div></div>
                    <div class="pm"><div class="pm-label">Nacionalidad</div><div class="pm-value">${jugador.nationality}</div></div>
                    <div class="pm"><div class="pm-label">Altura</div><div class="pm-value">${jugador.height} cm</div></div>
                </div>
                <p class="ph-desc">${jugador.description}</p>
                <div class="ph-actions">
                    <a class="btn" href="/jugadores/editar/${jugador._id}">Editar</a>
                    <a class="btn btn-outline-light" href="/jugadores/borrar/${jugador._id}">Eliminar</a>
                </div>
            </div>
        </section>
        ${statsBar(s)}
        <section class="section">
            <div class="container">
                <div class="row g-5">
                    <div class="col-md-6">
                        ${sectionHead("Perfil", { kicker: "Ficha" })}
                        <div class="prose">
                            <p class="lead">${jugador.description}</p>
                            <p>${jugador.name} juega de ${jugador.position.toLowerCase()} con el número ${jugador.number} en ${equipo ? equipo.name : "sin equipo asignado"}. Nacionalidad: ${jugador.nationality}. Altura: ${jugador.height} cm.</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        ${sectionHead("Estadísticas", { kicker: "Promedios por partido" })}
                        ${dataRow([
                            { label: "Puntos", value: s.ppg ?? "—" },
                            { label: "Rebotes", value: s.rpg ?? "—" },
                            { label: "Asistencias", value: s.apg ?? "—" },
                            { label: "Robos", value: s.spg ?? "—" },
                            { label: "% Tiros", value: s.fgPct ?? "—" }
                        ])}
                        <div class="row-actions" style="margin-top:24px;">
                            ${equipo ? `<a class="btn btn-outline" href="/equipos/${equipo._id}">Ver ${equipo.name}</a>` : ""}
                            <a class="btn btn-outline" href="/estadisticas">Ver líderes</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>`, "/jugadores")
}

export function newJugadorForm(equipos) {
    return createPage("Nuevo jugador", `
        ${pageHead("Nuevo jugador", "Cargá la ficha del jugador y asignalo a su equipo.")}
        <section class="section">
            <div class="container">${jugadorForm(null, equipos, "/jugadores/nuevo")}</div>
        </section>`, "/jugadores")
}

export function editJugadorForm(jugador, equipos) {
    return createPage(`Editar ${jugador.name}`, `
        ${pageHead(`Editar ${jugador.name}`, "Modificá la ficha del jugador.")}
        <section class="section">
            <div class="container">${jugadorForm(jugador, equipos, `/jugadores/editar/${jugador._id}`)}</div>
        </section>`, "/jugadores")
}

export function deleteJugadorForm(jugador) {
    return createPage(`Eliminar ${jugador.name}`, `
        ${pageHead("Eliminar jugador", "Esta acción marca al jugador como eliminado.")}
        <section class="section">
            <div class="container">
                <div class="form-card">
                    <div class="prose mb-24">
                        <p class="lead">¿Eliminar a <strong>${jugador.name}</strong>?</p>
                        <p>El jugador dejará de aparecer en el plantel y en las estadísticas.</p>
                    </div>
                    <div class="form-actions">
                        <form method="post" action="/jugadores/borrar/${jugador._id}" style="display:inline;">
                            <button class="btn btn-danger" type="submit">Sí, eliminar</button>
                        </form>
                        <a class="btn btn-outline" href="/jugadores/${jugador._id}">Cancelar</a>
                    </div>
                </div>
            </div>
        </section>`, "/jugadores")
}

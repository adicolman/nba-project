import { STYLES } from "./styles.js"
import { divisiones, posiciones } from "../data/divisiones.js"

const NAV = [
    { href: "/", label: "Inicio" },
    { href: "/equipos", label: "Equipos" },
    { href: "/jugadores", label: "Jugadores" },
    { href: "/posiciones", label: "Posiciones" },
    { href: "/partidos", label: "Partidos" },
    { href: "/estadisticas", label: "Estadísticas" },
    { href: "/leyendas", label: "Leyendas" }
]

function navBar(active = "") {
    return `
    <header class="topbar">
        <div class="topbar-inner">
            <a class="brand" href="/"><span class="dot"></span>NBA <em>Archivo</em></a>
            <nav class="mainnav">
                ${NAV.map(n => `<a href="${n.href}"${active === n.href ? ` class="active"` : ""}>${n.label}</a>`).join("")}
            </nav>
        </div>
    </header>`
}

function footer() {
    return `
    <footer class="site-footer">
        <div class="container">
            <span class="f-brand">NBA Archivo</span>
            <span>Parcial 1 · Aplicaciones Híbridas · Datos de colección <a href="/api/equipos">API pública</a></span>
        </div>
    </footer>`
}

export function esc(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

export function createPage(title, content, active = "") {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} · NBA Archivo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <style>${STYLES}</style>
</head>
<body>
    ${navBar(active)}
    <main>
${content}
    </main>
    ${footer()}
</body>
</html>`
}

export function pageHead(title, dek = "", actions = "") {
    return `
    <section class="page-head">
        <div class="container">
            <div>
                <span class="kicker gold">NBA Archivo</span>
                <h1>${title}</h1>
                ${dek ? `<p class="page-dek">${dek}</p>` : ""}
            </div>
            ${actions ? `<div class="row-actions">${actions}</div>` : ""}
        </div>
    </section>`
}

export function emptyState(title, message, action = "") {
    return `
    <div class="empty-state">
        <h2>${title}</h2>
        <p>${message}</p>
        ${action}
    </div>`
}

export function errorPage(status, message) {
    return createPage(`Error ${status}`, `
        <section class="section">
            <div class="container">
                <span class="kicker">Error ${status}</span>
                <div class="empty-state" style="border-color:#FF6A00">
                    <h2>${message}</h2>
                    <p>Volvé al inicio para seguir navegando el archivo.</p>
                    <a class="btn" href="/">Volver al inicio</a>
                </div>
            </div>
        </section>`)
}

export function sectionHead(title, opts = {}) {
    const { kicker = "", link = "", linkLabel = "", dark = false } = opts
    return `
    <div class="sec-head${dark ? " on-dark" : ""}">
        <div>
            ${kicker ? `<span class="kicker${dark ? " gold" : ""}">${kicker}</span>` : ""}
            <h2>${title}</h2>
        </div>
        ${link ? `<a class="sec-link" href="${link}">${linkLabel}</a>` : ""}
    </div>`
}

export function tabs(items, active = "", opts = {}) {
    const { dark = false } = opts
    return `
    <div class="tabs${dark ? " on-dark" : ""}">
        ${items.map(i => `<a href="${i.href}"${i.value === active ? ` class="active"` : ""}>${i.label}</a>`).join("")}
    </div>`
}

export function teamRow(equipo) {
    return `
    <a class="team-row" href="/equipos/${equipo._id}">
        <div class="logo-box"><img src="${equipo.logo}" alt="${equipo.name}"></div>
        <div>
            <h3 class="tr-name">${equipo.name}</h3>
            <div class="tr-meta">${equipo.city} · ${equipo.conference} · ${equipo.division}</div>
        </div>
        <div class="tr-right">
            <div class="stat-num">${equipo.championships ?? 0}<small>Anillos</small></div>
            <div class="stat-num">${equipo.wins ?? 0}<small>Victorias</small></div>
        </div>
    </a>`
}

export function playerRow(jugador, equipo = null) {
    const s = jugador.stats ?? {}
    return `
    <a class="player-row" href="/jugadores/${jugador._id}">
        <div class="pr-photo"><img src="${jugador.foto}" alt="${jugador.name}"></div>
        <div>
            <h3 class="pr-name">${jugador.name}</h3>
            <div class="pr-meta">${jugador.position} · #${jugador.number}${equipo ? ` · ${equipo.name}` : ""}</div>
            <div class="pr-desc">${jugador.description}</div>
        </div>
        <div class="pr-stats">
            <div class="s"><b>${s.ppg ?? "—"}</b><span>PPP</span></div>
            <div class="s"><b>${s.rpg ?? "—"}</b><span>PPR</span></div>
            <div class="s"><b>${s.apg ?? "—"}</b><span>APP</span></div>
        </div>
    </a>`
}

export function standingsTable(equipos, opts = {}) {
    const { dark = false, showDivision = false } = opts
    if (!equipos?.length) return ""
    const rows = equipos.map(e => {
        const pct = typeof e.pct === "number" ? `${(e.pct * 100).toFixed(1)}%` : "—"
        return `
        <tr${e.rank && e.rank <= 6 ? ` class="top"` : ""}>
            <td class="rank">${e.rank ?? "—"}</td>
            <td class="tleft">
                <div class="team-cell">
                    <img src="${e.logo}" alt="">
                    <div>
                        <a href="/equipos/${e._id}">${e.name}</a>
                        <span class="sub">${e.city}</span>
                    </div>
                </div>
            </td>
            ${showDivision ? `<td class="tleft">${e.division ?? "—"}</td>` : ""}
            <td>${e.wins ?? 0}</td>
            <td>${e.losses ?? 0}</td>
            <td class="num-strong">${pct}</td>
        </tr>`
    }).join("")
    return `
    <div${dark ? ` class="on-dark"` : ""}>
        <table class="table-standings">
            <thead>
                <tr>
                    <th>#</th>
                    <th class="tleft">Equipo</th>
                    ${showDivision ? `<th class="tleft">División</th>` : ""}
                    <th>V</th>
                    <th>D</th>
                    <th>%</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    </div>`
}

export function leaderCards(jugadores, stat, label, equiposMap = new Map()) {
    if (!jugadores?.length) return ""
    return jugadores.map((j, i) => {
        const equipo = equiposMap.get(String(j.equipo_id))
        const value = j.stats?.[stat] ?? "—"
        return `
        <a class="leader-card" href="/jugadores/${j._id}">
            <div class="lc-rank">#${i + 1}</div>
            <div class="lc-value">${value}</div>
            <div class="lc-label">${label}</div>
            <div class="lc-name">${j.name}</div>
            <div class="lc-team">${equipo ? equipo.name : ""}</div>
        </a>`
    }).join("")
}

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]

function fmtDate(iso) {
    if (!iso) return ""
    const [, m, d] = String(iso).split("-")
    return `${parseInt(d, 10)} ${MESES[parseInt(m, 10) - 1] ?? ""}`
}

export function fixturesList(partidos, equiposMap = new Map()) {
    if (!partidos?.length) return ""
    const items = partidos.map(p => {
        const home = equiposMap.get(String(p.home_id))
        const away = equiposMap.get(String(p.away_id))
        const isFinal = p.status === "final"
        const homeWin = isFinal && p.homeScore > p.awayScore
        const awayWin = isFinal && p.awayScore > p.homeScore
        return `
        <div class="fixture">
            <div class="fx-date">
                ${fmtDate(p.date)}
                <span class="status${isFinal ? ` final` : ""}">${isFinal ? "FINAL" : "PROGRAMADO"}</span>
            </div>
            <div class="fx-teams">
                <div class="tm${homeWin ? ` winner` : ""}">
                    ${home ? `<img src="${home.logo}" alt="">` : ""}${p.home}
                </div>
                <span class="vs">VS</span>
                <div class="tm${awayWin ? ` winner` : ""}">
                    ${away ? `<img src="${away.logo}" alt="">` : ""}${p.away}
                </div>
            </div>
            ${isFinal
                ? `<div class="fx-score"><span class="${homeWin ? "" : "loser"}">${p.homeScore}</span><span class="sep">–</span><span class="${awayWin ? "" : "loser"}">${p.awayScore}</span></div>`
                : `<div class="fx-arena">${p.arena ?? ""}</div>`}
        </div>`
    }).join("")
    return `<div class="fixtures">${items}</div>`
}

export function legendCard(leyenda) {
    return `
    <a class="legend-card" href="/leyendas/${encodeURIComponent(leyenda.name)}">
        <div class="lg-photo">
            <img src="${leyenda.foto}" alt="${leyenda.name}">
            <span class="lg-years">${leyenda.years}</span>
        </div>
        <h3>${leyenda.name}</h3>
        <div class="lg-team">${leyenda.equipo}</div>
        <div class="lg-titulos">${leyenda.titulos}</div>
        <div class="lg-desc">${leyenda.description}</div>
    </a>`
}

export function dataRow(items) {
    return `
    <div class="datarow">
        ${items.map(i => `
        <div class="datum">
            <div class="d-label">${i.label}</div>
            <div class="d-value${i.small ? ` small` : ""}">${i.value ?? "—"}</div>
        </div>`).join("")}
    </div>`
}

export function statsBar(stats = {}) {
    const items = [
        { key: "ppg", label: "Puntos" },
        { key: "rpg", label: "Rebotes" },
        { key: "apg", label: "Asistencias" },
        { key: "spg", label: "Robos" },
        { key: "fgPct", label: "% Tiros" }
    ]
    return `
    <div class="statsbar">
        ${items.map(i => `
        <div class="st">
            <b>${stats[i.key] ?? "—"}</b>
            <span>${i.label}</span>
        </div>`).join("")}
    </div>`
}

export function equipoForm(equipo = null, action = null) {
    const e = equipo ?? {}
    const isEdit = Boolean(equipo)
    return `
    <div class="form-card">
        <form method="POST" action="${action || "/equipos/nuevo"}">
            <div class="row g-4">
                <div class="col-md-6 field"><label>Nombre</label><input class="form-control" name="name" required value="${e.name ?? ""}"></div>
                <div class="col-md-6 field"><label>Ciudad</label><input class="form-control" name="city" required value="${e.city ?? ""}"></div>
                <div class="col-12 field"><label>Logo (URL)</label><input class="form-control" name="logo" required value="${e.logo ?? ""}" placeholder="https://..."></div>
                <div class="col-12 field"><label>Descripción</label><textarea class="form-control" name="description" required>${e.description ?? ""}</textarea></div>
                <div class="col-md-6 field"><label>Arena</label><input class="form-control" name="arena" required value="${e.arena ?? ""}"></div>
                <div class="col-md-6 field"><label>Sitio web</label><input class="form-control" name="website" required value="${e.website ?? ""}"></div>
                <div class="col-md-6 field">
                    <label>Conferencia</label>
                    <select class="form-select" name="conference" required>
                        <option value="Eastern"${e.conference === "Eastern" ? " selected" : ""}>Eastern</option>
                        <option value="Western"${e.conference === "Western" ? " selected" : ""}>Western</option>
                    </select>
                </div>
                <div class="col-md-6 field">
                    <label>División</label>
                    <select class="form-select" name="division" required>
                        ${divisiones.map(d => `<option value="${d.name}"${e.division === d.name ? " selected" : ""}>${d.name}</option>`).join("")}
                    </select>
                </div>
                <div class="col-md-6 field"><label>Año de fundación</label><input class="form-control" type="number" name="founded" required value="${e.founded ?? ""}"></div>
                <div class="col-md-6 field"><label>Campeonatos</label><input class="form-control" type="number" name="championships" required value="${e.championships ?? 0}"></div>
                <div class="col-md-6 field"><label>Victorias</label><input class="form-control" type="number" name="wins" value="${e.wins ?? 0}"></div>
                <div class="col-md-6 field"><label>Derrotas</label><input class="form-control" type="number" name="losses" value="${e.losses ?? 0}"></div>
                <div class="col-md-6 field"><label>Color (hex)</label><input class="form-control" name="color" value="${e.color ?? ""}" placeholder="#007A33"></div>
            </div>
            <div class="form-actions">
                <button class="btn" type="submit">${isEdit ? "Guardar cambios" : "Crear equipo"}</button>
                <a class="btn btn-outline" href="/equipos">Cancelar</a>
            </div>
        </form>
    </div>`
}

export function jugadorForm(jugador = null, equipos = [], action = null) {
    const j = jugador ?? {}
    const isEdit = Boolean(jugador)
    const stats = j.stats ?? {}
    return `
    <div class="form-card">
        <form method="POST" action="${action || "/jugadores/nuevo"}">
            <div class="row g-4">
                <div class="col-12 field"><label>Nombre</label><input class="form-control" name="name" required value="${j.name ?? ""}"></div>
                <div class="col-12 field"><label>Foto (URL)</label><input class="form-control" name="foto" required value="${j.foto ?? ""}" placeholder="https://cdn.nba.com/headshots/..."></div>
                <div class="col-12 field"><label>Descripción</label><textarea class="form-control" name="description" required>${j.description ?? ""}</textarea></div>
                <div class="col-md-6 field"><label>Número</label><input class="form-control" type="number" name="number" required value="${j.number ?? ""}"></div>
                <div class="col-md-6 field">
                    <label>Posición</label>
                    <select class="form-select" name="position" required>
                        ${posiciones.map(p => `<option value="${p}"${j.position === p ? " selected" : ""}>${p}</option>`).join("")}
                    </select>
                </div>
                <div class="col-12 field">
                    <label>Equipo</label>
                    <select class="form-select" name="equipo_id" required>
                        ${equipos.map(e => `<option value="${e._id}"${String(j.equipo_id) === String(e._id) ? " selected" : ""}>${e.name}</option>`).join("")}
                    </select>
                </div>
                <div class="col-md-6 field"><label>Nacionalidad</label><input class="form-control" name="nationality" required value="${j.nationality ?? ""}"></div>
                <div class="col-md-6 field"><label>Altura (cm)</label><input class="form-control" type="number" name="height" required value="${j.height ?? ""}"></div>
                <div class="col-md field"><label>PPP</label><input class="form-control" type="number" step="0.1" name="ppg" value="${stats.ppg ?? ""}"></div>
                <div class="col-md field"><label>PPR</label><input class="form-control" type="number" step="0.1" name="rpg" value="${stats.rpg ?? ""}"></div>
                <div class="col-md field"><label>APP</label><input class="form-control" type="number" step="0.1" name="apg" value="${stats.apg ?? ""}"></div>
                <div class="col-md field"><label>PPR robos</label><input class="form-control" type="number" step="0.1" name="spg" value="${stats.spg ?? ""}"></div>
                <div class="col-md field"><label>% tiros de campo</label><input class="form-control" type="number" step="0.1" name="fgPct" value="${stats.fgPct ?? ""}"></div>
            </div>
            <div class="form-actions">
                <button class="btn" type="submit">${isEdit ? "Guardar cambios" : "Crear jugador"}</button>
                <a class="btn btn-outline" href="/jugadores">Cancelar</a>
            </div>
        </form>
    </div>`
}

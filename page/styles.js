export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Archivo+Black&display=swap');

:root {
    --navy: #0A1633;
    --navy-2: #0E1F45;
    --navy-3: #16305F;
    --orange: #FF6A00;
    --orange-dark: #E85F00;
    --gold: #FFC72C;
    --white: #FFFFFF;
    --paper: #F6F6F4;
    --ink: #10131A;
    --gray: #6B7280;
    --gray-2: #9CA3AF;
    --line-dark: rgba(255,255,255,.14);
    --line: #E4E4E1;
    --maxw: 1200px;
    --bs-body-font-family: 'Archivo', system-ui, sans-serif;
    --bs-body-color: #10131A;
    --bs-body-bg: #FFFFFF;
    --bs-primary: #FF6A00;
    --bs-primary-rgb: 255, 106, 0;
    --bs-border-radius: 0;
    --bs-border-radius-sm: 0;
    --bs-border-radius-lg: 0;
    --bs-border-radius-xl: 0;
    --bs-border-radius-2xl: 0;
    --bs-border-radius-pill: 0;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
    margin: 0;
    font-family: 'Archivo', system-ui, sans-serif;
    background: var(--white);
    color: var(--ink);
    font-size: 16px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; }
p { margin-top: 1em; margin-bottom: 1em; }

.container { max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }
.container-wide { max-width: 1440px; margin: 0 auto; padding: 0 24px; }

.kicker {
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .18em;
    color: var(--orange);
    display: block;
    margin-bottom: 10px;
}
.kicker.gold { color: var(--gold); }
.kicker.muted { color: var(--gray); }

.sec-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 3px solid var(--ink);
    padding-bottom: 12px;
    margin-bottom: 28px;
}
.sec-head h2 {
    font-family: 'Archivo Black', 'Archivo', sans-serif;
    font-size: clamp(24px, 3vw, 34px);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.02em;
    margin: 0;
    line-height: 1;
}
.sec-head .sec-link {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: var(--orange);
    text-decoration: none;
    white-space: nowrap;
}
.sec-head .sec-link:hover { text-decoration: underline; }
.sec-head.on-dark { border-bottom-color: rgba(255,255,255,.35); }
.sec-head.on-dark h2 { color: var(--white); }

.btn {
    display: inline-block;
    font-family: 'Archivo', sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    padding: 12px 26px;
    border: 2px solid transparent;
    border-radius: 0;
    cursor: pointer;
    text-decoration: none;
    transition: background .15s, color .15s, border-color .15s;
    background: var(--orange);
    color: var(--white);
    line-height: 1.2;
}
.btn:hover { background: var(--orange-dark); color: var(--white); }
.btn-outline { background: transparent; border-color: currentColor; color: var(--ink); }
.btn-outline:hover { background: var(--ink); color: var(--white); }
.btn-outline-light { background: transparent; border-color: rgba(255,255,255,.5); color: var(--white); }
.btn-outline-light:hover { background: var(--white); color: var(--navy); }
.btn-danger { background: #B91C1C; }
.btn-danger:hover { background: #991B1B; }
.btn-sm { padding: 8px 16px; font-size: 12px; }
.btn-block { display: block; width: 100%; text-align: center; }

.topbar {
    background: var(--navy);
    color: var(--white);
    border-bottom: 4px solid var(--orange);
    position: sticky;
    top: 0;
    z-index: 50;
}
.topbar-inner {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 32px;
    height: 64px;
}
.brand {
    font-family: 'Archivo Black', sans-serif;
    font-size: 22px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.02em;
    text-decoration: none;
    color: var(--white);
    display: flex;
    align-items: baseline;
    gap: 7px;
    white-space: nowrap;
}

.brand em { font-style: normal; color: var(--gold); }
.mainnav {
    display: flex;
    gap: 4px;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    justify-content: flex-end;
}
.mainnav a {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
    text-decoration: none;
    color: rgba(255,255,255,.72);
    padding: 22px 12px 20px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color .15s, border-color .15s;
}
.mainnav a:hover { color: var(--white); }
.mainnav a.active { color: var(--white); border-bottom-color: var(--orange); }

.hero {
    background: var(--navy);
    color: var(--white);
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--line-dark);
}
.hero-grid {
    padding-top: 56px;
    min-height: 420px;
}
.hero-copy { padding-bottom: 56px; }
.hero h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(38px, 5.5vw, 64px);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.03em;
    line-height: .98;
    margin: 0 0 20px;
}
.hero h1 .accent { color: var(--gold); }
.hero .dek {
    font-size: 18px;
    line-height: 1.5;
    color: rgba(255,255,255,.78);
    max-width: 560px;
    margin: 0 0 28px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.hero-photo {
    position: relative;
    align-self: end;
    display: flex;
    justify-content: center;
}
.hero-photo img {
    max-height: 400px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 24px 40px rgba(0,0,0,.5));
}
.hero-photo .jersey {
    position: absolute;
    left: -10px;
    top: 10px;
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(80px, 12vw, 150px);
    line-height: 1;
    color: rgba(255,255,255,.07);
    pointer-events: none;
}

.page-head {
    background: var(--navy);
    color: var(--white);
    padding: 44px 0 40px;
    border-bottom: 4px solid var(--orange);
}
.page-head .container { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.page-head h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.02em;
    line-height: 1;
    margin: 0;
}
.page-head .page-dek { color: rgba(255,255,255,.7); margin: 10px 0 0; max-width: 640px; font-size: 16px; }

.section { padding: 56px 0; }
.section-dark { background: var(--navy); color: var(--white); }
.section-dark .muted, .section-dark .meta { color: rgba(255,255,255,.6); }
.section-paper { background: var(--paper); }
.section-tight { padding: 40px 0; }

.tabs { display: flex; gap: 0; border-bottom: 2px solid var(--line); flex-wrap: wrap; margin-bottom: 28px; }
.tabs a, .tabs button {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
    text-decoration: none;
    color: var(--gray);
    padding: 12px 18px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    font-family: inherit;
}
.tabs a:hover { color: var(--ink); }
.tabs a.active, .tabs button.active {
    color: var(--ink);
    border-bottom-color: var(--orange);
}
.tabs.on-dark { border-bottom-color: rgba(255,255,255,.2); }
.tabs.on-dark a { color: rgba(255,255,255,.6); }
.tabs.on-dark a:hover { color: var(--white); }
.tabs.on-dark a.active { color: var(--white); border-bottom-color: var(--gold); }

.searchbar { margin-bottom: 24px; max-width: 460px; }
.searchbar .form-control {
    font-family: inherit;
    font-size: 15px;
    padding: 12px 16px;
    border: 2px solid var(--ink);
    border-right: none;
    border-radius: 0;
    outline: none;
    background: var(--white);
    box-shadow: none;
}
.searchbar .form-control:focus { border-color: var(--orange); box-shadow: none; }
.searchbar .btn { border: 2px solid var(--ink); }

.table-standings { width: 100%; border-collapse: collapse; font-size: 15px; }
.table-standings thead th {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .14em;
    color: var(--gray);
    text-align: right;
    padding: 10px 12px;
    border-bottom: 2px solid var(--ink);
}
.table-standings thead th:first-child,
.table-standings thead th.tleft { text-align: left; }
.table-standings tbody td {
    padding: 13px 12px;
    border-bottom: 1px solid var(--line);
    text-align: right;
    font-variant-numeric: tabular-nums;
}
.table-standings tbody td.tleft { text-align: left; }
.table-standings tbody tr:hover { background: rgba(255,106,0,.05); }
.table-standings .rank {
    font-family: 'Archivo Black', sans-serif;
    font-weight: 900;
    color: var(--gray-2);
    width: 36px;
}
.table-standings tr.top .rank { color: var(--orange); }
.table-standings .team-cell { display: flex; align-items: center; gap: 12px; }
.table-standings .team-cell img { width: 30px; height: 30px; object-fit: contain; }
.table-standings .team-cell a { font-weight: 700; text-decoration: none; }
.table-standings .team-cell a:hover { color: var(--orange); }
.table-standings .team-cell .sub { display: block; font-size: 12px; color: var(--gray); font-weight: 500; }
.table-standings .num-strong { font-weight: 800; }
.on-dark .table-standings thead th { color: rgba(255,255,255,.55); border-bottom-color: rgba(255,255,255,.35); }
.on-dark .table-standings tbody td { border-bottom-color: var(--line-dark); }
.on-dark .table-standings tbody tr:hover { background: rgba(255,255,255,.05); }
.on-dark .table-standings .team-cell a { color: var(--white); }
.on-dark .table-standings .team-cell a:hover { color: var(--gold); }
.on-dark .table-standings .team-cell .sub { color: rgba(255,255,255,.55); }
.on-dark .table-standings .rank { color: rgba(255,255,255,.4); }
.on-dark .table-standings tr.top .rank { color: var(--gold); }

.team-row {
    display: grid;
    grid-template-columns: 64px 1fr auto;
    gap: 20px;
    align-items: center;
    padding: 18px 4px;
    border-bottom: 1px solid var(--line);
    text-decoration: none;
    color: inherit;
    transition: background .12s;
}
.team-row:hover { background: var(--paper); }
.team-row .logo-box { width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; }
.team-row .logo-box img { max-width: 56px; max-height: 56px; object-fit: contain; }
.team-row .tr-name {
    font-family: 'Archivo Black', sans-serif;
    font-size: 21px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.01em;
    line-height: 1.1;
    margin: 0;
}
.team-row:hover .tr-name { color: var(--orange); }
.team-row .tr-meta { font-size: 13px; color: var(--gray); margin-top: 4px; text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
.team-row .tr-right { text-align: right; display: flex; gap: 28px; align-items: center; }
.team-row .stat-num {
    font-family: 'Archivo Black', sans-serif;
    font-size: 30px;
    font-weight: 900;
    line-height: 1;
    color: var(--ink);
}
.team-row .stat-num small { display: block; font-family: 'Archivo', sans-serif; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; color: var(--gray); margin-top: 4px; }
.on-dark .team-row { border-bottom-color: var(--line-dark); }
.on-dark .team-row:hover { background: rgba(255,255,255,.05); }
.on-dark .team-row .tr-name { color: var(--white); }
.on-dark .team-row:hover .tr-name { color: var(--gold); }
.on-dark .team-row .tr-meta { color: rgba(255,255,255,.55); }
.on-dark .team-row .stat-num { color: var(--white); }
.on-dark .team-row .stat-num small { color: rgba(255,255,255,.5); }

.player-row {
    display: grid;
    grid-template-columns: 92px 1fr auto;
    gap: 22px;
    align-items: center;
    padding: 16px 4px;
    border-bottom: 1px solid var(--line);
    text-decoration: none;
    color: inherit;
    transition: background .12s;
}
.player-row:hover { background: var(--paper); }
.player-row .pr-photo {
    width: 92px;
    height: 92px;
    background: linear-gradient(160deg, var(--navy-2), var(--navy-3));
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
}
.player-row .pr-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.player-row .pr-name {
    font-family: 'Archivo Black', sans-serif;
    font-size: 22px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.01em;
    line-height: 1.1;
    margin: 0;
}
.player-row:hover .pr-name { color: var(--orange); }
.player-row .pr-meta { font-size: 13px; color: var(--gray); margin-top: 5px; text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
.player-row .pr-desc { font-size: 14px; color: var(--gray); margin-top: 6px; max-width: 640px; }
.player-row .pr-stats { display: flex; gap: 26px; text-align: right; }
.player-row .pr-stats .s b {
    display: block;
    font-family: 'Archivo Black', sans-serif;
    font-size: 26px;
    font-weight: 900;
    line-height: 1;
}
.player-row .pr-stats .s span { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; color: var(--gray); }
.on-dark .player-row { border-bottom-color: var(--line-dark); }
.on-dark .player-row:hover { background: rgba(255,255,255,.05); }
.on-dark .player-row .pr-name { color: var(--white); }
.on-dark .player-row:hover .pr-name { color: var(--gold); }
.on-dark .player-row .pr-meta, .on-dark .player-row .pr-desc { color: rgba(255,255,255,.6); }
.on-dark .player-row .pr-stats .s span { color: rgba(255,255,255,.5); }

.leaders-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border-top: 1px solid var(--line-dark); }
.leader-card {
    padding: 26px 20px 24px;
    border-right: 1px solid var(--line-dark);
    text-decoration: none;
    color: inherit;
    position: relative;
    transition: background .15s;
}
.leader-card:last-child { border-right: none; }
.leader-card:hover { background: rgba(255,255,255,.05); }
.leader-card .lc-rank {
    font-family: 'Archivo Black', sans-serif;
    font-size: 13px;
    font-weight: 900;
    color: var(--orange);
    letter-spacing: .1em;
}
.leader-card .lc-value {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(40px, 4vw, 56px);
    font-weight: 900;
    line-height: 1;
    color: var(--gold);
    margin: 14px 0 6px;
    font-variant-numeric: tabular-nums;
}
.leader-card .lc-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .16em; color: rgba(255,255,255,.5); }
.leader-card .lc-name { font-size: 15px; font-weight: 800; text-transform: uppercase; color: var(--white); margin-top: 14px; line-height: 1.25; }
.leader-card .lc-team { font-size: 12px; color: rgba(255,255,255,.55); margin-top: 3px; text-transform: uppercase; letter-spacing: .06em; }
.leader-card.lc-light { border-right-color: var(--line); }
.leader-card.lc-light:hover { background: rgba(255,106,0,.05); }
.leader-card.lc-light .lc-value { color: var(--ink); }
.leader-card.lc-light .lc-label { color: var(--gray); }
.leader-card.lc-light .lc-name { color: var(--ink); }
.leader-card.lc-light .lc-team { color: var(--gray); }

.on-dark .fixtures { border-top-color: rgba(255,255,255,.35); }
.fixture {
    display: grid;
    grid-template-columns: 130px 1fr auto;
    gap: 24px;
    align-items: center;
    padding: 18px 4px;
    border-bottom: 1px solid var(--line);
    text-decoration: none;
    color: inherit;
}
.fixture:hover { background: rgba(255,106,0,.04); }
.on-dark .fixture { border-bottom-color: var(--line-dark); }
.on-dark .fixture:hover { background: rgba(255,255,255,.05); }
.fixture .fx-date { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; color: var(--gray); }
.on-dark .fixture .fx-date { color: rgba(255,255,255,.55); }
.fixture .fx-date .status { display: inline-block; margin-top: 6px; font-size: 10px; padding: 3px 8px; background: var(--navy); color: var(--white); letter-spacing: .14em; }
.fixture .fx-date .status.final { background: var(--orange); }
.on-dark .fixture .fx-date .status { background: var(--orange); color: var(--navy); }
.on-dark .fixture .fx-date .status.final { background: var(--gold); color: var(--navy); }
.fixture .fx-teams { display: flex; align-items: center; gap: 18px; font-weight: 700; font-size: 16px; }
.fixture .fx-teams .tm { display: flex; align-items: center; gap: 10px; }
.fixture .fx-teams .tm img { width: 30px; height: 30px; object-fit: contain; }
.fixture .fx-teams .tm.winner { color: var(--orange); }
.on-dark .fixture .fx-teams .tm.winner { color: var(--gold); }
.fixture .fx-teams .vs { font-size: 12px; font-weight: 800; color: var(--gray-2); letter-spacing: .1em; }
.fixture .fx-score { font-family: 'Archivo Black', sans-serif; font-size: 26px; font-weight: 900; font-variant-numeric: tabular-nums; white-space: nowrap; }
.fixture .fx-score .sep { color: var(--gray-2); margin: 0 8px; font-weight: 400; }
.fixture .fx-score .loser { color: var(--gray-2); }
.on-dark .fixture .fx-score .loser { color: rgba(255,255,255,.45); }
.fixture .fx-arena { font-size: 13px; color: var(--gray); text-align: right; }
.on-dark .fixture .fx-arena { color: rgba(255,255,255,.5); }

.legend-card {
    text-decoration: none;
    color: inherit;
    display: block;
}
.legend-card .lg-photo {
    aspect-ratio: 3 / 4;
    background: linear-gradient(170deg, var(--navy-2), #060D1F);
    overflow: hidden;
    position: relative;
    border-bottom: 4px solid var(--orange);
}
.legend-card .lg-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    filter: grayscale(15%) contrast(1.05);
    transition: transform .3s, filter .3s;
}
.legend-card:hover .lg-photo img { transform: scale(1.04); filter: grayscale(0); }
.legend-card .lg-years {
    position: absolute;
    left: 0; bottom: 0;
    background: var(--orange);
    color: var(--white);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .12em;
    padding: 6px 12px;
}
.legend-card h3 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 20px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.01em;
    margin: 16px 0 4px;
    line-height: 1.1;
}
.legend-card:hover h3 { color: var(--orange); }
.legend-card .lg-team { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--gray); }
.legend-card .lg-titulos { font-size: 13px; font-weight: 700; color: var(--orange); margin-top: 8px; }
.legend-card .lg-desc { font-size: 14px; color: var(--gray); margin-top: 8px; line-height: 1.5; }

.masthead {
    position: relative;
    background: var(--navy);
    color: var(--white);
    overflow: hidden;
    border-bottom: 6px solid var(--orange);
}
.masthead[data-color] { border-bottom-color: var(--mh-accent, var(--orange)); }
.masthead-inner {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 52px 24px 44px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 36px;
    align-items: center;
    position: relative;
}
.masthead .mh-logo {
    width: 140px;
    height: 140px;
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
}
.masthead .mh-logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
.masthead h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(34px, 5vw, 58px);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.03em;
    line-height: .98;
    margin: 0;
}
.masthead .mh-sub { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: .16em; color: var(--gold); margin-bottom: 12px; }
.masthead .mh-actions { display: flex; flex-direction: column; gap: 10px; }
.masthead .mh-watermark {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Archivo Black', sans-serif;
    font-size: 220px;
    line-height: 1;
    color: rgba(255,255,255,.04);
    pointer-events: none;
}

.datarow {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: var(--white);
}
.datum {
    flex: 1;
    min-width: 150px;
    padding: 20px 24px;
    border-right: 1px solid var(--line);
}
.datum:last-child { border-right: none; }
.datum .d-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .16em; color: var(--gray); }
.datum .d-value {
    font-family: 'Archivo Black', sans-serif;
    font-size: 26px;
    font-weight: 900;
    line-height: 1.1;
    margin-top: 6px;
}
.datum .d-value.small { font-size: 18px; }
.on-dark .datarow { background: transparent; border-color: var(--line-dark); }
.on-dark .datum { border-color: var(--line-dark); }
.on-dark .datum .d-label { color: rgba(255,255,255,.5); }
.on-dark .datum .d-value { color: var(--white); }

.prose { max-width: 720px; font-size: 17px; line-height: 1.7; color: var(--ink); }
.prose p { margin: 0 0 18px; }
.prose .lead { font-size: 20px; font-weight: 500; color: var(--navy-3); }
.on-dark .prose { color: rgba(255,255,255,.85); }
.on-dark .prose .lead { color: var(--gold); }

.player-hero {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    min-height: 520px;
    background: var(--navy);
    color: var(--white);
    border-bottom: 6px solid var(--orange);
}
.player-hero-photo {
    position: relative;
    background: linear-gradient(165deg, var(--navy-3), var(--navy));
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
}
.player-hero-photo img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top center;
}
.player-hero-photo .ph-number {
    position: absolute;
    left: 20px;
    bottom: -30px;
    font-family: 'Archivo Black', sans-serif;
    font-size: 240px;
    line-height: 1;
    color: rgba(255,255,255,.08);
    pointer-events: none;
}
.player-hero-info {
    padding: 56px 56px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.player-hero-info .ph-team { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .18em; color: var(--gold); margin-bottom: 14px; text-decoration: none; }
.player-hero-info .ph-team:hover { color: var(--orange); }
.player-hero-info h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(36px, 4.5vw, 60px);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -.03em;
    line-height: .98;
    margin: 0 0 24px;
}
.player-hero-info .ph-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid var(--line-dark);
    border-bottom: 1px solid var(--line-dark);
    margin-bottom: 26px;
}
.player-hero-info .ph-meta .pm {
    padding: 14px 26px 14px 0;
    margin-right: 26px;
    border-right: 1px solid var(--line-dark);
}
.player-hero-info .ph-meta .pm:last-child { border-right: none; }
.player-hero-info .ph-meta .pm .pm-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .16em; color: rgba(255,255,255,.5); }
.player-hero-info .ph-meta .pm .pm-value { font-size: 17px; font-weight: 800; text-transform: uppercase; margin-top: 3px; }
.player-hero-info .ph-desc { color: rgba(255,255,255,.8); font-size: 17px; line-height: 1.6; margin-bottom: 26px; max-width: 560px; }
.player-hero-info .ph-actions { display: flex; gap: 12px; }

.statsbar { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 3px solid var(--orange); background: var(--white); }
.statsbar .st {
    padding: 26px 20px;
    text-align: center;
    border-right: 1px solid var(--line);
}
.statsbar .st:last-child { border-right: none; }
.statsbar .st b {
    display: block;
    font-family: 'Archivo Black', sans-serif;
    font-size: clamp(30px, 3.4vw, 44px);
    font-weight: 900;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}
.statsbar .st span { display: block; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .16em; color: var(--gray); margin-top: 8px; }

.form-card {
    background: var(--white);
    border: 2px solid var(--ink);
    padding: 36px;
    max-width: 860px;
}
.field label {
    display: block;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .14em;
    color: var(--gray);
    margin-bottom: 7px;
}
.field input, .field select, .field textarea {
    width: 100%;
    font-family: inherit;
    font-size: 15px;
    padding: 11px 14px;
    border: 2px solid var(--line);
    border-radius: 0;
    background: var(--white);
    outline: none;
    transition: border-color .15s;
}
.field input:focus, .field select:focus, .field textarea:focus { border-color: var(--orange); box-shadow: none; }
.field select.form-select {
    appearance: auto;
    background-image: none;
    border: 2px solid var(--line);
    border-radius: 0;
    padding: 11px 14px;
}
.field select.form-select:focus { border-color: var(--orange); box-shadow: none; }
.field textarea { resize: vertical; min-height: 96px; }
.form-actions { display: flex; gap: 14px; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line); }

.empty-state {
    text-align: center;
    padding: 72px 24px; .
    border-bottom: 2px solid var(--ink);
}
.empty-state h2 { font-family: 'Archivo Black', sans-serif; font-size: 34px; text-transform: uppercase; margin: 0 0 12px; }
.empty-state p { color: var(--gray); margin: 0 0 24px; }

.site-footer {
    background: #060D1F;
    color: rgba(255,255,255,.6);
    border-top: 4px solid var(--orange);
    padding: 36px 0;
    font-size: 14px;
}
.site-footer .container { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
.site-footer a { color: var(--gold); text-decoration: none; font-weight: 700; }
.site-footer a:hover { text-decoration: underline; }
.site-footer .f-brand { font-family: 'Archivo Black', sans-serif; color: var(--white); text-transform: uppercase; font-size: 16px; }

.mt-0 { margin-top: 0; } .mb-0 { margin-bottom: 0; }
.mb-16 { margin-bottom: 16px; } .mb-24 { margin-bottom: 24px; } .mb-40 { margin-bottom: 40px; }
.muted { color: var(--gray); }
.meta { color: var(--gray); font-size: 13px; }
.row-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }

@media (max-width: 960px) {
    .hero .container { padding-top: 40px; }
    .hero-grid { min-height: 0; }
    .hero-copy { padding-bottom: 0; }
    .hero-photo { justify-content: flex-start; }
    .hero-photo img { max-height: 300px; }
    .leaders-grid { grid-template-columns: repeat(2, 1fr); }
    .leader-card { border-bottom: 1px solid var(--line-dark); }
    .player-hero { grid-template-columns: 1fr; }
    .player-hero-photo { min-height: 360px; }
    .player-hero-info { padding: 36px 24px; }
    .statsbar { grid-template-columns: repeat(3, 1fr); }
    .masthead-inner { grid-template-columns: auto 1fr; }
    .masthead .mh-actions { grid-column: 1 / -1; flex-direction: row; }
    .mainnav { display: none; }
}
@media (max-width: 640px) {
    .topbar-inner { gap: 14px; }
    .team-row { grid-template-columns: 48px 1fr; }
    .team-row .tr-right { grid-column: 1 / -1; justify-content: flex-start; }
    .player-row { grid-template-columns: 72px 1fr; }
    .player-row .pr-stats { grid-column: 1 / -1; justify-content: flex-start; }
    .fixture { grid-template-columns: 1fr; gap: 8px; }
    .fixture .fx-arena { text-align: left; }
    .leaders-grid { grid-template-columns: 1fr; }
    .statsbar { grid-template-columns: repeat(2, 1fr); }
    .form-card { padding: 22px; }
    .masthead-inner { grid-template-columns: 1fr; text-align: left; }
}
`
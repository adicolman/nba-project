import express from "express"
import { connectDB } from "./config/db.js"
import equipoRoutes from "./routes/equipos.routes.js"
import jugadorRoutes from "./routes/jugadores.routes.js"
import seccionesRoutes from "./routes/secciones.routes.js"
import equipoApiRoutes from "./api/routes/equipos.routes.js"
import jugadorApiRoutes from "./api/routes/jugadores.routes.js"
import seccionesApiRoutes from "./api/routes/secciones.routes.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(equipoRoutes)
app.use(jugadorRoutes)
app.use(seccionesRoutes)
app.use(equipoApiRoutes)
app.use(jugadorApiRoutes)
app.use(seccionesApiRoutes)

try {
    await connectDB()
} catch (error) {
    console.error("No se pudo conectar a MongoDB:", error.message)
    process.exit(1)
}

app.listen(3333, () => console.log("NBA API funcionando en http://localhost:3333"))
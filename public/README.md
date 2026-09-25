# Carpeta para archivos estáticos servidos por express.static en main.js.

No se incluye un index.html: GET / es dinámico (Route → Controller → View)
y express.static está montado antes que las rutas, así que un index.html
acá reemplazaría la home.

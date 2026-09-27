const express = require("express");
const logger = require("./middleware/logger");
const productosRouter = require("./routes/productos");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(express.json());
app.use(logger);

// Rutas
app.use("/api/productos", productosRouter);

// Manejador de 404 (ninguna ruta anterior coincidió)
app.use((req, res) => {
	res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
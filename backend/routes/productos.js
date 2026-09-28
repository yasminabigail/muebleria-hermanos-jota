const express = require("express");
const router = express.Router();
const productos = require("../data/productos");

// GET /api/productos → listado completo
router.get("/", (req, res) => {
	res.json(productos);
});

// GET /api/productos/:id → producto por id
router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const producto = productos.find((item) => item.id === id);

	if (!producto) {
		return res.status(404).json({ error: "Producto no encontrado" });
	}

	res.json(producto);
});

module.exports = router;
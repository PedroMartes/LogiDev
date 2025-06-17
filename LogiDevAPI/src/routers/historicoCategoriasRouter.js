const { Router } = require("express");

const historicoCategoriasController = require("../controllers/historicoCategoriasController");

const router = Router();

router.get("/", (req, res) => historicoCategoriasController.getAll(req, res));

router.get("/categoria:id", (req, res) => historicoCategoriasController.getByCategoriaId(req, res));

module.exports = router;
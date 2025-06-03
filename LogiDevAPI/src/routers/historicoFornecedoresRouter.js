const { Router } = require("express");

const historicoFornecedoresController = require("../controllers/historicoFornecedoresController");

const router = Router();

router.get("/", (req, res) => historicoFornecedoresController.getAll(req, res));

router.get("/getUnique:id", (req, res) => historicoFornecedoresController.getByFornecedorId(req, res));

module.exports = router;
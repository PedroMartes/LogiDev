const { Router } = require("express");

const historicoProdutosController = require("../controllers/historicoProdutosController");

const router = Router();

router.get("/", (req, res) => historicoProdutosController.getAll(req, res));

router.get("/getUnique:id", (req, res) => historicoProdutosController.getUnique(req, res)); 

module.exports = router;
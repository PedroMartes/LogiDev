const { Router } = require("express");

const produtosController = require("../controllers/produtosController");

const router = Router();

router.post("/create", (req, res) => produtosController.create(req, res));

router.get("/get", (req, res) => produtosController.getAll(req, res));

router.get("/getUnique/:id", (req, res) => produtosController.getUnique(req, res));

router.put("/update/:id", (req, res) => produtosController.update(req, res));

router.delete("/delete/:id", (req, res) => produtosController.delete(req, res));

module.exports = router;
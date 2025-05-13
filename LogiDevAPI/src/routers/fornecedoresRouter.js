const { Router } = require("express");

const fornecedoresController = require("../controllers/fornecedoresController");

const router = Router();

router.post("/create", (req, res) => fornecedoresController.create(req, res));

router.get("/get", (req, res) => fornecedoresController.getAll(req, res));

router.get("/getUnique/:id", (req, res) => fornecedoresController.getUnique(req, res));

router.put("/update/:id", (req, res) => fornecedoresController.update(req, res));

router.delete("/delete/:id", (req, res) => fornecedoresController.delete(req, res));

module.exports = router;
const { Router } = require("express");

const categoriasController = require("../controllers/categoriasController");

const router = Router();

router.post("/create", (req, res) => categoriasController.create(req, res));

router.get("/get", (req, res) => categoriasController.getAll(req, res));

router.get("/getUnique/:id", (req, res) => categoriasController.getUnique(req, res));

router.put("/update/:id", (req, res) => categoriasController.update(req, res));

router.delete("/delete/:id", (req, res) => categoriasController.delete(req, res));

module.exports = router;
const { Router } = require("express");

const alertasController = require("../controllers/alertasController");

const router = Router();

router.post("/create", alertasController.create);

router.get("/get", (req, res) => alertasController.getAll(req, res));

router.get("/getUnique/:id", (req, res) => alertasController.getUnique(req, res));

router.put("/update/:id", (req, res) => alertasController.update(req, res));

router.delete("/delete/:id", (req, res) => alertasController.delete(req, res));

module.exports = router;
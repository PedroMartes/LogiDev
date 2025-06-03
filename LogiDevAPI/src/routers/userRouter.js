const { Router } = require("express");

const userController = require("../controllers/userController")

// Importando o middleware
const authenticate = require("../middleware/authMiddleware");

const router = Router();

//login
router.post("/login", (req, res) => userController.login(req, res));

// CRUD -> Create, Read, Update e Delete
router.get('/get', authenticate, userController.getUser);

router.post("/cadastro", (req, res) => userController.create(req, res));

router.delete("/delete/:id", (req, res) => userController.delete(req, res));

router.put("/update/:id", (req, res) => userController.update(req, res));

router.put('/update-email/:id', userController.updateEmail);   

module.exports = router;
 
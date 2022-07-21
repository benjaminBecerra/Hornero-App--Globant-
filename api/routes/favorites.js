const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favControllers")

router.get("/:userId", favoritesController.all);
router.post("/:userId/add/:desk", favoritesController.add);
router.delete("/:userId/remove/:desk", favoritesController.remove)

module.exports = router;

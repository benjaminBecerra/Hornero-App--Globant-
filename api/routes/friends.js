const express = require("express");
const router = express.Router();
const friendsController = require("../controllers/friendsControllers")

router.get("/:userId", friendsController.all);
router.post("/add/:loggedUserId/:userIdToAdd", friendsController.add);
router.delete("/remove/:loggedUserId/:userIdToDelete", friendsController.remove);
router.post("/sendMail", friendsController.sendMail)
router.get('/search/:searchInput', friendsController.search)

module.exports = router;

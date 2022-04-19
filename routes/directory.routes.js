const express = require("express");
const router = express.Router();

const directoryController = require("../controllers").directory;

// route for adding book
router.post("/add", directoryController.add);

// route for updating books
router.put("/update/:id", directoryController.update);

// route for fetching books
router.get("/fetch", directoryController.fetch);

// route for removing books
router.delete("/remove/:id", directoryController.remove);

module.exports = router;

const express = require("express");
const router = express.Router();
const collectorController = require("../controllers/collectorController");

router.get("/", collectorController.getCollectors);
router.post("/", collectorController.addCollectors);
router.put("/:id", collectorController.updateCollector);
router.delete("/:id", collectorController.deleteCollector);
router.get("/:id", collectorController.getCollectorById);

module.exports = router;

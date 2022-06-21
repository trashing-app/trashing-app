const express = require("express");
const router = express.Router();
const collectorController = require("../controllers/collectorController");

router.get("/", collectorController.getCollectors);
router.put("/:id", collectorController.updateCollector);
router.delete("/:id", collectorController.deleteCollector);
router.get("/:id", collectorController.getCollectorById);
router.get("/location/:id", collectorController.getCollectorLocation);
router.patch("/location/:id", collectorController.updateLocation);

module.exports = router;

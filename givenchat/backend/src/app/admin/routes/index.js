const analyticsRoutes = require("./analytics.router.js");
const router = require("express").Router();
router.use("/analytics", analyticsRoutes);

module.exports = router;

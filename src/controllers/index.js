const { Router } = require("express");

const authRoutes = require("./auth");
const homeRoutes = require("./homeRoutes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/", homeRoutes);

module.exports = router;

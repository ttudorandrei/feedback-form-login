const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

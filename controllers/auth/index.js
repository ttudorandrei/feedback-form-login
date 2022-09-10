const { Router } = require("express");
const User = require("../../models/User");

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      await User.create({
        email,
        password,
      });

      return res.status(200).json({ message: "User registered!" });
    }

    return res
      .status(400)
      .json({ message: "Failed to signup, missing credentials!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // we would have to check the password matches but we'll skip that for now

    req.session.save(() => {
      req.session.isLoggedIn = true;
      req.session.email = user.email;
      req.session.id = user.id;
      return res.status(200).json({ message: "Logged in successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy(() => {
      return res.status(200).json({ message: "Logged out successfully!" });
    });
  } else {
    return res.status(500).json({ message: "Failed to log out" });
  }
});

module.exports = router;

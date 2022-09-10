const { Router } = require("express");
const User = require("../../models/User");

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    console.log(req.body);

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Failed to signup, passwords don't match!" });
    }

    // if email and password are truthy, create the user
    if (email && password) {
      await User.create({
        email,
        password,
      });

      return res.status(200).json({ message: "User registered!" });
    }

    // else alert about missing credentials
    return res
      .status(400)
      .json({ message: "Failed to signup, missing credentials!" });
  } catch (error) {
    // catch the error and display the error message
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // handle case if there is no user
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check if password is valid
    const passwordValid = await user.isPasswordValid(password);

    // handle if the password is not valid
    if (!passwordValid) {
      return res.status(401).json({ error: "Failed to login" });
    }

    // store required data in the session
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
  // if there's a session, destroy it
  if (req.session.isLoggedIn) {
    req.session.destroy(() => {
      return res.status(200).json({ message: "Logged out successfully!" });
    });
  } else {
    return res.status(500).json({ message: "Failed to log out" });
  }
});

module.exports = router;

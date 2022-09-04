const express = require("express");
const expressSession = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize")(
  expressSession.Store
);

const routes = require("./controllers/index");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3002;

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new connectSessionSequelize({ db: sequelize }),
  rolling: true,
  cookie: { maxAge: 60000 },
};

app.use(expressSession(sessionOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const init = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};
init();

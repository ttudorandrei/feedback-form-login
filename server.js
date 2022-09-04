const express = require("express");

const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

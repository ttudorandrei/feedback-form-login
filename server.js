const express = require("express");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

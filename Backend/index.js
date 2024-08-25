const express = require("express");
const app = express();
const bfhlHandler = require("./api/bfhl");

app.use(express.json());

app.all("/bfhl", (req, res) => {
  bfhlHandler(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/mongoose.config");
const path = require("path");

connectToDB();

const app = express();
const PORT = process.env.PORT || 8000;

const staticPath = path.resolve("./public");

app.use(express.static(staticPath));
app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`App served at: http://localhost:${PORT}`);
});

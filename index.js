require('dotenv').config();
const express = require("express");
const connectToDB = require('./database/mongoose.config');

connectToDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use("/api/user", require('./routes/userRoutes'));

app.listen(PORT, () => {
    console.log(`App served at: http://localhost:${PORT}`);
})
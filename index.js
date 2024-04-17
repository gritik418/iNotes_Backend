import dotenv from "dotenv";
import express from "express";
import connectToDB from "./database/mongoose.config.js";
import path from "path";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectToDB();

const app = express();
const PORT = process.env.PORT || 8000;

const staticPath = path.resolve("./public");

app.use(express.static(staticPath));
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`App served at: http://localhost:${PORT}`);
});

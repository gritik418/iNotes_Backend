import "dotenv/config";
import path from "path";
import cors from "cors";
import express from "express";
import connectToDB from "./database/mongoose.config.js";
import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

connectToDB();

const app = express();
const PORT = process.env.PORT || 8000;

const staticPath = path.resolve("./public");

app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`App served at: http://localhost:${PORT}`);
});

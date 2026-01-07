import express from "express";
import dotenv from "dotenv";
import healthRoutes from "./routes/health";
import usersRoutes from "./routes/users";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", healthRoutes);
app.use("/", usersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

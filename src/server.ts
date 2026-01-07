import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend is running fine" });
});

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

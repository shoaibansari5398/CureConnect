import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
	res.send("Server is Running!");
});

app.listen(PORT, () => `Server running on port ${PORT}`);

import express from "express";
import {
	addDoctor,
	adminLogin,
	getDoctors,
	appointmentsAdmin,
	appointmentCancel,
	adminDashboardData,
} from "../controller/adminController.js";
import { changeAvailability } from "../controller/doctorController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/all-doctors", authAdmin, getDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboardData);

export default adminRouter;

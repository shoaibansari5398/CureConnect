import express from "express";
import { doctorsList, doctorLogin,doctorAppointments, appointmentCancel, appointmentComplete,doctorDashboard ,getProfile,updateDoctorProfile} from "../controller/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorsList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/appointments",authDoctor, doctorAppointments);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, getProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);


export default doctorRouter;

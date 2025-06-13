import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
	try {
		const {
			name,
			email,
			password,
			speciality,
			image,
			degree,
			experience,
			about,
			available,
			fees,
			address,
		} = req.body;
		const imageFile = req.file;

		// console.log("Received data:", req.body);
		// console.log("Uploaded file:", req.file);

		// if(!name || !email || !password || !speciality || !image || !degree || !experience || !about || !available || !fees || !address){
		// 	return res.json({success:false,message:"Missing fields"})
		// }

		if (!validator.isEmail(email)) {
			return res.json({ success: false, message: "Invalid email" });
		}

		if (password.length < 8) {
			return res.json({
				success: false,
				message: "Password must be at least 8 characters long",
			});
		}

		//hashing doctor password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//upload image to cloudinary
		const result = await cloudinary.uploader.upload(imageFile.path);
		const imageUrl = result.secure_url;

		const doctorData = {
			name,
			email,
			password: hashedPassword,
			speciality,
			image: imageUrl,
			degree,
			experience,
			about,
			available,
			fees,
			address: JSON.parse(address),
			date: Date.now(),
		};

		const newDoctor = new doctorModel(doctorData);
		await newDoctor.save();

		res.json({ success: true, message: "Doctor added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (
			email === process.env.ADMIN_EMAIL &&
			password === process.env.ADMIN_PASSWORD
		) {
			const token = jwt.sign(email + password, process.env.JWT_SECRET);
			res.json({
				success: true,
				message: "Admin logged in successfully",
				token,
			});
		} else {
			res.json({ success: false, message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

//API to get all doctors data in admin panel

const getDoctors = async (req, res) => {
	try {
		const doctors = await doctorModel.find({}).select("-password");
		res.json({
			success: true,
			message: "Doctors data fetched successfully",
			doctors,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// API to get all appointments data in admin panel
const appointmentsAdmin = async (req, res) => {
	try {
		const appointments = await appointmentModel.find({}).select("-password");
		console.log(appointments)
		res.json({
			success: true,
			message: "Appointments data fetched successfully",
			appointments,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// API to cancel appointment from Admin Panel

const appointmentCancel = async (req, res) => {
	try {
		const { appointmentId } = req.body;

		const appointmentData = await appointmentModel.findById(appointmentId);

		await appointmentModel.findByIdAndUpdate(appointmentId, {
			cancelled: true,
		});

		const { doctorId, slotDate, slotTime } = appointmentData;
		const doctorsData = await doctorModel.findById(doctorId);

		const slots_booked = doctorsData.slots_booked;

		slots_booked[slotDate] = slots_booked[slotDate].filter(
			(slot) => slot !== slotTime
		);

		await doctorModel.findByIdAndUpdate(doctorId, {
			slots_booked,
		});
		res.json({ success: true, message: "Appointment cancelled successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

// API to get dashboard data for admin panel

const adminDashboardData = async (req, res) => {

	try {

		const doctors = await doctorModel.find({});
		const appointments = await appointmentModel.find({});
		const users = await userModel.find({});

		const dashData = {
			doctors:doctors.length,
			appointments:appointments.length,
			users: users.length,
			latestAppointments:appointments.reverse().slice(0,5),
		}

		res.json({
			success: true,
			message: "Dashboard data fetched successfully",
			dashData,
		})


	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
}

export { addDoctor, adminLogin, getDoctors, appointmentsAdmin, appointmentCancel, adminDashboardData };

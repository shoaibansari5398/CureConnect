import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// APi to register user

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.json({ success: false, message: "Missing fields" });
		}

		if (!validator.isEmail(email)) {
			return res.json({ success: false, message: "Invalid email" });
		}

		if (password.length < 8) {
			return res.json({
				success: false,
				message: "Password must be at least 8 characters long",
			});
		}

		//hashing user password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userData = {
			name,
			email,
			password: hashedPassword,
		};

		const newUser = new userModel(userData);
		const user = await newUser.save();

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

		res.json({ success: true, message: "User registered successfully", token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.json({ success: false, message: "Missing fields" });
		}

		if (!validator.isEmail(email)) {
			return res.json({ success: false, message: "Invalid email" });
		}

		if (password.length < 8) {
			return res.json({
				success: false,
				message: "Password must be at least 8 characters long",
			});
		}

		const user = await userModel.findOne({ email });

		if (!user) {
			return res.json({ success: false, message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (isMatch) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			return res.json({
				success: true,
				message: "User logged in successfully",
				token,
			});
		} else {
			return res.json({ success: false, message: "Incorrect password" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const getProfile = async (req, res) => {
	try {
		const { userId } = req;
		const userData = await userModel.findById(userId).select("-password");
		res.json({
			success: true,
			message: "User profile fetched successfully",
			userData,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const updateProfile = async (req, res) => {
	try {
		const { name, phone, address, gender, dob } = req.body;
		const { userId } = req;
		const imageFile = req.file;

		if (!name || !phone || !address || !gender || !dob) {
			return res.json({ success: false, message: "Missing fields" });
		}

		await userModel.findByIdAndUpdate(userId, {
			name,
			phone,
			address,
			gender,
			dob,
		});
		if (imageFile) {
			const result = await cloudinary.uploader.upload(imageFile.path);
			const imageUrl = result.secure_url;
			await userModel.findByIdAndUpdate(userId, { image: imageUrl });
		}
		res.json({ success: true, message: "User profile updated successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const bookAppointment = async (req, res) => {
	try {
		const { id, slotDate, slotTime } = req.body;
		const userId = req.userId;
		const docData = await doctorModel.findById(id);

		if (!docData.available) {
			return res.json({ success: false, message: "Doctor not available" });
		}

		const slots_booked = docData.slots_booked;

		if (slots_booked[slotDate]) {
			if (slots_booked[slotDate].includes(slotTime)) {
				return res.json({ success: false, message: "Slot already booked" });
			} else {
				slots_booked[slotDate].push(slotTime);
			}
		} else {
			slots_booked[slotDate] = [];
			slots_booked[slotDate].push(slotTime);
		}

		const userData = await userModel.findById(userId).select("-password");

		delete docData.slots_booked;

		const newAppointmentData = {
			userId,
			doctorId: id,
			slotDate,
			slotTime,
			userData,
			docData,
			amount: docData.fees,
			date: Date.now(),
			payment: false,
		};

		const newAppointment = new appointmentModel(newAppointmentData);
		await newAppointment.save();

		await doctorModel.findByIdAndUpdate(id, { slots_booked });
		res.json({ success: true, message: "Appointment booked successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const listAppointments = async (req, res) => {
	try {
		const { userId } = req;
		const appointments = await appointmentModel.find({ userId });
		res.json({
			success: true,
			message: "Appointments fetched successfully",
			appointments,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const cancelAppointment = async (req, res) => {
	try {
		const { appointmentId } = req.body;

		const userId = req.userId;
		const appointmentData = await appointmentModel.findById(appointmentId);

		if (appointmentData.userId !== userId) {
			return res.json({ success: false, message: "Unauthorized" });
		}

		await appointmentModel.findByIdAndUpdate(appointmentId, {
			cancelled: true,
		});

		const { doctorId, slotDate, slotTime } = appointmentData;
		const doctorsData = await doctorModel.findById(doctorId);

		const slots_booked = doctorsData.slots_booked;

		slots_booked[slotDate] = slots_booked[slotDate].filter((slot) => slot !== slotTime);

		await doctorModel.findByIdAndUpdate(doctorId, {
			slots_booked,
		});
		res.json({ success: true, message: "Appointment cancelled successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

const payOnline = async (req, res) => {
	try {
		const { appointmentId } = req.body;
		const userId = req.userId;
		const appointmentData = await appointmentModel.findById(appointmentId);
		const {payment} = appointmentData;

		if(payment){
			return res.json({ success: false, message: "Appointment already paid" });
		}
		await appointmentModel.findByIdAndUpdate(appointmentId, {
			payment: true,
		});

		res.json({ success: true, message: "Payment successful" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};





export {
	registerUser,
	loginUser,
	getProfile,
	updateProfile,
	bookAppointment,
	listAppointments,
	cancelAppointment,
	payOnline,
};

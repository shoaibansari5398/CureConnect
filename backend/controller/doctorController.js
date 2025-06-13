import bcrypt from "bcryptjs";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req,res) => {

		try {

			const { docId } = req.body;

			const docData = await doctorModel.findById(docId)

			await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})

			res.json({success:true,message:"Doctor availability changed successfully"})

		} catch (error) {
			console.log(error);
			res.status(500).json({error:error.message})
		}

}

const doctorsList = async (req,res) => {

	try {
		const doctors = await doctorModel.find({}).select("-password").select("-email");
		res.json({success:true,message:"Doctors data fetched successfully",doctors})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

const doctorLogin = async (req,res) => {

	try {
		const { email, password } = req.body;
		const doctor = await doctorModel.findOne({ email })

		if (!doctor) {
			res.json({success:false,message:"Invalid credentials"})
		}

		const isMatch = await bcrypt.compare(password, doctor.password);

		if(isMatch){
			const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
			res.json({success:true,message:"Doctor logged in successfully",token})
		}
		else {
			res.json({success:false,message:"Invalid credentials"})
		}

	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

// API to get doctor appointments

const doctorAppointments = async (req,res) => {

	try {
		const docId  = req.docId;
		const appointments = await appointmentModel.find({ doctorId: docId });
		res.json({success:true,message:"Doctor appointments fetched successfully",appointments})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

// API to mark appointment as completed

const appointmentComplete = async (req,res) => {

	try {
		const docId  = req.docId;
		const { appointmentId } = req.body;

		const appointmentData = await appointmentModel.findById(appointmentId);

		if(appointmentData && appointmentData.doctorId == docId){
			await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
			res.json({success:true,message:"Appointment marked as completed successfully"})
		}
		else {
			res.json({success:false,message:"Unauthorized"})
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

const appointmentCancel = async (req,res) => {

	try {
		const docId  = req.docId;
		const { appointmentId } = req.body;
		console.log(appointmentId,docId)

		const appointmentData = await appointmentModel.findById(appointmentId);
		console.log(appointmentData)

		if(appointmentData && appointmentData.doctorId == docId){
			await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
			res.json({success:true,message:"Appointment cancelled successfully"})
		}
		else {
			res.json({success:false,message:"Unauthorized"})
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}


// API to get dashboard data for doctor panel

const doctorDashboard = async (req,res) => {

	try {
		const docId  = req.docId;
		const appointments = await appointmentModel.find({ doctorId: docId });

		let earnings = 0;

		appointments.map((item) => {
			if(item.isCompleted || item.payment){
				earnings += item.amount;
			}
		})

		let patients = []

		appointments.map((item) => {
			if(!patients.includes(item.userId)){
				patients.push(item.userId)
			}
		})

		const dashData = {
			patients:patients.length,
			appointments:appointments.length,
			earnings:earnings,
			latestAppointments:appointments.reverse().slice(0,5),
		}

		res.json({success:true,message:"Doctor appointments fetched successfully",dashData})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

// API to get doctor profile data

const getProfile = async (req,res) => {

	try {
		const docId  = req.docId;
		const doctorData = await doctorModel.findById(docId);
		res.json({success:true,message:"Doctor profile fetched successfully",doctorData})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

// API to update doctor profile

const updateDoctorProfile = async (req,res) => {

	try {
		const docId  = req.docId;
		const { fees,available, address } = req.body;
		const doctorData = await doctorModel.findByIdAndUpdate(docId,{ fees,available, address });
		res.json({success:true,message:"Doctor profile updated successfully",doctorData})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}

}

export {changeAvailability,doctorsList,doctorLogin,doctorAppointments,appointmentComplete,appointmentCancel,doctorDashboard,getProfile,updateDoctorProfile}

import mongoose from "mongoose";

const connectDB = async () => {
	mongoose.connection.on("connected", () => {
		console.log("MongoDB connected");
	});
	try {
		await mongoose.connect(`${process.env.MONGO_URI}/cureconnect`);
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
	mongoose.connection.on("connected", () => {
		("MongoDB connected");
	});
	try {
		await mongoose.connect(`${process.env.MONGO_URI}/cureconnect`);
	} catch (error) {
		error;
	}
};

export default connectDB;

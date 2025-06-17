import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
	try {
		const { atoken } = req.headers;
		if (!atoken) {
			return res.json({ success: false, message: "Unauthorized" });
		}
		const decode_token = jwt.verify(atoken, process.env.JWT_SECRET);

		if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
			return res.json({ success: false, message: "Unauthorized" });
		}

		next();
	} catch (error) {
		error;
		res.status(500).json({ error: error.message });
	}
};

export default authAdmin;

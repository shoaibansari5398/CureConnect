import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
	try {
		const { token } = req.headers;
		if(!token){
			return res.json({success:false,message:"Unauthorized"})
		}
		const decode_token = jwt.verify(token, process.env.JWT_SECRET)
		req.userId = decode_token.id;
		next();

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
}

export default authUser;

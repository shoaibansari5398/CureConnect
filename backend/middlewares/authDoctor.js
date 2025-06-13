import jwt from "jsonwebtoken";


const authDoctor = async (req, res, next) => {
	try {
		const { dtoken } = req.headers;
		if(!dtoken){
			return res.json({success:false,message:"Unauthorized"})
		}
		const decode_token = jwt.verify(dtoken, process.env.JWT_SECRET)
		req.docId = decode_token.id;
		next();

	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
}

export default authDoctor;

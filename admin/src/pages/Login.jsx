import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [state, setState] = useState("Admin");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { backendUrl, setAToken } = useContext(AdminContext);
	const { setDToken } = useContext(DoctorContext);

	const navigate =useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

			if (state === "Admin") {
				const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
					email,
					password,
				});
				if (data.success) {
					localStorage.setItem("aToken", data.token);
					setAToken(data.token);
					toast.success(data.message);
					navigate("/admin-dashboard");
				} else {
					toast.error(data.message);
				}
			 } else {
				const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
					email,
					password,
				});
				if (data.success) {
					localStorage.setItem("dToken", data.token);
					setDToken(data.token);
					console.log(data.token)
					toast.success(data.message);
					navigate("/doctor-dashboard");
				} else {
					toast.error(data.message);
				}
			 }
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};



	return (
		<form
			onSubmit={handleSubmit}
			className="flex justify-center items-center min-h-[80vh]"
		>
			<div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
				<p className="font-semibold text-2xl m-auto">
					<span className="text-[#5F6FFF]">{state}</span> Login
				</p>
				<div className="w-full">
					<p>Email</p>
					<input
						type="email"
						required
						className="w-full border border-[#DADADA] rounded p-2 m-1"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="w-full">
					<p>Password</p>
					<input
						type="password"
						required
						className="w-full border border-[#DADADA] rounded p-2 m-1"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-[#5F6FFF] text-white py-2 rounded-md text-base cursor-pointer"
				>
					Login
				</button>
				{state === "Admin" ? (
					<p>
						Doctor Login{" "}
						<span
							onClick={() => setState("Doctor")}
							className="text-[#5F6FFF] underline cursor-pointer"
						>
							Click here
						</span>
					</p>
				) : (
					<p>
						Admin Login{" "}
						<span
							onClick={() => setState("Admin")}
							className="text-[#5F6FFF] underline cursor-pointer"
						>
							Click here
						</span>
					</p>
				)}
			</div>
		</form>
	);
};

export default Login;

import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {

	const { aToken, setAToken } = useContext(AdminContext)
	const { dToken, setDToken } = useContext(DoctorContext)

	const navigate = useNavigate()

	const logout = () => {
		navigate('/')
		aToken && setAToken('')
		aToken && localStorage.removeItem('aToken')
		dToken && setDToken('')
		dToken && localStorage.removeItem('dToken')
	 }


	return (
		<div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b border-gray-200 bg-white">
			<div className="flex items-center gap-2 text-xs">
				<img className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} alt="admin_logo" />
				<p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs font-bold">{aToken ? "Admin" : "Doctor"}</p>
			</div>
			<button onClick={logout} className="bg-[#5F6FFF] text-white py-2 px-10 rounded-full cursor-pointer text-sm">Logout</button>
		</div>
	);
};

export default Navbar

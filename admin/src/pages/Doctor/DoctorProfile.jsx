import { useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {

	const { profileData, setProfileData, dToken, getProfileData, backendUrl } = useContext(DoctorContext);
	const { currency } = useContext(AppContext)
	const [isEdit, setIsEdit] = useState(false)

	const updateProfile = async () => {
		try {
			const updateData = {
				address: profileData?.address,
				fees: profileData?.fees,
				available: profileData?.available,
			}
			const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`,updateData , {
				headers: { dToken },
			});
			if (data.success) {
				toast.success(data.message)
				setIsEdit(false)
				getProfileData()
			}
			else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.response.data.message)
		}
	}

	useEffect(() => {
		if(dToken){
			getProfileData()
		}
	},[dToken])

	return (
		profileData && (
			<div>
				<div className="flex flex-col gap-4 m-5">
					<div>
						<img
							className="bg-[#5F6FFF]/80 w-full sm:max-w-64 rounded-lg"
							src={profileData?.image}
							alt=""
						/>
					</div>
					<div className="flex-1 border border-stone-100 p-8 py-7 rounded-lg bg-white">
						<p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
							{profileData?.name}
						</p>
						<div className="flex items-center gap-2 mt-1 text-gray-600">
							<p>
								{profileData?.degree} - {profileData?.speciality}
							</p>

							<button className="px-2 py-0.5 border text-xs rounded-full">
								{profileData.experience}
							</button>
						</div>
						<div>
							<p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
								About:
							</p>
							<p className="txt-sm text-gray-600 max-w-[700px] mt-1">
								{profileData?.about}
							</p>
						</div>
						<p className="text-gray-600 font-medium mt-4">
							Appointment Fee :{" "}
							<span className="text-gray-800">
								{currency}
								{isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData?.fees} /> : profileData?.fees}
							</span>
						</p>
						<div className="flex gap-2 py-2">
							<p>Address:</p>
							<p className="text-sm">
								{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData?.address.line1} /> : profileData?.address.line1}
								<br />
								{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData?.address.line2} /> : profileData?.address.line2}
							</p>
						</div>
						<div className="flex gap-1 pt-2">
							<input checked={profileData?.available} type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} />
							<label>Available</label>
						</div>

						{
							isEdit ? (
								<button onClick={updateProfile} className="border border-[#5F6FFF] px-4 py-1 rounded-full  text-sm mt-5 hover:bg-[#5F6FFF] hover:text-white cursor-pointer transition-all">
								Save Changes
							</button>
							) : (
								<button onClick={() => setIsEdit(true)} className="border border-[#5F6FFF] px-4 py-1 rounded-full  text-sm mt-5 hover:bg-[#5F6FFF] hover:text-white cursor-pointer transition-all">
								Edit Profile
							</button>
							)
						}
					</div>
				</div>
			</div>
		)
	);
};
export default DoctorProfile;

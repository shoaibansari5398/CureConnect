import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {

	const {getAllDoctors, doctors,aToken,changeAvailability} = useContext(AdminContext)

	useEffect(() => {

		if(aToken){
			getAllDoctors()
		}
	}, [aToken])

	return (
		<div className="m-5 max-h-[90vh] overflow-y-scroll">
			<h1 className="text-lg font-medium">All Doctors</h1>
			<div className="w-ful flex flex-wrap gap-4 pt-5 gap-y-6">
				{doctors.map((item, index) => (
					<div
						key={index}
						className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer"
					>
						<img
							src={item.image}
							alt=""
							className="bg-indigo-50 hover:bg-[#5F6FFF] transition-all duration-500"
						/>
						<div className="p-4">
							<p className="font-medium text-lg text-neutral-800">
								{item.name}
							</p>
							<p className="text-sm text-zinc-600">{item.speciality}</p>
							<div className="flex items-center gap-1 text-sm mt-2">
								<input type="checkbox" checked={item.available} onChange={() => changeAvailability(item._id)} />
								<p>Available</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DoctorsList;

import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AddDoctor = () => {
	const { backendUrl, aToken } = useContext(AdminContext);

	const [docImage, setDocImage] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [experience, setExperience] = useState("1 Year");
	const [fees, setFees] = useState("");
	const [speciality, setSpeciality] = useState("General Physician");
	const [degree, setDegree] = useState("");
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [about, setAbout] = useState("");

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			if (!docImage) {
				toast.error("Doctor Image is required");
				return;
			}

			const formData = new FormData();
			formData.append("image", docImage);
			formData.append("name", name);
			formData.append("email", email);
			formData.append("password", password);
			formData.append("experience", experience);
			formData.append("fees", fees);
			formData.append("speciality", speciality);
			formData.append("degree", degree);
			formData.append(
				"address",
				JSON.stringify({ line1: address1, line2: address2 })
			);
			formData.append("about", about);

			// formData.forEach((value, key) => {
			// 	(key, value);
			// });

			const { data } = await axios.post(
				`${backendUrl}/api/admin/add-doctor`,
				formData,
				{
					headers: { aToken },
				}
			);
			if (data.success) {
				toast.success(data.message);
				setDocImage(false);
				setName("");
				setEmail("");
				setPassword("");
				setExperience("1 Year");
				setFees("");
				setSpeciality("General Physician");
				setDegree("");
				setAddress1("");
				setAddress2("");
				setAbout("");
			} else {
				data;
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
			error;
		}
	};

	return (
		<form onSubmit={onSubmitHandler} className="m-5 w-full">
			<p className="text-lg font-medium mb-3">Add Doctor</p>

			<div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
				<div className="flex items-center gap-4 mb-8 text-gray-500">
					<label htmlFor="doctorImage">
						<img
							className="w-16 bg-gray-100 rounded-full cursor-pointer"
							src={
								docImage ? URL.createObjectURL(docImage) : assets.upload_area
							}
							alt="upload_area"
						/>
					</label>
					<input
						onChange={(e) => setDocImage(e.target.files[0])}
						type="file"
						id="doctorImage"
						className="hidden"
					/>
					<p>
						Upload Doctor <br /> Image
					</p>
				</div>
				<div className="flex flex-col lg:flex-row gap-10 items-start text-gray-600">
					<div className="flex flex-col gap-4 w-full lg:flex-1">
						<div className="flex flex-col gap-1 flex-1">
							<p>Doctor Name</p>
							<input
								className="border rounded px-3 py-2"
								type="text"
								placeholder="Enter Doctor Name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<p>Doctor Email</p>
							<input
								className="border rounded px-3 py-2"
								type="email"
								placeholder="Enter Doctor Email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<p>Doctor Password</p>
							<input
								className="border rounded px-3 py-2"
								type="password"
								placeholder="Enter Doctor Password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<p>Experience</p>
							<select
								className="border rounded px-3 py-2"
								name=""
								id=""
								value={experience}
								onChange={(e) => setExperience(e.target.value)}
							>
								<option value="1 Year">1 Year</option>
								<option value="2 Year">2 Year</option>
								<option value="3 Year">3 Year</option>
								<option value="4 Year">4 Year</option>
								<option value="5 Year">5 Year</option>
								<option value="6 Year">6 Year</option>
								<option value="7 Year">7 Year</option>
								<option value="8 Year">8 Year</option>
								<option value="9 Year">9 Year</option>
								<option value="10 Year">10 Year</option>
							</select>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<p>Fees</p>
							<input
								className="border rounded px-3 py-2"
								type="number"
								placeholder="Fees"
								required
								value={fees}
								onChange={(e) => setFees(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 w-full lg:flex-1">
						<div className="flex flex-col gap-1 flex-1">
							<p>Speciality</p>
							<select
								className="border rounded px-3 py-2"
								name=""
								id=""
								value={speciality}
								onChange={(e) => setSpeciality(e.target.value)}
							>
								<option value="General Physician">General Physician</option>
								<option value="Dermatologist">Dermatologist</option>
								<option value="Neurologist">Neurologist</option>
								<option value="Pediatrician">Pediatrician</option>
								<option value="Gynecologist">Gynecologist</option>
								<option value="Gastroenterologist">Gastroenterologist</option>
							</select>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<p>Education</p>
							<input
								className="border rounded px-3 py-2"
								type="text"
								placeholder="Enter Education"
								required
								value={degree}
								onChange={(e) => setDegree(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<p>Address</p>
							<input
								className="border rounded px-3 py-2"
								type="text"
								placeholder="Enter Address 1"
								required
								value={address1}
								onChange={(e) => setAddress1(e.target.value)}
							/>
							<input
								className="border rounded px-3 py-2"
								type="text"
								placeholder="Enter Address 2"
								required
								value={address2}
								onChange={(e) => setAddress2(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="">
					<p className="mt-4 mb-2">About Doctor</p>
					<textarea
						className="border rounded w-full px-4 pt-2"
						placeholder="Write About Doctor"
						rows={5}
						required
						value={about}
						onChange={(e) => setAbout(e.target.value)}
					></textarea>
				</div>
				<button
					type="submit"
					className="bg-[#5F6FFF] text-white py-3 px-10 rounded-full cursor-pointer"
				>
					Add Doctor
				</button>
			</div>
		</form>
	);
};

export default AddDoctor;

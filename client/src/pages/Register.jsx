import React, { use, useState } from "react";
import SideBG from "../assets/side-bg.png";
import LoginMan from "../assets/login-man.png";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.jpg";
import { IoCameraOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const uploadFile = async (img) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "image_preset");

  try {
    let cloudName = "dfzsw9nsu";
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    console.log(secure_url);
    return secure_url;
  } catch (error) {
    console.log(error);
  }
};
const Register = () => {
  const [profileImg, setProfileImg] = useState(profilePic);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "ABCD"
  });
  const navigate = useNavigate()

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImg(reader.result);

        const secureProfileImg = await uploadFile(profileImg);
        setFormData({ ...formData, profileImg: secureProfileImg });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const {data} = await axios.post("/api/v1/register", {
        username: formData.username,
        profileImg: formData.profileImg,
        password: formData.password,
        email: formData.email,
      });

      console.log("Success:", data);
      toast.success("Verification mail sent. Verify & Login");
      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-end"
      style={{
        backgroundImage: `url(${SideBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-1/2 max-md:w-full max-md:rounded-none max-md:p-10 relative bg-white px-15 rounded-l-4xl h-screen flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-7">
          Create your Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <label className="block text-sm font-medium text-slate-500">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 px-6 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a unique username"
            />
          </div>

          <div className="mb-7">
            <label className="block text-sm font-medium text-slate-500">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 px-6 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a unique email"
            />
          </div>

          <div className="mb-7">
            <label className="block text-sm font-medium text-slate-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 px-6 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a strong password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="mb-7 w-[80%]">
              <label className="block text-sm font-medium text-slate-500">
                Name (Optional)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 px-6 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter a unique username"
              />
            </div>

            <div className="h-24 w-24 relative">
              <img
                src={profileImg}
                alt="Background"
                className="relative top-0 left-0 h-24 w-24 rounded-full"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="profileImg"
                className="hidden"
                onChange={handleProfileImageChange}
              />
              <label
                for="profileImg"
                className="absolute bottom-1 text-2xl right-0 text-red-500 cursor-pointer"
              >
                <IoCameraOutline />
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

          <div className="w-full text-center mt-6">
            <button
              type="submit"
              className="bg-black max-md:text-md max-sm:px-10 text-white p-2 px-24 text-lg rounded-md hover:bg-gray-800"
            >
              Create Profile
            </button>
            <p className="text-center text-sm mt-4">
              <span className="text-slate-500">Already have an account? </span>
              <Link to="/" className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </form>
        <div className="-left-36 bottom-0 absolute w-72 z-10 max-md:-left-10 max-md:w-56">
          <img src={LoginMan} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;

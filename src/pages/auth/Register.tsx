import { Link, useNavigate } from "react-router-dom";
import pix from "../../assets/testify.jpg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerAPI } from "../../apis/authFlowAPI";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(pix);

  const onHandleImage = (e: any) => {
    const localImage = e.target.files[0];
    const saveImage = URL.createObjectURL(localImage);

    setImage(localImage);
    setAvatar(saveImage);
  };

  const model = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref("password")]),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(model),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { firstName, lastName, email, password } = data;

    const formData = new FormData();
    formData.append("name", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", image);

    registerAPI(formData).then(() => {
      navigate("/sign-in");
    });
  });

  return (
    <div className="h-[100vh] w-full  flex justify-center items-center bg-orange-200">
      <form
        className="min-h-[400px] min-w-[570px]  rounded px-[5px] bg-white"
        onSubmit={onSubmit}
      >
        {/* Image Setup */}
        <div className="flex justify-center flex-col">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[100px] h-[100] rounded-[5px] object-cover my-[10px] border-[3px] border-orange-600"
              src={avatar}
            />
            <label
              className="w-[120px] h-[30px] bg-orange-400 rounded-[5px] flex justify-center items-center text-[15px] font-[700] text-[#1b1919] hover:scale-[1.02] hover:cursor-pointer duration-300 transition-all"
              htmlFor="image"
            >
              Insert Image
            </label>
            <input
              className="hidden"
              placeholder="image"
              type="file"
              id="image"
              accept="image/jpg, image/jpeg, image/png"
              onChange={onHandleImage}
            />
          </div>
          {/* Image Setup */}

          {/* UserName Setup */}
          <div className="flex justify-between items-center my-[5px]">
            <div className="flex flex-col">
              <div className="w-[300px] h-[35px] flex items-end justify-center border-b-[2px] border-[#c99045] text-[15px] font-bold ">
                First Name:
                <input
                  className=" outline-none border-none  text-[15px] w-[70%] font-light pl-[10px]"
                  placeholder="akinola"
                  {...register("firstName")}
                />
              </div>
              {errors.firstName?.message && (
                <div className="text-[10px] text-orange-900 flex justify-end">
                  Error
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="w-[250px] h-[35px] flex items-end justify-center border-b-[2px] border-[#c99045] text-[15px] font-bold ">
                Last Name:
                <input
                  className=" outline-none border-none  text-[12px] w-[65%] font-light pl-[10px]"
                  placeholder="joshua"
                  {...register("lastName")}
                />
              </div>
              {errors.lastName?.message && (
                <div className="text-[10px] text-orange-900 flex justify-end">
                  Error
                </div>
              )}
            </div>
          </div>
          {/* UserName Setup */}

          {/* Email Setup */}
          <div className="flex flex-col">
            <div className="flex  items-center my-[10px] justify-center">
              <div className="w-[65%] h-[35px] flex items-end justify-center border-b-[2px] border-[#c99045] text-[15px] font-bold ">
                Email:
                <input
                  className=" outline-none border-none  text-[12px] w-[93%] font-light pl-[10px]"
                  placeholder="akinolajoshua19002@gmail.com"
                  {...register("email")}
                />
              </div>
            </div>
            {errors.email?.message && (
              <div className="text-[10px] text-orange-900 flex justify-end mr-[100px]">
                Error
              </div>
            )}
          </div>
          {/* Email Setup */}
        </div>

        {/* Password Setup */}
        <div className="flex justify-between items-center my-[10px]">
          <div className="flex flex-col">
            <div className="w-[250px] h-[35px] flex items-end justify-center border-b-[2px] border-[#c99045] text-[15px] font-bold ">
              Password:
              <input
                className=" outline-none border-none  text-[12px] w-[75%] font-light pl-[10px]"
                placeholder="********"
                {...register("password")}
              />
            </div>
            {errors.password?.message && (
              <div className="text-[10px] text-orange-900 flex justify-end">
                Error
              </div>
            )}
          </div>
          <div className="flex flex-col ">
            <div className="w-[300px] h-[35px] flex items-end justify-center border-b-[2px] border-[#c99045] text-[15px] font-bold ">
              Confirm Password:
              <input
                className=" outline-none border-none  text-[12px] w-[50%] font-light pl-[10px]"
                placeholder="*******"
                {...register("confirm")}
              />
            </div>
            {errors.confirm?.message && (
              <div className="text-[10px] text-orange-900 flex justify-end">
                Error
              </div>
            )}
          </div>
        </div>
        {/* Password Setup */}

        <button
          className="w-[100%] h-[40px] flex justify-center items-center bg-orange-400 my-[20px] font-bold text-[20px] rounded hover:scale-[1.009] hover:cursor-pointer duration-300 transition-all overflow-hidden"
          type="submit"
        >
          Get Started
        </button>
        <hr />
        <div className="text-[12px] flex justify-center items-center font-semibold my-[10px]">
          Already have an Account?{" "}
          <Link to="/sign-in" className="ml-[5px] text-orange-700">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

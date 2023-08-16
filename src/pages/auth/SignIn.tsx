import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signIn } from "../../apis/authFlowAPI";
import { useDispatch } from "react-redux";
import { user } from "../../global/globalState";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const model = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(model),
  });

  const onSubmit = handleSubmit(async (data: any) => {
    const { email, password } = data;

    signIn({ email, password }).then((res) => {
      dispatch(user(res));
      navigate("/");
    });
  });

  return (
    <div className="h-[100vh] w-full  flex justify-center items-center bg-orange-200">
      <form
        className="min-h-[200px] min-w-[570px]  rounded px-[5px] bg-white"
        onSubmit={onSubmit}
      >
        <div className="flex justify-center items-center text-[18px] font-bold">
          Welcome Back!!
        </div>
        <div className="flex justify-between items-center w-[100%] ">
          <div className="flex justify-between items-center my-[10px]">
            <div className="flex flex-col">
              <div className="w-[250px] h-[35px] flex items-end justify-center border-b-[2px] border-[#c99045] text-[15px] font-bold ">
                Email:
                <input
                  className=" outline-none border-none  text-[12px] w-[75%] font-light pl-[10px]"
                  placeholder="********"
                  {...register("email")}
                />
              </div>
              {errors.password?.message && (
                <div className="text-[10px] text-orange-900 flex justify-end">
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
          </div>
          {/* Password Setup */}
        </div>

        <button
          className="w-[100%] h-[40px] flex justify-center items-center bg-orange-400 my-[20px] font-bold text-[20px] rounded hover:scale-[1.009] hover:cursor-pointer duration-300 transition-all overflow-hidden"
          type="submit"
        >
          Sign in
        </button>
        <hr />
        <div className="text-[12px] flex justify-center items-center font-semibold my-[10px]">
          Don't have an Account?
          <Link to="/register" className="ml-[5px] text-orange-700">
            Get Started
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

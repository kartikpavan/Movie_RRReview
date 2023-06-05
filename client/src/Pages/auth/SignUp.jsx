import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { validateSignUpUserInfo } from "../../utils/validator";
import { createUser } from "../../api/auth";
import { useNotificationContext } from "../../context/NotificationContext";
import Loader from "../../components/Loader";

const initialState = { name: "", email: "", password: "" };

const SignUp = () => {
   const navigate = useNavigate();

   const { updateNotification } = useNotificationContext();

   const [userInfo, setUserInfo] = useState(initialState);
   const [errState, setErrState] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserInfo({ ...userInfo, [name]: value });
   };

   const handleSignUp = async (e) => {
      e.preventDefault();
      const { ok, error } = validateSignUpUserInfo(userInfo);
      if (!ok) {
         setErrState(true);
         updateNotification("error", error);
      } else setErrState(false);

      // API request to backend to register new user
      setIsLoading(true);
      const response = await createUser(userInfo);
      if (response.error) {
         setIsLoading(false);
         return updateNotification("error", response.error);
      }
      navigate("/auth/email-verification", { state: { user: response.data }, replace: true }); // passing data from one component to another
      setIsLoading(false);
   };

   return (
      <>
         {isLoading && <Loader />}
         <section className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
            <form onSubmit={handleSignUp} className="card w-96 bg-base-100 shadow-xl">
               <div className="card-body">
                  <h2 className="text-center text-lg font-semibold">Create a new Account</h2>
                  {/* Name Input */}
                  <div className="form-control w-full max-w-xs">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input
                        value={userInfo.name}
                        onChange={handleInputChange}
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className={`input input-bordered ${
                           errState ? "input-error" : null
                        } w-full max-w-xs`}
                     />
                  </div>
                  {/* Email Input */}
                  <div className="form-control w-full max-w-xs">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input
                        value={userInfo.email}
                        onChange={handleInputChange}
                        name="email"
                        type="text"
                        placeholder="abc@gmail.com"
                        className={`input input-bordered ${
                           errState ? "input-error" : null
                        } w-full max-w-xs`}
                     />
                  </div>
                  {/* Password input */}
                  <div className="form-control w-full max-w-xs relative">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input
                        value={userInfo.password}
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                        placeholder="********"
                        className={`input input-bordered ${
                           errState ? "input-error" : null
                        } w-full max-w-xs`}
                     />
                     <AiOutlineEyeInvisible className="absolute bottom-3 right-3 h-6 w-6" />
                  </div>
                  {/* Sign Up Button */}
                  <div className="card-actions justify-center my-2">
                     <button type="submit" className="btn btn-primary">
                        Register
                     </button>
                  </div>
                  {/* Sign In  */}
                  <p className="text-right">
                     <Link className="link" to="/auth/signIn">
                        Already have an account ?
                     </Link>
                  </p>
               </div>
            </form>
         </section>
      </>
   );
};

export default SignUp;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNotificationContext } from "../../context/NotificationContext";
import { validateSignInInfo } from "../../utils/validator";
import { useAuthContext } from "../../context/authContext";
import { Loader } from "../../components";

const SignIn = () => {
   const { updateNotification } = useNotificationContext();
   const { handleSignIn, authInfo } = useAuthContext();

   const [userInfo, setUserInfo] = useState({ email: "", password: "" });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserInfo({ ...userInfo, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { ok, error } = validateSignInInfo(userInfo);
      if (!ok) updateNotification("error", error);
      await handleSignIn(userInfo.email, userInfo.password);
   };

   return (
      <>
         {authInfo.isLoading && <Loader />}
         <section className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl">
               <div className="card-body">
                  <h2 className="text-center text-lg font-semibold">Sign In</h2>
                  {/* Email Input */}
                  <div className="form-contaol w-full max-w-xs">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input
                        value={userInfo.email}
                        onChange={handleInputChange}
                        name="email"
                        type="email"
                        placeholder="abc@gmail.com"
                        className="input input-bordered w-full max-w-xs"
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
                        className="input input-bordered w-full max-w-xs"
                     />
                     <AiOutlineEyeInvisible className="absolute bottom-3 right-3 h-6 w-6" />
                  </div>
                  {/* Sign In Button */}
                  <div className="card-actions justify-center my-2">
                     <button type="submit" className="btn btn-primary btn-wide">
                        Sign in
                     </button>
                  </div>
                  <div className="flex items-center justify-between w-full">
                     {/* Forget Password */}
                     <Link to="/auth/forgot-password" className="link link-hover">
                        Forgot Password ?
                     </Link>

                     {/* Register new Account */}
                     <Link to="/auth/signUp" className="link">
                        Register
                     </Link>
                  </div>
               </div>
            </form>
         </section>
      </>
   );
};

export default SignIn;

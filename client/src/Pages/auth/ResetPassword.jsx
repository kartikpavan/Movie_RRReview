import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ResetPassword = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleResetPassword = (e) => {
      e.preventDefault();
      alert("form Submitted");
   };

   return (
      <section className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
         <form onSubmit={handleResetPassword} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
               <h2 className="text-center text-lg font-semibold">Change Password</h2>

               {/* Email Input */}
               <div className="form-contaol w-full max-w-xs">
                  <label className="label">
                     <span className="label-text">Email</span>
                  </label>
                  <input
                     type="email"
                     placeholder="abc@gmail.com"
                     className="input input-bordered w-full max-w-xs"
                     required
                  />
               </div>

               {/* New Password input */}
               <div className="form-control w-full max-w-xs relative">
                  <label className="label">
                     <span className="label-text">New Password</span>
                  </label>
                  <input
                     type="password"
                     placeholder="********"
                     className="input input-bordered w-full max-w-xs"
                     required
                  />
                  <AiOutlineEyeInvisible className="absolute bottom-3 right-3 h-6 w-6" />
               </div>
               {/* Confirm Password input */}
               <div className="form-control w-full max-w-xs relative">
                  <label className="label">
                     <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                     type="password"
                     placeholder="********"
                     className="input input-bordered w-full max-w-xs"
                     required
                  />
                  <AiOutlineEyeInvisible className="absolute bottom-3 right-3 h-6 w-6" />
               </div>
               {/* Submit Button */}
               <div className="card-actions justify-center my-2">
                  <button type="submit" className="btn btn-primary">
                     Confirm
                  </button>
               </div>
            </div>
         </form>
      </section>
   );
};

export default ResetPassword;

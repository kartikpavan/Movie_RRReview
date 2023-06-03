import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignUp = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleSignUp = (e) => {
      e.preventDefault();
      alert("form Submitted");
   };

   return (
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
                     type="text"
                     placeholder="John Doe"
                     className="input input-bordered w-full max-w-xs"
                  />
               </div>
               {/* Email Input */}
               <div className="form-control w-full max-w-xs">
                  <label className="label">
                     <span className="label-text">Email</span>
                  </label>
                  <input
                     type="text"
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
                     type="password"
                     placeholder="********"
                     className="input input-bordered w-full max-w-xs"
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
   );
};

export default SignUp;

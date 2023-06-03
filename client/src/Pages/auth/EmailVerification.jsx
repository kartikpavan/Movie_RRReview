import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const EmailVerification = () => {
   const [oneTimePassword, setOneTimePassword] = useState(Array.from({ length: 6 }).fill(""));
   const [currentIndex, setCurrentIndex] = useState(0);

   // creating ref to track current Input field and auto jump to next field
   const inputRef = useRef();

   // observing OTP numbers
   const handleOTPChange = ({ target }, index) => {
      const { value } = target;
      const newOtp = [...oneTimePassword];
      newOtp[index] = value.substring(value.length - 1, value.length);
      setOneTimePassword([...newOtp]);

      setCurrentIndex(index + 1); // changing current Index to move focus from current input to the next input
   };

   useEffect(() => {
      inputRef.current?.focus(); // when currentIndex value changes , change the focus to next input field
   }, [currentIndex]);

   const submitHandler = (e) => {
      e.preventDefault();
      console.log(oneTimePassword.join(""));
      alert("OTP is : ", oneTimePassword);
   };

   return (
      <section className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
         <form onSubmit={submitHandler} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
               <h2 className="text-center text-lg font-semibold">
                  Enter the OTP to verify your Account
               </h2>
               <p className="text-gray-500 text-center">
                  OTP has been sent to your registered Email{" "}
                  <span className="text-gray-200">ab*****@gmail.com</span>
               </p>
               {/* OTP Input */}
               <div className="flex items-center justify-between ">
                  {oneTimePassword?.map((_, idx) => {
                     return (
                        <input
                           key={idx}
                           type="number"
                           value={oneTimePassword[idx] || ""}
                           onChange={(e) => handleOTPChange(e, idx)}
                           ref={currentIndex === idx ? inputRef : null}
                           className="input input-bordered w-10 text-lg md:w-12 md:text-2xl"
                        />
                     );
                  })}
               </div>

               {/* Submit Button */}
               <div className="card-actions justify-center my-2">
                  <button type="submit" className="btn btn-primary">
                     Verify Account
                  </button>
               </div>
            </div>
         </form>
      </section>
   );
};

export default EmailVerification;

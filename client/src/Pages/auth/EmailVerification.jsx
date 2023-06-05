import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validOneTimePassword } from "../../utils/validator";
import { verifyUserEmail } from "../../api/auth";
import { useNotificationContext } from "../../context/NotificationContext";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context/authContext";

const EmailVerification = () => {
   const location = useLocation(); // returns current location object , represents Browser URL
   const navigate = useNavigate();

   const { updateNotification } = useNotificationContext();
   const { isUserAuth } = useAuthContext();

   const [oneTimePassword, setOneTimePassword] = useState(Array.from({ length: 6 }).fill(""));
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isLoading, setIsLoading] = useState(false);

   const user = location?.state?.user; // getting this user from sign Up Page

   // creating ref to track current Input field and auto jump to next field
   const inputRef = useRef();

   const focusNextInputField = (index) => {
      setCurrentIndex(index + 1); // changing current Index to move focus from current input to the next input
   };

   const focusPreviousInputField = (index) => {
      let nextIndex;
      const diff = index - 1;
      nextIndex = diff !== 0 ? diff : 0; // if diff !=0 then use diff value else use 0
      setCurrentIndex(nextIndex); // changing current Index to move focus from current input to the previous input
   };

   // observing OTP numbers
   const handleOTPChange = ({ target }, index) => {
      const { value } = target;
      const newOtp = [...oneTimePassword];
      newOtp[index] = value.substring(value.length - 1, value.length); // avoid typing more than 1 digit as input
      console.log(value);
      // change focus of input field
      if (!value) focusPreviousInputField(index);
      else focusNextInputField(index);

      setOneTimePassword([...newOtp]);
   };

   useEffect(() => {
      inputRef.current?.focus(); // when currentIndex value changes , change the focus to next input field
   }, [currentIndex]);

   const submitHandler = async (e) => {
      e.preventDefault();
      const isValidOTP = validOneTimePassword(oneTimePassword);
      if (!isValidOTP) return updateNotification("error", "Invalid OTP");

      // API request to backend to Verify email of new user
      setIsLoading(true);
      const response = await verifyUserEmail({ OTP: oneTimePassword.join(""), userId: user.id });
      if (response.error) {
         setIsLoading(false);
         return updateNotification("error", response.error);
      }
      updateNotification("success", response.msg);
      // updating local storage token if
      localStorage.setItem("auth-token", response.data.token);
      isUserAuth();
      setIsLoading(false);
   };

   // if no user found, redirect to 404 not found page
   //! uncomment later
   // useEffect(() => {
   //    if (!user) navigate("/not-found");
   // }, [user]);

   return (
      <>
         {isLoading && <Loader />}
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
      </>
   );
};

export default EmailVerification;

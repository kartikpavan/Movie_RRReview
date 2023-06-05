import React from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();

   const { authInfo } = useAuthContext();
   console.log(authInfo);
   const isVerified = authInfo.profile?.isVerified;

   const navigateToVerificationPage = () => {
      navigate("/auth/email-verification", { state: { user: authInfo.profile } });
   };

   return (
      <>
         {/* if user is verified then show the NOT VERIFIED POP UP */}
         {authInfo.isLoggedIn && !isVerified ? (
            <div className="bg-info text-info-content w-full text-center p-1">
               Seems like you haven't verified your account,{" "}
               <button
                  onClick={navigateToVerificationPage}
                  className="link link-base font-semibold"
               >
                  click here to Verifiy your Account
               </button>
            </div>
         ) : null}
      </>
   );
};

export default Home;

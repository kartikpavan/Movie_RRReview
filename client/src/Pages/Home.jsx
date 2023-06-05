import React from "react";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Home = () => {
   const { authInfo } = useAuthContext();
   console.log(authInfo);
   const isVerified = authInfo.profile?.isVerified;

   return (
      <>
         {/* if user is verified then show the NOT VERIFIED POP UP */}
         {authInfo.isLoggedIn && !isVerified ? (
            <div className="bg-info text-info-content w-full text-center p-1">
               Seems like you haven't verified your account,{" "}
               <Link to="/" className="link link-base font-semibold">
                  click here to Verifiy your Account
               </Link>
            </div>
         ) : null}
      </>
   );
};

export default Home;

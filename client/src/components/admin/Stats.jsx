import React from "react";

const Stats = () => {
   return (
      <div className="w-full lg:w-[70%]">
         <div className="max-w-full lg:mx-auto">
            <div className="lg:flex sm:space-x-4">
               <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                  <div className="bg-base-200 p-5">
                     <div className="sm:flex sm:items-start">
                        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                           <h3 className="leading-6 font-medium text-base-content">
                              Total Uploads
                           </h3>
                           <p className="text-3xl font-bold text-primary">71,897</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                  <div className="bg-base-200 p-5">
                     <div className="sm:flex sm:items-start">
                        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                           <h3 className="leading-6 font-medium text-base-content">
                              Total Reviews
                           </h3>
                           <p className="text-3xl font-bold text-primary">58.16%</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                  <div className="bg-base-200 p-5">
                     <div className="sm:flex sm:items-start">
                        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                           <h3 className="text-sm leading-6 font-medium text-base-content">
                              Total Users
                           </h3>
                           <p className="text-3xl font-bold text-primary">24.57%</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Stats;

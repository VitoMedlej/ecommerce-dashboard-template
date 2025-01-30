"use client";


import { useState } from "react";

const CmsClient = () => {
    const [showPassword, setShowPassword] = useState(false);
    const email = process.env.NEXT_PUBLIC_CMS_EMAIL;
    const password = process.env.NEXT_PUBLIC_CMS_PASS;
    const cmsLink = process.env.NEXT_PUBLIC_CMS_URL;
  
    return (
      <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">CMS Access</h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email:</span>
            <span className="font-medium">{email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Password:</span>
            <span className="font-medium">
              {showPassword ? password : "********"}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 px-3 py-1 text-sm bg-gray-200 rounded"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          onClick={() => window.open(cmsLink, "_blank")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Open CMS
        </button>
      </div>
    );
  };
  
  export default CmsClient;
  
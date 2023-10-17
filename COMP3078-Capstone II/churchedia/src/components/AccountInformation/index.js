import React from "react"
import styles from "../../styles/settings.module.css"


const AccountInformation = () => {
  console.log("Account information");
  return (
    <div className={`flex flex-1 border-gray-300 bg-white pl-5 ${styles.container}`}>
      <div className="flex-1 mr-4">
        <h2 className="text-2xl font-bold mb-2">Account Information</h2>
        <div className="mb-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-lg font-medium">Full Name</dt>
              <dd className="text-sm font-medium text-gray-500">Jhon Doe</dd>
            </div>
          </dl>
        </div>
        <div className="mb-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-lg font-medium">Email</dt>
              <dd className="text-sm font-medium text-gray-500">
                Email@gmail.com
              </dd>
            </div>
          </dl>
        </div>
        <div className="mb-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-lg font-medium">Username</dt>
              <dd className="text-sm font-medium text-gray-500">@testing</dd>
            </div>
          </dl>
        </div>
       
        <div className="mb-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-lg font-medium">Verified</dt>
              <dd className="text-sm font-medium text-gray-500">No</dd>
            </div>
          </dl>
        </div>
        <div className="mb-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-lg font-medium">Account Creation</dt>
              <dd className="text-sm font-medium text-gray-500">Jun 1, 2018, 8:53:30 AM</dd>
              <dd className="text-sm font-medium text-gray-500">171.227.71.86(Vietnam)</dd>

            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;

import React, { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineNotificationsNone } from "react-icons/md";

const PageSearchBox: React.FC = () => {
  const [notifications, setNotifications] = useState(3); // Example notification count

  return (
    <div className="flex items-center border-2 rounded-full px-2 py-[6px] bg-white w-full sm:w-96">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-[6px] border-none rounded-full w-full bg-gray-100"
        style={{ outline: 'none' }}
      />
      <button className="p-2 m-1 bg-gray-100 hover:bg-gray-200 rounded-full">
        <MdOutlineSearch className="text-gray-500" />
      </button>
      <button className="relative p-2 m-1 bg-gray-100 hover:bg-gray-200 rounded-full">
        <MdOutlineNotificationsNone className="text-gray-500" />
        {notifications > 0 && (
          <span className="absolute -top-2 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {notifications}
          </span>
        )}
      </button>
      <button className="p-2 m-1 bg-gray-100 hover:bg-gray-200 rounded-full">
        <FaRegUser className="text-gray-500" />
      </button>
    </div>
  );
};

export default PageSearchBox;

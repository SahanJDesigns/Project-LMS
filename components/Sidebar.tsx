import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="relative">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-64 h-screen bg-white shadow-md z-50`}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">HORIZON FREE</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="py-2 px-6 text-blue-700 font-medium bg-blue-100 rounded-md">Dashboard</li>
            <li className="py-2 px-6 text-gray-600 hover:bg-gray-100 rounded-md">Quiz</li>
            <li className="py-2 px-6 text-gray-600 hover:bg-gray-100 rounded-md">Classes</li>
            <li className="py-2 px-6 text-gray-600 hover:bg-gray-100 rounded-md">Chat Teachers</li>
            <li className="py-2 px-6 text-gray-600 hover:bg-gray-100 rounded-md">Homework</li>
            <li className="py-2 px-6 text-gray-600 hover:bg-gray-100 rounded-md">Schedule</li>
            <li className="py-2 px-6 text-gray-600 hover:bg-gray-100 rounded-md">Sign Out</li>
          </ul>
        </nav>
      </div>
      <button
        onClick={toggleSidebar}
        className={`fixed top-1/2 transform -translate-y-1/2 left-0 ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        } bg-blue-700 text-white p-2 rounded-full focus:outline-none z-50`}
      >
        {isOpen ? '←' : '→'}
      </button>
    </div>
  );
};

export default Sidebar;
import React, { useEffect, useRef } from 'react';

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar, setShowSidebar]);

  return (
    <div className="relative">
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform lg:translate-x-0 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-52 h-screen bg-white shadow-md z-50`}
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
    </div>
  );
};

export default Sidebar;
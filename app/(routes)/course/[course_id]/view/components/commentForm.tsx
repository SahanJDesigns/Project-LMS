import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, placeholder }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-2 flex items-center">
      <textarea
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder || "Write a comment..."}
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
      <button
      type="submit"
      className="px-3 py-2 m-2 flex items-center text-sm justify-center text-white bg-black rounded-xl hover:text-blue-500"
      >
      <div className="mr-1">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="16px" width="16px" version="1.1" id="Capa_1" viewBox="0 0 495.003 495.003" xmlSpace="preserve">
        <g id="XMLID_51_">
      <path id="XMLID_53_" fill="currentColor" d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616   l-67.6-32.22V456.687z"/>
      <path id="XMLID_52_" fill="currentColor" d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422   c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414   l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956   L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"/>
        </g>
      </svg>
      </div>
      Send
      </button>
    </form>
  );
};

export default CommentForm;

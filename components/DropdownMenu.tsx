import React from 'react';

interface DropdownMenuProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, options, onChange, value }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1">{label}</label>
      <select className="w-full lg:w-40 px-4 py-2 border rounded-lg" onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
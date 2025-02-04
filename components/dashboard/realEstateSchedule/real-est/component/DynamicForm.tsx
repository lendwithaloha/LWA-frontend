import React from "react";

const StringField: React.FC<{
  label: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}> = ({ label, placeholder, name, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-semibold text-sm text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

const NumberField: React.FC<{
  label: string;
  placeholder?: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}> = ({ label, placeholder, name, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(inputValue))) {
      onChange(name, Number(inputValue));
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="font-semibold text-sm text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value.toLocaleString()}
        onChange={handleChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export { StringField, NumberField };

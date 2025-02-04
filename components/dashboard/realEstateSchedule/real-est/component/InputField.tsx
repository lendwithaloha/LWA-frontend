import React from "react";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  onChange: ( value: string | number) => void;
  name: string;
  value: string | number;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  onChange,

}) => {


  // Parse the formatted value back to a raw number
  const parseValue = (value: string) => {
    return value.replace(/,/g, "");
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseValue(e.target.value);
    onChange(rawValue);
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="font-semibold text-sm text-gray-700">{label}</label>}
      <input
        onChange={handleChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default InputField;
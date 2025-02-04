import React from 'react';

interface ToggleSwitchProps {
    id: string;
    name: string;
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    labelClass?: string;
    switchClass?: string;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    id,
    name,
    label,
    checked,
    onChange,
    labelClass = '',
    switchClass = '',
}) => {

    return (
        <div className={`p-4 flex items-center space-x-4 ${switchClass}`}>
            <label htmlFor={id} className={`text-gray-700 font-medium ${labelClass}`}>
                {label}
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    className="sr-only peer"
                    checked={checked}
                    onChange={onChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-primaryColor transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;

import React from 'react';
import { TextField } from '@mui/material';


interface AddressFormProps {
    prefix: string;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData?: any;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors?: Record<string, string>;
}

export const AddressForm: React.FC<AddressFormProps> = ({ prefix, formData, handleInputChange, errors }) => {
    return (
        <React.Fragment>
            <div className='col-span-2 md:col-span-1'>
                <label htmlFor={`${prefix}StreetAddress`} className="block text-sm font-medium text-gray-700">
                    Street Address
                </label>
                <TextField
                    id={`${prefix}StreetAddress`}
                    name={`${prefix}StreetAddress`}
                    value={formData?.[`${prefix}StreetAddress`] || ""}
                    onChange={handleInputChange}
                    error={!!errors?.[`${prefix}StreetAddress`]}
                    helperText={errors?.[`${prefix}StreetAddress`]}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{ className: 'h-10' }}
                />
            </div>

            <div className='col-span-2 md:col-span-1'>
                <label htmlFor={`${prefix}City`} className="block text-sm font-medium text-gray-700">
                    City
                </label>
                <TextField
                    id={`${prefix}City`}
                    name={`${prefix}City`}
                    value={formData[`${prefix}City`]}
                    onChange={handleInputChange}
                    error={!!errors?.[`${prefix}City`]}
                    helperText={errors?.[`${prefix}City`]}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{ className: 'h-10' }}
                />
            </div>

            <div className='col-span-2 md:col-span-1'>
                <label htmlFor={`${prefix}State`} className="block text-sm font-medium text-gray-700">
                    State
                </label>
                <TextField
                    id={`${prefix}State`}
                    name={`${prefix}State`}
                    value={formData?.[`${prefix}State`] || ""}
                    onChange={handleInputChange}
                    error={!!errors?.[`${prefix}State`]}
                    helperText={errors?.[`${prefix}State`]}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{ className: 'h-10' }}
                />
            </div>

            <div className='col-span-2 md:col-span-1'>
                <label htmlFor={`${prefix}Zip`} className="block text-sm font-medium text-gray-700">
                    Zip Code
                </label>
                <TextField
                    id={`${prefix}Zip`}
                    name={`${prefix}Zip`}
                    value={formData?.[`${prefix}Zip`] || ""}
                    onChange={handleInputChange}
                    error={!!errors?.[`${prefix}Zip`]}
                    helperText={errors?.[`${prefix}Zip`]}
                    variant="outlined"
                    fullWidth
                    type="text"
                    margin="normal"
                    InputProps={{
                        className: 'h-10',
                        inputMode: 'numeric'
                    }}
                />
            </div>
        </React.Fragment>
    );
};

"use client";

import React, { useEffect, useState } from "react";
import { TextField, Typography, MenuItem, FormControl, Select, InputAdornment, FormControlLabel, FormLabel, Radio, RadioGroup, Box, FormHelperText, CircularProgress, Checkbox, ListItemText } from "@mui/material"; // Ensure proper imports
import { FormData, ValidationDocument } from "@/store/slice/profile/profile-setup";
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/store/store";
import { updateFormData } from "@/store/slice/profile/profile-setup";
import { usePathname, useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'
import { useGetGuarantorDetailsQuery } from "@/store/slice/profile-api/profileDetail";
import { AddressForm } from "@/components/common/AddressForm";









interface ProfileDetailProps {
    formData?: FormData;
    errors?: Record<string, string>;
    onSelectChange?: (e: SelectChangeEvent<string>) => void;  // Correct event type
    SaveAndUpdateGuarantorForm?: () => Promise<void>;

}


export const ProfileDetail: React.FC<ProfileDetailProps> = ({ formData, errors, onSelectChange, SaveAndUpdateGuarantorForm }) => {
    const { data: profileData, isLoading: isProfileLoading, isError: isProfileError } = useGetGuarantorDetailsQuery();

    const handleSave = async () => {
        if (SaveAndUpdateGuarantorForm) {
            await SaveAndUpdateGuarantorForm();
        }
    };



    const [residencyType, setResidencyType] = useState<"Rent" | "Own">("Rent");





    const pathname = usePathname();
    const router = useRouter()


    const isProfileEdit = pathname === '/dashboard/profile/edit-personal-detail';

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        if (profileData) {
            const residencyTypeFromApi = profileData.owned_primary_residence ? "Own" : "Rent";

            const updatedData = {
                firstName: profileData.personal_details?.first_name,
                lastName: profileData.personal_details?.last_name,
                dob: profileData.personal_details?.date_of_birth,
                maritalStatus: profileData.personal_details?.marital_status,
                // verificationStatus: profileData.personal_details.verification_status,
                // correctionNotes: profileData.personal_details.correction_notes,

                phone: profileData.contact_information?.phone_number,
                email: profileData.contact_information?.email_address,

                selfEmployed: profileData.employment_details?.is_self_employed ? "true" : 'false',
                employerPosition: profileData?.employment_details?.position,
                yearsEmployed: profileData?.employment_details?.years_employed,
                annualIncome: profileData?.employment_details?.annual_income,
                creditScore: profileData?.employment_details?.credit_score,
                employerName: profileData.employment_details?.employer_details?.employer_name,
                employerAddress: profileData?.employment_details?.employer_details?.address_type,
                employerOtherStreetAddress: profileData?.employment_details?.employer_details?.employer_address?.street_address,
                employerOtherState: profileData?.employment_details?.employer_details?.employer_address?.state,
                employerOtherCity: profileData?.employment_details?.employer_details?.employer_address?.city,
                employerOtherZip: profileData?.employment_details?.employer_details?.employer_address?.zip,

                employerCurrentStreetAddress: profileData?.current_address?.street_address,
                employerCurrentState: profileData?.current_address?.state,
                employerCurrentCity: profileData?.current_address?.city,
                employerCurrentZip: profileData?.current_address?.zip,

                mailingAddressCurrentAddress: profileData?.same_mailing_and_current_address ? "true" : "false",

                mailingStreetAddress: profileData?.mailing_address?.street_address,
                mailingState: profileData?.mailing_address?.state,
                mailingCity: profileData?.mailing_address?.city,
                mailingZip: profileData?.mailing_address?.zip,

                residencyType: profileData?.owned_primary_residence ? "true" : 'false',
                monthlyRent: profileData?.primary_residence_monthly_rent,
                mortgagePayment: profileData?.primary_residence_mortgage_payment,
                currentAddressYears: profileData?.move_in_date,
                validationDocuments: profileData?.validation_documents,
            };
            setResidencyType(residencyTypeFromApi)


            dispatch(updateFormData(updatedData));
        }
    }, [profileData, dispatch]);



    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        if (onSelectChange) {
            onSelectChange(e);
        } else {
            dispatch(updateFormData({ [name]: value }));
        }
    };

    const handlePhoneChange = (phone: string) => {
        dispatch(updateFormData({ phone }));
    };

    const handleResidencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value as "Rent" | "Own";
       const  passedValue = value === "Own" ? "true" : "false"

        setResidencyType(value);
        dispatch(updateFormData({ residencyType: passedValue }));


    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ [name]: value }));
    };


    const selectedDocuments = useSelector((state: RootState) => state.profile.formData.validationDocuments);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const updatedDocuments = event.target.value as ValidationDocument[];
        dispatch(updateFormData({ validationDocuments: updatedDocuments }));
    };


    const validationDocuments: ValidationDocument[] = ["passport", "drivers_license", "national_id"];

    const validationDocumentLabels = {
        passport: "Passport",
        drivers_license: "Driver's License",
        national_id: "National ID",
    };

    const handleCancel = () => {
        router.push("/dashboard/profile/personal-detail");
    };


    useEffect(() => {
        if (isProfileError) {
            console.log("Failed to fetch user data");
        }
    }, [isProfileError]);

    if (isProfileLoading) {
        return (
            <div className="flex justify-around items-center">
                <CircularProgress />
            </div>
        );
    }



    return (
        <div className="relative ">
            {isProfileEdit && (
                <div className="flex justify-between items-center mb-4">
                    <h1>Updating Profile</h1>
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                        onClick={handleCancel}
                    >
                        X
                    </button>
                </div>)}

            <form noValidate autoComplete="off" className="flex flex-col grid-4 mb-32">
                <div className="flex flex-col  bg-white  py-4 px-6">
                    <Typography variant="inherit" className="bg-white pb-4  " gutterBottom>
                        Personal Details                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <TextField
                                id="firstName"
                                name="firstName"
                                value={formData?.firstName}
                                onChange={handleInputChange}
                                error={!!errors?.firstName}
                                helperText={errors?.firstName}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    className: 'h-10',
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <TextField
                                id="lastName"
                                name="lastName"
                                value={formData?.lastName}
                                error={!!errors?.lastName}
                                helperText={errors?.lastName}

                                onChange={handleInputChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    className: 'h-10',
                                }}
                            />
                        </div>


                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <TextField
                                id="dob"
                                name="dob"
                                type="date"
                                value={formData?.dob}
                                onChange={handleInputChange}
                                error={!!errors?.dob}
                                helperText={errors?.dob}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    className: 'h-10',
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    max: (() => {
                                        const date = new Date();
                                        date.setFullYear(date.getFullYear() - 18);
                                        return date.toISOString().split('T')[0];
                                    })(),
                                }}
                            />
                        </div>



                        {/* Marital Status Field */}
                        <div>
                            <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700" >
                                Marital Status
                            </label>
                            <FormControl fullWidth margin="normal" error={!!errors?.maritalStatus}>
                                <Select
                                    id="maritalStatus"
                                    name="maritalStatus"
                                    placeholder="Married"
                                    value={formData?.maritalStatus}
                                    onChange={handleSelectChange} // Handle select change
                                    variant="outlined"
                                    className="h-10"
                                >
                                    <MenuItem value="single">Single</MenuItem>
                                    <MenuItem value="married">Married</MenuItem>
                                    <MenuItem value="divorced">Divorced</MenuItem>
                                    <MenuItem value="widowed">Widowed</MenuItem>
                                </Select>
                                {errors?.maritalStatus && (
                                    <FormHelperText>{errors.maritalStatus}</FormHelperText>
                                )}
                            </FormControl>

                        </div>
                    </div>


                </div>


                <div className="flex flex-col  bg-white  py-4 px-6">
                    <Typography variant="inherit" className="bg-white pb-4" gutterBottom>
                        Contact Information
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone Number Field */}
                        {/* Email Field */}
                        {/* <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <TextField
                                id="phone"
                                name="phone"
                                value={formData?.phone}
                                error={!!errors?.phone}
                                helperText={errors?.phone}

                                onChange={handleInputChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="string" // Specify email input type
                                InputProps={{
                                    className: 'h-10', // Apply h-8 height
                                }}
                            />
                        </div> */}
                        <div>
                            <label htmlFor="phone" className="block mb-4 text-sm font-medium text-gray-700">
                                Phone Number
                            </label>


                            {/* <PhoneInput
                                
                                defaultCountry="US"
                                id="phone"
                                name="phone"
                                value={formData?.phone || ''}
                                onChange={handlePhoneChange}
                                error={errors?.phone ? 'Error: ' + errors?.phone : undefined}
                                inputComponent={TextField}
                                inputProps={{
                                    style: { height: '8px' }, // Adjust the height here or use a CSS class
                                    name: 'phone',
                                    variant: 'outlined',
                                    margin: 'normal',
                                    autoComplete: 'tel',
                                }}
                            /> */}

                            <div className="w-full ">
                                <PhoneInput
                                    country="us"
                                    value={formData?.phone}
                                    onChange={handlePhoneChange}
                                    inputProps={{
                                        style: { height: '40px', width: "100%" },
                                    }}

                                    inputClass=" h-[40px] px-3 text-gray-700 text-sm rounded-md"

                                />
                                {errors?.phone && (
                                    <FormHelperText className="text-red-500">{errors?.phone}</FormHelperText>
                                )}
                            </div>

                        </div>


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <TextField
                                id="email"
                                name="email"
                                value={formData?.email}
                                error={!!errors?.email}
                                helperText={errors?.email}

                                onChange={handleInputChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="email" // Specify email input type
                                InputProps={{
                                    className: 'h-10', // Apply h-8 height
                                }}
                            />
                        </div>
                    </div>
                </div>


                <div className="flex flex-col  bg-white  py-4 px-6">
                    <Typography variant="inherit" className="bg-white" gutterBottom>
                        Employment Details
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Self-Employed Section */}
                        <FormControl component="fieldset" className="col-span-2" error={!!errors?.selfEmployed}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <FormLabel>Self Employed</FormLabel>
                                <RadioGroup
                                    row
                                    name="selfEmployed"
                                    value={formData?.selfEmployed}
                                    onChange={handleInputChange}
                                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                            </Box>
                            {!!errors?.selfEmployed && (
                                <FormHelperText>{errors?.selfEmployed}</FormHelperText>
                            )}
                        </FormControl>



                        {/* Employer Name */}
                        {formData?.selfEmployed === "false" && <div className="col-span-2">
                            <label htmlFor="employerName" className="block text-sm font-medium text-gray-700">
                                Employer Name
                            </label>
                            <TextField
                                id="employerName"
                                name="employerName"
                                value={formData?.employerName}
                                error={!!errors?.employerName}
                                helperText={errors?.employerName}

                                onChange={handleInputChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    className: 'h-10',
                                }}
                            />
                        </div>}

                        {formData?.selfEmployed === "false" && <FormControl component="fieldset" className="col-span-2">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: { xs: 1, sm: 2 },
                                }}
                            >
                                <FormLabel
                                    sx={{
                                        fontSize: { xs: "14px", sm: "16px" }, // Smaller font size for mobile
                                    }}
                                >
                                    Employer Address is
                                </FormLabel>
                                <RadioGroup
                                    name="employerAddress"
                                    value={formData?.employerAddress}
                                    onChange={handleInputChange}
                                    row={false} // Default to column for mobile
                                    sx={{
                                        flexDirection: { xs: "column", sm: "row" },
                                        gap: { xs: 1, sm: 4 }, // Reduce the gap between items for mobile
                                    }}
                                >
                                    <FormControlLabel
                                        value="current"
                                        control={<Radio />}
                                        label="Same As Current"
                                        sx={{
                                            marginBottom: { xs: 0.5, sm: 1 }, // Reduce bottom margin for mobile
                                        }}
                                    />
                                    <FormControlLabel
                                        value="mailing_address"
                                        control={<Radio />}
                                        label="Same As Mailing Address"
                                        sx={{
                                            marginBottom: { xs: 0.5, sm: 1 },
                                        }}
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio />}
                                        label="Other"
                                        sx={{
                                            marginBottom: { xs: 0.5, sm: 1 },
                                        }}
                                    />
                                </RadioGroup>
                            </Box>
                        </FormControl>}



                        {formData?.employerAddress === "other" && formData?.selfEmployed === "false" && (
                            <>
                                <Typography variant="inherit" className="bg-white col-span-2" gutterBottom>
                                    Employer Address
                                </Typography>

                                <AddressForm
                                    prefix="employerOther"
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                />

                            </>
                        )}





                        <div className="col-span-2 md:col-span-1">
                            <label htmlFor="employerPosition" className="block text-sm font-medium text-gray-700">
                                Position
                            </label>
                            <TextField
                                id="employerPosition"
                                name="employerPosition"
                                value={formData?.employerPosition}
                                error={!!errors?.employerPosition}

                                helperText={errors?.employerPosition}

                                onChange={handleInputChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text"
                                InputProps={{
                                    className: 'h-10',
                                }}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label htmlFor="yearsEmployed" className="block text-sm font-medium text-gray-700">
                                Years Employed
                            </label>
                            <TextField
                                id="yearsEmployed"
                                name="yearsEmployed"
                                value={formData?.yearsEmployed}
                                error={!!errors?.yearsEmployed}
                                helperText={errors?.yearsEmployed}

                                onChange={handleInputChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="number"
                                InputProps={{
                                    className: 'h-10',
                                }}
                                inputProps={{ min: 0 }}
                            />
                        </div>

                        {/* Annual Income */}
                        <div className="col-span-2 md:col-span-1">
                            <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">
                                Annual Income
                            </label>
                            <TextField
                                id="annualIncome"
                                name="annualIncome"
                                value={
                                    formData?.annualIncome
                                        ? (() => {
                                            // Inline formatNumber function
                                            const formatNumber = (value: number) => {
                                                if (!value) return '';
                                                const number = Number(value);
                                                return number.toLocaleString('en-US');
                                            };
                                            return formatNumber(formData.annualIncome);
                                        })()
                                        : ''
                                }
                                error={!!errors?.annualIncome}
                                helperText={errors?.annualIncome}
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/,/g, ''); // Remove commas from input

                                    // Custom event to update raw value in state
                                    const customEvent = {
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'annualIncome',
                                            value: rawValue, // Store raw value without commas
                                        },
                                    };

                                    handleInputChange?.(customEvent as React.ChangeEvent<HTMLInputElement>);
                                }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    className: 'h-10',
                                }}
                                inputProps={{
                                    min: 0,
                                }}
                            />

                        </div>


                        {/* Credit Score */}
                        <div className="col-span-2 md:col-span-1">
                            <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700">
                                Credit Score
                            </label>
                            <TextField
                                id="creditScore"
                                name="creditScore"
                                value={formData?.creditScore}
                                error={!!errors?.creditScore}
                                helperText={errors?.creditScore}

                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                type="number"
                                InputProps={{
                                    className: 'h-10',
                                }}
                                inputProps={{ min: 0 }}
                            />
                        </div>

                    </div>

                </div>


                <div className="flex flex-col  bg-white  py-4 px-6">
                    <Typography variant="inherit" className="bg-white pb-4" gutterBottom>
                        Current Address
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Street Address */}
                        <AddressForm
                            prefix="employerCurrent"
                            formData={formData}
                            handleInputChange={handleInputChange}
                            errors={errors}
                        />
                    </div>



                    {/* Mailing Address Radio Group */}
                    <FormControl component="fieldset" className="col-span-2 py-2">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: 'space-between',
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                gap: { xs: 2, sm: 0 },
                            }}
                        >
                            <FormLabel
                                sx={{
                                    marginBottom: { xs: 1, sm: 0 },
                                }}
                            >
                                Mailing Address is the same as Current Address?
                            </FormLabel>
                            <RadioGroup
                                row={false} // Default to column layout
                                id="mailingAddressCurrentAddress"
                                name="mailingAddressCurrentAddress"
                                value={formData?.mailingAddressCurrentAddress}
                                onChange={handleInputChange}
                                sx={{
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: 'space-between',
                                    gap: { xs: 1, sm: 0 },
                                }}
                            >
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Yes"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="No"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        </Box>
                    </FormControl>

                    {formData?.mailingAddressCurrentAddress === "false" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AddressForm
                                prefix="mailing"
                                formData={formData}
                                handleInputChange={handleInputChange}
                                errors={errors}
                            />
                        </div>
                    )}

                </div>



                <div className="flex flex-col  bg-white  py-4 px-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormControl component="fieldset" className="col-span-2">
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <FormLabel>Do you currently own or rent your primary residence?</FormLabel>
                                <RadioGroup
                                    row
                                    name="residencyType"
                                    value={residencyType} 
                                    onChange={handleResidencyChange}
                                    sx={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <FormControlLabel value="Rent" control={<Radio />} label="Rent" labelPlacement="start" />
                                    <FormControlLabel value="Own" control={<Radio />} label="Own" labelPlacement="start" />
                                </RadioGroup>
                            </Box>
                        </FormControl>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        {residencyType === "Rent" ? <div className="col-span-1">
                            <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
                                Monthly Rent
                            </label>
                            <TextField
                                id="monthlyRent"
                                name="monthlyRent"
                                variant="outlined"
                                type="number"
                                fullWidth
                                onChange={handleInputChange}


                                value={formData?.monthlyRent}
                                error={!!errors?.monthlyRent}
                                helperText={errors?.monthlyRent}

                                margin="normal"
                                InputProps={{
                                    className: 'h-10',
                                }}
                                inputProps={{ min: 0 }}

                            />
                        </div> : <div className="col-span-1">
                            <label htmlFor="mortgagePayment" className="block text-sm font-medium text-gray-700">
                                Mortgage Payment                        </label>
                            <TextField
                                id="mortgagePayment"
                                name="mortgagePayment"
                                variant="outlined"
                                type="number"
                                fullWidth
                                onChange={handleInputChange}

                                value={formData?.mortgagePayment}
                                error={!!errors?.mortgagePayment}
                                helperText={errors?.mortgagePayment}

                                margin="normal"
                                InputProps={{
                                    className: 'h-10',
                                }}
                                inputProps={{ min: 0 }}


                            />
                        </div>}</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <div className="flex items-center">
                            <label>Move in Date</label>
                        </div>


                        <TextField
                            id="currentAddressYears"
                            name="currentAddressYears"
                            type="date"
                            value={formData?.currentAddressYears}
                            onChange={handleInputChange}
                            error={!!errors?.currentAddressYears}
                            helperText={errors?.currentAddressYears}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                className: 'h-10',
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                max: (() => {
                                    const date = new Date();
                                    date.setFullYear(date.getFullYear() - 18);
                                    return date.toISOString().split('T')[0];
                                })(),
                            }}
                        />





                    </div>

                    <div className="grid grid-cols-1 gap-4 my-4">
                        <FormControl fullWidth>
                            {/* Label Styling */}
                            <label className="text-sm font-medium text-gray-700">Validation Documents</label>

                            {/* Select Dropdown */}
                            <Select
                                labelId="validation-documents-label"
                                displayEmpty
                                multiple
                                value={formData?.validationDocuments || []}
                                onChange={handleChange}
                                renderValue={(selected) =>
                                    selected.length === 0
                                        ? "Select validation documents" // Placeholder
                                        : selected.map((doc) => validationDocumentLabels[doc] || doc).join(", ")
                                }
                                className="bg-white border border-gray-300 h-10 my-2"
                                MenuProps={{
                                    PaperProps: {
                                        style: { maxHeight: 200 }, // Limit dropdown height
                                    },
                                }}
                            >
                                {validationDocuments.map((doc) => (
                                    <MenuItem key={doc} value={doc}>
                                        <Checkbox checked={selectedDocuments.includes(doc)} />
                                        <ListItemText primary={validationDocumentLabels[doc]} />
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </div>

                </div>










            </form>
            {isProfileEdit && <div className="flex  justify-end py-10">
                <button
                    className="bg-primaryColor text-white text-sm md:text-lg  px-2 py-2 md:px-28 md:py-4 rounded-md "
                    onClick={() => { handleSave(); handleCancel() }}

                >
                    Save Changes
                </button>
            </div>}


        </div>
    );
};
// profileSchemas.ts
import { z } from "zod";

export const guarantorDetailsSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    dob: z.string().min(1, "Date of Birth is required"),
    maritalStatus: z.string().min(1, "Marital Status is required"),
    phone: z.string().min(1, "Phone is required"),
    // phone: z
    //     .string()
    //     .min(1, "Phone is required")
    //     .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Invalid phone number format. Use (123) 456-7890")
    //     .default("").optional(),
    email: z.string().email("Invalid email address"),
    employerPosition: z.string().min(1, "Employer Position is required"),
    employerAddress: z.string().optional(),
    position: z.string().optional(),
    yearsEmployed: z.preprocess((val) => {
        if (typeof val === "string") {
            const parsed = parseFloat(val);
            return isNaN(parsed) ? null : parsed; 
        }
        return val;
    }, z.number().min(0, "Years Employed must be 0 or more")),
    annualIncome: z.preprocess(
        (value) => {
            if (typeof value === "string") {
                const numericValue = parseInt(value.replace(/,/g, ""), 10);
                return isNaN(numericValue) ? undefined : numericValue;
            }
            return value;
        },
        z.number().min(1, "Annual Income is required")
    ),
    creditScore: z.preprocess((val) => {
        if (typeof val === "string") {
            const parsed = parseFloat(val);
            return isNaN(parsed) ? null : parsed; // Return `null` for invalid numbers
        }
        return val;
    }, z.number().min(0, "Address years must be 0 or more")),
    mailingAddressCurrentAddress: z.string().min(1, "This field is required"),
    mailingStreetAddress: z.string().optional(),
    mailingCity: z.string().optional(),
    mailingState: z.string().optional(),
    mailingZip: z.string().optional(),

    employerOtherStreetAddress: z.string().optional(),
    employerOtherCity: z.string().optional(),
    employerOtherState: z.string().optional(),
    employerOtherZip: z.string().optional(),

    currentAddressYears: z.string().min(1, "This field is required"),

}).refine((data) => {
    if (data.employerAddress === "Other") {
        return (
            data.employerOtherStreetAddress &&
            data.employerOtherCity &&
            data.employerOtherState &&
            data.employerOtherZip
        );
    }
    return true;
}, {
    message: "If Employer Address is 'Other', all employee address fields are required",
    path: ["employerStreetAddress", "employerCity", "employerState", "employerZip"],
}).refine((data) => {
    if (data.mailingAddressCurrentAddress.toLowerCase() === "no") {
        return (
            data.mailingStreetAddress &&
            data.mailingCity &&
            data.mailingState &&
            data.mailingZip
        );
    }
    return true;
}, {
    message: "Mailing address is required if 'Mailing Address Same as Current Address' is 'No'",
    path: ["mailingStreetAddress", "mailingCity", "mailingState", "mailingZip"],
});




export const declarationsSchema = z.object({
    primaryResidence: z.string().refine((value) => value === "no", {
        message:
            "Lend with Aloha only provides financing for non-owner-occupied investment properties. Primary Residences are ineligible for financing through Lend with Aloha.",
    }),
});




export const uploadDocumentsSchema = z.object({
    idFile: z.object({
        name: z.string().min(1, "File name is required"), // Validate the file name
        content: z.string().min(1, "File should be in PDF"), // Validate the file type (e.g., image/jpeg)
        size: z.number().min(1, "File size must be greater than 0") // Validate the file size
    }).refine(data => data.size > 0, {
        message: "File size must be greater than 0", // Custom validation message
    }),
});







export const teamPreferencesSchema = z.object({
    closingAgent: z.string().min(1, "Closing Agent is required"),
    insuranceAgent: z.string().min(1, "Insurance Agent is required"),
});

export const realEstateScheduleSchema = z.object({
    propertyStreetAddress: z.string().min(1, "Property Street Address is required"),
    propertyCity: z.string().min(1, "Property City is required"),
    propertyState: z.string().min(1, "Property State is required"),
    propertyZip: z.string().min(1, "Property Zip is required"),
    propertyType: z.string().min(1, "Property Type is required"),
    entityVesting: z.string().min(1, "Entity Vesting is required"),
    ownershipPercentage: z.number().min(0, "Ownership Percentage is required"),
    investmentStrategy: z.string().optional(),
    acquisitionDate: z.string().optional(),
    acquisitionPrice: z.number().optional(),
    contractPrice: z.number().optional(),
    coe: z.string().optional(),
    budgetCompleted: z.boolean().optional(),
    marketValue: z.number().optional(),
    loanBalance: z.number().optional(),
    rentalIncome: z.number().optional(),
});

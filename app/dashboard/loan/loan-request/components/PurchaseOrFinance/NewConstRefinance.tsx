import React from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import CommaSeparatedTextField from "../common/AmountField";
import TwoOptionRadio from "../TwoOptionRadioProps";

interface NewConstructRefinanceFormProps {
    formData: Record<string, any>;
    onChange: (field: string, value: any) => void;
}

const NewConstructRefinanceForm: React.FC<NewConstructRefinanceFormProps> = ({ formData, onChange }) => {
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field, event.target.value);
    };

    return (
        <Box sx={{ p: 4, gap: 4 }}>
            <Grid container spacing={3}>
                {/* Purchase Price */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Purchase price
                    </Typography>
                    <CommaSeparatedTextField />
                </Grid>

                {/* Close of Escrow */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Close of Escrow
                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Enter Here",
                        }}
                    />
                </Grid>
            </Grid>


            <div className="flex items-center gap-8 my-4">
                <Typography variant="subtitle1" >
                    Are you purchasing or refinancing the property?
                </Typography>
                <TwoOptionRadio
                    optionOneLabel="Yes"
                    optionTwoLabel="No"
                    optionOneComponent={
                        <div
                        />
                    }
                    optionTwoComponent={
                        <div
                        />
                    }
                />
            </div>

            <Grid item xs={12} sm={12} sx={{ pb: 4 }}>
                <Typography variant="body2" color="textSecondary" mb={1}>
                    Site Value

                </Typography>
                <TextField
                    fullWidth
                    type="text"
                    value={formData.closeOfEscrow}
                    onChange={handleInputChange("closeOfEscrow")}
                    InputProps={{
                        placeholder: "Enter Here",
                    }}
                />
                <span>Enter the value of the land alone, excluding any structures on the property, especially if the current structure will be demolished for new construction.</span>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <div className="flex gap-2 items-center"><Typography variant="body2" color="textSecondary" mb={1}>
                        Soft Costs Completed
                    </Typography>
                    </div>
                    <CommaSeparatedTextField />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div className="flex gap-2 items-center"><Typography variant="body2" color="textSecondary" mb={1}>
                        Soft Costs Completed

                    </Typography>
                    </div>
                    <CommaSeparatedTextField />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Soft Costs Remaining

                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        value={formData.closeOfEscrow}
                        onChange={handleInputChange("closeOfEscrow")}
                        InputProps={{
                            placeholder: "Enter Here",
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                        Hard Costs Remaining

                    </Typography>
                    <CommaSeparatedTextField />

                </Grid>
            </Grid>



        </Box>
    );
};

export default NewConstructRefinanceForm;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateApplication } from "@/store/slice/csm/applicationsSlice"; // Correct import path
import {
  Drawer,
  TextField,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

type PropertyData = {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  entity: string;
  percentageOwnership: number;
  investmentStrategy: string;
  acquisitionDate: string; // Date in string format (YYYY-MM-DD)
  acquisitionPrice: number;
  status: string;
  isBudgetCompleted: boolean;
  budgetReason: string;
  isRented: boolean;
  rentalIncome: number;
  isTiedToLoan: boolean;
  loanBalance: number;
  contractPrice: number;
  currentMarketValue: number;
};

type PropertyUpdateDrawerProps = {
  visible: boolean;
  onClose: () => void;
  propertyData: PropertyData;
};

const PropertyUpdateDrawer: React.FC<PropertyUpdateDrawerProps> = ({
  visible,
  onClose,
  propertyData,
}) => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<PropertyData>(propertyData);

  useEffect(() => {
    setFormValues(propertyData);
  }, [propertyData]);

  const handleChange = (field: keyof PropertyData, value: string | number | boolean) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateApplication(formValues)); // Dispatch update action with form data
    onClose(); // Close the drawer
  };

  return (
    <Drawer anchor="right" open={visible} onClose={onClose} PaperProps={{ sx: { width: "50%" } }}>
      <form onSubmit={handleSubmit} className="p-6">
        <Typography variant="h6" className="text-xl font-semibold mb-4">
          Updating Property
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Address</Typography>
            <TextField
              fullWidth
              value={formValues.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>City</Typography>
            <TextField
              fullWidth
              value={formValues.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>State</Typography>
            <TextField
              fullWidth
              value={formValues.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Zip</Typography>
            <TextField
              fullWidth
              value={formValues.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Property Type</Typography>
            <TextField
              fullWidth
              select
              value={formValues.propertyType}
              onChange={(e) => handleChange("propertyType", e.target.value)}
            >
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
              <MenuItem value="Industrial">Industrial</MenuItem>
              <MenuItem value="Land">Land</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" className="mt-4 mb-2">
          Ownership and Strategy
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Entity/Vesting</Typography>
            <TextField
              fullWidth
              value={formValues.entity}
              onChange={(e) => handleChange("entity", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Percentage of Ownership</Typography>
            <TextField
              type="number"
              fullWidth
              value={formValues.percentageOwnership}
              onChange={(e) => handleChange("percentageOwnership", parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Investment Strategy</Typography>
            <TextField
              fullWidth
              select
              value={formValues.investmentStrategy}
              onChange={(e) => handleChange("investmentStrategy", e.target.value)}
            >
              <MenuItem value="Hold">Hold</MenuItem>
              <MenuItem value="Flip">Flip</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" className="mt-4 mb-2">
          Property Financial Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Acquisition Date</Typography>
            <TextField
              type="date"
              fullWidth
              value={formValues.acquisitionDate}
              onChange={(e) => handleChange("acquisitionDate", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Acquisition Price</Typography>
            <TextField
              type="number"
              fullWidth
              value={formValues.acquisitionPrice}
              onChange={(e) => handleChange("acquisitionPrice", parseFloat(e.target.value))}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" className="mt-4 mb-2">
          Budget and Loan Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              <Typography>Budget Completed</Typography>
              <RadioGroup
                row
                value={formValues.isBudgetCompleted ? "true" : "false"}
                onChange={(e) => handleChange("isBudgetCompleted", e.target.value === "true")}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
              {!formValues.isBudgetCompleted && (
                <TextField
                  label="Budget Reason"
                  fullWidth
                  value={formValues.budgetReason}
                  onChange={(e) => handleChange("budgetReason", e.target.value)}
                />
              )}
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2} marginTop={2}>
              <Typography>Is this property rented?</Typography>
              <RadioGroup
                row
                value={formValues.isRented ? "true" : "false"}
                onChange={(e) => handleChange("isRented", e.target.value === "true")}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
              {formValues.isRented && (
                <TextField
                  label="Rental Income"
                  type="number"
                  fullWidth
                  value={formValues.rentalIncome}
                  onChange={(e) => handleChange("rentalIncome", parseFloat(e.target.value))}
                />
              )}
            </Box>

            <Box display="flex" justifyContent="space-between" gap={2} marginTop={2}>
              <Typography>Is this property tied to a loan?</Typography>
              <RadioGroup
                row
                value={formValues.isTiedToLoan ? "true" : "false"}
                onChange={(e) => handleChange("isTiedToLoan", e.target.value === "true")}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
              {formValues.isTiedToLoan && (
                <TextField
                  label="Loan Balance"
                  type="number"
                  fullWidth
                  value={formValues.loanBalance}
                  onChange={(e) => handleChange("loanBalance", parseFloat(e.target.value))}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={6}>
            <Typography>Contract Price</Typography>
            <TextField
              type="number"
              fullWidth
              value={formValues.contractPrice}
              onChange={(e) => handleChange("contractPrice", parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Current Market Value</Typography>
            <TextField
              type="number"
              fullWidth
              value={formValues.currentMarketValue}
              onChange={(e) => handleChange("currentMarketValue", parseFloat(e.target.value))}
            />
          </Grid>
        </Grid>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="mr-4" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" className="bg-blue-500 text-white">
            Update
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default PropertyUpdateDrawer;

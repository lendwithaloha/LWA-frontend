"use client";

import { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
  Tooltip,
  IconButton,
  Switch,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RefinanceForm from "./forms/refinance-form";
import PurchaseForm from "./forms/purchase-from";
import PropertyType from "./forms/property-type";
import MaxLeverage from "./forms/max-leverage";
import { UploadZone } from "@/components/upload-zone";

export interface LoanQueryFormData {
  purchaseType: string;
  originalPrice: string;
  propertyUnderContract: "yes" | "no";
  purchasePrice: string;
  closeOfEscrow: string;
  estimatedValue: string;
  currentBalance: string;
  totalBedrooms: number;
  afterBedrooms?: number;
  totalBathrooms: number;
  afterBathrooms?: number;
  improvements: string;
  streetAddress: string;
  cityStateZip: string;
  layoutChanges: string;
  totalUnits: string;
  totalADUs: string;
  afterUnits: string;
  afterADUs: string;
  maxLeverage: boolean;
  specificLTV: string;
  specificLoanAmount: string;
  financeMortgage: string;
  creditScore: string;
  concerns: string;
  accountTypes: Array<{
    type: string;
    amount: string;
  }>;
  upcomingLiquidity: string;
}

export default function LoanApplication() {
  const [formData, setFormData] = useState<LoanQueryFormData>({
    purchaseType: "refinance",
    propertyUnderContract: "yes",
    purchasePrice: "",
    closeOfEscrow: "",
    originalPrice: "",
    totalBedrooms: 4,
    totalBathrooms: 2,
    estimatedValue: "",
    currentBalance: "",
    improvements: "",
    streetAddress: "",
    cityStateZip: "",
    layoutChanges: "no",
    totalUnits: "2",
    totalADUs: "2",
    afterUnits: "",
    afterADUs: "",
    maxLeverage: false,
    specificLTV: "",
    specificLoanAmount: "",
    financeMortgage: "no",
    creditScore: "",
    concerns: "",
    accountTypes: [{ type: "cash", amount: "" }],
    upcomingLiquidity: "no",
  });

  const handleChange =
    (name: keyof LoanQueryFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [name]: event.target.value }));
    };

  const handleSwitchChange =
    (name: keyof LoanQueryFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [name]: event.target.checked }));
      console.log(formData.maxLeverage);
    };

  const handleAccountChange = (
    index: number,
    field: "type" | "amount",
    value: string
  ) => {
    const newAccounts = [...formData.accountTypes];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setFormData((prev) => ({ ...prev, accountTypes: newAccounts }));
  };

  const addAccount = () => {
    setFormData((prev) => ({
      ...prev,
      accountTypes: [...prev.accountTypes, { type: "", amount: "" }],
    }));
  };

  const removeAccount = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      accountTypes: prev.accountTypes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-3">
        <Typography component="legend" className="text-lg font-medium mb-4">
          Are you purchasing or refinancing the property?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            name="purchaseType"
            value={formData.purchaseType}
            onChange={handleChange("purchaseType")}
          >
            <FormControlLabel
              value="purchase"
              control={<Radio />}
              label="Purchase"
            />
            <FormControlLabel
              value="refinance"
              control={<Radio />}
              label="Refinance"
            />
          </RadioGroup>
        </FormControl>
        {formData.purchaseType === "refinance" ? (
          <RefinanceForm formData={formData} handleChange={handleChange} />
        ) : (
          <PurchaseForm formData={formData} handleChange={handleChange} />
        )}

        <div className="space-y-4 pt-7">
          <h3 className="text-lg font-medium">Property Address</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <p>Street Address</p>
              <TextField
                fullWidth
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange("streetAddress")}
                placeholder="Enter here"
              />
            </div>
            <div className="flex flex-col gap-3 ">
              <p>City/State/ZIP</p>
              <TextField
                fullWidth
                name="cityStateZip"
                value={formData.cityStateZip}
                onChange={handleChange("cityStateZip")}
                placeholder="Enter here"
              />
            </div>
          </div>
        </div>
        <FormControl component="fieldset">
          <Typography className="text-lg font-medium my-4 ">
            Are you going to be making any changes to the layout/floorplan
            and/or adding square footage?
          </Typography>
          <RadioGroup
            row
            name="layoutChanges"
            value={formData.layoutChanges}
            onChange={handleChange("layoutChanges")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <PropertyType formData={formData} handleChange={handleChange} />
        <MaxLeverage
          formData={formData}
          handleChange={handleChange}
          handleSwitchChange={handleSwitchChange}
        />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">
              Do you want to finance your mortgage payments?
            </span>
            <Tooltip title="Information about financing mortgage payments">
              <IconButton size="small">
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>

          <RadioGroup
            row
            name="financeMortgage"
            value={formData.financeMortgage}
            onChange={handleChange("financeMortgage")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-sm font-medium">
                Estimated Credit Score
              </span>
              <Tooltip title="Your estimated credit score">
                <IconButton size="small">
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <TextField
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange("creditScore")}
              placeholder="Enter here"
            />
          </div>
        </div>
        <div className="space-y-4 pt-5">
          <span className="text-sm font-medium">
            Are there any concerns you have that may impact our ability to close
            this loan?
          </span>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="concerns"
            value={formData.concerns}
            onChange={handleChange("concerns")}
            placeholder="Enter here"
          />
        </div>
        <div className="space-y-4 pt-5">
          <h3 className="text-lg font-medium">
            Supporting Documents (optional)
          </h3>
          <p className="text-sm text-gray-600">
            Upload any additional documents to support your loan inquiry.
          </p>
          <UploadZone
            title={""}
            onUploadComplete={function (
              fileName: string,
              fileId: string
            ): void {}}
            isUploaded={false}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Liquidity</h3>
          <div className="space-y-6">
            <h4 className="text-base font-medium">Account Types</h4>
            {formData.accountTypes.map((account, index) => (
              <div key={index} className="flex gap-4 items-start mb-3">
                <div className="flex-1 flex gap-3 items-center ">
                  <Select
                    value={account.type}
                    onChange={(e) =>
                      handleAccountChange(index, "type", e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Choose</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="stocks">Stocks</MenuItem>
                    <MenuItem value="crypto">Crypto</MenuItem>
                  </Select>
                  <TextField
                    fullWidth
                    label="Total Amount"
                    value={account.amount}
                    onChange={(e) =>
                      handleAccountChange(index, "amount", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </div>
                {index > 0 && (
                  <IconButton
                    onClick={() => removeAccount(index)}
                    color="error"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </div>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addAccount}
              variant="outlined"
              fullWidth
            ></Button>
          </div>
        </div>

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<MailOutlineIcon />}
          className="bg-primaryColor text-white "
        >
          Mark as ready for quote collection
        </Button>
      </div>
    </div>
  );
}

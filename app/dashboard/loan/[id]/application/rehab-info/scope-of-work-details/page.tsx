"use client";

import React, { useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Button,
} from "@mui/material";
import {  updateLineItemById,markFormCompleted, LineItem } from "@/store/slice/rehabInformationSlices/lineItemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const ScopeOfWorkDetails: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {lineItems,subtotal,contingency,totalCost } = useSelector((state: RootState) => state.lineItem);


 


  const handleInputChange = (
    id: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    // const updatedLineItems = [...lineItems];
    // (updatedLineItems[index] as any)[field] = value;
    // setLineItems(updatedLineItems);
    dispatch(updateLineItemById({id,field,value}))
  };

  const handleSave = () => {
    dispatch(markFormCompleted());
  };

  useEffect(()=>{
  },[lineItems])



  return (
    <div className="bg-gray-50 py-8 px-4 min-h-screen max-w-[1200px] mx-auto">
      {/* Title */}
      <Typography variant="h4" className="font-heading text-gray-800 mb-6">
        Scope of Work Details
      </Typography>

      {/* Description */}
      <Typography variant="body1" className="text-gray-600 mb-4">
        A complete scope of work is required before your loan can be fully
        processed. Missing information will result in slower review and
        processing times. Note that a contingency of 5% or $1,000 (whichever
        greater) is required on all projects.
      </Typography>
      <Typography variant="body2" className="text-gray-500 mb-4">
        If you add a new line item and/or reduce, or delete a line item, after
        the loan has closed, this change will require approval in order to
        reimburse. Report all possible line items and true costs to avoid a
        declined reimbursement.
      </Typography>

      {/* Desktop/Wider View Layout */}
      <Box
        className="grid md:grid-cols-4 gap-4 px-4 md:p text-gray-600 font-medium mb-4 bg-gray-50 border md:border-0"
        style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}
      >
        {/* Line Item */}
        <Typography
          className="text-left "
        >
          Line Item
        </Typography>

        {/* Budget */}
        <Typography
          className="text-left md:pl-4"
        >
          Budget
        </Typography>

        {/* Description */}
        <Typography
          className="text-left md:pl-4"
        >
          Description
        </Typography>

        {/* Info */}
        <Typography
          className="text-left md:pl-6"
        >
          Info
        </Typography>
      </Box>



      {lineItems.map((item, index) => (
        <div key={index}>
          {/* Mobile View */}
          <Box
            key={item.id}
            className="block md:hidden p-4 border rounded-lg mb-4 bg-gray-50 shadow"
            style={{
              border: '1px solid #ddd',
              marginBottom: '16px',
            }}
          >
            <Typography
              className="font-semibold text-gray-800 mb-2"
              style={{ fontSize: '1rem' }}
            >
              {String(item.id).padStart(2, '0')}. {item.title}
            </Typography>

            {/* Description */}
            <Box
              className="border-t pt-2 mt-2"
              style={{
                borderTop: '1px solid #ddd',
              }}
            >
              <Typography className="text-gray-800 font-semibold mb-2">
                Description
              </Typography>
              {item.descriptionType === 'options' ? (
                <FormControl>
                  <RadioGroup
                    value={item.selectedDescription}
                    onChange={(e) =>
                      handleInputChange(item.id, 'selectedDescription', e.target.value)
                    }
                  >
                    {item.descriptionOptions?.map((option, optIndex) => (
                      <FormControlLabel
                        key={optIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : (
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={item.descriptionValue}
                  onChange={(e) =>
                    handleInputChange(item.id, 'descriptionValue', e.target.value)
                  }
                  variant="outlined"
                />
              )}
            </Box>

            {/* Budget */}
            <Box
              className="border-t pt-2 mt-2"
              style={{
                borderTop: '1px solid #ddd',
              }}
            >
              <Typography className="text-gray-800 font-semibold mb-2">
                Budget
              </Typography>
              <TextField
                label="Amount"
                fullWidth
                type="number"
                value={item.budget}
                onChange={(e) =>
                  handleInputChange(item.id, 'budget', Number(e.target.value))
                }
                variant="outlined"
              />
            </Box>

            {/* Tooltip */}
            <Box
              className="border-t pt-2 mt-2"
              style={{
                borderTop: '1px solid #ddd',
              }}
            >
              <Typography variant="body2" className="italic text-gray-500">
                {item.tooltip}
              </Typography>
            </Box>
          </Box>

          {/* Desktop/Wider View */}
          <Box
            key={`${item.id}-desktop`}
            className="hidden md:grid md:grid-cols-4 gap-8 items-start mb-6 border-b pb-4"
          >
            <Typography>{String(item.id).padStart(2, '0')} {item.title}</Typography>
            <TextField
              label="Amount"
              fullWidth
              type="number"
              value={item.budget}
              onChange={(e) =>
                handleInputChange(item.id, 'budget', Number(e.target.value))
              }
              variant="outlined"
            />
            {item.descriptionType === 'options' ? (
              <FormControl>
                <RadioGroup
                  value={item.selectedDescription}
                  onChange={(e) =>
                    handleInputChange(
                      item.id,
                      "selectedDescription",
                      e.target.value
                    )
                  }
                >
                  {item.descriptionOptions?.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={item.descriptionValue}
                onChange={(e) =>
                  handleInputChange(item.id, "descriptionValue", e.target.value)
                }
                variant="outlined"
              />
            )}
            <Tooltip title={item.tooltip} placement="top">
              <Typography
                variant="body2"
                className="italic text-gray-500 hidden md:block"
              >
                {item.tooltip}
              </Typography>
            </Tooltip>
          </Box>
        </div>
      ))}

    {/* Summary */}
<Box className="mt-8 bg-gray-50 border rounded-lg p-4 space-y-4 max-w-md ">
  {/* Subtotal */}
  <Box className="border rounded-lg p-4">
    <Typography
      variant="h6"
      className="text-gray-800 mb-1 text-center"
      style={{ fontWeight: 600 }}
    >
      Subtotal
    </Typography>
    <Typography
      variant="body1"
      className="text-gray-600 text-center"
      style={{ fontSize: '1.2rem', fontWeight: 500 }}
    >
      ${subtotal.toFixed(2)}
    </Typography>
  </Box>

  {/* Contingency */}
  <Box className="border rounded-lg p-4">
    <Typography
      variant="h6"
      className="text-gray-800 mb-1 text-center"
      style={{ fontWeight: 600 }}
    >
      Contingency
    </Typography>
    <Typography
      variant="body2"
      className="text-gray-600 text-center"
      style={{ fontSize: '1rem' }}
    >
      Percent: 5%
    </Typography>
    <Typography
      variant="body1"
      className="text-gray-600 text-center mt-2"
      style={{ fontSize: '1.2rem', fontWeight: 500 }}
    >
      = ${contingency.toFixed(2)}
    </Typography>
  </Box>

  {/* Total Construction Cost */}
  <Box className="border rounded-lg p-4">
    <Typography
      variant="h6"
      className="text-gray-800 mb-1 text-center"
      style={{ fontWeight: 600 }}
    >
      Total Construction Cost
    </Typography>
    <Typography
      variant="body1"
      className="text-gray-600 text-center"
      style={{ fontSize: '1.2rem', fontWeight: 500 }}
    >
      ${totalCost.toFixed(2)}
    </Typography>
  </Box>

  {/* Submit Button */}
  <div className="flex justify-center mt-4">
    <Button
      variant="contained"
      color="primary"
      className="bg-primary hover:bg-primary-dark w-full md:w-auto"
      onClick={handleSave}
    >
      Submit for Review
    </Button>
  </div>
</Box>


    </div>
  );
};

export default ScopeOfWorkDetails;

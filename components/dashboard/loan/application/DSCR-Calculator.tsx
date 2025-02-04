// src/components/DSCRCalculator.tsx
"use client"
import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Import RootState to type state
import { calculateDSCR, markComplete } from '@/store/slice/dscrSlice';

const DSCRCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const { rentalIncome, insurance, taxes, hoaFee, principalInterest, dscr } = useSelector(
    (state: RootState) => state.dscrCalculator  // Update to 'dscrCalculator'
  );
  

  // Calculate DSCR when any dependent state changes
  useEffect(() => {
    dispatch(calculateDSCR());
  }, [rentalIncome, insurance, taxes, hoaFee, principalInterest, dispatch]);

  // Handle save button click
  const handleSave = () => {
    dispatch(markComplete());
    alert("Task marked as complete");
  };


  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '20px auto',
        padding: '16px',
        alignContent: 'left',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
          Calculate the Property&apos;s Debt Service Coverage Ratio
        </Typography>
        <Button
          variant="outlined"
          startIcon={<InfoIcon />}
          sx={{
            borderColor: '#ccc',
            color: '#000',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          onClick={() => alert('Learn more about DSCR')}
        >
          Learn About DSCR
        </Button>
      </Box>

      {/* Intro Text */}
      <Typography variant="body2" sx={{ color: '#000', marginBottom: 2 }}>
        Please enter the financial estimates for your client&apos;s rental property.
      </Typography>

      <Typography variant="body2" sx={{ color: '#000', marginBottom: 2 }}>
        <strong>Principal & Interest Payment:</strong> $1,432.57/month <br />
        <strong>Loan Amount:</strong> $210,000 <br />
        <strong>Leverage:</strong> 75.00%
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      {/* Rental Income */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body2" sx={{ color: '#000', marginBottom: 1 }}>
          Estimated Monthly Rental Income
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={`$${rentalIncome}`}
          InputProps={{
            readOnly: true,
            style: { backgroundColor: '#f5f5f5', color: '#000' },
          }}
        />
      </Box>

      {/* Expenses */}
      <Typography variant="body1" sx={{ marginBottom: 2, color: '#000' }}>
        <strong>Estimated Expenses</strong>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 'calc(33.33% - 16px)' }}>
          <Typography variant="body2" sx={{ marginBottom: 1, color: '#000' }}>
            Annual property insurance
          </Typography>
          <TextField
            variant="outlined"
            value={`$${insurance}`}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f5f5f5', color: '#000' },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 'calc(33.33% - 16px)' }}>
          <Typography variant="body2" sx={{ marginBottom: 1, color: '#000' }}>
            Annual property taxes
          </Typography>
          <TextField
            variant="outlined"
            value={`$${taxes}`}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f5f5f5', color: '#000' },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 'calc(33.33% - 16px)' }}>
          <Typography variant="body2" sx={{ marginBottom: 1, color: '#000' }}>
            Monthly HOA fee
          </Typography>
          <TextField
            variant="outlined"
            value={`$${hoaFee}`}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f5f5f5', color: '#000' },
            }}
          />
        </Box>
      </Box>

      {/* DSCR Calculation */}
      <Typography variant="body2" sx={{ color: '#000', marginBottom: 3 }}>
        <strong>Estimated DSCR Calculation:</strong> {dscr.toFixed(2)}
      </Typography>

      {/* Save Button */}
      <Button
        variant="contained"
        sx={{
          color: '#fff',
          width: '200px', // Small width
          textAlign: 'center',
        }}
        onClick={handleSave}
      >
        Save and Continue
      </Button>
    </Box>
  );
};

export default DSCRCalculator;

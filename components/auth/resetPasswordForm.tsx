"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useResetPasswordMutation } from "@/store/slice/authSlices/authSlices"; // Adjust the import path
import { toast } from "react-toastify";


interface FormData {
  newPassword: string;
  confirmPassword: string;
}

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Using the RTK Query mutation
  const [resetPassword, { isLoading, isError }] =
    useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FormData) => {
    try {
     await resetPassword({
        token,
        password: {
          password: data.newPassword,
          confirm_password: data.confirmPassword,
        },
      }).unwrap();
      toast.success("Password reset successfully!");

      router.push("/reseted");
    } catch (err) {
      toast.error("An error occurred while resetting the password");
      console.error("Reset password error:", err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ py: { xs: 2, sm: 4 } }}
      className="h-screen flex justify-center items-center"
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: "2px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#EEF0F2",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 1.5 }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Image
              src="/images/mail.png"
              alt="Mail"
              width={isMobile ? 40 : 60}
              height={isMobile ? 40 : 60}
            />
            <Typography variant={isMobile ? "h6" : "h5"}>
              Lend with Aloha
            </Typography>
          </Box>
          <Divider />
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              lineHeight: 1.6,
              mt: 1,
            }}
          >
            Create a strong password
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                sx={{ mb: 3, mt: 1 }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "The passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 2, mt: 1 }}
              />
            )}
          />

          {isError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {"An error occurred while resetting the password"}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1.5,
              backgroundColor: "black",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              textTransform: "none",
              mb: 3,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

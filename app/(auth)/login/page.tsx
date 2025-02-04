"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSigninMutation } from "@/store/slice/authSlices/authSlices";

import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/user/userSlice";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { toast } from "react-toastify";

import { setTokens } from "@/utils/cookie";
import { setUserData } from "@/utils/localStorage";
const Login = () => {
  const [login, { isLoading }] = useSigninMutation();

  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    const errors = { username: "", password: "" };
    let isValid = true;

    // PhoneNUmber validation: Required and at least 5 characters
    if (!formData.username.trim()) {
      errors.username = "PhoneNumber is required.";
      isValid = false;
    } else if (formData.username.length < 9) {
      errors.username = "PhoneNumber must be at least 5 characters.";
      isValid = false;
    }

    // Password validation: Required and at least 6 characters
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for the field being edited
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await login(formData).unwrap();

      const {
        access_token,
        refresh_token,

        id,
        first_name,
        last_name,
        email,
        phone_number,
        username,
        role
      } = response;

      const userData = {
        id,
        first_name,
        last_name,
        email,
        phone_number,
        username,
        role,
      };

      setUserData(userData);
      setTokens(access_token, refresh_token);

      dispatch(
        setUser({
          user: userData,
          accessToken: access_token,
          refreshToken: refresh_token,
        })
      );

      toast.success("Login successful!");
      if (role === "borrower") {
        router.push("/dashboard");
      } else {
        router.push("/admin-dashboard");

      }
      setFormData({
        username: "",
        password: "",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error.data?.extra?.join(", ") || error.data?.error || "Login failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
        }}
      >
        <Paper
          // elevation={3}
          sx={{
            p: 4,
            borderRadius: "2px",
            // boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            backgroundColor: "#FFFFF2",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 1.5 }}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Image
                src="/images/loha.png"
                alt="Mail"
                width={60}
                height={60}
                className="mb-2"
              />
              <Typography className="text-primaryColor" variant="h5">Lend with Aloha</Typography>
            </Box>
            <Divider />
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1rem",
                lineHeight: 1.6,
                mt: 1,
              }}
            >
              Sign In
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Phone/Email</label>
            <TextField
              id="username"
              variant="outlined"
              fullWidth
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
              sx={{
                mb: 3,
                mt: 1,
              }}
            />
            <label htmlFor="password">Password</label>
            <TextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              sx={{
                mb: 1,
                mt: 1,
              }}
            />
            <Link href="/reset">
              <Typography className="text-primaryColor hover:underline underline-offset-4" sx={{ mb: 2, justifySelf: "end" }}>
                Forgot password ?
              </Typography>
            </Link>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              className="bg-primaryColor"
              sx={{
                py: 1.5,
                // backgroundColor: "black",
                fontSize: "1rem",
                textTransform: "none",
                mb: 3,
              }}
            >
              {isLoading ? <ClipLoader color="white" size={24} /> : "Login"}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primaryColor hover:underline underline-offset-2"
              // style={{textDecoration: "none" }}
              >
                Create Account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;

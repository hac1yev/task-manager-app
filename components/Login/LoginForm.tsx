"use client";

import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { Card } from "../MaterialSnippets/MaterialSnippets";

const LoginForm = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [isProcessing,setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userInfo = {
        email: data.get("email"),
        password: data.get("password"),
    };    

    setIsProcessing(true);
    try {
        const response = await axios.post("/api/login", JSON.stringify(userInfo), {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        const user_data: {
          accessToken: string;
          role: string;
        } = {
          accessToken: response.data.accessToken,
          role: response.data.role
        };

        localStorage.setItem("userInfo", JSON.stringify(user_data));

        if(response.status === 200) {
          window.location.reload();        
        }
        
    } catch (error) {
        console.log(error);
    }
    setIsProcessing(false);
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "email" }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <Link href="/" style={{ alignSelf: "baseline" }}>
          Forgot your password?
        </Link>
        <Button
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Submit'}
        </Button>
      </Box>
    </Card>
  );
};

export default LoginForm;

import React, { useState } from "react";
import logo from "../Images/live-chat_512px.png";
import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = useState("");
  const [signInStatus, setSignInStatus] = useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    setLoading(true);
    try {
      const config = { headers: { "Content-type": "application/json" } };
      const response = await axios.post(
        "http://localhost:8080/user/login/",
        data,
        config
      );
      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
      setLoading(false);
    }
  };

  const signUpHandler = async () => {
    if (!data.name || !data.email || !data.password) {
      setSignInStatus({ msg: "All fields are required", key: Math.random() });
      return;
    }

    setLoading(true);
    try {
      const config = { headers: { "Content-type": "application/json" } };
      const response = await axios.post(
        "http://localhost:8080/user/register/",
        data,
        config
      );
      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      // Check for specific errors like email or username already taken
      if (error.response && error.response.status === 405) {
        setSignInStatus({
          msg: "User with this email ID already exists",
          key: Math.random(),
        });
      } else if (error.response && error.response.status === 406) {
        setSignInStatus({
          msg: "User name already taken, please choose another one",
          key: Math.random(),
        });
      } else {
        setSignInStatus({
          msg: "An error occurred during sign up",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Box
        sx={{
          background: "linear-gradient(135deg, #62E1FB 30%, #8EEABA 90%)",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: { xs: "100%", md: "80%", lg: "90vw" },
            height: { xs: "100%", lg: "90vh" },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          {/* Left side - Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "80%",
                maxWidth: "250px",
              }}
            />
          </Grid>

          {/* Right side - Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showLogin ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Login to your Account
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={changeHandler}
                  label="Enter User Name"
                  variant="outlined"
                  color="primary"
                  name="name"
                  onKeyDown={(event) => {
                    if (event.code === "Enter") loginHandler();
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={changeHandler}
                  label="Password"
                  type="password"
                  variant="outlined"
                  color="primary"
                  name="password"
                  onKeyDown={(event) => {
                    if (event.code === "Enter") loginHandler();
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#62E1FB",
                    ":hover": { backgroundColor: "#8EEABA" },
                    marginTop: "20px",
                  }}
                  onClick={loginHandler}
                >
                  Login
                </Button>
                <Typography variant="body2" mt={2}>
                  Don't have an account?{" "}
                  <span
                    style={{ color: "#62E1FB", cursor: "pointer" }}
                    onClick={() => setShowLogin(false)}
                  >
                    Sign Up
                  </span>
                </Typography>
                {logInStatus && <Toaster key={logInStatus.key} message={logInStatus.msg} />}
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  Create your Account
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={changeHandler}
                  label="Enter User Name"
                  variant="outlined"
                  color="primary"
                  name="name"
                  onKeyDown={(event) => {
                    if (event.code === "Enter") signUpHandler();
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={changeHandler}
                  label="Enter Email Address"
                  variant="outlined"
                  color="primary"
                  name="email"
                  onKeyDown={(event) => {
                    if (event.code === "Enter") signUpHandler();
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  onChange={changeHandler}
                  label="Password"
                  type="password"
                  variant="outlined"
                  color="primary"
                  name="password"
                  onKeyDown={(event) => {
                    if (event.code === "Enter") signUpHandler();
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#8EEABA",
                    ":hover": { backgroundColor: "#62E1FB" },
                    marginTop: "20px",
                  }}
                  onClick={signUpHandler}
                >
                  Sign Up
                </Button>
                <Typography variant="body2" mt={2}>
                  Already have an account?{" "}
                  <span
                    style={{ color: "#62E1FB", cursor: "pointer" }}
                    onClick={() => setShowLogin(true)}
                  >
                    Log in
                  </span>
                </Typography>
                {signInStatus && <Toaster key={signInStatus.key} message={signInStatus.msg} />}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;

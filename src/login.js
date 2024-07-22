import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState();
  const [mainOtp, setmainOtp] = useState();
  const [otpChecker, setOtpChecker] = useState({
    validateMobile: true,
    otpSent: false,
    changePass: false,
  });

  const handleSubmit = () => {
    axios
      .post("https://mail-backend-ytfz.onrender.com/user/login", values)
      .then((res) => {
        navigate("/home");
        localStorage.setItem("userData", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        alert(`${err.response.data.msg}`);
      });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const sendMobile = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.email && emailPattern.test(user.email)) {
      axios
        .post("https://mail-backend-ytfz.onrender.com/otpLogin", {
          email: user.email,
        })
        .then((res) => {
          setOtp(res.data.otp);
          setOtpChecker({ validateEmail: false, otpSent: true });
        })
        .catch((err) => {
          alert(`${err.response.data.msg}`);
        });
    } else {
      alert("Enter a valid email address");
    }
  };

  const checkOtp = () => {
    if (mainOtp === otp) {
      setOtpChecker({
        validateMobile: false,
        otpSent: false,
        changePass: true,
      });
    } else {
      alert("Please enter correct OTP");
    }
  };

  const changePassword = () => {
    axios
      .put("https://mail-backend-ytfz.onrender.com/user/setup", user)
      .then((response) => {
        alert("Password changed successfully");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username or Email"
                onChange={(e) => {
                  setValues({ ...values, username: e.target.value });
                }}
              />

              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={(e) => {
                    setValues({ ...values, password: e.target.value });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                    onClick={handleOpen}
                  >
                    Forgot password?
                  </Link>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={style}
                      className="d-flex justify-content-center flex-column align-items-center"
                    >
                      <Grid className="d-flex justify-content-center align-items-center flex-column">
                        {/* TO SEND OTP  */}
                        {otpChecker.validateMobile && (
                          <div>
                            <h4 className=" mb-4">Account Recovery</h4>
                            <TextField
                              style={{ width: "350px" }}
                              label="Email"
                              id="outlined-start-adornment"
                              name="email"
                              autoComplete="email"
                              erorText="Please enter a valid email"
                              onChange={(e) => {
                                setUser({ ...user, email: e.target.value });
                              }}
                            />
                            <Button
                              variant="contained"
                              style={{ width: "150px" }}
                              className="mt-4"
                              onClick={sendMobile}
                            >
                              SEND OTP
                            </Button>
                          </div>
                        )}

                        {/* TO CHECK OTP  */}
                        {otpChecker.otpSent && (
                          <div>
                            <h4 className="fw-bold">Enter OTP recieved</h4>
                            <div className="d-flex justify-content-between mt-4">
                              <TextField
                                label="OTP"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="standard"
                                onChange={(e) => {
                                  setmainOtp(parseInt(e.target.value));
                                }}
                              />
                            </div>
                            <Button
                              variant="contained"
                              className="mt-4"
                              onClick={checkOtp}
                            >
                              VERIFY
                            </Button>
                          </div>
                        )}

                        {/* CHANGE PASSWORD  */}
                        {otpChecker.changePass && (
                          <div>
                            <Alert severity="success">OTP VERIFIED!</Alert>
                            <Grid className="d-flex flex-column">
                              <FormControl
                                variant="outlined"
                                style={{ width: "350px" }}
                                className="mt-4"
                              >
                                <InputLabel htmlFor="outlined-adornment-password">
                                  Password
                                </InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-password"
                                  type={
                                    values.showPassword ? "text" : "password"
                                  }
                                  value={user.password}
                                  onChange={(e) => {
                                    setUser({
                                      ...user,
                                      password: e.target.value,
                                    });
                                  }}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {values.showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Password"
                                />
                              </FormControl>
                              <Button
                                variant="contained"
                                className="mt-4"
                                onClick={changePassword}
                              >
                                Change Password
                              </Button>
                            </Grid>
                          </div>
                        )}
                      </Grid>
                    </Box>
                  </Modal>
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => {
                      navigate("/signup");
                    }}
                    variant="body2"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;

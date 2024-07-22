import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    OTP: "",
    username: "",
    password: "",
    showPassword: false,
  });

  const [otp, setOtp] = useState();
  const [checkOtp, setCheckOtp] = useState({
    statement: false,
    name: "Send OTP",
    state: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const [disableNum, setDisableNum] = useState(false);

  const checkPass = () => {
    if (values.OTP === otp) {
      setCheckOtp({ ...checkOtp, state: true });
      setDisableNum(true);
    } else {
      alert("Please enter correct OTP");
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const sendSms = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.email && emailRegex.test(values.email)) {
      axios
        .post("https://mail-backend-ytfz.onrender.com/otpRegister", {
          email: values.email,
        })
        .then((res) => {
          setOtp(res.data.otp);
          setCheckOtp({ statement: true, name: "Verify OTP" });
        })
        .catch((err) => {
          alert(`${err.response.data.msg}`);
        });
    } else {
      alert("Enter a valid email address");
    }
  };

  const handleSubmit = () => {
    checkOtp.state === true
      ? axios
          .post("https://mail-backend-ytfz.onrender.com/user/signup", {
            values,
          })
          .then((res) => {
            alert("Registered Successfully, Now login!");
            navigate("/login");
          })
          .catch((err) => {
            alert(`${err.response.data.msg}`);
          })
      : alert("Please verify the Email");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    onChange={(e) => {
                      setValues({ ...values, firstName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    autoComplete="family-name"
                    onChange={(e) => {
                      setValues({ ...values, lastName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    id="outlined-start-adornment"
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      readOnly: disableNum === true ? true : false,
                    }}
                    onChange={(e) => {
                      setValues({ ...values, email: e.target.value });
                    }}
                    erorText="Please enter correct email id"
                  />
                </Grid>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, ml: 2 }}
                  sm={4}
                  onClick={checkOtp.statement === true ? checkPass : sendSms}
                >
                  {checkOtp.name}
                </Button>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="OTP"
                    autoComplete="otp"
                    onChange={(e) => {
                      setValues({ ...values, OTP: parseInt(e.target.value) });
                    }}
                  />
                </Grid>

                {checkOtp.state === true && (
                  <div class="alert alert-success mt-3 ms-5" role="alert">
                    Verified!
                    <VerifiedIcon sx={{ ml: 1 }} />
                  </div>
                )}
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password" required>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    id="username"
                    autoComplete="username"
                    onChange={(e) => {
                      setValues({ ...values, username: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <div className="d-flex justify-content-between mb-5">
                <div>
                  <p
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="text-decoration-none text-secondary"
                    style={{ cursor: "pointer" }}
                  >
                    Already a user?
                  </p>
                </div>
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Signup;

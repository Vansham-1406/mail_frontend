import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StarRateIcon from "@mui/icons-material/StarRate";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import axios from "axios";
import Temp from "./temp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [nav, setNav] = useState(true);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [mess, setMess] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userData"));
    if (items) {
      setItems(items);
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

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

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`https://mail-backend-ytfz.onrender.com/message/getData?id=${items?.username}`)
      .then((response) => {
        setMess(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [items]);

  var today = new Date();
  const [messageDetails, setMessageDetails] = useState({
    From: "",
    To: "",
    Time: today,
    Saved: false,
    Deleted: false,
    Opened: false,
    Body: "",
    Subject: "",
  });

  const sendMessage = () => {
    axios
      .post("https://mail-backend-ytfz.onrender.com/message/data", {
        ...messageDetails,
        From: items?.username,
      })
      .then((response) => {
        if (response.data.msg === true) {
          alert("Message sent");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
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
    if (items?.email && emailPattern.test(items?.email)) {
      axios
        .post("https://mail-backend-ytfz.onrender.com/otpLogin", {
          email: items?.email,
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
        handleClose1();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {items?.firstName ? (
        <div>
          <div className={nav ? "mainNav" : "mainNav1"}>
            {nav ? (
              <div className="d-flex justify-content-between">
                <MenuIcon
                  className="fs-2 text-light ms-4 mt-3 mb-3 hamburger"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setNav(false);
                  }}
                />
                <h4 className="pt-3" style={{ color: "white" }}>
                  Welcome,{" "}
                  <span className="text-capitalize">{items?.firstName} </span>
                  <span className="text-capitalize">{items?.lastName} </span>
                </h4>
                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "80px", height: "40px", marginTop: "12px" }}
                  className="me-3"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("userData");
                    setItems([]);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <MenuOpenIcon
                  className="fs-2 mt-3 mb-3 menuPos"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setNav(true);
                  }}
                />
                <h4 className="pt-3" style={{ color: "white" }}>
                  Welcome,{" "}
                  {JSON.parse(localStorage.getItem("userData"))?.firstName ||
                    ""}{" "}
                  {JSON.parse(localStorage.getItem("userData"))?.lastName || ""}
                </h4>
                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "80px", height: "40px", marginTop: "12px" }}
                  className="me-3"
                  onClick={() => {
                    localStorage.removeItem("userData");
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
          <div className="d-flex position-relative">
            <div className={nav ? "navbar" : "navbar1"}>
              <div className="d-flex flex-column  position-absolute top-0">
                <div
                  className="mt-5 d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <HomeIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Dashboard</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/sent");
                  }}
                >
                  <MarkEmailReadIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Sent</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/saved");
                  }}
                >
                  <StarRateIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Saved</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/deleted");
                  }}
                >
                  <DeleteIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Deleted</p>}
                </div>
                <div
                  className="d-flex navbar_hover cursor_pointer"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <AccountBoxIcon className="fs-2 icon_color ms-3 me-4 mt-3 mb-3" />
                  {!nav && <p className="fs-6 fw-bold marg">Profile</p>}
                </div>
              </div>
              <div className="d-flex position-absolute mb-5 ms-3 bottom-0">
                <div className="icon_add">
                  <AddIcon onClick={handleOpen} />
                  <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={style}
                      className="d-flex flex-column justify-content-center align-items-center"
                    >
                      <h4 className="text-center fw-bold">Send a Message</h4>
                      <TextField
                        id="standard-basic"
                        label="To"
                        variant="standard"
                        style={{ width: "350px" }}
                        className="mt-3"
                        onChange={(e) => {
                          setMessageDetails({
                            ...messageDetails,
                            To: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        id="standard-basic"
                        label="Subject"
                        variant="standard"
                        style={{ width: "350px" }}
                        className="mt-3"
                        onChange={(e) => {
                          setMessageDetails({
                            ...messageDetails,
                            Subject: e.target.value,
                          });
                        }}
                      />
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Body"
                        style={{ width: 350 }}
                        className="mt-5 p-2"
                        onChange={(e) => {
                          setMessageDetails({
                            ...messageDetails,
                            Body: e.target.value,
                          });
                        }}
                      />

                      <button
                        className="border-0 btn btn-secondary rounded mt-5 p-3 ps-4 pe-4"
                        onClick={sendMessage}
                      >
                        Send a message
                      </button>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
            <div className={nav ? "dashboard" : "dashboard1"}>
              <TableContainer
                component={Paper}
                sx={{ maxWidth: 650 }}
                className="mt-5 ms-5"
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>First Name</b>
                      </TableCell>
                      <TableCell align="right">{items?.firstName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Last Name</b>
                      </TableCell>
                      <TableCell align="right">{items?.lastName}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Username</b>
                      </TableCell>
                      <TableCell align="right">{items?.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Email</b>
                      </TableCell>
                      <TableCell align="right">{items?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Password</b>
                      </TableCell>
                      <TableCell align="right" onClick={handleOpen1} style={{cursor:"pointer"}} >
                        Change Password?
                      </TableCell>
                      <Modal
                        open={open1}
                        onClose={handleClose1}
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
                                  value={items?.email}
                                  
                                  readOnly
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
                                        values.showPassword
                                          ? "text"
                                          : "password"
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
                                            onMouseDown={
                                              handleMouseDownPassword
                                            }
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
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Temp />
        </div>
      )}
    </div>
  );
};

export default Profile;

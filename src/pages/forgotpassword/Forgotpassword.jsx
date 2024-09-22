import React, { useRef, useState } from "react";
import "./ForgotPassword.css";
import { PiSubtitles } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { LoadingComponent } from "../../components/helper/LoadingComponent";
import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [showProgressBar, setProgressBar] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSignUpClick = () => {
    navigation("/register");
  };

  //  FORGOT PASSWORD

  const submitHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    if (!email) {
      showErrorToast("Please enter email");
    } else if (!emailRegex.test(email)) {
      showErrorToast("Enter valid email address");
    } else {
      setProgressBar(true);
      try {
        console.log("Starting forgot password");
        console.log("email :: ", email);

        const { data } = await axios.post(
          UrlHelper.FORGOT_PASSWORD_API,
          {
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast(data.message);

        setProgressBar(false);
        setShowOtp(true);
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Someting went wrong");
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  };

  //  FOR OTP

  const inputs = Array.from({ length: 6 }, () => useRef(null)); // Adjust length as per your requirement

  const handleChangeText = (e, index) => {
    const text = e.target.value;
    let newOtp = otp.split("");
    newOtp[index] = text;
    newOtp = newOtp.join("");
    setOtp(newOtp);

    if (text.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  const handleCheckOtp = () => {
    if (otp.length === 6) {
      submitOTPHandler();
      // Alert.alert('Success', 'OTP Entered Successfully :: ' + otp);
    } else {
      showErrorToast("Please enter all six digits of the OTP");
    }
  };

  const submitOTPHandler = async () => {
    console.log("Working on OTP verifcation ");
    setProgressBar(true);

    try {
      console.log("OTP :: " + otp);

      const { data } = await axios.put(
        UrlHelper.FORGOT_PASSWORD_API,
        {
          otp: parseInt(otp),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("datat :: " + data);

      setProgressBar(false);
    } catch (error) {
      setProgressBar(false);
      console.log(error);
      console.log(error?.response?.data?.message);
      

      if (error.response.data.message === "Please enter new password ") {
        // navigation.navigate("ResetPassword", {
        //   otp: otp,
        // });
        setShowResetPassword(true);
        setShowOtp(false);
      } else if (
        error.response.data.message === "Incorrect OTP or OTP has been expired"
      ) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast("Something went wrong");
      }
    }
  };

  // FOR RESETING PASSWORD
  const submitHandlerForReset = async () => {
    console.log("Working on Reset Password ");

    if (!password) {
      showErrorToast("Enter password");
    } else if (password.length < 6) {
      showErrorToast("Password must be atleast 6 characters long");
    } else if (!confirmPassword) {
      showErrorToast("Enter confirm password");
    } else if (password != confirmPassword) {
      showErrorToast("Password and Confirm Password Not Matched");
    } else {
      setProgressBar(true);

      try {
        const { data } = await axios.put(
          UrlHelper.FORGOT_PASSWORD_API,
          {
            otp: otp,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast(data.message);
        navigation("/login");
        setProgressBar(false);
      } catch (error) {
        setProgressBar(false);
        console.log(error);
        console.log(error.response.data.message);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginContainerLeft">
        <label className="labelHeader">Hello,</label>
        <label className="labelHeader">Welcome</label>
        <label className="labelHeader">To</label>
        <label className="labelHeader">TheLionWorld</label>

        <div className="loginContainerLeftBottom">
          <div className="trophyimagecontainer">
            <img src={images.cups} alt="trphy" className="logcatandtrophyimg" />
          </div>

          <div className="logcatimagecontainer">
            <img src={images.cat} alt="cat" className="logcatandtrophyimg" />
          </div>
        </div>
      </div>
      <div className="loginContainerRight">
        <div className="rightParenC">
          {/** SHOWING FORGOT CONTAINER */}
          {!showOtp && !showResetPassword && (
            <div className="rightParenCMain">
              <label className="labelHeader">Forgot Password</label>

              <label className="labelSubHeader">
                {" "}
                Please enter your details.
              </label>
              {/** EMAIL */}
              <label className="alCLLabel">Email</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {showProgressBar ? (
                <LoadingComponent />
              ) : (
                <div className="lBottomContainer" onClick={submitHandler}>
                  <label className="alBottomContainerlabel">Submit</label>
                </div>
              )}

              <div className="lfContainer">
                <label className="alBottomContainerlabel">
                  Don’t have an account?{" "}
                </label>
                <label
                  onClick={handleSignUpClick}
                  className="lBottomContainerlabel"
                >
                  Sign up
                </label>
              </div>
            </div>
          )}

          {/** SHOOWING OTP CONTAINER */}
          {showOtp && (
            <div className="rightParenCMain">
              <label className="labelHeader">Forgot Password</label>

              <label className="labelSubHeader">
                {" "}
                Enter the One time password sent to your Account
              </label>
              {/** EMAIL */}
              <label className="alCLLabel">OTP</label>
              <div className="fotpContainer">
                <div className="otpContainer">
                  {inputs.map((input, index) => (
                    <input
                      key={index}
                      className="otp-input"
                      type="text"
                      value={otp[index] || ""}
                      ref={input}
                      onChange={(e) => handleChangeText(e, index)}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              {showProgressBar ? (
                <LoadingComponent />
              ) : (
                <div className="lBottomContainer" onClick={handleCheckOtp}>
                  <label className="alBottomContainerlabel">Verify OTP</label>
                </div>
              )}

              <div className="lfContainer">
                <label className="alBottomContainerlabel">
                  Don’t have an account?{" "}
                </label>
                <label onClick={handleSignUpClick} className="lBottomContainerlabel">Sign up</label>
              </div>
            </div>
          )}

          {/** SHOWING RESETTING PASSWORD CONTAINER */}
          {showResetPassword && !showOtp && (
            <div className="rightParenCMain">
              <label className="labelHeader">Reset Password</label>

              {/** PASSWORD */}
              <label className="alCLLabel">Password</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/** CONFIMR PASSWORD */}
              <label className="alCLLabel">Confirm Password</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {showProgressBar ? (
                <LoadingComponent />
              ) : (
                <div
                  className="lBottomContainer"
                  onClick={submitHandlerForReset}
                >
                  <label className="alBottomContainerlabel">Submit</label>
                </div>
              )}
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default ForgotPassword;

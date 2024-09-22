import React, { useEffect, useState } from "react";
import "./Login.css";
import { PiSubtitles } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast";
import { login } from "../../redux/actions/userAction";
import { ToastContainer } from "react-toastify";
import CircularProgressBar from "../../components/helper/CircularProgressBar";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const handleSignUpClick = () => {
    navigation("/register");
  };

  const submitHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    if (!email) {
      showErrorToast("Please enter email");
    } else if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      showErrorToast("Enter valid email address or phone number");
    } else if (!password) {
      showErrorToast("Enter password");
    } else {
      try {
        console.log("Starting login");
        console.log("email and password:: ", email, password);

        dispatch(login(email, password));
      } catch (error) {
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

  useEffect(() => {
    if (error) {
      console.log("ERROR");
      console.log(error);

      showErrorToast(error);

      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      console.log("RESULT FOUND");
      console.log(message);
      //   navigation.navigate(navigateTo)

      // We are using navigation reset so that all the navigation stack will get clear

      navigation("/dashboard");
      showSuccessToast(message);

      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, message, dispatch]);

  const getUserAccessToken = async () => {
    try {
      const val = await localStorage.getItem("tlwaaccesstoken");
      console.log("From SS Access Token :: " + val);
      // dispatch(getUserAccessToken(val));
      dispatch({
        type: "getaccesstoken",
        payload: val,
      });

      const timer = setTimeout(() => {
        if (val) {
          navigation("/dashboard");
        } else {
          navigation("/login");
        }
      }, 3000);
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    getUserAccessToken();
  }, []);

  let [countVal, setCountVal] = useState(0);

  const navigateToRegister = () => {
    console.log('count :: ' + countVal);
    setCountVal(countVal + 1);
    if (countVal >= 5) {
      navigation("/register");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginContainerLeft">
        <label onClick={navigateToRegister} className="labelHeader">Hello,</label>
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
          <div className="rightParenCMain">
            <label className="labelHeader">Log In</label>

            <label className="labelSubHeader">
              {" "}
              Welcome back! Please enter your details.
            </label>
            {/** EMAIL */}
            <label className="alCLLabel">Email</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <MdOutlineMail color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/** PASSWORD */}
            <label className="alCLLabel">Password</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <MdOutlinePassword color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="lfContainer">
              <label
                onClick={() => navigation("/forgotpassword")}
                className="alBottomContainerlabel"
              >
                Forgot password
              </label>
            </div>

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2vw",
                }}
              >
                <CircularProgressBar />
              </div>
            ) : (
              <div className="lBottomContainer" onClick={submitHandler}>
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}

            {/* <div className="lfContainer">
              <label className="alBottomContainerlabel">
                Don’t have an account?{" "}
              </label>
              <label
                onClick={handleSignUpClick}
                className="lBottomContainerlabel"
              >
                Sign up
              </label>
            </div> */}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;

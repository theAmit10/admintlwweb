import React, { useState } from "react";
import "./Login.css";
import { PiSubtitles } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
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
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="lfContainer">
              <label className="alBottomContainerlabel">Forgot password</label>
            </div>

            <div className="lBottomContainer">
              <label className="alBottomContainerlabel">Submit</label>
            </div>

            <div className="lfContainer">
              <label className="alBottomContainerlabel">
                Don’t have an account?{" "}
              </label>
              <label className="lBottomContainerlabel">Sign up</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

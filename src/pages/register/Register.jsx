import React, { useState } from "react";
import "./Register.css";
import { PiSubtitles } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

function Register() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [userDeviceToken, setUserDeviceToken] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [signupwith, setsignupwith] = useState("");
  const [showCountry, setShowCountry] = useState(false);


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
        <div className="rightParenCR">
          <div className="rightParenCMainR">
            <label className="labelHeader">Register Now</label>

               {/** NAME */}
            <label className="alCLLabel">Name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <FaRegUserCircle color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/** EMAIL */}
            <label className="alCLLabel">Email</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <MdEmail color={COLORS.background} size={"2.5rem"} />
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

            {/** CONFIMRM PASSWORD */}
            <label className="alCLLabel">Confirm Password</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <MdOutlinePassword color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

             {/** SELECT COUNTRY */}
             <label className="alCLLabel">Country</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <TbWorld color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Select country"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>


            <div className="lBottomContainer">
              <label className="alBottomContainerlabel">Submit</label>
            </div>

            <div className="lfContainer">
              <label className="alBottomContainerlabel">
              Already have an account?{" "}
              </label>
              <label className="lBottomContainerlabel">Login</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;


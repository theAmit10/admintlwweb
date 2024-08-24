import React, { useState } from "react";
import "./ChangePassword.css";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import { RiLockPasswordLine } from "react-icons/ri";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CircularProgressBar from "../helper/CircularProgressBar";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { accesstoken } = useSelector((state) => state.user);

  const [showProgressbar, setProgressBar] = useState(false);

  const changePasswordHandler = async () => {
    if (!oldPassword) {
      showErrorToast("Please enter your old password");
    } else if (!newPassword) {
      showErrorToast("Please enter your new password");
    } else if (!confirmPassword) {
      showErrorToast("Please enter your confirm password");
    } else if (newPassword != confirmPassword) {
      showErrorToast("New password and confirm password not matched");
    } else {
      setProgressBar(true);

      try {
        const { data } = await axios.put(
          UrlHelper.CHANGE_PASSWORD_API,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        dispatch(loadProfile(accesstoken));

        showSuccessToast(data.message);
        setProgressBar(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="cp-container">
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Change Password
          </label>
        </div>
      </div>
      <div className="cp-container-main">
        {/** OLD PASSWORD */}
        <label className="alCLLabel">Old password</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <RiLockPasswordLine color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        {/** NEW PASSWORD */}
        <label className="alCLLabel">New password</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <RiLockPasswordLine color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/** CONFIRM NEW PASSWORD */}
        <label className="alCLLabel">Confim password</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <RiLockPasswordLine color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {showProgressbar ? (
        <div className="NC">
          <CircularProgressBar />
        </div>
      ) : (
        <div className="alBottomContainer" onClick={changePasswordHandler}>
          <label className="alBottomContainerlabel">Change password</label>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default ChangePassword;

import React, { useState } from 'react'
import "./ChangePassword.css"
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import COLORS from '../../assets/constants/colors';
import { RiLockPasswordLine } from "react-icons/ri";

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='cp-container'>
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

        <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Create Location</label>
          </div>
    </div>
  )
}

export default ChangePassword
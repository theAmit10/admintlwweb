import React, { useState } from 'react'
import "./Logout.css"
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import COLORS from '../../assets/constants/colors';
import { RiLockPasswordLine } from "react-icons/ri";
import images from '../../assets/constants/images';

function Logout() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='cp-container'>
         {/** TOP NAVIGATION CONTATINER */}
         <div className="alCreatLocationTopContainer">
            
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Log out
              </label>
            </div>
          </div>
        <div className="cp-container-main" style={{justifyContent: 'center', alignItems: 'center'}}>
             


             <div className="catimagecontainer">
                    <img
                      src={images.cat}
                      alt="cat"
                      className="catandtrophyimg"
                    />
                  </div>
           <label className="alCLLabel">Are you sure?</label>
           

        </div>

        <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Yes</label>
          </div>

          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">No</label>
          </div>
    </div>
  )
}

export default Logout
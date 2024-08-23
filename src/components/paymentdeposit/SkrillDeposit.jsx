import React, { useState } from "react";
import "./SkrillDeposit.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { locationdata } from "../alllocation/AllLocation";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

export const SkrillDeposit = ({ selectingPaymentType }) => {
  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const handleCopyClick = (stringToCopy) => {
    navigator.clipboard
      .writeText(stringToCopy)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const [showU, setShowU] = useState(true);
  const [showCU, setShowCU] = useState(false);

  const settingShowCreateUpi = () => {
    setShowCU(true);
    setShowU(false);
  };

  const backHandlerShowCreateUpi = () => {
    setShowCU(false);
    setShowU(true);
  };

  const [address, setaddress] = useState('');

  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="upicontiner">
      {showU && (
        <>
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={goToPreviousPage}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Skrill Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="upipdMainContainer">
            {locationdata.map((item, index) => (
              <div className="upipdContentContainer">
                {/** TOP */}
                <div className="uCCTopC">
                  <div className="hdContenContainerIcon">
                    <img
                      src={images.skrill}
                      color={COLORS.background}
                      size={"2.5rem"}
                    />
                  </div>

                  <label className="pdB">Skrill 1</label>

                  <div className="copyCon">
                    <MdDelete color={COLORS.background} size={"2.5rem"} />
                  </div>
                </div>
                {/** TOP */}

                {/** TOP */}
                <div className="uCCMidC">
                  <div className="uCCTopFC">
                    <label className="pdSB">Address</label>
                  </div>
                  <div className="uCCTopSC">
                    <label className="pdR">Aron@skrill.com</label>
                  </div>
                  <div
                    onClick={() => handleCopyClick("copy me")}
                    className="copyCon"
                  >
                    <FaCopy color={COLORS.background} size={"2rem"} />
                  </div>
                </div>
                {/** TOP */}

              </div>
            ))}
          </div>

          <div className="alBottomContainer" onClick={settingShowCreateUpi}>
            <label className="alBottomContainerlabel">Create new Skrill</label>
          </div>
        </>
      )}

      {showCU && (
        <>
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHandlerShowCreateUpi}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create UPI Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">Address</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>

         
        

          </div>

          <div className="alBottomContainer" onClick={settingShowCreateUpi}>
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </>
      )}
    </div>
  );
};

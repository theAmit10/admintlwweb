import React, { useState } from "react";
import "./BankDeposit.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { locationdata } from "../alllocation/AllLocation";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

export const BankDeposit = ({ selectingPaymentType }) => {
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

  const [bankname, setbankname] = useState('');
  const [accountholdername, setaccountholdername] = useState('');
  const [ifsccode, setifsccode] = useState('');
  const [accountnumber, setaccountnumber] = useState('');

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
                Bank Payment
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
                      src={images.bank}
                      color={COLORS.background}
                      size={"2.5rem"}
                    />
                  </div>

                  <label className="pdB">Bank 1</label>

                  <div className="copyCon">
                    <MdDelete color={COLORS.background} size={"2.5rem"} />
                  </div>
                </div>
                {/** TOP */}

                {/** TOP */}
                <div className="uCCMidC">
                  <div className="uCCTopFC">
                    <label className="pdSB">Bank name</label>
                  </div>
                  <div className="uCCTopSC">
                    <label className="pdR">State Bank of India</label>
                  </div>
                  <div
                    onClick={() => handleCopyClick("copy me")}
                    className="copyCon"
                  >
                    <FaCopy color={COLORS.background} size={"2rem"} />
                  </div>
                </div>
                {/** TOP */}

                {/** TOP */}
                <div className="uCCMidC">
                  <div className="uCCTopFC">
                    <label className="pdSB">Acc. Holder Name</label>
                  </div>
                  <div className="uCCTopSC">
                    <label className="pdR">Aron Rawat</label>
                  </div>
                  <div
                    onClick={() => handleCopyClick("copy me")}
                    className="copyCon"
                  >
                    <FaCopy color={COLORS.background} size={"2rem"} />
                  </div>
                </div>
                {/** TOP */}

                 {/** TOP */}
                 <div className="uCCMidC">
                  <div className="uCCTopFC">
                    <label className="pdSB">Acc. No.</label>
                  </div>
                  <div className="uCCTopSC">
                    <label className="pdR">89282829282</label>
                  </div>
                  <div
                    onClick={() => handleCopyClick("copy me")}
                    className="copyCon"
                  >
                    <FaCopy color={COLORS.background} size={"2rem"} />
                  </div>
                </div>
                {/** TOP */}

                 {/** TOP */}
                 <div className="uCCMidC">
                  <div className="uCCTopFC">
                    <label className="pdSB">IFSC code</label>
                  </div>
                  <div className="uCCTopSC">
                    <label className="pdR">SBI009293</label>
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
            <label className="alBottomContainerlabel">Create new Bank</label>
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
                Create Bank Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">Bank name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter bank name"
                value={bankname}
                onChange={(e) => setbankname(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">Account holder name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter account holder name"
                value={accountholdername}
                onChange={(e) => setaccountholdername(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">Account number</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter account number"
                value={accountnumber}
                onChange={(e) => setaccountnumber(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">IFSC code</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter IFSC code"
                value={ifsccode}
                onChange={(e) => setifsccode(e.target.value)}
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

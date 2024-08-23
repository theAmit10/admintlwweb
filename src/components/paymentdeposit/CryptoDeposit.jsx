import React, { useState } from "react";
import "./CryptoDeposit.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { locationdata } from "../alllocation/AllLocation";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

export const CryptoDeposit = ({ selectingPaymentType }) => {
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

  const [walletaddress, setwalletaddress] = useState('');
  const [networktype, setnetworktype] = useState('');

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
                Crypto Payment
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
                      src={images.crypto}
                      color={COLORS.background}
                      size={"2.5rem"}
                    />
                  </div>

                  <label className="pdB">Crypto 1</label>

                  <div className="copyCon">
                    <MdDelete color={COLORS.background} size={"2.5rem"} />
                  </div>
                </div>
                {/** TOP */}

                {/** TOP */}
                <div className="uCCMidC">
                  <div className="uCCTopFC">
                    <label className="pdSB">Wallet address</label>
                  </div>
                  <div className="uCCTopSC">
                    <label className="pdR">adknsdnvjsvkdvsjndvs</label>
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
                    <label className="pdSB">Network type</label>
                  </div>
                  <div className="uCCTopSC">
                    <label className="pdR">USDT</label>
                  </div>
                  <div
                    onClick={() => handleCopyClick("copy me")}
                    className="copyCon"
                  >
                    <FaCopy color={COLORS.background} size={"2rem"} />
                  </div>
                </div>
                {/** TOP */}

                <div className="qrcontiner">
                  <div className="qrcontinerMain">
                    <img
                      src={
                        "https://media.gettyimages.com/id/828088276/vector/qr-code-illustration.jpg?s=1024x1024&w=gi&k=20&c=ozubiiEgiuLP7-T1T1eN9jSUhGgQLBO0k9VeO8p0cZk="
                      }
                      className="qrimg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="alBottomContainer" onClick={settingShowCreateUpi}>
            <label className="alBottomContainerlabel">Create new crypto</label>
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
                Create Crypto Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">Wallet address</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter wallet address"
                value={walletaddress}
                onChange={(e) => setwalletaddress(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">Network type</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter network type"
                value={networktype}
                onChange={(e) => setnetworktype(e.target.value)}
              />
            </div>
            {/** RECEIPT */}

            {/** TITLE */}
            <label className="alCLLabel">QR code</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <div className="imageContainerAC">
                <input
                  className="al-search-input"
                  placeholder="Receipt"
                  type="file"
                  name="file"
                  onChange={selectDoc}
                />
              </div>
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

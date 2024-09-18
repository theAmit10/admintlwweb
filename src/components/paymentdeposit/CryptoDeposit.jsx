import React, { useEffect, useState } from "react";
import "./CryptoDeposit.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { locationdata } from "../alllocation/AllLocation";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { useSelector } from "react-redux";
import { useCreateCryptoAccountMutation, useDeleteCryptoAccountMutation } from "../../helper/Networkcall";
import axios from "axios";
import UrlHelper, { servername } from "../../helper/UrlHelper";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import CircularProgressBar from "../helper/CircularProgressBar";

export const CryptoDeposit = ({ selectingPaymentType }) => {
  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const handleCopyClick = (stringToCopy) => {
    navigator.clipboard
      .writeText(stringToCopy)
      .then(() => {
        showSuccessToast("Text Copied");
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

  const [walletaddress, setwalletaddress] = useState("");
  const [networktype, setnetworktype] = useState("");

  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // ALL CRYPTO DATA

  const { accesstoken, user } = useSelector((state) => state.user);
  const [seletedItem, setSelectedItem] = useState("");

  const [
    deleteCryptoAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteCryptoAccountMutation();

  useEffect(() => {
    allTheDepositData();
  }, []);

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const { data } = await axios.get(UrlHelper.ALL_CRYPTO_API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + JSON.stringify(data));
      setAllDepositData(data.payments);
      setLoadingAllData(false);
    } catch (error) {
      setLoadingAllData(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  // FOR DELETING DATA

  const deletingData = async (item) => {
    console.log("Deleting Data");
    setSelectedItem(item._id);

    const res = await deleteCryptoAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  // CREATING CRYPTO

  const [createCryptoAccount, {isLoading, error}] =
  useCreateCryptoAccountMutation();

  const submitCreateRequest = async () => {
    if (!walletaddress) {
      showErrorToast('Enter wallet address')
      return;
    }
    if (!networktype) {
      showErrorToast('Enter network type')
      return;
    }
    if (!imageSource) {
      showErrorToast('Add QR code')
      return;
    } else {
      console.log('Create UPI Running');
      try {
        const formData = new FormData();
        formData.append('walletaddress', walletaddress);
        formData.append('networktype', networktype);
        formData.append('qrcode', imageSource);

        console.log('FORM DATA :: ' + JSON.stringify(formData));

        const res = await createCryptoAccount({
          accesstoken: accesstoken,
          body: formData,
        }).unwrap();

        showSuccessToast(res.message);
        allTheDepositData();
        backHandlerShowCreateUpi();
        setwalletaddress("")
        setnetworktype("")
        setImageSource(null)
      } catch (error) {
        showErrorToast("Something went wrong")
        console.log('Error during deposit:', error);
        // if (error.response) {
        //   Toast.show({type: 'error', text1: error.response.data});
        // } else if (error.request) {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Request was made, but no response was received',
        //   });
        // } else {
        //   Toast.show({type: 'error', text1: error.message});
        // }
      }
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

          {loadingAllData ? (
            <LoadingComponent />
          ) : allDepositdata.length === 0 ? (
            <NodataFound title={"This payment method is temporarily unavailable."} />
          ) : (
            <>
              <div className="upipdMainContainer">
                {allDepositdata.map((item, index) => (
                  <div key={item._id} className="upipdContentContainer">
                    {/** TOP */}
                    <div className="uCCTopC">
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.crypto}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>

                      <label className="pdB">Crypto {item.paymentId}</label>

                      {deleteIsLoading ? (
                        seletedItem === item._id ? (
                          <CircularProgressBar />
                        ) : (
                          <div
                            onClick={() => deletingData(item)}
                            className="copyCon"
                          >
                            <MdDelete
                              color={COLORS.background}
                              size={"2.5rem"}
                            />
                          </div>
                        )
                      ) : (
                        <div
                          className="copyCon"
                          onClick={() => deletingData(item)}
                        >
                          <MdDelete color={COLORS.background} size={"2.5rem"} />
                        </div>
                      )}
                    </div>
                    {/** TOP */}

                    {/** TOP */}
                    <div className="uCCMidC">
                      <div className="uCCTopFC">
                        <label className="pdSB">Wallet address</label>
                      </div>
                      <div className="uCCTopSC">
                        <label className="pdR">{item.walletaddress}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.walletaddress)}
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
                        <label className="pdR">  {item.networktype}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.networktype)}
                        className="copyCon"
                      >
                        <FaCopy color={COLORS.background} size={"2rem"} />
                      </div>
                    </div>
                    {/** TOP */}

                    <div className="qrcontiner">
                      <div className="qrcontinerMain">
                        <img
                          src={`${servername}/uploads/cryptoqrcode/${item.qrcode}`}
                          className="qrimg"
                        />
                      </div>
                    </div>

                    <div className="uCCBottomC">
                      <div className="uCCTopFC">
                        <label className="pdSB">Note</label>
                      </div>
                      <div className="uCCBottomSC">
                        <label className="pdRBottom">
                          this is to infrom that i am going to not send your
                          amount because their is some missing.
                        </label>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              <div className="alBottomContainer" onClick={settingShowCreateUpi}>
                <label className="alBottomContainerlabel">
                  Create new crypto
                </label>
              </div>
            </>
          )}
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

          {isLoading ? (
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={submitCreateRequest}>
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </>
      )}
    </div>
  );
};

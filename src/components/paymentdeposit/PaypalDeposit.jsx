import React, { useEffect, useState } from "react";
import "./PaypalDeposit.css";
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
import {
  useCreatePaypalAccountMutation,
  useDeletePaypalAccountMutation,
} from "../../helper/Networkcall";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { LoadingComponent } from "../helper/LoadingComponent";
import CircularProgressBar from "../helper/CircularProgressBar";
import { NodataFound } from "../helper/NodataFound";
import { ToastContainer } from "react-toastify";

export const PayPalDeposit = ({ selectingPaymentType }) => {
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

  const [emailaddress, setemailaddress] = useState("");

  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // FOR ALL PAYPAL

  const { accesstoken, user } = useSelector((state) => state.user);

  const [
    deletePaypalAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeletePaypalAccountMutation();

  useEffect(() => {
    allTheDepositData();
  }, []);

  const [seletedItem, setSelectedItem] = useState("");
  const [paymentnote, setpaymentnote] = useState("");
  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const { data } = await axios.get(UrlHelper.ALL_PAYPAL_API, {
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

    const res = await deletePaypalAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  // CREATING PAYPAL ACCOUNT

  const [createSkrillAccount, { isLoading, error }] =
    useCreatePaypalAccountMutation();

  const submitCreateRequest = async () => {
    if (!emailaddress) {
      showErrorToast("Enter email address");
      return;
    }
    if (!paymentnote) {
      showErrorToast("Add payment note");
      return;
    } else {
      try {
        const body = {
          emailaddress,
          paymentnote,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await createSkrillAccount({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        showSuccessToast(res.message);
        allTheDepositData();
        backHandlerShowCreateUpi();
        setemailaddress("");
        setpaymentnote("");
      } catch (error) {
        console.log("Error during deposit:", error);
        showErrorToast("Something went wrong");

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
                Paypal Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          {loadingAllData ? (
            <LoadingComponent />
          ) : allDepositdata.length === 0 ? (
            <NodataFound
              title={"This payment method is temporarily unavailable."}
            />
          ) : (
            <>
              <div className="upipdMainContainer">
                {allDepositdata.map((item, index) => (
                  <div key={item._id} className="upipdContentContainer">
                    {/** TOP */}
                    <div className="uCCTopC">
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.paypal}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>

                      <label className="pdB">Paypal {item.paymentId}</label>

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
                        <label className="pdSB">Email address</label>
                      </div>
                      <div className="uCCTopSC">
                        <label className="pdR"> {item.emailaddress}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.emailaddress)}
                        className="copyCon"
                      >
                        <FaCopy color={COLORS.background} size={"2rem"} />
                      </div>
                    </div>
                    {/** TOP */}
                    <div className="uCCBottomC">
                      <div className="uCCTopFC">
                        <label className="pdSB">Note</label>
                      </div>
                      <div className="uCCBottomSC">
                        <label className="pdRBottom">{item.paymentnote}</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="alBottomContainer" onClick={settingShowCreateUpi}>
            <label className="alBottomContainerlabel">Create new Paypal</label>
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
                Create Paypal Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">Email address</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter email address"
                value={emailaddress}
                onChange={(e) => setemailaddress(e.target.value)}
              />
            </div>

            {/** PAYMENT NOTE */}
            <label className="alCLLabel">Note</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter note"
                value={paymentnote}
                onChange={(e) => setpaymentnote(e.target.value)}
              />
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

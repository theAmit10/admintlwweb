import React, { useEffect, useState } from "react";
import "./BankDeposit.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { locationdata } from "../alllocation/AllLocation";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import {
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
} from "../../helper/Networkcall";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import CircularProgressBar from "../helper/CircularProgressBar";
import { ToastContainer } from "react-toastify";

export const BankDeposit = ({ selectingPaymentType }) => {
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

  const [bankname, setbankname] = useState("");
  const [accountholdername, setaccountholdername] = useState("");
  const [ifsccode, setifsccode] = useState("");
  const [accountnumber, setaccountnumber] = useState("");

  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // ALL BANK DATA

  const { accesstoken, user } = useSelector((state) => state.user);

  const toggleUpiOptionView = () => {
    setUpiVisible(!upiVisible);
  };

  const settingUpiId = (item) => {
    setSelectedUpiId(item);
    setUpiVisible(false);
  };

  // TO GET ALL THE ADMIN BANK

  useEffect(() => {
    allTheDepositData();
  }, []);

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const [seletedItem, setSelectedItem] = useState("");

  const [
    deleteBankAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteBankAccountMutation();

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const { data } = await axios.get(UrlHelper.ALL_BANK_API, {
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

    const res = await deleteBankAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  // FOR CREATING BANK ACCOUNT

  // TO GET ALL THE ADMIN BANK

  const [createBankAccount, { isLoading, error }] =
    useCreateBankAccountMutation();

  const submitCreateRequest = async () => {
    if (!bankname) {
      showErrorToast("Enter bank name");
      return;
    }
    if (!accountholdername) {
      showErrorToast("Enter account holder name");
      return;
    }
    if (!ifsccode) {
      showErrorToast("Add ifsc code");
      return;
    }
    if (!accountnumber) {
      showErrorToast("Add account number");
      return;
    } else {
      try {
        const body = {
          bankname,
          accountholdername,
          ifsccode,
          accountnumber,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await createBankAccount({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        showSuccessToast(res.message);
        allTheDepositData();
        backHandlerShowCreateUpi();
        setbankname("");
        setifsccode("");
        setaccountholdername("");
        setaccountnumber("");
      } catch (error) {
        showErrorToast("Something went wrong");
        console.log("Error during deposit:", error);
        if (error.response) {
          // Toast.show({ type: 'error', text1: error.response.data });
        } else if (error.request) {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Request was made, but no response was received',
          // });
        } else {
          // Toast.show({ type: 'error', text1: error.message });
        }
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
                Bank Payment
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
                          src={images.bank}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>

                      <label className="pdB">Bank {item.paymentId}</label>

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
                        <label className="pdSB">Bank name</label>
                      </div>
                      <div className="uCCTopSC">
                        <label className="pdR">{item.bankname}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.bankname)}
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
                        <label className="pdR">{item.accountholdername}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.accountholdername)}
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
                        <label className="pdR">{item.accountnumber}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.accountnumber)}
                        className="copyCon"
                      >
                        <FaCopy color={COLORS.background} size={"2rem"} />
                      </div>
                    </div>
                    {/** TOP */}

                    <div className="uCCMidC">
                      <div className="uCCTopFC">
                        <label className="pdSB">Swift code</label>
                      </div>
                      <div className="uCCTopSC">
                        <label className="pdR">{item.ifsccode}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.ifsccode)}
                        className="copyCon"
                      >
                        <FaCopy color={COLORS.background} size={"2rem"} />
                      </div>
                    </div>

                    {/** TOP */}
                    <div className="uCCMidC">
                      <div className="uCCTopFC">
                        <label className="pdSB">Routing No. / IFSC code</label>
                      </div>
                      <div className="uCCTopSC">
                        <label className="pdR">{item.ifsccode}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.ifsccode)}
                        className="copyCon"
                      >
                        <FaCopy color={COLORS.background} size={"2rem"} />
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
                    {/** TOP */}
                  </div>
                ))}
              </div>

              <div className="alBottomContainer" onClick={settingShowCreateUpi}>
                <label className="alBottomContainerlabel">
                  Create new Bank
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

          {isLoading ? (
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={submitCreateRequest}>
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

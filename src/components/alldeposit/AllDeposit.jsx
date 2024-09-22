import React, { useCallback, useEffect, useState } from "react";
import "./AllDeposit.css";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import COLORS from "../../assets/constants/colors";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDepositQuery,
  useUpdateDepositPaymentStatusMutation,
} from "../../helper/Networkcall";
import moment from "moment";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { AlertModal } from "../helper/AlertModal";
import { ImageAlertModal } from "../helper/ImageAlertModal";
import { servername } from "../../helper/UrlHelper";
import { ToastContainer } from "react-toastify";
import { AllUser } from "../alluser/AllUser";

export const multiplyStringNumbers = (str1, str2) => {
  // Convert the strings to numbers
  const num1 = Number(str1);
  const num2 = Number(str2);

  // Check if the conversion was successful
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error("Both inputs must be valid numbers");
  }

  // Multiply the numbers and return the result
  return num1 * num2;
};

export const AllDeposit = ({ reloadKey }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState(null);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = data.deposits.filter((item) =>
      item.userId.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const { accesstoken } = useSelector((state) => state.user);

  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  // const [paymentUpdateNote,setpaymentUpdateNote] = useState("")
  // const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading, data, isError, refetch } =
    useGetAllDepositQuery(accesstoken);

  useEffect(() => {
    refetch();
  }, [reloadKey]);

  useEffect(() => {
    if (!isLoading && data) {
      console.log("USE Effect running");
      console.log(data.deposits);
      setFilteredData(data.deposits);
    }
  }, [isLoading, data, reloadKey]);

  // FOR UPDATING PAYMENT STATUS
  const [
    updateDepositPaymentStatus,
    { isLoading: updateStatusIsLoading, error: updateStatusError },
  ] = useUpdateDepositPaymentStatusMutation();

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
  };

  // FOR ACCEPTING

  const acceptingData = async (
    item,
    paymentUpdateNote,
    imageSource,
    amount
  ) => {
    console.log("Accepting Data");

    setSelectedItem(item._id);
    if (isNaN(amount)) {
      showErrorToast("Enter valid amount");
    } else if (paymentUpdateNote && imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Completed");
      formData.append("paymentUpdateNote", paymentUpdateNote);
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    } else if (paymentUpdateNote) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Completed");
      formData.append("amount", amount);
      formData.append("paymentUpdateNote", paymentUpdateNote);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    } else if (imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Completed");
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    } else {
      // const body = {
      //   transactionId: item._id,
      //   paymentStatus: "Completed",
      // };

      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("amount", amount);
      formData.append("paymentStatus", "Completed");

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    }
  };

  // FOR CANCELLING

  const cancellingData = async (
    item,
    paymentUpdateNote,
    imageSource,
    amount
  ) => {
    console.log("Cancelling Data");
    setSelectedItem(item._id);
    if (isNaN(amount)) {
      showErrorToast("Enter valid amount");
    } else if (paymentUpdateNote && imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Cancelled");
      formData.append("paymentUpdateNote", paymentUpdateNote);
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    } else if (paymentUpdateNote) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Cancelled");
      formData.append("amount", amount);
      formData.append("paymentUpdateNote", paymentUpdateNote);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    } else if (imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Cancelled");
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    } else {
      // const body = {
      //   transactionId: item._id,
      //   paymentStatus: "Completed",
      // };

      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("amount", amount);
      formData.append("paymentStatus", "Cancelled");

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      refetch();

      showSuccessToast(res.message);
    }

    // const body = {
    //   transactionId: item._id,
    //   paymentStatus: "Cancelled",
    // };

    // const res = await updateDepositPaymentStatus({
    //   accesstoken: accesstoken,
    //   body: body,
    // }).unwrap();

    // refetch();

    // showSuccessToast(res.message);
  };

  // FOR SHOWING RECEIPT

  const [alertVisibleAccepted, setAlertVisibleAccepted] = useState(false);
  const [alertVisibleRejected, setAlertVisibleRejected] = useState(false);

  const showAlertAccepted = (item) => {
    setAlertVisibleAccepted(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);
  };

  const closeAlertAccepted = () => {
    setAlertVisibleAccepted(false);
  };

  // const handleYesAccepted = () => {
  //   // Handle the Yes action here
  //   setAlertVisibleAccepted(false);
  //   acceptingData(selectedItem);
  //   console.log("Yes pressed");
  // };
  const handleYesAccepted = ({ paymentUpdateNote, imageSource, amount }) => {
    // Handle the returned values here
    console.log("Payment Update Note:", paymentUpdateNote);
    console.log("Selected Image:", imageSource);

    setAlertVisibleAccepted(false);
    acceptingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log("Yes pressed");
    // Do something with the note and image file
    // e.g., send it to the server or update the state
  };

  const showAlertRejected = (item) => {
    setAlertVisibleRejected(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);
  };

  const closeAlertRejected = () => {
    setAlertVisibleRejected(false);
  };

  const handleYesRejected = ({ paymentUpdateNote, imageSource, amount }) => {
    // Handle the Yes action here
    setAlertVisibleRejected(false);
    cancellingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log("Yes pressed");
  };

  //  FOR SHOWING RECEIPT

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // const handleOpenAlert = () => setIsAlertOpen(true);

  const handleOpenAlert = (item) => {
    setIsAlertOpen(true);
    setSelectedReceiptUrl(`${servername}/uploads/deposit/${item.receipt}`);
  };
  const handleCloseAlert = () => setIsAlertOpen(false);

  // FOR USER DETIALS

  const [showUserDetail, setShowUserDetails] = useState(false);
  const [showDeposit, setShowDeposit] = useState(true);
  const [userdata, setUserData] = useState(null);

  const settingDeposit = (item) => {
    setShowDeposit(false);
    setUserData(item);
    setShowUserDetails(true);
  };

  const backhandlerDeposit = () => {
    setShowUserDetails(false);
    setShowDeposit(true);
  };

  return (
    <>
      {showDeposit && (
        <div className="allDepositContainer">
          {/** SEARCH CONTATINER */}
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <CiSearch color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Search user ID"
              label="Search"
              onChange={handleSearch}
            />
          </div>
          {isLoading ? (
            <LoadingComponent />
          ) : filteredData.length === 0 ? (
            <NodataFound title={"No data found"} />
          ) : (
            <>
              <div className="dHeaderContainer">
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">UserID</label>
                </div>
                <div className="dHeaderContainerLabelContainer"  style={{ flex: 1.5, }}>
                  <label className="dHeaderContainerLabel">
                    Transaction ID
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">
                    Payment method
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">Receipt</label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">Amount</label>
                </div>
                <div
                  className="dHeaderContainerLabelContainer"
                  style={{ flex: 2, justifyContent: "center" }}
                >
                  <label className="dHeaderContainerLabel">Action</label>
                </div>
              </div>

              <div className="allLocationMainContainer">
                <div className="allLocationMainContainer">
                  {filteredData.map((item, index) => {
                    const calculatedAmount = item.convertedAmount
                      ? item.convertedAmount
                      : multiplyStringNumbers(
                          item.amount,
                          item.currency !== undefined
                            ? item.currency.countrycurrencyvaluecomparedtoinr
                            : 1
                        );

                    const usercountry = item.currency;

                    return (
                      <div key={index} className="dContentContainer">
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => settingDeposit(item)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.userId}
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer"  style={{ flex: 1.5,  }}>
                          <label className="dHeaderContainerLabel">
                            {item.transactionId}
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            {" "}
                            {item.paymentType}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleOpenAlert(item)}
                        >
                          <label
                            className="dHeaderContainerLabel"
                            style={{ cursor: "pointer" }}
                          >
                            Show Receipt
                          </label>
                        </div>

                        <ImageAlertModal
                          isOpen={isAlertOpen}
                          onClose={handleCloseAlert}
                          imageUrl={selectedReceiptUrl} // Use the state holding the selected receipt URL
                        />

                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            {calculatedAmount}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{
                            flex: 2,
                            justifyContent: "center",
                            gap: "1rem",
                          }}
                        >
                          {updateStatusIsLoading &&
                          item._id === selectedItemId ? (
                            <LoadingComponent />
                          ) : (
                            <>
                              {selectedItemId === item._id && (
                                <>
                                  {/** FOR ACCEPTING */}
                                  <AlertModal
                                    isOpen={alertVisibleAccepted}
                                    onClose={closeAlertAccepted}
                                    onConfirm={handleYesAccepted}
                                    defaultAmount={calculatedAmount} // Pass the calculated amount
                                    usercountry={usercountry}
                                  />
                                  {/** FOR REJECTING */}
                                  <AlertModal
                                    isOpen={alertVisibleRejected}
                                    onClose={closeAlertRejected}
                                    onConfirm={handleYesRejected}
                                    defaultAmount={calculatedAmount} // Pass the calculated amount
                                    usercountry={usercountry}
                                  />
                                </>
                              )}

                              {item.paymentStatus === "Pending" && (
                                <div
                                  className="allContentContainerIconContainer"
                                  onClick={() => showAlertAccepted(item)}
                                >
                                  <CiCircleCheck
                                    color={COLORS.background}
                                    size={"2.5rem"}
                                  />
                                </div>
                              )}

                              {item.paymentStatus === "Pending" ? (
                                <label
                                  className="dHeaderContainerLabel"
                                  style={{ color: COLORS.orange }}
                                >
                                  {item.paymentStatus}
                                </label>
                              ) : item.paymentStatus === "Completed" ? (
                                <label
                                  className="dHeaderContainerLabel"
                                  style={{ color: COLORS.green }}
                                >
                                  {item.paymentStatus}
                                </label>
                              ) : (
                                <label
                                  className="dHeaderContainerLabel"
                                  style={{ color: COLORS.red }}
                                >
                                  {item.paymentStatus}
                                </label>
                              )}

                              {item.paymentStatus === "Pending" && (
                                <div
                                  className="allContentContainerIconContainer"
                                  onClick={() => showAlertRejected(item)}
                                >
                                  <MdOutlineCancel
                                    color={COLORS.background}
                                    size={"2.5rem"}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
      
        </div>
      )}

      {showUserDetail && (
        <AllUser userdata={userdata} backhandlerDeposit={backhandlerDeposit} />
      )}
    </>
  );
};

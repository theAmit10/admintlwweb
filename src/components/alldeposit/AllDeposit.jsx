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
import { showSuccessToast } from "../helper/showErrorToast";
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

export const AllDeposit = () => {
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

  const { isLoading, data, isError, refetch } =
    useGetAllDepositQuery(accesstoken);

  // FOR UPDATING PAYMENT STATUS
  const [
    updateDepositPaymentStatus,
    { isLoading: updateStatusIsLoading, error: updateStatusError },
  ] = useUpdateDepositPaymentStatusMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
  };

  useEffect(() => {
    if (!isLoading) {
      console.log("USE Effect running");
      console.log(data.deposits);
      setFilteredData(data.deposits);
    }
  }, [isLoading]);

  // FOR ACCEPTING

  const acceptingData = async (item) => {
    console.log("Accepting Data");

    setSelectedItem(item._id);

    const body = {
      transactionId: item._id,
      paymentStatus: "Completed",
    };

    const res = await updateDepositPaymentStatus({
      accesstoken: accesstoken,
      body: body,
    }).unwrap();

    refetch();

    if (!isLoading) {
      console.log("USE running");
      console.log(data.deposits);
      setFilteredData(data.deposits);
    }

    showSuccessToast(res.message);
  };

  // FOR CANCELLING

  const cancellingData = async (item) => {
    console.log("Cancelling Data");
    setSelectedItem(item._id);

    const body = {
      transactionId: item._id,
      paymentStatus: "Cancelled",
    };

    const res = await updateDepositPaymentStatus({
      accesstoken: accesstoken,
      body: body,
    }).unwrap();

    refetch();

    if (!isLoading) {
      console.log("USE  running");
      setFilteredData(data.deposits);
    }

    showSuccessToast(res.message);
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

  const handleYesAccepted = () => {
    // Handle the Yes action here
    setAlertVisibleAccepted(false);
    acceptingData(selectedItem);
    console.log("Yes pressed");
  };

  const showAlertRejected = (item) => {
    setAlertVisibleRejected(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);
  };

  const closeAlertRejected = () => {
    setAlertVisibleRejected(false);
  };

  const handleYesRejected = () => {
    // Handle the Yes action here
    setAlertVisibleRejected(false);
    cancellingData(selectedItem);
    console.log("Yes pressed");
  };

  //  FOR SHOWING RECEIPT

  const [alertVisibleReceipt, setAlertVisibleReceipt] = useState(false);

  const showAlertReceipt = (item) => {
    setAlertVisibleReceipt(true);
  };

  const closeAlertReceipt = () => {
    setAlertVisibleReceipt(false);
  };

  const handleYesReceipt = () => {
    // Handle the Yes action here
    setAlertVisibleReceipt(false);
    console.log("Yes pressed");
  };

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
                <div className="dHeaderContainerLabelContainer">
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
                {filteredData.map((item, index) => (
                  <div key={index} className="dContentContainer">
                    <div
                      className="dHeaderContainerLabelContainer"
                      onClick={() => settingDeposit(item)}
                    >
                      <label className="dHeaderContainerLabel">
                        {item.userId}
                      </label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
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
                        {item.convertedAmount
                          ? item.convertedAmount
                          : multiplyStringNumbers(
                              item.amount,
                              item.currency !== undefined
                                ? item.currency
                                    .countrycurrencyvaluecomparedtoinr
                                : 1
                            )}
                      </label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center", gap: "1rem" }}
                    >
                      {updateStatusIsLoading && item._id === selectedItemId ? (
                        <LoadingComponent />
                      ) : (
                        <>
                          {/** FOR ACCEPTING */}

                          <AlertModal
                            isOpen={alertVisibleAccepted}
                            onClose={closeAlertAccepted}
                            onConfirm={handleYesAccepted} // Pass handleYesAccepted to run when "Yes" is clicked
                          />
                          {/** FOR CANCELLING */}
                          <AlertModal
                            isOpen={alertVisibleRejected}
                            onClose={closeAlertRejected}
                            onConfirm={handleYesRejected}
                          />

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
                ))}
              </div>
            </>
          )}
          <ToastContainer />
        </div>
      )}

      {showUserDetail && (
        <AllUser userdata={userdata} backhandlerDeposit={backhandlerDeposit} />
      )}
    </>
  );
};

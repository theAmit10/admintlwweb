import React, { useCallback, useEffect, useState } from "react";
import "./History.css";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetHistoryQuery } from "../../helper/Networkcall";
import CircularProgressBar from "../helper/CircularProgressBar";
import moment from "moment";
import { MdPendingActions } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { PiHandWithdrawBold } from "react-icons/pi";
import { LoadingComponent } from "../helper/LoadingComponent";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { servername } from "../../helper/UrlHelper";
import { ImageAlertModal } from "../helper/ImageAlertModal";
import { showErrorToast } from "../helper/showErrorToast";
import { ToastContainer } from "react-toastify";

const historydata = [
  {
    id: 1,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 2,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 3,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 4,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 5,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 6,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 7,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 8,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
];

function Historyc({ userdata, backHanndlerForHistory }) {
  const { accesstoken, user } = useSelector((state) => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState(null);

  //  FOR SHOWING RECEIPT

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // const handleOpenAlert = () => setIsAlertOpen(true);

  const handleOpenAlert = (item) => {
    setIsAlertOpen(true);
    if (item.paymentupdatereceipt) {
      setSelectedReceiptUrl(
        `${servername}/uploads/deposit/${item.paymentupdatereceipt}`
      );
    } else {
      showErrorToast("No image available");
      setIsAlertOpen(false);
    }
  };
  const handleCloseAlert = () => setIsAlertOpen(false);

  console.log("Accesstoken :: " + accesstoken);
  console.log("User ID :: " + user.userId);

  const {
    data: historyapidatas,
    error,
    isLoading,
    refetch,
  } = useGetHistoryQuery({ accesstoken: accesstoken, userId: userdata.userId });

  useEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch])
  );

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
  };

  return (
    <div className="history-main-container-org">
      {/** TITLE CONTAINER */}
      <div className="alCreatLocationTopContainer">
        <div className="searchIconContainer" onClick={backHanndlerForHistory}>
          <IoArrowBackCircleOutline color={COLORS.white_s} size={"2.5rem"} />
        </div>
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Transaction History
          </label>
        </div>
      </div>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-org">
        {/** CONTENT */}
        {isLoading ? (
          <LoadingComponent />
        ) : (
          historyapidatas?.transactions.map((item, index) => (
            <div
              key={(item) => item._id.toString()}
              onClick={() => toggleItem(item._id)}
              style={{
                minHeight: expandedItems[item._id] ? "20rem" : "8rem",
                backgroundColor: COLORS.background,
                borderRadius: "2rem",
              }}
            >
              <div className="h-content-org">
                {/** FIRST CONTAINER */}
                <div className="h-content-first-history">
                  <div className="iconcontainertop">
                    {item.transactionType === "Deposit" ? (
                      <PiHandDepositBold
                        color={COLORS.background}
                        size={"3rem"}
                      />
                    ) : (
                      <PiHandWithdrawBold
                        color={COLORS.background}
                        size={"3rem"}
                      />
                    )}
                  </div>
                </div>

                {/** SECOND CONTAINER */}
                <div className="h-content-second">
                  <div className="h-content-second-content-container-top">
                    <label className="h-content-second-content-container-top-amount">
                      {`Amount : \u00A0`}
                    </label>
                    <label className="h-content-second-content-container-top-amount-val">
                      {" "}
                      {item.amount} {user.country.countrycurrencysymbol}
                    </label>
                  </div>
                  <div className="h-content-second-content-container-bottom">
                    <label className="h-content-second-content-container-top-date">
                      {formatDateTime(item.createdAt)}
                    </label>
                  </div>
                </div>
                {/** THIRD CONTAINER */}
                <div className="h-content-third">
                  <div className="h-content-third-content-container-top">
                    <label className="h-content-third-content-container-top-payment">
                      Payment{" "}
                      {item.transactionType === "AdminUpdate"
                        ? "Type"
                        : "Method"}
                    </label>
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label className="h-content-third-content-container-top-payment-val">
                      {item.paymentType}
                    </label>
                  </div>
                </div>
                {/** FOURTH CONTAINER */}
                <div className="h-content-fourth">
                  <div className="h-content-third-content-container-top">
                    <label className="h-content-third-content-container-top-payment">
                      {item.transactionType === "Deposit"
                        ? "Transaction ID"
                        : "Transaction type"}
                    </label>
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label className="h-content-third-content-container-top-payment-val">
                      {item.transactionId
                        ? item.transactionId
                        : item.transactionType}
                    </label>
                  </div>
                </div>
                {/** FIFTH CONTAINER */}
                <div className="h-content-fourth">
                  <div className="h-content-third-content-container-top">
                    {item.paymentStatus === "Completed" && (
                      <FaRegCheckCircle color={COLORS.green} size={"1.3rem"} />
                    )}
                    {item.paymentStatus === "Pending" && (
                      <MdPendingActions color={COLORS.yellow} size={"1.3rem"} />
                    )}
                    {item.paymentStatus === "Cancelled" && (
                      <FcCancel color={COLORS.red} size={"1.3rem"} />
                    )}
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label
                      className="h-content-third-content-container-bottom-status"
                      style={{
                        color:
                          item.paymentStatus === "Completed"
                            ? COLORS.green
                            : item.paymentStatus === "Cancelled"
                            ? COLORS.red
                            : COLORS.yellow,
                      }}
                    >
                      {item.paymentStatus}
                    </label>
                  </div>
                </div>
              </div>

              <ImageAlertModal
                isOpen={isAlertOpen}
                onClose={handleCloseAlert}
                imageUrl={selectedReceiptUrl} // Use the state holding the selected receipt URL
              />

              {expandedItems[item._id] && (
                <>
                  <div
                    className="h-content-org"
                    style={{
                      borderTop: `1px solid ${COLORS.result_lightblue}`,
                    }}
                  >
                    {/** THIRD CONTAINER */}
                    <div className="h-content-third" style={{ flex: 1 }}>
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Receipt
                        </label>
                      </div>
                      <div
                        className="h-content-third-content-container-bottom"
                        onClick={() => handleOpenAlert(item)}
                      >
                        <label className="h-content-third-content-container-top-payment-val">
                          {item.paymentupdatereceipt ? "Show Receipt" : "NA"}
                        </label>
                      </div>
                    </div>

                    {/** FOURTH CONTAINER */}
                    <div className="h-content-fourth" style={{ flex: 4 }}>
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Note
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {item.paymentUpdateNote
                            ? item.paymentUpdateNote
                            : "NA"}
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
   
    </div>
  );
}

export default Historyc;

{
  /* <div className="h-content-left-content-icon-container">
{item.transactionType === "Deposit" ? (
  <PiHandDepositBold
    color={COLORS.background}
    size={"2.5rem"}
  />
) : (
  <PiHandWithdrawBold
    color={COLORS.background}
    size={"2.5rem"}
  />
)}
</div> */
}

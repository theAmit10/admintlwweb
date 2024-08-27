import React, { useCallback, useEffect, useState } from "react";
import "./AllWithdraw.css";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../assets/constants/colors";
import AllLocation, { locationdata } from "../alllocation/AllLocation";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import {
  useGetAllWithdrawQuery,
  useUpdateDepositPaymentStatusMutation,
} from "../../helper/Networkcall";
import moment from "moment";
import { showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { multiplyStringNumbers } from "../alldeposit/AllDeposit";
import { AlertModal } from "../helper/AlertModal";
import { ImageAlertModal } from "../helper/ImageAlertModal";
import { servername } from "../../helper/UrlHelper";

export const AllWithdraw = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const dispatch = useDispatch();

  const paymentType = "crypto";

  const handleSearch = (e) => {
    const text = e.target.value;
    if (data) {
      const filtered = data.withdrawals.filter((item) =>
        item.userId.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // FOR ALL WITHDRAW
  const { accesstoken, user } = useSelector((state) => state.user);

  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const { isLoading, data, isError, refetch } =
    useGetAllWithdrawQuery(accesstoken);

  console.log(data);

  useEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch])
  );

  // FOR UPDATING PAYMENT STATUS
  const [
    updateDepositPaymentStatus,
    { isLoading: updateStatusIsLoading, error: updateStatusError },
  ] = useUpdateDepositPaymentStatusMutation();

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
  };

  useEffect(() => {
    if (!isLoading) {
      console.log("USE Effect running");
      setFilteredData(data.withdrawals);
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

  const copyToClipboard = (val) => {
    Clipboard.setString(val);
    Toast.show({
      type: "success",
      text1: "Text Copied",
      text2: "The text has been copied to your clipboard!",
    });
  };

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

  return (
    <div className="allDepositContainer">
      {/** SEARCH CONTATINER */}
      <div className="alSearchContainer">
        <div className="searchIconContainer">
          <CiSearch color={COLORS.background} size={"2.5rem"} />
        </div>

        <input
          className="al-search-input"
          placeholder="Search UserId"
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
              <label className="dHeaderContainerLabel">Payment Details</label>
            </div>
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">Payment method</label>
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
              <div
                className="wContentContainer"
                key={index}
                style={{
                  minHeight: expandedItems[index] ? "20rem" : "5rem",
                }}
                onClick={() => toggleItem(index)}
              >
                {/** MAIN CONTENT */}
                <div className="wContentContainerMain">
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">
                      {item.userId}
                    </label>
                  </div>
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">
                      show details
                    </label>
                  </div>
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">UPI</label>
                  </div>
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">
                      {multiplyStringNumbers(
                        item.amount,
                        item.currency !== undefined
                          ? item.currency.countrycurrencyvaluecomparedtoinr
                          : 1
                      )}{" "}
                      INR
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

                {/** payment CONTENT */}
                {expandedItems[index] && (
                  <>
                    {item.paymentType === "Upi" && (
                      <div
                        className="wContentContainerMain"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Payment Type
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            UPI Holder Name
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            UPI ID
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            Remark
                          </label>
                        </div>
                      </div>
                    )}
                    {item.paymentType === "Upi" && (
                      <div className="wContentContainerMain">
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">UPI</label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleCopyClick(item.upiHolderName)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.upiHolderName}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleCopyClick(item.upiId)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.upiId}
                          </label>
                        </div>

                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.remark === "" ? "NA" : item.remark}
                          </label>
                        </div>
                      </div>
                    )}

                    {item.paymentType === "Bank" && (
                      <div
                        className="wContentContainerMain"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Bank Name
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Holder Name
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            IFSC code
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Account No.
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            Remark
                          </label>
                        </div>
                      </div>
                    )}
                    {item.paymentType === "Bank" && (
                      <div className="wContentContainerMain">
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleCopyClick(item.bankName)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.bankName}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() =>
                            handleCopyClick(item.accountHolderName)
                          }
                        >
                          <label className="dHeaderContainerLabel">
                            {item.accountHolderName}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleCopyClick(item.bankIFSC)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.bankIFSC}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() =>
                            handleCopyClick(item.bankAccountNumber)
                          }
                        >
                          <label className="dHeaderContainerLabel">
                            {item.bankAccountNumber}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.remark === "" ? "NA" : item.remark}
                          </label>
                        </div>
                      </div>
                    )}

                    {item.paymentType === "Skrill" && (
                      <div
                        className="wContentContainerMain"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Payment Type
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Contact
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            Remark
                          </label>
                        </div>
                      </div>
                    )}
                    {item.paymentType === "Skrill" && (
                      <div className="wContentContainerMain">
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            SKRILL
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleCopyClick(item.skrillContact)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.skrillContact}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.remark === "" ? "NA" : item.remark}
                          </label>
                        </div>
                      </div>
                    )}

                    {item.paymentType === "Paypal" && (
                      <div
                        className="wContentContainerMain"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Payment Type
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Email address
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            Remark
                          </label>
                        </div>
                      </div>
                    )}
                    {item.paymentType === "Paypal" && (
                      <div className="wContentContainerMain">
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            PAYPAL
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleCopyClick(item.paypalEmail)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.paypalEmail}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.remark === "" ? "NA" : item.remark}
                          </label>
                        </div>
                      </div>
                    )}

                    {item.paymentType === "Crypto" && (
                      <div
                        className="wContentContainerMain"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Payment Type
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Wallet address
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Network
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            Remark
                          </label>
                        </div>
                      </div>
                    )}
                    {item.paymentType === "Crypto" && (
                      <div className="wContentContainerMain">
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Crypto
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() =>
                            handleCopyClick(item.cryptoWalletAddress)
                          }
                        >
                          <label className="dHeaderContainerLabel">
                            {item.cryptoWalletAddress}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          onClick={() => handleCopyClick(item.networkType)}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.networkType}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.remark === "" ? "NA" : item.remark}
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

import React, { useState } from "react";
import "./PaymentDeposit.css";
import { FaWallet } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { UpiDeposit } from "./UpiDeposit";
import { CryptoDeposit } from "./CryptoDeposit";
import { BankDeposit } from "./BankDeposit";
import { PayPalDeposit } from "./PaypalDeposit";
import { SkrillDeposit } from "./SkrillDeposit";

function PaymentDeposit() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const selectingPaymentType = (item) => {
    setSelectedPayment(item);
  };

  const [showPD, setShowPD] = useState(true);
  const [selectItem, setSelectItem] = useState("");
  const [showEditSA, setShowEditSA] = useState(false);

  const settingEditSA = (item) => {
    setShowSA(false);
    setShowEditSA(true);
    setSelectItem(item);
  };

  const backHanndler = () => {
    setShowSA(true);
    setShowEditSA(false);
    setSelectItem("");
  };

  return (
    <div className="pdContainer">
      {selectedPayment === "" && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Payment Deposit
            </label>
          </div>
        </div>
      )}

      {/** SHOWING ALL WALLET */}
      {selectedPayment === "" && (
        <div className="pnMainContainer">
          <div className="hdAllContainer" style={{ background: "transparent" }}>
            {/** UPI  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("upi")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">UPI</label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create UPI Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.upi}
                    color={COLORS.background}
                    size={"1rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** Bank */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("bank")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Bank
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Bank Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.bank}
                    color={COLORS.background}
                    className="pdicon"
                    size={"2.5rem"}
                  />
                </div>
              </div>
            </div>

            {/** PAYPAL  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("paypal")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Paypal
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Paypal Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.paypal}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** SKRILL */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("skrill")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Skrill
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Skrill Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.skrill}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** CRYPTO  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("crypto")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Crypto
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Crypto Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.crypto}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPayment === "upi" && (
        <UpiDeposit selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "crypto" && (
        <CryptoDeposit selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "bank" && (
        <BankDeposit selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "paypal" && (
        <PayPalDeposit selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "skrill" && (
        <SkrillDeposit selectingPaymentType={selectingPaymentType} />
      )}
    </div>
  );
}

export default PaymentDeposit;

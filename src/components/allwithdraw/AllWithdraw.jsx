import React, { useState } from "react";
import "./AllWithdraw.css";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import COLORS from "../../assets/constants/colors";
import AllLocation, { locationdata } from "../alllocation/AllLocation";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

export const AllWithdraw = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const dispatch = useDispatch();

  const paymentType = "crypto";

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          placeholder="Search"
          label="Search"
          onChange={handleSearch}
        />
      </div>

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
        {locationdata.map((item, index) => (
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
                <label className="dHeaderContainerLabel">1009</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">show details</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">UPI</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">100800INR</label>
              </div>
              <div
                className="dHeaderContainerLabelContainer"
                style={{ flex: 2 }}
              >
                <div className="allContentContainerIconContainer">
                  <CiCircleCheck color={COLORS.background} size={"2.5rem"} />
                </div>

                <label className="dHeaderContainerLabel">Pending</label>
                <div className="allContentContainerIconContainer">
                  <MdOutlineCancel color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            </div>

            {/** payment CONTENT */}
            {expandedItems[index] && (
              <>
                {paymentType === "upi" && (
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
                      <label className="dHeaderContainerLabel">UPI ID</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Amount</label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">Remark</label>
                    </div>
                  </div>
                )}
                {paymentType === "upi" && (
                  <div className="wContentContainerMain">
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">UPI</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Alok</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552@ybl
                      </label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552INR
                      </label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">
                        I want my money
                      </label>
                    </div>
                  </div>
                )}

                {paymentType === "bank" && (
                  <div
                    className="wContentContainerMain"
                    style={{ backgroundColor: COLORS.green }}
                  >
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Bank Name</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        Holder Name
                      </label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">IFSC code</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        Account No.
                      </label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Amount</label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">Remark</label>
                    </div>
                  </div>
                )}
                {paymentType === "bank" && (
                  <div className="wContentContainerMain">
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">SBI</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Alok</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552888
                      </label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552888
                      </label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552INR
                      </label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">
                        I want my money
                      </label>
                    </div>
                  </div>
                )}

                {paymentType === "skrill" && (
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
                      <label className="dHeaderContainerLabel">Contact</label>
                    </div>

                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Amount</label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">Remark</label>
                    </div>
                  </div>
                )}
                {paymentType === "skrill" && (
                  <div className="wContentContainerMain">
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">SKRILL</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        Alok@skrill
                      </label>
                    </div>

                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552INR
                      </label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">
                        I want my money
                      </label>
                    </div>
                  </div>
                )}

                {paymentType === "paypal" && (
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

                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Amount</label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">Remark</label>
                    </div>
                  </div>
                )}
                {paymentType === "paypal" && (
                  <div className="wContentContainerMain">
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">SKRILL</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        Alok@skrill
                      </label>
                    </div>

                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552INR
                      </label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">
                        I want my money
                      </label>
                    </div>
                  </div>
                )}

                {paymentType === "crypto" && (
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
                      <label className="dHeaderContainerLabel">Network</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Amount</label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">Remark</label>
                    </div>
                  </div>
                )}
                {paymentType === "crypto" && (
                  <div className="wContentContainerMain">
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Crypto</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">Alok</label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552@ybl
                      </label>
                    </div>
                    <div className="dHeaderContainerLabelContainer">
                      <label className="dHeaderContainerLabel">
                        98766552INR
                      </label>
                    </div>
                    <div
                      className="dHeaderContainerLabelContainer"
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <label className="dHeaderContainerLabel">
                        I want my money
                      </label>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

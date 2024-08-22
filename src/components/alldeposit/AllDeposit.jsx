import React, { useState } from "react";
import "./AllDeposit.css";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import COLORS from "../../assets/constants/colors";
import AllLocation, { locationdata } from "../alllocation/AllLocation";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

export const AllDeposit = () => {
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
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
          <label className="dHeaderContainerLabel">Transaction ID</label>
        </div>
        <div className="dHeaderContainerLabelContainer">
          <label className="dHeaderContainerLabel">Payment method</label>
        </div>
        <div className="dHeaderContainerLabelContainer">
          <label className="dHeaderContainerLabel">Receipt</label>
        </div>
        <div className="dHeaderContainerLabelContainer">
          <label className="dHeaderContainerLabel">Amount</label>
        </div>
        <div className="dHeaderContainerLabelContainer" style={{ flex: 2 }}>
          <label className="dHeaderContainerLabel">Action</label>
        </div>
      </div>

      <div className="allLocationMainContainer">
        {locationdata.map((item, index) => (
          <div className="dContentContainer">
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">1009</label>
            </div>
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">8298328932932323</label>
            </div>
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">UPI</label>
            </div>
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">Show Receipt</label>
            </div>
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">100800INR</label>
            </div>
            <div className="dHeaderContainerLabelContainer" style={{ flex: 2 }}>
            <div className="allContentContainerIconContainer">
                  <CiCircleCheck color={COLORS.background} size={"2.5rem"} />
                </div>
               
              <label className="dHeaderContainerLabel">Pending</label>
              <div className="allContentContainerIconContainer">
                  <MdOutlineCancel color={COLORS.background} size={"2.5rem"} />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

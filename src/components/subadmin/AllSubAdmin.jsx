import React, { useState } from "react";
import "./AllSubAdmin.css";
import { locationdata } from "../alllocation/AllLocation";
import { CiSearch } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import images from "../../assets/constants/images";

export const AllSubAdmin = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [showSA, setShowSA] = useState(true);
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
    <div className="asdcontainer">
      {/** TOP NAVIGATION CONTATINER */}
      {showSA && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              All Sub Admin
            </label>
          </div>
        </div>
      )}

      {showSA && (
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
      )}

      {showSA && (
        <div className="asdMainContainer">
          {locationdata.map((item, index) => (
            <div
              key={index}
              className="allContentContainer-al"
              onClick={() => settingEditSA(item)}
            >
              <label className="allContentContainerLimitL">
                User ID : 1190
              </label>
              <label className="allContentContainerLocationL">Rohan</label>

              <div className="userimage">
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="userimg"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {showEditSA && (
        <div className="asdMainContainer">
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backHanndler}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Edit Sub Admin
              </label>
            </div>
          </div>

          <div className="asdccontainer">
            <label className="alCreatLocationTopContainerlabel">
              Select Role
            </label>

            <div className="roleContainer">
              <label className="alCreatLocationTopContainerlabel">Admin</label>
            </div>

            <div className="roleContainer">
              <label className="alCreatLocationTopContainerlabel">
                Sub Admin
              </label>
            </div>

            <div className="roleContainer">
              <label className="alCreatLocationTopContainerlabel">User</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

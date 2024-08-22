import React, { useState } from "react";
import "./Balancesheet.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

function Balancesheet() {
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const selectingLocation = (item) => {
    setSelectedLocation(item);
  };

  const backhandlerSelectedLocation = () => {
    setSelectedLocation(null);
  };

  //  FOR CREATING AND UPDATING

  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  const [showCreateAbout, setShowCrateAbout] = useState(false);

  const settingShowCreateAboutUs = () => {
    setShowCrateAbout(true);
  };

  const backHandlerCreateAboutUs = () => {
    setShowCrateAbout(false);
  };

  return (
    <div className="gameDescriptionContainer">
      <div className="allLocationMainContainer-bs">
        {/** CONTENT */}
        {locationdata.map((item, index) => (
          <div key={index} className="allContentContainer-bs">
            <div
              className="wContentContainerMain"
              style={{ backgroundColor: COLORS.green }}
            >
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Exchange</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Wallet</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Created At</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Withdrawal Bal</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Game Bal</label>
              </div>
              <div
                className="dHeaderContainerLabelContainer"
              >
                <label className="dHeaderContainerLabel">Total Bal</label>
              </div>
            </div>

            <div
              className="wContentContainerMain"
            >
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">-120INR</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Withdrawal Wallet</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">August 21, 2024 02:30PM</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">79000INR</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">89000INR</label>
              </div>
              <div
                className="dHeaderContainerLabelContainer"
              >
                <label className="dHeaderContainerLabel">8900000INR</label>
              </div>
            </div>

           
          </div>
        ))}
      </div>
    </div>
  );
}

export default Balancesheet;

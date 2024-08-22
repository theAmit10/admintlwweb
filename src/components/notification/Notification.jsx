import React, { useState } from "react";
import "./Notification.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

function Notification() {
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
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Notification
          </label>
        </div>
      </div>

      <div className="allLocationMainContainer">
        {/** CONTENT */}
        {locationdata.map((item, index) => (
          <div key={index} className="allContentContainer-about">
            <label className="allContentContainerLocationL">{item.name}</label>
            <label className="allContentContainerLimitL">
              Max {item.limit}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;

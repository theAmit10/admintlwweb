import React, { useState } from "react";
import "./GameDescription.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

function GameDescription() {
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

  return (
    <div className="gameDescriptionContainer">
      {/** SEARCH CONTATINER */}

      {!selectedLocation && (
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

      {!selectedLocation && (
        <div className="allLocationMainContainer">
          {/** CONTENT */}
          {locationdata.map((item, index) => (
            <div
              key={index}
              className="allContentContainer-al"
              onClick={() => selectingLocation(item)}
            >
              <label className="allContentContainerLocationL">
                {item.name}
              </label>
              <label className="allContentContainerLimitL">
                Max {item.limit}
              </label>
            </div>
          ))}
        </div>
      )}

      {selectedLocation && (
        <div className="allLocationMainContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerSelectedLocation}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                {selectedLocation.name}
              </label>
            </div>
          </div>

           {/** TITLE */}
           <label className="alCLLabel">Title</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter title"
                value={titleValue}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/** DESCRIPTION */}
           <label className="alCLLabel">Description</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoDocumentText color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter description"
                value={discriptionValue}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

             {/** SUBMIT CONTATINER */}
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>


        </div>
      )}
    </div>
  );
}

export default GameDescription;

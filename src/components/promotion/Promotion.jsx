import React, { useState } from "react";
import "./Promotion.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import images from "../../assets/constants/images";

function Promotion() {
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

  const [showCreateAbout, setShowCrateAbout] = useState(false)

  const settingShowCreateAboutUs = () => {
    setShowCrateAbout(true)
  }

  const backHandlerCreateAboutUs = () => {
    setShowCrateAbout(false)
  }

  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="gameDescriptionContainer">
   

      {!showCreateAbout && (
         <div className="alCreatLocationTopContainer">
        
         <div className="alCreatLocationTopContaineCL">
           <label className="alCreatLocationTopContainerlabel">
           All Promotions
           </label>
         </div>
       </div>
      )}

      {!showCreateAbout && (
        <div className="promotionMainContainer">
          {/** CONTENT */}
          {locationdata.map((item, index) => (
            <div
              key={index}
              className="allContentContainer-promotion"
           
            >
                <div className="promotionImageContainer">
                    
                <img
                      src={images.user}
                      alt="promotion"
                      className="proimg"
                    />
                </div>
              
                <div className="allContentContainerIconContainer">
                  <MdDelete color={COLORS.background} size={"2.5rem"} />
                </div>
            </div>
          ))}
        </div>
      )}

      {!showCreateAbout && (
        <div className="alBottomContainer"    onClick={() => settingShowCreateAboutUs()}>
          <label className="alBottomContainerlabel">Create new promotion</label>
        </div>
      )}

      {showCreateAbout && (
        <div className="allLocationMainContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHandlerCreateAboutUs}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
              Create new promotion
              </label>
            </div>
          </div>

          {/** TITLE */}
          <label className="alCLLabel">Select Image</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <div className="imageContainerAC">
              <input
                className="al-search-input"
                placeholder="Enter country symbol"
                type="file"
                name="file"
                onChange={selectDoc}
              />
            </div>
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

export default Promotion;

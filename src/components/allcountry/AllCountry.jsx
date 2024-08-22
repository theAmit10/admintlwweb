import React, { useState } from "react";
import "./AllCountry.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";

function AllCountry() {
  const [filteredData, setFilteredData] = useState([]);
  const [showCountry, setShowCountry] = useState(true);
  const [showCreateCountry, setShowCreateCountry] = useState(false);
  const [showEditCountry, setShowEditCountry] = useState(false);
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

  //  FOR CREATING AND UPDATING

  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  const settingCreateCountry = () => {
    setShowCountry(false);
    setShowCreateCountry(true);
  };
  const backHandlerCreateCountry = () => {
    setShowCountry(true);
    setShowCreateCountry(false);
  };

  const [countryname, setcountryname] = useState("");
  const [countrycurrencysymbol, setcountrycurrencysymbol] = useState("");
  const [
    countrycurrencyvaluecomparedtoinr,
    setcountrycurrencyvaluecomparedtoinr,
  ] = useState("");
  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const settingEditCountry = () => {
    setShowCountry(false);
    setShowCreateCountry(false);
    setShowEditCountry(true)
  };
  const backHandlerEditCountry = () => {
    setShowEditCountry(false)
    setShowCreateCountry(false);
    setShowCountry(true);
  };

  return (
    <div className="gameDescriptionContainer">
      {/** TOP NAVIGATION CONTATINER */}
      {showCountry && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              All Country
            </label>
          </div>
        </div>
      )}

      {showCountry && (
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

      {showCountry && (
        <div className="acMainContainer">
          {/** CONTENT */}
          {locationdata.map((item, index) => (
            <div
              key={index}
              className="allContentContainer-al"
              onClick={() => selectingLocation(item)}
            >
              <label className="allContentContainerLocationL">
                United State of America
              </label>
              <label className="allContentContainerLimitL">USD</label>
              <label className="allContentContainerLimitL">
                1 USD = 100 INR
              </label>

              <div className="allContentContainerIconContainer"
              onClick={settingEditCountry}
              >
                <CiEdit color={COLORS.background} size={"2.5rem"} />
              </div>
              <div className="allContentContainerIconContainer">
                <MdDelete color={COLORS.background} size={"2.5rem"} />
              </div>
            </div>
          ))}
        </div>
      )}

      {showCountry && (
        <div className="alBottomContainer" onClick={settingCreateCountry}>
          <label className="alBottomContainerlabel">Create country</label>
        </div>
      )}

      {showCreateCountry && (
        <div className="acMainContainer-create">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHandlerCreateCountry}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Country
              </label>
            </div>
          </div>

          {/** NAME */}
          <label className="alCLLabel">Country name</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter country name"
              value={countryname}
              onChange={(e) => setcountryname(e.target.value)}
            />
          </div>

          {/** SYMBOL */}
          <label className="alCLLabel">Country symbol</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter country symbol"
              value={countrycurrencysymbol}
              onChange={(e) => setcountrycurrencysymbol(e.target.value)}
            />
          </div>

          {/** ICON */}
          <label className="alCLLabel">Country Flag</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
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

          {/** value */}
          <label className="alCLLabel">Currency value compared to INR</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter Currency value compared to INR"
              value={countrycurrencyvaluecomparedtoinr}
              onChange={(e) =>
                setcountrycurrencyvaluecomparedtoinr(e.target.value)
              }
            />
          </div>

          {/** SUBMIT CONTATINER */}
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}

      {showEditCountry && (
        <div className="acMainContainer-create">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHandlerEditCountry}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Edit Country
              </label>
            </div>
          </div>

        

          {/** value */}
          <label className="alCLLabel">Currency value compared to INR</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter Currency value compared to INR"
              value={countrycurrencyvaluecomparedtoinr}
              onChange={(e) =>
                setcountrycurrencyvaluecomparedtoinr(e.target.value)
              }
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

export default AllCountry;

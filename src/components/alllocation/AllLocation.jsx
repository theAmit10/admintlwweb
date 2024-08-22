import React, { useState } from "react";
import "./AllLocation.css";
import { CiSearch } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";

import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import images from "../../assets/constants/images";

export const locationdata = [
  {
    id: "1",
    name: "Canada",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
      { id: "18", time: "09:00 AM" },
      { id: "19", time: "10:00 AM" },
      { id: "20", time: "11:00 AM" },
      { id: "21", time: "12:00 PM" },
      { id: "22", time: "01:00 PM" },
      { id: "23", time: "02:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Japan",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Punjab",
    limit: "200 - 200X",
    times: [
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "4",
    name: "Pune",
    limit: "200 - 200X",
    times: [
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "5",
    name: "China",
    limit: "100 - 100X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "6",
    name: "India",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "7",
    name: "USA",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Korea",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
];

function AllLocation() {
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (checked) => {
    setIsToggled(checked);
  };

  const [showAllLocation, setShowAllLocation] = useState(true);
  const [showAllTime, setShowAllTime] = useState(false);
  const [showAllDate, setShowAllDate] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCreateLocation, setShowCreateLocation] = useState(false);
  const [showCreateTime, setShowCreateTime] = useState(false);
  const [showCreateDate, setShowCreateDate] = useState(false);
  const [showCreateResult, setShowCreateResult] = useState(false);

  const settingCreateLocation = () => {
    setShowAllLocation(false);
    setShowCreateLocation(true);
  };

  const [enterData, setEnterData] = useState("");
  const [rangeData, setRangeData] = useState("");
  const [maximumReturn, setmaximumReturn] = useState("");

  const backhandlerCreateLocation = () => {
    setShowAllLocation(true);
    setShowCreateLocation(false);
  };

  // FOR TIME
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const selectingLocation = (item) => {
    setSelectedLocation(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(true);
  };

  const backhandlerCreateTime = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(true);
    setShowCreateTime(false);
  };

  const backhandlerAllTime = () => {
    setShowAllLocation(true);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
  };

  const settingCreateTime = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(true);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  // for date

  const selectingTime = (item) => {
    setSelectedTime(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowAllDate(true);
  };

  const backhandlerCreateDate = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowCreateDate(false);
    setShowAllDate(true);
  };

  const backhandlerAllDate = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(true);
    setShowCreateTime(false);
    setShowCreateDate(false);
    setShowAllDate(false);
  };

  const settingCreateDate = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(true);
  };

  // Result

  const selectingDate = (item) => {
    setSelectedDate(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowAllDate(false);
    setShowCreateResult(false);
    setShowResult(true);
  };

  const settingCreateResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(false);
    setShowResult(false);
    setShowCreateResult(true);
  };

  const backhandlerResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(true);
    setShowCreateDate(false);
    setShowResult(false);
    setShowCreateResult(false);
  };

  const backhandlerCreateResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(false);
    setShowResult(true);
    setShowCreateResult(false);
  };

  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);

  const [nextResultData, setNextResultData] = useState("");

  return (
    <>
      {showAllLocation && (
        <div className="allLocationContainer">
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
          <div className="allLocationMainContainer">
            {/** CONTENT */}
            {locationdata.map((item, index) => (
              <div
                className="allContentContainer-al"
                onClick={() => selectingLocation(item)}
              >
                <label className="allContentContainerLocationL">Paris</label>
                <label className="allContentContainerLimitL">Max 10-10x</label>

                <div className="switchContainer">
                  <label className="allContentContainerLimitL">Manual</label>
                  <label className="allContentContainerLimitL">
                    <Switch
                      checked={isToggled}
                      onChange={handleToggle}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      className="react-switch"
                    />
                  </label>
                  <label className="allContentContainerLimitL">Automatic</label>
                </div>

                <div className="allContentContainerIconContainer">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
                <div className="allContentContainerIconContainer">
                  <MdDelete color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            ))}
          </div>
          {/** SEARCH CONTATINER */}
          <div className="alBottomContainer" onClick={settingCreateLocation}>
            <label className="alBottomContainerlabel">Create Location</label>
          </div>
        </div>
      )}

      {showCreateLocation && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateLocation}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Location
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Location Name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter location name"
                value={enterData}
                onChange={(e) => setEnterData(e.target.value)}
              />
            </div>

            {/** MAXIMUM RNAGE */}
            <label className="alCLLabel">Maximum Range</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="For example:  2 - 2x"
                value={rangeData}
                onChange={(e) => setRangeData(e.target.value)}
              />
            </div>

            {/** MAXIMUM RETURN */}
            <label className="alCLLabel">Maximum Number</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="For example:  2x"
                value={maximumReturn}
                onChange={(e) => setmaximumReturn(e.target.value)}
              />
            </div>
          </div>

          {/** SUBMIT CONTATINER */}
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}

      {showAllTime && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerAllTime}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Time
              </label>
            </div>
          </div>
          {/** SEARCH CONTATINER */}
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <CiSearch color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Search for time"
              label="Search"
              onChange={handleSearch}
            />
          </div>
          <div className="allLocationMainContainer-time">
            {/** CONTENT */}
            {selectedLocation.times.map((item, index) => (
              <div
                className="allContentContainer-al"
                onClick={() => selectingTime(item)}
              >
                <label className="allContentContainerLocationL">
                  {item.time}
                </label>

                <div className="alllEditControllerContainer">
                  <div className="allContentContainerIconContainer">
                    <CiEdit color={COLORS.background} size={"2.5rem"} />
                  </div>
                  <div className="allContentContainerIconContainer">
                    <MdDelete color={COLORS.background} size={"2.5rem"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/** SEARCH CONTATINER */}
          <div className="alBottomContainer" onClick={settingCreateTime}>
            <label className="alBottomContainerlabel">Create Time</label>
          </div>
        </div>
      )}

      {showCreateTime && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateTime}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Time
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Select Time</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiTimer color={COLORS.background} size={"2.5rem"} />
              </div>

              <div className="timeContainerAL">
                <DatePicker
                  value={time}
                  onChange={setTime}
                  format="hh:mm A"
                  plugins={[<TimePicker key={1} />]}
                />
              </div>
            </div>
          </div>

          {/** SUBMIT CONTATINER */}
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}

      {showAllDate && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerAllDate}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Date
              </label>
            </div>
          </div>

          {/** SEARCH CONTATINER */}
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <CiSearch color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Search for date"
              label="Search"
              onChange={handleSearch}
            />
          </div>
          <div className="allLocationMainContainer-time">
            {/** CONTENT */}
            {selectedLocation.times.map((item, index) => (
              <div
                className="allContentContainer-al"
                onClick={() => selectingDate(item)}
              >
                <label className="allContentContainerLocationL">
                  24-06-2024
                </label>

                <div className="alllEditControllerContainer">
                  <div className="allContentContainerIconContainer">
                    <CiEdit color={COLORS.background} size={"2.5rem"} />
                  </div>
                  <div className="allContentContainerIconContainer">
                    <MdDelete color={COLORS.background} size={"2.5rem"} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/** SEARCH CONTATINER */}
          <div className="alBottomContainer" onClick={settingCreateDate}>
            <label className="alBottomContainerlabel">Create Date</label>
          </div>
        </div>
      )}

      {showCreateDate && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateDate}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Date
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Select Date</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiTimer color={COLORS.background} size={"2.5rem"} />
              </div>

              <div className="timeContainerAL">
                <DatePicker
                  value={date}
                  onChange={setDate}
                  format="DD-MM-YYYY"
                />
              </div>
            </div>
          </div>

          {/** SUBMIT CONTATINER */}
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}

      {showResult && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerResult}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">Result</label>
            </div>
          </div>

          <div className="allLocationMainContainer-result">
            {/** Time content container */}
            <div className="hdLocationContainerRightTimeContainerContentContainer-result">
              <div className="hdLocationContainerRightTimeContainerContentContainer-resultright">
                <div className="trophyimagecontainer">
                  <img
                    src={images.cups}
                    alt="trphy"
                    className="catandtrophyimg"
                  />
                </div>

                <div className="hdLocationContainerRightTimeContainerContentContainer-resultleft">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-number">
                    09
                  </label>
                  <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-date">
                    24-07-2024
                  </label>
                </div>

                <div className="catimagecontainer">
                  <img src={images.cat} alt="cat" className="catandtrophyimg" />
                </div>
              </div>
            </div>
          </div>

          {/** SEARCH CONTATINER */}
          <div className="alBottomContainer" onClick={settingCreateResult}>
            <label className="alBottomContainerlabel">Create Result</label>
          </div>
          <div className="alBottomContainer" onClick={settingCreateTime}>
            <label className="alBottomContainerlabel">Update Result</label>
          </div>
        </div>
      )}

      {showCreateResult && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateResult}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Result
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Result Number</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter result number"
                value={enterData}
                onChange={(e) => setEnterData(e.target.value)}
              />
            </div>

            {/** MAXIMUM RNAGE */}
            <label className="alCLLabel">Next Result</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter next result"
                value={nextResultData}
                onChange={(e) => setNextResultData(e.target.value)}
              />
            </div>
          </div>

          {/** SUBMIT CONTATINER */}
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}
    </>
  );
}

export default AllLocation;

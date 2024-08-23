import React, { useState } from "react";
import "./PlayLocation.css";
import { locationdata } from "../alllocation/AllLocation";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { PiSubtitles } from "react-icons/pi";

export const PlayLocation = () => {
  const [showPL, setShowPL] = useState(true);
  const [showD, setShowD] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [showPlayInsight, setShowPlayInsight] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedtime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [resultnumber, setresultnumber] = useState("");
  const [nextresult, setnextresult] = useState("");

  const paymentType = "upi";

  const settingShowDate = (loc, time) => {
    setShowPL(false);
    setShowPlay(false);
    setShowPlayInsight(false);
    setShowD(true);
    setSelectedLocation(loc);
    setSelectedTime(time);
  };

  const settingShowPlay = (date) => {
    setShowPL(false);
    setShowD(false);
    setShowPlayInsight(false);
    setShowPlay(true);
    setSelectedDate(date);
  };

  const settingShowPlayInsight = () => {
    setShowPL(false);
    setShowD(false);
    setShowPlayInsight(true);
    setShowPlay(false);
  };

  const backhandlerDate = () => {
    setShowPL(true);
    setShowD(false);
  };

  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="PLContainer">
      {showPL && (
        <div className="PLContainerMain">
          {locationdata.map((item, index) => (
            <div className="PLCotentContainer">
              <div className="PLCotentContainerLeft">
                <div
                  className="PLLLocContainer"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(90deg, #1993FF, #0F5899)"
                        : "linear-gradient(90deg, #7EC630, #3D6017)",
                  }}
                >
                  <label className="locLabel">{item.name}</label>
                  <label className="limitLabel">Max {item.limit}</label>
                </div>
              </div>
              <div className="PLCotentContainerRight">
                {item.times.map((timedata, timeindex) => (
                  <div
                    className="PLRTimeContainer"
                    onClick={() => settingShowDate(item, timedata)}
                  >
                    <label className="timeLabel">{timedata.time}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showD && (
        <div className="PLContainerMain">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerDate}>
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
                onClick={() => settingShowPlay(item)}
              >
                <label className="allContentContainerLocationL">
                  24-06-2024
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPlay && (
        <div className="PLContainerMain">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerDate}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <label className="alCreatLocationTopContainerlabel">
              {selectedLocation.name} {selectedLocation.limit}
            </label>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                {selectedtime.time}
              </label>
            </div>
            <label
              className="alCreatLocationTopContainerlabel"
              style={{
                paddingRight: "1rem",
              }}
            >
              24-09-2024{" "}
            </label>
          </div>

          <div className="dHeaderContainer">
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">No.</label>
            </div>
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">No. of bets</label>
            </div>
            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">Number</label>
            </div>

            <div className="dHeaderContainerLabelContainer">
              <label className="dHeaderContainerLabel">Amount</label>
            </div>
            <div
              className="dHeaderContainerLabelContainer"
              style={{ flex: 2, justifyContent: "center" }}
            >
              <label className="dHeaderContainerLabel">
                Distribution Amount
              </label>
            </div>
          </div>

          <div className="PLPMainContainer">
            {locationdata.map((item, index) => (
              <div
                className="wContentContainer"
                key={index}
                style={{
                  minHeight: expandedItems[index] ? "30rem" : "5rem",
                }}
                onClick={() => toggleItem(index)}
              >
                {/** MAIN CONTENT */}
                <div className="wContentContainerMain">
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">{index + 1}</label>
                  </div>
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">3</label>
                  </div>
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">99</label>
                  </div>
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">100800INR</label>
                  </div>
                  <div
                    className="dHeaderContainerLabelContainer"
                    style={{ flex: 2, justifyContent: "center" }}
                  >
                    <label className="dHeaderContainerLabel">
                      109902093INR
                    </label>
                  </div>
                </div>

                {/** payment CONTENT */}
                {expandedItems[index] && (
                  <>
                    <div className="plBottomContainer">
                      <div
                        className="wContentContainerMain"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            User Details
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            User ID
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Number
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            Amount
                          </label>
                        </div>
                      </div>

                      {locationdata.map((litem, lindex) => (
                        <div className="wContentContainerMain">
                          <div className="dHeaderContainerLabelContainer">
                            <label className="dHeaderContainerLabel">
                              Alok
                            </label>
                          </div>
                          <div className="dHeaderContainerLabelContainer">
                            <label className="dHeaderContainerLabel">
                              1009
                            </label>
                          </div>
                          <div className="dHeaderContainerLabelContainer">
                            <label className="dHeaderContainerLabel">99</label>
                          </div>
                          <div className="dHeaderContainerLabelContainer">
                            <label className="dHeaderContainerLabel">
                              89238923INR
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="alBottomContainer" onClick={settingShowPlayInsight}>
            <label className="alBottomContainerlabel">Game Insights</label>
          </div>
        </div>
      )}

      {showPlayInsight && (
        <div className="PLContainerMain">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerDate}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <label className="alCreatLocationTopContainerlabel">
              {selectedLocation.name} {selectedLocation.limit}
            </label>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                {selectedtime.time}
              </label>
            </div>
            <label
              className="alCreatLocationTopContainerlabel"
              style={{
                paddingRight: "1rem",
              }}
            >
              24-09-2024{" "}
            </label>
          </div>

          <div className="PLGIMainContainer">
            <div className="PLGIMainContainerLeft">
              <div className="PLPIContentC">
                <label className="pdR">Total Numbers of Bets</label>
                <label className="pdB">89</label>
              </div>

              <div className="PLPIContentC">
                <label className="pdR">Total amount on bet</label>
                <label className="pdB">899090 INR</label>
              </div>

              <div className="PLPIContentC">
                <label className="pdR"> Most bet on number 99</label>
                <label className="pdB">899090 INR</label>
              </div>

              <div className="PLPIContentC">
                <label className="pdR"> Least bet on number 09</label>
                <label className="pdB">80 INR</label>
              </div>

              {/** TITLE */}
              <label className="alCLLabel" style={{ marginBottom: "-2rem" }}>
                Result Number
              </label>
              <div
                className="alSearchContainer"
                style={{ marginBottom: "-0.5rem" }}
              >
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter result numer"
                  value={resultnumber}
                  onChange={(e) => setresultnumber(e.target.value)}
                />
              </div>

              <label className="alCLLabel" style={{ marginBottom: "-2rem" }}>
                Next Result
              </label>
              <div
                className="alSearchContainer"
                style={{ marginBottom: "-0.5rem" }}
              >
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter next result"
                  value={nextresult}
                  onChange={(e) => setnextresult(e.target.value)}
                />
              </div>

              <div
                className="alBottomContainer"
                onClick={settingShowPlayInsight}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            </div>

            {/** RIGHT COMPONENT */}

            <div className="PLGIMainContainerRight">
              <div className="PLGIRComponent">
                <div className="PLGIRtop">
                  <div className="PLGIRtopL">
                    <label className="pdB">Paris</label>
                  </div>
                  <div className="PLGIRtopR">
                  <label className="pdSB">Next Result</label>
                  <label className="pdR">09:00 PM</label>
                  </div>
                </div>
                <div className="PLGIRmiddle">
                <label className="rnL">24</label>
                </div>
                <div className="PLGIRbottom">
                  <div className="PLGIRbottomCon">
                  <label className="pdR">24-12-2023</label>
                  <label className="pdR">09:00 PM</label>
                  <label className="pdR">24</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import "./HomeDashboard.css";
import { FaHome } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { ImTrophy } from "react-icons/im";
import { FaPlay } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import images from "../../assets/constants/images";

export const HomeDashboard = ({ selectedComponent, handleComponentClick }) => {
  const [timeVisible, setTimeVisible] = useState(true);
  const [dateVisible, setDateVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const settingTimeVisbility = (val) => {
    setResultVisible(false);
    setTimeVisible(true);
    setDateVisible(false);
  };

  const dateBackhandler = () => {
    setResultVisible(false);
    setTimeVisible(true);
    setDateVisible(false);
  };

  const resultBackhandler = () => {
    setResultVisible(false);
    setTimeVisible(false);
    setDateVisible(true);
  };

  return (
    <div className="homeDashboardContainer">
      {/** ALL ITEMS */}
      <div className="hdAllContainer">
        {/** ALL USERS */}
        <div className="hdAllContainerContent"
        onClick={() => handleComponentClick("alluser")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">Users</label>
            <label className="hdAllContainerContentTopBoldLabel">57</label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of Users
            </label>
            <div className="hdContenContainerIcon">
              <FaPeopleGroup color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>

        {/** NEW USERS */}
        <div className="hdAllContainerContent"
        onClick={() => handleComponentClick("newuser")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">
              New Users
            </label>
            <label className="hdAllContainerContentTopBoldLabel">57</label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of New Users in Last 24h
            </label>
            <div className="hdContenContainerIcon">
              <GrUserNew color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>
        {/** LOCATION */}
        <div className="hdAllContainerContent"
        onClick={() => handleComponentClick("alllocation")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">
              Locations
            </label>
            <label className="hdAllContainerContentTopBoldLabel">57</label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of Locations
            </label>
            <div className="hdContenContainerIcon">
              <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>
        {/** RESULT */}
        <div className="hdAllContainerContent"
        onClick={() => handleComponentClick("subadmin")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">Results</label>
            <label className="hdAllContainerContentTopBoldLabel">57</label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of Results
            </label>
            <div className="hdContenContainerIcon">
              <ImTrophy color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>
        {/** PLAY */}
        <div className="hdAllContainerContent"
        onClick={() => handleComponentClick("play")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">Play</label>
            <label className="hdAllContainerContentTopBoldLabel">57</label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of Play
            </label>
            <div className="hdContenContainerIcon">
              <FaPlay color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>
        {/** SUB ADMIN */}
        <div className="hdAllContainerContent"
        onClick={() => handleComponentClick("subadmin")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">
              Sub Admin
            </label>
            <label className="hdAllContainerContentTopBoldLabel">57</label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of Sub Admin
            </label>
            <div className="hdContenContainerIcon">
              <MdAdminPanelSettings color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>
      </div>

      {/** LOCATION */}
      <div className="hdLocationContainer">
        <div className="hdLocationContainerLeft">
          <div className="hdLocationContainerLeftContent">
            <label className="hdLocationContainerLeftContentNameLabel">
              Paris
            </label>
            <label className="hdLocationContainerLeftContentLimitLabel">
              Max 10-10x
            </label>
          </div>
        </div>
        {/** RIGHT */}
        <div className="hdLocationContainerRight">
          {timeVisible && (
            <div className="hdLocationContainerRightTimeContainer">
              {/** TOP */}
              <div className="hdLocationContainerRightTimeContainerTop">
                <label className="hdLocationContainerLeftContentNameLabel">
                  Paris
                </label>
                <label className="hdLocationContainerLeftContentLimitLabel">
                  Max 10-10x
                </label>
              </div>

              {/** Time content container */}
              <div className="hdLocationContainerRightTimeContainerContentContainer">
                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    09:00 AM
                  </label>
                </div>

                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    09:00 AM
                  </label>
                </div>

                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    09:00 AM
                  </label>
                </div>
                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    09:00 AM
                  </label>
                </div>
                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    09:00 AM
                  </label>
                </div>
              </div>
            </div>
          )}

          {dateVisible && (
            <div className="hdLocationContainerRightTimeContainer">
              {/** TOP */}
              <div
                onClick={dateBackhandler}
                className="hdLocationContainerRightTimeContainerTop"
              >
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
                <label className="hdLocationContainerLeftContentNameLabel">
                  Paris
                </label>
                <label className="hdLocationContainerLeftContentLimitLabel">
                  Max 10-10x
                </label>
              </div>

              {/** Time content container */}
              <div className="hdLocationContainerRightTimeContainerContentContainer">
                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    27-05-2024
                  </label>
                </div>

                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    27-05-2024
                  </label>
                </div>

                <div className="hdLocationContainerRightTimeContainerContentContainer-time">
                  <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                    27-05-2024
                  </label>
                </div>
              </div>
            </div>
          )}

          {resultVisible && (
            <div className="hdLocationContainerRightTimeContainer">
              {/** TOP */}
              <div
                onClick={resultBackhandler}
                className="hdLocationContainerRightTimeContainerTop"
              >
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
                <label className="hdLocationContainerLeftContentNameLabel">
                  Paris
                </label>
                <label className="hdLocationContainerLeftContentLimitLabel">
                  Max 10-10x
                </label>
              </div>

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
                    <img
                      src={images.cat}
                      alt="cat"
                      className="catandtrophyimg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

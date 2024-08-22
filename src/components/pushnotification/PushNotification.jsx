import React, { useState } from "react";
import "./PushNotification.css";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { ImTrophy } from "react-icons/im";
import { FaPlay } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";
import { IoIosNotifications } from "react-icons/io";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { locationdata } from "../alllocation/AllLocation";
import { CiSearch } from "react-icons/ci";

export const PushNotification = () => {
  const [showPN, setShowPN] = useState(true);
  const [showAU, setShowAU] = useState(false);
  const [showCreateAllUser, setShowCreateAllUser] = useState(false);
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // FOR ALL USER
  const settingForAllUsers = () => {
    setShowPN(false);
    setShowAU(false);
    setShowCreateNewUser(false);
    setShowNotification(false);
    setShowCreateAllUser(true);
  };

  const BackHandlerForAllUsers = () => {
    setShowPN(true);
    setShowAU(false);
    setShowCreateAllUser(false);
    setShowCreateNewUser(false);
    setShowNotification(false);
  };

  // FOR SINGLE USER
  const settingForSingleUsers = () => {
    setShowPN(false);
    setShowCreateAllUser(false);
    setShowCreateNewUser(false);
    setShowNotification(false);
    setShowAU(true);
  };

  const settingForSingleUsersCreate = () => {
    setShowPN(false);
    setShowCreateNewUser(true);
    setShowNotification(false);
    setShowAU(false);
    setShowCreateAllUser(false);
  };

  const BackHandlerForSingleUsers = () => {
    setShowPN(true);
    setShowAU(false);
    setShowCreateAllUser(false);
    setShowCreateNewUser(false);
    setShowNotification(false);
  };

  // FOR ALL NOTIFICAITON
  const settingForAllNotification = () => {
    setShowPN(false);
    setShowAU(false);
    setShowCreateAllUser(false);
    setShowCreateNewUser(false);
    setShowNotification(true);
  };

  const BackHandlerForAllNotification = () => {
    setShowPN(true);
    setShowAU(false);
    setShowCreateAllUser(false);
    setShowCreateNewUser(false);
    setShowNotification(false);
  };

  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="pn-containter">
      {/** TOP NAVIGATION CONTATINER */}
      {showPN && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Push Notification
            </label>
          </div>
        </div>
      )}

      {showPN && (
        <div className="pnMainContainer">
          <div className="hdAllContainer" style={{ background: "transparent" }}>
            {/** ALL USERS */}
            <div className="hdAllContainerContent" onClick={settingForAllUsers}>
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  All Users
                </label>
                <label className="hdAllContainerContentTopBoldLabel">57</label>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Push Notification for all users
                </label>
                <div className="hdContenContainerIcon">
                  <FaPeopleGroup color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            </div>

            {/** SINGLE USERS */}
            <div
              className="hdAllContainerContent"
              onClick={settingForSingleUsers}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Single User
                </label>
                <label className="hdAllContainerContentTopBoldLabel">57</label>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Push Notification for single user
                </label>
                <div className="hdContenContainerIcon">
                  <GrUserNew color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            </div>
            {/** ALL NOTIFICATION */}
            <div
              className="hdAllContainerContent"
              onClick={settingForAllNotification}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Notifications
                </label>
                <label className="hdAllContainerContentTopBoldLabel">57</label>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  List of previous notification
                </label>
                <div className="hdContenContainerIcon">
                  <IoIosNotifications
                    color={COLORS.background}
                    size={"2.5rem"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateAllUser && (
        <div className="pnMainContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={BackHandlerForAllUsers}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Push Notification for All Users
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

          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}

      {showAU && (
        <div className="pnMainContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={BackHandlerForSingleUsers}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Push Notification for Single User
              </label>
            </div>
          </div>

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

          <div className="alluMainContainer">
            {/** CONTENT */}
            {locationdata.map((item, index) => (
              <div
                key={index}
                className="allContentContainer-al"
                onClick={settingForSingleUsersCreate}
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
        </div>
      )}

      {/** SINGLE USER */}
      {showCreateNewUser && (
        <div className="pnMainContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={BackHandlerForAllUsers}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Push Notification for Single User
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

          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}

      {
        showNotification && (
          <div className="allNotificataionContainer">
            <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={BackHandlerForAllUsers}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Notifications
              </label>
            </div>
          </div>

          <div className="allNotificataionContainerContent">
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
        )
      }


    </div>
  );
};

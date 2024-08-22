import React, { useState } from "react";
import "./AllWallet.css";
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
import { FaWallet } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

export const AllWallet = () => {
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

  const [enterData, setEnterData] = useState('');

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
              All Wallet
            </label>
          </div>
        </div>
      )}

      {/** SHOWING ALL WALLET */}
      {showPN && (
        <div className="pnMainContainer">
          <div className="hdAllContainer" style={{ background: "transparent" }}>
            {/** ALL USERS */}
            <div className="hdAllContainerContent" onClick={settingForAllUsers}>
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Wallet One
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Current name for Wallet One
                </label>
                <div className="hdContenContainerIcon">
                  <FaWallet color={COLORS.background} size={"2.5rem"} />
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
                  Wallet Two
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Current name for Wallet Two
                </label>
                <div className="hdContenContainerIcon">
                  <FaWallet color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/** SHOWING MODIFICATION FOR WALLET ONE */}
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
                Wallet One
              </label>
            </div>
          </div>

          {/** TITLE */}
          <label className="alCLLabel">Wallet name</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter wallet one name"
              value={enterData}
              onChange={(e) => setEnterData(e.target.value)}
            />
          </div>

          

          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}

      {/** SHOWING MODIFICATION FOR WALLET TWO */}
      {showAU && (
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
              Wallet Two
            </label>
          </div>
        </div>

        {/** TITLE */}
        <label className="alCLLabel">Wallet name</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder="Enter wallet two name"
            value={enterData}
            onChange={(e) => setEnterData(e.target.value)}
          />
        </div>

        

        <div className="alBottomContainer">
          <label className="alBottomContainerlabel">Submit</label>
        </div>
      </div>
      )}

    </div>
  );
};

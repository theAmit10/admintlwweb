import React, { useState } from "react";
import "./NewUser.css";
import { locationdata } from "../alllocation/AllLocation";
import { CiSearch } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import images from "../../assets/constants/images";
import { FaWallet } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GrUserNew } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { PiSubtitles } from "react-icons/pi";
import Switch from "react-switch";
import { IoDocumentText } from "react-icons/io5";

export const NewUser = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [amount, setAmount] = useState("");
  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [showSA, setShowSA] = useState(true);
  const [selectItem, setSelectItem] = useState("");
  const [showEditSA, setShowEditSA] = useState(false);
  const [showEditWO, setShowEditWO] = useState(false);
  const [showEditWT, setShowEditWT] = useState(false);
  const [showEditUI, setShowEditUI] = useState(false);
  const [showEditN, setShowEditN] = useState(false);

  const settingEditSA = (item) => {
    setShowSA(false);
    setShowEditSA(true);
    setSelectItem(item);
  };

  const backHanndler = () => {
    setShowSA(true);
    setShowEditSA(false);
    setSelectItem("");
  };

  const settingForWalletOne = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(true);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
  };

  const settingForWalletTwo = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(true);
    setShowEditUI(false);
    setShowEditN(false);
  };

  const settingForUserId = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(true);
    setShowEditN(false);
  };

  const settingForNotication = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(true);
  };

  const backHanndlerWalletOne = () => {
    setShowSA(false);
    setShowEditSA(true);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
  };

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (checked) => {
    setIsToggled(checked);
  };

  const [walletVisibilty, setWalletVisibility] = useState(true);
  const toggleVisibility = () => {
    setWalletVisibility(!walletVisibilty);
  };

  return (
    <div className="asdcontainer">
      {/** TOP NAVIGATION CONTATINER */}
      {showSA && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">New User</label>
          </div>
        </div>
      )}

      {showSA && (
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

      {showSA && (
        <div className="asdMainContainer">
          {locationdata.map((item, index) => (
            <div
              key={index}
              className="allContentContainer-al"
              onClick={() => settingEditSA(item)}
            >
              <label className="allContentContainerLimitL">
                User ID : 1190
              </label>
              <label className="allContentContainerLocationL">Rohan</label>

              <div className="userimage">
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="userimg"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {showEditSA && (
        <div className="pnMainContainer">
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backHanndler}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">User</label>
            </div>
          </div>
          <div className="hdAllContainer" style={{ background: "transparent" }}>
            {/** WALLET ONE  */}
            <div
              className="hdAllContainerContent"
              onClick={settingForWalletOne}
            >
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
                  Update wallet one balance
                </label>
                <div className="hdContenContainerIcon">
                  <FaWallet color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            </div>

            {/** WALLET TWO */}
            <div className="hdAllContainerContent"
             onClick={settingForWalletTwo}
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
                  Update wallet one balance
                </label>
                <div className="hdContenContainerIcon">
                  <FaWallet color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            </div>

            {/** USER ID  */}
            <div className="hdAllContainerContent"
            onClick={settingForUserId}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Uset ID
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Update user ID
                </label>
                <div className="hdContenContainerIcon">
                  <GrUserNew color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
            </div>

            {/** NOTIFICATIONL */}
            <div className="hdAllContainerContent"
            onClick={settingForNotication}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Notification
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  create a push notification
                </label>
                <div className="hdContenContainerIcon">
                  <AiFillNotification
                    color={COLORS.background}
                    size={"2.5rem"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/** FOR WALLET ONE */}
      {showEditWO && (
        <div className="asdcontainer">
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHanndlerWalletOne}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">Update Wallet One</label>
            </div>
          </div>
          {/** MAIN CONTAINER */}
          <div className="auMContainer">
            <label className="pdB">Wallet One</label>
            <label className="pdR">Current Balance</label>
            <label className="pdB">0 INR</label>

            {/** TITLE */}
            <label
              className="alCLLabel"
              style={{ marginLeft: "-2rem", marginTop: "1rem" }}
            >
              Amount
            </label>
            <div
              className="alSearchContainer"
              style={{ marginLeft: "-0.5rem" }}
            >
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <label className="pdSB">Wallet Visibility</label>
            <div className="wvisibilityC">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.white} size={"2.5rem"} />
              </div>
              <div className="wcl">
                <label className="pdR">Current Balance</label>
              </div>

              <div className="switchContainer">
                <label className="allContentContainerLimitL">Hide</label>
                <label className="allContentContainerLimitL">
                  <Switch
                    checked={walletVisibilty}
                    onChange={toggleVisibility}
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
                <label className="allContentContainerLimitL">Visible</label>
              </div>
            </div>
          </div>
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}
      {/** FOR WALLET ONE */}

      {/** FOR WALLET TWO */}
      {showEditWT && (
        <div className="asdcontainer">
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHanndlerWalletOne}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">Update Wallet Two</label>
            </div>
          </div>
          {/** MAIN CONTAINER */}
          <div className="auMContainer">
            <label className="pdB">Wallet Two</label>
            <label className="pdR">Current Balance</label>
            <label className="pdB">0 INR</label>

            {/** TITLE */}
            <label
              className="alCLLabel"
              style={{ marginLeft: "-2rem", marginTop: "1rem" }}
            >
              Amount
            </label>
            <div
              className="alSearchContainer"
              style={{ marginLeft: "-0.5rem" }}
            >
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <label className="pdSB">Wallet Visibility</label>
            <div className="wvisibilityC">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.white} size={"2.5rem"} />
              </div>
              <div className="wcl">
                <label className="pdR">Current Balance</label>
              </div>

              <div className="switchContainer">
                <label className="allContentContainerLimitL">Hide</label>
                <label className="allContentContainerLimitL">
                  <Switch
                    checked={walletVisibilty}
                    onChange={toggleVisibility}
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
                <label className="allContentContainerLimitL">Visible</label>
              </div>
            </div>
          </div>
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}
      {/** FOR WALLET TWO */}

      {/** FOR USER ID */}
      {showEditUI && (
        <div className="asdcontainer">
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHanndlerWalletOne}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">Update User ID</label>
            </div>
          </div>
          {/** MAIN CONTAINER */}
          <div className="auMContainer">
            
            <label className="pdR">Current User ID</label>
            <label className="pdB">1009</label>

            {/** TITLE */}
            <label
              className="alCLLabel"
              style={{ marginLeft: "-2rem", marginTop: "1rem" }}
            >
              User ID
            </label>
            <div
              className="alSearchContainer"
              style={{ marginLeft: "-0.5rem" }}
            >
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter user ID"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            
          </div>
          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}
      {/** FOR USER ID */}

      {/** FOR NOTIFICATION */}
      {
        showEditN && (
            <div className="pnMainContainer">
            {/** TOP NAVIGATION CONTATINER */}
            <div className="alCreatLocationTopContainer">
              <div
                className="searchIconContainer"
                onClick={backHanndlerWalletOne}
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
        )
      }
      {/** FOR NOTIFICATION */}
    </div>
  );
};

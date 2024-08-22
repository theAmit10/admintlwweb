import React, { useState } from "react";
import "./Admindashboard.css";
import images from "../../assets/constants/images";
import { IoIosNotifications } from "react-icons/io";
import COLORS from "../../assets/constants/colors";
import { TiThMenu } from "react-icons/ti";
import { TbWorld } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { GiTrophy } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { PiHandDepositFill } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { AiFillNotification } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { HomeDashboard } from "../../components/dashboard/HomeDashboard";
import AllLocation from "../../components/alllocation/AllLocation";
import GameDescription from "../../components/gameDescription/GameDescription";
import { AllDeposit } from "../../components/alldeposit/AllDeposit";
import { AllWithdraw } from "../../components/allwithdraw/AllWithdraw";

function Admindashboard() {
  // const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const handleComponentClick = (comp) => {
    console.log("clicked");
    setSelectedComponent(comp);
  };

  return (
    <div className="adminDashboardContainer">
      {/** TOP CONTAINER */}
      <div className="top-admin-d">
        {/** TOP LEFT */}
        <div className="top-left-d">
          <div className="top-left-left-d">
            <label className="hellolabel">Hello,</label>
            <label className="usernamelabel">Wasu</label>
          </div>
          <div className="top-left-right-d">
            <div className="userimagecontainer">
              <img
                src={images.user}
                alt="Profile Picture"
                className="userprofileimg"
              />
            </div>
          </div>
        </div>

        {/** TOP RIGHT */}
        <div className="top-right-d">
          <div className="top-right-left-d">
            <label className="dashboardlabel">DASHBOARD</label>
            <label className="dcontentlabel">Welcome to your dashboard</label>
          </div>
          <div className="top-right-right-d">
            <div className="iconcontainertop">
              <TbWorld color={COLORS.background} size={"3rem"} />
            </div>

            <div className="iconcontainertop">
              <IoIosNotifications color={COLORS.background} size={"3rem"} />
            </div>

            <div className="iconcontainertop">
              <TiThMenu color={COLORS.background} size={"3rem"} />
            </div>
          </div>
        </div>
      </div>
      {/** TOP CONTAINER END */}

      {/** MAIN CONTENT CONTAINER */}
      <div className="adminDashboardMainContainer">
        {/** LEFT  */}
        <div className="adLeftContainer">
          {/** CONTENT */}
          <div
            className="adLContenContainer"
            key={"dashboard"}
            onClick={() => handleComponentClick("dashboard")}
            style={{
              background:
                selectedComponent === "dashboard"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaHome color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Dashboard</label>
          </div>

          <div
            className="adLContenContainer"
            key={"alllocation"}
            onClick={() => handleComponentClick("alllocation")}
            style={{
              background:
                selectedComponent === "alllocation"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <IoLocationSharp color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">All Location</label>
          </div>

          <div
            className="adLContenContainer"
            key={"createresult"}
            onClick={() => handleComponentClick("createresult")}
            style={{
              background:
                selectedComponent === "createresult"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <GiTrophy color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Create Result</label>
          </div>

          <div
            className="adLContenContainer"
            key={"play"}
            onClick={() => handleComponentClick("play")}
            style={{
              background:
                selectedComponent === "play"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaPlay color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Play</label>
          </div>

          <div
            className="adLContenContainer"
            key={"alldeposit"}
            onClick={() => handleComponentClick("alldeposit")}
            style={{
              background:
                selectedComponent === "alldeposit"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <PiHandDepositFill color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Deposit</label>
          </div>

          <div
            className="adLContenContainer"
            key={"withdraw"}
            onClick={() => handleComponentClick("withdraw")}
            style={{
              background:
                selectedComponent === "withdraw"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <PiHandWithdrawFill color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Withdraw</label>
          </div>

          <div
            className="adLContenContainer"
            key={"payment"}
            onClick={() => handleComponentClick("payment")}
            style={{
              background:
                selectedComponent === "payment"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <MdPayments color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Payment</label>
          </div>

          <div
            className="adLContenContainer"
            key={"walletmod"}
            onClick={() => handleComponentClick("walletmod")}
            style={{
              background:
                selectedComponent === "walletmod"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaWallet color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Wallet</label>
          </div>

          <div
            className="adLContenContainer"
            key={"gamedescription"}
            onClick={() => handleComponentClick("gamedescription")}
            style={{
              background:
                selectedComponent === "gamedescription"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <TbFileDescription color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Game Desc</label>
          </div>

          <div
            className="adLContenContainer"
            key={"promotion"}
            onClick={() => handleComponentClick("promotion")}
            style={{
              background:
                selectedComponent === "promotion"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <AiFillNotification color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Promotions</label>
          </div>

          <div
            className="adLContenContainer"
            key={"notification"}
            onClick={() => handleComponentClick("notification")}
            style={{
              background:
                selectedComponent === "notification"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <IoIosNotifications color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Notification</label>
          </div>

          <div
            className="adLContenContainer"
            key={"aboutus"}
            onClick={() => handleComponentClick("aboutus")}
            style={{
              background:
                selectedComponent === "aboutus"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaInfoCircle color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">About us</label>
          </div>

          {/** CONTENT end */}
        </div>

        {/** RIGHT CONTINER */}
        <div className="adRightContainer">
          {selectedComponent === "dashboard" && <HomeDashboard />}
          {selectedComponent === "alllocation" && <AllLocation />}
          {selectedComponent === "gamedescription" && <GameDescription />}
          {selectedComponent === "alldeposit" && <AllDeposit />}
          {selectedComponent === "withdraw" && <AllWithdraw />}
        </div>
      </div>

      {/** MAIN CONTENT CONTAINER END */}
    </div>
  );
}

export default Admindashboard;

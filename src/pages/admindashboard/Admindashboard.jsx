import React, { useEffect, useState } from "react";
import "./Admindashboard.css";
import images from "../../assets/constants/images";
import { IoIosNotifications } from "react-icons/io";
import COLORS from "../../assets/constants/colors";
import { TiThMenu } from "react-icons/ti";
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
import Aboutus from "../../components/aboutus/Aboutus";
import Balancesheet from "../../components/balancesheet/Balancesheet";
import ChangePassword from "../../components/changepassword/ChangePassword";
import Logout from "../../components/logout/Logout";
import Notification from "../../components/notification/Notification";
import AllCountry from "../../components/allcountry/AllCountry";
import { PushNotification } from "../../components/pushnotification/PushNotification";
import { AllWallet } from "../../components/walletmodification/AllWallet";
import Promotion from "../../components/promotion/Promotion";
import { AllSubAdmin } from "../../components/subadmin/AllSubAdmin";
import { UpdateProfile } from "../../components/updateprofile/UpdateProfile";
import PaymentDeposit from "../../components/paymentdeposit/PaymentDeposit";
import Historyc from "../../components/history/Historyc";
import { PlayLocation } from "../../components/play/PlayLocation";
import { AllUser } from "../../components/alluser/AllUser";
import { NewUser } from "../../components/newuser/NewUser";
import { AllResults } from "../../components/allresult/AllResults";
import { FaBalanceScale } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/userAction";
import { MdGetApp } from "react-icons/md";
import { AppLink } from "../../components/applink/AppLink";
import { serverName } from "../../redux/store";
import { showWarningToast } from "../../components/helper/showErrorToast";
import { ToastContainer } from "react-toastify";

function Admindashboard() {
  // const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  // const handleComponentClick = (comp) => {
  //   console.log("clicked");
  //   setSelectedComponent(comp);
  // };
  const [reloadKey, setReloadKey] = useState(0); // Key to force re-render

  const handleComponentClick = (comp) => {
    if (selectedComponent === comp) {
      // If the same component is clicked, increment the reloadKey to force a reload
      setReloadKey((prevKey) => prevKey + 1);
      // showWarningToast("processing :: "+reloadKey)
    } else {
      // Otherwise, set the selected component and reset the key
      // showWarningToast("processing :: "+reloadKey)
      setSelectedComponent(comp);
      setReloadKey(0);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserAccessToken = async () => {
    try {
      const val = await localStorage.getItem("tlwaaccesstoken");
      console.log("From SS Access Token :: " + val);
      // dispatch(getUserAccessToken(val));
      dispatch({
        type: "getaccesstoken",
        payload: val,
      });

      dispatch(loadProfile(val));
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    getUserAccessToken();
  }, []);

  const { user, accesstoken, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, []);

  console.log(loading, user);

  return (
    <div className="adminDashboardContainer">
      {/** TOP CONTAINER */}
      <div className="top-admin-d">
        {/** TOP LEFT */}
        <div className="top-left-d">
          <div className="top-left-left-d">
            <label className="hellolabel">Hello,</label>
            <label className="usernamelabel">{user ? user.name : ""}</label>
          </div>
          <div className="top-left-right-d">
            <div className="userimagecontainer">
              {/* <img
                src={images.user}
                alt="Profile Picture"
                className="userprofileimg"
              /> */}

              <img
                src={
                  user?.avatar?.url
                    ? `${serverName}/uploads/${user?.avatar.url}`
                    : images.user
                }
                alt="Profile Picture"
                className="userprofileimg"
                onError={(e) => {
                  e.target.onerror = null; // Prevents looping
                  e.target.src = images.user; // Fallback to default image on error
                }}
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
            <div
              onClick={() => handleComponentClick("allcountry")}
              className="iconcontainertop"
            >
              <TbWorld color={COLORS.background} size={"3rem"} />
            </div>

            <div
              onClick={() => handleComponentClick("notification")}
              className="iconcontainertop"
            >
              <IoIosNotifications color={COLORS.background} size={"3rem"} />
            </div>

            <div
              onClick={() => handleComponentClick("dashboard")}
              className="iconcontainertop"
            >
              <FaHome color={COLORS.background} size={"3rem"} />
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
              <img src={images.play} style={{
                height: '5rem',
                width: '5rem',
              }}  />
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
            <label className="adLContenContainerLabel">Payment Opt.</label>
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

          {/* <div
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
          </div> */}

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
            key={"pushnotification"}
            onClick={() => handleComponentClick("pushnotification")}
            style={{
              background:
                selectedComponent === "pushnotification"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <IoIosNotifications color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Push Notification</label>
          </div>

          <div
            className="adLContenContainer"
            key={"balancesheet"}
            onClick={() => handleComponentClick("balancesheet")}
            style={{
              background:
                selectedComponent === "balancesheet"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaBalanceScale color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Transaction History</label>
          </div>

          <div
            className="adLContenContainer"
            key={"allcountry"}
            onClick={() => handleComponentClick("allcountry")}
            style={{
              background:
                selectedComponent === "allcountry"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <TbWorld color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">All Country</label>
          </div>

          <div
            className="adLContenContainer"
            key={"updateprofile"}
            onClick={() => handleComponentClick("updateprofile")}
            style={{
              background:
                selectedComponent === "updateprofile"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <MdOutlineManageAccounts color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Update Profile</label>
          </div>

          <div
            className="adLContenContainer"
            key={"changepassword"}
            onClick={() => handleComponentClick("changepassword")}
            style={{
              background:
                selectedComponent === "changepassword"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <RiLockPasswordFill color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Change Password</label>
          </div>

          <div
            className="adLContenContainer"
            key={"applink"}
            onClick={() => handleComponentClick("applink")}
            style={{
              background:
                selectedComponent === "applink"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <MdGetApp color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">App Link</label>
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

          <div
            className="adLContenContainer"
            key={"logout"}
            onClick={() => handleComponentClick("logout")}
            style={{
              background:
                selectedComponent === "logout"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <LuLogOut color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Log out</label>
          </div>

          {/** CONTENT end */}
        </div>

        {/** RIGHT CONTINER */}
        <div className="adRightContainer">
          {selectedComponent === "dashboard" && (
            <HomeDashboard
              selectedComponent={selectedComponent}
              handleComponentClick={handleComponentClick}
            />
          )}
          {selectedComponent === "alllocation" && <AllLocation  reloadKey={reloadKey} />}
          {selectedComponent === "createresult" && <AllLocation  reloadKey={reloadKey} />}
          {selectedComponent === "gamedescription" && <GameDescription reloadKey={reloadKey}  />}
          {selectedComponent === "alldeposit" && <AllDeposit reloadKey={reloadKey} />}
          {selectedComponent === "withdraw" && <AllWithdraw reloadKey={reloadKey} />}
          {selectedComponent === "aboutus" && <Aboutus reloadKey={reloadKey} />}
          {selectedComponent === "balancesheet" && <Balancesheet reloadKey={reloadKey} />}
          {selectedComponent === "changepassword" && <ChangePassword reloadKey={reloadKey} />}
          {selectedComponent === "logout" && (
            <Logout
              selectedComponent={selectedComponent}
              handleComponentClick={handleComponentClick}
            />
          )}
          {selectedComponent === "notification" && <Notification reloadKey={reloadKey} />}
          {selectedComponent === "pushnotification" && <PushNotification reloadKey={reloadKey} />}
          {selectedComponent === "allcountry" && <AllCountry key={reloadKey} />}
          {selectedComponent === "walletmod" && <AllWallet reloadKey={reloadKey} />}
          {selectedComponent === "promotion" && <Promotion reloadKey={reloadKey} />}
          {selectedComponent === "subadmin" && <AllSubAdmin reloadKey={reloadKey}  />}
          {selectedComponent === "updateprofile" && <UpdateProfile  reloadKey={reloadKey} />}
          {selectedComponent === "payment" && <PaymentDeposit reloadKey={reloadKey} />}
          {selectedComponent === "play" && <PlayLocation reloadKey={reloadKey} />}
          {selectedComponent === "alluser" && <AllUser reloadKey={reloadKey} />}
          {selectedComponent === "newuser" && <NewUser reloadKey={reloadKey} />}
          {selectedComponent === "allresults" && <AllResults />}
          {selectedComponent === "history" && <Historyc key={reloadKey} />}
          {selectedComponent === "applink" && <AppLink reloadKey={reloadKey} />}
        </div>
      </div>

      {/* <ToastContainer/> */}

      {/** MAIN CONTENT CONTAINER END */}
    </div>
  );
}

export default Admindashboard;

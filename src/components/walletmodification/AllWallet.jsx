import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/userAction";
import { LoadingComponent } from "../helper/LoadingComponent";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../helper/showErrorToast";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { ToastContainer } from "react-toastify";

export const AllWallet = ({reloadKey}) => {
  const [showPN, setShowPN] = useState(true);
  const [showAU, setShowAU] = useState(false);
  const [showCreateAllUser, setShowCreateAllUser] = useState(false);
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [walletname, setwalletname] = useState("");

  // FOR ALL USER
  const settingForAllUsers = (item) => {
    setShowPN(false);
    setShowAU(false);
    setwalletname(item);
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

  // FOR ALL WALLET

  const navigation = useNavigate();

  const { user, accesstoken, allusers, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  // Getting User Profile

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, [dispatch,reloadKey]);

  // FOR WALLET MODIFICATION

  const [enterData, setEnterData] = useState("");

  useEffect(() => {
    setEnterData("");
    dispatch({
      type: "clearCreateLocationMessage",
    });
  }, [loading, dispatch]);

  const submitHandlerForWalletModification = () => {
    console.log("Working on login ");
    if (!enterData) {
      showErrorToast("Please Enter Wallet Name");
    } else {
      showWarningToast("Processing");
      updateWalletName();
    }
  };

  const [showProgressBar, setProgressBar] = useState(false);

  const updateWalletName = async () => {
    try {
      setProgressBar(true);

      const url =
        walletname === "one"
          ? UrlHelper.UPDATE_WALLET_ONE_NAME_API
          : UrlHelper.UPDATE_WALLET_TWO_NAME_API;

      console.log("URL :: " + url);

      const { data } = await axios.put(
        url,
        {
          walletName: enterData,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data :: " + data.message);

      showSuccessToast(data.message);
      setEnterData("");
      BackHandlerForAllUsers();
      setProgressBar(false);
      dispatch(loadProfile(accesstoken));
    } catch (error) {
      setProgressBar(false);
      console.log(" Err :: " + error);
      // console.log(error.response.data.message);
      showErrorToast("Something went Wrong");
    }
  };

  return (
    <div className="pn-containter">
      {/** TOP NAVIGATION CONTATINER */}
      {/** SHOWING ALL WALLET */}
      {showPN && (
        <>
          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Wallet
              </label>
            </div>
          </div>

          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <div className="pnMainContainer">
                <div
                  className="hdAllContainer"
                  style={{ background: "transparent" }}
                >
                  {/** ALL USERS */}
                  <div
                    className="hdAllContainerContent"
                    onClick={() => settingForAllUsers("one")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {user.walletOne?.walletName}
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
                    onClick={() => settingForAllUsers("two")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {user.walletTwo?.walletName}
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
            </>
          )}
        </>
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

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitHandlerForWalletModification}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
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

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitHandlerForWalletModification}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
         <ToastContainer/>
    </div>
 
  );
};

import React, { useEffect, useState } from "react";
import "./AllUser.css";
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
import { useDispatch, useSelector } from "react-redux";
import { loadAllUsers, loadSingleUser } from "../../redux/actions/userAction";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { ToastContainer } from "react-toastify";

export const AllUser = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [amount, setAmount] = useState("");
  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

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

    dispatch(loadSingleUser(accesstoken, item._id));
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

  const backHanndlerUserId = () => {
    setShowSA(false);
    setShowEditSA(true);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
  };

  const [walletVisibiltyO, setWalletVisibilityO] = useState(true);
  const toggleVisibilityO = () => {
    setWalletVisibilityO(!walletVisibiltyO);
  };

  const [walletVisibiltyT, setWalletVisibilityT] = useState(true);
  const toggleVisibilityT = () => {
    setWalletVisibilityT(!walletVisibiltyT);
  };

  // FOR ALL USERS

  const dispatch = useDispatch();
  const { accesstoken, singleuser, loadingSingleUser } = useSelector(
    (state) => state.user
  );
  const { loadingAll, allusers } = useSelector((state) => state.user);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = allusers.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.userId?.toString() === text
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(loadAllUsers(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(allusers); // Update filteredData whenever locations change
  }, [allusers]);

  console.log(singleuser);

  useEffect(() => {
    if (singleuser && !loadingSingleUser) {
      if (singleuser.walletOne) {
        setWalletVisibilityO(singleuser.walletOne.visibility);
      }
      if (singleuser.walletTwo) {
        setWalletVisibilityT(singleuser.walletTwo.visibility);
      }
    }
  }, [singleuser, loadingSingleUser]);

  const [showProgressBar, setProgressBar] = useState(false);

  const submitHandlerForWalletUpdateOne = async () => {
    const url = `${UrlHelper.USER_WALLET_ONE_MODIFICATION_API}/${singleuser.walletOne._id}`;

    if (!amount) {
      showErrorToast("Please Enter Amount");
    } else {
      setProgressBar(true);

      try {
        const { data } = await axios.put(
          url,
          {
            balance: amount,
            visibility: walletVisibiltyO,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast("User Wallet Updated Successfully");

        dispatch(loadSingleUser(accesstoken, selectItem._id));
        setProgressBar(false);
        backHanndlerWalletOne();
        setAmount("");
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };
  const submitHandlerForWalletUpdateTwo = async () => {
    const url = `${UrlHelper.USER_WALLET_TWO_MODIFICATION_API}/${singleuser.walletTwo._id}`;

    if (!amount) {
      showErrorToast("Please Enter Amount");
    } else {
      setProgressBar(true);

      try {
        const { data } = await axios.put(
          url,
          {
            balance: amount,
            visibility: walletVisibiltyT,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast("User Wallet Updated Successfully");
        dispatch(loadSingleUser(accesstoken, selectItem._id));
        setProgressBar(false);
        backHanndlerWalletOne();
        setAmount("");
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  // FOR UPDATING USERID

  const [loadingUpdateUserId, setLoadingUpdateUserId] = useState(false);
  const submitHandlerForUpdateUserId = () => {
    if (!amount) {
      showErrorToast("Please enter new user id ");
    } else {
      updateUserId();
    }
  };

  const updateUserId = async () => {
    try {
      setLoadingUpdateUserId(true);
      const url = `${UrlHelper.UPDATE_USER_ID_API}/${selectItem.userId}`;

      console.log("URL :: " + url);

      const { data } = await axios.put(
        url,
        {
          newUserId: amount,
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
      setAmount("");
      backHanndlerUserId();
      setLoadingUpdateUserId(false);
    } catch (error) {
      setLoadingUpdateUserId(false);
      console.log(" Err :: " + error);
      showErrorToast("Something went Wrong");
    }
  };

  // FOR SINGLE NOTIFICAITON

  const [loadingSendNotification, setLoadingSendNotification] = useState(false);

  const sendNotificationToSingleUser = async () => {
    if (!titleValue) {
      showErrorToast("Enter Title");
    } else if (!discriptionValue) {
      showErrorToast("Enter Discription");
    } else {
      setLoadingSendNotification(true);

      try {
        const url = `${UrlHelper.SEND_NOTIFICATION_SINGLE_USER}`;
        const { data } = await axios.post(
          url,
          {
            title: titleValue,
            description: discriptionValue,
            devicetoken: singleuser?.devicetoken,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast(data.message);

        backHanndlerUserId();
        setLoadingSendNotification(false);
      } catch (error) {
        setLoadingSendNotification(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="asdcontainer">
      {/** TOP NAVIGATION CONTATINER */}
      {showSA &&
        (loadingAll ? (
          <LoadingComponent />
        ) : (
          <>
            <div className="alCreatLocationTopContainer">
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  All User
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

            {filteredData.length === 0 ? (
              <NodataFound title={"No data found"} />
            ) : (
              <div className="asdMainContainer">
                {filteredData.map((item, index) => (
                  <div
                    key={index}
                    className="allContentContainer-al"
                    onClick={() => settingEditSA(item)}
                  >
                    <label className="allContentContainerLimitL">
                      User ID : {item.userId}
                    </label>
                    <label className="allContentContainerLocationL">
                      {item.name}
                    </label>

                    <div className="userimage">
                      {item.avatar?.url ? (
                        <img
                          src={`${serverName}/uploads/${item.avatar.url}`}
                          alt="Profile Picture"
                          className="userimg"
                        />
                      ) : (
                        <img
                          src={images.user}
                          alt="Profile Picture"
                          className="userimg"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}

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
              <label className="alCreatLocationTopContainerlabel">
                {selectItem.name}
              </label>
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
            <div
              className="hdAllContainerContent"
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
            <div className="hdAllContainerContent" onClick={settingForUserId}>
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
            <div
              className="hdAllContainerContent"
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
      {showEditWO &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
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
                <label className="alCreatLocationTopContainerlabel">
                  Update Wallet One
                </label>
              </div>
            </div>
            {/** MAIN CONTAINER */}
            <div className="auMContainer">
              <label className="pdB">{singleuser.walletOne?.walletName}</label>
              <label className="pdR">Current Balance</label>
              <label className="pdB">
                {singleuser?.walletOne?.balance}{" "}
                {singleuser?.country?.countrycurrencysymbol}
              </label>

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
                      checked={walletVisibiltyO}
                      onChange={toggleVisibilityO}
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

            {showProgressBar ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={submitHandlerForWalletUpdateOne}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))}
      {/** FOR WALLET ONE */}

      {/** FOR WALLET TWO */}
      {showEditWT &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
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
                <label className="alCreatLocationTopContainerlabel">
                  Update Wallet Two
                </label>
              </div>
            </div>
            {/** MAIN CONTAINER */}
            <div className="auMContainer">
              <label className="pdB">{singleuser.walletTwo?.walletName}</label>
              <label className="pdR">Current Balance</label>
              <label className="pdB">
                {singleuser?.walletTwo?.balance}{" "}
                {singleuser?.country?.countrycurrencysymbol}
              </label>

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
                      checked={walletVisibiltyT}
                      onChange={toggleVisibilityT}
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

            {showProgressBar ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={submitHandlerForWalletUpdateTwo}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))}
      {/** FOR WALLET TWO */}

      {/** FOR USER ID */}
      {showEditUI &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
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
                <label className="alCreatLocationTopContainerlabel">
                  Update User ID
                </label>
              </div>
            </div>
            {/** MAIN CONTAINER */}
            <div className="auMContainer">
              <label className="pdR">Current User ID</label>
              <label className="pdB"> {singleuser.userId}</label>

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

            {loadingUpdateUserId ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={submitHandlerForUpdateUserId}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))}
      {/** FOR USER ID */}

      {/** FOR NOTIFICATION */}
      {showEditN &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
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

            {loadingSendNotification ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={sendNotificationToSingleUser}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))}
      {/** FOR NOTIFICATION */}

      <ToastContainer/>
    </div>
  );
};

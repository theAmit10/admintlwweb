import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { LoadingComponent } from "../helper/LoadingComponent";
import {
  loadAllNotification,
  loadAllUsers,
} from "../../redux/actions/userAction";
import { NodataFound } from "../helper/NodataFound";
import { MdDelete } from "react-icons/md";

export const PushNotification = () => {
  const [showPN, setShowPN] = useState(true);
  const [showAU, setShowAU] = useState(false);
  const [showCreateAllUser, setShowCreateAllUser] = useState(false);
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userdata, setuserdata] = useState(null);

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

  const settingForSingleUsersCreate = (item) => {
    setShowPN(false);
    setShowNotification(false);
    setShowAU(false);
    setShowCreateAllUser(false);
    setuserdata(item);
    setShowCreateNewUser(true);
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

  // const handleSearch = (e) => {
  //   const text = e.target.value;
  //   const filtered = abouts.filter((item) =>
  //     item.aboutTitle.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  // };

  const [enterData, setEnterData] = useState("");
  const {
    accesstoken,
    notifications,
    loadingNotification,
    loadingAll,
    allusers,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [showProgressBar, setProgressBar] = useState(false);

  const sendNotificationToAllUSer = async () => {
    if (!titleValue) {
      showErrorToast("Enter Title");
    } else if (!discriptionValue) {
      showErrorToast("Enter Discription");
    } else {
      setProgressBar(true);

      try {
        const url = `${UrlHelper.SEND_NOTIFICATION_FOR_ALL_USER}`;
        const { data } = await axios.post(
          url,
          {
            title: titleValue,
            description: discriptionValue,
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
        setProgressBar(false);
        BackHandlerForAllUsers();
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
        console.log(error.response.data.message);
      }
    }
  };

  // FOR ALL NOTIFICATION

  useEffect(() => {
    dispatch(loadAllNotification(accesstoken));
  }, [dispatch]);

  const [selectedItem, setSelectedItem] = useState("");

  // FOR SINGLE NOTIFICAITON

  const sendNotificationToSingleUser = async () => {
    if (!titleValue) {
      showErrorToast("Enter Title");
    } else if (!discriptionValue) {
      showErrorToast("Enter Discription");
    } else {
      setProgressBar(true);

      try {
        const url = `${UrlHelper.SEND_NOTIFICATION_SINGLE_USER}`;
        const { data } = await axios.post(
          url,
          {
            title: titleValue,
            description: discriptionValue,
            devicetoken: userdata?.devicetoken,
            userId: userdata._id
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
        setProgressBar(false);
        BackHandlerForSingleUsers();
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
        console.log(error.response.data.message);
      }
    }
  };

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

  // FOR DELETING NOTIFICATION

  const deleteLocationHandler = async (item) => {
    console.log("Item clicked :: " + item._id);
    setProgressBar(true);
    setSelectedItem(item._id);

    try {
      const url = `${UrlHelper.DELETE_NOTIFICATION_API}/${item._id}`;
      const { data } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + data);

      showSuccessToast(data.message);
      setProgressBar(false);
      dispatch(loadAllNotification(accesstoken));
    } catch (error) {
      setProgressBar(false);
      console.log(error?.response?.data?.message);
      showErrorToast("Something went wrong");
      console.log(error);
    }
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

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={sendNotificationToAllUSer}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showAU && (
        <div className="pnAUMainContainer">
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

          <div className="alluAUMainContainer">
            {/** CONTENT */}
            {loadingAll ? (
              <LoadingComponent />
            ) : (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  className="allContentContainer-al"
                  onClick={() => settingForSingleUsersCreate(item)}
                >
                  <label className="allContentContainerLocationL">
                    {item.name}
                  </label>
                  <label className="allContentContainerLimitL">
                    User Id - {item.userId}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/** SINGLE USER */}
      {showCreateNewUser && userdata && (
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

          {showProgressBar ? (
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
      )}

      {showNotification && (
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

          {loadingNotification ? (
            <LoadingComponent />
          ) : notifications && notifications.length === 0 ? (
            <NodataFound title={"No data found"} />
          ) : (
            <div className="allNotificataionContainerContent">
              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="allContentContainer-about"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <label className="allContentContainerLocationL">
                    {item.title}
                  </label>
                  <label className="allContentContainerLimitL">
                    {item.description}
                  </label>
                  <div
                    className="bcd"
                    style={{
                      flex: 1,
                      width: "90%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignContent: "flex-end",
                    }}
                  >
                    {selectedItem === item._id ? (
                      <LoadingComponent />
                    ) : (
                      <div
                        className="allContentContainerIconContainer"
                        onClick={() => deleteLocationHandler(item)}
                      >
                        <MdDelete color={COLORS.background} size={"2.5rem"} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

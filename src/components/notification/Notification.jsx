import React, { useEffect, useState } from "react";
import "./Notification.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { loadAllNotification } from "../../redux/actions/userAction";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { useGetAdminNotificationQuery } from "../../helper/Networkcall";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { MdDelete } from "react-icons/md";

function Notification() {
  const dispatch = useDispatch();
  const { accesstoken, notifications, loadingNotification } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadAllNotification(accesstoken));
  }, [dispatch]);

  const [selectedItem, setSelectedItem] = useState("");
  const [showProgressBar, setProgressBar] = useState(false);

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
    <div className="gameDescriptionContainer">
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Notification
          </label>
        </div>
      </div>

      <div className="allLocationMainContainer">
        {/** CONTENT */}
        {loadingNotification ? (
          <LoadingComponent />
        ) : notifications && notifications.length == 0 ? (
          <NodataFound title={"No data found"} />
        ) : (
          notifications?.map((item, index) => (
            <div key={index} className="allContentContainer-about" style={{
              display: 'flex',
              alignItems : 'center',
              justifyContent: 'center'
            }}>
              <label className="allContentContainerLocationL">
                {item.title}
              </label>
              <label className="allContentContainerLimitL">
                {item.description}
              </label>
              <div className="bcd" style={{
                flex:1,
                width: '90%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignContent: 'flex-end'
              }}>
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
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;

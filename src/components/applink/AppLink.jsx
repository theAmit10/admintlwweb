import React, { useEffect, useState } from "react";
import "./AppLink.css";
import COLORS from "../../assets/constants/colors";
import { AiFillAndroid } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import {
  useAddAppLinkMutation,
  useDeleteAppLinkMutation,
  useGetAppLinkQuery,
} from "../../helper/Networkcall";
import { useSelector } from "react-redux";
import { LoadingComponent } from "../helper/LoadingComponent";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";

export const AppLink = ({reloadKey} ) => {
  const [showAll, setShowAll] = useState(true);
  const [showAddAndroid, setShowAndroid] = useState(false);
  const [showAddIos, setShowAddIos] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [androidLink, setAndroidLink] = useState("");
  const [iosLink, setIosLink] = useState("");
  const [title, setTitle] = useState("App Link");

  const settingShowAdd = () => {
    setShowAndroid(true);
    setShowAll(false);
    setShowAddIos(false);
  };

  const settingShowAddAndroid = () => {
    setShowAndroid(true);
    setShowAll(false);
    setShowAddIos(false);
    setTitle("Android");
  };

  const settingShowAddIos = () => {
    setShowAndroid(false);
    setShowAll(false);
    setShowAddIos(true);
    setTitle("IOS");
  };

  const backHandlerShowAdd = () => {
    setShowAndroid(false);
    setShowAll(true);
    setShowAddIos(false);
    setTitle("App Link");
  };

  const { accesstoken } = useSelector((state) => state.user);
  const { data, isLoading, refetch } = useGetAppLinkQuery(accesstoken);

  // useEffect(() => {
  //   refetch();
  // }, [refetch,reloadKey]);

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     data?.appLink?.androidLink
  //       ? setAndroidLink(data?.appLink?.androidLink)
  //       : setAndroidLink("");

  //     data?.appLink?.iosLink
  //       ? setIosLink(data.appLink.iosLink)
  //       : setIosLink("");
  //   }
  // }, [isLoading, data]);

  useEffect(() => {
    console.log("Reload Key changed:", reloadKey);
    try {
      refetch();
    } catch (error) {
      console.error("Error during refetch:", error);
    }
  }, [reloadKey, refetch]);

  useEffect(() => {
    if (!isLoading && data) {
      console.log("Fetched data:", data);
      setAndroidLink(data?.appLink?.androidLink || "");
      setIosLink(data?.appLink?.iosLink || "");
    }
  }, [isLoading, data]);

  const [addAppLink, { isLoading: createIsLoading }] = useAddAppLinkMutation();

  const submitCreateAndroidRequest = async () => {
    if (!androidLink) {
      showErrorToast("Enter android link");
      return;
    } else {
      try {
        const body = {
          androidLink: androidLink,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await addAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);
        showSuccessToast(res.message);
        refetch();
        backHandlerShowAdd();
      } catch (error) {
        console.log("Error during deposit:", error);
        showErrorToast("Something went wrong");
      }
    }
  };

  const submitCreateIosRequest = async () => {
    if (!iosLink) {
      showErrorToast("Enter ios link");
      return;
    } else {
      try {
        const body = {
          iosLink: iosLink,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await addAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);
        showSuccessToast(res.message);
        refetch();
        backHandlerShowAdd();
      } catch (error) {
        console.log("Error during deposit:", error);
        showErrorToast("Something went wrong");
      }
    }
  };

  const [deleteAppLink, { isLoading: deleteIsLoading }] =
    useDeleteAppLinkMutation();

  const submitDeleteIosRequest = async () => {
    if (!iosLink) {
      showErrorToast("ios link not available");
      return;
    } else {
      try {
        const body = {
          iosLink: true,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await deleteAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);
        showSuccessToast(res.message);
        refetch();
        backHandlerShowAdd();
        setIosLink("");
      } catch (error) {
        console.log("Error during deposit:", error);
        showErrorToast("Something went wrong");
      }
    }
  };

  const submitDeleteAndroidRequest = async () => {
    if (!androidLink) {
      showErrorToast("android link not available");
      return;
    } else {
      try {
        const body = {
          androidLink: true,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await deleteAppLink({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log(res);
        showSuccessToast(res.message);
        refetch();
        backHandlerShowAdd();
        setAndroidLink("");
      } catch (error) {
        console.log("Error during deposit:", error);
        showErrorToast("Something went wrong");
      }
    }
  };

  return (
    <div className="applinkContainer">
      <div className="alCreatLocationTopContainer">
        {title === "App Link" ? null : title === "Android" ? (
          <div className="searchIconContainer" onClick={backHandlerShowAdd}>
            <IoArrowBackCircleOutline color={COLORS.white_s} size={"2.5rem"} />
          </div>
        ) : (
          <div className="searchIconContainer" onClick={backHandlerShowAdd}>
            <IoArrowBackCircleOutline color={COLORS.white_s} size={"2.5rem"} />
          </div>
        )}

        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">{title}</label>
        </div>
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {showAll && (
            <div className="applink-container-main">
              <div className="androidC">
                <div
                  className="iconcontainertop"
                  onClick={settingShowAddIos}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <FaApple color={COLORS.background} size={"2.5rem"} />
                </div>
                <label
                  className="applabel"
                  onClick={settingShowAddIos}
                  style={{
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {iosLink === "" ? "No link available" : iosLink}
                </label>

                {deleteIsLoading ? (
                  <LoadingComponent />
                ) : (
                  iosLink && (
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      className="iconcontainertop"
                      onClick={submitDeleteIosRequest}
                    >
                      <MdDelete color={COLORS.background} size={"2.5rem"} />
                    </div>
                  )
                )}
              </div>

              <div className="androidC">
                <div
                  className="iconcontainertop"
                  onClick={settingShowAddAndroid}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <AiFillAndroid color={COLORS.background} size={"2.5rem"} />
                </div>
                <label
                  className="applabel"
                  onClick={settingShowAddAndroid}
                  style={{
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {androidLink === "" ? "No link available" : androidLink}
                </label>

                {deleteIsLoading ? (
                  <LoadingComponent />
                ) : (
                  androidLink && (
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      className="iconcontainertop"
                      onClick={submitDeleteAndroidRequest}
                    >
                      <MdDelete color={COLORS.background} size={"2.5rem"} />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {showAddAndroid && (
            <div className="applink-container-main">
              <div className="androidC">
                <div className="iconcontainertop">
                  <AiFillAndroid color={COLORS.background} size={"2.5rem"} />
                </div>
                <label className="applabel">{androidLink}</label>
              </div>

              {/** ANDROID LINK */}
              <label className="alCLLabel">Android Link</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter android link"
                  value={androidLink}
                  onChange={(e) => setAndroidLink(e.target.value)}
                />
              </div>

              {createIsLoading ? (
                <LoadingComponent />
              ) : (
                <div
                  className="alBottomContainer"
                  onClick={submitCreateAndroidRequest}
                >
                  <label className="alBottomContainerlabel">Submit</label>
                </div>
              )}
            </div>
          )}

          {showAddIos && (
            <div className="applink-container-main">
              <div className="androidC">
                <div className="iconcontainertop">
                  <FaApple color={COLORS.background} size={"2.5rem"} />
                </div>
                <label className="applabel">{iosLink}</label>
              </div>

              {/** IOS LINK */}
              <label className="alCLLabel">IOS Link</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter ios link"
                  value={iosLink}
                  onChange={(e) => setIosLink(e.target.value)}
                />
              </div>

              {createIsLoading ? (
                <LoadingComponent />
              ) : (
                <div
                  className="alBottomContainer"
                  onClick={submitCreateIosRequest}
                >
                  <label className="alBottomContainerlabel">Submit</label>
                </div>
              )}
            </div>
          )}

          <ToastContainer />
        </>
      )}
    </div>
  );
};

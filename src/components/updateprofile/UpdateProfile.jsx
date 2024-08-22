import React, { useState } from "react";
import "./UpdateProfile.css";
import { CiSearch } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { MdAccountCircle } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import images from "../../assets/constants/images";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";

export const UpdateProfile = () => {
  const [showUP, setShowUP] = useState(true);
  const [showUPPic, setShowUPPic] = useState(false);
  const [showUPName, setShowUPName] = useState(false);

  const backhandlerUPP = () => {
    setShowUP(true);
    setShowUPPic(false);
    setShowUPName(false);
  };

  const settingUPP = () => {
    setShowUP(false);
    setShowUPPic(true);
    setShowUPName(false);
  };

  const settingUPN = () => {
    setShowUP(false);
    setShowUPPic(false);
    setShowUPName(true);
  };

  const [imageSource, setImageSource] = useState(null);
  const [titleValue, setTitle] = useState("");

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="upContainer">
      {showUP && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Update Profile
            </label>
          </div>
        </div>
      )}

      {showUP && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              <img
                src={images.user}
                alt="Profile Picture"
                className="upuserimg"
              />
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">Amy</label>
              <label className="upContentContainerLabel">amy@gmail.com</label>
              <label className="upContentContainerLabel">User ID : 1008</label>
            </div>
          </div>

          {/** PROFILE PICTURE */}
          <div className="alUpdatePContainer" onClick={settingUPP}>
            <div className="searchIconContainer">
              <MdAccountCircle color={COLORS.background} size={"2.5rem"} />
            </div>

            <label className="al-search-input">Profile Picture</label>

            <div className="searchIconContainer">
              <IoIosArrowDropright color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>

          {/** NAME */}
          <div className="alUpdatePContainer" onClick={settingUPN}>
            <div className="searchIconContainer">
              <MdDriveFileRenameOutline
                color={COLORS.background}
                size={"2.5rem"}
              />
            </div>

            <label className="al-search-input">Name</label>

            <div className="searchIconContainer">
              <IoIosArrowDropright color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>
      )}

      {showUPPic && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Upload Profile Picture
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              <img
                src={images.user}
                alt="Profile Picture"
                className="upuserimg"
              />
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">Amy</label>
              <label className="upContentContainerLabel">amy@gmail.com</label>
              <label className="upContentContainerLabel">User ID : 1008</label>
            </div>
          </div>

          {/** TITLE */}
          <label className="alCLLabel">Select Image</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <div className="imageContainerAC">
              <input
                className="al-search-input"
                placeholder="Enter country symbol"
                type="file"
                name="file"
                onChange={selectDoc}
              />
            </div>
          </div>

          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Upload Image</label>
          </div>
        </div>
      )}

      {showUPName && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Name
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              <img
                src={images.user}
                alt="Profile Picture"
                className="upuserimg"
              />
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">Amy</label>
              <label className="upContentContainerLabel">amy@gmail.com</label>
              <label className="upContentContainerLabel">User ID : 1008</label>
            </div>
          </div>

          <label className="alCLLabel">Name</label>
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

          <div className="alBottomContainer">
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        </div>
      )}
    </div>
  );
};

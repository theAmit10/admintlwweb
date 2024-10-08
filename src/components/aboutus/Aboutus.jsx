import React, { useEffect, useState } from "react";
import "./Aboutus.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { loadAllAboutUs } from "../../redux/actions/userAction";
import CircularProgressBar from "../helper/CircularProgressBar";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";

function Aboutus() {
  //  FOR CREATING AND UPDATING

  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  const [showCreateAbout, setShowCrateAbout] = useState(false);

  const settingShowCreateAboutUs = () => {
    setShowCrateAbout(true);
  };

  const backHandlerCreateAboutUs = () => {
    setShowCrateAbout(false);
  };

  const { accesstoken, loadingAbout, abouts } = useSelector(
    (state) => state.user
  );

  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(loadAllAboutUs(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(abouts); // Update filteredData whenever locations change
  }, [abouts]);

  // FOR CREATING ABOUT US

  const [showProgressBar, setProgressBar] = useState(false);

  const updateProfileHandler = async () => {
    if (!titleValue) {
      showErrorToast("Enter About Title");
    } else if (!discriptionValue) {
      showErrorToast("Enter About Discription");
    } else {
      setProgressBar(true);
      try {
        const url = `${UrlHelper.CREATE_ABOUT_API}`;
        const { data } = await axios.post(
          url,
          {
            aboutTitle: titleValue,
            aboutDescription: discriptionValue,
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

        backHandlerCreateAboutUs();
        dispatch(loadAllAboutUs(accesstoken));
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="gameDescriptionContainer">
      {/** SEARCH CONTATINER */}
      {loadingAbout ? (
        <div className="NC">
          <CircularProgressBar />
        </div>
      ) : (
        <>
          {!showCreateAbout && (
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
          {!showCreateAbout && (
            <div className="allLocationMainContainer">
              {/** CONTENT */}

              {filteredData.length === 0 ? (
                <div className="NC">
                  <label className="hdLocationContainerLeftContentNameLabel">
                    No data available
                  </label>
                </div>
              ) : (
                filteredData?.map((item, index) => (
                  <div key={index} className="allContentContainer-about">
                    <label className="allContentContainerLocationL">
                      {item.aboutTitle}
                    </label>
                    <label className="allContentContainerLimitL">
                      {item.aboutDescription}
                    </label>
                  </div>
                ))
              )}
            </div>
          )}

          {!showCreateAbout && (
            <div
              className="alBottomContainer"
              onClick={() => settingShowCreateAboutUs()}
            >
              <label className="alBottomContainerlabel">Create About us</label>
            </div>
          )}

          {showCreateAbout && (
            <div className="allLocationMainContainer">
              {/** TOP NAVIGATION CONTATINER */}
              <div className="alCreatLocationTopContainer">
                <div
                  className="searchIconContainer"
                  onClick={backHandlerCreateAboutUs}
                >
                  <IoArrowBackCircleOutline
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                </div>
                <div className="alCreatLocationTopContaineCL">
                  <label className="alCreatLocationTopContainerlabel">
                    Create About us
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

              {/** SUBMIT CONTATINER */}
              {showProgressBar ? (
                <div className="NC">
                  <CircularProgressBar />
                </div>
              ) : (
                <div className="alBottomContainer"
                onClick={updateProfileHandler}
                >
                  <label className="alBottomContainerlabel">Submit</label>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Aboutus;

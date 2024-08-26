import React, { useEffect, useState } from "react";
import "./Promotion.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import images from "../../assets/constants/images";
import { useNavigate } from "react-router-dom";
import { loadAllPromotion } from "../../redux/actions/userAction";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";

function Promotion() {
  const [showAP, setShowAP] = useState(true);
  const [showCP, setShowCP] = useState(false);

  const settingShowCP = () => {
    setShowAP(false);
    setShowCP(true);
  };

  const backHandlerCP = () => {
    setShowAP(true);
    setShowCP(false);
  };

  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { accesstoken, promotions, loadingPromotion } = useSelector(
    (state) => state.user
  );
  // const {loading, locations} = useSelector(state => state.location);

  console.log("ALL Promtions " + JSON.stringify(promotions));

  useEffect(() => {
    dispatch(loadAllPromotion(accesstoken));
  }, [dispatch]);

  const [selectedItem, setSelectedItem] = useState("");
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async (item) => {
    console.log("Item clicked :: " + item._id);
    setProgressBar(true);
    setSelectedItem(item._id);

    try {
      const url = `${UrlHelper.DELETE_PROMOTION_API}/${item._id}`;
      const { data } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + data);

      showSuccessToast(data.message);
      setProgressBar(false);
      dispatch(loadAllPromotion(accesstoken));
    } catch (error) {
      setProgressBar(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  //  FOR CREATING PROMOTIONS

  const creatingPromotion = async () => {
    if (!imageSource) {
      showErrorToast("Please, add promotion picture");
    } else {
      setProgressBar(true);

      try {
        if (!imageSource) {
          showErrorToast("Please select a image");
          setProgressBar(false);
        } else {
          const formData = new FormData();

          formData.append("file", imageSource);

          const response = await axios.post(
            UrlHelper.CREATE_PROMOTIONS_API,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accesstoken}`,
              },
            }
          );

          console.log("Promotion added successfully:", response.data);

          showSuccessToast("Promotion added successfully");
          setProgressBar(false);
          dispatch(loadAllPromotion(accesstoken));
          backHandlerCP();
        }
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="gameDescriptionContainer">
      {showAP && (
        <>
          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Promotions
              </label>
            </div>
          </div>

          {showAP && loadingPromotion ? (
            <LoadingComponent />
          ) : (
            <div className="promotionMainContainer">
              {/** CONTENT */}
              {promotions.length === 0 ? (
                <NodataFound title={"No promotion available"} />
              ) : (
                promotions.map((item, index) => (
                  <div key={index} className="allContentContainer-promotion">
                    <div className="promotionImageContainer">
                      <img
                        src={`${serverName}/uploads/promotion/${item.url}`}
                        alt="promotion"
                        className="proimg"
                      />
                    </div>

                    {showProgressBar ? (
                      selectedItem === item._id ? (
                        <LoadingComponent />
                      ) : (
                        <div
                          className="allContentContainerIconContainer"
                          onClick={() => deleteLocationHandler(item)}
                        >
                          <MdDelete color={COLORS.background} size={"2.5rem"} />
                        </div>
                      )
                    ) : (
                      <div
                        className="allContentContainerIconContainer"
                        onClick={() => deleteLocationHandler(item)}
                      >
                        <MdDelete color={COLORS.background} size={"2.5rem"} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {showAP && !loadingPromotion && (
        <div className="alBottomContainer" onClick={() => settingShowCP()}>
          <label className="alBottomContainerlabel">Create new promotion</label>
        </div>
      )}

      {showCP && (
        <div className="allLocationMainContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backHandlerCP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create new promotion
              </label>
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

          {/** SUBMIT CONTATINER */}
          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={creatingPromotion}>
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Promotion;

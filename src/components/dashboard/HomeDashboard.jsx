import React, { useEffect, useState } from "react";
import "./HomeDashboard.css";
import { FaHome } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { ImTrophy } from "react-icons/im";
import { FaPlay } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import images from "../../assets/constants/images";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import {
  loadProfile,
  loadAllUsers,
  loadAllOneDayUser,
} from "../../redux/actions/userAction";
import {
  useGetAllLocationWithTimeQuery,
  useGetAllPlayHomeQuery,
  useGetAllSubAdminQuery,
} from "../../helper/Networkcall";
import { getAllLocations } from "../../redux/actions/locationAction";
import {
  getAllResult,
  getResultAccordingToLocationTimeDate,
} from "../../redux/actions/resultAction";
import CircularProgressBar from "../helper/CircularProgressBar";
import { all } from "axios";
import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";
import { LoadingComponent } from "../helper/LoadingComponent";

export const HomeDashboard = ({ selectedComponent, handleComponentClick }) => {
  const [timeVisible, setTimeVisible] = useState(true);
  const [dateVisible, setDateVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const settingTimeVisbility = (val) => {
    setResultVisible(false);
    setTimeVisible(true);
    setDateVisible(false);
  };

  const dateBackhandler = () => {
    setResultVisible(false);
    setTimeVisible(true);
    setDateVisible(false);
  };

  const resultBackhandler = () => {
    setResultVisible(false);
    setTimeVisible(false);
    setDateVisible(true);
  };

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { user, accesstoken, allusers, loading, allonedayusers, error } =
    useSelector((state) => state.user);
  const { locations } = useSelector((state) => state.location);

  const { loading: loadingdate, dates } = useSelector((state) => state.date);
  const { loadingResult, results } = useSelector((state) => state.result);

  const {
    isLoading,
    data: allSubAdmin,
    isError,
    refetch,
  } = useGetAllSubAdminQuery(accesstoken);

  const { isLoading: allPlayIsLoading, data: allPlay } =
    useGetAllPlayHomeQuery(accesstoken);

  const [retrying, setRetrying] = useState(false); // State to manage retrying

  // Fetch data from API
  const fetchData = () => {
    setRetrying(true);
    dispatch(loadProfile(accesstoken));
    dispatch(loadAllUsers(accesstoken));
    dispatch(getAllLocations(accesstoken));
    dispatch(getAllResult(accesstoken));
    dispatch(loadAllOneDayUser(accesstoken));
    refetch();
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
    if (error) {
      console.log("TA Error found :: " + error);
    }
  }, [dispatch]);

  const {
    data: allLocationData,
    error: allLocationError,
    isLoading: allLocationIsLoading,
  } = useGetAllLocationWithTimeQuery(accesstoken);

  useEffect(() => {
    if (allLocationData) {
      if (selectedLocation === null) {
        setSelectedLocation(allLocationData.locationData[0]);
      }
    }
  }, [allLocationIsLoading, selectedLocation]);

  const selectingLocation = (item) => {
    setSelectedLocation(item);
    setTimeVisible(true);
    setDateVisible(false);
    setResultVisible(false);
  };

  const selectingTimezone = (item) => {
    setSelectedTime(item);
    setTimeVisible(false);
    setDateVisible(true);
    console.log()
    dispatch(
      getDateAccordingToLocationAndTime(
        accesstoken,
        item._id,
        selectedLocation._id
      )
    );
  };

  const seletingDate = (datedate) => {
    setSelectedDate(datedate);
    setTimeVisible(false);
    setDateVisible(false);
    setResultVisible(true);
    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        datedate._id,
        datedate.lottime._id,
        datedate.lottime.lotlocation._id
      )
    );
  };

  return (
    <div className="homeDashboardContainer">
      {/** ALL ITEMS */}
      <div className="hdAllContainer">
        {/** ALL USERS */}

        {user && user.role === "admin" ? (
          <div
            className="hdAllContainerContent"
            onClick={() => handleComponentClick("alluser")}
          >
            <div className="hdAllContainerContentTop">
              <label className="hdAllContainerContentTopBoldLabel">Users</label>
              <label className="hdAllContainerContentTopBoldLabel">
                {allusers.length}
              </label>
            </div>
            <div className="hdAllContainerContentBottom">
              <label className="hdAllContainerContentTopRegularLabel">
                Total Number of Users
              </label>
              <div className="hdContenContainerIcon">
                <FaPeopleGroup color={COLORS.background} size={"2.5rem"} />
              </div>
            </div>
          </div>
        ) : null}

        {/** NEW USERS */}
        {user && user.role === "admin" ? (
          <div
            className="hdAllContainerContent"
            onClick={() => handleComponentClick("newuser")}
          >
            <div className="hdAllContainerContentTop">
              <label className="hdAllContainerContentTopBoldLabel">
                New Users
              </label>
              <label className="hdAllContainerContentTopBoldLabel">
                {allonedayusers.length}
              </label>
            </div>
            <div className="hdAllContainerContentBottom">
              <label className="hdAllContainerContentTopRegularLabel">
                Total Number of New Users in Last 24h
              </label>
              <div className="hdContenContainerIcon">
                <GrUserNew color={COLORS.background} size={"2.5rem"} />
              </div>
            </div>
          </div>
        ) : null}

        {/** LOCATION */}
        <div
          className="hdAllContainerContent"
          onClick={() => handleComponentClick("alllocation")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">
              Locations
            </label>
            <label className="hdAllContainerContentTopBoldLabel">
              {locations.length}
            </label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of Locations
            </label>
            <div className="hdContenContainerIcon">
              <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>
        {/** RESULT */}
        <div
          className="hdAllContainerContent"
          onClick={() => handleComponentClick("allresults")}
        >
          <div className="hdAllContainerContentTop">
            <label className="hdAllContainerContentTopBoldLabel">Results</label>
            <label className="hdAllContainerContentTopBoldLabel">
              {" "}
              {results.length}
            </label>
          </div>
          <div className="hdAllContainerContentBottom">
            <label className="hdAllContainerContentTopRegularLabel">
              Total Number of Results
            </label>
            <div className="hdContenContainerIcon">
              <ImTrophy color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>
        </div>

        {/** PLAY */}

        {user && user.role === "admin" ? (
          <div
            className="hdAllContainerContent"
            onClick={() => handleComponentClick("play")}
          >
            <div className="hdAllContainerContentTop">
              <label className="hdAllContainerContentTopBoldLabel">Play</label>
              <label className="hdAllContainerContentTopBoldLabel">
                {allPlay?.plays.length}
              </label>
            </div>
            <div className="hdAllContainerContentBottom">
              <label className="hdAllContainerContentTopRegularLabel">
                Total Number of Play
              </label>
              <div className="hdContenContainerIcon">
                <FaPlay color={COLORS.background} size={"2.5rem"} />
              </div>
            </div>
          </div>
        ) : null}

        {/** SUB ADMIN */}

        {user && user.role === "admin" && !isLoading ? (
          <div
            className="hdAllContainerContent"
            onClick={() => handleComponentClick("subadmin")}
          >
            <div className="hdAllContainerContentTop">
              <label className="hdAllContainerContentTopBoldLabel">
                Sub Admin
              </label>
              <label className="hdAllContainerContentTopBoldLabel">
                {allSubAdmin?.users?.length}
              </label>
            </div>
            <div className="hdAllContainerContentBottom">
              <label className="hdAllContainerContentTopRegularLabel">
                Total Number of Sub Admin
              </label>
              <div className="hdContenContainerIcon">
                <MdAdminPanelSettings
                  color={COLORS.background}
                  size={"2.5rem"}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/** LOCATION */}
      <div className="hdLocationContainer">
        <div className="hdLocationContainerLeft">
          {allLocationIsLoading ? (
            <LoadingComponent/>
          ) : (
            allLocationData?.locationData.map((item, index) => (
              <div
                className="hdLocationContainerLeftContent"
                onClick={() => selectingLocation(item)}
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(90deg, #1993FF, #0F5899)"
                      : "linear-gradient(90deg, #7EC630, #3D6017)",
                  borderColor:
                    selectedLocation?._id === item._id
                      ? COLORS.white_s
                      : "transparent", // Use transparent for no border
                  borderWidth: "2px",
                  borderStyle:
                    selectedLocation?._id === item._id ? "solid" : "none", // Apply border style conditionally
                }}
              >
                <label className="hdLocationContainerLeftContentNameLabel">
                  {item.name}
                </label>
                <label className="hdLocationContainerLeftContentLimitLabel">
                  Max {item.limit}
                </label>
              </div>
            ))
          )}
        </div>
        {/** RIGHT */}
        <div className="hdLocationContainerRight">
          {selectedLocation === null ? (
             <LoadingComponent/>
          ) : (
            timeVisible && (
              <div className="hdLocationContainerRightTimeContainer">
                {/** TOP */}
                <div className="hdLocationContainerRightTimeContainerTop">
                  <label className="hdLocationContainerLeftContentNameLabel">
                    {selectedLocation.name}
                  </label>
                  <label className="hdLocationContainerLeftContentLimitLabel">
                    Max {selectedLocation.limit}
                  </label>
                </div>

                {/** Time content container */}
                <div className="hdLocationContainerRightTimeContainerContentContainer">
                  {selectedLocation.times.length === 0 ? (
                    <div className="NC">
                      <label className="hdLocationContainerLeftContentNameLabel">
                        No available time
                      </label>
                    </div>
                  ) : (
                    selectedLocation.times.map((titem, tindex) => (
                      <div
                        className="hdLocationContainerRightTimeContainerContentContainer-time"
                        onClick={() => selectingTimezone(titem)}
                      >
                        <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                          {titem.time}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          )}

          {selectedLocation === null && selectedTime === null && loadingdate ? (
             <LoadingComponent/>
          ) : (
            dateVisible && (
              <div className="hdLocationContainerRightTimeContainer">
                {/** TOP */}
                <div
                  onClick={dateBackhandler}
                  className="hdLocationContainerRightTimeContainerTop"
                >
                  <IoArrowBackCircleOutline
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                  <label className="hdLocationContainerLeftContentNameLabel">
                    {selectedLocation.name}
                  </label>
                  <label className="hdLocationContainerLeftContentLimitLabel">
                    Max {selectedLocation.limit}
                  </label>
                </div>

                {/** Time content container */}
                <div className="hdLocationContainerRightTimeContainerContentContainer">
                  {dates.length === 0 ? (
                    <div className="NC">
                      <label className="hdLocationContainerLeftContentNameLabel">
                        No available date
                      </label>
                    </div>
                  ) : (
                    dates?.map((item, index) => (
                      <div
                        className="hdLocationContainerRightTimeContainerContentContainer-time"
                        onClick={() => seletingDate(item)}
                      >
                        <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                          {item.lotdate}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          )}

          {selectedLocation === null &&
          selectedTime === null &&
          selectedDate === null &&
          loadingResult ? (
            <div className="NC">
              <CircularProgressBar />
            </div>
          ) : (
            resultVisible && (
              <div className="hdLocationContainerRightTimeContainer">
                {/** TOP */}
                <div
                  onClick={resultBackhandler}
                  className="hdLocationContainerRightTimeContainerTop"
                >
                  <IoArrowBackCircleOutline
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                  <label className="hdLocationContainerLeftContentNameLabel">
                    {selectedLocation.name}
                  </label>
                  <label className="hdLocationContainerLeftContentLimitLabel">
                    Max {selectedLocation.limit}
                  </label>
                </div>

                {/** Time content container */}
                <div className="hdLocationContainerRightTimeContainerContentContainer-result">
                  <div className="hdLocationContainerRightTimeContainerContentContainer-resultright">
                    <div className="trophyimagecontainer">
                      <img
                        src={images.cups}
                        alt="trphy"
                        className="catandtrophyimg"
                      />
                    </div>

                    <div className="hdLocationContainerRightTimeContainerContentContainer-resultleft">
                      {results.length === 0 ? (
                        <label className="hdLocationContainerLeftContentNameLabel" style={{marginBottom: "2rem"}}>
                          Comming soon
                        </label>
                      ) : (
                        <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-number">
                           {results[0].resultNumber}
                        </label>
                      )}
                      <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-date">
                        {selectedDate.lotdate}
                      </label>
                    </div>

                    <div className="catimagecontainer">
                      <img
                        src={images.cat}
                        alt="cat"
                        className="catandtrophyimg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

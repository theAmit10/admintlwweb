import React, { useCallback, useEffect, useState } from "react";
import "./PlayLocation.css";
import { locationdata } from "../alllocation/AllLocation";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { PiSubtitles } from "react-icons/pi";
import {
  useGetAllLocationWithTimeQuery,
  useGetSinglePlayQuery,
} from "../../helper/Networkcall";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";

import { getResultAccordingToLocationTimeDate } from "../../redux/actions/resultAction";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { ToastContainer } from "react-toastify";
import { IoIosMenu } from "react-icons/io";
import SortingOptions from "../helper/SortingOptions";
import moment from "moment";
import 'moment-timezone'; 

export const PlayLocation = () => {
  const [showPL, setShowPL] = useState(true);
  const [showD, setShowD] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [showPlayInsight, setShowPlayInsight] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedtime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [resultnumber, setresultnumber] = useState("");
  const [nextresult, setnextresult] = useState("");


// function getNextTimeForHighlights(times) {
//   // Check if there is only one time in the list
//   if (times.length === 1) {
//     return times[0];
//   }

//   // Get current time in IST timezone
//   const currentISTTime = moment().tz('Asia/Kolkata').format('hh:mm A');

//   // Sort times in ascending order to handle next time logic properly
//   const sortedTimes = [...times].sort((a, b) => 
//     moment(a.time, 'hh:mm A').diff(moment(b.time, 'hh:mm A'))
//   );

//   // Loop through sorted times to find the next available time
//   for (let i = 0; i < sortedTimes.length; i++) {
//     if (moment(currentISTTime, 'hh:mm A').isBefore(moment(sortedTimes[i].time, 'hh:mm A'))) {
//       return sortedTimes[i];
//     }
//   }

//   // If no future time found, or current time matches the last item, return the first item
//   return sortedTimes[0];
// }

const getNextTimeForHighlights = (times) => {
  if (times.length === 1) {
    return times[0];
  }

  const currentISTTime = moment().tz('Asia/Kolkata').format('hh:mm A');
  const sortedTimes = [...times].sort((a, b) =>
    moment(a.time, 'hh:mm A').diff(moment(b.time, 'hh:mm A'))
  );

  for (let i = 0; i < sortedTimes.length; i++) {
    if (moment(currentISTTime, 'hh:mm A').isBefore(moment(sortedTimes[i].time, 'hh:mm A'))) {
      return sortedTimes[i];
    }
  }

  return sortedTimes[0];
};



  const settingShowDate = (loc, time) => {
    setShowPL(false);
    setShowPlay(false);
    setShowPlayInsight(false);
    setShowD(true);
    setSelectedLocation(loc);
    setSelectedTime(time);

    dispatch(getDateAccordingToLocationAndTime(accesstoken, time._id, loc._id));
  };

  const settingShowPlay = (date) => {
    setShowPL(false);
    setShowD(false);
    setShowPlayInsight(false);
    setShowPlay(true);
    setSelectedDate(date);

    console.log("DATA FOR PLAY");
    console.log(selectedLocation);
    console.log(selectedtime);
    console.log(selectedDate);
    console.log(date);
  };

  useEffect(() => {
    if (selectedDate) {
      console.log("Selected Date updated:", selectedDate);

      setShouldFetch(true);
      // Perform any other actions that depend on selectedDate here
    }
  }, [selectedDate]);

  const settingShowPlayInsight = () => {
    setShowPL(false);
    setShowD(false);

    setShowPlay(false);

    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        selectedDate._id,
        selectedtime._id,
        selectedLocation._id
      )
    );

    console.log("Getting all the times");
    console.log("Mine time ");
    console.log(getNextResultTime(selectedLocation?.times, selectedtime?.time));
    if (selectedLocation && selectedtime) {
      console.log("Getting inside all the times");
      console.log(getNextResultTime(selectedLocation.times, selectedtime.time));
      console.log(
        "times",
        getNextResultTime(selectedLocation.times, selectedtime.time)
      );
      setnextresult(
        getNextResultTime(selectedLocation.times, selectedtime.time)
      );
      setTime(getNextResultTime(selectedLocation.times, selectedtime.time));
    }
    console.log("Getting End all the times");

    setShowPlayInsight(true);
  };

  const backhandlerDate = () => {
    setShowPL(true);
    setShowD(false);
  };

  const backhandlerPlay = () => {
    setShowPL(true);
    setShowPL(false);
    setShowD(false);
  };

  const backhandlerPlayZone = () => {
    setShowPL(false);
    setShowPL(false);
    setShowPlay(false);
    setShowD(true);
  };

  const backhandlerGameInsights = () => {
    setShowPL(false);
    setShowPL(false);
    setShowPlayInsight(false);
    setShowD(false);
    setShowPlay(true);
  };

  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ###############
  // Play Location
  // ###############

  const { accesstoken } = useSelector((state) => state.user);
  const [alldatafiler, setalldatafilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const { data, error, isLoading } =
    useGetAllLocationWithTimeQuery(accesstoken);

  // FOR ALL FILTER TYPE DATA
  useEffect(() => {
    if (!isLoading && data) {
      const uniqueItems = new Set();
      const filtertype = [{ _id: "123", maximumReturn: "All" }]; // Default element
      data.locationData.forEach((item) => {
        const key = item.maximumReturn;
        if (!uniqueItems.has(key)) {
          uniqueItems.add(key);
          filtertype.push({ _id: item._id, maximumReturn: item.maximumReturn });
        }
      });

      // Sorting the filtertype array
      filtertype.sort((a, b) => {
        if (a.maximumReturn === "All") return -1;
        if (b.maximumReturn === "All") return 1;
        const aReturn = parseFloat(a.maximumReturn.replace("x", ""));
        const bReturn = parseFloat(b.maximumReturn.replace("x", ""));
        return aReturn - bReturn;
      });

      setalldatafilter(filtertype);
      setSelectedFilter(filtertype[0]._id);

      console.log(filtertype);
    }
  }, [isLoading, data]);

  const settingFilterData = (itemf) => {
    setSelectedFilter(itemf._id);
    if (itemf.maximumReturn.toLowerCase() === "all") {
      setFilteredData(data?.locationData);
    } else {
      const filtered = data?.locationData.filter((item) =>
        item.maximumReturn
          .toLowerCase()
          .includes(itemf.maximumReturn.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredData(data?.locationData); // Update filteredData whenever locations change
    }
  }, [data]);

  // ###############
  // Play DATE
  // ###############

  const { loading: loadingDates, dates } = useSelector((state) => state.date);
  const [filteredDataD, setFilteredDataD] = useState([]);

  const handleSearchD = (e) => {
    const text = e.target.value;
    if (dates) {
      const filtered = dates.filter((item) =>
        item.lotdate.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDataD(filtered);
    }
  };

  useEffect(() => {
    if (dates) {
      setFilteredDataD(dates); // Update filteredData whenever locations change
    }
  }, [dates]);

  // ###############
  // Play GAME
  // ###############

  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    isLoading: isLoadingPlayGame,
    data: dataPlayGame,
    isError: isErrorPlayGame,
    refetch: refetchPlayGame,
  } = useGetSinglePlayQuery(
    {
      accesstoken,
      lotlocation: selectedLocation?._id,
      lottime: selectedtime?._id,
      lotdate: selectedDate?._id,
    },
    {
      skip: !shouldFetch, // Skip the query if shouldFetch is false
    }
  );

  console.log("Getting Playdata");
  console.log(isLoadingPlayGame);
  console.log(dataPlayGame);

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
  };

  const [filteredDataPG, setFilteredDataPG] = useState([]);
  const [playinsightdata, setplayinsightdata] = useState(null);

  // useEffect(() => {
  //   if (dataPlayGame) {
  //     console.log("USE Effect running");
  //     setFilteredDataPG(dataPlayGame?.playzone?.playnumbers);
  //   }
  // }, [dataPlayGame,isLoadingPlayGame]);

  useEffect(() => {
    if (dataPlayGame?.playzone?.playnumbers) {
      setFilteredDataPG(dataPlayGame.playzone.playnumbers);
      setplayinsightdata(dataPlayGame);
    }
  }, [dataPlayGame, isLoadingPlayGame, shouldFetch]);

  console.log("Data Play Game:", dataPlayGame);

  const [showSorting, setShowSorting] = useState(false);

  const sortByAmount = (order = 'asc') => {
    const sortedData = [...filteredDataPG].sort((a, b) => {
      return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });
    setFilteredDataPG(sortedData);
  };

  const sortByWinningAmount = (order = 'asc') => {
    const sortedData = [...filteredDataPG].sort((a, b) => {
      const winningAmountA = a.users.reduce(
        (acc, user) => acc + user.winningamount,
        0,
      );
      const winningAmountB = b.users.reduce(
        (acc, user) => acc + user.winningamount,
        0,
      );
      return order === 'asc'
        ? winningAmountA - winningAmountB
        : winningAmountB - winningAmountA;
    });
    setFilteredDataPG(sortedData);
  };

  // ###############
  // Play INSIGHTS
  // ###############

  const [loading, setLoading] = useState(false);
  const { times, loading: loadingAllTime } = useSelector((state) => state.time);

  // const {
  //   isLoading,
  //   data: playinsightdata,
  //   isError,
  //   refetch,
  // } = useGetSinglePlayQuery({
  //   accesstoken,
  //   lotlocation: selectedLocation?._id,
  //   lottime: selectedtime?._id,
  //   lotdate: selectedDate?._id,
  // });

  // useEffect(() => {
  //   dispatch(getTimeAccordingLocation(accesstoken, locationdata._id));
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("Getting all the times")
  //   if(times)
  //   {
  //     console.log("times", getNextResultTime(times,timedata.time))
  //     setnextresult(getNextResultTime(times,timedata.time))
  //   }

  // },[loadingAllTime])

  // const getNextResultTime = (times, currentTime) => {
  //   const timeList = times.map((time) => time.lottime);
  //   const index = timeList.indexOf(currentTime);

  //   if (index === -1) {
  //     return timeList[0];
  //   }

  //   if (index === timeList.length - 1) {
  //     return timeList[0];
  //   }

  //   return timeList[index + 1];
  // };

  function getNextResultTime(times, curtime) {
    // Sort times based on the lottime to ensure they are in order
    const sortedTimes = [...times].sort((a, b) => {
      return (
        new Date(`1970-01-01T${a.time}Z`) - new Date(`1970-01-01T${b.time}Z`)
      );
    });

    // Find the index of the current time in the sorted times array
    const curIndex = sortedTimes.findIndex((time) => time.time === curtime);

    // If curtime is not found, or if there's only one time in the list
    if (curIndex === -1 || sortedTimes.length === 1) {
      return sortedTimes[0]?.time || curtime;
    }

    // Check if curtime is the last item in the list
    if (curIndex === sortedTimes.length - 1) {
      return sortedTimes[0].time; // Return the first time in the list
    }

    // Return the next time after curtime
    return sortedTimes[curIndex + 1].time;
  }

  // TOTAL NUMBER OF BET
  const getTotalUsers = (data) => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return 0;
    }

    return data.playzone.playnumbers.reduce((total, playnumber) => {
      if (Array.isArray(playnumber.users)) {
        return total + playnumber.users.length;
      }
      return total;
    }, 0);
  };

  // TOTAL AMOUNT ON BET
  const getTotalAmount = (data) => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return 0;
    }

    return data.playzone.playnumbers.reduce((total, playnumber) => {
      return total + playnumber.amount;
    }, 0);
  };

  // MOST BET AMOUNT ON A SPECIFIC NUMBER
  const getLargestAmount = (data) => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return 0;
    }

    return data.playzone.playnumbers.reduce((maxAmount, playnumber) => {
      return Math.max(maxAmount, playnumber.amount);
    }, 0);
  };

  // PLAYNUMBER ON WHICH MOST BET PLAYED
  const getPlaynumberOfLargestAmount = (data) => {
    if (!data.playzone || !Array.isArray(data.playzone.playnumbers)) {
      return null;
    }

    return data.playzone.playnumbers.reduce((maxPlaynumber, playnumber) => {
      return playnumber.amount > (maxPlaynumber.amount || 0)
        ? playnumber
        : maxPlaynumber;
    }, {}).playnumber;
  };

  // LOWEST BET AMOUNT ON A SPECIFIC NUMBER
 function getLowestAmount(playinsightdata) {
    // Extract playnumbers array
    const playnumbers = playinsightdata.playzone.playnumbers;
    // const playnumbers = playinsightdata;
  
    // Find the minimum amount in the playnumbers list
    const minAmount = Math.min(...playnumbers.map(p => p.amount));
  
    // Get all playnumbers with the minimum amount
    const minAmountPlaynumbers = playnumbers.filter(p => p.amount === minAmount);
  
    // If there's more than one playnumber with the minimum amount, select one randomly
    if (minAmountPlaynumbers.length > 1) {
      const randomIndex = Math.floor(Math.random() * minAmountPlaynumbers.length);
      return minAmountPlaynumbers[randomIndex].amount;
    }
  
    // Otherwise, return the amount of the single minimum amount
    return minAmountPlaynumbers[0].amount;
  }

  // PLAYNUMBER ON WHICH LOWEST BET PLAYED
  function getPlaynumberOfLowestAmount(playinsightdata) {
    // Extract playnumbers array
    const playnumbers = playinsightdata.playzone.playnumbers;
    // const playnumbers = playinsightdata;
  
    // Find the minimum amount in the playnumbers list
    const minAmount = Math.min(...playnumbers.map(p => p.amount));
  
    // Get all playnumbers with the minimum amount
    const minAmountPlaynumbers = playnumbers.filter(p => p.amount === minAmount);
  
    // If there's more than one playnumber with the minimum amount, select one randomly
    if (minAmountPlaynumbers.length > 1) {
      const randomIndex = Math.floor(Math.random() * minAmountPlaynumbers.length);
      return minAmountPlaynumbers[randomIndex].playnumber;
    }
  
    // Otherwise, return the playnumber of the single minimum amount
    return minAmountPlaynumbers[0].playnumber;
  }

  const { loadingResult, results } = useSelector((state) => state.result);
  const [filteredDataR, setFilteredDataR] = useState([]);
  const [showProgressBar, setProgressBar] = useState(false);

  useEffect(() => {
    if (results) {
      setFilteredDataR(results); // Update filteredData whenever locations change
    }
  }, [results]);

  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const paddedHours =
      formattedHours < 10 ? "0" + formattedHours : formattedHours;
    const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${paddedHours}:${paddedMinutes} ${ampm}`;
  };

  const [loadingCreateResult, setLoadingCreateResult] = useState(false);

  const submitCreateResultHandler = () => {
    const currentTime = formatTime(new Date());

    if (!resultnumber) {
      showErrorToast("Please enter result");
    } else if (!nextresult) {
      showErrorToast("Please select new result time");
    } else if (nextresult === currentTime) {
      showErrorToast("Next result time and current time cannot be the same");
    } else {
      createResult(
        accesstoken,
        selectedtime._id,
        selectedDate._id,
        selectedLocation._id,
        nextresult
      );
    }
  };

  const createResult = async (
    accesstoken,
    lottime,
    lotdate,
    lotlocation,
    nextResultData
  ) => {
    try {
      setLoadingCreateResult(true);
      const { data } = await axios.post(
        UrlHelper.CREATE_RESULT_API,
        {
          resultNumber: resultnumber,
          lotdate,
          lottime,
          lotlocation,
          nextresulttime: nextResultData,
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
      dispatch(
        getResultAccordingToLocationTimeDate(
          accesstoken,
          selectedDate._id,
          selectedtime._id,
          selectedLocation._id
        )
      );
      setTime(null);
      backhandlerPlay();
      setLoadingCreateResult(false);
    } catch (error) {
      setLoadingCreateResult(false);
      console.log(" Err :: " + error);
      showErrorToast("Something went wrong");
    }
  };

  const deleteResultHandler = async () => {
    setProgressBar(true);

    try {
      const url = `${UrlHelper.DELETE_LOT_RESULT_API}/${filteredDataR[0]._id}`;
      console.log(url);

      const { data } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + data);

      showSuccessToast(data.message);
      dispatch(
        getResultAccordingToLocationTimeDate(
          accesstoken,
          selectedDate._id,
          selectedtime._id,
          selectedLocation._id
        )
      );

      setProgressBar(false);
    } catch (error) {
      console.log(error.response.data.message);
      setProgressBar(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="PLContainer">
      
{showPL &&
  (isLoading ? (
    <LoadingComponent />
  ) : filteredData.length === 0 ? (
    <NodataFound title={"No data found"} />
  ) : (
    <div className="PLContainerMain">
      {filteredData.map((item, index) => {
        // Calculate the next time for each item
        const nextTime = getNextTimeForHighlights(item?.times);

        return (
          <div key={item._id} className="PLCotentContainer">
            <div className="PLCotentContainerLeft">
              <div
                className="PLLLocContainer"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(90deg, #1993FF, #0F5899)"
                      : "linear-gradient(90deg, #7EC630, #3D6017)",
                }}
              >
                <label className="locLabel">{item.name}</label>
                <label className="limitLabel">Max {item.limit}</label>
              </div>
            </div>
            <div className="PLCotentContainerRight">
              {item.times.map((timedata, timeindex) => (
                <div
                  key={timedata._id}
                  className="PLRTimeContainer"
                  onClick={() => settingShowDate(item, timedata)}
                  style={{
                    border: timedata.time === nextTime.time ? '2px solid green' : 'none'
                  }}
                >
                  <label className="timeLabel">{timedata.time}</label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  ))}

      {showD &&
        (loadingDates ? (
          <LoadingComponent />
        ) : (
          <>
            <div className="PLContainerMain">
              {/** TOP NAVIGATION CONTATINER */}
              <div className="alCreatLocationTopContainer">
                <div className="searchIconContainer" onClick={backhandlerDate}>
                  <IoArrowBackCircleOutline
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                </div>
                <div className="alCreatLocationTopContaineCL">
                  <label className="alCreatLocationTopContainerlabel">
                    {selectedLocation.name}
                  </label>
                </div>
              </div>

              {/** SEARCH CONTATINER */}
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <CiSearch color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Search for date"
                  label="Search"
                  onChange={handleSearchD}
                />
              </div>

              {filteredData.length === 0 ? (
                <NodataFound title={"No data found"} />
              ) : (
                <div className="allLocationMainContainer-time">
                  {/** CONTENT */}
                  {filteredDataD.map((item, index) => (
                    <div
                      key={item._id}
                      className="allContentContainer-al"
                      onClick={() => settingShowPlay(item)}
                    >
                      <label className="allContentContainerLocationL">
                        {item.lotdate}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ))}

      {showPlay &&
        (isLoadingPlayGame ? (
          <LoadingComponent />
        ) : isErrorPlayGame ? (
          <NodataFound title="Error fetching data" />
        ) : filteredDataPG.length === 0 ? (
          <NodataFound title="No data found" />
        ) : (
          <div className="PLContainerMain">
            {/** TOP NAVIGATION CONTATINER */}
            <div className="alCreatLocationTopContainer">
              <div
                className="searchIconContainer"
                onClick={backhandlerPlayZone}
              >
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>
              <label className="alCreatLocationTopContainerlabel">
                {selectedLocation.name} {selectedLocation.limit}
              </label>
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  {selectedtime.time}
                </label>
              </div>
              <label
                className="alCreatLocationTopContainerlabel"
                style={{
                  paddingRight: "1rem",
                }}
              >
                {selectedDate.lotdate}
              </label>
              <div
               onClick={() => setShowSorting(!showSorting)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight : '1rem'
                }}
              >
                <IoIosMenu color={COLORS.white_s} size={"2.5rem"} />
              </div>
            </div>

            {showSorting && (
                <SortingOptions
                  sortByAmount={sortByAmount}
                  sortByWinningAmount={sortByWinningAmount}
                  onClose={() => setShowSorting(false)} // Close sorting options
                />
              )}

            {filteredDataPG.length === 0 ? (
              <NodataFound title={"No data found"} />
            ) : (
              <>
                <div className="dHeaderContainer">
                  {/* <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">No.</label>
                  </div> */}
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">No. of bets</label>
                  </div>
                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">Number</label>
                  </div>

                  <div className="dHeaderContainerLabelContainer">
                    <label className="dHeaderContainerLabel">Amount</label>
                  </div>
                  <div
                    className="dHeaderContainerLabelContainer"
                    style={{ flex: 2, justifyContent: "center" }}
                  >
                    <label className="dHeaderContainerLabel">
                      Distribution Amount
                    </label>
                  </div>
                </div>

                <div className="PLPMainContainer">
                  {filteredDataPG.map((item, index) => (
                    <div
                      className="wContentContainer"
                      key={item._id}
                      style={{
                        minHeight: expandedItems[item._id] ? "30rem" : "5rem",
                      }}
                      onClick={() => toggleItem(item._id)}
                    >
                      {/** MAIN CONTENT */}
                      <div className="wContentContainerMain">
                        {/* <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            {index + 1}
                          </label>
                        </div> */}
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            {item.numbercount}
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            {item.playnumber}
                          </label>
                        </div>
                        <div className="dHeaderContainerLabelContainer">
                          <label className="dHeaderContainerLabel">
                            {item.amount}
                          </label>
                        </div>
                        <div
                          className="dHeaderContainerLabelContainer"
                          style={{ flex: 2, justifyContent: "center" }}
                        >
                          <label className="dHeaderContainerLabel">
                            {item.distributiveamount}
                          </label>
                        </div>
                      </div>

                      {/** payment CONTENT */}
                      {expandedItems[item._id] &&
                        (item.users.length === 0 ? (
                          <NodataFound title={"No user available"} />
                        ) : (
                          <>
                            <div className="plBottomContainer">
                              <div
                                className="wContentContainerMain"
                                style={{ backgroundColor: COLORS.green }}
                              >
                                <div className="dHeaderContainerLabelContainer">
                                  <label className="dHeaderContainerLabel">
                                    User Details
                                  </label>
                                </div>
                                <div className="dHeaderContainerLabelContainer">
                                  <label className="dHeaderContainerLabel">
                                    User ID
                                  </label>
                                </div>
                                <div className="dHeaderContainerLabelContainer">
                                  <label className="dHeaderContainerLabel">
                                    Number
                                  </label>
                                </div>
                                <div className="dHeaderContainerLabelContainer">
                                  <label className="dHeaderContainerLabel">
                                    Amount
                                  </label>
                                </div>
                              </div>

                              {item.users.map((useritem, key) => (
                                <div
                                  className="wContentContainerMain"
                                  key={useritem._id}
                                >
                                  <div className="dHeaderContainerLabelContainer">
                                    <label className="dHeaderContainerLabel">
                                      {useritem?.username}
                                    </label>
                                  </div>
                                  <div className="dHeaderContainerLabelContainer">
                                    <label className="dHeaderContainerLabel">
                                      {useritem?.userId}
                                    </label>
                                  </div>
                                  <div className="dHeaderContainerLabelContainer">
                                    <label className="dHeaderContainerLabel">
                                      {useritem?.usernumber}
                                    </label>
                                  </div>
                                  <div className="dHeaderContainerLabelContainer">
                                    <label className="dHeaderContainerLabel">
                                      {useritem?.convertedAmount ? useritem?.convertedAmount : useritem?.amount}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ))}
                    </div>
                  ))}
                </div>

                <div
                  className="alBottomContainer"
                  onClick={settingShowPlayInsight}
                >
                  <label className="alBottomContainerlabel">
                    Game Insights
                  </label>
                </div>
              </>
            )}
          </div>
        ))}

      {showPlayInsight && (
        <div className="PLContainerMain">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerGameInsights}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <label className="alCreatLocationTopContainerlabel">
              {selectedLocation.name} {selectedLocation.limit}
            </label>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                {selectedtime.time}
              </label>
            </div>
            <label
              className="alCreatLocationTopContainerlabel"
              style={{
                paddingRight: "1rem",
              }}
            >
              {selectedDate.lotdate}
            </label>
          </div>

          <div className="PLGIMainContainer">
            <div className="PLGIMainContainerLeft">
              <div className="PLPIContentC">
                <label className="pdR">Total Numbers of Bets</label>
                <label className="pdB">{getTotalUsers(playinsightdata)}</label>
              </div>

              <div className="PLPIContentC">
                <label className="pdR">Total amount on bet</label>
                <label className="pdB">{getTotalAmount(playinsightdata)}</label>
              </div>

              <div className="PLPIContentC">
                <div className="PLPIContentCTop">
                  <label className="pdR">Highest bet amount</label>
                  <label className="pdR">On number</label>
                </div>

                <div className="PLPIContentCTop">
                  <label className="pdB">
                    {getLargestAmount(playinsightdata)}
                  </label>
                  <label className="pdB">
                    {getPlaynumberOfLargestAmount(playinsightdata)}
                  </label>
                </div>
              </div>

              <div className="PLPIContentC">
                <div className="PLPIContentCTop">
                  <label className="pdR">Lowest bet amount</label>
                  <label className="pdR">On number</label>
                </div>

                <div className="PLPIContentCTop">
                  <label className="pdB">
                    {getLowestAmount(playinsightdata)}
                  </label>
                  <label className="pdB">
                    {getPlaynumberOfLowestAmount(playinsightdata)}
                  </label>
                </div>
              </div>

              {loadingResult ? (
                <LoadingComponent />
              ) : filteredDataR.length === 0 ? (
                <>
                  {/** TITLE */}
                  <label
                    className="alCLLabel"
                    style={{ marginBottom: "-2rem" }}
                  >
                    Result Number
                  </label>
                  <div
                    className="alSearchContainer"
                    style={{ marginBottom: "-0.5rem" }}
                  >
                    <div className="searchIconContainer">
                      <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                    </div>

                    <input
                      className="al-search-input"
                      placeholder="Enter result numer"
                      value={resultnumber}
                      onChange={(e) => setresultnumber(e.target.value)}
                    />
                  </div>

                  <label
                    className="alCLLabel"
                    style={{ marginBottom: "-2rem" }}
                  >
                    Next Result
                  </label>
                  <div
                    className="alSearchContainer"
                    style={{ marginBottom: "-0.5rem" }}
                  >
                    <div className="searchIconContainer">
                      <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                    </div>

                    <input
                      className="al-search-input"
                      placeholder="Enter next result"
                      value={nextresult}
                      onChange={(e) => setnextresult(e.target.value)}
                    />
                  </div>

                  {loadingCreateResult ? (
                    <LoadingComponent />
                  ) : (
                    <div
                      className="alBottomContainer"
                      onClick={submitCreateResultHandler}
                    >
                      <label className="alBottomContainerlabel">Submit</label>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/** RIGHT COMPONENT */}

            {filteredDataR.length !== 0 && (
              <div className="PLGIMainContainerRight">
                <div className="PLGIRComponent">
                  <div className="PLGIRtop">
                    <div className="PLGIRtopL">
                      <label className="pdB">
                        {" "}
                        {filteredDataR[0].lotlocation.lotlocation}
                      </label>
                    </div>
                    <div className="PLGIRtopR">
                      <label className="pdSB">Next Result</label>
                      <label className="pdR">09:00 PM</label>
                    </div>
                  </div>
                  <div className="PLGIRmiddle">
                    <label className="rnL">
                      {filteredDataR[0].resultNumber}
                    </label>
                  </div>
                  <div className="PLGIRbottom">
                    <div className="PLGIRbottomCon">
                      <label className="pdR">
                        {filteredDataR[0].lotdate.lotdate}
                      </label>
                      <label className="pdR">
                        {filteredDataR[0]?.lottime?.lottime}
                      </label>
                      <label className="pdR">
                        {filteredDataR[0].resultNumber}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

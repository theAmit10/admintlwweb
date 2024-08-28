import React, { useEffect, useState } from "react";
import "./AllLocation.css";
import { CiClock1, CiClock2, CiSearch, CiTrophy } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import images from "../../assets/constants/images";
import {
  useCreatePlayzoneMutation,
  useGetAllLocationWithTimeQuery,
  useUpdateLocationAutomationMutation,
} from "../../helper/Networkcall";
import {
  createLocation,
  getAllLocations,
} from "../../redux/actions/locationAction";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import CircularProgressBar from "../helper/CircularProgressBar";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";
import { getResultAccordingToLocationTimeDate } from "../../redux/actions/resultAction";


export const locationdata = [
  {
    id: "1",
    name: "Canada",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
      { id: "18", time: "09:00 AM" },
      { id: "19", time: "10:00 AM" },
      { id: "20", time: "11:00 AM" },
      { id: "21", time: "12:00 PM" },
      { id: "22", time: "01:00 PM" },
      { id: "23", time: "02:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Japan",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Punjab",
    limit: "200 - 200X",
    times: [
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "4",
    name: "Pune",
    limit: "200 - 200X",
    times: [
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "5",
    name: "China",
    limit: "100 - 100X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "6",
    name: "India",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "7",
    name: "USA",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Korea",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
];

function AllLocation() {
  const [filteredDataL, setFilteredDataL] = useState([]);
  const dispatch = useDispatch();

  const handleSearchL = (e) => {
    const text = e.target.value;
    const filtered = allLocationData?.locationData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDataL(filtered);
  };

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (checked) => {
    setIsToggled(checked);
  };

  const [showAllLocation, setShowAllLocation] = useState(true);
  const [showAllTime, setShowAllTime] = useState(false);
  const [showAllDate, setShowAllDate] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCreateLocation, setShowCreateLocation] = useState(false);
  const [showUpdateLocation, setShowUpdateLocation] = useState(false);
  const [showCreateTime, setShowCreateTime] = useState(false);
  const [showUpdateTime, setShowUpdateTime] = useState(false);
  const [showCreateDate, setShowCreateDate] = useState(false);
  const [showUpdateDate, setShowUpdateDate] = useState(false);
  const [showCreateResult, setShowCreateResult] = useState(false);
  const [showUpdateResult, setShowUpdateResult] = useState(false);

  const settingCreateLocation = () => {
    setShowAllLocation(false);
    setShowCreateLocation(true);
  };

  const [enterData, setEnterData] = useState("");
  const [rangeData, setRangeData] = useState("");
  const [maximumReturn, setmaximumReturn] = useState("");

  const backhandlerCreateLocation = () => {
    setShowAllLocation(true);
    setShowCreateLocation(false);
    allLocationRefetch();
  };

  const removeInputForLocation = () => {
    setEnterData("");
    setmaximumReturn("");
    setRangeData("");
  };

  const addInputForLocation = (item) => {
    setEnterData(item.name);
    setmaximumReturn(item.maximumReturn);
    setRangeData(item.limit);
  };

  const backhandlerUpdateLocation = () => {
    setShowAllLocation(true);
    setShowCreateLocation(false);
    setShowUpdateLocation(false);
    removeInputForLocation();
  };

  // FOR TIME
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const selectingLocation = (item) => {
    setSelectedLocation(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(true);
  };

  const selectingLocationForUpdate = (item) => {
    console.log("For Update");
    console.log(item);
    setSelectedLocation(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    addInputForLocation(item);
    setShowUpdateLocation(true);
  };

  const backhandlerCreateTime = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(true);
    setShowCreateTime(false);
  };

  const backhandlerAllTime = () => {
    setShowAllLocation(true);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
  };

  const settingCreateTime = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(true);
  };

  const backhandlerUpdateTime = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowUpdateTime(false);
    setShowAllTime(true);
    setShowCreateTime(false);
  };

  const settingUpdateTime = (item) => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setSelectedTime(item);
    setShowUpdateTime(true);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  // FOR DATE

  const selectingTime = (item) => {
    setSelectedTime(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowAllDate(true);
    setEnterData("");

    // NOW GETTING THE DATES

    dispatch(
      getDateAccordingToLocationAndTime(
        accesstoken,
        item._id,
        selectedLocation._id
      )
    );
  };

  const backhandlerCreateDate = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowCreateDate(false);
    setShowAllDate(true);
  };

  const backhandlerAllDate = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(true);
    setShowCreateTime(false);
    setShowCreateDate(false);
    setShowAllDate(false);
  };

  const settingCreateDate = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(true);
  };

  const settingUpdateDate = (item) => {
    setSelectedDate(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(false);
    setShowUpdateDate(true);
  };

  const backhandlerUpdateDate = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowCreateDate(false);
    setShowUpdateDate(false);
    setShowAllDate(true);
  };

  // Result

  const selectingDate = (item) => {
    setSelectedDate(item);
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowAllDate(false);
    setShowCreateResult(false);

    // GETTIN THE RESULT

    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        item._id,
        selectedTime._id,
        selectedLocation._id
      )
    );

    console.log("Getting all the times");
    console.log("Mine time ");
    console.log(getNextResultTime(selectedLocation?.times, selectedTime?.time));
    if (selectedLocation && selectedTime) {
      console.log("Getting inside all the times");
      console.log(getNextResultTime(selectedLocation.times, selectedTime.time));
      console.log(
        "times",
        getNextResultTime(selectedLocation.times, selectedTime.time)
      );
      setNextResultData(
        getNextResultTime(selectedLocation.times, selectedTime.time)
      );
      setTime(getNextResultTime(selectedLocation.times, selectedTime.time));
    }
    console.log("Getting End all the times");

    setShowResult(true);
  };

  const settingCreateResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(false);
    setShowResult(false);
    setShowCreateResult(true);
  };

  const settingUpdateResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(false);
    setShowResult(false);
    setShowCreateResult(false);
    setShowUpdateResult(true);
  };

  const backhandlerResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(true);
    setShowCreateDate(false);
    setShowResult(false);
    setShowCreateResult(false);
  };

  const backhandlerCreateResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(false);
    setShowResult(true);
    setShowCreateResult(false);
  };

  const backhandlerUpdateResult = () => {
    setShowAllLocation(false);
    setShowCreateLocation(false);
    setShowCreateLocation(false);
    setShowAllTime(false);
    setShowCreateTime(false);
    setShowAllDate(false);
    setShowCreateDate(false);
    setShowCreateResult(false);
    setShowUpdateResult(false);
    setShowResult(true);
  };

  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);

  const [nextResultData, setNextResultData] = useState("");

  // FOR LOCATION

  const { accesstoken, user } = useSelector((state) => state.user);
  const [
    updateLocationAutomation,
    { isLoadingUpdateLocationAutomation, errorUpdateLocationAutomation },
  ] = useUpdateLocationAutomationMutation();
  const {
    data: allLocationData,
    error: allLocationError,
    isLoading: allLocationIsLoading,
    refetch: allLocationRefetch,
  } = useGetAllLocationWithTimeQuery(accesstoken);

  console.log(allLocationData);

  useEffect(() => {
    if (allLocationData) {
      setFilteredDataL(allLocationData.locationData); // Update filteredData whenever locations change
    }
  }, [allLocationData]);

  const [selectedItem, setSelectedItem] = useState("");
  const [showProgressBar, setProgressBar] = useState(false);

  const deleteLocationHandler = async (item) => {
    console.log("Item clicked :: " + item._id);
    setProgressBar(true);
    setSelectedItem(item._id);

    try {
      const url = `${UrlHelper.DELETE_LOCATION_API}/${item._id}`;
      const { data } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + data);
      showSuccessToast("Success");
      showSuccessToast(data.message);
      setProgressBar(false);
      allLocationRefetch();
    } catch (error) {
      console.log(error.response.data.message);
      setProgressBar(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  // FOR AUTOMATION SWITCH
  const [seletedItemForAutomation, setSeletedItemForAutomation] =
    useState(null);

  // Tog
  const toggleSwitch = async (item) => {
    setSeletedItemForAutomation(item);
    // showAlertAccepted(item);
    callApiFunction(item); // Call your API function here
  };

  const callApiFunction = async (item) => {
    console.log("working");
    console.log("Iteme :: " + JSON.stringify(item));

    let automation = item.automation;

    if (automation === "automatic") {
      automation = "manual";
    } else {
      automation = "automatic";
    }

    console.log("Automation :: " + automation);

    try {
      const formData = {
        automation: automation,
      };

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateLocationAutomation({
        accesstoken: accesstoken,
        id: item._id,
        body: formData,
      }).unwrap();

      console.log("Res :: " + res);
      console.log("Res String :: " + JSON.stringify(res));
      showSuccessToast(res.message);
      setSeletedItemForAutomation(null);
      allLocationRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  // FOR CREATING LOCATION
  const { loading: loadinglocation, location } = useSelector(
    (state) => state.location
  );

  // FUNCTION TO ADD THE MAXIMUM NUMBER
  const removeLastCharacter = (input) => {
    if (input && input.length > 0) {
      return input.slice(0, -1);
    }
    return input;
  };

  const submitHandlerForCreateLocation = () => {
    if (!enterData) {
      showErrorToast("Please Enter Location Name");
    } else if (!rangeData) {
      showErrorToast("Please Enter Maximum Range for this location");
    } else if (!maximumReturn) {
      showErrorToast("Please Enter Maximum Return for this location");
    } else {
      const maximumNumber = removeLastCharacter(maximumReturn);
      dispatch(
        createLocation(
          accesstoken,
          enterData,
          rangeData,
          maximumNumber,
          maximumReturn
        )
      );
      showSuccessToast("Success");
      removeInputForLocation();
      allLocationRefetch();
    }
  };

  //  FOR UPDATEING LOCATION
  const [loadingUpdateLocation, setLoadingUpdateLocation] = useState(false);
  const submitHandlerForUpdateLocation = () => {
    if (!enterData) {
      Toast.show({
        type: "error",
        text1: "Please Enter Location Name",
      });
      showErrorToast();
    } else {
      updateLocationName(accesstoken, selectedLocation);
    }
  };

  const updateLocationName = async (accesstoken, selectedLocation) => {
    try {
      setLoadingUpdateLocation(true);

      const url = `${UrlHelper.UPDATE_LOCATION_API}/${selectedLocation._id}`;

      console.log("URL :: " + url);

      const { data } = await axios.put(
        url,
        {
          lotlocation: enterData,
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
      removeInputForLocation();
      backhandlerUpdateLocation();
      allLocationRefetch();

      setLoadingUpdateLocation(false);
    } catch (error) {
      setLoadingUpdateLocation(false);
      console.log(" Err :: " + error);
      showErrorToast("Please try again");
    }
  };

  // ###############
  // FOR TIME
  // ###############

  const [filteredDataT, setFilteredDataT] = useState([]);

  const handleSearchT = (e) => {
    const text = e.target.value;
    const filtered = selectedLocation.times.filter((item) =>
      item.time.toString().toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDataT(filtered);
  };

  useEffect(() => {
    if (selectedLocation) {
      setFilteredDataT(selectedLocation.times); // Update filteredData whenever locations change
    }
  }, [selectedLocation]);

  const [selectedItemTime, setSelectedItemTime] = useState("");

  const deleteTimeHandler = async (item) => {
    console.log("Item clicked :: " + item._id);
    setProgressBar(true);
    setSelectedItemTime(item._id);

    try {
      const url = `${UrlHelper.DELETE_TIME_API}/${item._id}`;
      const { data } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + data);
      showSuccessToast(data.message);
      setProgressBar(false);
      allLocationRefetch();
      backhandlerAllTime();

      setProgressBar(false);
    } catch (error) {
      setProgressBar(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  // FOR CREATING TIME

  const [loadingCreateTime, setLoadingCreateTime] = useState(false);

  const handleTimeChangeF = (value) => {
    // Extract the hours and minutes from the DateObject
    const formattedTime = moment(value.toDate()).format("hh:mm A");
    setTime(formattedTime);
  };

  const handleDateChange = (value) => {
    // Format the selected date to "DD-MM-YYYY"
    const formattedDate = moment(value.toDate()).format("DD-MM-YYYY");
    setDate(formattedDate); // Update the state with the formatted date
  };

  const submitHandlerForCreateTime = () => {
    if (!time) {
      showErrorToast("Please enter location time");
    } else {
      console.log("Seleted Time");
      console.log(time);
      createTimeForLocation(accesstoken, selectedLocation._id, time);
    }
  };

  const createTimeForLocation = async (accesstoken, lotlocation, lottime) => {
    try {
      setLoadingCreateTime(true);
      const { data } = await axios.post(
        UrlHelper.CREATE_TIME_API,
        {
          lottime,
          lotlocation,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data :: " + data.message);

      setEnterData("");
      showSuccessToast("Success");
      removeInputForLocation();
      allLocationRefetch();
      backhandlerCreateTime();
      setTime(null);
      setLoadingCreateTime(false);
    } catch (error) {
      setLoadingCreateTime(false);
      console.log(" Err :: " + error);
      console.log(error.response.data.message);
      showErrorToast("Something went wrong");
    }
  };

  // FOR UPDATE TIME

  const [loadingUpdateTime, setLoadingUpdateTime] = useState(false);

  const submitHandlerForUpdateTime = () => {
    if (!time) {
      showErrorToast("Please Enter Location Name");
    } else {
      updateLocationTime(accesstoken, selectedTime);
    }
  };

  const updateLocationTime = async (accesstoken, timedata) => {
    try {
      setLoadingUpdateTime(true);
      const url = `${UrlHelper.UPDATE_TIME_API}/${timedata._id}`;

      console.log("URL :: " + url);

      const { data } = await axios.put(
        url,
        {
          lottime: time,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data time :: " + data.message);

      setEnterData("");
      showSuccessToast(data.message);
      setTime(null);
      allLocationRefetch();
      removeInputForLocation();
      backhandlerUpdateTime();
      backhandlerAllTime();
      setLoadingUpdateTime(false);
    } catch (error) {
      setLoadingUpdateTime(false);
      console.log(" Err :: " + error);
      showErrorToast("Something went Wrong");
    }
  };

  // ###############
  // FOR DATE
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

  const [selectedItemDate, setSelectedItemDate] = useState("");

  const deleteDateHandler = async (item) => {
    console.log("Item clicked :: " + item._id);
    setProgressBar(true);
    setSelectedItemDate(item._id);

    try {
      const url = `${UrlHelper.DELETE_DATE_API}/${item._id}`;

      console.log("URL :: " + url);

      const { data } = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + data);

      showSuccessToast(data.message);
      setProgressBar(false);

      dispatch(
        getDateAccordingToLocationAndTime(
          accesstoken,
          selectedTime._id,
          selectedLocation._id
        )
      );
      backhandlerCreateDate();

      setProgressBar(false);
    } catch (error) {
      setProgressBar(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  // FOR CREATING DATE

  const [loadingCreateDate, setLoadingCreateDate] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);

  // FOR CREATING PLAYZONE
  const [createPlayzone, { isLoading, error }] = useCreatePlayzoneMutation();

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;

    // Define options for formatting the date
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };

    // Format the date using toLocaleDateString
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    // Rearrange the formatted date to match the desired format
    const [month, day, year] = formattedDate.split("/");
    const rearrangedDate = `${day}-${month}-${year}`;

    // setShow(Platform.OS === 'ios');
    setShowFrom(Platform.OS === "ios");
    setFromDate(currentDate);
    console.log(currentDate);
    console.log(rearrangedDate);

    // Assuming setEnterData is a function to set some state related to the formatted date
    setEnterData(rearrangedDate); // Set formatted date to state
  };

  const showModeFrom = (currentMode) => {
    setShowFrom(true);
    // setMode(currentMode);
  };

  const showDatepickerFrom = () => {
    showModeFrom("date");
    // handleDateChange(fromDate, 'START_DATE');
  };

  const submitCreateDateHandler = () => {
    if (!date) {
      showErrorToast("Please enter location time");
    } else {
      createDateForLocation(accesstoken, selectedTime._id, date);
    }
  };

  const createPlaynumbersArray = (numStr) => {
    const num = parseInt(numStr, 10);
    const resultArray = [];

    for (let i = 1; i <= num; i++) {
      resultArray.push({
        playnumber: i,
        numbercount: 0,
        amount: 0,
        distributiveamount: 0,
        users: [],
      });
    }

    return resultArray;
  };

  const createDateForLocation = async (accesstoken, lottime, lotdate) => {
    try {
      setLoadingCreateDate(true);
      const { data } = await axios.post(
        UrlHelper.CREATE_DATE_API,
        {
          lotdate,
          lottime,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data :: " + data.message);

      // Now Create Playzone
      try {
        console.log("selectedLocation.maximumNumber");
        console.log(selectedLocation.maximumNumber);
        const body = {
          playnumbers: createPlaynumbersArray(selectedLocation.maximumNumber),
          lotdate: data.lotdate._id,
          lottime: selectedTime._id,
          lotlocation: selectedLocation._id,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await createPlayzone({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        console.log("Playzone response :: " + res.message);
      } catch (error) {
        console.log("Error Creating playzone:", error);

        // if (error.response) {
        //   Toast.show({ type: 'error', text1: error.response.data });
        // } else if (error.request) {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Request was made, but no response was received',
        //   });
        // } else {
        //   Toast.show({ type: 'error', text1: error.message });
        // }
      }

      showSuccessToast(data.message);
      setEnterData("");

      dispatch(
        getDateAccordingToLocationAndTime(
          accesstoken,
          selectedTime._id,
          selectedLocation._id
        )
      );

      setDate(null);

      backhandlerCreateDate();
      setLoadingCreateDate(false);
    } catch (error) {
      setLoadingCreateDate(false);
      console.log(" Err :: " + error);
      showErrorToast("Something went wrong");
    }
  };

  // FOR UPDATING DATE
  const [loadingUpdateDate, setLoadingUpdateDate] = useState(false);
  const submitHandlerForUpdate = () => {
    if (!date) {
      showErrorToast("Please Enter Location Name");
    } else {
      updateDateOfLocation(accesstoken, selectedDate);
    }
  };

  const updateDateOfLocation = async (accesstoken, datedata) => {
    try {
      setLoadingUpdateDate(true);

      const url = `${UrlHelper.UPDATE_DATE_API}/${datedata._id}`;

      console.log("URL :: " + url);

      const { data } = await axios.put(
        url,
        {
          lotdate: date,
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
      setDate(null);
      dispatch(
        getDateAccordingToLocationAndTime(
          accesstoken,
          selectedTime._id,
          selectedLocation._id
        )
      );
      backhandlerUpdateDate();

      setLoadingUpdateDate(false);
    } catch (error) {
      setLoadingUpdateDate(false);
      console.log(" Err :: " + error);

      showErrorToast("Something went Wrong");
    }
  };

  // ###############
  // FOR RESULT
  // ###############

  // FOR GETTING RESULT

  const { loadingResult, results } = useSelector((state) => state.result);
  const [filteredDataR, setFilteredDataR] = useState([]);

  useEffect(() => {
    setFilteredDataR(results); // Update filteredData whenever locations change
  }, [results]);

  const [selectedItemResult, setSelectedItemResult] = useState("");

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
          selectedTime._id,
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

  // FOR CREATING RESULT

  const [loadingCreateResult, setLoadingCreateResult] = useState(false);

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

  const submitCreateResultHandler = () => {
    const currentTime = formatTime(new Date());

    if (!enterData) {
      showErrorToast("Please enter result");
    } else if (!nextResultData) {
      showErrorToast("Please select new result time");
    } else if (nextResultData === currentTime) {
      showErrorToast("Next result time and current time cannot be the same");
    } else {
      createResult(
        accesstoken,
        selectedTime._id,
        selectedDate._id,
        selectedLocation._id,
        nextResultData
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
          resultNumber: enterData,
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
      setEnterData("");
      dispatch(
        getResultAccordingToLocationTimeDate(
          accesstoken,
          selectedDate._id,
          selectedTime._id,
          selectedLocation._id
        )
      );
      setTime(null);
      backhandlerCreateResult();
      setLoadingCreateResult(false);
    } catch (error) {
      setLoadingCreateResult(false);
      console.log(" Err :: " + error);
      showErrorToast("Something went wrong");
    }
  };

  // FOR UPDATE RESULT

  const [loadingUpdateResult, setLoadingUpdateResult] = useState(false);

  const submitUpdateResultHandler = () => {
    const currentTime = formatTime(new Date());
    if (!enterData) {
      showErrorToast("Please enter result");
    } else if (!nextResultData) {
      showErrorToast("Please select new result time");
    } else if (nextResultData === currentTime) {
      showErrorToast("Next result time and current time cannot be the same");
    } else {
      updateResultNumber();
    }
  };

  const updateResultNumber = async () => {
    try {
      setLoadingUpdateResult(true);
      const url = `${UrlHelper.UPDATE_RESULT_API}/${filteredDataR[0]._id}`;
      console.log("URL :: " + url);

      const { data } = await axios.put(
        url,
        {
          resultNumber: enterData,
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
      setEnterData("");
      dispatch(
        getResultAccordingToLocationTimeDate(
          accesstoken,
          selectedDate._id,
          selectedTime._id,
          selectedLocation._id
        )
      );
      setTime(null);
      backhandlerUpdateResult();
      setLoadingUpdateResult(false);
    } catch (error) {
      setLoadingUpdateResult(false);
      console.log(" Err :: " + error);
      showErrorToast("Something went Wrong");
    }
  };

  return (
    <>
      {showAllLocation && (
        <div className="allLocationContainer">
          {/** SEARCH CONTATINER */}
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <CiSearch color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Search location"
              label="Search"
              onChange={handleSearchL}
            />
          </div>

          {allLocationIsLoading ? (
            <LoadingComponent />
          ) : filteredDataL.length === 0 ? (
            <NodataFound title={"No data available"} />
          ) : (
            <>
              <div className="allLocationMainContainer">
                {/** CONTENT */}
                {filteredDataL.map((item, index) => (
                  <div
                    key={item._id}
                    className="allContentContainer-al"
                    style={{
                      gap: "2rem",
                    }}
                  >
                    <div
                      className="lcnamelimit"
                      onClick={() => selectingLocation(item)}
                    >
                      <label className="allContentContainerLocationL">
                        {item.name}
                      </label>
                      <label className="allContentContainerLimitL">
                        Max {item.limit}
                      </label>
                    </div>
                    {/** FOR AUTOMATION */}
                    {user && user.role === "admin" ? (
                      !isLoadingUpdateLocationAutomation ? (
                        seletedItemForAutomation?._id === item._id ? (
                          <LoadingComponent />
                        ) : (
                          <div className="switchContainer">
                            <label className="allContentContainerLimitL">
                              Manual
                            </label>
                            <label className="allContentContainerLimitL">
                              <Switch
                                checked={item.automation === "automatic"}
                                onChange={() => toggleSwitch(item)}
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
                            <label className="allContentContainerLimitL">
                              Automatic
                            </label>
                          </div>
                        )
                      ) : (
                        <div className="switchContainer">
                          <label className="allContentContainerLimitL">
                            Manual
                          </label>
                          <label className="allContentContainerLimitL">
                            <Switch
                              checked={item.automation === "automatic"}
                              onChange={() => toggleSwitch(item)}
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
                          <label className="allContentContainerLimitL">
                            Automatic
                          </label>
                        </div>
                      )
                    ) : null}

                    {/** FOR EDITING */}
                    {user && user.role === "admin" ? (
                      <div
                        className="allContentContainerIconContainer"
                        onClick={() => selectingLocationForUpdate(item)}
                      >
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    ) : null}

                    {/** FOR DELETING */}
                    {user && user.role === "admin" ? (
                      showProgressBar ? (
                        selectedItem === item._id ? (
                          <CircularProgressBar />
                        ) : (
                          <div
                            className="allContentContainerIconContainer"
                            onClick={() => deleteLocationHandler(item)}
                          >
                            <MdDelete
                              color={COLORS.background}
                              size={"2.5rem"}
                            />
                          </div>
                        )
                      ) : (
                        <div
                          className="allContentContainerIconContainer"
                          onClick={() => deleteLocationHandler(item)}
                        >
                          <MdDelete color={COLORS.background} size={"2.5rem"} />
                        </div>
                      )
                    ) : null}
                  </div>
                ))}
              </div>
              {/** SEARCH CONTATINER */}
              <div
                className="alBottomContainer"
                onClick={settingCreateLocation}
              >
                <label className="alBottomContainerlabel">
                  Create Location
                </label>
              </div>
            </>
          )}
        </div>
      )}

      {showUpdateLocation && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerUpdateLocation}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Location
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Location Name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter location name"
                value={enterData}
                onChange={(e) => setEnterData(e.target.value)}
              />
            </div>
          </div>

          {/** SUBMIT CONTATINER */}

          {loadingUpdateLocation ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitHandlerForUpdateLocation}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showCreateLocation && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateLocation}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Location
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Location Name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter location name"
                value={enterData}
                onChange={(e) => setEnterData(e.target.value)}
              />
            </div>

            {/** MAXIMUM RNAGE */}
            <label className="alCLLabel">Maximum Range</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="For example:  2 - 2x"
                value={rangeData}
                onChange={(e) => setRangeData(e.target.value)}
              />
            </div>

            {/** MAXIMUM RETURN */}
            <label className="alCLLabel">Maximum Number</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="For example:  2x"
                value={maximumReturn}
                onChange={(e) => setmaximumReturn(e.target.value)}
              />
            </div>
          </div>

          {/** SUBMIT CONTATINER */}

          {loadinglocation ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitHandlerForCreateLocation}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showAllTime && selectedLocation && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerAllTime}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Time
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
              placeholder="Search for time"
              label="Search"
              onChange={handleSearchT}
            />
          </div>
          <div className="allLocationMainContainer-time">
            {/** CONTENT */}
            {filteredDataT.length === 0 ? (
              <NodataFound title={"No data available"} />
            ) : (
              filteredDataT.map((item, index) => (
                <div
                  style={{
                    gap: "2rem",
                  }}
                  key={item._id}
                  className="allContentContainer-al"
                >
                  <div
                    className="lcnamelimit"
                    onClick={() => selectingTime(item)}
                  >
                    <label className="allContentContainerLocationL">
                      {item.time}
                    </label>
                  </div>

                  {user && user.role === "admin" ? (
                    <div className="alllEditControllerContainer">
                      <div
                        className="allContentContainerIconContainer"
                        onClick={() => settingUpdateTime(item)}
                      >
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>

                      {showProgressBar ? (
                        selectedItemTime === item._id ? (
                          <CircularProgressBar />
                        ) : (
                          <div
                            className="allContentContainerIconContainer"
                            onClick={() => deleteTimeHandler(item)}
                          >
                            <MdDelete
                              color={COLORS.background}
                              size={"2.5rem"}
                            />
                          </div>
                        )
                      ) : (
                        <div
                          className="allContentContainerIconContainer"
                          onClick={() => deleteTimeHandler(item)}
                        >
                          <MdDelete color={COLORS.background} size={"2.5rem"} />
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
          {/** SEARCH CONTATINER */}
          <div className="alBottomContainer" onClick={settingCreateTime}>
            <label className="alBottomContainerlabel">Create Time</label>
          </div>
        </div>
      )}

      {showCreateTime && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateTime}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Time
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Select Time</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiTimer color={COLORS.background} size={"2.5rem"} />
              </div>

              <div className="timeContainerAL">
                {time && (
                  <p
                    className="alCLLabel"
                    style={{ color: COLORS.black, paddingRight: "1rem" }}
                  >
                    Current Selected Time: {time}
                  </p>
                )}
                <DatePicker
                  value={time}
                  onChange={handleTimeChangeF}
                  format="hh:mm A"
                  plugins={[<TimePicker key={1} />]}
                />
              </div>
            </div>
          </div>

          {/** SUBMIT CONTATINER */}
          {loadingCreateTime ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitHandlerForCreateTime}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showUpdateTime && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerUpdateTime}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Time
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Select Time</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiTimer color={COLORS.background} size={"2.5rem"} />
              </div>
              <div className="timeContainerAL">
                {time && (
                  <p
                    className="alCLLabel"
                    style={{ color: COLORS.black, paddingRight: "1rem" }}
                  >
                    Current Selected Time: {time}
                  </p>
                )}
                <DatePicker
                  value={time}
                  onChange={handleTimeChangeF}
                  format="hh:mm A"
                  plugins={[<TimePicker key={1} />]}
                />
              </div>
            </div>
          </div>

          {/** SUBMIT CONTATINER */}

          {loadingUpdateTime ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitHandlerForUpdateTime}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showAllDate && selectedTime && selectedLocation && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerAllDate}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Date
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

          {loadingDates ? (
            <LoadingComponent />
          ) : filteredDataD.length === 0 ? (
            <NodataFound title={"No dates available"} />
          ) : (
            <div className="allLocationMainContainer-time">
              {/** CONTENT */}
              {filteredDataD.map((item, index) => (
                <div key={item._id} className="allContentContainer-al">
                  <div
                    className="lcnamelimit"
                    onClick={() => selectingDate(item)}
                  >
                    <label className="allContentContainerLocationL">
                      {item.lotdate}
                    </label>
                  </div>

                  {user && user.role === "admin" ? (
                    <div className="alllEditControllerContainer">
                      <div
                        className="allContentContainerIconContainer"
                        onClick={() => settingUpdateDate(item)}
                      >
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>

                      {/** FOR DELETE */}

                      {showProgressBar ? (
                        selectedItemDate === item._id ? (
                          <CircularProgressBar />
                        ) : (
                          <div
                            className="allContentContainerIconContainer"
                            onClick={() => deleteDateHandler(item)}
                          >
                            <MdDelete
                              color={COLORS.background}
                              size={"2.5rem"}
                            />
                          </div>
                        )
                      ) : (
                        <div
                          className="allContentContainerIconContainer"
                          onClick={() => deleteDateHandler(item)}
                        >
                          <MdDelete color={COLORS.background} size={"2.5rem"} />
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {/** SEARCH CONTATINER */}
          <div className="alBottomContainer" onClick={settingCreateDate}>
            <label className="alBottomContainerlabel">Create Date</label>
          </div>
        </div>
      )}

      {showCreateDate && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateDate}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Date
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Select Date</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiTimer color={COLORS.background} size={"2.5rem"} />
              </div>

              <div className="timeContainerAL">
                {date && (
                  <p
                    className="alCLLabel"
                    style={{ color: COLORS.black, paddingRight: "1rem" }}
                  >
                    Current Selected Date: {date}
                  </p>
                )}
                <DatePicker
                  value={date} // Bind the value to the date state
                  onChange={handleDateChange} // Handle date selection
                  format="DD-MM-YYYY" // Format the displayed date
                />
              </div>
            </div>
          </div>

          {/** SUBMIT CONTATINER */}
          {loadingCreateDate ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitCreateDateHandler}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showUpdateDate && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateDate}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Date
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Select Date</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiTimer color={COLORS.background} size={"2.5rem"} />
              </div>

              <div className="timeContainerAL">
                {date && (
                  <p
                    className="alCLLabel"
                    style={{ color: COLORS.black, paddingRight: "1rem" }}
                  >
                    Current Selected Date: {date}
                  </p>
                )}
                <DatePicker
                  value={date} // Bind the value to the date state
                  onChange={handleDateChange} // Handle date selection
                  format="DD-MM-YYYY" // Format the displayed date
                />
              </div>
            </div>
          </div>

          {/** SUBMIT CONTATINER */}

          {loadingUpdateDate ? (
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={submitHandlerForUpdate}>
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showResult && selectedTime && selectedLocation && selectedDate && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerResult}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">Result</label>
            </div>
          </div>

          <div className="allLocationMainContainer-result">
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

                {loadingResult ? (
                  <LoadingComponent />
                ) : filteredDataR.length === 0 ? (
                  <div className="hdLocationContainerRightTimeContainerContentContainer-resultleft">
                    <label className="alCreatLocationTopContainerlabel">
                      Comming soon
                    </label>
                    <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-date">
                      {selectedDate.lotdate}
                    </label>
                    <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-date">
                      {selectedTime.lottime}
                    </label>
                  </div>
                ) : (
                  <div className="hdLocationContainerRightTimeContainerContentContainer-resultleft">
                    <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-number">
                      {filteredDataR[0].resultNumber}
                    </label>
                    <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-date">
                      {filteredDataR[0].lotdate.lotdate}
                    </label>
                    <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-date">
                      {filteredDataR[0]?.lottime?.lottime}
                    </label>
                  </div>
                )}

                <div className="catimagecontainer">
                  <img src={images.cat} alt="cat" className="catandtrophyimg" />
                </div>
              </div>
            </div>
          </div>

          {/** SEARCH CONTATINER */}

          {filteredDataR.length === 0 ? (
            <div className="alBottomContainer" onClick={settingCreateResult}>
              <label className="alBottomContainerlabel">Create Result</label>
            </div>
          ) : showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={deleteResultHandler}>
              <label className="alBottomContainerlabel">Delete Result</label>
            </div>
          )}

          <div className="alBottomContainer" onClick={settingUpdateResult}>
            <label className="alBottomContainerlabel">Update Result</label>
          </div>
        </div>
      )}

      {showCreateResult && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerCreateResult}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Result
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Result Number</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiTrophy color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter result number"
                value={enterData}
                onChange={(e) => setEnterData(e.target.value)}
              />
            </div>

            {/** MAXIMUM RNAGE */}
            <label className="alCLLabel">Next Result</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiClock1 color={COLORS.background} size={"2.5rem"} />
              </div>

              {/* <input
                className="al-search-input"
                placeholder="Enter next result"
                value={nextResultData}
                onChange={(e) => setNextResultData(e.target.value)}
              /> */}

              <div className="timeContainerAL">
                {time && (
                  <p
                    className="alCLLabel"
                    style={{ color: COLORS.black, paddingRight: "1rem" }}
                  >
                    Current Selected Time: {time}
                  </p>
                )}
                <DatePicker
                  value={time}
                  onChange={handleTimeChangeF}
                  format="hh:mm A"
                  plugins={[<TimePicker key={1} />]}
                />
              </div>
            </div>
          </div>

          {/** SUBMIT CONTATINER */}

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
        </div>
      )}

      {showUpdateResult && (
        <div className="allLocationContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerUpdateResult}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Result
              </label>
            </div>
          </div>

          {/** MAIN CREATE LOCATION */}
          <div className="allLocationMainContainer-CL">
            {/** LOCATION NAME */}
            <label className="alCLLabel">Result Number</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter result number"
                value={enterData}
                onChange={(e) => setEnterData(e.target.value)}
              />
            </div>

            {/** MAXIMUM RNAGE */}
            <label className="alCLLabel">Next Result</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoLocationSharp color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter next result"
                value={nextResultData}
                onChange={(e) => setNextResultData(e.target.value)}
              />
            </div>
          </div>

          {/** SUBMIT CONTATINER */}

          {loadingUpdateResult ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitUpdateResultHandler}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default AllLocation;

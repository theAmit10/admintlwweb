import React, { useCallback, useEffect, useState } from "react";
import "./AllCountry.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useCreateCurrencyMutation,
  useDeleteCurrencyMutation,
  useGetAllCountryQuery,
  useUpdateCurrencyMutation,
} from "../../helper/Networkcall";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import images from "../../assets/constants/images";

function AllCountry() {
  const [filteredData, setFilteredData] = useState([]);
  const [showCountry, setShowCountry] = useState(true);
  const [showCreateCountry, setShowCreateCountry] = useState(false);
  const [showEditCountry, setShowEditCountry] = useState(false);

  const dispatch = useDispatch();

  const { accesstoken } = useSelector((state) => state.user);

  const { data, isLoading, error, refetch } =
    useGetAllCountryQuery(accesstoken);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = data?.currencies.filter((item) =>
      item.countryname.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (data) {
      setFilteredData(data?.currencies); // Update filteredData whenever locations change
    }
  }, [data]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const selectingLocation = (item) => {
    setSelectedLocation(item);
  };

  //  FOR CREATING AND UPDATING

  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  const settingCreateCountry = () => {
    setShowCountry(false);
    setShowCreateCountry(true);
  };
  const backHandlerCreateCountry = () => {
    setShowCountry(true);
    setShowCreateCountry(false);
  };

  const [countryname, setcountryname] = useState("");
  const [countrycurrencysymbol, setcountrycurrencysymbol] = useState("");
  const [
    countrycurrencyvaluecomparedtoinr,
    setcountrycurrencyvaluecomparedtoinr,
  ] = useState("");
  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const settingEditCountry = (item) => {
    setShowCountry(false);
    setShowCreateCountry(false);
    setShowEditCountry(true);
    setSelectedItem(item);
  };
  const backHandlerEditCountry = () => {
    setShowEditCountry(false);
    setShowCreateCountry(false);
    setShowCountry(true);
  };

  // API CALLING
  const signupwith = "email";

  console.log(signupwith);
  const navigation = useNavigate();

  const [
    deleteCurrency,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteCurrencyMutation();

  const [seletedItem, setSelectedItem] = useState("");

  console.log("Curriencies ::" + JSON.stringify(data));

  useEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch])
  );

  // FOR DELETING DATA

  const deletingData = async (item) => {
    console.log("Deleting Data");
    setSelectedItem(item);

    const res = await deleteCurrency({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    console.log(deleteIsError);
    showSuccessToast(res.message);
    refetch();
  };

  // FOR UPDATING CURRENCY VALUE

  const [
    updateCurrency,
    { isLoading: updateCurrencyIsLoading, error: updateCurrencyError },
  ] = useUpdateCurrencyMutation();

  const submitUpdateCurrencyValue = async () => {
    if (!countrycurrencyvaluecomparedtoinr) {
      showErrorToast("Enter currency value compared to INR");
    } else if (isNaN(countrycurrencyvaluecomparedtoinr)) {
      showErrorToast("Enter valid currency value");
    } else {
      console.log("Update Currency Running");
      try {
        const formData = {
          countrycurrencyvaluecomparedtoinr: countrycurrencyvaluecomparedtoinr,
        };

        console.log("FORM DATA :: " + JSON.stringify(formData));

        const res = await updateCurrency({
          accesstoken: accesstoken,
          id: seletedItem._id,
          body: formData,
        }).unwrap();

        console.log("Res :: " + res);
        console.log("Res String :: " + JSON.stringify(res));

        showSuccessToast(res.message);
        backHandlerEditCountry();
        refetch();
      } catch (error) {
        console.log("Error during deposit:", error);
        if (error.response) {
          showErrorToast(error.response.data);
        } else if (error.request) {
          showErrorToast("Request was made, but no response was received");
        } else {
          showErrorToast(error.message);
        }
      }
    }
  };

  // FOR CREATING CURRECY

  const [
    createCurrency,
    { isLoading: createCurrencyIsLoading, error: createCurrencyError },
  ] = useCreateCurrencyMutation();

  const submitCreateCurrency = async () => {
    if (!countryname) {
      showErrorToast("Enter country name");
      return;
    }
    if (!countrycurrencysymbol) {
      showErrorToast("Enter country symbol");
      return;
    }
    if (!countrycurrencyvaluecomparedtoinr) {
      showErrorToast("Enter currency value compared to INR");
      return;
    }
    if (!imageSource) {
      showErrorToast("Add currency icon");
      return;
    } else {
      console.log("Create currency Running");
      console.log("Starting Creating currency");
      try {
        const formData = new FormData();
        formData.append("countryname", countryname);
        formData.append("countrycurrencysymbol", countrycurrencysymbol);
        formData.append(
          "countrycurrencyvaluecomparedtoinr",
          countrycurrencyvaluecomparedtoinr
        );
        formData.append("countryicon", imageSource); // Assuming `imageSource` is a valid File or Blob object

        // Logging FormData entries
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const res = await createCurrency({
          accesstoken: accesstoken,
          body: formData,
        }).unwrap();

        console.log("Res :: " + res);
        console.log("Res String :: " + JSON.stringify(res));

        showSuccessToast(res.message);
        backHandlerCreateCountry();
        setcountrycurrencysymbol("");
        setImageSource(null);
        setcountryname("");
        setcountrycurrencyvaluecomparedtoinr("");
      } catch (error) {
        console.log("Found Error During create currency");
        if (error.response) {
          showErrorToast(error.response.data);
        } else if (error.request) {
          showErrorToast("Request was made, but no response was received");
        } else {
          showErrorToast(error.message);
        }
        console.log("Error during deposit:", error);
        console.log(createCurrencyError);
      }
    }
  };

  return (
    <div className="gameDescriptionContainer">
      {/** TOP NAVIGATION CONTATINER */}
      {showCountry && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              All Country
            </label>
          </div>
        </div>
      )}

      {showCountry && (
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

      {showCountry && (
        <div className="acMainContainer">
          {/** CONTENT */}
          {isLoading ? (
            <LoadingComponent />
          ) : filteredData.length === 0 ? (
            <NodataFound title={"No country available"} />
          ) : (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="allContentContainer-al"
                onClick={() => selectingLocation(item)}
              >
                {item?.countryicon ? (
                  <div className="c-iconContainer">
                    <img
                      src={`${serverName}/uploads/currency/${item.countryicon}`}
                      alt="country icon"
                      className="c-icon"
                    />
                  </div>
                ) : (
                  <div className="countryV">
                    <img
                      src={images.user}
                      alt="country icon"
                      className="c-icon"
                    />
                  </div>
                )}
                <div className="countryC">
                  <label className="allContentContainerLocationL">
                    {item.countryname}
                  </label>
                </div>

                <div className="countryV">
                  <label className="allContentContainerLimitL">
                    {item.countrycurrencysymbol}
                  </label>
                </div>

                <div className="countryV">
                  <label className="allContentContainerLimitL">
                    1 {item.countrycurrencysymbol} ={" "}
                    {item.countrycurrencyvaluecomparedtoinr} INR
                  </label>
                </div>

                <div className="editConatiner">
                  <div
                    className="allContentContainerIconContainer"
                    onClick={() => settingEditCountry(item)}
                  >
                    <CiEdit color={COLORS.background} size={"2.5rem"} />
                  </div>

                  {/** DELETING CURRENCY */}

                  {deleteIsLoading ? (
                    seletedItem._id === item._id ? (
                      <LoadingComponent />
                    ) : (
                      <div
                        onClick={() => deletingData(item)}
                        className="allContentContainerIconContainer"
                      >
                        <MdDelete color={COLORS.background} size={"2.5rem"} />
                      </div>
                    )
                  ) : (
                    <div
                      onClick={() => deletingData(item)}
                      className="allContentContainerIconContainer"
                    >
                      <MdDelete color={COLORS.background} size={"2.5rem"} />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showCountry && (
        <div className="alBottomContainer" onClick={settingCreateCountry}>
          <label className="alBottomContainerlabel">Create country</label>
        </div>
      )}

      {showCreateCountry && (
        <div className="acMainContainer-create">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHandlerCreateCountry}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Create Country
              </label>
            </div>
          </div>

          {/** NAME */}
          <label className="alCLLabel">Country name</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter country name"
              value={countryname}
              onChange={(e) => setcountryname(e.target.value)}
            />
          </div>

          {/** SYMBOL */}
          <label className="alCLLabel">Country symbol</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter country symbol"
              value={countrycurrencysymbol}
              onChange={(e) => setcountrycurrencysymbol(e.target.value)}
            />
          </div>

          {/** ICON */}
          <label className="alCLLabel">Country Flag</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
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

          {/** value */}
          <label className="alCLLabel">Currency value compared to INR</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter Currency value compared to INR"
              value={countrycurrencyvaluecomparedtoinr}
              onChange={(e) =>
                setcountrycurrencyvaluecomparedtoinr(e.target.value)
              }
            />
          </div>

          {/** SUBMIT CONTATINER */}
          {createCurrencyIsLoading ? (
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={submitCreateCurrency}>
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {showEditCountry && (
        <div className="acMainContainer-create">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backHandlerEditCountry}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                {seletedItem.countryname}
              </label>
            </div>
          </div>

          {/** value */}
          <label className="alCLLabel">
            {seletedItem.countrycurrencysymbol} Currency value compared to INR
          </label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <IoDocumentText color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter Currency value compared to INR"
              value={countrycurrencyvaluecomparedtoinr}
              onChange={(e) =>
                setcountrycurrencyvaluecomparedtoinr(e.target.value)
              }
            />
          </div>

          {/** SUBMIT CONTATINER */}
          {updateCurrencyIsLoading ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={submitUpdateCurrencyValue}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AllCountry;

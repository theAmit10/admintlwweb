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
  const [timezone, settimezone] = useState("");
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

  // showAllCountryWithTimezone

  const [showTimezone, setShowTimezone] = useState(false);
  const [seletedCountryTimezone, setSeletedCountryTimezone] = useState(null);

  const showAllCountryWithTimezone = () => {
    setShowTimezone(true);
  };

  const selectingCountryWithTimezone = (item) => {
    console.log("Seleted country timezone")
    console.log(item)
    setSeletedCountryTimezone(item);
    setcountryname(item.name)
    settimezone(item.timezone)
    setShowTimezone(false);
  };

  const [filterDataCN, setFilterDataCN] = useState(countrytimezone);

  const handleSearchCN = (e) => {
    const text = e.target.value;
    const filtered = countrytimezone.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilterDataCN(filtered);
  };

  const [
    createCurrency,
    { isLoading: createCurrencyIsLoading, error: createCurrencyError },
  ] = useCreateCurrencyMutation();

  const submitCreateCurrency = async () => {
    if (!countryname) {
      showErrorToast("Enter country name");
      return;
    }
    if (!timezone) {
      showErrorToast("Enter country timezone");
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
        formData.append("timezone", timezone);
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

      {showCreateCountry &&
        (showTimezone ? (
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

            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiSearch color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Search country"
                label="Search"
                onChange={handleSearchCN}
              />
            </div>

            {filterDataCN.map((item, index) => (
              <div
                key={index}
                onClick={() => selectingCountryWithTimezone(item)}
                className="allContentContainer-al"
              >
                <div className="countryC">
                  <label className="allContentContainerLocationL">
                    {item.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
            <div
              className="alSearchContainer"
              onClick={showAllCountryWithTimezone}
            >
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <label className="cnlabel">{countryname === "" ?  "Select a country" : countryname }</label>
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
        ))}

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

const countrytimezone = [
  { name: "Afghanistan", timezone: "Asia/Kabul" },
  { name: "Albania", timezone: "Europe/Tirane" },
  { name: "Algeria", timezone: "Africa/Algiers" },
  { name: "Andorra", timezone: "Europe/Andorra" },
  { name: "Angola", timezone: "Africa/Luanda" },
  { name: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { name: "Armenia", timezone: "Asia/Yerevan" },
  { name: "Australia", timezone: "Australia/Sydney" },
  { name: "Austria", timezone: "Europe/Vienna" },
  { name: "Azerbaijan", timezone: "Asia/Baku" },
  { name: "Bahamas", timezone: "America/Nassau" },
  { name: "Bahrain", timezone: "Asia/Bahrain" },
  { name: "Bangladesh", timezone: "Asia/Dhaka" },
  { name: "Belarus", timezone: "Europe/Minsk" },
  { name: "Belgium", timezone: "Europe/Brussels" },
  { name: "Belize", timezone: "America/Belize" },
  { name: "Benin", timezone: "Africa/Porto-Novo" },
  { name: "Bhutan", timezone: "Asia/Thimphu" },
  { name: "Bolivia", timezone: "America/La_Paz" },
  { name: "Bosnia and Herzegovina", timezone: "Europe/Sarajevo" },
  { name: "Botswana", timezone: "Africa/Gaborone" },
  { name: "Brazil", timezone: "America/Sao_Paulo" },
  { name: "Brunei", timezone: "Asia/Brunei" },
  { name: "Bulgaria", timezone: "Europe/Sofia" },
  { name: "Burkina Faso", timezone: "Africa/Ouagadougou" },
  { name: "Burundi", timezone: "Africa/Bujumbura" },
  { name: "Cambodia", timezone: "Asia/Phnom_Penh" },
  { name: "Cameroon", timezone: "Africa/Douala" },
  { name: "Canada", timezone: "America/Toronto" },
  { name: "Cape Verde", timezone: "Atlantic/Cape_Verde" },
  { name: "Central African Republic", timezone: "Africa/Bangui" },
  { name: "Chad", timezone: "Africa/Ndjamena" },
  { name: "Chile", timezone: "America/Santiago" },
  { name: "China", timezone: "Asia/Shanghai" },
  { name: "Colombia", timezone: "America/Bogota" },
  { name: "Comoros", timezone: "Indian/Comoro" },
  { name: "Congo (Democratic Republic)", timezone: "Africa/Kinshasa" },
  { name: "Congo (Republic)", timezone: "Africa/Brazzaville" },
  { name: "Costa Rica", timezone: "America/Costa_Rica" },
  { name: "Croatia", timezone: "Europe/Zagreb" },
  { name: "Cuba", timezone: "America/Havana" },
  { name: "Cyprus", timezone: "Asia/Nicosia" },
  { name: "Czech Republic", timezone: "Europe/Prague" },
  { name: "Denmark", timezone: "Europe/Copenhagen" },
  { name: "Djibouti", timezone: "Africa/Djibouti" },
  { name: "Dominica", timezone: "America/Dominica" },
  { name: "Dominican Republic", timezone: "America/Santo_Domingo" },
  { name: "East Timor", timezone: "Asia/Dili" },
  { name: "Ecuador", timezone: "America/Guayaquil" },
  { name: "Egypt", timezone: "Africa/Cairo" },
  { name: "El Salvador", timezone: "America/El_Salvador" },
  { name: "Equatorial Guinea", timezone: "Africa/Malabo" },
  { name: "Eritrea", timezone: "Africa/Asmara" },
  { name: "Estonia", timezone: "Europe/Tallinn" },
  { name: "Eswatini", timezone: "Africa/Mbabane" },
  { name: "Ethiopia", timezone: "Africa/Addis_Ababa" },
  { name: "Fiji", timezone: "Pacific/Fiji" },
  { name: "Finland", timezone: "Europe/Helsinki" },
  { name: "France", timezone: "Europe/Paris" },
  { name: "Gabon", timezone: "Africa/Libreville" },
  { name: "Gambia", timezone: "Africa/Banjul" },
  { name: "Georgia", timezone: "Asia/Tbilisi" },
  { name: "Germany", timezone: "Europe/Berlin" },
  { name: "Ghana", timezone: "Africa/Accra" },
  { name: "Greece", timezone: "Europe/Athens" },
  { name: "Greenland", timezone: "America/Nuuk" },
  { name: "Grenada", timezone: "America/Grenada" },
  { name: "Guatemala", timezone: "America/Guatemala" },
  { name: "Guinea", timezone: "Africa/Conakry" },
  { name: "Guinea-Bissau", timezone: "Africa/Bissau" },
  { name: "Guyana", timezone: "America/Guyana" },
  { name: "Haiti", timezone: "America/Port-au-Prince" },
  { name: "Honduras", timezone: "America/Tegucigalpa" },
  { name: "Hungary", timezone: "Europe/Budapest" },
  { name: "Iceland", timezone: "Atlantic/Reykjavik" },
  { name: "India", timezone: "Asia/Kolkata" },
  { name: "Indonesia", timezone: "Asia/Jakarta" },
  { name: "Iran", timezone: "Asia/Tehran" },
  { name: "Iraq", timezone: "Asia/Baghdad" },
  { name: "Ireland", timezone: "Europe/Dublin" },
  { name: "Israel", timezone: "Asia/Jerusalem" },
  { name: "Italy", timezone: "Europe/Rome" },
  { name: "Jamaica", timezone: "America/Jamaica" },
  { name: "Japan", timezone: "Asia/Tokyo" },
  { name: "Jordan", timezone: "Asia/Amman" },
  { name: "Kazakhstan", timezone: "Asia/Almaty" },
  { name: "Kenya", timezone: "Africa/Nairobi" },
  { name: "Kiribati", timezone: "Pacific/Tarawa" },
  { name: "Kuwait", timezone: "Asia/Kuwait" },
  { name: "Kyrgyzstan", timezone: "Asia/Bishkek" },
  { name: "Laos", timezone: "Asia/Vientiane" },
  { name: "Latvia", timezone: "Europe/Riga" },
  { name: "Lebanon", timezone: "Asia/Beirut" },
  { name: "Lesotho", timezone: "Africa/Maseru" },
  { name: "Liberia", timezone: "Africa/Monrovia" },
  { name: "Libya", timezone: "Africa/Tripoli" },
  { name: "Liechtenstein", timezone: "Europe/Vaduz" },
  { name: "Lithuania", timezone: "Europe/Vilnius" },
  { name: "Luxembourg", timezone: "Europe/Luxembourg" },
  { name: "Madagascar", timezone: "Indian/Antananarivo" },
  { name: "Malawi", timezone: "Africa/Blantyre" },
  { name: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
  { name: "Maldives", timezone: "Indian/Maldives" },
  { name: "Mali", timezone: "Africa/Bamako" },
  { name: "Malta", timezone: "Europe/Malta" },
  { name: "Marshall Islands", timezone: "Pacific/Majuro" },
  { name: "Mauritania", timezone: "Africa/Nouakchott" },
  { name: "Mauritius", timezone: "Indian/Mauritius" },
  { name: "Mexico", timezone: "America/Mexico_City" },
  { name: "Micronesia", timezone: "Pacific/Chuuk" },
  { name: "Moldova", timezone: "Europe/Chisinau" },
  { name: "Monaco", timezone: "Europe/Monaco" },
  { name: "Mongolia", timezone: "Asia/Ulaanbaatar" },
  { name: "Montenegro", timezone: "Europe/Podgorica" },
  { name: "Morocco", timezone: "Africa/Casablanca" },
  { name: "Mozambique", timezone: "Africa/Maputo" },
  { name: "Myanmar", timezone: "Asia/Yangon" },
  { name: "Namibia", timezone: "Africa/Windhoek" },
  { name: "Nauru", timezone: "Pacific/Nauru" },
  { name: "Nepal", timezone: "Asia/Kathmandu" },
  { name: "Netherlands", timezone: "Europe/Amsterdam" },
  { name: "New Zealand", timezone: "Pacific/Auckland" },
  { name: "Nicaragua", timezone: "America/Managua" },
  { name: "Niger", timezone: "Africa/Niamey" },
  { name: "Nigeria", timezone: "Africa/Lagos" },
  { name: "North Korea", timezone: "Asia/Pyongyang" },
  { name: "North Macedonia", timezone: "Europe/Skopje" },
  { name: "Norway", timezone: "Europe/Oslo" },
  { name: "Oman", timezone: "Asia/Muscat" },
  { name: "Pakistan", timezone: "Asia/Karachi" },
  { name: "Palau", timezone: "Pacific/Palau" },
  { name: "Panama", timezone: "America/Panama" },
  { name: "Papua New Guinea", timezone: "Pacific/Port_Moresby" },
  { name: "Paraguay", timezone: "America/Asuncion" },
  { name: "Peru", timezone: "America/Lima" },
  { name: "Philippines", timezone: "Asia/Manila" },
  { name: "Poland", timezone: "Europe/Warsaw" },
  { name: "Portugal", timezone: "Europe/Lisbon" },
  { name: "Qatar", timezone: "Asia/Qatar" },
  { name: "Romania", timezone: "Europe/Bucharest" },
  { name: "Russia", timezone: "Europe/Moscow" },
  { name: "Rwanda", timezone: "Africa/Kigali" },
  { name: "Saint Kitts and Nevis", timezone: "America/St_Kitts" },
  { name: "Saint Lucia", timezone: "America/St_Lucia" },
  { name: "Saint Vincent and the Grenadines", timezone: "America/St_Vincent" },
  { name: "Samoa", timezone: "Pacific/Apia" },
  { name: "San Marino", timezone: "Europe/San_Marino" },
  { name: "Sao Tome and Principe", timezone: "Africa/Sao_Tome" },
  { name: "Saudi Arabia", timezone: "Asia/Riyadh" },
  { name: "Senegal", timezone: "Africa/Dakar" },
  { name: "Serbia", timezone: "Europe/Belgrade" },
  { name: "Seychelles", timezone: "Indian/Mahe" },
  { name: "Sierra Leone", timezone: "Africa/Freetown" },
  { name: "Singapore", timezone: "Asia/Singapore" },
  { name: "Slovakia", timezone: "Europe/Bratislava" },
  { name: "Slovenia", timezone: "Europe/Ljubljana" },
  { name: "Solomon Islands", timezone: "Pacific/Guadalcanal" },
  { name: "Somalia", timezone: "Africa/Mogadishu" },
  { name: "South Africa", timezone: "Africa/Johannesburg" },
  { name: "South Korea", timezone: "Asia/Seoul" },
  { name: "South Sudan", timezone: "Africa/Juba" },
  { name: "Spain", timezone: "Europe/Madrid" },
  { name: "Sri Lanka", timezone: "Asia/Colombo" },
  { name: "Sudan", timezone: "Africa/Khartoum" },
  { name: "Suriname", timezone: "America/Paramaribo" },
  { name: "Sweden", timezone: "Europe/Stockholm" },
  { name: "Switzerland", timezone: "Europe/Zurich" },
  { name: "Syria", timezone: "Asia/Damascus" },
  { name: "Taiwan", timezone: "Asia/Taipei" },
  { name: "Tajikistan", timezone: "Asia/Dushanbe" },
  { name: "Tanzania", timezone: "Africa/Dar_es_Salaam" },
  { name: "Thailand", timezone: "Asia/Bangkok" },
  { name: "Togo", timezone: "Africa/Lome" },
  { name: "Tonga", timezone: "Pacific/Tongatapu" },
  { name: "Trinidad and Tobago", timezone: "America/Port_of_Spain" },
  { name: "Tunisia", timezone: "Africa/Tunis" },
  { name: "Turkey", timezone: "Europe/Istanbul" },
  { name: "Turkmenistan", timezone: "Asia/Ashgabat" },
  { name: "Tuvalu", timezone: "Pacific/Funafuti" },
  { name: "Uganda", timezone: "Africa/Kampala" },
  { name: "Ukraine", timezone: "Europe/Kiev" },
  { name: "United Arab Emirates", timezone: "Asia/Dubai" },
  { name: "United Kingdom", timezone: "Europe/London" },
  { name: "United States", timezone: "America/New_York" },
  { name: "Uruguay", timezone: "America/Montevideo" },
  { name: "Uzbekistan", timezone: "Asia/Tashkent" },
  { name: "Vanuatu", timezone: "Pacific/Efate" },
  { name: "Vatican City", timezone: "Europe/Vatican" },
  { name: "Venezuela", timezone: "America/Caracas" },
  { name: "Vietnam", timezone: "Asia/Ho_Chi_Minh" },
  { name: "Yemen", timezone: "Asia/Aden" },
  { name: "Zambia", timezone: "Africa/Lusaka" },
  { name: "Zimbabwe", timezone: "Africa/Harare" },
];

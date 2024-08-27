import React, { useEffect, useState } from "react";
import "./GameDescription.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { locationdata } from "../alllocation/AllLocation";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import moment from "moment-timezone";
import { getAllLocations } from "../../redux/actions/locationAction";
import { LoadingComponent } from "../helper/LoadingComponent";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";

function GameDescription() {
  const [filteredData, setFilteredData] = useState([]);

  const [showGD, setShowGD] = useState(true);
  const [showCGD, setShowCGD] = useState(false);

  const settingShowCGD = () => {
    setShowGD(false);
    setShowCGD(true);
  };

  const backHandlerCGD = () => {
    setShowGD(true);
    setShowCGD(false);
  };
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = locations.filter((item) =>
      item.lotlocation.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const selectingLocation = (item) => {
    setSelectedLocation(item);
    settingShowCGD();
    setTitle(item.locationTitle)
    setDescription(item.locationDescription)
   
  };

  const backhandlerSelectedLocation = () => {
    setSelectedLocation(null);
    backHandlerCGD();
  };

  //  FOR CREATING AND UPDATING

  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  // TIMEZON FUNCTIONALITY FOR USER

  // function getUSTimeFromIST(indiaTime) {
  //   // India time is in 24-hour format, e.g., "16:00" for 4:00 PM
  //   const [indiaHours, indiaMinutes] = indiaTime.split(":").map(Number);

  //   // Date object for India time
  //   const indiaDate = new Date();
  //   indiaDate.setHours(indiaHours, indiaMinutes);

  //   // Calculate the time differences for different US time zones
  //   const timeZones = {
  //     EST: -9.5, // 9 hours 30 minutes behind IST
  //     CST: -10.5, // 10 hours 30 minutes behind IST
  //     MST: -11.5, // 11 hours 30 minutes behind IST
  //     PST: -12.5, // 12 hours 30 minutes behind IST
  //   };

  //   // Create an object to store the times in the US time zones
  //   const usTimes = {};

  //   for (const [zone, diff] of Object.entries(timeZones)) {
  //     const usTime = new Date(indiaDate.getTime() + diff * 60 * 60 * 1000);
  //     const hours = usTime.getHours().toString().padStart(2, "0");
  //     const minutes = usTime.getMinutes().toString().padStart(2, "0");

  //     // Formatting the time as "HH:MM"
  //     usTimes[zone] = `${hours}:${minutes}`;
  //   }

  //   return usTimes;
  // }

  // // Example usage:
  // const indiaTime = "16:17"; // 4:00 PM IST
  // const usTimes = getUSTimeFromIST(indiaTime);

  // console.log("in india");
  // console.log("Current Time in india :: 04:20PM");
  // console.log(usTimes);
  // /*
  // Output will be something like:
  // {
  //   EST: "06:30",
  //   CST: "05:30",
  //   MST: "04:30",
  //   PST: "03:30"
  // }
  // */

  // // JSON data of countries and their timezones
  // const countryTimeZones = [
  //   { name: "India", timezone: "Asia/Kolkata" },
  //   { name: "United States", timezone: "America/New_York" },
  //   { name: "Germany", timezone: "Europe/Berlin" },
  //   { name: "Australia", timezone: "Australia/Sydney" },
  //   { name: "Japan", timezone: "Asia/Tokyo" },
  //   // Add all other countries and their timezones here
  // ];

  // // Function to convert IST to user’s timezone
  // function convertISTToUserTime(adminTimeIST, userCountry) {
  //   // Convert admin's hardcoded IST time to a moment object
  //   const istTime = moment.tz(adminTimeIST, "Asia/Kolkata");

  //   // Find the user's timezone from the country
  //   const userCountryData = countryTimeZones.find(
  //     (country) => country.name === userCountry
  //   );

  //   if (userCountryData) {
  //     const userTimeZone = userCountryData.timezone;

  //     // Convert IST time to the user's timezone
  //     const userTime = istTime.clone().tz(userTimeZone);
  //     return userTime.format("YYYY-MM-DD hh:mm A");
  //   } else {
  //     // Handle the case where the user's country is not found
  //     return "Country not found!";
  //   }
  // }

  // // Example usage:
  // const adminSetTimeIST = "2024-08-24 16:00"; // Admin set time in IST

  // const users = [
  //   { name: "User A", country: "India" },
  //   { name: "User B", country: "United States" },
  //   { name: "User C", country: "Germany" },
  // ];

  // // Convert and display time for each user based on their country
  // users.forEach((user) => {
  //   const userLocalTime = convertISTToUserTime(adminSetTimeIST, user.country);
  //   console.log(
  //     `${user.name} in ${user.country} sees the time: ${userLocalTime}`
  //   );
  // });

  // FOR GAME DESCRIPTION

  const { accesstoken } = useSelector((state) => state.user);
  const { loading, locations } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getAllLocations(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(locations); // Update filteredData whenever locations change
  }, [locations]);

  // FOR UPDATING
  const [showProgressBar, setProgressBar] = useState(false);
  const updateGameDescription = async () => {
    if (!titleValue) {
      showErrorToast("Enter Game Title");
    } else if (!discriptionValue) {
      showErrorToast("Enter Game Discription");
    } else {
      setProgressBar(true);

      try {
        const url = `${UrlHelper.UPDATE_LOCATION_API}/${selectedLocation._id}`;
        const { data } = await axios.put(
          url,
          {
            locationTitle: titleValue,
            locationDescription: discriptionValue,
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
        backHandlerCGD();
        setSelectedLocation(null);
        dispatch(getAllLocations(accesstoken));
        setTitle("")
        setDescription("")

        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'AdminDashboard'}],
        // });
      } catch (error) {
        showErrorToast("Something went wrong");
        setProgressBar(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="gameDescriptionContainer">
      {/** SEARCH CONTATINER */}

      {showGD && (
        <>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
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

              <div className="allLocationMainContainer">
                {/** CONTENT */}
                {filteredData.map((item, index) => (
                  <div
                    key={index}
                    className="allContentContainer-al"
                    onClick={() => selectingLocation(item)}
                  >
                    <label className="allContentContainerLocationL">
                      {item.lotlocation}
                    </label>
                    <label className="allContentContainerLimitL">
                      Max {item.maximumRange}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {showCGD && selectedLocation && (
        <div className="allLocationMainContainer">
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div
              className="searchIconContainer"
              onClick={backhandlerSelectedLocation}
            >
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                {selectedLocation.lotlocation}
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
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={updateGameDescription}>
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GameDescription;

const cd = [
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

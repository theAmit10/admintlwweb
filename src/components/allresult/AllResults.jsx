import React, { useEffect, useState } from "react";
import "./AllResults.css";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllLocationWithTimeQuery,
  useGetAllResultWebQuery,
  useGetResultLocMonYearQuery,
} from "../../helper/Networkcall";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { showErrorToast, showWarningToast } from "../helper/showErrorToast";
import SelectYear from "../helper/SelectYear";
import SelectMonth from "../helper/SelectMonth";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import * as XLSX from "xlsx";
import { CiSearch } from "react-icons/ci";
import { FaDownload } from "react-icons/fa6";
import { MdArrowDropDownCircle } from "react-icons/md";

export const AllResults = () => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth(); // 0-based index (0 = January, 11 = December)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showSelectYear, setShowSelectYear] = useState(false);
  const [showSelectMonth, setShowSelectMonth] = useState(false);

  const { accesstoken, user } = useSelector((state) => state.user);

  // GETTING ALL THE LOCATION
  const {
    data: alllocation,
    error: alllocationError,
    isLoading: allocationIsLoading,
  } = useGetAllLocationWithTimeQuery(accesstoken);

  const {
    data: allresult,
    error: allresultError,
    isLoading: allresultIsLoading,
  } = useGetResultLocMonYearQuery({
    accessToken: accesstoken,
    locationid: selectedItem?._id,
    year: selectedYear,
    month: selectedMonth.toLowerCase(),
  });

  useEffect(() => {
    if (!allocationIsLoading && alllocation) {
      setSelectedItem(alllocation?.locationData[0]);
      console.log("Calling allresult");
    }
  }, [allocationIsLoading, alllocation]);

  useEffect(() => {
    if (alllocation) {
      console.log("Calling allresult only:: " + allresultIsLoading);
    }
  }, [allresult, selectedItem, allocationIsLoading]);

  const getAllResultForOtherLocation = (item) => {
    setSelectedItem(item);
  };

  const [showSearch, setShowSearch] = useState(true);
  const [showResult, setShowResult] = useState(true);

  const settingShowResult = () => {
    setShowResult(true);
    setShowSearch(false);
  };

  const backHandlerShowResult = () => {
    setShowResult(false);
    setShowSearch(true);
  };

  const searchResultForMonth = async () => {
    if (!selectedItem) {
      showErrorToast("Please select a location");
    } else if (!selectedMonth) {
      showErrorToast("Please select a month");
    } else if (!selectedYear) {
      showErrorToast("Please select a year");
    } else {
      settingShowResult();
      showWarningToast("Processing");
    }
  };

  const transformData = (data) => {
    if (!data || !data.length) return [];

    // Headers
    const headers = ["Lot Date", ...data.map((item) => item.lottime.lottime)];

    // Create rows
    const rows = data[0].dates.map((dateItem) => {
      const row = [dateItem.lotdate.lotdate];
      data.forEach((item) => {
        const dateData = item.dates.find(
          (d) => d.lotdate.lotdate === dateItem.lotdate.lotdate
        );
        row.push(dateData ? dateData.results[0]?.resultNumber || "N/A" : "N/A");
      });
      return row;
    });

    // Combine headers and rows
    return [headers, ...rows];
  };

  const exportToExcel = (data) => {
    // Transform data
    const transformedData = transformData(data);

    // Log transformed data
    console.log("Transformed data:", transformedData);

    if (transformedData.length === 0) {
      console.error("No data to export");
      return;
    }

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(transformedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    // Generate and download the file
    XLSX.writeFile(workbook, "results.xlsx");
  };

  return (
    <>
      {false && (
        <div className="alContainer">
          {/* TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Result
              </label>
            </div>
          </div>

          {allocationIsLoading ? (
            <LoadingComponent />
          ) : (
            <div className="PLContainerMain">
              <div className="ARLC">
                {alllocation?.locationData?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => getAllResultForOtherLocation(item)}
                    className="ARLocConC"
                  >
                    <div
                      className="PLLLocContainer"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(90deg, #1993FF, #0F5899)"
                            : "linear-gradient(90deg, #7EC630, #3D6017)",
                        borderColor:
                          selectedItem?._id === item._id
                            ? COLORS.blue
                            : "transparent",
                        borderWidth: "2px",
                        borderStyle:
                          selectedItem?._id === item._id ? "solid" : "none",
                      }}
                    >
                      <label className="locLabel">{item.name}</label>
                      <label className="limitLabel">Max {item.limit}</label>
                    </div>
                  </div>
                ))}
              </div>

              {/* ALL RESULT MAIN */}
              <div className="SRMC">
                <label
                  className="stitle"
                  style={{ marginTop: "2rem", cursor: "pointer" }}
                  onClick={() => setShowSelectYear(true)}
                >
                  Select Year
                </label>
                {showSelectYear && (
                  <SelectYear
                    onClose={() => setShowSelectYear(false)}
                    setSelectedYear={setSelectedYear}
                  />
                )}
                <label className="yeartitle">{selectedYear}</label>
                <label
                  className="stitle"
                  style={{ marginTop: "2rem", cursor: "pointer" }}
                  onClick={() => setShowSelectMonth(true)}
                >
                  Select Month
                </label>
                {showSelectMonth && (
                  <SelectMonth
                    onClose={() => setShowSelectMonth(false)}
                    setSelectedMonth={setSelectedMonth}
                  />
                )}

                <label className="yeartitle">{selectedMonth}</label>
              </div>
              <label className="submitTitle" onClick={searchResultForMonth}>
                Search
              </label>
            </div>
          )}
        </div>
      )}

      {showResult && (
        <div className="alContainer">
          {/* TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
        
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Result
              </label>
            </div>
          </div>

          {allocationIsLoading ? (
            <LoadingComponent />
          ) : (
            <div className="PLContainerMain">
              <div className="ARLC">
                {alllocation?.locationData?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => getAllResultForOtherLocation(item)}
                    className="ARLocConC"
                  >
                    <div
                      className="PLLLocContainer"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(90deg, #1993FF, #0F5899)"
                            : "linear-gradient(90deg, #7EC630, #3D6017)",
                        borderColor:
                          selectedItem?._id === item._id
                            ? COLORS.blue
                            : "transparent",
                        borderWidth: "2px",
                        borderStyle:
                          selectedItem?._id === item._id ? "solid" : "none",
                      }}
                    >
                      <label className="locLabel">{item.name}</label>
                      <label className="limitLabel">Max {item.limit}</label>
                    </div>
                  </div>
                ))}
              </div>

              {/* ALL RESULT MAIN */}
              <div className="ARMC">
                {allresultIsLoading ? (
                  <LoadingComponent />
                ) : allresult?.results?.length === 0 ? (
                  <NodataFound title={"No data available"} />
                ) : (
                  <table className="resultTable">
                    <thead>
                      <tr>
                        <th
                          className="lotdate-column"
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            fontSize: "1rem",
                            color: COLORS.white_s,
                          }}
                        >
                          Lot Date
                        </th>
                        {allresult?.results?.map((item, index) => (
                          <th className="time-column" key={index}>
                            {item.lottime.lottime}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allresult?.results?.[0]?.dates?.map(
                        (dateItem, dateIndex) => (
                          <tr key={dateIndex}>
                            <td className="tddatelabel lotdate-column">
                              {dateItem.lotdate.lotdate}
                            </td>
                            {allresult?.results?.map((item, resultIndex) => (
                              <td
                                key={resultIndex}
                                className="result-column tdlabel"
                              >
                                {item.dates[dateIndex]?.results[0]
                                  ?.resultNumber || "N/A"}
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {showSelectYear && (
                <SelectYear
                  onClose={() => setShowSelectYear(false)}
                  setSelectedYear={setSelectedYear}
                />
              )}

              {showSelectMonth && (
                <SelectMonth
                  onClose={() => setShowSelectMonth(false)}
                  setSelectedMonth={setSelectedMonth}
                />
              )}

              <div className="bottomSearcConAllResult">
                <div
                  className="bottomSearcConAllResultM"
                  onClick={() => setShowSelectYear(true)}
                >
                  <label className="msbLabel">{selectedYear}</label>
                  <MdArrowDropDownCircle
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                </div>
                <div
                  className="bottomSearcConAllResultY"
                  onClick={() => setShowSelectMonth(true)}
                >
                  <label className="msbLabel">{selectedMonth}</label>
                  <MdArrowDropDownCircle
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                </div>
                <div
                  className="bottomSearcConAllResultS"
                  onClick={searchResultForMonth}
                >
                  <CiSearch color={COLORS.white_s} size={"2rem"} />
                  <label className="msbLabel">SEARCH</label>
                </div>
                <div
                  className="bottomSearcConAllResultD"
                  onClick={() => exportToExcel(allresult.results)}
                >
                  <FaDownload color={COLORS.white_s} size={"2rem"} />
                  <label className="msbLabel">DOWNLOAD</label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// import React, { useEffect, useState } from "react";
// import "./AllResults.css";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import COLORS from "../../assets/constants/colors";
// import { locationdata } from "../alllocation/AllLocation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useGetAllLocationWithTimeQuery,
//   useGetAllResultWebQuery,
// } from "../../helper/Networkcall";
// import { LoadingComponent } from "../helper/LoadingComponent";
// import { NodataFound } from "../helper/NodataFound";

// export const AllResults = () => {
//   const dispatch = useDispatch();
//   const [selectedItem, setSelectedItem] = useState(null);

//   const { accesstoken, user } = useSelector((state) => state.user);

//   // GETTING ALL THE LOCATION

//   const {
//     data: alllocation,
//     error: alllocationError,
//     isLoading: allocationIsLoading,
//   } = useGetAllLocationWithTimeQuery(accesstoken);

//   const {
//     data: allresult,
//     error: allresultError,
//     isLoading: allresultIsLoading,
//   } = useGetAllResultWebQuery({
//     accessToken: accesstoken,
//     locationid: selectedItem?._id,
//   });

//   useEffect(() => {
//     if (!allocationIsLoading && alllocation) {
//       setSelectedItem(alllocation?.locationData[0]);
//       console.log("Calling allresult");
//       console.log(allocationIsLoading, allresult);
//     }
//   }, [allocationIsLoading, alllocation]);

//   useEffect(() => {
//     if (alllocation) {
//       console.log("Calling allresult only:: " + allresultIsLoading);
//       console.log(allocationIsLoading, allresult);
//     }
//   }, [allresult, selectedItem]);

//   const getAllResultForOtherLocation = (item) => {
//     console.log("GETTING RESULT...");
//     setSelectedItem(item);
//     console.log("allresult :: " + allresultIsLoading);
//     console.log(JSON.stringify(selectedItem));
//   };

//   return (
//     <div className="alContainer">
//       {/** TOP NAVIGATION CONTATINER */}
//       <div className="alCreatLocationTopContainer">
//         <div className="alCreatLocationTopContaineCL">
//           <label className="alCreatLocationTopContainerlabel">All Result</label>
//         </div>
//       </div>
//       {allocationIsLoading ? (
//         <LoadingComponent />
//       ) : (
//         <div className="PLContainerMain">
//           <div className="ARLC">
//             {alllocation?.locationData?.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => getAllResultForOtherLocation(item)}
//                 className="ARLocConC"
//               >
//                 <div
//                   className="PLLLocContainer"
//                   style={{
//                     background:
//                       index % 2 === 0
//                         ? "linear-gradient(90deg, #1993FF, #0F5899)"
//                         : "linear-gradient(90deg, #7EC630, #3D6017)",
//                     borderColor:
//                       selectedItem?._id === item._id
//                         ? COLORS.blue
//                         : "transparent", // Use transparent for no border
//                     borderWidth: "2px",
//                     borderStyle:
//                       selectedItem?._id === item._id ? "solid" : "none", // Apply border style conditionally
//                   }}
//                 >
//                   <label className="locLabel">{item.name}</label>
//                   <label className="limitLabel">Max {item.limit}</label>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/** ALL RESULT MAIN */}
//           <div className="ARMC">
//             {allresultIsLoading ? (
//               <LoadingComponent />
//             ) : allresult?.results?.length === 0 ? (
//               <NodataFound title={"No data available"} />
//             ) : (
//               allresult?.results.map((item, index) => (
//                 <div className="ARMCContent" key={index}>
//                   <div className="ARMCContentTC">
//                     <label className="pdR"> {item.lottime.lottime}</label>
//                   </div>
//                   <div className="ARMCContentDC">
//                     {item.dates.map((dateitem, dateindex) => (
//                       <div className="ARMCContentDConC" key={dateindex}>
//                         <div className="ARMCContentDConCDate">
//                           <label className="pdR">
//                             {dateitem.lotdate.lotdate}
//                           </label>
//                         </div>
//                         <div className="ARMCContentDConCResult">
//                           <label className="pdR">
//                             {dateitem.results[0].resultNumber}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// .alContainer{
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   background: linear-gradient(180deg, #0162AF, #011833);
//   border-radius: 1rem;
// }

// .ARLC{
//   height: 7rem;
//   width: 80vw;
//  background-color: var(--background);
//   margin-left: 2rem;
//   margin-right: 2rem;
//   border-radius: 1rem;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   overflow-x: scroll;
// }

// .ARLocConC {
//   min-width: 30rem; /* Fixed width for the left container */
//   height: 100%;

// }

// .ARMC{
//   background: linear-gradient(180deg, #0162AF, #011833);
//   width: 80vw;
//   height: 60vh;
//   margin-left: 2rem;
//   margin-right: 2rem;
//   overflow-x: scroll;
//   overflow-y: scroll;
//   display: flex;
//   flex-direction: row;

// }

// .ARMCContent{
//   width: 20rem;
//   height: 100%;

//   display: flex;
//   flex-direction: column;
// }

// .ARMCContentTC{
//   height: 5rem;
//   background-color: var(--background);
//   margin: 1rem;
//   border-radius: 1rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .ARMCContentDC{
//   flex: 1;

//   display: flex;
//   flex-direction: column;
//   position: relative;
//   gap: 0.1px;
//   height: 40vh;
//   overflow-y: scroll;

// }
// .ARMCContentDConC{
//   min-height: 5rem;
//   display: flex;
//   flex-direction: row;
//   margin-left: 1rem;
//   margin-right: 1rem;
//   margin-bottom: 0.2rem;
//   gap: 2px;

// }

// .ARMCContentDConCDate{
//   width: 15rem;
//   background-color:  var(--background);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-top-left-radius: 1rem;
//   border-bottom-left-radius: 1rem;
// }

// .ARMCContentDConCResult{
//   width: 5rem;
//   background-color: var(--background);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-top-right-radius: 1rem;
//   border-bottom-right-radius: 1rem;
// }

const resultdata = {
  success: true,
  results: [
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ef71a830e5281e70233",
      lottime: {
        _id: "66bf4ef71a830e5281e70233",
        lottime: "09:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f441a830e5281e702ad",
            lotdate: "16-08-2024",
            lottime: "66bf4ef71a830e5281e70233",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "01",
              lotdate: {
                _id: "66bf4f441a830e5281e702ad",
                lotdate: "16-08-2024",
                lottime: "66bf4ef71a830e5281e70233",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ef71a830e5281e70233",
                lottime: "09:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f4d1a830e5281e702c0",
            lotdate: "17-08-2024",
            lottime: "66bf4ef71a830e5281e70233",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f4d1a830e5281e702c0",
                lotdate: "17-08-2024",
                lottime: "66bf4ef71a830e5281e70233",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ef71a830e5281e70233",
                lottime: "09:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4f011a830e5281e7023c",
      lottime: {
        _id: "66bf4f011a830e5281e7023c",
        lottime: "10:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f591a830e5281e702dd",
            lotdate: "16-08-2024",
            lottime: "66bf4f011a830e5281e7023c",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f591a830e5281e702dd",
                lotdate: "16-08-2024",
                lottime: "66bf4f011a830e5281e7023c",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4f011a830e5281e7023c",
                lottime: "10:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f631a830e5281e702f0",
            lotdate: "17-08-2024",
            lottime: "66bf4f011a830e5281e7023c",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f631a830e5281e702f0",
                lotdate: "17-08-2024",
                lottime: "66bf4f011a830e5281e7023c",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4f011a830e5281e7023c",
                lottime: "10:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4ee01a830e5281e70221",
      lottime: {
        _id: "66bf4ee01a830e5281e70221",
        lottime: "07:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f1a1a830e5281e70260",
            lotdate: "17-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "04",
              lotdate: {
                _id: "66bf4f1a1a830e5281e70260",
                lotdate: "17-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f0e1a830e5281e7024d",
            lotdate: "16-08-2024",
            lottime: "66bf4ee01a830e5281e70221",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "02",
              lotdate: {
                _id: "66bf4f0e1a830e5281e7024d",
                lotdate: "16-08-2024",
                lottime: "66bf4ee01a830e5281e70221",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4ee01a830e5281e70221",
                lottime: "07:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
    {
      _id: "66bf4eec1a830e5281e7022a",
      lottime: {
        _id: "66bf4eec1a830e5281e7022a",
        lottime: "08:00 AM",
        lotlocation: "66bf4ecb1a830e5281e70214",
        createdAt: "2024-08-16T12:37:48.424Z",
        __v: 0,
      },
      dates: [
        {
          lotdate: {
            _id: "66bf4f321a830e5281e70290",
            lotdate: "17-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "05",
              lotdate: {
                _id: "66bf4f321a830e5281e70290",
                lotdate: "17-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
        {
          lotdate: {
            _id: "66bf4f261a830e5281e7027d",
            lotdate: "16-08-2024",
            lottime: "66bf4eec1a830e5281e7022a",
            createdAt: "2024-08-16T12:37:48.423Z",
            __v: 0,
          },
          lotlocation: {
            _id: "66bf4ecb1a830e5281e70214",
            lotlocation: "Japan",
            locationTitle: "",
            locationDescription: "",
            maximumRange: "5-5x",
            maximumNumber: "5",
            maximumReturn: "5x",
            automation: "manual",
            createdAt: "2024-08-16T12:37:48.425Z",
            __v: 0,
          },
          results: [
            {
              resultNumber: "03",
              lotdate: {
                _id: "66bf4f261a830e5281e7027d",
                lotdate: "16-08-2024",
                lottime: "66bf4eec1a830e5281e7022a",
                createdAt: "2024-08-16T12:37:48.423Z",
                __v: 0,
              },
              lottime: {
                _id: "66bf4eec1a830e5281e7022a",
                lottime: "08:00 AM",
                lotlocation: "66bf4ecb1a830e5281e70214",
                createdAt: "2024-08-16T12:37:48.424Z",
                __v: 0,
              },
              lotlocation: {
                _id: "66bf4ecb1a830e5281e70214",
                lotlocation: "Japan",
                locationTitle: "",
                locationDescription: "",
                maximumRange: "5-5x",
                maximumNumber: "5",
                maximumReturn: "5x",
                automation: "manual",
                createdAt: "2024-08-16T12:37:48.425Z",
                __v: 0,
              },
              nextresulttime: "07:00 AM",
              createdAt: "2024-08-16T12:37:48.422Z",
            },
          ],
          createdAt: "2024-08-16T12:37:48.422Z",
        },
      ],
      createdAt: "2024-08-16T12:37:48.422Z",
    },
  ],
};

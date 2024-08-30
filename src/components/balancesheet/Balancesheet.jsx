import React, { useEffect } from "react";
import "./Balancesheet.css";
import COLORS from "../../assets/constants/colors";
import { useSelector } from "react-redux";
import { locationdata } from "../alllocation/AllLocation";
import { useGetAllBalanceQuery } from "../../helper/Networkcall";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import moment from "moment";

function Balancesheet() {
  const { accesstoken } = useSelector((state) => state.user);
  const { data, isLoading, error, refetch } =
    useGetAllBalanceQuery(accesstoken);

  console.log("Balancesheet ::" + JSON.stringify(data));

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="gameDescriptionContainer">
      {isLoading ? (
        <LoadingComponent />
      ) : data?.balancesheet?.length === 0 ? (
        <div className="allLocationMainContainer-bs">
          {/** CONTENT */}
          <NodataFound title={"No data available"} />
        </div>
      ) : (
        <div className="allLocationMainContainer-bs">
          {/** CONTENT */}
          <div
            className="allContentContainer-bs"
            style={{ backgroundColor: COLORS.green }}
          >
            <div
              className="wContentContainerMain"
              style={{ backgroundColor: COLORS.green }}
            >
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Exchange</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Wallet</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Created At</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Withdrawal Bal</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Game Bal</label>
              </div>
              <div className="dHeaderContainerLabelContainer">
                <label className="dHeaderContainerLabel">Total Bal</label>
              </div>
            </div>
          </div>

          {data?.balancesheet?.map((item, index) => (
            <div key={index} className="allContentContainer-bs">
              <div className="bContentContainerMain">
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">
                    {item?.paymentProcessType === "Credit" ? "+" : "-"}{" "}
                    {item?.amount} INR
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">
                    {item?.activityType === "Winning"
                      ? "Withdrawal wallet" 
                      : "Game Wallet"}
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">
                    {formatDateTime(item?.createdAt)}
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">
                    {" "}
                    {item?.withdrawalbalance} INR
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">
                    {" "}
                    {item?.gamebalance} INR
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainer">
                  <label className="dHeaderContainerLabel">
                    {item?.totalbalance} INR
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Balancesheet;

import React, { useEffect, useState } from "react";
import "./AllSubAdmin.css";
import { locationdata } from "../alllocation/AllLocation";
import { CiSearch } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import images from "../../assets/constants/images";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllSubAdminQuery } from "../../helper/Networkcall";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { loadProfile, loadSingleUser } from "../../redux/actions/userAction";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";

export const AllSubAdmin = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = allusers.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.userId?.toString() === text
    );
    setFilteredData(filtered);
  };

  const [showSA, setShowSA] = useState(true);
  const [selectItem, setSelectItem] = useState("");
  const [showEditSA, setShowEditSA] = useState(false);

  const settingEditSA = (item) => {
    setShowSA(false);
    setShowEditSA(true);
    setSelectItem(item);

    dispatch(loadSingleUser(accesstoken, item._id));
  };

  const backHanndler = () => {
    setShowSA(true);
    setShowEditSA(false);
    setSelectItem("");
  };

  // FOR ALL SUB ADMIN

  const dispatch = useDispatch();
  const { accesstoken, singleuser, loadingSingleUser } = useSelector(
    (state) => state.user
  );

  const {
    isLoading: loadingAll,
    data: allusers,
    isError,
    refetch,
  } = useGetAllSubAdminQuery(accesstoken);

  useEffect(() => {
    setFilteredData(allusers?.users); // Update filteredData whenever locations change
  }, [allusers]);

  // FOR UPDATING ROLE

  useEffect(() => {
    if (singleuser && !loadingSingleUser) {
      setSelectedRole(singleuser.role);
    }
  }, [singleuser, loadingSingleUser]);

  const [loadingUpdateRole, setLoadingUpdateRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const settingRoleForSubAdmin = (role) => {
    setSelectedRole(role);
    updateProfileRoleHandler(role);
  };

  // FOR ROLE
  const updateProfileRoleHandler = async (role) => {
    if (!role) {
      showErrorToast("Please select a role");
    } else {
      setLoadingUpdateRole(true);

      try {
        const { data } = await axios.put(
          UrlHelper.UPDATE_SUBADMIN_ROLE_API,
          {
            id: selectItem._id,
            role: role,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        refetch();

        showSuccessToast(data.message);
        backHanndler();
        setLoadingUpdateRole(false);
      } catch (error) {
        setLoadingUpdateRole(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="asdcontainer">
      {/** TOP NAVIGATION CONTATINER */}
      {showSA &&
        (loadingAll ? (
          <LoadingComponent />
        ) : filteredData.length === 0 ? (
          <NodataFound title={"No data available"} />
        ) : (
          <>
            <div className="alCreatLocationTopContainer">
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  All Sub Admin
                </label>
              </div>
            </div>

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

            <div className="asdMainContainer">
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="allContentContainer-al"
                  onClick={() => settingEditSA(item)}
                >
                  <label className="allContentContainerLimitL">
                    User ID : {item.userId}
                  </label>
                  <label className="allContentContainerLocationL">
                    {item.name}
                  </label>

                  <div className="userimage">
                    {item.avatar?.url ? (
                      <img
                        src={`${serverName}/uploads/${item.avatar.url}`}
                        alt="Profile Picture"
                        className="userimg"
                      />
                    ) : (
                      <img
                        src={images.user}
                        alt="Profile Picture"
                        className="userimg"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}

      {showEditSA &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
          <div className="asdMainContainer">
            <div className="alCreatLocationTopContainer">
              <div className="searchIconContainer" onClick={backHanndler}>
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  Edit Sub Admin
                </label>
              </div>
            </div>

            <div
              className="alCreatLocationTopContainer"
              style={{ minHeight: "4rem" }}
            >
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  Current Role : {singleuser.role}
                </label>
              </div>
            </div>

            {loadingUpdateRole ? (
              <LoadingComponent />
            ) : (
              <div className="asdccontainer">
                <label className="alCreatLocationTopContainerlabel">
                  Select Role
                </label>

                <div
                  className="roleContainer"
                  onClick={() => settingRoleForSubAdmin("admin")}
                >
                  <label className="alCreatLocationTopContainerlabel">
                    Admin
                  </label>
                </div>

                <div
                  className="roleContainer"
                  onClick={() => settingRoleForSubAdmin("subadmin")}
                >
                  <label className="alCreatLocationTopContainerlabel">
                    Sub Admin
                  </label>
                </div>

                <div
                  className="roleContainer"
                  onClick={() => settingRoleForSubAdmin("user")}
                >
                  <label className="alCreatLocationTopContainerlabel">
                    User
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

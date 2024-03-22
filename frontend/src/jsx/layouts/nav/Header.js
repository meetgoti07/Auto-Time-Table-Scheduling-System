import React, { useContext,useEffect, useState } from "react";

import { Link } from "react-router-dom";
/// Scroll

import { Dropdown } from "react-bootstrap";
import LogoutPage from './Logout';
/// Image
import profile from "../../../images/profile/17.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { ThemeContext } from "../../../context/ThemeContext";





const Header = ({ onNote }) => {

  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
      ? filterName.filter((f) => f !== "ui")
      : filterName.includes("uc")
        ? filterName.filter((f) => f !== "uc")
        : filterName.includes("basic")
          ? filterName.filter((f) => f !== "basic")
          : filterName.includes("jquery")
            ? filterName.filter((f) => f !== "jquery")
            : filterName.includes("table")
              ? filterName.filter((f) => f !== "table")
              : filterName.includes("page")
                ? filterName.filter((f) => f !== "page")
                : filterName.includes("email")
                  ? filterName.filter((f) => f !== "email")
                  : filterName.includes("ecom")
                    ? filterName.filter((f) => f !== "ecom")
                    : filterName.includes("chart")
                      ? filterName.filter((f) => f !== "chart")
                      : filterName.includes("editor")
                        ? filterName.filter((f) => f !== "editor")
                        : filterName;

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(storedUserDetails);
  }, []);


  const { background, changeBackground } = useContext(ThemeContext);
  function ChangeMode() {
    if (background.value === "light") {
      changeBackground({ value: "dark", label: 'Dark' })
    } else {
      changeBackground({ value: "light", label: 'Light' })
    }
  }
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
                {finalName.join(" ").length === 0
                  ? "Dashboard"
                  : finalName.join(" ")}
              </div>
            </div>

            <ul className="navbar-nav header-right">

              <li className="nav-item dropdown notification_dropdown"
                onClick={ChangeMode}
              >
                <Link to={"#"} className={`nav-link bell dz-theme-mode ${background.value === "dark" ? 'active' : ''}`}
                >
                  <i id="icon-light" className="fas fa-sun"></i>
                  <i id="icon-dark" className="fas fa-moon"></i>
                </Link>
              </li>

              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  className="nav-link i-false"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  <div className="header-info m-3">
                    <span className="text-black">
                      <strong>{userDetails.firstname} {userDetails.lastname}</strong>
                    </span>
                    <p className="fs-12 mb-0">Username: {userDetails.username}</p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align="right" className="mt-2">
                  
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Mymenu extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: true,
      profile: "",
      CompanyDetails: [],
      Logo: ""
    };
  }
  fetchCompanyDetails = () => {
    fetch("/api/configurations/" + 1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ CompanyDetails: data });
          this.setState({ Logo: data[0].Logo });
        } else {
          // swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        // swal("Oops!", err.message, "error");
      });
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token == null) {
      localStorage.clear();
      return (window.location = "/#/Logout");
    } else {
      fetch("/api/ValidateTokenExpiry", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(response =>
          response.json().then(data => {
            if (data.success) {
              this.fetchCompanyDetails();
            } else {
              localStorage.clear();
              return (window.location = "/#/Logout");
            }
          })
        )
        .catch(err => {
          localStorage.clear();
          return (window.location = "/#/Logout");
        });
    }
  }
  render() {
    let photostyle = {
      height: 140,
      width: 200,
      background: "#a7b1c2",
      margin: 10,
      "border-radius": 2
    };
    let UserCategory = localStorage.getItem("UserCategory");
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="">
              <div className="dropdown profile-element">
                <img
                  src={
                    process.env.REACT_APP_BASE_URL +
                    "/profilepics/" +
                    this.state.Logo
                  }
                  style={photostyle}
                />
              </div>
            </li>

            <li className="active">
              <a href="">
                <i className="fa fa-th-large" />
                <span className="nav-label active">My menu</span>
                <span className="fa arrow" />
              </a>
              <ul className="nav nav-second-level collapse">
                <li className="active">
                  <Link to="/ApplicantProfile">
                    {" "}
                    <i className="fa fa-tasks" />
                    My Details
                  </Link>
                </li>
                {UserCategory === "Applicant" ? (
                  <li>
                    <Link to="/Applications">
                      {" "}
                      <i className="fa fa-tasks" />
                      Applications
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/PEApplications">
                      <i className="fa fa-tasks" />
                      Applications
                    </Link>
                  </li>
                )}
                {UserCategory === "Applicant" ? (
                  <li>
                    <Link to="/additionalsubmissions">
                      <i className="fa fa-tasks" />
                      Additional submissions
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/PEadditionalsubmissions">
                      <i className="fa fa-tasks" />
                      Additional submissions
                    </Link>
                  </li>
                )}
                {UserCategory === "PE" ? (
                  <li>
                    <Link to="/MyResponse">
                      <i className="fa fa-tasks" />
                      Response
                    </Link>
                  </li>
                ) : null}
                {UserCategory === "Applicant" ? (
                  <li>
                    <Link to="/CaseWithdrawal">
                      <i className="fa fa-tasks" />
                      Case Withdrawal
                    </Link>
                  </li>
                ) : null}
                {UserCategory === "Applicant" ? (
                  <li>
                    <Link to="/adjournment">
                      <i className="fa fa-tasks" />
                      Case adjournment
                    </Link>
                  </li>
                ) : null}

                <li>
                  <Link to="/Decision">
                    <i className="fa fa-tasks" />
                    Decision
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Mymenu;

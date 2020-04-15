import React, { Component } from "react";

import { Link } from "react-router-dom";
class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: true,
      privilages: [],
      showMenuRecruitment: false,
      showMenuAdmin: true,
      showMenuParameteres: false,
      showMenuFeesSettings: false,
      showMenuReports: false,
      CompanyDetails: [],
      Logo: ""
    };
    this.ProtectRoute = this.ProtectRoute.bind(this);
    this.checkPrivilage = this.checkPrivilage.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }
  showMenu = (Module, event) => {
    event.preventDefault();
    if (Module === "System Administration") {
      this.setState({ showMenuAdmin: !this.state.showMenuAdmin });
      if (this.state.showMenuRecruitment) {
        this.setState({
          showMenuRecruitment: !this.state.showMenuRecruitment
        });
      }
           if (this.state.showMenuParameteres) {
        this.setState({
          showMenuParameteres: !this.state.showMenuParameteres
        });
      }
           if (this.state.showMenuReports) {
        this.setState({
          showMenuReports: !this.state.showMenuReports
        });
      }
    } else if (Module === "Fees Settings") {
      this.setState({ showMenuFeesSettings: !this.state.showMenuFeesSettings });
    } else if (Module === "Recruitment") {
      this.setState({
        showMenuRecruitment: !this.state.showMenuRecruitment
      });
     
      if (this.state.showMenuParameteres) {
        this.setState({
          showMenuParameteres: !this.state.showMenuParameteres
        });
      }
      if (this.state.showMenuAdmin) {
        this.setState({
          showMenuAdmin: !this.state.showMenuAdmin
        });
      }
      if (this.state.showMenuReports) {
        this.setState({
          showMenuReports: !this.state.showMenuReports
        });
      }
    }  else if (Module === "Reports") {
      this.setState({
        showMenuReports: !this.state.showMenuReports
      });
      if (this.state.showMenuRecruitment) {
        this.setState({
          showMenuRecruitment: !this.state.showMenuRecruitment
        });
      }
      if (this.state.showMenuParameteres) {
        this.setState({
          showMenuParameteres: !this.state.showMenuParameteres
        });
      }
      if (this.state.showMenuAdmin) {
        this.setState({ showMenuAdmin: !this.state.showMenuAdmin });
      }
    } else if (Module === "System parameteres") {
      this.setState({
        showMenuParameteres: !this.state.showMenuParameteres
      });
      if (this.state.showMenuRecruitment) {
        this.setState({
          showMenuRecruitment: !this.state.showMenuRecruitment
        });
      }
      if (this.state.showMenuAdmin) {
        this.setState({
          showMenuAdmin: !this.state.showMenuAdmin
        });
      }
      if (this.state.showMenuReports) {
        this.setState({
          showMenuReports: !this.state.showMenuReports
        });
      }
    } 
  };

  ProtectRoute() {
    fetch("/api/UserAccess", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ privilages: data });
        } else {
          localStorage.clear();
          return (window.location = "/#/Logout");
        }
      })
      .catch(err => {
        this.setState({ loading: false, redirect: true });
      });
    //end
  }

  checkPrivilage(key, value) {
    let array = [...this.state.privilages];
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
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
              this.ProtectRoute();
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
  validaterole = (rolename, action) => {
    let array = [...this.state.privilages];
    let AuditTrailsObj = array.find(obj => obj.RoleName === rolename);
    if (AuditTrailsObj) {
      if (action === "AddNew") {
        if (AuditTrailsObj.AddNew) {
          return true;
        } else {
          return false;
        }
      } else if (action === "View") {
        if (AuditTrailsObj.View) {
          return true;
        } else {
          return false;
        }
      } else if (action === "Edit") {
        if (AuditTrailsObj.Edit) {
          return true;
        } else {
          return false;
        }
      } else if (action === "Export") {
        if (AuditTrailsObj.Export) {
          return true;
        } else {
          return false;
        }
      } else if (action == "Remove") {
        if (AuditTrailsObj.Remove) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  ViewFile = (k, e) => {
    let filepath =
      process.env.REACT_APP_BASE_URL + "/profilepics/ARCMS-UserGuide.pdf";
    window.open(filepath);
    //this.setState({ openFileViewer: true });
  };
  render() {
    let photostyle = {
      height: 70,
      width: 205,
      background: "#a7b1c2",
      margin: 10,
      "border-radius": 2
    };

    let MenuStyle = {
      color: "#E7E7E7",
      cursor: "pointer",
      padding: "14px 20px 14px 25px",
      display: "block",
      "font-weight": 600,
      "font-size": 14
      // "font-family": `"Helvetica Neue", Helvetica, Arial, sans - serif`
    };
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="">
              <div className="dropdown profile-element">
                <img
                  src={ require("./profilepics/download.png") }
                  style={photostyle}
                />
              </div>
            </li>
            <DashBoards validaterole={this.validaterole} />
            <SystemAdmin
              validaterole={this.validaterole}
              showMenu={this.showMenu}
              showmenuvalue={this.state.showMenuAdmin}
              MenuStyle={MenuStyle}
            />
            <Parameteres
              validaterole={this.validaterole}
              showMenu={this.showMenu}
              showmenuvalue={this.state.showMenuParameteres}
              MenuStyle={MenuStyle}
            />

            <Recruitment
              validaterole={this.validaterole}
              showMenu={this.showMenu}
              showmenuvalue={this.state.showMenuRecruitment}
              MenuStyle={MenuStyle}
            />
            {/* <Decision
              validaterole={this.validaterole}
              showMenu={this.showMenu}
              showmenuvalue={this.state.showMenuDecision}
              MenuStyle={MenuStyle}
            />
            <Boardmanagement
              validaterole={this.validaterole}
              showMenu={this.showMenu}
              showmenuvalue={this.state.showMenuBoardmanagement}
              MenuStyle={MenuStyle}
            /> */}
            <Reports
              validaterole={this.validaterole}
              showMenu={this.showMenu}
              showmenuvalue={this.state.showMenuReports}
              MenuStyle={MenuStyle}
            />
            
          </ul>
        </div>
      </nav>
    );
  }
}
const Reports = props => {
  if (props.validaterole("Reports", "View")) {
    return (
      <li className="">
        <li onClick={e => props.showMenu("Reports", e)} style={props.MenuStyle}>
          <i className="fa fa-cogs" />{" "}
          <span className="nav-label">Reports</span>
        </li>
        {props.showmenuvalue ? (
          <ul className="nav nav-second-level">
            {props.validaterole("Monthly", "View") ? (
              <li>
                <Link to="/MonthlyRegistration">
                  <i className="fa fa-tasks" />
                  Monthly Reports
                </Link>
              </li>
            ) : null}
             {props.validaterole("Custom Reports", "View") ? (
              <li>
                <Link to="/CustomReport">
                  <i className="fa fa-user-plus" />
                Custom reports
                </Link>
              </li>
            ) : null}
            
            {props.validaterole("Applicants Profile", "View") ? (
              <li>
                <Link to="/ApplicantsProfile">
                  <i className="fa fa-user-plus" />
                  Applicants Profile
                </Link>
              </li>
            ) : null}
             {props.validaterole("Total Cost", "View") ? (
              <li>
                <Link to="/Cost">
                  <i className="fa fa-user-plus" />
                  Total Cost
                </Link>
              </li>
            ) : null}
            {props.validaterole("Fail Applicants", "View") ? (
              <li>
                <Link to="/AdminDashboard">
                  <i className="fa fa-user-plus" />
                  Fail Applicant
                </Link>
              </li>
            ) : null}
        
          </ul>
        ) : null}
      </li>
    );
  } else {
    return <div />;
  }
};


const Recruitment = props => {
  if (props.validaterole("Recruitment", "View")) {
    return (
      <li className="">
        <li
          onClick={e => props.showMenu("Recruitment", e)}
          style={props.MenuStyle}
        >
          <i className="fa fa-cogs" />{" "}
          <span className="nav-label">Recruitment</span>
        </li>
        {props.showmenuvalue ? (
          <ul className="nav nav-second-level">
            {props.validaterole("Registration", "View") ? (
              <li>
                <Link to="/Registration">
                  <i className="fa fa-tasks" />
                 Registration
                </Link>
              </li>
            ) : null}
            {props.validaterole("Minor Medical", "View") ? (
              <li>
                <Link to="/Minor">
                  <i className="fa fa-tasks" />
                  Minor Medical
                </Link>
              </li>
            ) : null}
                   {props.validaterole("DCI Clearance", "View") ? (
              <li>
                <Link to="/DCI">
                  <i className="fa fa-tasks" />
                  DCI Clearance
                </Link>
              </li>
            ) : null}
            {props.validaterole("Passport processing", "View") ? (
              <li>
                <Link to="/Passport">
                  <i className="fa fa-tasks" />
                  Passport processing 
                </Link>
              </li>
            ) : null}
            {props.validaterole("Training", "View") ? (
              <li>
                <Link to="/Training">
                  <i className="fa fa-tasks" />
                  Training
                </Link>
              </li>
            ) : null}
             {props.validaterole("Major Medical", "View") ? (
              <li>
                <Link to="/Major">
                  <i className="fa fa-tasks" />
                Major medical
                </Link>
              </li>
            ) : null}
              {props.validaterole("Contract Processing", "View") ? (
              <li>
                <Link to="/Contract">
                  <i className="fa fa-tasks" />
                  Contract Processing
                </Link>
              </li>
            ) : null}
               {props.validaterole("NEAA", "View") ? (
              <li>
                <Link to="/NEAA">
                  <i className="fa fa-tasks" />
                  NEA
                </Link>
              </li>
            ) : null}
             {props.validaterole("Visa Prcoessing", "View") ? (
              <li>
                <Link to="/Visa">
                  <i className="fa fa-tasks" />
                  Visa Processing
                </Link>
              </li>
            ) : null}
               {props.validaterole("Attestation", "View") ? (
              <li>
                <Link to="/Attestation">
                  <i className="fa fa-tasks" />
                  Attestation
                </Link>
              </li>
            ) : null}
              
               {props.validaterole("Ticketing", "View") ? (
              <li>
                <Link to="/Ticketing">
                  <i className="fa fa-tasks" />
                  Ticketing
                </Link>
              </li>
            ) : null}
               {props.validaterole("Final Medical", "View") ? (
              <li>
                <Link to="/Final">
                  <i className="fa fa-tasks" />
                  Final Medical
                </Link>
              </li>
            ) : null}
              {props.validaterole("Travelling", "View") ? (
              <li>
                <Link to="/Travelling">
                  <i className="fa fa-tasks" />
                  Travelling
                </Link>
              </li>
            ) : null}
          </ul>
        ) : null}
      </li>
    );
  } else {
    return <div />;
  }
};
const SystemAdmin = props => {
  if (props.validaterole("System Administration", "View")) {
    return (
      <li>
        <li
          className=""
          onClick={e => props.showMenu("System Administration", e)}
          style={props.MenuStyle}
        >
          <i className="fa fa-cogs" />{" "}
          <span className="nav-label">System Administration</span>
        </li>
        {props.showmenuvalue ? (
          <ul className="nav nav-second-level">
            {props.validaterole("System Users", "View") ? (
              <li>
                <Link to="/Users">
                  <i className="fa fa-user-plus " />
                  System users
                </Link>
              </li>
            ) : null}
             {/* {props.validaterole("System Configurations", "View") ? (
              <li>
                <Link to="/configurations">
                  <i className="fa fa-user-plus " />
                  Configurations
                </Link>
              </li>
            ) : null} */}
            {props.validaterole("Roles", "View") ? (
              <li>
                <Link to="/Roles">
                  <i className="fa fa-user-plus " />
                  Roles
                </Link>
              </li>
            ) : null}
            {props.validaterole("Security Groups", "View") ? (
              <li>
                <Link to="/Usergroups">
                  <i className="fa fa-user-plus " />
                  Security Groups
                </Link>
              </li>
            ) : null}
            {props.validaterole("Audit Trails", "View") ? (
              <li>
                <Link to="/Auditrails">
                  <i className="fa fa-user-plus " />
                  Auditrails
                </Link>
              </li>
            ) : null}
          </ul>
        ) : null}
      </li>
    );
  } else {
    return <div />;
  }
};

const DashBoards = props => {
  if (props.validaterole("Dashboard", "View")) {
    return (
      <li className="">
        <Link to="/Home">
          <i className="fa fa-dashboard" />{" "}
          <span className="nav-label">DashBoard</span>
        </Link>
      </li>
    );
  } else {
    return <div />;
  }
};
const Parameteres = props => {
  if (props.validaterole("System parameteres", "View")) {
    return (
      <li className="">
        <li
          onClick={e => props.showMenu("System parameteres", e)}
          style={props.MenuStyle}
        >
          <i className="fa fa-cogs" />{" "}
          <span className="nav-label">System Parameters</span>
        </li>
        {props.showmenuvalue ? (
          <ul className="nav nav-second-level">
            {props.validaterole("Facility", "View") ? (
              <li>
                <Link to="/Facility">
                  <i className="fa fa-user-plus " />
                  Medical Facility
                </Link>
              </li>
            ) : null}
              {props.validaterole("County", "View") ? (
              <li>
                <Link to="/Counties">
                  <i className="fa fa-money" />
                  Counties
                </Link>
              </li>
            ) : null}
            {props.validaterole("Country", "View") ? (
              <li>
                <Link to="/Countries">
                  <i className="fa fa-money" />
                  Countries
                </Link>
              </li>
            ) : null}
            {/* {props.validaterole("SMS Details", "View") ? (
              <li>
                <Link to="/SMSdetails">
                  <i className="fa fa-user-plus " />
                  SMS Details
                </Link>
              </li>
            ) : null} */}
            {/* {props.validaterole("SMTP Details", "View") ? (
              <li>
                <Link to="/smtpdetails">
                  <i className="fa fa-folder" />
                  SMTP Details
                </Link>
              </li>
            ) : null} */}
          </ul>
        ) : null}
      </li>
    );
  } else {
    return <div />;
  }
};
export default SideBar;

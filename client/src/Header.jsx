import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
const userphoto = localStorage.getItem("UserPhoto");

class Header extends Component {
  constructor() {
    super();
    this.state = {
      ComapnyName: "",
      LoogedinCompay: ""
    };
    this.logout = this.logout.bind(this);
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
          this.setState({ ComapnyName: data[0].Name });
        } else {
          // swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        // swal("Oops!", err.message, "error");
      });
  };
  fetchUsersCompanyDetails = () => {
    fetch(
      "/api/configurations/" +
        localStorage.getItem("UserName") +
        "/" +
        localStorage.getItem("UserCategory"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          localStorage.setItem("LoogedinCompay", data[0].Name);

          this.setState({ LoogedinCompay: data[0].Name });
        } else {
          // swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        // swal("Oops!", err.message, "error");
      });
  };
  componentDidMount() {
    // this.fetchCompanyDetails();
    // this.fetchUsersCompanyDetails();
  }
  logout() {
    localStorage.clear();

    return <Redirect to="/Login" push />;
  }
  render() {
    const pStyle = {
      color: "white",
      float: "left",
      fontSize: "25px",
      textAlign: "center"
    };
    const pStyle1 = {
      color: "#F7DC6F",
      float: "left",
      fontSize: "20px",
      "margin-left": 70,
      textAlign: "Center"
    };
    const pStyle3 = {
      color: "white",
      float: "left",
      fontSize: "18px",
      "margin-left": 170,
      textAlign: "Center"
    };
    const pStyle2 = {
      color: "white",

      fontSize: "15px",
      "margin-left": 3
    };
    let profile = userphoto;
    if (!userphoto) {
      profile = "default.png";
    }
    let photostyle = {
      height: 40,
      width: 40
    };
    let photostyle1 = {
      height: 90,
      width: 90
    };
    let style2 = {
      "text-align": "center"
      //"background-color": "#3c8dbc"
    };
    let dropdownmenu = {
      width: "280px",
      background: "#f3f3f4",
      "border- bottom - right - radius": "4px",
      " border - bottom - left - radius": "4px"
    };
   let margin={
    "margin-bottom": "0px",
   };
    return (
      <div id="page-wrapper" className="gray-bg">
       <div class="row border-bottom">
        <nav class="navbar navbar-static-top gray-bg" role="navigation"style={margin}>
            <div className="navbar-header">
              <a className="navbar-minimalize minimalize-styl-2 btn btn-primary">
                <i className="fa fa-bars" />{" "}
              </a>
            </div>
            <ul className="nav navbar-top-links navbar-centre">
              <li>
                <span className="m-r-sm text-muted welcome-message">
                  <b style={pStyle}>{this.state.ComapnyName}</b>
                  <br />
                  <b style={pStyle1}>Recruitment Management System </b>
                  <br />
                  <b style={pStyle3}>{this.state.LoogedinCompay}</b>
                </span>
              </li>
            </ul>
            <ul class="nav navbar-top-links navbar-right">
            <li>
              <span class="m-r-sm text-muted welcome-message"style={pStyle2}>Welcome {localStorage.getItem("UserName")}</span>
                </li>
            <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src={process.env.REACT_APP_BASE_URL + "/Photos/" + profile}
                    className="rounded-circle"
                    alt="User Image"
                    style={photostyle}
                    
                  />
                </a>
                <ul className="dropdown-menu" style={dropdownmenu}>
                  <li className="user-header" style={style2}>
                    <img
                      src={
                        process.env.REACT_APP_BASE_URL + "/Photos/" + profile
                      }
                      className="img-circle"
                      alt="User Image"
                      style={photostyle1}
                      onClick={this.profile}
                      href="/"
                    />
                  </li>
                  <li className="user-footer">
                    <div className="pull-right">
                      <Link to="/Profile">
                        <b className="btn btn-default btn-flat">Profile</b>
                      </Link>
                    </div>
                  </li>
                </ul>
                <ul />
              </li>
                <li>
                    <a
                        onClick={this.logout}
                        href="/"
                        className="btn fa fa-sign-out"
                      >
                    Log out
                    </a>
                </li>
            </ul>
          </nav>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default Header;

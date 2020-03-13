import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
//import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
//import { BrowserRouter, Route, Switch } from "react-router-dom";
//system admin
import Auditrails from "./Forms/SystemAdmin/Auditrails";
import configurations from "./Forms/SystemAdmin/configurations";
import UserGroups from "./Forms/SystemAdmin/UserGroups";
import Roles from "./Forms/SystemAdmin/Roles";
import Users from "./Forms/SystemAdmin/Users";


//general
import Login from "./Login";
import DashBoard from "./DashBoard";
import Footer from "./Footer";
import Notfound from "./Notfound";
import Profile from "./Profile";
import createacc from "./createacc";
import ForgotPassword from "./ForgotPassword";
import decode from "jwt-decode";
import EmailVerification from "./EmailVerification";
import Mymenu from "./Mymenu";
//setups
import ResetPassword from "./ResetPassword";
import { HashRouter } from "react-router-dom";
//applications
import Logout from "./Logout";
import SMSdetails from "./Forms/SetUps/SMSdetails";
import smtpdetails from "./Forms/SetUps/smtpdetails";
import Facility from "./Forms/SetUps/Facility";
import Registration from "./Forms/Recruitment/Registration";
import Minor from "./Forms/Recruitment/Minor";

function App() {
  let token = localStorage.getItem("token");
  let UserCategory = localStorage.getItem("UserCategory");
  if (token) {
    if (UserCategory === "System_User") {
      return (
        <div id="wrapper">
          <HashRouter>
            <SideBar />
            <Header>
              <Switch>
                <Route path="/Logout" exact component={Logout} />;
                <Route exact path="/" component={DashBoard} />
                <Route exact path="/Users" component={Users} />
               
                <Route exact path="/Roles" component={Roles} />
                <Route exct path="/Usergroups" component={UserGroups} />
                <Route exact path="/Auditrails" component={Auditrails} />
                <Route exact path="/configurations" component={configurations}/>
                  <Route exact path="/home" component={DashBoard} />
                <Route exact path="/Profile" component={Profile} />
                <Route exact path="/ResetPassword" component={ResetPassword} />
                <Route exact path="/SMSdetails" component={SMSdetails} />
                <Route exact path="/smtpdetails" component={smtpdetails} />
                <Route exact path="/Facility" component={Facility}/>
                <Route exact path="/Registration"component={Registration}/>
                <Route exact path="/Minor"component={Minor}/>
                 <Route component={Notfound} />
              </Switch>
              <Footer />
            </Header>
          </HashRouter>
        </div>
      );
    } else {
      if (UserCategory === "Applicant") {
        return (
          <div id="wrapper">
            <HashRouter>
              <Mymenu />
              <Header>
                <Switch>
                  <Route path="/Logout" exact component={Logout} />;
                  <Route exact path="/" component={DashBoard} />
                  <Route exact path="/Profile" component={Profile} />
                    <Route
                    exact
                    path="/ResetPassword"
                    component={ResetPassword}
                  />
                 Route component={Notfound} />
                </Switch>
                <Footer />
              </Header>
            </HashRouter>
          </div>
        );
      } else {
        return (
          <div id="wrapper">
            <HashRouter>
              <Mymenu />
              <Header>
                <Switch>
                  <Route path="/Logout" exact component={Logout} />;
                  <Route exact path="/" component={DashBoard} />
                  <Route exact path="/Profile" component={Profile} />
                                   <Route
                    exact
                    path="/ResetPassword"
                    component={ResetPassword}
                  />
                                   <Route component={Notfound} />
                </Switch>
                <Footer />
              </Header>
            </HashRouter>
          </div>
        );
      }
    }
  } else {
    return (
      <div id="wrapper">
        <HashRouter>
          <Switch>
            <Route path="/Logout" exact component={Logout} />;
            <Route path="/" exact component={Login} />
            <Route path="/Login" exact component={Login} />
            <Route path="/createacc" exact component={createacc} />
            <Route path="/ForgotPassword" exact component={ForgotPassword} />
            <Route
              path="/EmailVerification"
              exact
              strict
              component={EmailVerification}
            />
            <Route component={Notfound} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;

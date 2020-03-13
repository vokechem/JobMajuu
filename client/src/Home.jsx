import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Component } from "react";
import Users from "./Forms/SystemAdmin/Users";
import Auditrails from "./Forms/SystemAdmin/Auditrails";
import UserRoles from "./Forms/SystemAdmin/UserRoles";
import UserGroups from "./Forms/SystemAdmin/UserGroups";
import Roles from "./Forms/SystemAdmin/Roles";
import DashBoard from "./DashBoard";
import Profile from "./Profile";
import imageupload from "./imageupload";
import AsignRoles from "./Forms/AsignRoles";
class Home extends Component {
  render() {
    return (
      <div id="wrapper">
        <BrowserRouter>
          <SideBar />
          <Header>
            <Switch>
              <Route path="/Home" component={DashBoard} />
              <Route exact path="/" component={DashBoard} />
              <Route path="/Users" component={Users} />
              <Route path="/Roles" component={Roles} />
              <Route path="/Usergroups" component={UserGroups} />
              <Route path="/Auditrails" component={Auditrails} />
              <Route path="/UserRoles" exact component={UserRoles} />
              <Route exact path="/Profile" component={Profile} />
              <Route exact path="/imageupload" component={imageupload} />
              <Route exact path="/MapRoles" component={AsignRoles} />
            </Switch>
          </Header>
        </BrowserRouter>
      </div>
    );
  }
}

export default Home;

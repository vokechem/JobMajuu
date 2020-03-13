import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "./Styles/App.css";

let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      ChangePassword: data.ChangePassword,
      PendingApplication: [],
      ResolvedApplications: [],
      events: []
    };
    this.fetchBookings = this.fetchBookings.bind(this);
  }
  //   {
  //   start: new Date(),
  //     end: new Date(moment().add(3, "hours")),
  //       title: "CASE HEARING"
  // },
  // {
  //   start: new Date(moment().add(-3, "days")),
  //     end: new Date(moment().add(1, "days")),
  //       title: "CASE HEARING"
  // }
  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  fetchPendingApplication = () => {
    fetch(
      "/api/Dashboard/" + localStorage.getItem("UserName") + "/Notresolved",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
      .then(res => res.json())
      .then(PendingApplication => {
        if (PendingApplication.length > 0) {
          this.setState({ PendingApplication: PendingApplication });
        } else {
          //swal("", PendingApplication.message, "error");
        }
      })
      .catch(err => {
        // swal("", err.message, "error");
      });
  };
  fetchBookings = () => {
    fetch("/api/CaseScheduling/All/AllBookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Bookings => {
        if (Bookings.length > 0) {
          let Rowdata1 = [];

          if (Bookings.length > 0) {

            Bookings.forEach(k => {
              var newStr = k.Slot.substring(0, k.Slot.length - 1);
              var newSlot = newStr.substring(0, newStr.length - 1);
              var timeslot = newSlot.replace(".", ":");
              if (timeslot.length == 4) {
                let time1array = k.Slot.split(".");
                if (+time1array[0] < +6) {
                  var output = +time1array[0] + +12;
                  let time = k.Date + "T" + output + ":00" + "+0300";
                  var output1 = +output + +1;
                  let Endtime = k.Date + "T" + output1 + ":00" + "+0300";

                  const Rowdata = {
                    start: new Date(time),
                    end: new Date(Endtime),
                    title: "CASE HEARING FOR APPLICATION " + k.Content
                  };
                  Rowdata1.push(Rowdata);
                } else {
                  var output = "0" + timeslot;
                  let time = k.Date + "T" + output + "+0300";
                  var output1 = +time1array[0] + +1;
                  let Endtime = k.Date + "T" + output1 + ":00" + "+0300";
                  const Rowdata = {
                    start: new Date(time),
                    end: new Date(Endtime),
                    title: "CASE HEARING FOR APPLICATION " + k.Content
                  };
                  Rowdata1.push(Rowdata);
                }
              } else {
                let time = k.Date + "T" + timeslot + "+0300";
                let time1array = k.Slot.split(".");
                var output = +time1array[0] + +1;
                let Endtime = k.Date + "T" + output + ":00" + "+0300";
                const Rowdata = {
                  start: new Date(time),
                  end: new Date(Endtime),
                  title: "CASE HEARING FOR APPLICATION " + k.Content
                };

                Rowdata1.push(Rowdata);
              }
            });
          }
          console.log(Rowdata1)
          this.setState({ events: Rowdata1 });
        } else {
          //swal("", Bookings.message, "error");
        }
      })
      .catch(err => {
        //swal("", err.message, "error");
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
              this.fetchPendingApplication();

              this.fetchBookings();
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
    const divStyle = {
      margin: "19px"
    };

    return (
      <div>
        <div className="row" style={divStyle}>
          <div className="col-lg-9 col-xs-6">
            <DnDCalendar
              defaultDate={new Date()}
              defaultView="month"
              events={this.state.events}
              localizer={localizer}
              onEventDrop={this.onEventDrop}
              onEventResize={this.onEventResize}
              resizable
              style={{ height: "80vh" }}
            />
          </div>
          <div className="col-lg-3 col-xs-6">
            <h3>Pending Notifications</h3>
            {this.state.PendingApplication.map((r, i) =>
              i % 2 == 0 ? (
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="small-box bg-green">
                      <div className="inner">
                        <h3>{r.Total}</h3>
                        <p>{r.Description}</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>

                      {r.Category === "Deadline Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link
                            to="/DeadlinerequestApproval"
                            className="text-white"
                          >
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                      {r.Category === "Case Adjournment Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link
                            to="/AdjournmentApproval"
                            className="text-white"
                          >
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                      {r.Category === "Applications Fees Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link to="/FeesApproval" className="text-white">
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                      {r.Category === "Preliminary Objecions Fees Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link
                            to="/PreliminaryObjectionFees"
                            className="text-white"
                          >
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                      {r.Category === "Case withdrawal Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link
                            to="/CaseWithdrawalApproval"
                            className="text-white"
                          >
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}

                      {r.Category === "Case Scheduling" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link to="/CaseScheduling" className="text-white">
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}

                      {r.Category === "Applications Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link
                            to="/ApplicationsApprovals"
                            className="text-white"
                          >
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                      {r.Category === "Panel Formation" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link to="/Panels" className="text-white">
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                      {r.Category === "Decision Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link to="/DecisionsApproval" className="text-white">
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                      {r.Category === "Panel Approval" ? (
                        <a href="/#" className="small-box-footer ">
                          <Link to="/PanelApproval" className="text-white">
                            More info <i className="fa fa-arrow-circle-right" />
                          </Link>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                  <div className="row">
                    <div className="col-lg-12 ">
                      <div className="small-box bg-aqua">
                        <div className="inner">
                          <h3>{r.Total}</h3>

                          <p>{r.Description}</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars" />
                        </div>
                        {r.Category === "Deadline Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link
                              to="/DeadlinerequestApproval"
                              className="text-white"
                            >
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Case Scheduling" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link to="/CaseScheduling" className="text-white">
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Applications Fees Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link to="/FeesApproval" className="text-white">
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Decision Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link to="/DecisionsApproval" className="text-white">
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Case Adjournment Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link
                              to="/AdjournmentApproval"
                              className="text-white"
                            >
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Preliminary Objecions Fees Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link
                              to="/PreliminaryObjectionFees"
                              className="text-white"
                            >
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Panel Formation" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link to="/Panels" className="text-white">
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Case withdrawal Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link
                              to="/CaseWithdrawalApproval"
                              className="text-white"
                            >
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Applications Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link
                              to="/ApplicationsApprovals"
                              className="text-white"
                            >
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                        {r.Category === "Panel Approval" ? (
                          <a href="/#" className="small-box-footer ">
                            <Link to="/PanelApproval" className="text-white">
                              More info <i className="fa fa-arrow-circle-right" />
                            </Link>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          {/* <div className="col-lg-3 col-xs-6">
            <div className="small-box bg-green">
              <div className="inner">
                <h3>15</h3>

                <p>Settled cases</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="/#" className="small-box-footer">
                More info <i className="fa fa-arrow-circle-right" />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default DashBoard;

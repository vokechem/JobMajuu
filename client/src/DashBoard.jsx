import React, { Component } from "react";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";
import swal from "sweetalert";

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
      Applications: [],
      Data: [],
      ChangePassword: data.ChangePassword,
      TotalApplicants: [],
      SystemUsers:[],
      TotalCost:[],
      ResolvedApplications: [],
      events: []
    };
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

  fetchApplications = () => {
    fetch("/api/Applications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Applications => {
        if (Applications.length > 0) {
          this.setState({ Applications: Applications });
        } else {
          swal("", Applications.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };

  fetchData = () => {
    this.setState({ FilePath: "" });
      fetch("/api/ExecutiveReports/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(Applications => {
          if (Applications.length > 0) {
            this.setState({ Data: Applications });
          } else {
            swal("", Applications.message, "error");
          }
        })
        .catch(err => {
          swal("", err.message, "error");
        });
    // } else {
    //   swal("", "Select Date to Continue", "error");
    // }
  };
  TotalApplicants = () => {
       fetch(
      "/api/Dashboard/" ,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
      .then(res => res.json())
      .then(TotalApplicants=> {
        if (TotalApplicants.length > 0) {
          this.setState({ TotalApplicants: TotalApplicants});
        } else {
          //swal("", PendingApplication.message, "error");
        }
      })
      .catch(err => {
        // swal("", err.message, "error");
      });
  };
  TotalCost = () => {
    fetch(
   "/api/TotalCost/" ,
   {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       "x-access-token": localStorage.getItem("token")
     }
   }
 )
   .then(res => res.json())
   .then(TotalCost=> {
     if (TotalCost.length > 0) {
       this.setState({ TotalCost: TotalCost});
     } else {
       //swal("", PendingApplication.message, "error");
     }
   })
   .catch(err => {
     // swal("", err.message, "error");
   });
};

SystemUsers = () => {
  fetch(
 "/api/TotalUsers/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(SystemUsers=> {
   if (SystemUsers.length > 0) {
     this.setState({ SystemUsers: SystemUsers});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
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
              this.TotalApplicants();
              this.SystemUsers();
              this.TotalCost();
              this.fetchApplications();
              this.fetchData();
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
  PrintFile = () => {
    let filepath = process.env.REACT_APP_BASE_URL + "/Cases/" + this.state.File;
    window.open(filepath);
  };
  formatNumber = num => {
    let newtot = Number(num).toFixed(2);
    return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  render() {
    const divStyle = {
      margin: "19px"
    };
    let FormStyle = {
      margin: "20px"
      
    };
    const data = [["Month", "Registration"]];
    [...this.state.Data].map((k, i) => {
      let d = [k.Month, k.Count];
      data.push(d);
    });

    return (
      <div>
            <div className="row" style={divStyle}>
            <div className="col-lg-3 col-xs-6">
            {this.state.SystemUsers.map((r, i) =>
              i % 2 == 0 ? (
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="small-box bg-aqua">
                      <div className="inner">
                        <h3>{r.SystemUsers}</h3>
                        <p>System users</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>
                      <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-white">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                    </div>
                  </div>
                </div>
              ) : (
                  <div className="row">
                  
                  </div>
                )
            )}
          </div>
            <div className="col-lg-3 col-xs-6">
            {this.state.TotalApplicants.map((r, i) =>
              i % 2 == 0 ? (
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="small-box bg-green">
                      <div className="inner">
                        <h3>{r.totalApplicants}</h3>
                        <p>Total  applicants</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>
                      <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-white">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                    </div>
                  </div>
                </div>
              ) : (
                  <div className="row">
                  
                  </div>
                )
            )}
          </div>
        
          <div className="col-lg-3 col-xs-6">
            {this.state.TotalCost.map((r, i) =>
              i % 2 == 0 ? (
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="small-box bg-yellow">
                      <div className="inner">
                        <h3>{r.TotalCost}</h3>
                        <p>Total Cost</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>
                      <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-white">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                    </div>
                  </div>
                </div>
              ) : (
                  <div className="row">
                  
                  </div>
                )
            )}
          </div>
              <div class="col-lg-3 col-xs-6">
                <div class="small-box bg-red">
                  <div class="inner">
                    <h3>0</h3>
      
                    <p>Fail applicants</p>
                  </div>
                  <div class="icon">
                    <i class="ion ion-pie-graph"></i>
                  </div>
                  <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div >
       
            <br />
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10 border border-success rounded bg-white">
              <div style={FormStyle}>
                <hr />
                <br />
                {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width={'100%'}
                      height={'300px'}
                      data={data}
                      loader={<div>Loading Chart</div>}
                      options={{
                       // colors: [ '#fbdd64'],
                        // Material design options
                        chart: {
                          title: "Monthly Registration"
                        }
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <br />
                {/* <div className="col-lg-3 col-xs-6">
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
                </div> */}
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
          );
        }
      }
      
      export default DashBoard;
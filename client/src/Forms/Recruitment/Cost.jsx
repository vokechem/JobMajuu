import React, { Component } from "react";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";
import swal from "sweetalert";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../Styles/App.css";
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
class Cost extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      Data: [],
      ChangePassword: data.ChangePassword,
     MinorCost:[],
     DCICost:[],
     PassportCost:[],
     MajorCost:[],
     FinalCost:[],
     TicketingCost: [],
     TotalCost:[],
     TotalCostIncurred:[],
      events: []
    };
  }
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
  MinorCost = () => {
    fetch(
   "/api/MinorCost/" ,
   {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       "x-access-token": localStorage.getItem("token")
     }
   }
 )
   .then(res => res.json())
   .then(MinorCost=> {
     if (MinorCost.length > 0) {
       this.setState({ MinorCost: MinorCost});
     } else {
       //swal("", PendingApplication.message, "error");
     }
   })
   .catch(err => {
     // swal("", err.message, "error");
   });
};
FinalCost = () => {
  fetch(
 "/api/FinalCost/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(FinalCost=> {
   if (FinalCost.length > 0) {
     this.setState({ FinalCost: FinalCost});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
DCICost = () => {
  fetch(
 "/api/DCICost/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(DCICost=> {
   if (DCICost.length > 0) {
     this.setState({ DCICost: DCICost});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};

PassportCost = () => {
  fetch(
 "/api/PassportCost/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(PassportCost=> {
   if (PassportCost.length > 0) {
     this.setState({ PassportCost: PassportCost});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
MajorCost = () => {
  fetch(
 "/api/MajorCost/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(MajorCost=> {
   if (MajorCost.length > 0) {
     this.setState({ MajorCost: MajorCost});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
TicketingCost = () => {
  fetch(
 "/api/TicketingCost/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(TicketingCost=> {
   if (TicketingCost.length > 0) {
     this.setState({ TicketingCost: TicketingCost});
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
TotalCostIncurred = () => {
  fetch(
 "/api/TotalCostIncurred/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(TotalCostIncurred=> {
   if (TotalCostIncurred.length > 0) {
     this.setState({ TotalCostIncurred: TotalCostIncurred});
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
              this.MinorCost();
              this.DCICost();
              this.PassportCost();
              this.MajorCost();
              this.TicketingCost();
              this.FinalCost();
              this.TotalCost();
              this.TotalCostIncurred();
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
          <br/>
              <div class="row">
              <div class="col-lg-3">
                    {this.state.MinorCost.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                {/* <span class="label label-warning float-right">Total</span> */}
                                <h5>Minor Medical Cost</h5>
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.MinorCost}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                           
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
                    <div class="col-lg-3">
                    {this.state.DCICost.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                {/* <span class="label label-warning float-right">Total</span> */}
                                <h5>DCI Clearance Cost</h5>
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.DCICost}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
                    <div class="col-lg-3">
                    {this.state.PassportCost.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                <h5>Passport Processing Cost</h5>
                                {/* <span class="label label-warning float-right">Total</span> */}
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.PassportCost}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
                    <div class="col-lg-3">
                    {this.state.MajorCost.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                <h5>Major Medical Cost</h5>
                                {/* <span class="label label-warning float-right">Total</span> */}
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.MajorCost}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
        </div>
        <br/>
        <div class="row">
        <div class="col-lg-3">
                    {this.state.TicketingCost.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                {/* <span class="label label-warning float-right">Total</span> */}
                                <h5>Ticketing Cost</h5>
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.TicketingCost}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
                    <div class="col-lg-3">
                    {this.state.FinalCost.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                {/* <span class="label label-warning float-right">Total</span> */}
                                <h5>FInal Medical Cost</h5>
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.FinalCost}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
                    <div class="col-lg-3">
                    {this.state.TotalCost.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                {/* <span class="label label-warning float-right">Total</span> */}
                                <h5>Total Cost</h5>
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.TotalCost}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                           
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
                    <div class="col-lg-3">
                    {this.state.TotalCostIncurred.map((r, i) =>
                        i % 2 == 0 ? (
                        <div class="ibox ">
                            <div class="ibox-title">
                                {/* <span class="label label-warning float-right">Total</span> */}
                                <h5>Total Cost Incurred</h5>
                            </div>
                            <div class="ibox-content">
                                <h1 class="no-margins"className="text-yellow">ksh:{r.TotalCostIncurred}</h1>
                               <h4>
                               <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                               </h4>   
                            </div>
                           
                        </div>
                           ) : (
                            <div className="ibox">
                            
                            </div>
                          )
                      )}
                    </div>
        </div>
        <br/>
      </div>
          );
        }
      }
      
      export default Cost;
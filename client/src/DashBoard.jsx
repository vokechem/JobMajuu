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
      MinorRedAlerts:[],
      DCIRedAlerts:[],
      PassportRedAlerts:[],
      minormedicalRedAlerts:[],
      TrainingRedAlerts:[],
      MajorRedAlerts:[],
      ContractRedAlerts:[],
      NEARedAlerts:[],
      VisaRedAlerts:[],
      AttestationRedAlerts:[],
      TicketingRedAlerts:[],
      TravelledApplicant:[],
      FinalRedAlerts:[],
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
MinorRedAlerts = () => {
  fetch(
 "/api/MinorRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(MinorRedAlerts=> {
   if (MinorRedAlerts.length > 0) {
     this.setState({ MinorRedAlerts: MinorRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
DCIRedAlerts = () => {
  fetch(
 "/api/DCIRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(DCIRedAlerts=> {
   if (DCIRedAlerts.length > 0) {
     this.setState({ DCIRedAlerts: DCIRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
PassportRedAlerts = () => {
  fetch(
 "/api/PassportRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(PassportRedAlerts=> {
   if (PassportRedAlerts.length > 0) {
     this.setState({ PassportRedAlerts: PassportRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
TrainingRedAlerts = () => {
  fetch(
 "/api/TrainingRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(TrainingRedAlerts=> {
   if (TrainingRedAlerts.length > 0) {
     this.setState({ TrainingRedAlerts: TrainingRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
MajorRedAlerts = () => {
  fetch(
 "/api/MajorRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(MajorRedAlerts=> {
   if (MajorRedAlerts.length > 0) {
     this.setState({ MajorRedAlerts: MajorRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
ContractRedAlerts = () => {
  fetch(
 "/api/ContractRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(ContractRedAlerts=> {
   if (ContractRedAlerts.length > 0) {
     this.setState({ ContractRedAlerts: ContractRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
NEARedAlerts = () => {
  fetch(
 "/api/NEARedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(NEARedAlerts=> {
   if (NEARedAlerts.length > 0) {
     this.setState({ NEARedAlerts: NEARedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
VisaRedAlerts = () => {
  fetch(
 "/api/VisaRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(VisaRedAlerts=> {
   if (VisaRedAlerts.length > 0) {
     this.setState({ VisaRedAlerts: VisaRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
AttestationRedAlerts = () => {
  fetch(
 "/api/TicketingRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(AttestationRedAlerts=> {
   if (AttestationRedAlerts.length > 0) {
     this.setState({ AttestationRedAlerts: AttestationRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
TicketingRedAlerts = () => {
  fetch(
 "/api/TicketingRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(TicketingRedAlerts=> {
   if (TicketingRedAlerts.length > 0) {
     this.setState({ TicketingRedAlerts: TicketingRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
FinalRedAlerts = () => {
  fetch(
 "/api/FinalRedAlerts/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(FinalRedAlerts=> {
   if (FinalRedAlerts.length > 0) {
     this.setState({ FinalRedAlerts: FinalRedAlerts});
   } else {
     //swal("", PendingApplication.message, "error");
   }
 })
 .catch(err => {
   // swal("", err.message, "error");
 });
};
TravelledApplicant = () => {
  fetch(
 "/api/TravelledApplicant/" ,
 {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "x-access-token": localStorage.getItem("token")
   }
 }
)
 .then(res => res.json())
 .then(TravelledApplicant=> {
   if (TravelledApplicant.length > 0) {
     this.setState({ TravelledApplicant: TravelledApplicant});
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
              this.MinorRedAlerts();
              this.DCIRedAlerts();
              this.PassportRedAlerts();
              this.fetchData();
              this.TrainingRedAlerts();
              this.MajorRedAlerts();
              this.ContractRedAlerts();
              this.NEARedAlerts();
              this.VisaRedAlerts();
              this.AttestationRedAlerts();
              this.TicketingRedAlerts();
              this.FinalRedAlerts();
              this.TravelledApplicant();
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
    let head = {
      font: "16px",
      color:"red"
      
    };
    let judy={
      font:"10px",
      color:"navy",
    }
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
                {this.state.SystemUsers.map((r, i) =>
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
            )}
            </div>
            <div class="col-lg-3">
                <div class="ibox ">
                {this.state.TotalApplicants.map((r, i) =>
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
            )}
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox ">
                {this.state.TotalCost.map((r, i) =>
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
            )}
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox ">
                {this.state.TravelledApplicant.map((r, i) =>
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="small-box bg-red">
                      <div className="inner">
                        <h3>{r.travelled}</h3>
                        <p>Total Travelled Applicants</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>
                      <a href="/#" className="small-box-footer ">
                           <Link to="/Travelling" className="text-white">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                    </div>
                  </div>
                </div>
            )}
                </div>
            </div>
            </div>   
            <div class="row">
            <div class="col-lg-7">
                <div class="ibox ">
                    <div class="ibox-content">
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
                       //colors: [ 'silver'],
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
            <div class="col-lg-5">
                <div class="ibox ">
                    <div class="ibox-title">
                        <span class="label label-danger float-right">Red Alerts</span>
                        <h5 style={head}>Pending Notification</h5>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                        {this.state.MinorRedAlerts.map((r, i) =>  
                            <div class="col-4">
                               <h5 style={judy}>Minor Medical</h5>
                               <h3 style={head}>{r.minormedicalRedAlerts}</h3>
                                <a href="/#" className="small-box-footer ">
                                <Link to="/Registration" className="text-info">
                                  More info <i className="fa fa-arrow-circle-right" />
                                </Link>
                              </a>
                              </div>
                 
                      )}
                            {this.state.DCIRedAlerts.map((r, i) =>
                           <div class="col-4">
                              <h5 style={judy}>DCI Clearance</h5>
                              <h3 style={head}>{r.DCIRedAlerts}</h3>
                               <a href="/#" className="small-box-footer ">
                               <Link to="/Registration" className="text-info">
                                 More info <i className="fa fa-arrow-circle-right" />
                               </Link>
                             </a>
                            </div>
                
                     )}
                   
                   {this.state.PassportRedAlerts.map((r, i) =>
                           <div class="col-4">
                              <h5 style={judy}>Passport Processing</h5>
                              <h3 style={head}>{r.PassportRedAlerts}</h3>
                               <a href="/#" className="small-box-footer ">
                               <Link to="/Registration" className="text-info">
                                 More info <i className="fa fa-arrow-circle-right" />
                               </Link>
                             </a>
                            </div>
                
                     )}
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                        {this.state.TrainingRedAlerts.map((r, i) =>
                           <div class="col-4">
                              <h5 style={judy}>Training</h5>
                              <h3 style={head}>{r.TrainingRedAlerts}</h3>
                               <a href="/#" className="small-box-footer ">
                               <Link to="/Registration" className="text-info">
                                 More info <i className="fa fa-arrow-circle-right" />
                               </Link>
                             </a>
                            </div>
                
                     )}

                                  {this.state.MajorRedAlerts.map((r, i) =>
                                    <div class="col-4">
                                        <h5 style={judy}>Major Medical</h5>
                                        <h3 style={head}>{r.majorRedAlerts}</h3>
                                        <a href="/#" className="small-box-footer ">
                                        <Link to="/Registration" className="text-info">
                                          More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                      </a>
                                      </div>
                          
                              )}
                           {this.state.ContractRedAlerts.map((r, i) =>
                                    <div class="col-4">
                                        <h5 style={judy}>Contract Processing</h5>
                                        <h3 style={head}>{r.ContractRedAlerts}</h3>
                                        <a href="/#" className="small-box-footer ">
                                        <Link to="/Registration" className="text-info">
                                          More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                      </a>
                                      </div>
                          
                              )}
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                        {this.state.NEARedAlerts.map((r, i) =>
                                    <div class="col-4">
                                        <h5 style={judy}>NEA Approval</h5>
                                        <h3 style={head}>{r.NEARedAlerts}</h3>
                                        <a href="/#" className="small-box-footer ">
                                        <Link to="/Registration" className="text-info">
                                          More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                      </a>
                                      </div>
                          
                              )}

                         {this.state.VisaRedAlerts.map((r, i) =>
                                    <div class="col-4">
                                        <h5 style={judy}>Visa Processing</h5>
                                        <h3 style={head}>{r.visaRedAlerts}</h3>
                                        <a href="/#" className="small-box-footer ">
                                        <Link to="/Registration" className="text-info">
                                          More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                      </a>
                                      </div>
                          
                              )}
                             {this.state.AttestationRedAlerts.map((r, i) =>
                                    <div class="col-4">
                                        <h5 style={judy}>Attestation</h5>
                                        <h3 style={head}>{r.AttestationRedAlerts}</h3>
                                        <a href="/#" className="small-box-footer ">
                                        <Link to="/Registration" className="text-info">
                                          More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                      </a>
                                      </div>
                          
                              )}
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                        {this.state.TicketingRedAlerts.map((r, i) =>
                                    <div class="col-4">
                                        <h5 style={judy}>Ticketing</h5>
                                        <h3 style={head}>{r.TicketingRedAlerts}</h3>
                                        <a href="/#" className="small-box-footer ">
                                        <Link to="/Registration" className="text-info">
                                          More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                      </a>
                                      </div>
                          
                              )}
                              {this.state.FinalRedAlerts.map((r, i) =>
                                    <div class="col-4">
                                        <h5 style={judy}>Final Medical</h5>
                                        <h3 style={head}>{r.finalmedicalRedAlerts}</h3>
                                        <a href="/#" className="small-box-footer ">
                                        <Link to="/Registration" className="text-info">
                                          More info <i className="fa fa-arrow-circle-right" />
                                        </Link>
                                      </a>
                                      </div>
                          
                              )}
                          
                        </div>
                    </div>
                </div>
            </div>

        </div>    
      </div>
          );
        }
      }
      
      export default DashBoard;
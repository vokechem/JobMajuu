import React, { Component } from "react";
import swal from "sweetalert";
import Chart from "react-google-charts";

class MonthlyRegistration extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      // AsAt: "",
      Data: [],
      Data1:[]
    };
  }
  handleInputChange = event => {
    // event.preventDefault();
    // this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value, Data: [] });
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
  fetchTravelling = () => {
    fetch("/api/Travelling", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Travelling => {
        if (Travelling.length > 0) {
          this.setState({ Travelling: Travelling });
        } else {
          swal("Oops!", Travelling.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  fetchTravelldReport = () => {
    this.setState({ FilePath: "" });
      fetch("/api/TravelledReport/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(Travelling => {
          if (Travelling.length > 0) {
            this.setState({ Data1: Travelling });
          } else {
            swal("", Travelling.message, "error");
          }
        })
        .catch(err => {
          swal("", err.message, "error");
        });
    // } else {
    //   swal("", "Select Date to Continue", "error");
    // }
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
              this.fetchData();
              this.fetchApplications();
              this.fetchTravelling();
              this.fetchTravelldReport();
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
    let FormStyle = {
      margin: "20px"
    };
    const data = [["Month", "Registration"]];
    [...this.state.Data].map((k, i) => {
      let d = [k.Month, k.Count];
      data.push(d);
    });
    const data1 = [["Month", "Travelling"]];
    [...this.state.Data1].map((k, i) => {
      let d = [k.Month, k.Count];
      data1.push(d);
    });

    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Monthly  Distributions</h2>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div>
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
                        colors: [ '#fbdd64'],
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
          
          <div className="row">
            <div className="col-lg-1"></div>     
            <div className="col-lg-10 border border-success rounded bg-white">
              <div style={FormStyle}>
                <hr />
                <br />
                {this.state.Data1.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width={'100%'}
                      height={'300px'}
                      data= {data1}
                      
                      loader={<div>Loading Chart</div>}
                      options={{
                        colors: [ '#33FFC7'],
                        // Material design options
                        chart: {
                          title: "Monthly Travelled"
                        }
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MonthlyRegistration;

import React, { Component } from "react";
import swal from "sweetalert";
import Chart from "react-google-charts";

class MonthlyRegistration extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      // AsAt: "",
      Minor:[],
      DCI:[],
      Data: [],
      Data1:[],
      Data2:[],
      Data3:[],
      Data4:[]
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
  fetchMinorMedicalReport = () => {
    this.setState({ FilePath: "" });
      fetch("/api/MinorMedicalReport/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(Minor => {
          if (Minor.length > 0) {
            this.setState({ Data2: Minor });
          } else {
            swal("", Minor.message, "error");
          }
        })
        .catch(err => {
          swal("", err.message, "error");
        });
    // } else {
    //   swal("", "Select Date to Continue", "error");
    // }
  };
  FetchDCIReport = () => {
    this.setState({ FilePath: "" });
      fetch("/api/DCIReport/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(DCI => {
          if (DCI.length > 0) {
            this.setState({ Data3: DCI });
          } else {
            swal("", DCI.message, "error");
          }
        })
        .catch(err => {
          swal("", err.message, "error");
        });
    // } else {
    //   swal("", "Select Date to Continue", "error");
    // }
  };
  FetchPassportReport = () => {
    this.setState({ FilePath: "" });
      fetch("/api/PassportReport/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(PassportReport => {
          if (PassportReport.length > 0) {
            this.setState({ Data4: PassportReport });
          } else {
            swal("", PassportReport.message, "error");
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
              this.fetchMinorMedicalReport();
              this.FetchDCIReport();
              this.FetchPassportReport();
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
    const data2 = [["Month", "Minor medical"]];
    [...this.state.Data2].map((k, i) => {
      let d = [k.Month, k.Count];
      data2.push(d);
    });
    const data3 = [["Month", "DCI Cost"]];
    [...this.state.Data3].map((k, i) => {
      let d = [k.Month, k.Count];
      data3.push(d);
    });
    const data4 = [["Month", "passport"]];
    [...this.state.Data4].map((k, i) => {
      let d = [k.Month, k.Count];
      data4.push(d);
    });
    return (
      <div>
       <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Monthly Registration </h5>
                        </div>
                        <div class="ibox-content">
                            <div>
                            {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width={'100%'}
                      height={'300px'}
                      data={data}
                      loader={<div>Loading Chart</div>}
                      options={{
                        colors: [ '#80ABA3'],
                        // Material design options
                        chart: {
                         // title: "Monthly Registration"
                        }
                      }}
                    />
                  </div>
                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Monthly Travelled Applicants</h5>
                        </div>
                        <div class="ibox-content">
                        {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width={'100%'}
                      height={'300px'}
                      data={data1}
                      loader={<div>Loading Chart</div>}
                      options={{
                        colors: [ '#F7DC6F'],
                        sliceVisibilityThreshold: 0.2,
                        // Material design options
                        chart: {
                         // title: "Monthly Registration"
                        }
                      }}
                    />
                  </div>
                ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Montly Minor medical Cost</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="text-center">
                            {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width={'100%'}
                      height={'300px'}
                      data={data2}
                      loader={<div>Loading Chart</div>}
                      options={{
                        colors: [ '#CD6155'],
                        sliceVisibilityThreshold: 0.2,
                        // Material design options
                        chart: {
                         // title: "Monthly Registration"
                        }
                      }}
                    />
                  </div>
                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Montly DCI Cost</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="text-center">
                            {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width={'100%'}
                      height={'300px'}
                      data={data3}
                      loader={<div>Loading Chart</div>}
                      options={{
                        colors: [ '#2ECC71'],
                        sliceVisibilityThreshold: 0.2,
                        // Material design options
                        chart: {
                         // title: "Monthly Registration"
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
            <div class="row">
            <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Monthly passport Cost</h5>
                        </div>
                        <div class="ibox-content">
                            <div class="text-center">
                            {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width={'100%'}
                      height={'300px'}
                      data={data4}
                      loader={<div>Loading Chart</div>}
                      options={{
                        // Material chart options
                        chart: {
                          // title: 'Population of Largest U.S. Cities',
                          // subtitle: 'Based on most recent and previous census data',
                        },
                        hAxis: {
                          title: 'Total Population',
                          minValue: 0,
                        },
                        vAxis: {
                          title: 'Monthly',
                        },
                        bars: 'verical',
                        axes: {
                          y: {
                            0: { side: 'right' },
                          },
                        },
                      }}
                    />
                  </div>
                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Pie </h5>

                        </div>
                        <div class="ibox-content">
                        {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="PieChart"
                      width={'100%'}
                      height={'300px'}
                      data={data2}
                      loader={<div>Loading Chart</div>}
                      options={{
                        legend: 'none',
                        pieSliceText: 'label',
                        slices: {
                          0: { color: 'yellow' },
                          1: { color: 'blue' },
                          1: { color: 'brown' },
                          1: { color: 'green' },
                          1: { color: '#80ABA3' },
                        },
                      }}
                
                    />
                  </div>
                ) : null}
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Montly DCI Cost</h5>

                        </div>
                        <div class="ibox-content">
                            <div class="text-center">
                            {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="PieChart"
                      width={'100%'}
                      height={'300px'}
                      data={data3}
                      loader={<div>Loading Chart</div>}
                      options={{
                        pieSliceText: 'none',
                        pieStartAngle: 135,
                        slices: {
                          0: { color: '#F7DC6F' },
                          1: { color: '#85C1E9' },
                          2: { color: '#F5CBA7' },
                        },
                        pieHole: 0.2,
                        sliceVisibilityThreshold: 0.2,
                        // Material design options
                        chart: {
                         // title: "Monthly Registration"
                        }
                      }}
                    />
                  </div>
                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>Pie </h5>

                        </div>
                        <div class="ibox-content">
                        {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="PieChart"
                      width={'100%'}
                      height={'300px'}
                      data={data2}
                      loader={<div>Loading Chart</div>}
                      options={{
                        legend: 'none',
                        pieSliceText: 'label',
                        slices: {
                          0: { color: 'yellow' },
                          1: { color: 'blue' },
                          1: { color: 'brown' },
                          1: { color: 'green' },
                          1: { color: '#80ABA3' },
                        },
                      }}
                
                    />
                  </div>
                ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default MonthlyRegistration;

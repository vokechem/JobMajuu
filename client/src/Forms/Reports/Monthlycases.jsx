import React, { Component } from "react";
import swal from "sweetalert";
import Chart from "react-google-charts";

class Monthlycases extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      AsAt: "",
      Data: []
    };

    this.Downloadfile = this.Downloadfile.bind(this);
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

  Downloadfile = () => {
    this.setState({ FilePath: "" });
    if (this.state.AsAt) {
      fetch("/api/ExecutiveReports/" + this.state.AsAt, {
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
    } else {
      swal("", "Select Date to Continue", "error");
    }
  };

  render() {
    let FormStyle = {
      margin: "20px"
    };
    const data = [["Month", "Cases"]];
    [...this.state.Data].map((k, i) => {
      let d = [k.Month, k.Count];
      data.push(d);
    });

    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Monthly Cases Distributions</h2>
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
                <div class="row">
                  <div class="col-sm-1">
                    <label for="ApplicantID" className="font-weight-bold ">
                      As AT{" "}
                    </label>
                  </div>

                  <div class="col-sm-4">
                    <div className="form-group">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.AsAt}
                        type="date"
                        required
                        name="AsAt"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-sm-1">
                    <button
                      onClick={this.Downloadfile}
                      className="btn btn-primary"
                      type="button"
                    >
                      Generate
                    </button>
                  </div>
                  <div class="col-sm-1">
                    {/* <button
                      onClick={this.PrintFile}
                      className="btn btn-success"
                      type="button"
                    >
                      Print
                    </button> */}
                  </div>
                </div>
                <hr />
                <br />
                {this.state.Data.length > 0 ? (
                  <div className="App">
                    <Chart
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={data}
                      loader={<div>Loading Chart</div>}
                      options={{
                        // Material design options
                        chart: {
                          title: "Monthly Cases Distributions"
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

export default Monthlycases;

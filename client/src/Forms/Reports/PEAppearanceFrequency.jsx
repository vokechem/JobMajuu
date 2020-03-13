import React, { Component } from "react";
import swal from "sweetalert";
import Chart from "react-google-charts";
import Select from "react-select";
class PEAppearanceFrequency extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      FromDate: "",
      Todate: "",
      Data: [],
      PE: [],
      All: false
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
  fetchPE = () => {
    fetch("/api/PE", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(PE => {
        if (PE.length > 0) {
          this.setState({ PE: PE });
        } else {
          swal("", PE.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
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
              this.fetchPE();
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

  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
  };
  Downloadfile = () => {
    this.setState({ FilePath: "" });
    if (this.state.FromDate) {
      fetch(
        "/api/ExecutiveReports/" +
          this.state.FromDate +
          "/" +
          this.state.Todate +
          "/" +
          +this.state.All,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
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
    const PE = [...this.state.PE].map((k, i) => {
      return {
        value: k.PEID,
        label: k.Name
      };
    });
    let FormStyle = {
      margin: "20px"
    };
    const data = [["PE Category", "Frequency"]];
    [...this.state.Data].map((k, i) => {
      let d = [k.PEDesc, k.Count];
      data.push(d);
    });

    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>PE Appearance Frequency Per Category</h2>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div>
          <br />
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-12 border border-success rounded bg-white">
              <div style={FormStyle}>
                <div class="row">
                  <div class="col-sm-1">
                    <label for="ApplicantID" className="font-weight-bold ">
                      Procuring Entity{" "}
                    </label>
                  </div>

                  <div class="col-sm-3">
                    <div className="form-group">
                      <Select
                        name="PEID"
                        defaultInputValue={this.state.PEName}
                        onChange={this.handleSelectChange}
                        options={PE}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-1">
                    <label for="ApplicantID" className="font-weight-bold ">
                      To Date{" "}
                    </label>
                  </div>

                  <div class="col-sm-3">
                    <div className="form-group">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.Todate}
                        type="date"
                        required
                        name="Todate"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-sm-1">
                    <p></p>
                    <input
                      className="checkbox"
                      id="All"
                      type="checkbox"
                      name="All"
                      defaultChecked={this.state.All}
                      onChange={this.handleInputChange}
                    />{" "}
                    <label htmlFor="All" className="font-weight-bold">
                      All
                    </label>
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
                    <button
                      onClick={this.PrintFile}
                      className="btn btn-success"
                      type="button"
                    >
                      Print
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-1">
                    <label for="ApplicantID" className="font-weight-bold ">
                      From Date{" "}
                    </label>
                  </div>

                  <div class="col-sm-3">
                    <div className="form-group">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.FromDate}
                        type="date"
                        required
                        name="FromDate"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-sm-1">
                    <label for="ApplicantID" className="font-weight-bold ">
                      To Date{" "}
                    </label>
                  </div>

                  <div class="col-sm-3">
                    <div className="form-group">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.Todate}
                        type="date"
                        required
                        name="Todate"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-sm-1">
                    <p></p>
                    <input
                      className="checkbox"
                      id="All"
                      type="checkbox"
                      name="All"
                      defaultChecked={this.state.All}
                      onChange={this.handleInputChange}
                    />{" "}
                    <label htmlFor="All" className="font-weight-bold">
                      All
                    </label>
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
                    <button
                      onClick={this.PrintFile}
                      className="btn btn-success"
                      type="button"
                    >
                      Print
                    </button>
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
                          title: "PE Appearance Frequency Per Category"
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

export default PEAppearanceFrequency;

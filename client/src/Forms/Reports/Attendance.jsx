import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
var dateFormat = require("dateformat");
class Attendance extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      Members: [],
      SittingNo: "",
      Sittings: [],
      ApplicationNo: "",
      ApplicantName: "",
      PEName: "",
      File: "",
      FilePath: ""
    };
    this.Downloadfile = this.Downloadfile.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.fetchSittings = this.fetchSittings.bind(this);
  }
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    if (actionMeta.name === "ApplicationNo") {
      this.fetchSittings(UserGroup.value);
    }
    if (actionMeta.name === "SittingNo") {
      var rows = [...this.state.Sittings];
      const filtereddata = rows.filter(
        item => item.SittingID === UserGroup.value
      );

      this.setState({ Date: filtereddata[0].Date });
      this.setState({
        Location: filtereddata[0].Branch + ", " + filtereddata[0].VenueName
      });
      this.fetchmembers(UserGroup.value);
    }
  };
  fetchApplications = () => {
    fetch("/api/GenerateAttendanceregister", {
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
  fetchSittings = ApplicationNo => {
    this.setState({ Sittings: [] });

    fetch("/api/GenerateAttendanceregister/" + ApplicationNo + "/Sittings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Sittings => {
        if (Sittings.length > 0) {
          this.setState({ Sittings: Sittings });
          var rows = [...this.state.Applications];
          const filtereddata = rows.filter(
            item => item.ApplicationNo === ApplicationNo
          );

          this.setState({ PEName: filtereddata[0].Name });
        } else {
          swal("", "Error occured while fetching members", "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchmembers = SittingID => {
    this.setState({ Members: [] });
    fetch("/api/GenerateAttendanceregister/" + SittingID + "/Attendance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Members => {
        if (Members.length > 0) {
          this.setState({ Members: Members });
        } else {
          swal("", "Error occured while fetching members", "error");
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
              this.fetchApplications();
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
    let filepath =
      process.env.REACT_APP_BASE_URL + "/Attendance/" + this.state.File;
    window.open(filepath);
  };
  Downloadfile = () => {
    if (this.state.ApplicationNo) {
      const data = {
        Applicationno: this.state.ApplicationNo,
        ApplicantName: this.state.ApplicantName,
        PEName: this.state.PEName,
        Members: this.state.Members,
        Location: this.state.Location,
        Date: dateFormat(
          new Date(this.state.Date).toLocaleDateString(),
          "isoDate"
        ),
        LogoPath: process.env.REACT_APP_BASE_URL + "/images/Harambee.png"
      };

      fetch("/api/GenerateAttendanceregister/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      })
        .then(response =>
          response.json().then(data => {
            if (data.success) {
              let filename = this.state.ApplicationNo + ".pdf";
              this.setState({ File: filename });
              this.setState({
                FilePath:
                  process.env.REACT_APP_BASE_URL + "/Attendance/" + filename
              });
            } else {
              swal("", "Error occured while printing the report", "error");
            }
          })
        )
        .catch(err => {
          //swal("Oops!", err.message, "error");
        });
    } else {
      swal("", "Select Application No to Continue", "error");
    }
  };
  render() {
    let FormStyle = {
      margin: "20px"
    };
    const ApplicationNoOptions = [...this.state.Applications].map((k, i) => {
      return {
        value: k.ApplicationNo,
        label: k.ApplicationNo + "-" + k.Name
      };
    });
    const SittingsOptions = [...this.state.Sittings].map((k, i) => {
      return {
        value: k.SittingID,
        label: k.SittingNo + " (" + k.Branch + "-" + k.VenueName + ")"
      };
    });
    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Attendance List</h2>
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
                      Application NO{" "}
                    </label>
                  </div>

                  <div class="col-sm-4">
                    <div className="form-group">
                      <Select
                        name="ApplicationNo"
                        onChange={this.handleSelectChange}
                        options={ApplicationNoOptions}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-1">
                    <label for="ApplicantID" className="font-weight-bold ">
                      Sitting{" "}
                    </label>
                  </div>

                  <div class="col-sm-4">
                    <div className="form-group">
                      <Select
                        name="SittingNo"
                        onChange={this.handleSelectChange}
                        options={SittingsOptions}
                        required
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

                <object
                  width="100%"
                  height="450"
                  data={this.state.FilePath}
                  type="application/pdf"
                >
                  {" "}
                </object>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Attendance;

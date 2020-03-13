import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";

class PanelList extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      Members: [],
      ApplicationNo: "",
      ApplicantName: "",
      PEName: "",
      File: "",
      FilePath: ""
    };
    this.Downloadfile = this.Downloadfile.bind(this);
  }
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    var rows = [...this.state.Applications];

    const filtereddata = rows.filter(
      item => item.ApplicationNo === UserGroup.value
    );

    this.setState({ ApplicantName: filtereddata[0].ApplicantName });
    this.setState({ PEName: filtereddata[0].PEName });
    this.fetchPanelmembers(UserGroup.value);
  };
  fetchApplications = () => {
    fetch("/api/GeneratePanelList", {
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
  fetchPanelmembers = ApplicationNo => {
    this.setState({ Members: [] });

    fetch("/api/GeneratePanelList/" + ApplicationNo, {
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
      process.env.REACT_APP_BASE_URL + "/PanelLists/" + this.state.File;
    window.open(filepath);
  };
  Downloadfile = () => {
    if (this.state.ApplicationNo) {
      const data = {
        Applicationno: this.state.ApplicationNo,
        ApplicantName: this.state.ApplicantName,
        PEName: this.state.PEName,
        Members: this.state.Members,
        LogoPath: process.env.REACT_APP_BASE_URL + "/images/Harambee.png"
      };

      fetch("/api/GeneratePanelList/", {
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
              this.setState({
                FilePath: ""
              });
              this.setState({
                File: filename,
                FilePath:
                  process.env.REACT_APP_BASE_URL + "/PanelLists/" + filename
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
        label: k.ApplicationNo
      };
    });
    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Panel List</h2>
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
                  <div class="col-sm-2">
                    <label for="ApplicantID" className="font-weight-bold ">
                      Select Application NO{" "}
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

export default PanelList;

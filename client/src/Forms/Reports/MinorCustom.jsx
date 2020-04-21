import React, { Component } from "react";
import swal from "sweetalert";
import Chart from "react-google-charts";
import Modal from "react-awesome-modal";
var jsPDF = require("jspdf");
require("jspdf-autotable");
var dateFormat = require("dateformat");
class MinorCustom extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      Registration:[],
      FromDate: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Todate: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Data: [],
      DataPercategory: [],
      DataPerPE: [],
      All: false,
      openCategoryModal: false,
      openPEModal: false,
      PEName: "",
      Category: "",
      IDnumber:""
    };

    this.Downloadfile = this.Downloadfile.bind(this);
  }
  exportCategorypdf = () => {
    let name = this.state.Category + " CASES";
    var columns = [
      { title: "ApplicationNo", dataKey: "ApplicationNo" },
      { title: "FilingDate", dataKey: "FilingDate" },
      { title: "Status", dataKey: "Status" },
      { title: "TenderNo", dataKey: "TenderNo" },
      { title: "TenderValue", dataKey: "TenderValue" },
      { title: "Applicant", dataKey: "Applicant" },
      { title: "PE", dataKey: "PE" }
    ];
    const rows = [...this.state.DataPercategory];
    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, rows, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text(name, 40, 50);
      }
    });
    doc.save("ARCM handled cases.pdf");
  };
  exportPEpdf = () => {
    let name = this.state.PEName + " CASES";
    var columns = [
      { title: "ApplicationNo", dataKey: "ApplicationNo" },
      { title: "Application date", dataKey: "FilingDate" },
      { title: "Applicant", dataKey: "Name" },
      { title: "Status", dataKey: "Status" },
      { title: "TenderNo", dataKey: "TenderNo" }
    ];
    const rows = [...this.state.DataPerPE];
    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, rows, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text(name, 40, 50);
      }
    });
    doc.save("ARCM PE CASES.pdf");
  };
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
  fetchRegistration = () => {
    fetch("/api/Registration", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Registration => {
        if (Registration.length > 0) {
          this.setState({ Registration: Registration });
        } else {
          swal("", Registration.message, "error");
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
    if (this.state.FromDate) {
      fetch(
        "/api/MinorRedAlerts/" +
          this.state.FromDate +
          "/" +
          this.state.Todate +
          "/" +
          +this.state.All +
          "/requesthandled",
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

  GetregistrationList = () => {
    this.setState({ FilePath: "" });
    if (this.state.FromDate) {
      fetch(
        "/api/RegistrationCustom/" +
          this.state.FromDate +
          "/" +
          this.state.Todate +
          "/" +
          +this.state.All +
          "/requesthandled",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
        .then(res => res.json())
        .then(Registration => {
          if (Registration.length > 0) {
            this.setState({ Data1: Registration });
          } else {
            swal("", Registration.message, "error");
          }
        })
        .catch(err => {
          swal("", err.message, "error");
        });
    } else {
      swal("", "Select Date to Continue", "error");
    }
  };
  CloseCategoryModal = () => {
    this.setState({ openCategoryModal: false });
  };
  ClosePEModal = () => {
    this.setState({ openPEModal: false, openCategoryModal: true });
  };
  DrillDown = Category => {
    fetch(
      "/api/RegistrationCustom/" +
        this.state.FromDate +
        "/" +
        this.state.Todate +
        "/" +
        Category +
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
      .then(Registration => {
        if (Registration.length > 0) {
          this.setState({
            DataPercategory: Registration,
            openCategoryModal: true,
            Category: Category
          });
        } else {
          swal("", Registration.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  render() {
    let FormStyle = {
      margin: "10px",
      weight: "100%",
    };
    let breadcrumbstyle={
      color:"gray"
    }
    const data = [["time", "Registration"]];
    [...this.state.Data].map((k, i) => {
      let d = [ new Date(k.date).toLocaleDateString(), k.Count];
      data.push(d);
    });
    let DrillDown = this.DrillDown;
    return (
      <div>
             <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-10">
                    <h2>Minor medical Reports</h2>
                </div>
                <div class="col-lg-2">
                </div>
            </div>
            <br/>
            <div className="container-fluid">
                        <div className="col-sm-12">
                          <div className="ibox-content">
              <div style={FormStyle}>
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
                  <div class="col-sm-1"></div>
                </div>
                <hr />
                <br />
                <div class="col-sm-12">
                  <nav>
                    <div class="nav nav-tabs " id="nav-tab" role="tablist">
                      <a
                        class="nav-item nav-link active font-weight-bold"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        View{" "}
                      </a>
                    </div>
                  </nav>
                  <div class="tab-content " id="nav-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <br />
                      <h3 style={{ cursor: "pointer", color: "#1c84c6" }}>
                       Minor Medical between{" "}
                        {dateFormat(
                          new Date(this.state.FromDate).toLocaleDateString(),
                          "fullDate"
                        )}{" "}
                        and{" "}
                        {dateFormat(
                          new Date(this.state.Todate).toLocaleDateString(),
                          "fullDate"
                        )}
                      </h3>
                      <table className="table table-bordered  table-sm">
                        <thead className="thead-light">
                          <th>No</th>
                          <th>Name</th>
                          <th>ID Number</th>
                          <th>Date of medical</th>
                          <th>Medical Facility</th>
                          <th>Type</th>
                          <th>Cost</th>
                          <th>Registration date</th>
                        </thead>
                        {this.state.Data.map((r, i) => (
                          <tr>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.Status)}
                            >
                              {i + 1}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.Status)}
                            >
                              {r.Fullname}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.Status)}
                            >
                              {r.Number}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.DOB)}
                            >
                              {new Date(r.DOM).toLocaleDateString()}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.Phone)}
                            >
                              {r.MedicalFacility}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.Status)}
                            >
                              {r.Type}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.Status)}
                            >
                              {r.cost}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => DrillDown(r.date)}
                            >
                                {dateFormat(
                          new Date(r.date).toLocaleDateString(),
                          "fullDate"
                        )}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <br/>
          
        </div>
    );
  }
}

export default MinorCustom;

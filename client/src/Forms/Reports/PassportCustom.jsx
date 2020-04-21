import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import ReactExport from "react-data-export";
var jsPDF = require("jspdf");
require("jspdf-autotable");
var dateFormat = require("dateformat");
class PassportCustom extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      FromDate: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Todate: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Data: [],
      TotalFee: "",
      Status: "",
      All: false,
      AllColumns: false,
      DecisionDate: false,
      AwardDate: false,
      FilingDate: false,
      TenderNo: false,
      TenderName: false,
      ClosingDate: false,
      TenderValue: false,
      PEName: false,
      TenderTypeDesc: false,
      Timer: false,
      Applicant: false
    };

    this.Downloadfile = this.Downloadfile.bind(this);
  }
  exportCategorypdf = () => {
    let name = "PE CASES PER CATEGORY";
    var columns = [
      { title: "CATEGORY", dataKey: "Name" },
      { title: "Count", dataKey: "Count" }
    ];
    const rows = [...this.state.DataPercategory];
    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, rows, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text(name, 40, 50);
      }
    });
    doc.save("ARCM PE CASES PER CATEGORY.pdf");
  };
  exportPEpdf = () => {
    let name = this.state.PEName + " CASES";
    var columns = [
      { title: "ApplicationNo", dataKey: "ApplicationNo" },
      { title: "Application date", dataKey: "FilingDate" },
      { title: "Applicant", dataKey: "Name" },
      { title: "Training_status", dataKey: "Training_status" },
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
    fetch(
      "/api/PassportCustom/" +
        this.state.Status +
        "/" +
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
              // this.fetchApplications();
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
    if (this.state.Status) {
      if (this.state.FromDate) {
        this.fetchApplications();
      } else {
        swal("", "Select Date to Continue", "error");
      }
    } else {
      swal("", "Select Status to continue", "error");
    }
  };
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
  };
  render() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    let FormStyle = {
      margin: "20px"
    };
    let statusOptions = [
      {
        value: "Processing",
        label: "Processing"
      },
      {
        value: "Collected",
        label: "Collected"
      },
      {
        value: "Defaulted",
        label: "Defaulted"
      },
      {
        value: "All",
        label: "All"
      }
    ];
    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>DCI CLearance Report</h2>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div>
          <br />
          <div className="row">
            <div
              style={{ margin: "10px" }}
              className="col-lg-12 border border-success rounded bg-white"
            >
              <div style={FormStyle}>
                <div class="row">
                  <div class="col-sm-2 border border-success rounded">
                    <h3 style={{ color: "blue" }}>Filter Criteria</h3>
                    <div className="row">
                      <div className="col-md-12">
                        <label for="ApplicantID" className="font-weight-bold ">
                          Passport Status
                        </label>
                        <Select
                          name="Status"
                          onChange={this.handleSelectChange}
                          options={statusOptions}
                          required
                        />
                      </div>

                      <div className="col-md-12">
                        <label for="ApplicantID" className="font-weight-bold ">
                          From Date{" "}
                        </label>
                        <input
                          onChange={this.handleInputChange}
                          value={this.state.FromDate}
                          type="date"
                          required
                          name="FromDate"
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-12">
                        <p></p>
                        <label for="ApplicantID" className="font-weight-bold ">
                          To Date{" "}
                        </label>
                        <input
                          onChange={this.handleInputChange}
                          value={this.state.Todate}
                          type="date"
                          required
                          name="Todate"
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-12">
                        <p></p>
                        <input
                          className="checkbox"
                          id="All"
                          type="checkbox"
                          name="All"
                          defaultChecked={this.state.All}
                          onChange={this.handleInputChange}
                        />
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          All Dates
                        </label>
                      </div>
                    </div>
                    <br />
                    <button
                      onClick={this.Downloadfile}
                      className="btn btn-primary"
                      type="button"
                    >
                      Submit
                    </button>{" "}
                    {this.state.Data.length > 0 ? (
                      <ExcelFile
                        element={
                          <button
                            type="button"
                            className="btn btn-success  fa fa-file-excel-o fa-2x"
                          >
                            &nbsp; Excel
                          </button>
                        }
                      >
                          <ExcelSheet
                            data={this.state.Data}
                            name="DCI"
                          >
                            <ExcelColumn
                              label="Fullname"
                              value="Fullname"
                            />

                            <ExcelColumn label="Number" value="Number" />

                            <ExcelColumn
                              label="Commence date"
                              value="COM"
                            />

                            <ExcelColumn
                              label="Exam Date"
                              value="EOM"
                            />

                            <ExcelColumn
                              label="Transcript_status"
                              value="Transcript_status"
                            />
                             <ExcelColumn
                              label="Status"
                              value="Status"
                            />
                          </ExcelSheet>
                      </ExcelFile>
                    ) : null}
                    <br />
                    <p></p>
                  </div>
                  <div class="col-sm-10"style={{ overflow: "scroll" }}>
                  <h3 style={{ cursor: "pointer", color: "#1c84c6" }}>
                   Passport processing And Booking
                        {/* {dateFormat(
                          new Date(this.state.FromDate).toLocaleDateString(),
                          "fullDate"
                        )}{" "}
                        and{" "}
                        {dateFormat(
                          new Date(this.state.Todate).toLocaleDateString(),
                          "fullDate"
                        )} */}
                      </h3>
                      <table className="table table-bordered  table-sm">
                        <thead className="thead-light">
                          <th>No</th>
                          <th>Name</th>
                          <th>ID Number</th>
                          <th>Photo Capture Date</th>
                          <th>Status</th>
                          <th>Passport Number</th>
                          <th>Type</th>
                          <th>Collection Date</th>
                          <th>Cost</th>
                          <th>Location</th>
                          <th>Cost Incurred</th>
                        </thead>
                        {this.state.Data.map((r, i) => (
                          <tr>
                            <td
                              style={{ cursor: "pointer" }}
                              
                            >
                              {i + 1}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                              {r.Fullname}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                              {r.Number}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                              {new Date(r.POD).toLocaleDateString()}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                              {r.Status}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              
                            >
                              {r.PassPortNumber}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              
                            >
                              {r.PassportOption}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                                 {new Date(r.Passport_Collection_Date).toLocaleDateString()}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                              {r.Cost}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                              {r.Location}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                             
                            >
                              {r.CostIncurred}
                            </td>
                          </tr>
                        ))}
                      </table>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PassportCustom;

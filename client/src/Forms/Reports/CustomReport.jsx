import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import ReactExport from "react-data-export";
var jsPDF = require("jspdf");
require("jspdf-autotable");
var dateFormat = require("dateformat");
class CustomReport extends Component {
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
    fetch(
      "/api/CustomReport/" +
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
        value: "Closed",
        label: "Closed"
      },
      {
        value: "Pending Determination",
        label: "Pending Determination"
      },
      {
        value: "Withdrawn",
        label: "Withdrawn"
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
                  <h2>Customize your Report</h2>
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
                  <div class="col-sm-4 border border-success rounded">
                    <h3 style={{ color: "blue" }}>Select Columns</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="AllColumns"
                          type="checkbox"
                          name="AllColumns"
                          defaultChecked={this.state.AllColumns}
                          onChange={this.handleInputChange}
                        />{" "}
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          All Columns
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="TenderNo"
                          type="checkbox"
                          name="TenderNo"
                          defaultChecked={this.state.TenderNo}
                          onChange={this.handleInputChange}
                        />
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          TenderNo
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="TenderName"
                          type="checkbox"
                          name="TenderName"
                          defaultChecked={this.state.TenderName}
                          onChange={this.handleInputChange}
                        />{" "}
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          TenderName
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="TenderValue"
                          type="checkbox"
                          name="TenderValue"
                          defaultChecked={this.state.TenderValue}
                          onChange={this.handleInputChange}
                        />
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          TenderValue
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="FilingDate"
                          type="checkbox"
                          name="FilingDate"
                          defaultChecked={this.state.FilingDate}
                          onChange={this.handleInputChange}
                        />{" "}
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          Application FilingDate
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="ClosingDate"
                          type="checkbox"
                          name="ClosingDate"
                          defaultChecked={this.state.ClosingDate}
                          onChange={this.handleInputChange}
                        />
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          Application ClosingDate
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="PEName"
                          type="checkbox"
                          name="PEName"
                          defaultChecked={this.state.PEName}
                          onChange={this.handleInputChange}
                        />{" "}
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          PE
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="Applicant"
                          type="checkbox"
                          name="Applicant"
                          defaultChecked={this.state.Applicant}
                          onChange={this.handleInputChange}
                        />
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          Applicant
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="TenderTypeDesc"
                          type="checkbox"
                          name="TenderTypeDesc"
                          defaultChecked={this.state.TenderTypeDesc}
                          onChange={this.handleInputChange}
                        />{" "}
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          Tender Type
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="Timer"
                          type="checkbox"
                          name="Timer"
                          defaultChecked={this.state.Timer}
                          onChange={this.handleInputChange}
                        />
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          Application Timing
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="DecisionDate"
                          type="checkbox"
                          name="DecisionDate"
                          defaultChecked={this.state.DecisionDate}
                          onChange={this.handleInputChange}
                        />{" "}
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          DecisionDate
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="checkbox"
                          id="AwardDate"
                          type="checkbox"
                          name="AwardDate"
                          defaultChecked={this.state.AwardDate}
                          onChange={this.handleInputChange}
                        />
                        &nbsp;
                        <label htmlFor="All" className="font-weight-bold">
                          Occurrence of Breach
                        </label>
                      </div>
                    </div>
                    <h3 style={{ color: "blue" }}>Filter Criteria</h3>
                    <div className="row">
                      <div className="col-md-12">
                        <label for="ApplicantID" className="font-weight-bold ">
                          Application Status
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
                      Generate
                    </button>{" "}
                    {this.state.Applications.length > 0 ? (
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
                        {this.state.AllColumns ? (
                          <ExcelSheet
                            data={this.state.Applications}
                            name="Applications"
                          >
                            <ExcelColumn
                              label="ApplicationNo"
                              value="ApplicationNo"
                            />

                            <ExcelColumn label="TenderNo" value="TenderNo" />

                            <ExcelColumn
                              label="TenderName"
                              value="TenderName"
                            />

                            <ExcelColumn
                              label="TenderValue"
                              value="TenderValue"
                            />

                            <ExcelColumn
                              label="FilingDate"
                              value="FilingDate"
                            />

                            <ExcelColumn label="Status" value="Status" />

                            <ExcelColumn label="Applicant" value="Applicant" />

                            <ExcelColumn label="PEName" value="PEName" />

                            <ExcelColumn
                              label="ClosingDate"
                              value="ClosingDate"
                            />

                            <ExcelColumn label="Timer" value="Timer" />

                            <ExcelColumn
                              label="TenderType"
                              value="TenderTypeDesc"
                            />
                            <ExcelColumn
                              label="DecisionDate"
                              value="DecisionDate"
                            />
                            <ExcelColumn
                              label="Occurrence of Breach"
                              value="AwardDate"
                            />
                          </ExcelSheet>
                        ) : (
                          <ExcelSheet
                            data={this.state.Applications}
                            name="Applications"
                          >
                            <ExcelColumn
                              label="ApplicationNo"
                              value="ApplicationNo"
                            />
                            {this.state.TenderNo ? (
                              <ExcelColumn label="TenderNo" value="TenderNo" />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.TenderName ? (
                              <ExcelColumn
                                label="TenderName"
                                value="TenderName"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.TenderValue ? (
                              <ExcelColumn
                                label="TenderValue"
                                value="TenderValue"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.FilingDate ? (
                              <ExcelColumn
                                label="FilingDate"
                                value="FilingDate"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}

                            <ExcelColumn label="Status" value="Status" />
                            {this.state.Applicant ? (
                              <ExcelColumn
                                label="Applicant"
                                value="Applicant"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.PEName ? (
                              <ExcelColumn label="PEName" value="PEName" />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.ClosingDate ? (
                              <ExcelColumn
                                label="ClosingDate"
                                value="ClosingDate"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.Timer ? (
                              <ExcelColumn label="Timer" value="Timer" />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.TenderTypeDesc ? (
                              <ExcelColumn
                                label="TenderType"
                                value="TenderTypeDesc"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.DecisionDate ? (
                              <ExcelColumn
                                label="DecisionDate"
                                value="DecisionDate"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                            {this.state.AwardDate ? (
                              <ExcelColumn
                                label="Occurrence of Breach"
                                value="AwardDate"
                              />
                            ) : (
                              <ExcelColumn label="" value="" />
                            )}
                          </ExcelSheet>
                        )}
                      </ExcelFile>
                    ) : null}
                    <br />
                    <p></p>
                  </div>
                  <div class="col-sm-8" style={{ overflow: "scroll" }}>
                    {this.state.AllColumns ? (
                      <table className="table table-striped table-sm">
                        <thead className="thead-light">
                          <th>ApplicationNo</th>
                          <th>TenderNo</th>
                          <th>TenderName</th>
                          <th>TenderValue</th>
                          <th>FilingDate</th>
                          <th>Status</th>
                          <th>Applicant</th>
                          <th>PE</th>
                          <th> ClosingDate</th>
                          <th>Timer</th>
                          <th>TenderType </th>
                          <th>DecisionDate </th>
                          <th>Occurrence of Breach </th>
                        </thead>
                        {this.state.Applications.map((r, i) => (
                          <tr>
                            <td style={{ cursor: "pointer" }}>
                              {r.ApplicationNo}
                            </td>

                            <td style={{ cursor: "pointer" }}>{r.TenderNo}</td>
                            <td style={{ cursor: "pointer" }}>
                              {r.TenderName}
                            </td>
                            <td style={{ cursor: "pointer" }}>
                              {r.TenderValue}
                            </td>
                            <td style={{ cursor: "pointer" }}>
                              {r.FilingDate}
                            </td>
                            <td style={{ cursor: "pointer" }}>{r.Status}</td>
                            <td style={{ cursor: "pointer" }}>{r.Applicant}</td>
                            <td style={{ cursor: "pointer" }}>{r.PEName}</td>
                            <td style={{ cursor: "pointer" }}>
                              {r.ClosingDate}
                            </td>
                            <td style={{ cursor: "pointer" }}>{r.Timer}</td>
                            <td style={{ cursor: "pointer" }}>
                              {r.TenderTypeDesc}
                            </td>
                            <td style={{ cursor: "pointer" }}>
                              {r.DecisionDate}
                            </td>
                            <td style={{ cursor: "pointer" }}>{r.AwardDate}</td>
                          </tr>
                        ))}
                      </table>
                    ) : (
                      <table className="table table-borderless table-sm">
                        <thead className="thead-light">
                          <th>ApplicationNo</th>
                          {this.state.TenderNo ? <th>TenderNo</th> : null}
                          {this.state.TenderName ? <th>TenderName</th> : null}
                          {this.state.TenderValue ? <th>TenderValue</th> : null}
                          {this.state.FilingDate ? <th>FilingDate</th> : null}
                          <th>Status</th>
                          {this.state.Applicant ? <th>Applicant</th> : null}
                          {this.state.PEName ? <th>PE</th> : null}
                          {this.state.ClosingDate ? (
                            <th> ClosingDate</th>
                          ) : null}
                          {this.state.Timer ? <th>Timer</th> : null}
                          {this.state.TenderTypeDesc ? (
                            <th>TenderType </th>
                          ) : null}
                          {this.state.DecisionDate ? (
                            <th>DecisionDate </th>
                          ) : null}{" "}
                          {this.state.AwardDate ? (
                            <th>Occurrence of Breach </th>
                          ) : null}
                        </thead>
                        {this.state.Applications.map((r, i) => (
                          <tr>
                            <td style={{ cursor: "pointer" }}>
                              {r.ApplicationNo}
                            </td>

                            {this.state.TenderNo ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.TenderNo}
                              </td>
                            ) : null}
                            {this.state.TenderName ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.TenderName}
                              </td>
                            ) : null}
                            {this.state.TenderValue ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.TenderValue}
                              </td>
                            ) : null}
                            {this.state.FilingDate ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.FilingDate}
                              </td>
                            ) : null}
                            <td style={{ cursor: "pointer" }}>{r.Status}</td>
                            {this.state.Applicant ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.Applicant}
                              </td>
                            ) : null}
                            {this.state.PEName ? (
                              <td style={{ cursor: "pointer" }}>{r.PEName}</td>
                            ) : null}
                            {this.state.ClosingDate ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.ClosingDate}
                              </td>
                            ) : null}
                            {this.state.Timer ? (
                              <td style={{ cursor: "pointer" }}>{r.Timer}</td>
                            ) : null}
                            {this.state.TenderTypeDesc ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.TenderTypeDesc}
                              </td>
                            ) : null}
                            {this.state.DecisionDate ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.DecisionDate}
                              </td>
                            ) : null}
                            {this.state.AwardDate ? (
                              <td style={{ cursor: "pointer" }}>
                                {r.AwardDate}
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </table>
                    )}
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

export default CustomReport;

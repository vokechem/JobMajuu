import React, { Component } from "react";
import swal from "sweetalert";
var jsPDF = require("jspdf");
require("jspdf-autotable");
var dateFormat = require("dateformat");
class FeesReport extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      FromDate: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Todate: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Data: [],
      TotalFee: "",
      All: false,
      PEName: ""
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
    this.setState({ Data: [], TotalFee: "" });
    if (this.state.FromDate) {
      fetch(
        "/api/FeesReport/" +
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
            this.setState({
              Data: Applications,
              TotalFee: Applications[0].Total
            });
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

    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Application fees</h2>
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
                <div class="col-sm-12">
                  <table className="table table-borderless table-sm">
                    <thead className="thead-light">
                      <th>ApplicationNo</th>
                      <th>Applicant</th>
                      <th>Bill Date</th>
                      {/* <th>Date Approved</th>
                      <th>Approved By</th> */}
                      <th>Amount</th>
                    </thead>
                    {this.state.Data.map((r, i) => (
                      <tr>
                        <td style={{ cursor: "pointer" }}>{r.ApplicationNo}</td>

                        <td style={{ cursor: "pointer" }}>{r.Applicant}</td>
                        <td style={{ cursor: "pointer" }}>{r.BillDate}</td>
                        {/* <td style={{ cursor: "pointer" }}>{r.DateApproved}</td>
                        <td style={{ cursor: "pointer" }}>{r.ApprovedBy}</td> */}
                        <td style={{ cursor: "pointer" }}>
                          {this.formatNumber(r.Ampount)}
                        </td>
                      </tr>
                    ))}
                    <tfoot>
                      <th>TOTAL</th>
                      <th></th>
                      <th></th>
                      <th> {this.formatNumber(this.state.TotalFee)}</th>
                    </tfoot>
                  </table>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeesReport;

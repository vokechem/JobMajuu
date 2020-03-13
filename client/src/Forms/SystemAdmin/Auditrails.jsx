import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import ReactExport from "react-data-export";
var dateFormat = require("dateformat");
var jsPDF = require("jspdf");
require("jspdf-autotable");
class Auditrails extends Component {
  constructor() {
    super();
    this.state = {
      Auditrails: [],
      privilages: []
    };
  }
  exportpdf = () => {
    var columns = [
      { title: "Date", dataKey: "Date" },
      { title: "Username", dataKey: "Username" },
      { title: "Description", dataKey: "Description" },
      { title: "Category", dataKey: "Category" }
    ];
    let Rowdata1 = [];
    const rows = [...this.state.Auditrails];
    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
          Date: dateFormat(new Date(k.Date).toLocaleDateString(), "default"),
          Username: k.Username,
          Description: k.Description,
          Category: k.Category
        };
        Rowdata1.push(Rowdata);
      });
    }

    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, Rowdata1, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("AUDIT TRAILS", 40, 50);
      }
    });
    doc.save("ARCM AUDIT TRAILS.pdf");
  };
  ProtectRoute() {
    fetch("/api/UserAccess", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ privilages: data });
      })
      .catch(err => {
        //this.setState({ loading: false, redirect: true });
      });
    //end
  }
  validaterole = (rolename, action) => {
    let array = [...this.state.privilages];
    let AuditTrailsObj = array.find(obj => obj.RoleName === rolename);
    if (AuditTrailsObj) {
      if (action === "AddNew") {
        if (AuditTrailsObj.AddNew) {
          return true;
        } else {
          return false;
        }
      } else if (action === "View") {
        if (AuditTrailsObj.View) {
          return true;
        } else {
          return false;
        }
      } else if (action === "Edit") {
        if (AuditTrailsObj.Edit) {
          return true;
        } else {
          return false;
        }
      } else if (action === "Export") {
        if (AuditTrailsObj.Export) {
          return true;
        } else {
          return false;
        }
      } else if (action == "Remove") {
        if (AuditTrailsObj.Remove) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  fetchAuditrails = () => {
    fetch("/api/auditrails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Auditrails => {
        if (Auditrails.length > 0) {
          this.setState({ Auditrails: Auditrails });
        } else {
          swal("Oops!", Auditrails.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
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
              this.fetchAuditrails();
              this.ProtectRoute();
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

  render() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const ColumnData = [
      {
        label: "Date",
        field: "Date",
        sort: "asc",
        width: 200
      },
      {
        label: "Username",
        field: "Username",
        sort: "asc",
        width: 200
      },
      {
        label: "Description",
        field: "Description",
        sort: "asc",
        width: 200
      },
      {
        label: "Category",
        field: "Category",
        sort: "asc",
        width: 200
      }
    ];

    let Rowdata1 = [];

    const rows = [...this.state.Auditrails];

    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
          Date: dateFormat(new Date(k.Date), "isoDateTime"),
          Username: k.Username,
          Description: k.Description,
          Category: k.Category
        };
        Rowdata1.push(Rowdata);
      });
    }

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <h2>Audit Trails</h2>
              </li>
            </ol>
          </div>
          <div className="col-lg-2">
            <div className="row wrapper ">
              &nbsp; &nbsp;
              {this.validaterole("Audit Trails", "Export") ? (
                <button
                  onClick={this.exportpdf}
                  type="button"
                  style={{ marginTop: 40 }}
                  className="btn btn-primary float-left fa fa-file-pdf-o fa-2x"
                >
                  &nbsp;PDF
                </button>
              ) : null}
              &nbsp;
              {this.validaterole("Audit Trails", "Export") ? (
                <ExcelFile
                  element={
                    <button
                      type="button"
                      style={{ marginTop: 40 }}
                      className="btn btn-primary float-left fa fa-file-excel-o fa-2x"
                    >
                      &nbsp; Export
                    </button>
                  }
                >
                  <ExcelSheet data={Rowdata1} name="Auditrails">
                    <ExcelColumn label="AuditID" value="AuditID" />
                    <ExcelColumn label="Date" value="Date" />
                    <ExcelColumn label="Username" value="Username" />
                    <ExcelColumn label="Description" value="RoleDescription" />
                    <ExcelColumn label="Category" value="Category" />
                  </ExcelSheet>
                </ExcelFile>
              ) : null}
            </div>
          </div>
        </div>

        <TableWrapper>
          <Table Rows={Rowdata1} columns={ColumnData} />
        </TableWrapper>
      </div>
    );
  }
}

export default Auditrails;

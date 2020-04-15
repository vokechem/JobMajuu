import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import Select from "react-select";
import { Progress } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactExport from "react-data-export";
var dateFormat = require("dateformat");
var jsPDF = require("jspdf");
require("jspdf-autotable");
class Ticketing extends Component {
  constructor() {
    super();
    this.state = {
    Ticketing: [],
      Registration:[],
      privilages: [],
      profile: true,
      IDNumber: "",
      FullName:"",
      Phone:"",
      Number:"",
      Ticket_status:"",
      Flight_Date:"",
      Destination:"",
      Airline:"",
      Cost:"",
      ID:"",
      isUpdate: false,
      selectedFile: null
    };

    this.Resetsate = this.Resetsate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  showDiv() {
    document.getElementById("nav-profile-tab").click();
  }
  handleswitchMenu = e => {
    e.preventDefault();
    if (this.state.profile === false) {
      this.setState({ profile: true });
    } else {
      this.setState({ profile: false });
    }

    //this.setnewstate();
  };
  handleSelectChange = (Facility, actionMeta) => {
    if (actionMeta.name == "MedicalFacility") {
      this.setState({ MedID: Facility.value });
      this.setState({ [actionMeta.name]: Facility.label });
    } else {
      this.setState({ IDNumber: Facility.value });
      this.setState({ [actionMeta.name]: Facility.label });
    }
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
  handleInputChange = event => {
    // event.preventDefault();
    // this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "PostalCode") {
      this.fetchTown(value);
    }
    this.setState({ [name]: value });
  };
  Resetsate() {
    const data = {
        Number:"",
        Ticket_status:"",
        Flight_Date:"",
        Destination:"",
        Airline:"",
        Cost:"",
        ID:"",
      isUpdate: false,    
    };
    this.setState(data);
  }
   fetchTicketing= () => {
    fetch("/api/Ticketing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Ticketing => {
        if (Ticketing.length > 0) {
          this.setState({ Ticketing: Ticketing });
        } else {
          swal("Oops!", Ticketing.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  componentWillUnmount() {}
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
              this.fetchTicketing();
              this.fetchRegistration();
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
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      Number: this.state.Number,
      Ticket_status: this.state.Ticket_status,
      Flight_Date:this.state.Flight_Date,
      Destination:this.state.Destination,
      Airline:this.state.Airline, 
      Cost:this.state.Cost,
      
    };
    if (this.state.isUpdate) {
      this.UpdateData("/api/Ticketing/" + this.state.ID, data);
    } else {
      this.postData("/api/Ticketing", data);
    }
  };
  handleEdit =  Ticketing => {
    const data = {
      Number:  Ticketing.Number,
      Ticket_status:  Ticketing.Ticket_status,
      Flight_Date: dateFormat(
        new Date( Ticketing.Flight_Date).toLocaleDateString(),
        "isoDate"
      ),
      Destination:  Ticketing.Destination,
      Airline:  Ticketing.Airline,
      Cost:  Ticketing.Cost,
      ID:Ticketing.ID
    };
    this.setState(data);
    if (this.state.profile === false) {
      this.setState({ profile: true });
    } else {
      this.setState({ profile: false });
    }
    this.setState({ isUpdate: true });
  };
  exportpdf = () => {
      
    var columns = [

      { title: "Fullname", dataKey: "Fullname" },
      { title: "IDNumber", dataKey: "IDNumber" },
      { title: "Flight_Date", dataKey: "Flight_Date" },
      { title: "Destination", dataKey: "Destination" },
      { title: "Airline", dataKey: "Airline" },
      { title: "Cost", dataKey: "Cost" },
    
    ];

    const rows = [...this.state.Ticketing];

    var doc = new jsPDF("p", "pt", "a2", "portrait");

    doc.autoTable(columns, rows, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("RMS Ticketing Clearance", 40, 50);
      }
    });
    doc.save("RMS Ticketing.pdf");
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
  handleDelete = k => {
    swal({
      
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/Ticketing/" + k, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                swal("", "Record has been deleted!", "success");
                this.Resetsate();
              } else {
                swal("", data.message, "error");
              }
              this.fetchTicketing();
            })
          )
          .catch(err => {
            swal("", err.message, "error");
          });
      }
    });
  };
  UpdateData(url = ``, data = {}) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          this.fetchTicketing();

          if (data.success) {
            swal("", "Record has been Updated!", "success");
            this.Resetsate();
            if (this.state.profile === false) {
              this.setState({ profile: true });
            } else {
              this.setState({ profile: false });
            }
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  postData(url = ``, data = {}) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          this.fetchTicketing();

          if (data.success) {
            swal("", "Record has been saved!", "success");
            this.setState({ open: false });
            if (this.state.profile === false) {
              this.setState({ profile: true });
            } else {
              this.setState({ profile: false });
            }
            this.Resetsate();
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  render() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const Registration = [...this.state.Registration].map((k, i) => {
      return {
        value: k.IDNumber,
        label: k.IDNumber
      };
    });
    let Transcriptstatus = [
      {
        value: "Booked",
        label: "Booked"
      },
      {
        value: "pending",
        label: "pending"
      },
    ];
    const ColumnData = [
      {
        label: "Fullname",
        field: "Fullname",
        sort: "asc",
        width: 200
      },
      {
        label: "IDNumber",
        field: "IDNumber",
        sort: "asc",
        width: 200
      },
      {
        label: "Ticket status",
        field: "Ticket_status",
        sort: "asc",
        width: 200
      },
      {
        label: "Ticket Date",
        field: "Flight_Date",
        sort: "asc",
        width: 200
      },
      {
        label: "Destination ",
        field: "Destination",
        sort: "asc",
        width: 200
      },
      {
        label: "Airline ",
        field: "Airline",
        sort: "asc",
        width: 200
      },
      {
        label: "Cost",
        field: "Cost",
        sort: "asc",
        width: 200
      },
      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];
    const rows = [...this.state.Ticketing];
    if (rows.length > 0) {
      rows.map((k, i) => {
        let Rowdata = {
          Fullname: k.Fullname,
          IDNumber: k.IDNumber,
          Flight_Date: new Date(k.Flight_Date).toLocaleDateString(),
          Ticket_status:k.Ticket_status,
          Destination:k.Destination,
          Airline:k.Airline,
          Cost:k.Cost,
          action: (
            <span>
              <a
                className="fa fa-edit"
                style={{ color: "#007bff" }}
                onClick={e => this.handleEdit(k, e)}
              >
                {" "}
                Edit
              </a>
              |{" "}
              <a
                className="fa fa-trash"
                style={{ color: "#f44542" }}
                onClick={e => this.handleDelete(k.ID, e)}
              >
                {" "}
                Delete
              </a>
            </span>
          )
        };
        Rowdata1.push(Rowdata);
      });
    }
    let Signstyle = {
      height: 100,
      width: 150
    };
    let divconatinerstyle = {
      width: "95%",
      margin: "0 auto",
      backgroundColor: "white"
    };
    let formcontainerStyle = {
      border: "1px solid grey",
      "border-radius": "10px"
    };
    let FormStyle = {
      margin: "20px"
    };
    if (this.state.profile) {
      return (
        <div>
          <div>
            <div className="row wrapper border-bottom white-bg page-heading">
              <div className="col-lg-9">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <h2>Ticketing</h2>
                  </li>
                </ol>
              </div>
              <div className="col-lg-3">
                <div className="row wrapper ">
                  {this.validaterole("Ticketing", "AddNew") ? (
                    <button
                      type="button"
                      style={{ marginTop: 40 }}
                      onClick={this.handleswitchMenu}
                      className="btn btn-primary float-right fa fa-plus"
                    >
                      &nbsp; New
                    </button>
                  ) : null}
                  &nbsp;
                  {this.validaterole("Ticketing", "Export") ? (
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
                  {this.validaterole("Ticketing", "Export") ? (
                    <ExcelFile
                      element={
                        <button
                          type="button"
                          style={{ marginTop: 40 }}
                          className="btn btn-primary float-left fa fa-file-excel-o fa-2x"
                        >
                          &nbsp; Excel
                        </button>
                      }
                      
                    >
                      <ExcelSheet data={rows} name="Ticketing">
                        <ExcelColumn label="Fullname" value="Fullname" />
                        <ExcelColumn label="IDNumber" value="IDNumber" />
                        <ExcelColumn label="Flignt_Date" value="Flignt_Date" />
                        <ExcelColumn label="Flight_status" value="Ticket_status" />
                        <ExcelColumn label="Destination" value="Destination" />
                        <ExcelColumn label="Airline" value="Airline" />
                        <ExcelColumn label="Cost" value="Cost"/>
                      </ExcelSheet>
                    </ExcelFile>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <TableWrapper>
            <Table Rows={Rowdata1} columns={ColumnData} />
          </TableWrapper>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Ticketing</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-2">
              <div className="row wrapper ">
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.handleswitchMenu}
                  className="btn btn-primary"
                >
                  &nbsp; Back
                </button>
              </div>
            </div>
          </div>
          <br />
          <div style={divconatinerstyle}>
            <ToastContainer />
            <div style={formcontainerStyle}>
              <div class="col-sm-12">
                <form style={FormStyle} onSubmit={this.handleSubmit}>
                  <div class="row">
                    <div class="col-sm-1">
                      <label for="Number" className="font-weight-bold">
                       ID Number
                      </label>
                    </div>
                    <div class="col-sm-5">
                      <Select
                        name="Number"
                        value={Registration.filter(
                          option => option.label === this.state.Number
                        )}
                        onChange={this.handleSelectChange}
                        options={Registration}
                        required
                      />
                    </div>
                    <div class="col-sm-1">
                      <label for="PEType" className="font-weight-bold">
                   Ticket Date
                      </label>
                    </div>
                    <div class="col-sm-5">
                      <input
                        type="date"
                        class="form-control"
                        name="Flight_Date"
                        onChange={this.handleInputChange}
                        value={this.state.Flight_Date}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <div class="row">
                    <div class="col-sm-1">
                      <label for="PEType" className="font-weight-bold">
                    Flight Status
                      </label>
                    </div>
                    <div class="col-sm-5">
                      <Select
                        name="Ticket_status"
                        value={Transcriptstatus.filter(
                          option => option.label === this.state.Ticket_status
                        )}
                        onChange={this.handleSelectChange}
                        options={Transcriptstatus}
                        required
                      />
                    </div>
                    <div class="col-sm-1">
                      <label for="PEType" className="font-weight-bold">
                       Destination
                      </label>
                    </div>
                    <div class="col-sm-5">
                      <input
                        type="text"
                        class="form-control"
                        name="Destination"
                        onChange={this.handleInputChange}
                        value={this.state.Destination}
                        required
                      />
                    </div>
                  </div>
                  <br/>
                  <div class="row">
                  <div class="col-sm-1">
                      <label for="PEType" className="font-weight-bold">
                       Airline
                      </label>
                    </div>
                    <div class="col-sm-5">
                      <input
                        type="text"
                        class="form-control"
                        name="Airline"
                        onChange={this.handleInputChange}
                        value={this.state.Airline}
                        required
                      />
                    </div>
                    <div class="col-sm-1">
                      <label for="PEType" className="font-weight-bold">
                       Cost
                      </label>
                    </div>
                    <div class="col-sm-5">
                      <input
                        type="number"
                        class="form-control"
                        name="Cost"
                        onChange={this.handleInputChange}
                        value={this.state.Cost}
                        required
                      />
                    </div>
                    </div>
                  <br/>
                  <div className=" row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8" />
                    <div className="col-sm-2">
                      <button
                        className="btn btn-primary float-right"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Ticketing;

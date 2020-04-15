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
class Passport extends Component {
  constructor() {
    super();
    this.state = {
     Passport: [],
      Registration:[],
      privilages: [],
      profile: true,
      Number:"",
      POD:"" ,
     Tracking_Number:"" ,
     Status:"",
     Passport_Collection_Date:"",
    PassPortNumber:"" ,
     Cost:"",
     Location:"",
   CostIncurred:"",
   PassportOption:"",
    ID: "",
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
        POD:"" ,
        Tracking_Number:"" ,
        Status:"",
        Passport_Collection_Date:"",
        PassPortNumber:"" ,
        PassportOption:"",
        Cost:"",
        Location:"",
        CostIncurred:"",
        ID: "",
    };
    this.setState(data);
  }
  fetchPassport = () => {
    this.setState({ Passport: [] });
    fetch("/api/Passport", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(Passport => {
            if (Passport.length > 0) {
                this.setState({ Passport: Passport });
            } else {
                swal("", Passport.message, "error");
            }
        })
        .catch(err => {
            swal("", err.message, "error");
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
              this.fetchPassport();
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
        POD: this.state.POD,
        Tracking_Number: this.state.Tracking_Number,
        Status:this.state.Status,
        Passport_Collection_Date: this.state.Passport_Collection_Date,
        PassPortNumber:this.state.PassPortNumber,
        PassportOption:this.state.PassportOption,
        Cost:this.state.Cost,   
        CostIncurred:this.state.CostIncurred,
        Location:this.state.Location,
    };

    if (this.state.isUpdate) {
      this.UpdateData("/api/Passport/" + this.state.ID, data);
    } else {
      this.postData("/api/Passport", data);
    }
  };
  handleEdit = Name => {
    const data = {
        Number: Name.Number,
        POD: dateFormat(
            new Date(Name.POD).toLocaleDateString(),
            "isoDate"
          ),
        Tracking_Number: Name.Tracking_Number,
        Status: Name.Status,
        Passport_Collection_Date: dateFormat(
            new Date(Name.Passport_Collection_Date).toLocaleDateString(),
            "isoDate"
          ),
        PassPortNumber:Name.PassPortNumber,
        PassportOption:Name.PassportOption,
        Cost:Name.Cost,
        CostIncurred:Name.CostIncurred,
        Location:Name.Location,
        ID:Name.ID
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
      { title: "Cost", dataKey: "Cost" },
      { title: "POD", dataKey: "POD" },
      { title: "PassPortNumber", dataKey: "PassPortNumber" },
      { title: "Status", dataKey: "Status" },
      { title: "Option", dataKey: "PassportOption" },
      { title: "Tracking_Number", dataKey: "Tracking_Number" },
      { title: "Location", dataKey: "Location" },
    
    ];

    const rows = [...this.state.Passport];

    var doc = new jsPDF("p", "pt", "a2", "portrait");

    doc.autoTable(columns, rows, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("Rms Passport processing and booking", 40, 50);
      }
    });
    doc.save("RMS passport processsing and booking.pdf");
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
        return fetch("/api/Passport/" + k, {
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
              this.fetchPassport();
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
          this.fetchPassport();

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
          this.fetchPassport();

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
        value: "issued",
        label: "issued"
      },
      {
        value: "pending",
        label: "pending"
      },
    ];
    let PassportOption = [
      {
        value: "New",
        label: "New"
      },
      {
        value: "Lost",
        label: "Lost"
      },
    ];
    let CertificateProcessing = [
        {
          value: "Collected",
          label: "Collected"
        },
        {
          value: "Processing",
          label: "Processing"
        },
  
      ];
    const ColumnData = [
        {
          label: "Fullname",
          field: "Fullname",
          sort: "asc"
        },
        {
          label: "IDNumber",
          field: "IDNumber",
          sort: "asc"
        },  
        {
            label: "Photo Capture Date",
            field: "POD",
            sort: "asc"
          },
          {
            label: "Type",
            field: "PassportOption",
            sort: "asc"
          },
          {
            label: "Status",
            field: "Status",
            sort: "asc"
          },
        {
          label: "Passport Collection Date",
          field: "Passport_Collection_Date",
          sort: "asc"
        },
        {
          label: "Passport Number",
          field: "PassPortNumber",
          sort: "asc"
        },
        {
            label: "Tracking Number",
            field: "Tracking_Number",
            sort: "asc"
          },
          {
            label: "Location",
            field: "Location",
            sort: "asc"
          },
        {
          label: "action",
          field: "action",
          sort: "asc",
          width: 200
        }
      ];
    let Rowdata1 = [];
    const rows = [...this.state.Passport];
    if (rows.length > 0) {
      rows.map((k, i) => {
        let Rowdata = {
            Fullname: k.Fullname,
            IDNumber: k.IDNumber,
            Passport: k.Passport,
            POD: new Date(k.POD).toLocaleDateString(),
            Tracking_Number:k.Tracking_Number,
            Passport_Collection_Date: new Date(k.Passport_Collection_Date).toLocaleDateString(),
            Status:k.Status,
            Location:k.Location,
            PassportOption:k.PassportOption,
            PassPortNumber:k.PassPortNumber,
            CostIncurred:k.CostIncurred,
            Cost:k.Cost,
            ID:k.ID,
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
                    <h2>Passport processing</h2>
                  </li>
                </ol>
              </div>
              <div className="col-lg-3">
                <div className="row wrapper ">
                  {this.validaterole("Passport processing", "AddNew") ? (
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
                  {this.validaterole("Passport processing", "Export") ? (
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
                  {this.validaterole("Passport processing", "Export") ? (
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
                      <ExcelSheet data={rows} name="Passport processing">
                        <ExcelColumn label="Fullname" value="Fullname" />
                        <ExcelColumn label="IDNumber" value="IDNumber" />
                        <ExcelColumn label="DOT" value="DOT" />
                        <ExcelColumn label="Cost" value="Cost" />
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
                  <h2>Passport processing</h2>
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
                    <div class="col-sm-2">
                      <label for="Number" className="font-weight-bold">
                       ID Number
                      </label>
                    </div>
                    <div class="col-sm-4">
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
                    <div class="col-sm-2">
                      <label for="PEType" className="font-weight-bold">
                        Photo capture date
                      </label>
                    </div>
                    <div class="col-sm-4">
                      <input
                        type="date"
                        class="form-control"
                        name="POD"
                        onChange={this.handleInputChange}
                        value={this.state.POD}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <div class="row">
                    <div class="col-sm-2">
                      <label for="PEType" className="font-weight-bold">
                 Passport Status
                      </label>
                    </div>
                    <div class="col-sm-4">
                      <Select
                        name="Status"
                        value={CertificateProcessing.filter(
                          option => option.label === this.state.Status
                        )}
                        onChange={this.handleSelectChange}
                        options={CertificateProcessing}
                        required
                      />
                    </div>
                    <div class="col-sm-2">
                      <label for="PEType" className="font-weight-bold">
                        Passport Collection Date
                      </label>
                    </div>
                    <div class="col-sm-4">
                      <input
                        type="date"
                        class="form-control"
                        name="Passport_Collection_Date"
                        onChange={this.handleInputChange}
                        value={this.state.Passport_Collection_Date}
                        required
                      />
                    </div>
                  </div>
                  <br/>
                  <div class="row">
                  <div class="col-sm-2">
                      <label for="PEType" className="font-weight-bold">
                        passport Number
                      </label>
                    </div>
                    <div class="col-sm-3">
                      <input
                        type="text"
                        class="form-control"
                        name="PassPortNumber"
                        onChange={this.handleInputChange}
                        value={this.state.PassPortNumber}
                        required
                      />
                    </div>
                  <div class="col-sm-1">
                      <label for="PEType" className="font-weight-bold">
                        Tracking Number
                      </label>
                    </div>
                    <div class="col-sm-2">
                      <input
                        type="text"
                        class="form-control"
                        name="Tracking_Number"
                        onChange={this.handleInputChange}
                        value={this.state.Tracking_Number}
                        required
                      />
                    </div>
                   
                    <div class="col-sm-2">
                      <label for="PEType" className="font-weight-bold">
                        Location
                      </label>
                    </div>
                    <div class="col-sm-2">
                      <input
                        type="text"
                        class="form-control"
                        name="Location"
                        onChange={this.handleInputChange}
                        value={this.state.Location}
                        required
                      />
                    </div>
                  </div>
                  <br/>
                  <div class="row">
                  <div class="col-sm-2">
                      <label for="PEType" className="font-weight-bold">
                        passport Option
                      </label>
                    </div>
                    <div class="col-sm-3">
                    <Select
                        name="PassportOption"
                        value={PassportOption.filter(
                          option => option.label === this.state.PassportOption
                        )}
                        onChange={this.handleSelectChange}
                        options={PassportOption}
                        required
                      />
                    </div>
                    <div class="col-sm-1">
                      <label for="PEType" className="font-weight-bold">
                        Cost
                      </label>
                    </div>
                    <div class="col-sm-2">
                      <input
                        type="text"
                        class="form-control"
                        name="Cost"
                        onChange={this.handleInputChange}
                        value={this.state.Cost}
                        required
                      />
                    </div>
                    <div class="col-sm-2">
                      <label for="PEType" className="font-weight-bold">
                        Cost incurred
                      </label>
                    </div>
                    <div class="col-sm-2">
                      <input
                        type="text"
                        class="form-control"
                        name="CostIncurred"
                        onChange={this.handleInputChange}
                        value={this.state.CostIncurred}
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

export default Passport;

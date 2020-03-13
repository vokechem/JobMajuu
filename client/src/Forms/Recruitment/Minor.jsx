import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Redirect } from "react-router-dom";
import ReactExport from "react-data-export";
import Modal from "react-awesome-modal";
import decode from "jwt-decode";
import Select from "react-select";
import { Progress } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
var jsPDF = require("jspdf");
require("jspdf-autotable");
class Minor  extends Component {
  constructor() {
    super();

    let token = localStorage.getItem("token");
    let loggedin = true;
    if (token == null) {
      loggedin = false;
    }
    try {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) {
        loggedin = false;
      }
    } catch (error) {
      loggedin = false;
    }

    this.state = {
      loggedin,
      Minor: [],
      Facility: [],
      Registration:[],
      applicant:"",
      medical:"",
      IDNumber: "",
      FullName:"",
      Phone:"",
      DOM:"",
      MFID:"",
      Cost:"500",
      Resuit:"",
      ID: "",
      open: false,
      loading: true,
      privilages: [],
      redirect: false,
      isUpdate: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.Resetsate = this.Resetsate.bind(this);
  }
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

  openModal() {
    this.setState({ open: true });
    this.Resetsate();
  }
  closeModal = () => {
    this.setState({ open: false });
  };
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  Resetsate() {
    const data = {
        IDNumber: "",
        applicant:"",
        medical:"",
        DOM:"",
        MFID:"",
        Cost:"",
        Resuit:"",
        ID: "",
      isUpdate: false
    };
    this.setState(data);
  }
  handleSelectChange = (medical, actionMeta) => {
    if (actionMeta.name === "medical") {
      this.setState({ ID: medical.value });
      this.setState({ [actionMeta.name]: medical.label });
    } else {
      this.setState({ [actionMeta.name]: medical.value });
    }
  };
  fetchFacility = () => {
    fetch("/api/Facility", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Facility => {
        if (Facility.length > 0) {
          this.setState({ Facility: Facility });
        } else {
          swal("Oops!", Facility.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
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
          swal("Oops!", Registration.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  fetchMinor = () => {
    fetch("/api/Minor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(Minor => {
      if (Minor.length > 0) {
        this.setState({ Minor: Minor });
      } else {
        swal("Oops!", Minor.message, "error");
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
              this.fetchMinor();
              this.fetchRegistration();
              this.fetchFacility();
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
      applicant: this.state.applicant,
      DOM: this.state.DOM,
      medical:this.state.medical,
      Result:this.state.Resuit,
      Cost:this.state.Cost,
    };

    if (this.state.isUpdate) {
      this.UpdateData("/api/Minor/" + this.state.ID, data);
    } else {
      this.postData("/api/Minor", data);
    }
  };
  handleEdit = Minor => {
    const data = {
      IDNumber: Minor.IDNumber,
      DOM: Minor.DOM,
      MFID: Minor.MFID,
      Rsult:Minor.Result,
      Cost:Minor.Result,
    };

    this.setState(data);
    this.setState({ open: true });
    this.setState({ isUpdate: true });
  };

  handleDelete = k => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/Minor/" + k, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                swal("Deleted!", "Record has been deleted!", "success");
                this.Resetsate();
              } else {
                swal("error!", data.message, "error");
              }
              this.fetchMinor();
            })
          )
          .catch(err => {
            swal("Oops!", err.message, "error");
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
          this.fetchMinor();

          if (data.success) {
            swal("Saved!", "Record has been Updated!", "success");
            this.Resetsate();
          } else {
            swal("Saved!", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
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
          this.fetchMinor();

          if (data.success) {
            swal("Saved!", "Record has been saved!", "success");
            this.Resetsate();
          } else {
            swal("Saved!", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  }
  exportpdf = () => {
    var columns = [
      { title: "Name", dataKey: "Name" },
      { title: "Description", dataKey: "Description" }
    ];

    const data = [...this.state.Minor];
    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, data, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("SYSTEM SECURITY ROLES", 40, 50);
      }
    });
    doc.save("ArcmRoles.pdf");
  };
  render() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const ColumnData = [
      {
        label: "Full Name",
        field: "FullName",
        sort: "asc",
        width: 200
      },
      {
        label: "ID Number",
        field: "IDNumber",
        sort: "asc",
        width: 200
      },
      {
        label: "Phone",
        field: "Phone",
        sort: "asc",
        width: 200
      },
      {
        label: "Date Of Medical",
        field: "DOM",
        sort: "asc",
        width: 200
      },
      {
        label: "Medical Facility",
        field: "MFID",
        sort: "asc",
        width: 200
      },
      {
        label: "Medical Result",
        field: "Result",
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

    const rows = [...this.state.Minor];

    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
          FullName: k.FullName,
          IDNumber: k.IDNumber,
          Phone:k.Phone,
          DOM:k.DOM,
          MFID:k.MFID,
          Result:k.Result,
          action: (
            <span>
              {this.validaterole("Minor Medical", "Edit") ? (
                <a
                  className="fa fa-edit"
                  style={{ color: "#007bff" }}
                  onClick={e => this.handleEdit(k, e)}
                >
                  Edit |
                </a>
              ) : (
                <i>-</i>
              )}
              &nbsp;
              {this.validaterole("Minor Medical", "Remove") ? (
                <a
                  className="fa fa-trash"
                  style={{ color: "#f44542" }}
                  onClick={e => this.handleDelete(k.RoleID, e)}
                >
                  Delete
                </a>
              ) : (
                <i>-</i>
              )}
            </span>
          )
        };
        Rowdata1.push(Rowdata);
      });
    }
    const applicantOptions = [...this.state.applicant].map((k, i) => {
        return {
          value: k.IDNumber,
          label: k.FullName
        };
      });
      const medicalOptions = [...this.state.medical].map((k, i) => {
        return {
          value: k.ID,
          label: k.Name
        };
      });
      let GenderCategories = [
        {
          value: "Pass",
          label: "Pass"
        },
        {
          value: "Fail",
          label: "Fail"
        }
      ];
    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Minor medical</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-3">
              <div className="row wrapper ">
                {this.validaterole("Minor Medical", "AddNew") ? (
                  <button
                    type="button"
                    style={{ marginTop: 40 }}
                    onClick={this.openModal}
                    className="btn btn-primary float-left fa fa-plus"
                  >
                    New
                  </button>
                ) : null}
                &nbsp;
                {this.validaterole("Minor Medical", "Export") ? (
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
                {this.validaterole("Minor Medical", "Export") ? (
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
                    <ExcelSheet data={rows} name="Roles">
                      <ExcelColumn label="RoleID" value="RoleID" />
                      <ExcelColumn label="RoleName" value="RoleName" />
                      <ExcelColumn
                        label="Description"
                        value="RoleDescription"
                      />
                    </ExcelSheet>
                  </ExcelFile>
                ) : null}
                &nbsp; &nbsp;
                <Modal
                  visible={this.state.open}
                  width="700"
                  height="350"
                  effect="fadeInUp"
                  onClickAway={() => this.closeModal()}
                >
                  <a
                    style={{ float: "right", color: "red", margin: "10px" }}
                    href="javascript:void(0);"
                    onClick={() => this.closeModal()}
                  >
                    <i class="fa fa-close"></i>
                  </a>
                  <div>
                    <h4 style={{ "text-align": "center", color: "#1c84c6" }}>
                      {" "}
                      Minor Medical 
                    </h4>
                    <div className="container-fluid">
                      <div className="col-sm-12">
                        <div className="ibox-content">
                          <form onSubmit={this.handleSubmit}>
                          <div class="row">
                              <div class="col-sm-6">
                                <label
                                  for="Username"
                                  className="font-weight-bold"
                                >
                                  ID Number{" "}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="IDnumber"
                                  id="IDnumber"
                                  required
                                  onChange={this.handleInputChange}
                                  value={this.state.IDnumber}
                                />
                              </div>
                              <div class="col-sm-6">
                                <label
                                  for="Username"
                                  className="font-weight-bold"
                                >
                                  DOB{" "}
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  defaultValue={this.state.DOB}
                                  required
                                  className="form-control"
                                  onChange={this.handleInputChange}
                                  id="DOB"
                                />
                              </div>
                            </div>
                            <div className=" row">
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <label
                                    htmlFor="Datereceived"
                                    className="font-weight-bold"
                                  >
                                    Security Group
                                  </label>
                                  <Select
                                    name="UserGroup"
                                    value={UserGroupsOptions.filter(
                                      option =>
                                        option.label === this.state.UserGroup
                                    )}
                                    onChange={this.handleSelectChange}
                                    options={UserGroupsOptions}
                                    required
                                  />
                                </div>
                              </div>
                              {/* <div className="col-sm-2">
                                <div className="form-group">
                                  <br />
                                  <br />
                                  <input
                                    className="checkbox"
                                    id="Board"
                                    type="checkbox"
                                    name="Board"
                                    defaultChecked={this.state.Board}
                                    onChange={this.handleInputChange}
                                  />{" "}
                                  <label
                                    htmlFor="Board"
                                    className="font-weight-bold"
                                  >
                                    Board
                                  </label>
                                </div>
                              </div> */}
                              <div class="col-sm-4">
                                <label
                                  for="Username"
                                  className="font-weight-bold"
                                >
                                  Gender{" "}
                                </label>
                                <Select
                                  name="Gender"
                                  value={GenderCategories.filter(
                                    option => option.label === this.state.Gender
                                  )}
                                  onChange={this.handleSelectChange}
                                  options={GenderCategories}
                                  required
                                />
                              </div>
                              <div className="col-sm-2">
                                <div className="form-group">
                                  <br />
                                  <br />
                                  <input
                                    className="checkbox"
                                    id="IsActive"
                                    type="checkbox"
                                    name="IsActive"
                                    defaultChecked={this.state.IsActive}
                                    onChange={this.handleInputChange}
                                  />{" "}
                                  <label
                                    htmlFor="Active"
                                    className="font-weight-bold"
                                  >
                                    Active
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-12 ">
                              <div className=" row">
                                <div className="col-sm-2">
                                  <button
                                    className="btn btn-danger float-left"
                                    onClick={this.closeModal}
                                  >
                                    Cancel
                                  </button>
                                </div>
                                <div className="col-sm-8" />
                                <div className="col-sm-2">
                                  <button
                                    type="submit"
                                    className="btn btn-primary float-left"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>

        <TableWrapper>
          <Table Rows={Rowdata1} columns={ColumnData} id="my-table" />
        </TableWrapper>
      </div>
    );
  }
}

export default Minor;

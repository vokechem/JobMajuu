import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Redirect } from "react-router-dom";
import ReactExport from "react-data-export";
import Modal from "react-awesome-modal";
import decode from "jwt-decode";
var jsPDF = require("jspdf");
require("jspdf-autotable");
class Facility extends Component {
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
      Facility: [],
      Name: "",
      Description: "",
      MedID: "",
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
      Name: "",
      Description: "",
      ID: "",
      isUpdate: false
    };
    this.setState(data);
  }

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
      Name: this.state.Name,
      Description: this.state.Description
    };

    if (this.state.isUpdate) {
      this.UpdateData("/api/Facility/" + this.state.MedID, data);
    } else {
      this.postData("/api/Facility", data);
    }
  };
  handleEdit = Facility => {
    const data = {
      Name: Facility.Name,
      Description: Facility.Description,
      MedID: Facility.MedID
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
        return fetch("/api/Facility/" + k, {
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
              this.fetchFacility();
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
          this.fetchFacility();

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
          this.fetchFacility();

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

    const data = [...this.state.Facility];
    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, data, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("Medical Facility", 40, 50);
      }
    });
    doc.save("RMSMedicalFacility.pdf");
  };
  render() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const ColumnData = [
      {
        label: "Name",
        field: "Name",
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
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];

    const rows = [...this.state.Facility];

    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
          Name: k.Name,
          Description: k.Description,

          action: (
            <span>
              {this.validaterole("Facility", "Edit") ? (
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
              {this.validaterole("Facility", "Remove") ? (
                <a
                  className="fa fa-trash"
                  style={{ color: "#f44542" }}
                  onClick={e => this.handleDelete(k.MedID, e)}
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

    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Medical Facilities</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-3">
              <div className="row wrapper ">
                {this.validaterole("Facility", "AddNew") ? (
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
                {this.validaterole("Facility", "Export") ? (
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
                {this.validaterole("Facility", "Export") ? (
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
                    <ExcelSheet data={rows} name="Facility">
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
                  height="250"
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
                      Security Role
                    </h4>
                    <div className="container-fluid">
                      <div className="col-sm-12">
                        <div className="ibox-content">
                          <form onSubmit={this.handleSubmit}>
                            <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Name{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="Name"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Name}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Name"
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputPassword1">
                                    Description
                                  </label>
                                  <textarea
                                    onChange={this.handleInputChange}
                                    value={this.state.Description}
                                    type="text"
                                    required
                                    name="Description"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Description"
                                  />
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

export default Facility;

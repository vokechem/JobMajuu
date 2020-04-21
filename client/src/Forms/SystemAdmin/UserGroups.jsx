import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
import ReactExport from "react-data-export";
var jsPDF = require("jspdf");
require("jspdf-autotable");
var _ = require("lodash");
class UserGroups extends Component {
  constructor() {
    super();
    this.state = {
      Usergroups: [],
      privilages: [],
      Name: "",
      Description: "",
      UserGroupID: "",
      open: false,
      isUpdate: false,
      RolesPoup: false,
      Roles: [],
      AdminCategory: [],
      SystemparameteresCategory: [],
      Menus:[],
      RecruitmentCategory: [],
      ReportsCategory: [],
      AnalyticsCategory: []
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.Resetsate = this.Resetsate.bind(this);
    this.closeRolesPoup = this.closeRolesPoup.bind(this);
  }
  exportpdf = () => {
    var columns = [
      { title: "Name", dataKey: "Name" },
      { title: "Description", dataKey: "Description" }
    ];

    const data = [...this.state.Usergroups];

    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, data, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("RMS SECURITY GROUPS", 40, 50);
      }
    });
    doc.save("RMSSECURITYGROUPS.pdf");
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

  OpenRolesOpoup = () => {
    this.setState({ RolesPoup: true });
  };
  fetchRoles = User => {
    fetch("/api/GroupAccess/" + User, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Roles => {
        if (Roles.length > 0) {
          const UserRoles = [_.groupBy(Roles, "Category")];
          this.setState({ AdminCategory: UserRoles[0].Admin });
          this.setState({ Menus: UserRoles[0].Menus });
          
          this.setState({
            SystemparameteresCategory: UserRoles[0].Systemparameteres
          });
          this.setState({
            RecruitmentCategory: UserRoles[0].Recruitment
          });
          this.setState({
            ReportsCategory: UserRoles[0].Reports
          });
          this.setState({
            AnalyticsCategory: UserRoles[0].Analytics
          });
        } else {
          swal("", Roles.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  handleCheckBoxChange = (Role, e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    let data = {
      UserGroup: this.state.UserGroupID,
      Role: Role.RoleID,
      Status: value,
      Name: name
    };
    this.UpdateUserRoles("/api/GroupAccess", data);
  };
  UpdateUserRoles(url = ``, data = {}) {
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
          if (data.success) {
            //swal("Saved!", "Record has been updated!", "success");
            // this.Resetsate();
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }

  openModal() {
    this.setState({ open: true });
    this.Resetsate();
  }
  handleRolesOpoup = User => {
    this.setState({ Roles: [] });
    this.fetchRoles(User);
  };
  closeRolesPoup() {
    this.setState({ RolesPoup: false });
  }
  closeModal() {
    this.setState({ open: false });
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  Resetsate() {
    const data = {
      Name: "",
      Description: "",
      UserGroupID: "",
      isUpdate: false
    };
    this.setState(data);
  }

  fetchUsergroups = () => {
    fetch("/api/usergroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Usergroups => {
        if (Usergroups.length > 0) {
          this.setState({ Usergroups: Usergroups });
        } else {
          swal("", Usergroups.message, "error");
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
              this.fetchUsergroups();
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
    let newdesc =
      this.state.Description.charAt(0).toUpperCase() +
      this.state.Description.slice(1);
    let newname =
      this.state.Name.charAt(0).toUpperCase() + this.state.Name.slice(1);
    const data = {
      Name: newname,
      Description: newdesc
    };

    if (this.state.isUpdate) {
      this.UpdateData("/api/usergroups/" + this.state.UserGroupID, data);
    } else {
      this.postData("/api/usergroups", data);
    }
  };
  handleEdit = Name => {
    const data = {
      Name: Name.Name,
      Description: Name.Description,
      UserGroupID: Name.UserGroupID
    };

    this.setState(data);
    this.setState({ open: true });
    this.setState({ isUpdate: true });
    this.handleRolesOpoup(Name.UserGroupID);
  };

  handleDelete = k => {
    swal({
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/usergroups/" + k, {
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
              this.fetchUsergroups();
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
          this.fetchUsergroups();

          if (data.success) {
            swal("", "Record has been updated!", "success");
            this.setState({ open: false });
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
          this.fetchUsergroups();

          if (data.success) {
            swal("", "Record has been saved!", "success");
            this.setState({ open: false });
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

    const rows = [...this.state.Usergroups];

    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
          Name: k.Name,
          Description: k.Description,

          action: (
            <span>
              {this.validaterole("Security Groups", "Edit") ? (
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
              {this.validaterole("Security Groups", "Remove") ? (
                <a
                  className="fa fa-trash"
                  style={{ color: "#f44542" }}
                  onClick={e => this.handleDelete(k.UserGroupID, e)}
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

    let divsytle = {
      // overflowy: "scroll",
      overflow: "auto",
      height: "400px"
    };
    let tablestyle = {
      width: "60%"
    };
    let rowstyle = {
      marginRight: "35px"
    };
    let tdstyle = {
      // width: "20px"
      paddingLeft: "40px"
      //marginLeft: "70px"
    };
    let tabledivstyle = {
      width: "100%"
    };
    let handleCheckBoxChange = this.handleCheckBoxChange;

    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>User groups</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-3">
              <div className="row wrapper ">
                {this.validaterole("Security Groups", "AddNew") ? (
                  <button
                    type="button"
                    style={{ marginTop: 40 }}
                    onClick={this.openModal}
                    className="btn btn-primary float-left fa fa-plus"
                  >
                    &nbsp; New
                  </button>
                ) : null}
                &nbsp;
                {this.validaterole("Security Groups", "Export") ? (
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
                {this.validaterole("Security Groups", "Export") ? (
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
                    <ExcelSheet data={rows} name="userGroups">
                      <ExcelColumn label="GroupID" value="UserGroupID" />
                      <ExcelColumn label="Name" value="Name" />
                      <ExcelColumn label="Description" value="Description" />
                    </ExcelSheet>
                  </ExcelFile>
                ) : null}
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Popup
                  open={this.state.open}
                  closeOnDocumentClick
                  onClose={this.closeModal}
                >
                  <div className={popup.modal}>
                    <a className="close" onClick={this.closeModal}>
                      &times;
                    </a>
                    <div className={popup.header} className="font-weight-bold">
                      User Group{" "}
                    </div>
                    <div className={popup.content}>
                      <div className="container-fluid">
                        <div className="col-sm-12">
                          <div className="ibox-content">
                            <form onSubmit={this.handleSubmit}>
                              <div className=" row">
                                <div className="col-sm">
                                  <div className="form-group">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="font-weight-bold"
                                    >
                                      Name
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
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
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
                                  <div className="col-sm-2" />
                                  <div className="col-sm-8" />
                                  <div className="col-sm-1">
                                    {this.state.isUpdate ? (
                                      <input
                                        type="button"
                                        className="btn btn-primary float-right"
                                        value="Roles"
                                        onClick={this.OpenRolesOpoup}
                                      />
                                    ) : null}
                                  </div>
                                  <div className="col-sm-1">
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
                  </div>
                </Popup>
                <Popup
                  open={this.state.RolesPoup}
                  closeOnDocumentClick
                  onClose={this.closeRolesPoup}
                >
                  <div className={popup.modal}>
                    <a className="close" onClick={this.closeRolesPoup}>
                      &times;
                    </a>
                    <div className={popup.headers}>
                      Group Roles- <b>{this.state.Name}</b>{" "}
                    </div>
                    <div className={popup.content}>
                      <div>
                        <table className="table">
                          <tr className="table-success" style={rowstyle}>
                            <div style={rowstyle}>
                              <th scope="col" style={tablestyle}>
                                Role
                              </th>
                              <th>Create</th>
                              <th>View</th>
                              <th>Delete</th>
                              <th>Update</th>
                              <th>Export</th>
                            </div>
                          </tr>
                        </table>

                        <div className="table-responsive-lg" style={divsytle}>
                          <form>
                            <table className="table">
                              <tbody>
                                
                                {this.state.Menus ? (
                                  <div style={tabledivstyle}>
                                    <h3>Menus</h3>
                                    {this.state.Menus.map(function (
                                      role,
                                      i
                                    ) {
                                      return (
                                        <tr id={i}>
                                          <td style={tablestyle}>
                                            {role.RoleName}
                                          </td>
                                          <td>
                                            <input
                                              className="checkbox"
                                              id={i}
                                              type="checkbox"
                                              name="Create"
                                              defaultChecked={role.AddNew}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            // onChange={handleCheckBoxChange(e)}
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 1}
                                              type="checkbox"
                                              name="View"
                                              defaultChecked={role.View}
                                              //   value=""
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 2}
                                              type="checkbox"
                                              name="Delete"
                                              defaultChecked={role.Remove}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 3}
                                              type="checkbox"
                                              name="Update"
                                              defaultChecked={role.Edit}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 3}
                                              type="checkbox"
                                              name="Export"
                                              defaultChecked={role.Export}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </div>
                                ) : null}
                                {this.state.AdminCategory ? (
                                  <div style={tabledivstyle}>
                                    <h3>System Administration</h3>
                                    {this.state.AdminCategory.map(function(
                                      role,
                                      i
                                    ) {
                                      return (
                                        <tr id={i}>
                                          <td style={tablestyle}>
                                            {role.RoleName}
                                          </td>
                                          <td>
                                            <input
                                              className="checkbox"
                                              id={i}
                                              type="checkbox"
                                              name="Create"
                                              defaultChecked={role.AddNew}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                              // onChange={handleCheckBoxChange(e)}
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 1}
                                              type="checkbox"
                                              name="View"
                                              defaultChecked={role.View}
                                              //   value=""
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 2}
                                              type="checkbox"
                                              name="Delete"
                                              defaultChecked={role.Remove}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 3}
                                              type="checkbox"
                                              name="Update"
                                              defaultChecked={role.Edit}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 3}
                                              type="checkbox"
                                              name="Export"
                                              defaultChecked={role.Export}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </div>
                                ) : null}
                                {this.state.SystemparameteresCategory ? (
                                  <div>
                                    <h3>System parameteres</h3>
                                    {this.state.SystemparameteresCategory.map(
                                      function(role, i) {
                                        return (
                                          <tr id={i}>
                                            <td style={tablestyle}>
                                              {role.RoleName}
                                            </td>
                                            <td>
                                              <input
                                                className="checkbox"
                                                id={i}
                                                type="checkbox"
                                                name="Create"
                                                defaultChecked={role.AddNew}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                                // onChange={handleCheckBoxChange(e)}
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 1}
                                                type="checkbox"
                                                name="View"
                                                defaultChecked={role.View}
                                                //   value=""
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 2}
                                                type="checkbox"
                                                name="Delete"
                                                defaultChecked={role.Remove}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 3}
                                                type="checkbox"
                                                name="Update"
                                                defaultChecked={role.Edit}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 3}
                                                type="checkbox"
                                                name="Export"
                                                defaultChecked={role.Export}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : null}

                                {this.state.RecruitmentCategory ? (
                                  <div>
                                    <h3>Recruitment</h3>
                                    {this.state.RecruitmentCategory.map(
                                      function(role, i) {
                                        return (
                                          <tr id={i}>
                                            <td style={tablestyle}>
                                              {role.RoleName}
                                            </td>
                                            <td>
                                              <input
                                                className="checkbox"
                                                id={i}
                                                type="checkbox"
                                                name="Create"
                                                defaultChecked={role.AddNew}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                                // onChange={handleCheckBoxChange(e)}
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 1}
                                                type="checkbox"
                                                name="View"
                                                defaultChecked={role.View}
                                                //   value=""
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 2}
                                                type="checkbox"
                                                name="Delete"
                                                defaultChecked={role.Remove}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 3}
                                                type="checkbox"
                                                name="Update"
                                                defaultChecked={role.Edit}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 3}
                                                type="checkbox"
                                                name="Export"
                                                defaultChecked={role.Export}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : null}
                                   {this.state.AnalyticsCategory ? (
                                  <div>
                                    <h3>Analytics</h3>
                                    {this.state.AnalyticsCategory.map(
                                      function(role, i) {
                                        return (
                                          <tr id={i}>
                                            <td style={tablestyle}>
                                              {role.RoleName}
                                            </td>
                                            <td>
                                              <input
                                                className="checkbox"
                                                id={i}
                                                type="checkbox"
                                                name="Create"
                                                defaultChecked={role.AddNew}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                                // onChange={handleCheckBoxChange(e)}
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 1}
                                                type="checkbox"
                                                name="View"
                                                defaultChecked={role.View}
                                                //   value=""
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 2}
                                                type="checkbox"
                                                name="Delete"
                                                defaultChecked={role.Remove}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 3}
                                                type="checkbox"
                                                name="Update"
                                                defaultChecked={role.Edit}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                            <td style={tdstyle}>
                                              <input
                                                className="checkbox"
                                                id={i + 3}
                                                type="checkbox"
                                                name="Export"
                                                defaultChecked={role.Export}
                                                onChange={e =>
                                                  handleCheckBoxChange(role, e)
                                                }
                                              />
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : null}
                                {this.state.ReportsCategory ? (
                                  <div>
                                    <h3>Reports</h3>
                                    {this.state.ReportsCategory.map(function(
                                      role,
                                      i
                                    ) {
                                      return (
                                        <tr id={i}>
                                          <td style={tablestyle}>
                                            {role.RoleName}
                                          </td>
                                          <td>
                                            <input
                                              className="checkbox"
                                              id={i}
                                              type="checkbox"
                                              name="Create"
                                              defaultChecked={role.AddNew}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                              // onChange={handleCheckBoxChange(e)}
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 1}
                                              type="checkbox"
                                              name="View"
                                              defaultChecked={role.View}
                                              //   value=""
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 2}
                                              type="checkbox"
                                              name="Delete"
                                              defaultChecked={role.Remove}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 3}
                                              type="checkbox"
                                              name="Update"
                                              defaultChecked={role.Edit}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                          <td style={tdstyle}>
                                            <input
                                              className="checkbox"
                                              id={i + 3}
                                              type="checkbox"
                                              name="Export"
                                              defaultChecked={role.Export}
                                              onChange={e =>
                                                handleCheckBoxChange(role, e)
                                              }
                                            />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </div>
                                ) : null}
                              </tbody>
                            </table>
                          </form>
                        </div>
                        <br />
                        <div className="col-sm-12 ">
                          <div className=" row">
                            <div className="col-sm-2">
                              <button
                                className="btn btn-primary float-left"
                                onClick={this.closeRolesPoup}
                              >
                                DONE
                              </button>
                            </div>
                            <div className="col-sm-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
                &nbsp;&nbsp;
              </div>
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

export default UserGroups;

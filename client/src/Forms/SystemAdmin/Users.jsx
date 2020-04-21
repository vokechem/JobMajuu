import React, { Component } from "react";
import Popup from "reactjs-popup";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import popup from "./../../Styles/popup.css";
import Select from "react-select";
import { Progress } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactExport from "react-data-export";
var dateFormat = require("dateformat");
var jsPDF = require("jspdf");
require("jspdf-autotable");
var _ = require("lodash");
class Users extends Component {
  constructor() {
    super();
    this.state = {
      Users: [],
      UserGroups: [],
      privilages: [],
      Name: "",
      Username: "",
      Email: "",
      Phone: "",
      Photo: "default.png",
      IDnumber: "",
      DOB: "",
      Gender: "",
      UserGroup: "",
      UserGroupID: "",
      open: false,
      RolesPoup: false,
      IsActive: false,
      Board: false,
      isUpdate: false,
      ShowMe: false,
      Roles: [],
      AdminCategory: [],
      Menus: [],
      selectedFile: null,
      Signature: "",
      SystemparameteresCategory: [],
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
      { title: "Username", dataKey: "Username" },
      { title: "Email", dataKey: "Email" },
      { title: "Phone", dataKey: "Phone" },
      { title: "IsActive", dataKey: "IsActive" },
      { title: "Board", dataKey: "Board" },
      { title: "UserGroup", dataKey: "UserGroup" }
    ];

    const data = [...this.state.Users];

    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, data, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("SYSTEM USERS", 40, 50);
      }
    });
    doc.save("JobMajuuSystemusers.pdf");
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

  fetchRoles = User => {
    fetch("/api/UserAccess/" + User, {
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

          this.setState({ Menus: UserRoles[0].Menus });
          this.setState({ AdminCategory: UserRoles[0].Admin });
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
  Resetsate() {
    const data = {
      Name: "",
      Username: "",
      Email: "",
      Photo: "default.png",
      Phone: "",
      UserGroup: "",
      Password:"",
      IsActive: false,
      isUpdate: false,
      IDnumber: "",
      DOB: "",
      Gender: ""
    };
    this.setState(data);
  }
  openModal() {
    this.setState({ open: true });
    this.Resetsate();
  }
  OpenRolesOpoup = () => {
    this.setState({ RolesPoup: true });
  };
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

  handleCheckBoxChange = (Role, e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let data = {
      UserName: Role.Username,
      Role: Role.RoleID,
      Name: name,
      Status: value
    };
    this.UpdateUserRoles("/api/UserAccess", data);
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
            //swal("", "Record has been updated!", "success");
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  handleInputChange = event => {
    // event.preventDefault();
    // this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  handleSelectChange = (UserGroup, actionMeta) => {
    if (actionMeta.name === "UserGroup") {
      this.setState({ UserGroupID: UserGroup.value });
      this.setState({ [actionMeta.name]: UserGroup.label });
    } else {
      this.setState({ [actionMeta.name]: UserGroup.value });
    }
  };
  fetchUserGroups = () => {
    fetch("/api/usergroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(UserGroups => {
        if (UserGroups.length > 0) {
          this.setState({ UserGroups: UserGroups });
        } else {
          swal("", UserGroups.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchUsers = () => {
    fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Users => {
        if (Users.length > 0) {
          this.setState({ Users: Users });
        } else {
          swal("", Users.message, "error");
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
              this.fetchUsers();
              this.fetchUserGroups();
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
      Username: this.state.Username,
      Email: this.state.Email,
      Phone: this.state.Phone,
      Password: this.state.Password,
      UserGroup: this.state.UserGroupID,
      Signature: this.state.Signature,
      IsActive: this.state.IsActive,
      IDnumber: this.state.IDnumber,
      DOB: this.state.DOB,
      Gender: this.state.Gender,
      Board: this.state.Board
    };

    if (this.state.isUpdate) {
      this.UpdateData("/api/users/" + this.state.Username, data);
    } else {
      this.postData("/api/users", data);
    }
  };
  handleEdit = Users => {
    const data = {
      Name: Users.Name,
      Username: Users.Username,
      Email: Users.Email,
      Phone: Users.Phone,
      UserGroup: Users.UserGroup,
      IsActive: !!+Users.IsActive,
      Board: !!+Users.Board,
      Photo: Users.Photo,
      Signature: Users.Signature,
      UserGroupID: Users.UserGroupID,
      IDnumber: Users.IDnumber,
      DOB: dateFormat(new Date(Users.DOB).toLocaleDateString(), "isoDate"),
      Gender: Users.Gender
    };

    this.setState(data);
    this.setState({ open: true });
    this.setState({ isUpdate: true });
    this.handleRolesOpoup(Users.Username);
  };
  handleDelete = k => {
    swal({
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/users/" + k, {
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
              this.fetchUsers();
            })
          )
          .catch(err => {
            swal("", err.message, "error");
          });
      }
    });
  };
  SendSMS(MobileNumber, Msg) {
    let data = {
      MobileNumber: MobileNumber,
      Message: Msg
    };
    return fetch("/api/sendsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  SendMail = () => {
    const emaildata = {
      to: this.state.Email,
      Name: this.state.Name,
      subject: "ARCMS REGISTRATION",
      Username: this.state.Username,
      Password: this.state.Username,
      ID: "New User"
    };

    fetch("/api/NotifyApprover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(emaildata)
    })
      .then(response => response.json().then(data => {}))
      .catch(err => {
        //swal("Oops!", err.message, "error");
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
          if (data.success) {
            swal("", "Record has been updated!", "success");
            this.Resetsate();
            this.setState({ open: false });
            this.fetchUsers();
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
          if (data.success) {
            // this.SendMail();
            swal("", "Record has been saved!", "success");
            //this.Resetsate();
            this.fetchUsers();
          } else {
            //s"ER_DUP_ENTRY: Duplicate entry 'Admin-1' for key 'PRIMARY'"
            //ER_DUP_ENTRY: Duplicate entry '0705555285' for key 'MobileNo'
            let resmsg = data.message;
            if (resmsg.match(/(^|\W)Duplicate($|\W)/)) {
              if (resmsg.match(/(^|\W)PRIMARY($|\W)/)) {
                swal(
                  "Failed!",
                  "Username: " + this.state.Username + " is already registered",
                  "error"
                );
              } else {
                var res1 = resmsg.replace("ER_DUP_ENTRY: Duplicate entry", "");
                var res2 = res1.replace("for key", "");
                var res3 = res2.replace("'", "");
                var res4 = res3.replace("'", "");
                var res5 = res4.replace("'", "");
                var res6 = res5.replace("'", "");
                let array = res6.split(" ");
                let first = array[0];
                let last = array[array.length - 1];
                array[0] = last;
                array[array.length - 1] = first;
                let my_string = array.join(" ");
                swal("", my_string + " is already registered", "error");
              }
            } else {
              swal("", data.message, "error");
            }
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  maxSelectFile = event => {
    let files = event.target.files; // create file object
    if (files.length > 1) {
      const msg = "Only One image can be uploaded at a time";
      event.target.value = null; // discard selected file
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkMimeType = event => {
    let files = event.target.files;
    let err = []; // create empty array
    const types = ["image/png", "image/jpeg", "image/gif"];
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
        // assign message to array
      }
    }
    for (var z = 0; z < err.length; z++) {
      // loop create toast massage
      event.target.value = null;
      toast.error(err[z]);
      return false;
    }
    return true;
  };
  checkFileSize = event => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onClickHandler = () => {
    if (this.state.selectedFile) {
      const data = new FormData();
      // var headers = {
      //   "Content-Type": "multipart/form-data",
      //   "x-access-token": localStorage.getItem("token")
      // };

      //for single files
      //data.append("file", this.state.selectedFile);
      //for multiple files
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }
      axios
        .post("/api/upload/Sign", data, {
          // receive two parameter endpoint url ,form data
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        })
        .then(res => {
          this.setState({
            Signature: res.data
          });
          // localStorage.setItem("UserPhoto", res.data);
          toast.success("upload success");
        })
        .catch(err => {
          toast.error("upload fail");
        });
    } else {
      toast.warn("Please select a photo to upload");
    }
  };
  onChangeHandler = event => {
    //for multiple files
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkFileSize(event) &&
      this.checkMimeType(event)
    ) {
      this.setState({
        selectedFile: files,
        loaded: 0
      });

      //for single file
      // this.setState({
      //   selectedFile: event.target.files[0],
      //   loaded: 0
      // });
    }
  };
  AsignAllRoles = e => {
    let user = this.state.Username;
    fetch("/api/UserAccess/GiveAll/" + user, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            this.setState({ AdminCategory: [] });
            this.setState({
              SystemparameteresCategory: []
            });
            this.setState({
              RecruitmentCategory: []
            });
            this.fetchRoles(this.state.Username);
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  RemoveAllRoles = e => {
    let user = this.state.Username;
    fetch("/api/UserAccess/Remove/" + user, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            this.setState({ AdminCategory: [] });
            this.setState({
              SystemparameteresCategory: []
            });
            this.setState({
              RecruitmentCategory: []
            });
            this.fetchRoles(this.state.Username);
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
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
        label: "Username",
        field: "Username",
        sort: "asc",
        width: 200
      },
      {
        label: "Email",
        field: "Email",
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
        label: "IsActive",
        field: "IsActive",
        sort: "asc",
        width: 200
      },
      {
        label: "UserGroup",
        field: "UserGroup",
        sort: "asc",
        width: 200
      },
      // {
      //   label: "UserCategory",
      //   field: "UserCategory",
      //   sort: "asc",
      //   width: 200
      // },
      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];

    const Rows = [...this.state.Users];
    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          Name: k.Name,
          Username: k.Username,
          Email: k.Email,
          Phone: k.Phone,
          IsActive: k.IsActive,
          UserGroup: k.UserGroup,
          UserCategory: k.Category,
          action: (
            <span>
              {this.validaterole("System Users", "Edit") ? (
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
              {this.validaterole("System Users", "Remove") ? (
                <a
                  className="fa fa-trash"
                  style={{ color: "#f44542" }}
                  onClick={e => this.handleDelete(k.Username, e)}
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
    const UserGroupsOptions = [...this.state.UserGroups].map((k, i) => {
      return {
        value: k.UserGroupID,
        label: k.Name
      };
    });
    let GenderCategories = [
      {
        value: "Male",
        label: "Male"
      },
      {
        value: "Female",
        label: "Female"
      }
    ];
    let divsytle = {
      // overflowy: "scroll",
      overflow: "auto",
      height: "400px"
    };
    let handleCheckBoxChange = this.handleCheckBoxChange;
    let photostyle = {
      height: 150,
      width: 150
    };
    let Signstyle = {
      height: 100,
      width: 100
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
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-9">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <h2>Users</h2>
              </li>
            </ol>
          </div>
          <div className="col-lg-3">
            <div className="row wrapper ">
              {" "}
              &nbsp;
              {this.validaterole("System Users", "AddNew") ? (
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.openModal}
                  className="btn btn-primary float-left fa fa-plus"
                >
                  &nbsp;New
                </button>
              ) : null}
              &nbsp;
              {this.validaterole("System Users", "Export") ? (
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
              <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}
              >
                <div className={popup.modal}>
                  <a className="close" onClick={this.closeModal}>
                    &times;
                  </a>
                  <div className={popup.headers} className="font-weight-bold">
                    System User{" "}
                  </div>
                  <div className={popup.content}>
                    <div className="container-fluid">
                      <div className="col-sm-12">
                        <div className="ibox-content">
                          <form
                            className="form-horizontal"
                            onSubmit={this.handleSubmit}
                          >
                            <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label
                                    htmlFor="Datereceived"
                                    className="font-weight-bold"
                                  >
                                    Full Names
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="Name"
                                    id="Name"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Name}
                                  />
                                </div>
                                <div className="form-group">
                                  <label
                                    htmlFor="Datereceived"
                                    className="font-weight-bold"
                                  >
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="Username"
                                    id="Username"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Username}
                                    EnabledStatus
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                              <div className="form-group">
                                  <label
                                    htmlFor="Datereceived"
                                    className="font-weight-bold"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="Password"
                                    className="form-control"
                                    name="Password"
                                    id="Password"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Password}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label
                                    htmlFor="Datereceived"
                                    className="font-weight-bold"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="Email"
                                    id="Email"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Email}
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label
                                    htmlFor="Datereceived"
                                    className="font-weight-bold"
                                  >
                                    Mobile
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="Phone"
                                    id="Phone"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Phone}
                                  />
                                </div>
                              </div>
                            </div>
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

                            <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label
                                    className="font-weight-bold"
                                    for="inputState"
                                  >
                                    Signature
                                  </label>

                                  <input
                                    type="file"
                                    className="form-control"
                                    name="file"
                                    onChange={this.onChangeHandler}
                                    multiple
                                  />
                                  <div class="form-group">
                                    <Progress
                                      max="100"
                                      color="success"
                                      value={this.state.loaded}
                                    >
                                      {Math.round(this.state.loaded, 2)}%
                                    </Progress>
                                  </div>
                                  <button
                                    type="button"
                                    class="btn btn-success "
                                    onClick={this.onClickHandler}
                                  >
                                    Upload
                                  </button>
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <img
                                    alt=""
                                    className=""
                                    src={
                                      process.env.REACT_APP_BASE_URL +
                                      "/Signatures/" +
                                      this.state.Signature
                                    }
                                    style={Signstyle}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className={popup.actions}>
                              <div className="col-sm-12 ">
                                <div className=" row">
                                  <div className="col-sm-8" />
                                  <div className="col-sm-2">
                                    {this.state.isUpdate ? (
                                      <input
                                        type="button"
                                        className="btn btn-primary float-right"
                                        value="Roles"
                                        onClick={this.OpenRolesOpoup}
                                      />
                                    ) : null}
                                  </div>

                                  <div className="col-sm-2">
                                    <button
                                      type="submit"
                                      className="btn btn-primary float-right"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ToastContainer />
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
                    <h3> User:{this.state.Username}</h3>
                  </div>

                  <div className={popup.content}>
                    <div>
                      <table className="table">
                        <tr style={rowstyle}>
                          <div style={rowstyle}>
                            <th>
                              {" "}
                              <button
                                onClick={this.RemoveAllRoles}
                                className="btn btn-primary float-left"
                              >
                                Remove All
                              </button>
                            </th>

                            <th>
                              <button
                                onClick={this.AsignAllRoles}
                                className="btn btn-primary float-left"
                              >
                                Asign All
                              </button>
                            </th>
                          </div>
                        </tr>

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
                                  {this.state.Menus.map(function(role, i) {
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
                                              fclassName="checkbox"
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
                                  <h3>Recruitment</h3>
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
              {this.validaterole("System Users", "Export") ? (
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
                  <ExcelSheet data={Rows} name="System Users">
                    <ExcelColumn label="Name" value="Name" />
                    <ExcelColumn label="Username" value="Username" />
                    <ExcelColumn label="Email" value="Email" />
                    <ExcelColumn label="Phone" value="Phone" />
                    <ExcelColumn label="IsActive" value="IsActive" />
                    <ExcelColumn label="UserGroup" value="UserGroup" />
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
export default Users;

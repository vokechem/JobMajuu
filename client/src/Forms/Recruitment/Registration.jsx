import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { Progress } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactExport from "react-data-export";
import Modal from "react-awesome-modal";
import decode from "jwt-decode";
var jsPDF = require("jspdf");
var dateFormat = require("dateformat");
require("jspdf-autotable");
class Registration extends Component {
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
      Registration: [],
      FullName:"",
      IDNumber:"" ,
      Gender:"", 
      Phone:"",
      Email:"",
      DOB:"",
      KinName:"",
      KinIDNO:"",
      GuardianName:"",
      GuardianPhone:"",
      GuardianIDNO:"",
      Photo:"default.png",
      RegId: "",
      status: false,
      Passport: false,
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
    // event.preventDefault();
    // this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  Resetsate() {
    const data = {
        FullName:"",
        IDNumber:"" ,
        Gender:"", 
        Phone:"",
        Email:"",
        DOB:"",
        KinName:"",
        KinIDNO:"",
        GuardianName:"",
        GuardianPhone:"",
        GuardianIDNO:"",
        Passport:false,
        Photo:"default.png",
        RegId: "",
      isUpdate: false
    };
    this.setState(data);
  }

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
      FullName: this.state.FullName,
      IDNumber: this.state.IDNumber,
      Gender: this.state.Gender,
      Phone: this.state.Phone,
      Email: this.state.Email,
      DOB: this.state.DOB,
      KinName: this.state.KinName,
      KinIDNO: this.state.KinIDNO,
      GuardianName: this.state.GuardianName,
      GuardianPhone: this.state.GuardianPhone,
      GuardianIDNO: this.state.GuardianIDNO,
      Photo: this.state.Photo,
    };

    if (this.state.isUpdate) {
      this.UpdateData("/api/Registration/" + this.state.RegId, data);
    } else {
      this.postData("/api/Registration", data);
    }
  };
  handleEdit = Registration => {
    const data = {
        FullName:Registration.FullName,
        IDNumber:Registration.IDNumber,
        Gender:Registration.Gender,
        Phone:Registration.Phone,
        Email:Registration.Email,
        DOB: dateFormat(new Date(Registration.DOB).toLocaleDateString(), "isoDate"),
        KinName:Registration.KinName,
        KinIDNO:Registration.KinIDNO,
        GuardianName:Registration.GuardianName,
        GuardianPhone:Registration.GuardianPhone,
        GuardianIDNO:Registration.GuardianIDNO,
        status: !!+Registration.status,
        Photo:Registration.Photo,
        Passport: !!+Registration.Passport,
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
        return fetch("/api/Registration/" + k, {
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
              this.fetchRegistration();
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
          this.fetchRegistration();

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
          this.fetchRegistration();

          if (data.success) {
            swal("Saved!", "Record has been saved!", "success");
            this.Resetsate();
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
        swal("Oops!", err.message, "error");
      });
  }

  exportpdf = () => {
    var columns = [
      { title: "Name", dataKey: "Name" },
      { title: "Description", dataKey: "Description" }
    ];

    const data = [...this.state.Registration];
    var doc = new jsPDF("p", "pt");
    doc.autoTable(columns, data, {
      margin: { top: 60 },
      beforePageContent: function(data) {
        doc.text("SYSTEM SECURITY ROLES", 40, 50);
      }
    });
    doc.save("ArcmRoles.pdf");
  };
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
  render() {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const ColumnData = [
      {
        label: "FullName",
        field: "FullName",
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
        label: "Gender",
        field: "Gender",
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
        label: "Email",
        field: "Email",
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

    const rows = [...this.state.Registration];

    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
            FullName: k.FullName,
            IDNumber: k.IDNumber,
            Gender:k.Gender,
            Phone:k.Phone,
            Email:k.Email,
            DOB:k.DOB,
            KinName:k.KinName,
            KinIDNO:k.KinIDNO,
            GuardianName:k.GuardianName,
            GuardianPhone:k.GuardianPhone,
            GuardianIDNO:k.GuardianPhone,
            Photo:k.Phone,
          action: (
            <span>
              {this.validaterole("Registration", "Edit") ? (
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
              {this.validaterole("Registration", "Remove") ? (
                <a
                  className="fa fa-trash"
                  style={{ color: "#f44542" }}
                  onClick={e => this.handleDelete(k.RegId, e)}
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
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Registration</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-3">
              <div className="row wrapper ">
                {this.validaterole("Registration", "AddNew") ? (
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
                {this.validaterole("Registration", "Export") ? (
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
                {this.validaterole("Registration", "Export") ? (
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
                  width="1000"
                  height="600"
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
                      JOB Majuu Applicants
                    </h4>
                    <div className="container-fluid">
                      <div className="col-sm-12">
                        <div className="ibox-content">
                          <form onSubmit={this.handleSubmit}>
                          <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    FullName{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="FullName"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.FullName}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                   
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    ID Number{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="IDNumber"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.IDNumber}
                                    className="form-control"
                                    id="exampleInputPassword1"      
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Gender{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="Gender"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Gender}
                                    className="form-control"
                                    id="exampleInputPassword1"      
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                  Phone{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="Phone"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Phone}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                  
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Email {" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="Email"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Email}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                 
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
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
                            </div>
                            <div className=" row">
                            <div className="col-sm">
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Guardian Name{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="GuardianName"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.GuardianName}
                                    className="form-control"
                                    id="exampleInputPassword1"      
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Guardian Phone{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="GuardianPhone"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.GuardianPhone}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                   
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                  Guardian IDNO{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="GuardianIDNO"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.GuardianIDNO}
                                    className="form-control"
                                    id="exampleInputPassword1"      
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Next OF Kin Name{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="KinName"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.KinName}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                   
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Next of Kin IDNo{" "}
                                  </label>
                                  <input
                                    type="text"
                                    name="KinIDNO"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.KinIDNO}
                                    className="form-control"
                                    id="exampleInputPassword1"      
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                              <div className="form-group">
                              <br />
                                  <br />
                                  <input
                                    className="checkbox"
                                    id="Passport"
                                    type="checkbox"
                                    name="Passport"
                                    defaultChecked={this.state.passport}
                                    onChange={this.handleInputChange}
                                  />{" "}
                                  <label
                                    htmlFor="Passport"
                                    className="font-weight-bold"
                                  >
                                    Passport
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
                                    Photo
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
                                      this.state.Photo
                                    }
                                    style={Signstyle}
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

export default Registration;

import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import Modal from "react-awesome-modal";

var jsPDF = require("jspdf");
require("jspdf-autotable");

class smtpdetails extends Component {
  constructor() {
    super();
    this.state = {
      Venues: [],
      privilages: [],
      Host: "",
      Sender: "",
      Port: "",
      ID: "",
      open: false,
      isUpdate: false,
      RolesPoup: false,
      Roles: [],
      Branches: [],
      Key: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.Resetsate = this.Resetsate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
  fetchBranches = () => {
    fetch("/api/SMSdetails/SMTP", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Branches => {
        if (Branches.length > 0) {
          this.setState({ Branches: Branches });
        } else {
          swal("", Branches.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };

  closeModal() {
    this.setState({ open: false });
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  Resetsate() {
    const data = {
      Sender: "",
      Port: "",
      isUpdate: false,
      Password: "",
      Key: ""
    };
    this.setState(data);
  }

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
              this.ProtectRoute();
              this.fetchBranches();
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
      Host: this.state.Host,
      Port: this.state.Port,
      Sender: this.state.Sender,
      Password: this.state.Key
    };

    this.postData("/api/SMSdetails", data);
  };
  handleEdit = Name => {
    const data = {
      Sender: Name.Sender,
      Host: Name.Host,
      Port: Name.Port,
      Key: Name.Password
    };

    this.setState(data);
    this.setState({ open: true });
    this.setState({ isUpdate: true });
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
            this.setState({ open: false });
            this.Resetsate();
            this.fetchBranches();
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
            swal("", "Record has been saved!", "success");
            this.setState({ open: false });
            this.Resetsate();
            this.fetchBranches();
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
    const ColumnData = [
      {
        label: "Host",
        field: "Host",
        sort: "asc",
        width: 200
      },
      {
        label: "Sender",
        field: "Sender",
        sort: "asc",
        width: 200
      },
      {
        label: "Password",
        field: "Password",
        sort: "asc",
        width: 200
      },
      {
        label: "Port",
        field: "Port",
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
    //console.log(this.state.Branches);
    const rows = [...this.state.Branches];
    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
          Host: k.Host,
          Sender: k.Sender,
          Password: k.Password,
          Port: k.Port,
          action: (
            <span>
              {this.validaterole("Banks", "Edit") ? (
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
                  <h2>SMTP Sender Details</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-3">
              <div className="row wrapper ">
                {/* {this.validaterole("Banks", "AddNew") ? (
                  <button
                    type="button"
                    style={{ marginTop: 40 }}
                    onClick={this.openModal}
                    className="btn btn-primary float-left fa fa-plus"
                  >
                    &nbsp; New
                  </button>
                ) : null} */}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Modal
                  visible={this.state.open}
                  width="700"
                  height="330"
                  effect="fadeInUp"
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
                      SMS Sender Details
                    </h4>
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
                                    Host
                                  </label>
                                  <input
                                    type="text"
                                    name="Host"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Host}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className="font-weight-bold"
                                  >
                                    Sender
                                  </label>
                                  <input
                                    type="text"
                                    name="Sender"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Sender}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" row">
                              <div className="col-sm">
                                <div className="form-group">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className="font-weight-bold"
                                  >
                                    Key/Password
                                  </label>
                                  <input
                                    type="text"
                                    name="Key"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Key}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-sm">
                                <div className="form-group">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className="font-weight-bold"
                                  >
                                    Port
                                  </label>
                                  <input
                                    type="text"
                                    name="Port"
                                    required
                                    onChange={this.handleInputChange}
                                    value={this.state.Port}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12 ">
                              <div className=" row">
                                <div className="col-sm-11" />

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
                </Modal>
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

export default smtpdetails;

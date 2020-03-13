import React, { Component } from "react";
import swal from "sweetalert";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";
import { toast, ToastContainer } from "react-toastify";
var _ = require("lodash");
class NewApprovers extends Component {
  constructor() {
    super();
    this.state = {
      treeData: [],
      Approvers: [],
      Users: [],
      Modules: [],
      UserName: "",
      Module: "",
      ModuleName: "",
      Name: "",
      Level: "",
      Active: false,
      ID: "",
      open: false,
      loading: true,
      privilages: [],
      redirect: false,
      isUpdate: false,
      MaximumApprovers: ""
    };
  }

  openModal = () => {
    if (this.state.Module) {
      var rows = [...this.state.Modules];
      const filtereddata = rows.filter(
        item => item.ModuleCode == this.state.Module
      );

      this.setState({
        open: true,
        MaximumApprovers: filtereddata[0].MaxApprovals
      });
    } else {
      toast.error("Select Approval Module to continue");
    }
  };
  closeModal = () => {
    this.setState({ open: false });
  };
  handleSelectChange = (Approver, actionMeta) => {
    if (actionMeta.name == "UserName") {
      this.setState({ UserName: Approver.value });
      this.setState({ Name: Approver.label });
    } else {
      this.setState({ Module: Approver.value });
      this.setState({ ModuleName: Approver.label });
    }
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

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  fetchModules = () => {
    fetch("/api/Approvalmodules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Modules => {
        if (Modules.length > 0) {
          this.setState({ Modules: Modules });
          let Application = [];
          let Fees = [];
          let Case = [];
          Modules.forEach(k => {
            if (k.Category === "Application") {
              let data = {
                title: (
                  <div className="label-area">
                    <b
                      onClick={() => {
                        this.setState({ ModuleName: k.Name });
                        this.setState({ Module: k.ModuleCode });
                      }}
                    >
                      {" "}
                      {k.Name}
                    </b>
                  </div>
                )
              };

              Application.push(data);
            }
            if (k.Category === "Fees") {
              let data = {
                title: (
                  <div className="label-area">
                    <b
                      onClick={() => {
                        this.setState({ ModuleName: k.Name });
                        this.setState({ Module: k.ModuleCode });
                      }}
                    >
                      {" "}
                      {k.Name}
                    </b>
                  </div>
                )
              };

              Fees.push(data);
            }
            if (k.Category === "Case Management") {
              let data = {
                title: (
                  <div className="label-area">
                    <b
                      onClick={() => {
                        this.setState({ ModuleName: k.Name });
                        this.setState({ Module: k.ModuleCode });
                      }}
                    >
                      {" "}
                      {k.Name}
                    </b>
                  </div>
                )
              };

              Case.push(data);
            }
          });
          let treeData = [
            { title: "Application", children: Application },
            { title: "Fees", children: Fees },
            { title: "Case Management", children: Case }
          ];

          this.setState({ treeData: treeData });
        } else {
          toast.error(Modules.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
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
          const GroupedUsers = [_.groupBy(Users, "Category")];
          this.setState({ Users: GroupedUsers[0].System_User });
        } else {
          toast.error(Users.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchApprovers = () => {
    fetch("/api/Approvers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Approvers => {
        if (Approvers.length > 0) {
          //console.log(Approvers);
          this.setState({ Approvers: Approvers });
          // ModuleApproves
        } else {
          toast.error(Approvers.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
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
              this.fetchApprovers();
              this.ProtectRoute();
              this.fetchModules();
              this.fetchUsers();
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
      MaximumApprovers: this.state.MaximumApprovers,
      ModuleCode: this.state.Module
    };
    this.postData1("/api/Approvers/1", data);
  };
  postData1(url = ``, data = {}) {
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
          this.fetchApprovers();

          if (data.success) {
            toast.success("Record has been saved!");
          } else {
            toast.error("Could not be added");
          }
        })
      )
      .catch(err => {
        toast.error(err.message);
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
          this.fetchApprovers();

          if (data.success) {
            //swal("", "Record has been saved!", "success");
          } else {
            swal("", "Could not be added", "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  handleCheckBoxChange = (Role, Status, e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (Status === "Mandatory") {
      let data = {
        Username: Role.Username,
        ModuleCode: this.state.Module,
        isMandatory: true,
        Active: value
      };
      this.postData("/api/Approvers", data);
    } else {
      let data = {
        Username: Role.Username,
        ModuleCode: this.state.Module,
        isMandatory: false,
        Active: value
      };
      this.postData("/api/Approvers", data);
    }
  };
  checkifALreadyAdded = (Username, Optional) => {
    const filtereddata = this.state.Approvers.filter(
      item => item.ModuleCode === this.state.Module
    );
    const filtereddata1 = filtereddata.filter(
      item => item.Username === Username
    );

    if (Optional === "Optional") {
      const filtereddata2 = filtereddata1.filter(item => item.Mandatory == 0);
      if (filtereddata2.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      const filtereddata2 = filtereddata1.filter(item => item.Mandatory == 1);
      if (filtereddata2.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };
  render() {
    let handleCheckBoxChange = this.handleCheckBoxChange;
    return (
      <div>
        <ToastContainer />
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-11">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <h2>APPROVAL HIERACHY</h2>
              </li>
            </ol>
          </div>
          <div className="col-lg-1">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <button
                    type="button"
                    style={{ marginTop: 40 }}
                    className="btn btn-primary float-left"
                  >
                    &nbsp; Close
                  </button>
                </Link>
              </li>
            </ol>
          </div>
        </div>
        <br />
        <div className="border-bottom white-bg p-4">
          <div className="row">
            <div className="col-md-5 ">
              <h2 className="text-success">Modules</h2>
              <div className="col-md-11 border border-success rounded">
                <div style={{ height: 500 }}>
                  <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-7 ">
              <div className="row">
                <div className="col-md-8">
                  <h2 className="text-success">
                    Approvers -{this.state.ModuleName}
                  </h2>
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-success float-right"
                    type="button"
                    style={{ marginTop: 20 }}
                    onClick={this.openModal}
                  >
                    Add New Approver
                  </button>
                </div>{" "}
                <div className="col-md-1">
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{ marginTop: 20 }}
                    onClick={this.openModal}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div
                style={{ height: 500 }}
                className="row border border-success rounded "
              >
                <div className="col-md-12">
                  <table style={{ margin: 10 }} className="table  table-sm">
                    <thead style={{ background: "#7fb3d5" }}>
                      <th>Username</th>
                      <th>Names</th>
                    </thead>

                    {this.state.Approvers.map((k, i) => {
                      if (k.ModuleCode === this.state.Module) {
                        return (
                          <tr style={{ background: "#eaecee" }}>
                            <td>{k.Username}</td>
                            <td>{k.Name}</td>
                          </tr>
                        );
                      }
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          visible={this.state.open}
          width="900"
          height="450"
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
            <ToastContainer/>
            <h4 style={{ "text-align": "center", color: "#1c84c6" }}>
              Approvers
            </h4>
            <div className="container-fluid">
              <div className="col-sm-12">
                <div style={{ "overflow-y": "scroll", height: "400px" }}>
                  <form onSubmit={this.handleSubmit}>
                    <div className=" row">
                      <div className="col-sm">
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="font-weight-bold"
                          >
                            Mandatory
                          </label>
                          <table className="table  table-sm">
                            <thead style={{ background: "#7fb3d5" }}>
                              <th>Select</th>
                              <th>Names</th>
                            </thead>

                            {this.state.Users.map((k, i) => {
                              return (
                                <tr style={{ background: "#eaecee" }}>
                                  <td>
                                    {" "}
                                    <input
                                      className="checkbox"
                                      id={i}
                                      type="checkbox"
                                      name="UserName"
                                      checked={this.checkifALreadyAdded(
                                        k.Username,
                                        "Mandatory"
                                      )}
                                      onChange={e =>
                                        handleCheckBoxChange(k, "Mandatory", e)
                                      }
                                    />
                                  </td>
                                  <td>{k.Name}</td>
                                </tr>
                              );
                            })}
                          </table>
                        </div>
                      </div>
                      <div className="col-sm">
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="font-weight-bold"
                          >
                            Optional
                          </label>
                          <table className="table  table-sm">
                            <thead style={{ background: "#7fb3d5" }}>
                              <th>Select</th>
                              <th>Names</th>
                            </thead>

                            {this.state.Users.map((k, i) => {
                              return (
                                <tr style={{ background: "#eaecee" }}>
                                  <td>
                                    {" "}
                                    <input
                                      className="checkbox"
                                      id={i}
                                      type="checkbox"
                                      name="UserName"
                                      checked={this.checkifALreadyAdded(
                                        k.Username,
                                        "Optional"
                                      )}
                                      onChange={e =>
                                        handleCheckBoxChange(k, "Optional", e)
                                      }
                                    />
                                  </td>
                                  <td>{k.Name}</td>
                                </tr>
                              );
                            })}
                          </table>
                          <br />
                          <div className=" row">
                            <div className="col-sm-4" />

                            <div className="col-sm-8">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="font-weight-bold"
                              >
                                Approvals Required
                              </label>
                              &nbsp;&nbsp;&nbsp;
                              <input
                                style={{ width: "70px" }}
                                type="number"
                                value={this.state.MaximumApprovers}
                                name="MaximumApprovers"
                                onChange={this.handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 ">
                      <div className=" row">
                        <div className="col-sm-9" />

                        <div className="col-sm-3">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                          &nbsp; &nbsp;
                          <Link to="/">
                            <button type="button" className="btn btn-danger">
                              Close
                            </button>
                          </Link>
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
    );
  }
}

export default NewApprovers;

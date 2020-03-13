import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
import ReactExport from "react-data-export";
import Select from "react-select";
var jsPDF = require("jspdf");
require("jspdf-autotable");
var _ = require("lodash");
class Approvers extends Component {
    constructor() {
        super();
        this.state = {
            Approvers: [],
            Users:[],
            Modules:[],
            UserName: "",
            Module: "",
            ModuleName: "",
            Name: "",
            Level:"",
            Active:false,
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

    openModal() {
        this.setState({ open: true });
        this.Resetsate();
    }
    closeModal() {
        this.setState({ open: false });
    }
    handleInputChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };
    Resetsate() {
        const data = {
            UserName: "",
            Module: "",
            ModuleName: "",
            Name: "",
            Level: "",
            Active: false,
            ID: "",
            isUpdate: false
        };
        this.setState(data);
    }
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
                } else {
                    swal("", Modules.message, "error");
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
                    const GroupedUsers = [_.groupBy(Users, "Category")];
                    this.setState({ Users: GroupedUsers[0].System_User });
                } else {
                    swal("", Users.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
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
                    this.setState({ Approvers: Approvers });
                } else {
                    swal("", Approvers.message, "error");
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
            Username:this.state.UserName,
            ModuleCode: this.state.Module,
            Level:this.state.Level,
            Active: this.state.Active
        };

        if (this.state.isUpdate) {
            this.UpdateData("/api/Approvers/" + this.state.ID, data);
        } else {
           
            const rows = [...this.state.Approvers];
            const filtereddata = rows.filter(
                item => item.Username == this.state.UserName
            );           
            const filtereddata2 = filtereddata.filter(
                item => item.ModuleCode == this.state.Module
            );    
            if (filtereddata2.length>0){
            swal("","You can not set approver more than once in a given module.","error");
            } else{
               
                this.postData("/api/Approvers", data);
            }
           
        }
    };
    handleEdit = k => {
        
        const data = {          
            ID: k.ID,
            UserName: k.Username,           
            Module: k.ModuleCode,
            ModuleName: k.ModuleName,
            Name: k.Name,
            Level: k.Level,
            Active: !!+k.Active ,
        };

        this.setState(data);
        this.setState({ open: true });
        this.setState({ isUpdate: true });
    };

    handleDelete = k => {
        swal({
          
            text: "Are you sure that you want to delete this record?",
            icon: "warning",
            dangerMode: true,
            buttons: true,
        }).then(willDelete => {
            if (willDelete) {
               
                return fetch("/api/Approvers/" + k.Username + "/" + k.ModuleCode, {
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
                            this.fetchApprovers();
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
                    this.fetchApprovers();

                    if (data.success) {
                        swal("", "Record has been Updated!", "success");
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
                    this.fetchApprovers();

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
    exportpdf = () => {
        var columns = [
            { title: "Username", dataKey: "Username" },
            { title: "Name", dataKey: "Name" },
            { title: "ModuleCode", dataKey: "ModuleCode" },
            { title: "ModuleName", dataKey: "ModuleName" },
            { title: "Level", dataKey: "Level" },
            { title: "ModuleActiveName", dataKey: "Active" }
        ];
        

        const data = [...this.state.Approvers];
        var doc = new jsPDF("p", "pt");
        doc.autoTable(columns, data, {
            margin: { top: 60 },
            beforePageContent: function (data) {
                doc.text("SYSTEM SECURITY APPROVERS", 40, 50);
            }
        });
        doc.save("ArcmApprovers.pdf");
    };
    render() {
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

        const ColumnData = [
            {
                label: "Username",
                field: "Username",
                sort: "asc",
                width: 200
            },
            {
                label: "Name",
                field: "Name",
                sort: "asc",
                width: 200
            },
            {
                label: "ModuleCode",
                field: "ModuleCode",
                sort: "asc",
                width: 200
            }, {
                label: "ModuleName",
                field: "ModuleName",
                sort: "asc",
                width: 200
            }, {
                label: "Level",
                field: "Level",
                sort: "asc",
                width: 200
            },
            {
                label: "Active",
                field: "Active",
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

        const rows = [...this.state.Approvers];

        if (rows.length > 0) {
            rows.forEach(k => {
                const Rowdata = {
                    Username: k.Username,
                    Name: k.Name,
                    ModuleCode: k.ModuleCode,
                    ModuleName: k.ModuleName,
                    Level: k.Level,
                    Active: k.Active,
                    action: (
                        <span>
                            {this.validaterole("Approvers", "Edit") ? (
                                <a
                                    className="fa fa-edit"
                                    style={{ color: "#007bff" }}
                                    onClick={e => this.handleEdit(k, e)}
                                >
                                    Edit |                </a>
                            ) : (
                                    <i>-</i>
                                )}
                            &nbsp;
                     {this.validaterole("Approvers", "Remove") ? (
                                <a
                                    className="fa fa-trash"
                                    style={{ color: "#f44542" }}
                                    onClick={e => this.handleDelete(k, e)}
                                >
                                    Delete                </a>
                            ) : (
                                    <i>-</i>
                                )}
                        </span>
                    )
                };
                Rowdata1.push(Rowdata);
            });
        }
        const Users = [...this.state.Users].map((k, i) => {
            return {
                value: k.Username,
                label: k.Name
            };
        });
       let ModuleOptions = [...this.state.Modules].map((k, i) => {
            return {
                value: k.ModuleCode,
                label: k.Name
            };
        });
       
        return (
            <div>
                <div>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-9">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Approvers</h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-3">
                            <div className="row wrapper ">
                                {this.validaterole("Approvers", "AddNew") ? (
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
                        {this.validaterole("Approvers", "Export") ? (
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
                {this.validaterole("Approvers", "Export") ? (
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
                                        <ExcelSheet data={rows} name="Approvers">
                                            <ExcelColumn label="Username" value="Username" />
                                            <ExcelColumn label="Name" value="Name" />
                                            <ExcelColumn label="ModuleCode" value="ModuleCode" />
                                            <ExcelColumn label="ModuleName" value="ModuleName" />
                                            <ExcelColumn label="Level" value="Level" />
                                            <ExcelColumn label="Active" value="Active" />
                                     </ExcelSheet>
                                    </ExcelFile>
                                ) : null}
                                &nbsp; &nbsp;
                             <Popup
                                    open={this.state.open}
                                    closeOnDocumentClick
                                    onClose={this.closeModal}
                                >
                                    <div className={popup.modal}>
                                        <a className="close" onClick={this.closeModal}>
                                            &times;
                    </a>

                                        <div className={popup.header}>Approval Hierachy </div>

                                        <div className={popup.content}>
                                            <div className="container-fluid">
                                                <div className="col-sm-12">
                                                    <div className="ibox-content">
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className=" row">
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            UserName{" "}
                                                                        </label>
                                                                        <Select
                                                                            name="UserName"
                                                                            value={Users.filter(
                                                                                option =>
                                                                                    option.label === this.state.Name
                                                                            )}
                                                                            //defaultInputValue={this.state.Name}
                                                                            onChange={this.handleSelectChange}
                                                                            options={Users}
                                                                            required
                                                                        />

                                                                       


                                                                    </div>
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputPassword1">
                                                                            Module </label>
                                                                        <Select
                                                                            name="Module"
                                                                            value={ModuleOptions.filter(
                                                                                option =>
                                                                                    option.label === this.state.ModuleName
                                                                            )}
                                                                           
                                                                            onChange={this.handleSelectChange}
                                                                            options={ModuleOptions}
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className=" row">
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            Level{" "}
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            name="Level"
                                                                            required
                                                                            onChange={this.handleInputChange}
                                                                            value={this.state.Level}
                                                                            className="form-control"


                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <br />
                                                                        <br />
                                                                        <input
                                                                            className="checkbox"
                                                                            id="Active"
                                                                            type="checkbox"
                                                                            name="Active"
                                                                            defaultChecked={this.state.Active}
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
                                    </div>
                                </Popup>
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

export default Approvers;

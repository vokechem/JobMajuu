import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
import ReactExport from "react-data-export";
import Select from "react-select";
var dateFormat = require('dateformat');
var jsPDF = require("jspdf");
require("jspdf-autotable");
var _ = require("lodash");
class caseofficers extends Component {
    constructor() {
        super();
        this.state = {
            caseofficers: [],
            Users: [],         
            UserName: "",        
            Active: false,           
            open: false,
            Name:"",
            privilages: [],
            redirect: false,
            isUpdate: false,
            MinValue:"1",
            MaximumValue:"1",           
            NotAvailableFrom:"",
            NotAvailableTo:""
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.Resetsate = this.Resetsate.bind(this);
    }



    handleSelectChange = (Approver, actionMeta) => {
     
            this.setState({ UserName: Approver.value });
            this.setState({ Name: Approver.label });
       



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
            Name: "",
            Active: false,         
            isUpdate: false,
            MinValue: "",
            MaximumValue: "",
            NotAvailableFrom: "",
            NotAvailableTo: ""
        };
        this.setState(data);
    }
   
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
    fetchcaseofficers = () => {
        fetch("/api/caseofficers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(caseofficers => {
                if (caseofficers.length > 0) {
                    this.setState({ caseofficers: caseofficers });
                } else {
                    swal("", caseofficers.message, "error");
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
                            this.fetchcaseofficers();
                            this.ProtectRoute();

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
            // MinValue: this.state.MinValue,
            // MaximumValue: this.state.MaximumValue,           
            NotAvailableFrom: this.state.NotAvailableFrom,
            NotAvailableTo: this.state.NotAvailableTo,
            Active: this.state.Active
        };
       
                    if (this.state.isUpdate) {
                        this.UpdateData("/api/caseofficers/" + this.state.UserName, data);
                    } else {
                        this.postData("/api/caseofficers", data);
                    }
       
        
    };
    handleEdit = k => {
        
        const data = {
            UserName: k.Username, 
            MinValue: k.MinValue,
            MaximumValue: k.MaximumValue,
            Name: k.Name,
            NotAvailableFrom: dateFormat(new Date(k.NotAvailableFrom).toLocaleDateString(), "isoDate"), 
            NotAvailableTo: dateFormat(new Date(k.NotAvailableTo).toLocaleDateString(), "isoDate"), 
          
            Active: !!+k.Active,
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
                return fetch("/api/caseofficers/" + k, {
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
                            this.fetchcaseofficers();
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
                    this.fetchcaseofficers();

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
                    this.fetchcaseofficers();

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
         
            
            { title: "OngoingCases", dataKey: "OngoingCases" },
            { title: "CumulativeCases", dataKey: "CumulativeCases" },
            { title: "NotAvailableFrom", dataKey: "NotAvailableFrom" },
            { title: "NotAvailableTo", dataKey: "NotAvailableTo" },
            { title: "Active", dataKey: "Active" },
        ];


        const data = [...this.state.caseofficers];
        var doc = new jsPDF("p", "pt");
        doc.autoTable(columns, data, {
            margin: { top: 60 },
            beforePageContent: function (data) {
                doc.text("CASE OFFICERS", 40, 50);
            }
        });
        doc.save("Arcmcaseofficers.pdf");
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
            }, {
                label: "OngoingCases",
                field: "OngoingCases",
                sort: "asc",
                width: 200
            },
            {
                label:"CumulativeCases",
                field:"CumulativeCases",

            },
            {
                label: "NotAvailableFrom",
                field: "NotAvailableFrom",

            },
            {
                label: "NotAvailableTo",
                field: "NotAvailableTo",

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

        const rows = [...this.state.caseofficers];
     
        if (rows.length > 0) {
            rows.forEach(k => {
                const Rowdata = {
                    Username: k.Username,
                    Name: k.Name,
                  
                    OngoingCases: k.OngoingCases,
                    CumulativeCases: k.CumulativeCases,
                    NotAvailableFrom: dateFormat(new Date(k.NotAvailableFrom).toLocaleDateString(), "mediumDate"), 
                    NotAvailableTo: dateFormat(new Date(k.NotAvailableTo).toLocaleDateString(), "mediumDate"), 
                    Active: k.Active,
                    action: (
                        <span>
                            {this.validaterole("Case officers", "Edit") ? (
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
                     {this.validaterole("Case officers", "Remove") ? (
                                <a
                                    className="fa fa-trash"
                                    style={{ color: "#f44542" }}
                                    onClick={e => this.handleDelete(k.Username, e)}
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
     

        return (
            <div>
                <div>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-9">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Case officers</h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-3">
                            <div className="row wrapper ">
                                {this.validaterole("Case officers", "AddNew") ? (
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
                        {this.validaterole("Case officers", "Export") ? (
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
                {this.validaterole("Case officers", "Export") ? (
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
                                        <ExcelSheet data={rows} name="caseofficers">
                                                       <ExcelColumn label="Username" value="Username" />
                                            <ExcelColumn label="Name" value="Name" />
                                       
                                            <ExcelColumn label="OngoingCases" value="OngoingCases" />
                                            <ExcelColumn label="CumulativeCases" value="CumulativeCases" />
                                            <ExcelColumn label="NotAvailableFrom" value="NotAvailableFrom" />
                                            <ExcelColumn label="NotAvailableTo" value="NotAvailableTo" />
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

                                        <div className={popup.header}>Case officers </div>

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
                                                            <div className=" row">
                                                                <div className="col-sm">

                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputPassword1">
                                                                            NotAvailable From </label>
                                                                        <input
                                                                            type="date"
                                                                            name="NotAvailableFrom"
                                                                            defaultValue={this.state.NotAvailableFrom}
                                                                            required
                                                                            className="form-control"
                                                                            onChange={this.handleInputChange}
                                                                        />
                                                                    </div>


                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            NotAvailable To
                                                                        </label>
                                                                        <input
                                                                            type="date"
                                                                            name="NotAvailableTo"
                                                                            defaultValue={this.state.NotAvailableTo}
                                                                            required
                                                                            className="form-control"
                                                                            onChange={this.handleInputChange}                                                                          
                                                                        />
                                                                    </div>
                                                                </div>
                                                            
                                                            </div>
                                                            {/* <div className=" row">
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            MinValue{" "}
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            name="MinValue"
                                                                            required
                                                                            onChange={this.handleInputChange}
                                                                            value={this.state.MinValue}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exampleInputEmail1">
                                                                            MaximumValue{" "}
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            name="MaximumValue"
                                                                            required
                                                                            onChange={this.handleInputChange}
                                                                            value={this.state.MaximumValue}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div> */}
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

export default caseofficers;

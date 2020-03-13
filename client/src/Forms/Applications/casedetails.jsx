import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Link } from "react-router-dom";
import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

var dateFormat = require('dateformat');
var jsPDF = require("jspdf");
require("jspdf-autotable");
var _ = require("lodash");
class casedetails extends Component {
    constructor() {
        super();
        this.state = {
            casedetails: [],
            privilages: [],
            UserName: "",
            CurrentOfficer:"",
            CurrentApproveruserName:"",
            Users: [],
            Reason:"",
            ApplicantDetails: [],
            ApplicationNo: "",
            PEDetails: [],
            summary: false,
            casedetailstatus: "",
           

        };
        this.ReasignOfficer = this.ReasignOfficer.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.fetchcasedetails = this.fetchcasedetails.bind(this)
        this.SubmitCaseOfficerReasignment = this.SubmitCaseOfficerReasignment.bind(this)
      

    }
    ToggleAdd = () => {
        this.setState({ showAdd: !this.state.showAdd });
    }
    exportpdf = () => {
        var columns = [
            { title: "Name", dataKey: "Name" },
            { title: "Description", dataKey: "Description" }
        ];

        const data = [...this.state.casedetails];

        var doc = new jsPDF("p", "pt");
        doc.autoTable(columns, data, {
            margin: { top: 60 },
            beforePageContent: function (data) {
                doc.text("ARCM casedetails", 40, 50);
            }
        });
        doc.save("casedetails.pdf");
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
    fetchUsers = () => {
        fetch("/api/caseofficers", {
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
    fetchPEDetails = (ApplicationNo) => {
        this.setState({ PEDetails: [] });
        fetch("/api/PE/" + ApplicationNo + "/ApplicantDetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PEDetails => {
                if (PEDetails.length > 0) {

                    this.setState({ PEDetails: PEDetails });
                } else {
                    swal("", PEDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchApplicantDetails = (ApplicationNo) => {
        this.setState({ ApplicantDetails: [] });
        fetch("/api/Panels/" + ApplicationNo + "/ApplicantDetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {

                    this.setState({ ApplicantDetails: ApplicantDetails });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    handleSelectChange = (UserGroup, actionMeta) => {
        this.setState({ [actionMeta.name]: UserGroup.value });
        if (actionMeta.name === "ApplicationNo") {
            this.fetchApplicantDetails(UserGroup.value)

           

        }

    };
    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
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
    SendMail = (Name, email, ID, subject, ApplicationNo) => {
        const emaildata = {
            to: email,
            subject: subject,
            ID: ID,
            Name: Name,
            ApplicationNo: ApplicationNo
        };

        fetch("/api/NotifyApprover", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(emaildata)
        })
            .then(response => response.json().then(data => { }))
            .catch(err => {
                //swal("Oops!", err.message, "error");
            });
    };
    notifyPanelmembers = (Phone, Name, Email, ApplicationNo) => {
        this.SendSMS(
            Phone,
            "You have been selected to be in a Panel for Application:" + ApplicationNo + "."
        )
        this.SendMail(
            Name,
            Email,
            "PanelMember",
            "PANEL MEMBERSHIP",
            ApplicationNo
        )
    }
   
    SubmitCaseOfficerReasignment = (event) => {
        event.preventDefault();
        let datatosave = {
            ApplicationNo: this.state.ApplicationNo,
            Reason: this.state.Reason,
            Username: this.state.UserName,
        };
        fetch("/api/casedetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(datatosave)
        })
            .then(response =>
                response.json().then(data => {
                    if (data.success) {
                        swal("", "Added successsfuly", "success");
                        this.fetchcasedetails();
                        let AproverEmail = data.results[0].Email;
                      
                        let AproverMobile = data.results[0].Phone;
                        let Name = data.results[0].Name;
                      
                        this.SendSMS(
                            AproverMobile,
                            "You have been Reasigned as case officer for ApplicationNo:" + this.state.ApplicationNo + "."
                        );
                        this.SendMail(
                            Name,
                            AproverEmail,
                            "OfficerReasinment",
                            "CASE ASIGNMENT",
                            this.state.ApplicationNo
                        );
                        this.setState({ summary: false });

                    } else {
                        swal("", "Could not be added please try again", "error");
                    }
                })
            )
            .catch(err => {
                swal("", "Could not be added please try again", "error");
            });

    }
    fetchcasedetails = () => {
        this.setState({ casedetails: [] });
        fetch("/api/casedetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(casedetails => {
                if (casedetails.length > 0) {
                    this.setState({ casedetails: casedetails });
                } else {
                    swal("", casedetails.message, "error");
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
                            this.ProtectRoute();
                            this.fetchUsers();
                            this.fetchcasedetails()
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




    switchMenu = e => {
        this.setState({ summary: false });
    }
    
    
    ReasignOfficer = k => {
        const data = {
            ApplicationNo: k.ApplicationNo,
            summary: true,
            CurrentOfficer:k.Name,
            CurrentApproveruserName:k.UserName
        };

        this.setState(data);
        this.fetchApplicantDetails(k.ApplicationNo)
        this.fetchPEDetails(k.ApplicationNo)
        
    };
    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
    render() {


        let FormStyle = {
            margin: "20px"
        };
        
        const filtereddata = this.state.Users.filter(
            item => item.Username !== this.state.CurrentApproveruserName
        );
        const Users = filtereddata.map((k, i) => {
            return {
                value: k.Username,
                label: k.Name
            };
        });
  
        let headingstyle = {
            color: "#7094db"
        };
        // casedetails.UserName, users.Name, 
        // casedetails.ApplicationNo, casedetails.DateAsigned, 
        // casedetails.Status, casedetails.PrimaryOfficer, casedetails.ReassignedTo,
        //     casedetails.DateReasigned, casedetails.Reason
        const ColumnData = [
            {
                label: "Application No",
                field: "ApplicationNo",
                sort: "asc",
                width: 200
            },
            {
                label: "UserName",
                field: "UserName",
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
                label: "Status",
                field: "Status",
                sort: "asc",
                width: 200
            },
            {
                label: "DateAsigned",
                field: "DateAsigned",
                sort: "asc",
                width: 200
            },
            {
                label:"PrimaryOfficer",
                field:"PrimaryOfficer"
            },
            {
                label: "action",
                field: "action",
                sort: "asc",
                width: 200
            }
        ];
        let Rowdata1 = [];
        var rows1 = [...this.state.casedetails];
        const rows= rows1.filter(
            item => item.Status !== "Re-Assigned"
        );
        if (rows.length > 0) {
            rows.forEach(k => {
                const Rowdata = {
                    ApplicationNo: k.ApplicationNo,
                    UserName: k.UserName,
                    Name: k.Name,
                    Status: k.Status,
                  
                    DateAsigned: dateFormat(new Date(k.DateAsigned).toLocaleDateString(), "isoDate"),
                    PrimaryOfficer: k.PrimaryOfficer,
                    action: (
                        <span>

                            <a

                                style={{ color: "#007bff" }}
                                onClick={e => this.ReasignOfficer(k, e)}
                            >
                                Re-Asign officer
                                 </a>



                        </span>
                    )
                };
                Rowdata1.push(Rowdata);
            });
        }
       
        const officeresss = [...this.state.Users]
        let Rowoff1 = [];
        if (officeresss.length > 0) {
            officeresss.forEach(k => {
                const Rowdata = {
                    y: k.OngoingCases,
                    label: k.Name
                };
                Rowoff1.push(Rowdata);
            });
        }
        const options = {
            //animationEnabled: true,
            theme: "light2",
            title: {
                text: "CASE OFFICERES WORKLOAD"
            },
            axisX: {
                title: "Officers",
                reversed: true,
            },
            axisY: {
                title: "Monthly Active Users",
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: Rowoff1
            }]
        }
        if (this.state.summary) {
            return (
                <div>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-10">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Case Officer ReasignMent For Application: <span style={headingstyle}>{this.state.ApplicationNo}</span> </h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-2">
                            <div className="row wrapper ">

                                <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    onClick={this.openModal}
                                    onClick={this.switchMenu}
                                    className="btn btn-primary  "
                                >
                                    Back
                  </button>
                            </div>
                        </div>
                    </div>

                    <div className="wrapper wrapper-content animated fadeInRight">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 border border-success rounded bg-white">
                                <form style={FormStyle} onSubmit={this.SaveTenders}>
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <label
                                                for="ApplicantID"
                                                className="font-weight-bold "
                                            >
                                                Application NO{" "}
                                            </label>
                                        </div>

                                        <div class="col-sm-4">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="ApplicationNo"
                                                    disabled

                                                    value={this.state.ApplicationNo}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="col-sm-11 ">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h3 style={headingstyle}>
                                                            Applicant
                                                    </h3>


                                                    </div>

                                                </div>
                                                <div className="row border border-success rounded">
                                                    <table className="table table-borderless table-sm">
                                                        {this.state.ApplicantDetails.map(
                                                            (r, i) => (
                                                                <div>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Name:</td>
                                                                        <td>{r.Name}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Address:</td>
                                                                        <td>{r.POBox + "-" + r.PostalCode + " " + r.Town}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Email:</td>
                                                                        <td>{r.Email}</td>
                                                                    </tr>
                                                                    <tr>

                                                                        <td className="font-weight-bold">Telephone</td>
                                                                        <td>{r.Mobile}</td>
                                                                    </tr>
                                                                </div>
                                                            )
                                                        )}
                                                    </table>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-sm-6 ">
                                            <div class="col-sm-11 ">
                                                <div className="row">
                                                    <div className="col-sm-12">


                                                        <h3 style={headingstyle}>
                                                            Procuring Entity
                                                    </h3>
                                                    </div>

                                                </div>
                                                <div className="row border border-success rounded">
                                                    <table className="table table-borderless table-sm">
                                                        {this.state.PEDetails.map(
                                                            (r, i) => (
                                                                <div>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Name:</td>
                                                                        <td>{r.Name}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Address:</td>
                                                                        <td>{r.PEPOBOX + "-" + r.PostalCode + " " + r.Town}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td className="font-weight-bold">Email:</td>
                                                                        <td>{r.Email}</td>
                                                                    </tr>
                                                                    <tr>

                                                                        <td className="font-weight-bold">Telephone</td>
                                                                        <td>{r.Telephone}</td>
                                                                    </tr>
                                                                </div>
                                                            )
                                                        )}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </form>

                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 border border-success rounded">
                                <form style={FormStyle} onSubmit={this.SubmitCaseOfficerReasignment} >
                                  <div className="row ">
                                        <div class="col-sm-6">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <label
                                                        for="TenderName"
                                                        className="font-weight-bold"
                                                    >
                                                       Current Officer
                                                    </label>
                                                </div>
                                                <div class="col-sm-8">
                                                    <input type="text" className="form-control" value={this.state.CurrentOfficer} disabled />
                                                </div>
                                            </div>                            
                                            </div>
                                        <div class="col-sm-6">
                                             <div class="row">
                                                <div class="col-sm-3">
                                                    <label
                                                        for="TenderName"
                                                        className="font-weight-bold"
                                                    >
                                                        New Officer{" "}
                                                    </label>
                                                </div>
                                                <div class="col-sm-8">
                                                    <Select
                                                        name="UserName"
                                                        onChange={this.handleSelectChange}
                                                        options={Users}
                                                        required
                                                    />
                                                </div>
                                             </div>
                                          
                                        </div>
                                      
                                  </div>
                                    <br/>
                                    <div className="row ">
                                        <div class="col-sm-6">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <label
                                                        for="TenderName"
                                                        className="font-weight-bold"
                                                    >
                                                        Reason
                                                    </label>
                                                </div>
                                                <div class="col-sm-8">
                                                    
                                                    <textarea
                                                        onChange={this.handleInputChange}
                                                        value={this.state.Reason}
                                                        type="text"
                                                        required
                                                        name="Reason"
                                                        className="form-control"

                                                    />
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                  
                                                </div>
                                                <div class="col-sm-8">
                                                    <br />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary float-right"
                                                    >
                                                        CONFIRM
                                              </button>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        
                                    
                                        </div>
                                  

                                </form>
                                <div className="row">
                                    <CanvasJSChart options={options}
                                    /* onRef={ref => this.chart = ref} */
                                    />
                                 </div>
                               
                                <br />
                            </div>
                        </div>
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <div className="row wrapper border-bottom white-bg page-heading">
                            <div className="col-lg-10">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <h2>Case Officers</h2>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-lg-2">
                                <div className="row wrapper ">
                                    <Link to="/">
                                        <button
                                            type="button"
                                            style={{ marginTop: 40 }}
                                            onClick={this.openModal}
                                            className="btn btn-warning  "
                                        >
                                            &nbsp; Close
                  </button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>

                    <TableWrapper>
                        <Table Rows={Rowdata1} columns={ColumnData} />
                    </TableWrapper>
                </div>
            )
        }
    }
}

export default casedetails;

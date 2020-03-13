import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
import ReactHtmlParser from "react-html-parser";
var dateFormat = require("dateformat");
class AdjournmentApproval extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            PEDetails: [],
            Applications: [],
            Documents:[],
            TenderName: "",
            TenderNo: "",
            TenderName: "",
            TenderValue: "",
            FilingDate: "",
            summary: false,
            ApplicantDetails: [],
            ApplicationNo: "",
            WithdrawalReason: "",
            Approve: false,
            Decline: false,
            ApprovalRemarks: ""
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchPEDetails = this.fetchPEDetails.bind(this)
        this.fetchApplicantDetails = this.fetchApplicantDetails.bind(this)
        this.fetchApplicationtenderdetails = this.fetchApplicationtenderdetails.bind(this)
        this.openApprove = this.openApprove.bind(this)
    }
    closeModal = () => {
        this.setState({ open: false });
    };

    fetchPendingRequests = () => {
        this.setState({ Applications: [] });
        fetch("/api/adjournment/" + localStorage.getItem("UserName")+"/PendingRequests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
               
                if (ApplicantDetails.length > 0) {
                  
                    this.setState({ Applications: ApplicantDetails });
                } else {
                    swal("", ApplicantDetails.message, "error");
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
    fetchAdjournmentDocuments = (ApplicationNo) => {
        this.setState({ Documents: [] });
        fetch("/api/adjournment/" + ApplicationNo + "/Documents", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Documents => {
                if (Documents.length > 0) {

                    this.setState({ Documents: Documents });
                } else {
                    swal("", Documents.message, "error");
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
    fetchApplicationtenderdetails = (Application) => {
        fetch("/api/DeadlineExtensionApproval/tenderdetails/" + Application, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {

                    this.setState({ TenderNo: ApplicantDetails[0].TenderNo });
                    this.setState({ TenderName: ApplicantDetails[0].Name });
                    this.setState({ TenderValue: ApplicantDetails[0].TenderValue });
                    this.setState({ FilingDate: ApplicantDetails[0].FilingDate });

                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    openApprove = e => {
        e.preventDefault();
        this.setState({ open: true });
        this.setState({ Approve: true });
        this.setState({ Decline: false });
    }
    openDecline = e => {
        e.preventDefault();
        this.setState({ open: true });
        this.setState({ Approve: false });
        this.setState({ Decline: true });
    }
    handleFRIFOLOUS = e => {
        e.preventDefault();
        const data = {
            ApplicationNo: this.state.ApplicationNo,
            RejectionReason: "this.state.ApprovalRemarks"
        };
        swal({

            text: "Are you sure that you want to mark this request as FRIFOLOUS?",
            icon: "warning",
            dangerMode: true,
            buttons: true,
        }).then(willDelete => {
            if (willDelete) {
                return fetch("/api/CaseWithdrawal/frivolous", {
                    method: "Put",
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
                                this.setState({ summary: false });
                                this.fetchPendingRequests();
                            } else {
                                swal("", data.message, "error");
                            }

                        })
                    )
                    .catch(err => {
                        swal("", err.message, "error");
                    });
            }
        });
    }
    GoBack = e => {
        e.preventDefault();
        this.setState({ summary: false });
    };
    handleInputChange = event => {
        // event.preventDefault();
        // this.setState({ [event.target.name]: event.target.value });
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            ApplicationNo: this.state.ApplicationNo,
            ApprovalRemarks: this.state.ApprovalRemarks
        };
        if (this.state.Approve) {
            this.Approve("/api/adjournment/Approve", data);
        }
        if (this.state.Decline) {
            this.Decline("/api/adjournment/Decline", data);
        }

    };
    notifyPanelmembers = (Phone, Name, Email, ApplicationNo) => {
        let smstext = "Dear " + Name + ". A request to adjourn application " + ApplicationNo + " has been Accepted. You will be notified on the new date."
        this.SendSMS(Phone,smstext)
        this.SendMail(
            ApplicationNo,
            Email,
            "CaseAdjournmentAccepted",
            "CASE ADJOURNMENT",
            Name

        )
    }
    notifyAllmembersDeclined = (Phone, Name, Email, ApplicationNo, Reason) => {

        let smstext = "Dear " + Name + ". A request to adjourn application " + ApplicationNo + " has been REJECTED. The Appeal will proceed as scheduled."

        this.SendSMS(
            Phone,
            smstext
        )
        this.SendMailRejected(
            ApplicationNo,
            Email,
            "CaseadjournRejected",
            "CASE ADJOURNMENT",
            Name,
            Reason

        )
    }
    Decline(url = ``, data = {}) {
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
                        let NewList = [data.results]
                        NewList[0].map((item, key) =>
                            this.notifyAllmembersDeclined(item.Mobile, item.Name, item.Email, this.state.ApplicationNo, this.state.ApprovalRemarks)
                        )
                        swal("", "Request has been DECLINED", "success");
                        this.setState({ Approve: false ,
                        Decline: false ,open: false ,
                        summary: false });
                        this.fetchPendingRequests();
                        //}


                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
    Approve(url = ``, data = {}) {
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
                      
                        if (data.results) {
                           
                        let NewList = [data.results]                       
                        NewList[0].map((item, key) =>
                        {
                            if (item.Role ==='Case officer'){
                                let smstext = "Dear " + item.Name + ". A request to adjourn application " + this.state.ApplicationNo + " has been Accepted. You are requested to re-schedule the hearing date."
                                this.SendSMS(item.Mobile, smstext)
                                this.SendMail(
                                    this.state.ApplicationNo,
                                    item.Email,
                                    "CaseAdjournmentCaseofficer",
                                    "CASE ADJOURNMENT",
                                    item.Name
                                )
                            
                            }else{
                                this.notifyPanelmembers(item.Mobile, item.Name, item.Email, this.state.ApplicationNo)
                            }}
                        )}else{
                           
                        }
                        swal("", "Request has been approved", "success");
                        this.setState({ Approve: false ,
                         Decline: false ,
                         open: false ,
                         summary: false });
                        this.fetchPendingRequests();
                        //}


                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
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
                            this.fetchPendingRequests();
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
    formatNumber = num => {
        let newtot = Number(num).toFixed(2);
        return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    handViewApplication = k => {
        this.fetchApplicantDetails(k.ApplicationNo);
        this.fetchAdjournmentDocuments(k.ApplicationNo);
        this.fetchPEDetails(k.ApplicationNo);
        this.fetchApplicationtenderdetails(k.ApplicationNo)
        this.setState({ summary: true });
        this.setState({ WithdrawalReason: k.Reason });
        this.setState({ ApplicationNo: k.ApplicationNo });

    };
    SendMail = (ApplicationNo, email, ID, subject1, Name) => {
        const emaildata = {
            to: email,
            subject: subject1,
            ApplicationNo: ApplicationNo,
            ID: ID,
            Name: Name
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
    SendMailRejected = (ApplicationNo, email, ID, subject1, Name, Reason) => {
        const emaildata = {
            to: email,
            subject: subject1,
            ApplicationNo: ApplicationNo,
            ID: ID,
            Name: Name,
            Reason: Reason
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
    ViewFile = (k, e) => {
        let filepath = k.Path + "/" + k.Filename;
        window.open(filepath);
        //this.setState({ openFileViewer: true });
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

    render() {
        const ColumnData = [
            {
                label: "ApplicationNo",
                field: "ApplicationNo"
            },
            {
                label: "Date",
                field: "Date",
                sort: "asc"
            },
            // {
            //     label: "Reason",
            //     field: "Reason",
            //     sort: "asc"
            // },

            {
                label: "Status",
                field: "Status",
                sort: "asc"
            },
            {
                label: "action",
                field: "action",
                sort: "asc",
                width: 200
            }
        ];
        let Rowdata1 = [];
        const rows = [...this.state.Applications];
        let ViewFile = this.ViewFile;
        if (rows.length > 0) {
            rows.map((k, i) => {

                let Rowdata = {
                    ApplicationNo: (
                        <a onClick={e => this.handViewApplication(k, e)}>
                            {k.ApplicationNo}
                        </a>
                    ),
                    Date: (
                        <a onClick={e => this.handViewApplication(k, e)}>
                            {dateFormat(new Date(k.Date).toLocaleDateString(), "mediumDate")}  
                        </a>
                    ),

                    // Reason: (
                    //     <a onClick={e => this.handViewApplication(k, e)}>
                    //         {k.Reason}
                    //     </a>
                    // ),

                    Status: (
                        <a onClick={e => this.handViewApplication(k, e)}>
                            {k.Status}
                        </a>
                    ),

                    action: (
                        <span>
                            <a
                                style={{ color: "#007bff" }}
                                onClick={e => this.handViewApplication(k, e)}
                            >
                                {" "}
                                VIEW{" "}
                            </a>
                        </span>
                    )
                };
                Rowdata1.push(Rowdata);

            });
        }

        let headingstyle = {
            color: "#7094db"
        };



        if (this.state.summary) {
            return (
                <div>
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
                                {" "}
                                CASE WITHDRAWAL APPROVAL{" "}
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
                                                                Remarks
                                                                         </label>
                                                            <textarea

                                                                class="form-control"
                                                                name="ApprovalRemarks"
                                                                value={this.state.ApprovalRemarks}
                                                                onChange={this.handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 ">
                                                    <div className=" row">
                                                        <div className="col-sm-2" />
                                                        <div className="col-sm-8" />
                                                        <div className="col-sm-2">
                                                            : <button
                                                                    type="submit"
                                                                    className="btn btn-primary float-left"
                                                                >
                                                                    CONFIRM
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

                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-8">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2 className="font-weight-bold">
                                        Application NO:{" "}
                                        <span className="font-weight-bold text-success">
                                            {" "}
                                            {this.state.ApplicationNo}
                                        </span>
                                    </h2>
                                </li>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                       <li>
                                    <h2 className="font-weight-bold">
                                        {/* STATUS:
                                                    <span className="text-success">
                                            {" "}
                                            {this.state.Status}
                                        </span> */}

                                    </h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-4">
                            <div className="row wrapper ">
                                <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    onClick={this.openApprove}
                                    className="btn btn-primary float-right"
                                >
                                    APPROVE </button>&nbsp;
                                     <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    onClick={this.openDecline}
                                    className="btn btn-warning"
                                >
                                    DECLINE </button>&nbsp;
                                    
                                    <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    onClick={this.GoBack}
                                    className="btn btn-secondary float-left"
                                >
                                    &nbsp; BACK </button>
                            </div>
                        </div>
                    </div>
                    <p></p>
                    <div className="border-bottom white-bg p-4">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3 style={headingstyle}> Applicant details</h3>
                                <div className="col-lg-10 border border-success rounded">
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
                            <div className="col-lg-6">
                                <h3 style={headingstyle}>Procuring Entity Details</h3>
                                <div className="col-lg-10 border border-success rounded">
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
                        <div className="row">
                            <div className="col-lg-12 ">
                                <h3 style={headingstyle}>Tender Details</h3>
                                <div className="col-lg-11 border border-success rounded">
                                    <table className="table table-borderless table-sm">
                                        <tr>
                                            <td className="font-weight-bold"> TenderNo:</td>
                                            <td> {this.state.TenderNo}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> TenderName:</td>
                                            <td> {this.state.TenderName}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Tender Value:</td>
                                            <td className="font-weight-bold">
                                                {" "}
                                                {this.formatNumber(this.state.TenderValue)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> FilingDate:</td>
                                            <td> {this.state.FilingDate}</td>
                                        </tr>{" "}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 ">
                                <h3 style={headingstyle}>Reason for adjournment</h3>
                                <div className="col-lg-11 border border-success rounded">
                                    <p>
                                        {ReactHtmlParser(this.state.WithdrawalReason)}
                                       </p>

                                </div>
                            </div>
                        </div>

                        <br />
                        <div className="row">
                            <div className="col-lg-12 ">
                                <h3 style={headingstyle}>Documents attached</h3>
                                <div className="col-lg-11 ">
                                    <table className="table table-sm">
                                        <th>ID</th>
                                        <th>Document Description</th>
                                        <th>FileName</th>

                                        <th>Actions</th>
                                        {this.state.Documents.map((k, i) => {
                                            return (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{k.Description}</td>
                                                    <td>{k.Filename}</td>

                                                    <td>
                                                        <a onClick={e => ViewFile(k, e)} className="text-success">
                                                            <i class="fa fa-eye" aria-hidden="true"></i>View
                              </a>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-12">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Requests Pending Approval</h2>
                                </li>
                            </ol>
                        </div>

                    </div>

                    <TableWrapper>
                        <Table Rows={Rowdata1} columns={ColumnData} />
                    </TableWrapper>
                </div>
            );
        }

    }
}

export default AdjournmentApproval;

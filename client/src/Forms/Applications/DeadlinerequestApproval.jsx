import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import ReactHtmlParser from "react-html-parser";
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
var dateFormat = require("dateformat");
class DeadlinerequestApproval extends Component {
    constructor() {
        super();
        this.state = {
            Requests: [],  
          
            summary: false,         
            openView: false,
            open: false,
            Remarks: "",
            IsAccept: false,
            IsDecline: false,
            NewDeadLine:"",
            FilingDate: "",
            PE: "",
            PEPOBox:"",
            PELocation: "",
            PETown: "",
            PEPostalCode: "",
            PEMobile: "",
            PEEmail: "",
            PEWebsite: ""  ,
            ApplicationNo: "",
            Reason: "",
            RequestedDate: "",
            Status: ""  ,
            
            TenderNo: "",
             TenderName:"",
             TenderValue: "",
             StartDate: ""
           
        };
       
        this.fetchApplicationtenderdetails=this.fetchApplicationtenderdetails.bind(this);
        this.fetchApplicantDetails = this.fetchApplicantDetails.bind(this);
        this.ShowAcceptModal = this.ShowAcceptModal.bind(this);
        this.ShowRejectModal = this.ShowRejectModal.bind(this);
        this.fetchPendingRequests = this.fetchPendingRequests.bind(this)
    }
    formatNumber = num => {
        let newtot = Number(num).toFixed(2);
        return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    fetchPendingRequests = () => {
        this.setState({ Requests: [] });
        fetch("/api/DeadlineExtensionApproval/Requests/" + localStorage.getItem("UserName"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Requests => {
                if (Requests.length > 0) {
                    this.setState({ Requests: Requests });

                } else {
                    swal("", Requests.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
   
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            Approver: localStorage.getItem("UserName"),
            ApplicationNo: this.state.ApplicationNo,
            Remarks: this.state.Remarks,
            NewDeadLine: this.state.RequestedDate
        };
       
        if (this.state.IsAccept) {
           
            this.Approve("/api/DeadlineExtensionApproval", data);
        }
        if (this.state.IsDecline) {
            this.Decline("/api/DeadlineExtensionApproval", data);
        }
        this.setState({ summary: false });
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
    SendMail = (Name, email, ID, subject, NewDeadline) => {
        const emaildata = {
            to: email,
            subject: subject,
            ID: ID,
            Name: Name,
            NewDeadline: NewDeadline,
            Remarks: this.state.Remarks
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
    Approve(url = ``, data = {}) {
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
                        let msg = data.results[0].msg;
                        if (msg ==="Partially Approved"){
                            let AproverEmail = data.results[0].Email;
                            let AproverMobile = data.results[0].Phone;
                            let Name = data.results[0].Name;
                            this.SendSMS(
                                AproverMobile,
                                "New  deadline extension request has been submited and it's awaiting your review."
                            );
                            this.SendMail(
                                Name,
                                AproverEmail,
                                "DeadlineExtension",
                                "REQUEST FOR  DEADLINE EXTENSION",
                                ""
                            );
                        }else{
                             
                            let Mobile = data.results[0].Mobile;
                            let Email = data.results[0].Email;
                            let Name = data.results[0].Name;
                            let NewDeadline = data.results[0].NewDeadline;
                            this.SendSMS(
                                Mobile,
                                "Your request for  deadline extension  has been approved.You are expected to submit your response before " + NewDeadline+"."
                            );
                            this.SendMail(
                                Name,
                                Email,
                                "DeadlineExtensionApproved",
                                "REQUEST FOR  DEADLINE EXTENSION",
                                NewDeadline
                            );
                        }
                      

                        this.fetchPendingRequests();
                        swal("", "Application Approved", "success");

                        this.setState({ open: false });
                    
                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
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
                        let Mobile = data.results[0].Mobile;
                        let Email = data.results[0].Email;
                        let Name = data.results[0].Name;
                        let NewDeadline = data.results[0].NewDeadline;
                      
                        this.SendSMS(
                            Mobile,
                            "Your request for deadline extension has been DECLINED.You are expected to submit your response before " + NewDeadline + "."
                        );
                        this.SendMail(
                            Name,
                            Email,
                            "DeadlineExtensionDeclined",
                            "REQUEST FOR DEADLINE EXTENSION",
                            NewDeadline
                            
                        );
                        this.fetchPendingRequests();

                        swal("", "Application Declined", "success");
                        this.setState({ open: false });
                    
                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }


    GoBack = e => {
        e.preventDefault();
        this.setState({ summary: false });
    }
    ShowAcceptModal = e => {
       
        this.setState({ IsAccept: true, IsDecline: false, open: true });
    }
    ShowRejectModal = e => {
       
        this.setState({ IsDecline: true, IsAccept: false,open: true });
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
    fetchApplicantDetails = (Applicant) => {
        fetch("/api/applicants/" + Applicant, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {
                    this.setState({
                        ApplicantPostalCode: ApplicantDetails[0].PostalCode
                    });
                    this.setState({ ApplicantPOBox: ApplicantDetails[0].POBox });
                    this.setState({ ApplicantTown: ApplicantDetails[0].Town });

                    this.setState({ ApplicantDetails: ApplicantDetails });
                    this.setState({ Applicantname: ApplicantDetails[0].Name });

                    this.setState({ ApplicantLocation: ApplicantDetails[0].Location });
                    this.setState({ ApplicantMobile: ApplicantDetails[0].Mobile });
                    this.setState({ ApplicantEmail: ApplicantDetails[0].Email });
                    this.setState({ ApplicantPIN: ApplicantDetails[0].PIN });
                    this.setState({ ApplicantWebsite: ApplicantDetails[0].Website });

                    this.setState({ ApplicantID: ApplicantDetails[0].ID });

                } else {
                    swal("", ApplicantDetails.message, "error");
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
                    this.setState({ StartDate: ApplicantDetails[0].StartDate });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    handViewApplication = k => {
            
        this.fetchApplicantDetails(k.Applicantusername)
        this.fetchApplicationtenderdetails(k.ApplicationNo)
        const data = {           
            FilingDate: new Date(k.FilingDate).toLocaleDateString(),
            PE:k.Name,
            PEPOBox: k.POBox,
            PELocation:k.Location,
            PETown: k.Town,
            PEPostalCode: k.PostalCode,
            PEMobile: k.Mobile,
            PEEmail: k.Email,
            PEWebsite: k.Website,            
            IsAccept: false,
            IsDecline: false,
           
            ApplicationNo: k.ApplicationNo,
            Reason: k.Reason,
            RequestedDate: dateFormat(new Date(k.RequestedDate).toLocaleDateString(), "isoDate") ,
            Status: k.Status

        };
        this.setState({ summary: true });
        this.setState(data);

    }
    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
   
    closeModal = () => {
        this.setState({ open: false });
    }
   
    render() {


        const ColumnData = [
            {
                label: "ApplicationNo",
                field: "ApplicationNo",
            },
            {
                label: "Procuring Entity",
                field: "Name",
                sort: "asc"
            },
            {
                label: "RequestedDate",
                field: "RequestedDate",
                sort: "asc"
            },
            {
                label: "FilingDate",
                field: "FilingDate",
                sort: "asc"
            },
            {
                label: "Status",
                field: "Status",
                sort: "asc"
            },
            {
                label: "Action",
                field: "Action",
                sort: "asc",
                width: 200
            }
        ];
        let Rowdata1 = [];
        const rows = [...this.state.Requests];
        if (rows.length > 0) {
            rows.map((k, i) => {
                let Rowdata = {
                    ApplicationNo: k.ApplicationNo,
                    Name: k.Name,
                    RequestedDate: new Date(k.RequestedDate).toLocaleDateString(),
                    FilingDate: new Date(k.FilingDate).toLocaleDateString(),
              
                    Status: k.Status,

                    Action: (
                        <span>
                            <a
                                className="fa fa-edit"
                                style={{ color: "#007bff" }}
                                onClick={e => this.handViewApplication(k, e)}
                            >
                                {" "}
                                View </a>

                        </span>
                    )
                };
                Rowdata1.push(Rowdata);
            });
        }

        let headingstyle = {
            color: "#7094db"
        }


        if (this.state.summary) {
            return (
                <div>

                    <Popup
                        open={this.state.open}
                        closeOnDocumentClick
                        onClose={this.closeModal}
                    >
                        <div className={popup.modal}>


                            <div className={popup.content}>
                                <div className="container-fluid">
                                    <div className="col-sm-12">
                                        <div className="ibox-content">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className=" row">
                                                    <div className="col-sm-6">
                                                        
                                                            <label
                                                                htmlFor="exampleInputPassword1"
                                                                className="font-weight-bold"
                                                            >
                                                                New date
                                                                 </label>
                                                            <input
                                                                type="date"
                                                            name="RequestedDate"
                                                                required
                                                              defaultValue={this.state.RequestedDate}
                                                                className="form-control"
                                                                onChange={this.handleInputChange}
                                                            />
                                                        
                                                    </div>
                                                </div>
                                                <div className=" row">
                                                    <div className="col-sm">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="exampleInputPassword1"
                                                                className="font-weight-bold"
                                                            >
                                                                Remarks
                                                                 </label>
                                                            <textarea
                                                                onChange={this.handleInputChange}
                                                                value={this.state.Remarks}
                                                                type="text"
                                                                required
                                                                name="Remarks"
                                                                className="form-control"
                                                                id="exampleInputPassword1"

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 ">
                                                    <div className=" row">

                                                        <div className="col-sm-8" />
                                                        <div className="col-sm-4">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary "
                                                            >
                                                                Confirm
                                                                </button>
                                                            &nbsp;&nbsp;
                                                                <button
                                                                className="btn btn-danger "
                                                                onClick={this.closeModal}
                                                            >
                                                                Cancel
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
                                    <h2 className="font-weight-bold">Request for Response Deadline Extension for Application NO: <span style={headingstyle}> {this.state.ApplicationNo}</span></h2>
                                </li>

                            </ol>
                        </div>
                        <div className="col-lg-4">

                            <button className="btn btn-primary" onClick={this.ShowAcceptModal} style={{ marginTop: 20 }}>Accept</button>
                            &nbsp;&nbsp;
                                <button className="btn btn-danger " onClick={this.ShowRejectModal} style={{ marginTop: 20 }}>Reject</button>
                            &nbsp;&nbsp;
                                <button
                                type="button"
                                style={{ marginTop: 20 }}
                                onClick={this.GoBack}
                                className="btn btn-primary"
                            >
                                Back
                                </button>

                        </div>
                        
                    </div>
                    <p></p>
                    <div className="border-bottom white-bg p-4">

                        <div className="row">
                            <div className="col-sm-10">                            
                                <h3 style={headingstyle}>Request Submited By</h3>
                                <div className="col-lg-12 border border-success rounded">
                                    <table className="table table-borderless table-sm">
                                        <tr>
                                            <td className="font-weight-bold"> Name:</td>
                                            <td> {this.state.PE}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Email:</td>
                                            <td> {this.state.PEEmail}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Mobile:</td>
                                            <td> {this.state.PEMobile}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> POBOX:</td>
                                            <td>
                                                {" "}
                                                {this.state.PEPOBox}-{this.state.PEPostalCode}
                                            </td>
                                        </tr>{" "}
                                        <tr>
                                            <td className="font-weight-bold"> Town:</td>
                                            <td> {this.state.PETown}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Website:</td>
                                            <td> {this.state.PEWebsite}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <br/>
                     
                       
                        <div className="row">
                            <div className="col-sm-10">
                                <h3 style={headingstyle}>Tender Details</h3>
                                <div className="col-lg-12 border border-success rounded">
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
                                            <td className="font-weight-bold"> Opening Date:</td>
                                            <td>{new Date(this.state.StartDate).toLocaleDateString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Date of Notification of Award/Occurrence of Breach: </td>
                                            <td> {this.state.AwardDate}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">
                                                {" "}
                                                Application Timing:
                        </td>
                                            <td> {this.state.Timer}</td>
                                        </tr>{" "}
                                        <tr>
                                            <td className="font-weight-bold"> TenderType:</td>
                                            <td> {this.state.TenderTypeDesc}</td>
                                        </tr>
                                        {this.state.TenderType === "B" ? (
                                            <tr>
                                                <td className="font-weight-bold"> TenderCategory:</td>
                                                <td> {this.state.TenderCategory}</td>
                                            </tr>
                                        ) : null}{" "}
                                        {this.state.TenderType === "B" ? (
                                            <tr>
                                                <td className="font-weight-bold">
                                                    {" "}
                                                    TenderSubCategory:
                          </td>
                                                <td> {this.state.TenderSubCategory}</td>
                                            </tr>
                                        ) : null}
                                    </table>
                                   </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-10">
                                <h3 style={headingstyle}>Request Details</h3>
                                <div className="col-lg-12 border border-success rounded">
                                    <br />
                                    <h3 > <span > Expected Response Date:</span>  <span className="font-weight-bold text-danger">{this.state.RequestedDate}</span> </h3>
                                    <h3 >Requested Date: <span className="font-weight-bold text-success">{this.state.RequestedDate}</span> </h3>
                                    <h3 style={headingstyle}>Reasons for Deadline Extension</h3>
                                    {ReactHtmlParser(this.state.Reason)}
                                    <br />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )

        } else {
            return (
                <div>

                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-12">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2> REQUESTS AWAITING MY REVIEW</h2>
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

export default DeadlinerequestApproval;

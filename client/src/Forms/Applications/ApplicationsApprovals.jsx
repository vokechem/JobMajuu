import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import ReactHtmlParser from "react-html-parser";
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
var dateFormat = require('dateformat');
class ApplicationsApprovals extends Component {
    constructor() {
        super();
        this.state = {
            Applications: [],
            PE: [],
            stdtenderdocs: [],
            TenderNo: "",
            TenderID: "",
            TenderValue: "",
            ApplicationID: "",
            TenderName: "",
            PEID: "",
            StartDate: "",
            ClosingDate: "",
            ApplicationREf: "",
            ApplicantID: "",
            AdendumDescription: "",
            EntryType: "",
            RequestDescription: "",
            GroundDescription: "",
            profile: true,
            summary: false,
            IsUpdate: false,
            Documenttype: "",
            DocumenttypeID: "",
            selectedFile: null,
            loaded: 0,
            DocumentDescription: "",
            AddedAdendums: [],
            AdendumStartDate: "",
            RequestsAvailable: false,
            GroundsAvailable: false,
            AdendumsAvailable: false,
            AdendumClosingDate: "",
            AddAdedendums: false,
            ApplicantDetails: [],
            Applicantname: "",
            ApplicationGrounds: [],
            ApplicationDocuments: [],
            Applicationfees: [],
            FilingDate: "",
            PEName: "",
            ApplicationNo: "",
            openView: false,
            open:false,
            Remarks:"",
            IsAccept:false,
            IsDecline:false,
            TotalAmountdue:""

        };
        // this.fetchMyApplications = this.fetchMyApplications.bind(this);
        this.Resetsate = this.Resetsate.bind(this);
        this.fetchApplicantDetails = this.fetchApplicantDetails.bind(this)
    }
    fetchMyApplications = () => {
        this.setState({ Applications: [] });
        fetch("/api/ApplicationsApprovals/" + localStorage.getItem("UserName"), {
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
                    this.setState({ open: false });
                    this.setState({ profile: false }); 
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchApplicationGrounds = (Applicationno) => {
        fetch("/api/grounds/" + Applicationno, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicationGrounds => {
                if (ApplicationGrounds.length > 0) {

                    this.setState({ ApplicationGrounds: ApplicationGrounds });


                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
    fetchApplicationfees = (Applicationno) => {
        fetch("/api/applicationfees/" + Applicationno, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Applicationfees => {
                if (Applicationfees.length > 0) {

                    this.setState({ Applicationfees: Applicationfees });
                    this.setState({ TotalAmountdue: Applicationfees[0].total });

                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    NotifyCaseOfficer = (Applicationno) => {
       
        fetch("/api/casedetails/" + Applicationno, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(response =>
                response.json().then(data => {
                    if (data.results.length > 0) {                    
                    let AproverEmail = data.results[0].Email;
                    let AproverMobile = data.results[0].Phone;
                    let Name = data.results[0].Name;
                    let ApplicationNo = Applicationno;
                    this.SendSMS(
                        AproverMobile,
                        "You have been selected as case officer for  Application:" + ApplicationNo + "."
                    );
                    this.SendMail(
                        Name,
                        AproverEmail,
                        "OfficerReasinment",
                        "CASE ASIGNMENT",
                        ApplicationNo,
                        " "
                    );
                } 
            })
            .catch(err => {
                swal("", err.message, "error");
            })
            )
    };
    fetchApplicationDocuments = (Applicationno) => {
      
        fetch("/api/applicationdocuments/" + Applicationno, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicationDocuments => {
                if (ApplicationDocuments.length > 0) {
                    this.setState({ ApplicationDocuments: ApplicationDocuments });

                } else {
                    swal("", ApplicationDocuments.message, "error");
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
            Remarks: this.state.Remarks
        };     
        if (this.state.IsAccept){
            this.Approve("/api/ApplicationsApprovals", data);
        }
        if (this.state.IsDecline) {
            this.Decline("/api/ApplicationsApprovals", data);
        }
     
        this.setState({ summary: false });
    };
    GenerateRb1(ApplicationNo) {
        let Grounds=[];
        let Request=[]
        let rows = [...this.state.ApplicationGrounds]
        rows.map((k, i) => {
            if (k.EntryType === "Grounds for Appeal") {
                Grounds.push(k);
            }else{
                Request.push(k);
            }
           
        });
        const data = {
            Grounds: Grounds ,
            Request: Request,
            TenderNo: this.state.TenderNo,
            Applicationno: ApplicationNo,
            PEName: this.state.PEName,
            ApplicationDate: this.state.FilingDate,
            ReceivedDate: dateFormat(new Date().toLocaleDateString(), "mediumDate"),
            ApplicantName: this.state.Applicantname,
            PysicalAddress: this.state.ApplicantPOBox +"-"+ this.state.ApplicantPostalCode +" "+ this.state.ApplicantTown,
            Fax: " ",
            Telephone: this.state.ApplicantMobile,
            Email: this.state.ApplicantEmail
        }; 
        fetch("/api/GenerateRB1Form", {
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
                        //swal("", data.message, "success"); 
                    } else {
                        //swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
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
                      //  swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
               // swal("", err.message, "error");
            });
    }
    SendMail = (Name, email, ID, subject, ApplicationNo, ResponseTimeout) => {
        const emaildata = {
            to: email,
            subject: subject,
            ID: ID,
            Name: Name,
            ApplicationNo: ApplicationNo,
            ResponseTimeout: ResponseTimeout,
            tendername: this.state.TenderName,
                tenderNo: this.state.TenderNo,
            PE: this.state.PEName ,
            Applicant: this.state.Applicantname
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
    notifyPanelmembers = (AproverMobile, Name, AproverEmail, ApplicationNo, Msg, ResponseTimeout) => {        

        if (Msg == "PE") {
           
            this.SendSMS(
                AproverMobile,
                "New Application " + ApplicationNo + " has been submited. You are required to Login to ARCMS and respond to it before: " + ResponseTimeout
            );
            this.SendMail(
                Name,
                AproverEmail,
                "Notify PE",
                "REQUEST FOR APPLICATION RESPONSE",
                ApplicationNo,
                ResponseTimeout
            );
            this.GenerateRb1(ApplicationNo);
        }  
        
        if (Msg == "Interested Party") {
            this.SendSMS(
                AproverMobile,
                "Application " + ApplicationNo + " has been filed and Procuring Entity has been notified to respond to it before: " + ResponseTimeout
            );
            this.SendMail(
                Name,
                AproverEmail,
                "Notify Applicant Interested Application Approved",
                "APPLICATION FOR REVIEW FILED",
                ApplicationNo,
                ResponseTimeout
            );
        }
        if (Msg == "Applicant") {         
            this.SendSMS(
                AproverMobile,
                "Application " + ApplicationNo + " has been APPROVED and Procuring Entity has been notified to respond to it before: " + ResponseTimeout
            );
            this.SendMail(
                Name,
                AproverEmail,
                "Notify Applicant on Application Approved",
                "APPLICATION APPROVED",
                ApplicationNo,
                ResponseTimeout
            );
        }
        if (Msg == "Incomplete") {
            this.SendSMS(
                AproverMobile,
                "Application " + ApplicationNo + " has been partialy approved and it is still waiting for your review to be completed."
            );
            this.SendMail(
                Name,
                AproverEmail,
                "Approver",
                "APPLICATION APPROVAL",
                ApplicationNo,
                ResponseTimeout
            );
        }

    }
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
                        if (data.results.length > 0) {
                            let NewList = [data.results]
                            NewList[0].map((item, key) =>                                
                                this.notifyPanelmembers(item.Mobile, item.Name, item.Email, item.ApplicationNo, item.Msg, item.ResponseTimeout)
                            )
                            this.NotifyCaseOfficer(data.results[0].ApplicationNo) 
                        }                                         
                        swal("", "Application Approved", "success");
                        this.fetchMyApplications();  
                         
                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
    sendDeclineNotification = (Mobile, Name, Email, ApplicationNo)=>{
        this.SendSMS(
            Mobile,
            "Application " + ApplicationNo + " that you had submited to ACRB has been declined."
        );
        this.SendMail(
            Name,
            Email,
            "Application Declined",
            "APPLICATION DECLINED",
            ApplicationNo,
            this.state.Remarks
        );
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
                        if (data.results.length > 0) {
                            let NewList = [data.results]
                            NewList[0].map((item, key) =>
                                this.sendDeclineNotification(item.Mobile, item.Name, item.Email, item.ApplicationNo)
                            )
                            
                        }  
                        swal("", "Application Declined", "success"); 
                        this.fetchMyApplications();        
                        
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
    ShowAcceptModal=e=>{
        
        this.setState({ IsAccept: true, IsDecline: false, open: true  });
    }
    ShowRejectModal = e => {
       
        this.setState({ IsDecline: true, IsAccept: false, open: true });
    }
    Resetsate() {
        const data = {
            TenderNo: "",
            TenderID: "",
            TenderValue: "",
            ApplicationID: "",
            TenderName: "",
            PEID: "",
            StartDate: "",
            ClosingDate: "",
            ApplicationREf: "",
            AdendumDescription: "",
            EntryType: "",
            RequestDescription: "",
            GroundDescription: "",
            ApplicationGrounds: [],
            ApplicationDocuments: [],
            Applicationfees: [],
            FilingDate: "",
            PEName: "",
            ApplicationNo: "",
            AddedAdendums: [],
            AdendumStartDate: "",
            RequestsAvailable: false,
            GroundsAvailable: false,
            AdendumsAvailable: false,
            AdendumClosingDate: "",
            AddAdedendums: false,
            IsUpdate: false,
        };
        this.setState(data);
    }

    fetchTenderAdendums = TenderID => {
        fetch("/api/tenderaddendums/" + TenderID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(AddedAdendums => {
                if (AddedAdendums.length > 0) {
                    this.setState({ AddedAdendums: AddedAdendums });
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
                            this.fetchMyApplications();  
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
    handViewApplication = k => {       
        this.Resetsate();
        this.setState({ AddedAdendums: [] });
        this.setState({ ApplicationGrounds: [] });
        this.setState({ ApplicationDocuments: [] });
        this.setState({ Applicationfees: [] });
        this.setState({ TotalAmountdue: "" });
        this.fetchApplicationGrounds(k.ID)
        this.fetchApplicationfees(k.ID)
        this.fetchApplicationDocuments(k.ID)
        this.fetchTenderAdendums(k.TenderID);
        this.fetchApplicantDetails(k.Applicantusername)
        const data = {
            TenderType: k.TenderType ,
            TenderSubCategory: k.TenderSubCategory ,
            TenderCategory: k.TenderCategory ,
             Timer: k.Timer,
            AwardDate: dateFormat(new Date(k.AwardDate).toLocaleDateString(), "mediumDate"),
            TenderTypeDesc: k.TenderTypeDesc ,
            PaymentStatus: k.PaymentStatus,
            PEPOBox: k.PEPOBox,
            PEPostalCode: k.PEPostalCode,
            PETown: k.PETown,
            PEPostalCode: k.PEPostalCode,
            PEMobile: k.PEMobile,
            PEEmail: k.PEEmail,
            PEWebsite: k.PEWebsite,
            TenderID: k.TenderID,
            ApplicationID: k.ID,
            ApplicationNo: k.ApplicationNo,
            TenderNo: k.TenderNo,
            ApplicationREf: k.ApplicationREf,
            PEName: k.PEName,
            FilingDate: dateFormat(new Date(k.FilingDate).toLocaleDateString(), "mediumDate"),
            TenderName: k.TenderName,
            Status: k.Status,
            TenderValue: k.TenderValue,
            IsAccept: false,
            IsDecline: false,
            StartDate: dateFormat(new Date(k.StartDate).toLocaleDateString(), "mediumDate"),
            ClosingDate: dateFormat(new Date(k.ClosingDate).toLocaleDateString(), "mediumDate")
        };
        this.setState({ summary: true });      
        this.setState(data);
     
    }
    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    openRequestTab() {
        document.getElementById("nav-profile-tab").click();
    }
    closeModal=() =>{
        this.setState({ open: false });
    }
    ViewFile = (k, e) => {
        let filepath = k.Path + "/" + k.FileName;
        window.open(filepath);
        //this.setState({ openFileViewer: true });
    };
    render() {

    
        const ColumnData = [
            {
                label: "ApplicationNo",
                field: "ApplicationNo",
            },
            {
                label: "TenderName",
                field: "TenderName",
                sort: "asc"
            },
          
            {
                label: "FilingDate",
                field: "FilingDate",
                sort: "asc"
            },
            {
                label: "ApplicationREf",
                field: "ApplicationREf",
                sort: "asc"
            },
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
        if (rows.length > 0) {
            rows.map((k, i) => {
                let Rowdata = {
                    ApplicationNo: k.ApplicationNo,
                    TenderName: k.TenderName,                   
                    FilingDate: dateFormat(new Date(k.FilingDate).toLocaleDateString(), "mediumDate"),
                    ApplicationREf: k.ApplicationREf,
                    Status: k.Status,

                    action: (
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

        let ViewFile = this.ViewFile;
   
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
                            <div className="col-lg-5">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <h2 className="font-weight-bold">Application NO: {this.state.ApplicationNo}</h2>
                                    </li>
                                    
                                </ol>
                            </div>
                            <div className="col-lg-7">
                               
                                <button className="btn btn-primary" onClick={this.ShowAcceptModal} style={{ marginTop: 20 }}>Approve</button>
                                  &nbsp;&nbsp;
                                <button className="btn btn-danger " onClick={this.ShowRejectModal} style={{ marginTop: 20 }}>Decline</button>
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
                            <div className="col-lg-1">
                                <div className="row wrapper ">
                                   
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
                                            <tr>
                                                <td className="font-weight-bold"> NAME:</td>
                                                <td> {this.state.Applicantname}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"> EMAIL:</td>
                                                <td> {this.state.ApplicantEmail}</td>
                                            </tr>

                                            <tr>
                                                <td className="font-weight-bold"> Mobile:</td>

                                                <td> {this.state.ApplicantMobile}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"> POBOX:</td>
                                                <td>
                                                    {" "}
                                                    {this.state.ApplicantPOBox}-
                                                    {this.state.ApplicantPostalCode}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"> Town:</td>
                                                <td> {this.state.ApplicantTown}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"> Website:</td>
                                                <td> {this.state.ApplicantWebsite}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h3 style={headingstyle}>Procuring Entity Details</h3>
                                    <div className="col-lg-10 border border-success rounded">
                                        <table className="table table-borderless table-sm">
                                            <tr>
                                                <td className="font-weight-bold"> Name:</td>
                                                <td> {this.state.PEName}</td>
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
                            <div className="row">
                                <div className="col-lg-12 ">
                                    <h3 style={headingstyle}>Tender Details</h3>
                                    <div className="col-lg-11 border border-success rounded">
                                        <table className="table table-borderless table-sm">
                                            <tr>
                                                <td className="font-weight-bold"> Application Date:</td>
                                                <td> {this.state.FilingDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"> Date of Notification of Award/Occurrence
                                                    of Breach:</td>
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
                                        <h3 style={headingstyle}>Tender Addendums</h3>
                                        <table className="table table-borderless table-sm">
                                            <th>No</th>
                                            <th>StartDate</th>
                                            <th>ClosingDate</th>
                                            <th>Description</th>

                                            {this.state.AddedAdendums.map((r, i) => (
                                                <tr>
                                                    <td className="font-weight-bold">{r.AdendumNo}</td>

                                                    <td className="font-weight-bold">
                                                        {dateFormat(new Date(r.StartDate).toLocaleDateString(), "mediumDate")}
                                                     
                                                    </td>
                                                    <td className="font-weight-bold">
                                                        {dateFormat(new Date(r.ClosingDate).toLocaleDateString(), "mediumDate")}
                                                       
                                                    </td>
                                                    <td className="font-weight-bold">{r.Description}</td>
                                                </tr>
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-lg-12 ">
                                    <h3 style={headingstyle}>Grounds for Appeal</h3>
                                    <div className="col-lg-11 border border-success rounded">
                                        {this.state.ApplicationGrounds.map(function (k, i) {
                                            if (k.EntryType === "Grounds for Appeal") {
                                                return (
                                                    <p>
                                                        <h3>Ground NO:{k.GroundNO}</h3>

                                                        {ReactHtmlParser(k.Description)}
                                                    </p>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-lg-12 ">
                                    <h3 style={headingstyle}>Requested Orders</h3>

                                    <div className="col-lg-11 border border-success rounded">
                                        {this.state.ApplicationGrounds.map(function (k, i) {
                                            if (k.EntryType === "Requested Orders") {
                                                return (
                                                    <p>
                                                        <h3>Request NO:{k.GroundNO}</h3>

                                                        {ReactHtmlParser(k.Description)}
                                                    </p>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-lg-12 ">
                                    <h3 style={headingstyle}>Documents Attached</h3>
                                    <div className="col-lg-11 border border-success rounded">
                                        <table className="table table-sm">
                                            <th>ID</th>
                                            <th>Document Description</th>
                                            <th>FileName</th>
                                            <th>Date Uploaded</th>
                                            <th>Actions</th>
                                            {this.state.ApplicationDocuments.map(function (k, i) {
                                                return (
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{k.Description}</td>
                                                        <td>{k.FileName}</td>
                                                        <td>
                                                            {dateFormat(new Date(k.DateUploaded).toLocaleDateString(), "mediumDate")}
                                                        
                                                        </td>
                                                        <td>
                                                            {/* <a
                                href={k.Path + "/" + k.FileName}
                                target="_blank"
                                >
                                Download
                                </a> */}

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
                            <br />
                            <div className="row">
                                <div className="col-lg-12 ">
                                    <h3 style={headingstyle}>Fees</h3>
                                    <div className="col-lg-11 border border-success rounded">
                                        <div class="col-sm-8">
                                            <table class="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Fees description</th>
                                                        <th scope="col">Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.Applicationfees.map((r, i) => (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{r.EntryType}</td>
                                                            <td className="font-weight-bold">
                                                                {this.formatNumber(r.AmountDue)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <th></th>
                                                        <th>Total Amount</th>
                                                        <th className="font-weight-bold text-danger">  {this.formatNumber(this.state.TotalAmountdue)}</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {this.state.PaymentStatus === "Not Submited" ?
                                                <h4>Fees Status: <span className="text-danger">NOT PAID</span> </h4> : null
                                            }
                                            {this.state.PaymentStatus === "Approved" ?
                                                <h4>Fees Status: <span className="text-success">PAID</span> </h4> : null
                                            }
                                            {this.state.PaymentStatus === "Submited" ?
                                                <h4>Fees Status: <span className="text-warning">Payment Pending Confirmation</span> </h4> : null
                                            }
                                        </div>
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
                                        <h2> APPLICATIONS AWAITING MY REVIEW</h2>
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

export default ApplicationsApprovals;

import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./../../Styles/tablestyle.css";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
var dateFormat = require("dateformat");
class PEApplications extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openRequest: false,
            ApplicantEmail: data.Email,
            ApplicantPhone: data.Phone,
            Applications: [],   
            interestedparties: [],          
            Board: data.Board,
            TimerStatus:"",
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
            summary: false,
            ApplicationClosingDate:"",
            DocumentDescription: "",
            AddedAdendums: [],
            AdendumStartDate: "",
            RequestsAvailable: false,
            GroundsAvailable: false,
            AdendumsAvailable: false,
            AdendumClosingDate: "",
            AdendumNo: "",
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
            DocumentsAvailable: false,
            GroundNO: "",

            ApplicantLocation: "",
            ApplicantMobile: "",
            ApplicantEmail: "",
            ApplicantPIN: "",
            ApplicantWebsite: "",

            PEPOBox: "",
            PEPostalCode: "",
            PETown: "",
            PEPostalCode: "",
            PEMobile: "",
            PEEmail: "",
            PEWebsite: "",
            TotalAmountdue: "",

            ApplicantPostalCode: "",
            ApplicantPOBox: "",
            ApplicantTown: "",

            alert: null
        };
       // this.handViewApplication = this.handViewApplication.bind(this);
      //  this.fetchApplicantDetails = this.fetchApplicantDetails.bind(this)
       
    }
    fetchinterestedparties = (ApplicationID) => {
        this.setState({ interestedparties: [] });
        fetch("/api/interestedparties/" + ApplicationID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(interestedparties => {
                if (interestedparties.length > 0) {
                    this.setState({ interestedparties: interestedparties });
                } else {
                    toast.error(interestedparties.message);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };
    
    closeModal = () => {
        this.setState({ open: false });
    };

    closeFileViewModal = () => {
        this.setState({ openFileViewer: true });
    };
    ViewFile = (k, e) => {
        let filepath = k.Path + "/" + k.FileName;
        window.open(filepath);
        //this.setState({ openFileViewer: true });
    };
    closeRequestModal = () => {
        this.setState({ openRequest: false });
    };
    OpenGroundsModal = e => {
        e.preventDefault();
        this.setState({ open: true });
    };
    OpenRequestsModal = e => {
        e.preventDefault();
        this.setState({ openRequest: true });
    };
    fetchMyApplications = () => {
        fetch("/api/applications/" +localStorage.getItem("UserName")+"/PE", {
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
    fetchApplicationGrounds = Applicationno => {
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
                swal("", err.message, "error");
            });
    };
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
    fetchApplicationfees = Applicationno => {
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
    fetchApplicationDocuments = Applicationno => {
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
    fetchApplicantDetails = (ApplicantID) => {
        let dat={          
         ApplicantPostalCode: "",
          ApplicantPOBox: "",
          ApplicantTown: "",
             ApplicantDetails: "",
           Applicantname: "",
            ApplicantLocation: "",
             ApplicantMobile: "",
             ApplicantEmail: "",
            ApplicantPIN: "",
            ApplicantWebsite: "",
             ApplicantID: ""
        }
        this.setState(dat);
        fetch("/api/applicants/" + ApplicantID, {
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
    hideAlert() {

        this.setState({
            alert: null
        });
    }    
      GoBack = e => {
        e.preventDefault();
        this.setState({ summary: false });
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
 
    handViewApplication = k => {
    
        this.setState({ AddedAdendums: [] });
        this.setState({ ApplicationGrounds: [] });
        this.setState({ ApplicationDocuments: [] });
        this.setState({ Applicationfees: [] });
        this.setState({ TotalAmountdue: "" });
        this.fetchApplicationGrounds(k.ID);
        this.fetchApplicationfees(k.ID);
        this.fetchApplicationDocuments(k.ID);
        this.fetchTenderAdendums(k.TenderID);
        this.fetchApplicantDetails(k.ApplicantID);
       
        this.fetchinterestedparties(k.ID);
        const data = {
            PEPOBox: k.PEPOBox,
            PEPostalCode: k.PEPostalCode,
            PETown: k.PETown,
            PEPostalCode: k.PEPostalCode,
            PEMobile: k.PEMobile,
            PEEmail: k.PEEmail,
            PEWebsite: k.PEWebsite,
            TimerStatus: k.TimerStatus,
            TenderID: k.TenderID,
            ApplicationID: k.ID,
            ApplicationNo: k.ApplicationNo,
            TenderNo: k.TenderNo,
            ApplicationREf: k.ApplicationREf,
            PEName: k.PEName,
            AwardDate: new Date(k.AwardDate).toLocaleDateString(),
            FilingDate: new Date(k.FilingDate).toLocaleDateString(),
            TenderName: k.TenderName,
            Status: k.Status,
            ApplicationClosingDate: k.ApplicationClosingDate,
            TenderValue: k.TenderValue,
            TenderType: k.TenderType,
            TenderSubCategory: k.TenderSubCategory,
            TenderTypeDesc: k.TenderTypeDesc,
            TenderCategory: k.TenderCategory,
            Timer: k.Timer,
            PaymentStatus: k.PaymentStatus,

            StartDate: dateFormat(
                new Date(k.StartDate).toLocaleDateString(),
                "isoDate"
            ),
            ClosingDate: dateFormat(
                new Date(k.ClosingDate).toLocaleDateString(),
                "isoDate"
            )
        };
        this.setState({ summary: true });
        this.setState(data);
    };

  
    sendApproverNotification = () => {
        fetch("/api/NotifyApprover/" + this.state.ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(response =>
                response.json().then(data => {
                    if (data.results) {
                        let ApproversPhone = data.results[0].ApproversPhone;
                        let ApproversMail = data.results[0].ApproversMail;
                        let applicantMsg =
                            "New Application with APPLICATIONNO:" +
                            this.state.ApplicationNo +
                            " has been submited and is awaiting your review";
                        this.SendSMS(ApproversPhone, applicantMsg);
                        let ID1 = "Applicant";
                        let ID2 = "Approver";
                        let subject1 = "PPARB APPLICATION ACKNOWLEDGEMENT";
                        let subject2 = "APPROVAL REQUEST";
                        this.SendMail(
                            this.state.ApplicationNo,
                            ApproversMail,
                            ID2,
                            subject2
                        );
                        this.SendMail(
                            this.state.ApplicationNo,
                            this.state.ApplicantEmail,
                            ID1,
                            subject1
                        );
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    checkDocumentRoles = (CreatedBy) => {

        if (this.state.Board) {
            return true;
        }
        if (localStorage.getItem("UserName") === CreatedBy) {
            return true;
        }

        return false;

    }
    SendMail = (ApplicationNo, Applicantemail, PPRAEmail, subject1) => {
        
        const emaildata = {
            PPRAEmail: PPRAEmail,
            subject: subject1,
            ApplicationNo: ApplicationNo,
            Applicantemail: Applicantemail,
            PE: this.state.PEName
        };

        fetch("/api/sendmail/PEAcknowledgement", {
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
    SendAcknowledgementMail = (ApplicationNo, Applicantemail, PPRAEmail, subject1, TenderNO, TenderName, Applicant) => {

        const emaildata = {
            PPRAEmail: PPRAEmail,
            subject: subject1,
            ApplicationNo: ApplicationNo,
            Applicantemail: Applicantemail,
            PE: this.state.PEName,
            TenderNO: TenderNO,
            TenderName: TenderName,
            Applicant: Applicant
        };

        fetch("/api/sendmail/PEAcknowledgement", {
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
    AcknowledgeReceipt = e => {       
        fetch("/api/PEResponse/" + this.state.ApplicationNo, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(response =>
                response.json().then(data => {
                    if (data.success) {
                        this.setState({ TimerStatus: "Acknowledged" });
                        let ApplicantEmail = data.data[0].ApplicantEmail;
                        let Applicantmobile = data.data[0].Applicantmobile;
                        let Applicantname = data.data[0].Applicantname;
                        let PPRAEmail = data.data[0].PPRAEmail;
                        let PPRAMobile = data.data[0].PPRAMobile;
                        let TenderNo = data.data[0].TenderNo;
                        let TenderName = data.data[0].TenderName;                        
                        toast.success("Acknowledged")                      
                        this.SendAcknowledgementMail(this.state.ApplicationNo, ApplicantEmail, PPRAEmail, "RECEIPT ACKNOWLEDGEMENT", TenderNo, TenderName, Applicantname)
                    } else {
                        toast.error(data.message)
                       
                    }
                })
            )
            .catch(err => {
                toast.error(err.message)
             
            });
    }

    render() {
       
        const ColumnData = [
            { label: "ApplicationNo", field: "ApplicationNo" },
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
                label: "REF",
                field: "REF",
                sort: "asc"
            },
            {
                label: "Status",
                field: "Status",
                sort: "asc"
            },
            {
                label: "DueOn",
                field: "DueOn",
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
        const rows = [...this.state.Applications];

        if (rows.length > 0) {
            rows.map((k, i) => {
                 if (k.TimerStatus==="Awaiting Response") {
                    let Rowdata = {
                        ApplicationNo: (
                            <a onClick={e => this.handViewApplication(k, e)}>
                                {k.ApplicationNo}
                            </a>
                        ),
                        TenderName: (
                            <a onClick={e => this.handViewApplication(k, e)}>
                                {k.TenderName}
                            </a>
                        ),
                        PE: <a onClick={e => this.handViewApplication(k, e)}>{k.PEName}</a>,
                        FilingDate: (
                            <a onClick={e => this.handViewApplication(k, e)}>
                                {dateFormat(
                                    new Date(k.FilingDate).toLocaleDateString(),
                                    "mediumDate"
                                )} 
                                
                            </a>
                        ),
                       REF: (
                            <a onClick={e => this.handViewApplication(k, e)}>
                                {k.ApplicationREf}
                            </a>
                        ),
                        Status: (
                            <a
                                    style={{ color: "#FF3C33" }}
                                onClick={e => this.handViewApplication(k, e)}
                            >
                                {k.TimerStatus}
                         
                            </a>
                        ),
                        DueOn: (
                            <a onClick={e => this.handViewApplication(k, e)} className="text-danger font-weight-bold" >
                                {dateFormat(
                                    new Date(k.DueOn).toLocaleDateString(),
                                    "mediumDate"
                                )} 
                            </a>
                        ), 
                        Action: (
                            <span>
                                <a
                                    style={{ color: "#007bff" }}
                                    onClick={e => this.handViewApplication(k, e)}
                                >
                                    {" "}
                                    View{" "}
                                </a>
                            </span>
                        )
                    };
                    Rowdata1.push(Rowdata);
                 } else {
                     let Rowdata = {
                         ApplicationNo: (
                             <a onClick={e => this.handViewApplication(k, e)}>
                                 {k.ApplicationNo}
                             </a>
                         ),
                         TenderName: (
                             <a onClick={e => this.handViewApplication(k, e)}>
                                 {k.TenderName}
                             </a>
                         ),

                         FilingDate: (
                             <a onClick={e => this.handViewApplication(k, e)}>
                                 {dateFormat(
                                     new Date(k.FilingDate).toLocaleDateString(),
                                     "mediumDate"
                                 )} 
                             </a>
                         ),
                         REF: (
                             <a onClick={e => this.handViewApplication(k, e)}>
                                 {k.ApplicationREf}
                             </a>
                         ),
                         Status: (
                             <span>
                                 <a
                                     className="font-weight-bold"
                                     onClick={e => this.handViewApplication(k, e)}
                                 >
                                     {k.TimerStatus}
                                 </a>

                             </span>
                         ),
                         DueOn: (
                             <a onClick={e => this.handViewApplication(k, e)} className="text-danger font-weight-bold" >

                                 {new Date(k.DueOn).toLocaleDateString()}
                             </a>
                         ),
                         Action: (
                             <span>
                                 <a
                                     style={{ color: "#007bff" }}
                                     onClick={e => this.handViewApplication(k, e)}
                                 >
                                     {" "}
                                     View{" "}
                                 </a>
                             </span>
                         )
                     };
                     Rowdata1.push(Rowdata);
                 }
            });
        }
    
        let headingstyle = {
            color: "#7094db"
        };
        let ViewFile = this.ViewFile;
        
            if (this.state.summary) {
                return (
                    <div>
                        <ToastContainer/>
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
                                   
                                </ol>
                            </div>
                            <div className="col-lg-4">
                                <div className="row wrapper ">
                                    {this.state.TimerStatus === "Pending Acknowledgement" ? (
                                        <span className="text-danger">
                                            <button className="btn btn-primary" onClick={this.AcknowledgeReceipt} style={{ marginTop: 30 }}>Acknowledge Receipt</button>
                                    &nbsp;&nbsp;
                                        </span>
                                    ) : (
                                            
                                            this.state.TimerStatus === "Submited" ? (
                                            null
                                        ):(
                                                    <span className = "text-success">
                                                <Link
                                                    to = {{
                                                        pathname: "/PEResponse",
                                                        ApplicationNo: this.state.ApplicationNo,
                                                        ApplicationID: this.state.ApplicationID,
                                                        ApplicationClosingDate: this.state.ApplicationClosingDate
                                                         }}>
                                                    <button className="btn btn-primary" style={{ marginTop: 30 }}>Respond Now</button>
                                                </Link>
                                &nbsp;&nbsp;
                                            </span>
                                                )

                                           

                                        )}

                                   
                               
                                    <button
                                        type="button"
                                        style={{ marginTop: 30 }}
                                        onClick={this.GoBack}
                                        className="btn btn-warning float-left"
                                    >
                                        &nbsp; Back
                  </button>
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
                                                <td className="font-weight-bold"> TenderNo:</td>
                                                <td> {this.state.TenderNo}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"> TenderName:</td>
                                                <td> {this.state.TenderName}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="font-weight-bold"> Tender Value:</td>
                                                <td className="font-weight-bold">
                                                    {" "}
                                                    {this.formatNumber(this.state.TenderValue)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold"> FilingDate:</td>
                                                <td>{dateFormat(
                                                    new Date(this.state.FilingDate).toLocaleDateString(),
                                                    "mediumDate"
                                                )} </td>
                                            </tr>
                                            <tr>
                                                <td className="font-weight-bold">Date of Occurrence of Breach:</td>
                                                <td>{dateFormat(
                                                    new Date(this.state.AwardDate).toLocaleDateString(),
                                                    "mediumDate"
                                                )} </td>
                                            </tr>
                                            
                                            <tr>
                                                <td className="font-weight-bold">
                                                    {" "}
                                                    Application Timing:
                        </td>
                                                <td> {this.state.Timer}</td>
                                            </tr>{" "} */}
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
                                        {/* <h3 style={headingstyle}>Tender Addendums</h3>
                                        <table className="table table-borderless table-sm">
                                            <th>No</th>
                                            <th>StartDate</th>
                                            <th>ClosingDate</th>
                                            <th>Description</th>

                                            {this.state.AddedAdendums.map((r, i) => (
                                                <tr>
                                                    <td className="font-weight-bold">{r.AdendumNo}</td>

                                                    <td className="font-weight-bold">
                                                        {dateFormat(
                                                            new Date(r.StartDate).toLocaleDateString(),
                                                            "mediumDate"
                                                        )} 
                                                      
                                                    </td>
                                                    <td className="font-weight-bold">
                                                        {dateFormat(
                                                            new Date(r.ClosingDate).toLocaleDateString(),
                                                            "mediumDate"
                                                        )} 
                                                     
                                                    </td>
                                                    <td className="font-weight-bold">{r.Description}</td>
                                                </tr>
                                            ))}
                                        </table>
                                   */}
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
                            {/* <br />
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
                                            {this.state.ApplicationDocuments.map( (k, i)=> {
                                                return (
                                                   k.Confidential?
                                                   <div>
                                                           { this.checkDocumentRoles(k.Created_By) ?
                                                    <tr>
                                                                <td>{i + 1}</td>
                                                                <td>{k.Description}</td>
                                                                <td>{k.FileName}</td>
                                                                <td>
                                                                        {dateFormat(
                                                                            new Date(k.DateUploaded).toLocaleDateString(),
                                                                            "mediumDate"
                                                                        )} 
                                                                   
                                                                </td>
                                                                <td>

                                                                    <a
                                                                        onClick={e => ViewFile(k, e)}
                                                                        className="text-success"
                                                                    >
                                                                        <i class="fa fa-eye" aria-hidden="true"></i>View
                                                      </a>
                                                                </td>
                                                            </tr>:null}
                                                   </div>:
                                                            < tr >
                                                            <td>{i + 1}</td>
                                                            <td>{k.Description}</td>
                                                            <td>{k.FileName}</td>
                                                            <td>
                                                                {dateFormat(
                                                                    new Date(k.DateUploaded).toLocaleDateString(),
                                                                    "mediumDate"
                                                                )}
                                                            </td>
                                                            <td>

                                                                <a
                                                                    onClick={e => ViewFile(k, e)}
                                                                    className="text-success"
                                                                >
                                                                    <i class="fa fa-eye" aria-hidden="true"></i>View
                                                                </a>
                                                            </td>
                                                        </tr>
                                );
                            })}
                                        </table>
                                    </div>
                                </div>
                            </div> */}
                            {/* <br />
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
                                                        <th className="font-weight-bold text-danger">
                                                            {" "}
                                                            {this.formatNumber(this.state.TotalAmountdue)}
                                                        </th>
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
                            </div> */}

                            <br />
                            <div className="row">
                                <div className="col-lg-12 ">
                                    <h3 style={headingstyle}>Interested Parties</h3>
                                    <div className="col-lg-11 border border-success rounded">
                                        <table className="table table-sm">
                                            <th>Org Name</th>
                                            <th>ContactName</th>
                                            <th>Designation</th>
                                            <th>Email</th>
                                            <th>TelePhone</th>
                                            <th>Mobile</th>
                                            <th>PhysicalAddress</th>
                                            {this.state.interestedparties.map((r, i) => (
                                                <tr>
                                                    <td>{r.Name}</td>
                                                    <td> {r.ContactName} </td>
                                                    <td> {r.Designation} </td>
                                                    <td> {r.Email} </td>
                                                    <td> {r.TelePhone} </td>
                                                    <td> {r.Mobile} </td>
                                                    <td> {r.PhysicalAddress} </td>

                                                </tr>
                                            ))}
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
                        <ToastContainer />
                        <div className="row wrapper border-bottom white-bg page-heading">
                            <div className="col-lg-10">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <h2>Applications</h2>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-lg-2">
                                
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

export default PEApplications;

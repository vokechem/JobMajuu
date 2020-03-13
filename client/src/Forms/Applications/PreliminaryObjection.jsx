import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-awesome-modal';
import GoogleDocsViewer from "react-google-docs-viewer";
var _ = require("lodash");
class PreliminaryObjection extends Component {
    constructor() {
        super();
        this.state = {
            Requests: [],
            FeesDetails: [],
            BankSlips: [],
            PaymentDetails: [],
            summary: false,
            openView: false,
            open: false,
            openDocPreview: false,
            Attachmentname: "",
            Remarks: "",
            IsAccept: false,
            IsDecline: false,
            NewDeadLine: "",
            FilingDate: "",
            PE: "",
            PEPOBox: "",
            PELocation: "",
            PETown: "",
            PEPostalCode: "",
            PEMobile: "",
            PEEmail: "",
            PEWebsite: "",
            ApplicationID: "",
            Reason: "",
            RequestedDate: "",
            Status: "",
            TenderNo: "",
            TenderName: "",
            TenderValue: "",
            StartDate: "",
            CalculatedAAmount: "",
            TotalAmountDue:"",
            Reference: "",
            TotalPaid: ""

        };
        this.handViewApplication = this.handViewApplication.bind(this)
        this.fetchApplicationtenderdetails = this.fetchApplicationtenderdetails.bind(this);
        this.fetchApplicantDetails = this.fetchApplicantDetails.bind(this);
        this.handleviewBankSlip = this.handleviewBankSlip.bind(this);
        this.fetchPendingRequests = this.fetchPendingRequests.bind(this)
    }
    formatNumber = num => {
        let newtot = Number(num).toFixed(2);
        return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    fetchPaymentDetails = (ApplicationID) => {
        this.setState({ PaymentDetails: [] });
        this.setState({ TotalPaid: "" });        
        fetch("/api/applicationfees/" + ApplicationID + "/PreliminaryObjectionsFeesPaymentDetails", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PaymentDetails => {
                if (PaymentDetails.length > 0) {
                    this.setState({ TotalPaid: PaymentDetails[0].TotalPaid });
                    this.setState({ PaymentDetails: PaymentDetails });
                } else {
                    toast.error(PaymentDetails.message);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };
    
    fetchBankSlips = Applicationno => {
        this.setState({ BankSlips: [] });
        fetch("/api/applicationfees/" + Applicationno + "/Bankslips", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(BankSlips => {
                if (BankSlips.length > 0) {
                  
                    const UserRoles = [_.groupBy(BankSlips, "Category")];  
                    if (UserRoles[0].PreliminaryObjection) {
                        this.setState({ BankSlips: UserRoles[0].PreliminaryObjection });
                    }
                                 
                    
                }
            })
            .catch(err => {
                toast.error(err.message)
            });
    };
    fetchFeesDetails = () => {
        this.setState({ FeesDetails: [] });
        this.setState({ TotalAmountDue: "" });
        fetch("/api/applicationfees/1/PreliminaryObjectionsFees", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(FeesDetails => {
                if (FeesDetails.length > 0) {
                    this.setState({ TotalAmountDue: FeesDetails[0].Total });
                    this.setState({ FeesDetails: FeesDetails });
                } else {
                    toast.error(FeesDetails.message);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

  
    fetchPendingRequests = () => {
        this.setState({ Requests: [] });
        fetch("/api/FeesApproval/" + localStorage.getItem("UserName") +"/PreliminaryObjectionFees/Value2", {
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
            ApplicationID: this.state.ApplicationID,
            Amount: this.state.TotalPaid,
            Reference: this.state.Reference,
            Category:"PreliminaryObjectionFees" 
        };
        if (+this.state.TotalAmountDue > +this.state.TotalPaid) {
            let msg = "Amount Paid is less than Amount Due of:" + this.state.TotalAmountDue
            swal("", msg, "error")
        } else {
            this.Approve("/api/FeesApproval", data);
        }
        

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
    SendMail = (Name, email, ID, subject) => {
        const emaildata = {
            to: email,
            subject: subject,
            ID: ID,
            Name: Name,
            TotalPaid: this.state.TotalPaid,
            Reference: this.state.Reference,
            ApplicationNo: this.state.Reference
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
    SendFeesApproverMail = (ApplicationNo, email, ID, subject1) => {
        const emaildata = {
            to: email,
            subject: subject1,
            ApplicationNo: ApplicationNo,
            ID: ID
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
    notifyPanelmembers = (AproverMobile, Name, AproverEmail, Msg) => {
     
        if (Msg === "Complete") {
            this.SendSMS(
                AproverMobile,
                "Fees amount of: " + this.state.TotalPaid + " paid for filing Preliminary Objection  has been confirmed.Your response is now marked as paid and submited."
            );
            this.SendMail(
                Name,
                AproverEmail,
                "Fee Payment notification",
                "FEES PAYMENT NOTIFICATION"
            );
        } 
        else {
            let ID2 = "FeesApprover";
            let subject2 = "PRELIMINARY OBJECTION FEES APPROVAL REQUEST";
            this.SendFeesApproverMail(this.state.Reference, AproverEmail, ID2, subject2);
            let applicantMsg =
                "New request to approve Preliminary Objection fees with Reference No:" +
                this.state.Reference +
                " has been submited and is awaiting your review";
            this.SendSMS(AproverMobile, applicantMsg);
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
                        swal("", "Approved", "success")
                        this.setState({ summary: false });
                        if (data.results.length > 0) {
                            let NewList = [data.results]
                            NewList[0].map((item, key) =>

                                this.notifyPanelmembers(item.Mobile, item.Name, item.Email, item.Msg)
                            )
                        }
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
    handleviewBankSlip = d => {
        window.open(process.env.REACT_APP_BASE_URL + "/BankSlips/" + d);
        // this.setState({
        //     openDocPreview: true,
        //     Attachmentname: d,
        // })
    };
    GoBack = e => {
        e.preventDefault();
        this.setState({ summary: false });
    }
    ConfirmPayment = e => {
        e.preventDefault();
        this.setState({ open: true })
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
                             this.fetchFeesDetails()
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

                    this.setState({ TenderType: ApplicantDetails[0].TenderType ,
                    TenderSubCategory: ApplicantDetails[0].TenderSubCategory ,
                     TenderCategory: ApplicantDetails[0].TenderCategory ,
                    Timer: ApplicantDetails[0].Timer ,
                     TenderTypeDesc: ApplicantDetails[0].TenderTypeDesc ,
                     TenderNo: ApplicantDetails[0].TenderNo ,
                     TenderName: ApplicantDetails[0].Name ,
                     TenderValue: ApplicantDetails[0].TenderValue ,
                     StartDate: ApplicantDetails[0].StartDate });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    handViewApplication = k => {
        this.fetchApplicantDetails(k.ApplicantID)
        this.fetchApplicationtenderdetails(k.ID)
        
        this.fetchPaymentDetails(k.ID)
        this.fetchBankSlips(k.ID);
        const data = {
            FilingDate: new Date(k.FilingDate).toLocaleDateString(),
            PE: k.Name,
            PEPOBox: k.POBox,
            PELocation: k.Location,
            PETown: k.Town,
            PEPostalCode: k.PostalCode,
            PEMobile: k.Mobile,
            PEEmail: k.Email,
            PEWebsite: k.Website,
            IsAccept: false,
            IsDecline: false,
            ApplicationID: k.ID,
            Status: k.FeesStatus,
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
    closeDocPreview = () => {
        this.setState({ openDocPreview: false });
    }

    render() {


        const ColumnData = [
            {
                label: "ID",
                field: "ID",
            },
            {
                label: "Procuring Entity",
                field: "Name",
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
                label: "action",
                field: "action",
                sort: "asc",
                width: 200
            }
        ];
        let Rowdata1 = [];
        const rows = [...this.state.Requests];
        if (rows.length > 0) {
            rows.map((k, i) => {
                let Rowdata = {
                    ID: k.ID,
                    Name: k.Name,
                    FilingDate: new Date(k.FilingDate).toLocaleDateString(),
                    Status: k.FeesStatus,
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

        let ShowAcceptModal = this.ShowAcceptModal;
        if (this.state.summary) {
            return (
                <div>
                    <ToastContainer />
                    <Modal visible={this.state.open} width="880" height="230" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <a style={{ float: "right", color: "red", margin: "10px" }} href="javascript:void(0);" onClick={() => this.closeModal()}><i class="fa fa-close"></i></a>
                        <div>
                            <h4 style={{ "text-align": "center" }}>Fees Confirmation </h4>
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
                                                            Amount
                                                         </label>
                                                        <input
                                                            onChange={this.handleInputChange}
                                                            value={this.state.TotalPaid}
                                                            type="text"
                                                            required
                                                            name="TotalPaid"
                                                            className="form-control"
                                                            disabled

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="exampleInputPassword1"
                                                            className="font-weight-bold"
                                                        >
                                                            Reference
                                                         </label>
                                                        <input
                                                            onChange={this.handleInputChange}
                                                            value={this.state.Reference}
                                                            type="text"
                                                            required
                                                            name="Reference"
                                                            className="form-control"

                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-sm-12 ">
                                                <div className=" row">
                                                    <div className="col-sm-2" />
                                                    <div className="col-sm-8" />
                                                    <div className="col-sm-2">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary float-left"
                                                        >
                                                            Confirm
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
                    <Modal visible={this.state.openDocPreview} width="880" height="500" effect="fadeInUp" onClickAway={() => this.closeDocPreview()}>
                        <a style={{ float: "right", color: "red", margin: "10px" }} href="javascript:void(0);" onClick={() => this.closeDocPreview()}><i class="fa fa-close"></i></a>
                        <div>
                            <h4 style={{ "text-align": "center" }}>Fees Approval </h4>
                            <div className="container-fluid">
                                <div className="col-sm-12">
                                    <div className="ibox-content">
                                        <GoogleDocsViewer
                                            width="100%"
                                            height="400px"
                                            fileUrl={
                                                process.env.REACT_APP_BASE_URL +
                                                "/BankSlips/" +
                                                this.state.Attachmentname
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Modal>

                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-11">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2 className="font-weight-bold">Fees Approval <span style={headingstyle}> {}</span></h2>
                                </li>

                            </ol>
                        </div>
                        <div className="col-lg-1">

                            {/* <button className="btn btn-primary" onClick={this.ShowAcceptModal} style={{ marginTop: 20 }}>Accept</button>
                            &nbsp;&nbsp;
                                <button className="btn btn-danger " onClick={this.ShowRejectModal} style={{ marginTop: 20 }}>Reject</button>
                            &nbsp;&nbsp; */}



                        </div>

                    </div>
                    <p></p>
                    <div className="border-bottom white-bg p-4">

                        <div className="row">
                            <div className="col-sm-5">
                                <h3 style={headingstyle}>Request Submited By(Applicant)</h3>
                                <div className="col-lg-12 border border-success rounded">
                                    <table className="table table-borderless table-sm">
                                        <tr>
                                            <td className="font-weight-bold"> Name:</td>
                                            <td> {this.state.Applicantname}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Email:</td>
                                            <td> {this.state.ApplicantEmail}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Mobile:</td>
                                            <td> {this.state.ApplicantMobile}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> POBOX:</td>
                                            <td>

                                                {this.state.ApplicantPOBox}-{this.state.ApplicantPostalCode}
                                            </td>
                                        </tr>{" "}
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
                            <div className="col-sm-5">
                                <h3 style={headingstyle}>Procuring Entity</h3>
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
                        <br />


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
                                            <td className="font-weight-bold"> TenderType:</td>
                                            <td> {this.state.TenderTypeDesc}</td>
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
                                            <td className="font-weight-bold">
                                                {" "}
                                                Application Timing:
                                            </td>
                                            <td> {this.state.Timer}</td>
                                        </tr>{" "}

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
                                <h3 style={headingstyle}>Fees Details</h3>
                                <div className="col-lg-12 border border-success rounded">
                                    <table className="table table-striped table-sm">
                                        <thead class="thead-light">
                                            <th>Description</th>
                                            <th>Amount</th>                                           

                                        </thead>
                                        {this.state.FeesDetails.map((r, i) => (
                                            <tr>
                                                <td className="font-weight-bold">
                                                    {r.Description}
                                                </td>

                                                <td className="font-weight-bold">
                                                    {this.formatNumber(r.MaxFee)}
                                                </td>
                                              

                                            </tr>
                                        ))}
                                        <tfoot>
                                            <tr>
                                               
                                                <th scope="row">Total Amount</th>
                                                <th style={{ color: "Red" }}>
                                                    {this.formatNumber(
                                                        this.state.TotalAmountDue
                                                    )}
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-10">
                                <h3 style={headingstyle}>Payment Details</h3>
                                <div className="col-lg-12 border border-success rounded">

                                    <div class="col-sm-11">
                                        <table class="table table-sm">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th scope="col">Date paid</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Refference</th>
                                                    <th scope="col">Paidby</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.PaymentDetails.map((r, i) => (
                                                    <tr>

                                                        <td> {new Date(r.DateOfpayment).toLocaleDateString()} </td>

                                                        <td style={{ color: "Blue" }}>{this.formatNumber(r.AmountPaid)}</td>

                                                        <td>{r.Refference}</td>
                                                        <td>{r.Paidby}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>

                                                    <th scope="row">Total Amount paid</th>
                                                    <th style={{ color: "Red" }}>
                                                        {this.formatNumber(
                                                            this.state.TotalPaid
                                                        )}
                                                    </th>
                                                </tr>
                                            </tfoot>
                                            
                                        </table>
                                        <h3 style={headingstyle}>Payment Documents</h3>
                                        <table className="table table-sm">
                                            <thead class="thead-light">
                                                <th scope="col">Slip</th>
                                                <th scope="col">Action</th>
                                            </thead>
                                          
                                            {this.state.BankSlips.map((r, i) => (
                                                <tr>
                                                    <td>{r.Name}</td>
                                                    <td>
                                                        <span>
                                                            <a
                                                                style={{ color: "#7094db" }}
                                                                onClick={e =>
                                                                    this.handleviewBankSlip(
                                                                        r.Name,
                                                                        e
                                                                    )
                                                                }
                                                            >
                                                                &nbsp; View
                                              </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">

                            <div className="col-sm-8"></div>
                            <div className="col-sm-3">
                                <button
                                    type="button"
                                    onClick={this.ConfirmPayment}
                                    className="btn btn-primary"
                                >
                                    Confirm Payment
                                </button>
                                &nbsp;
                                <button
                                    type="button"
                                    onClick={this.GoBack}
                                    className="btn btn-warning"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )

        } else {
            return (
                <div>

                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-10">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2> REQUESTS AWAITING MY REVIEW</h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-1">
                            <Link to="/">
                                <button
                                    type="button"
                                    style={{ marginTop: 20 }}
                                    className="btn btn-warning"
                                >
                                    Back
                                </button>
                            </Link>

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

export default PreliminaryObjection;

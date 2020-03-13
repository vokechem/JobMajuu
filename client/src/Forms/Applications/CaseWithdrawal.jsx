import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import popup from "./../../Styles/popup.css";
import { ToastContainer, toast } from "react-toastify";
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);

var dateFormat = require("dateformat");
class CaseWithdrawal extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openRequest: false,
            ApplicantUserEmail: data.Email,
            ApplicantPhone: data.Phone,
            ApplicantUserName: data.Name,
            Applications: [],        
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
            EntryType: "",
            RequestDescription: "",
            GroundDescription: "",          
            summary: false,
         
           ApplicantDetails: [],
            ApplicantCode:"",
            Applicantname: "",
            FilingDate: "",
            PEName: "",
            ApplicationNo: "",        

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
            WithdrawalReason:""
        };
     
    
        this.handleInputChange = this.handleInputChange.bind(this);
      
    }
    closeModal = () => {
        this.setState({ open: false });
    };  
 
    fetchMyApplications = ApplicantID => {
        fetch("/api/applications/" + ApplicantID + "/Applicant", {
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
    fetchApplicantDetails = () => {
        fetch("/api/applicants/" + localStorage.getItem("UserName"), {
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
                    this.setState({
                        ApplicantCode: ApplicantDetails[0].ApplicantCode
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
                    this.fetchMyApplications(ApplicantDetails[0].ID);
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    openWithdraw=e=>{
        e.preventDefault();
        this.setState({ open: true });
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
            Applicant: this.state.ApplicantCode,
            ApplicationNo: this.state.ApplicationNo,
            Reason: this.state.WithdrawalReason
        };
        this.postData("/api/CaseWithdrawal", data);      
    };
    notifyPanelmembers = (ApproverMail, ApproverMobile, ApproverName) => {
      
          let applicantMsg =
            "New request to withdrawal appeal:" +
            this.state.ApplicationNo +
            " has been submited and is awaiting your review.";
        let applicantMsg1 =
            "Your request to withdrawal appeal :" +
            this.state.ApplicationNo +
            " has been received and is awaiting approval.";
        this.SendSMS(this.state.ApplicantPhone, applicantMsg1);
        this.SendSMS(ApproverMobile, applicantMsg);
        this.SendMail(
            this.state.ApplicationNo,
            this.state.ApplicantUserEmail,
            "casewithdrawal Applicant",
            "CASE WITHDRAWAL REQUEST",
            this.state.ApplicantUserName
        );
        this.SendMail(
            this.state.ApplicationNo,
            ApproverMail,
            "casewithdrawal",
            "CASE WITHDRAWAL APPROVAL",
            ApproverName
        );
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

                    if (data.success) {
                        if (data.results.length > 0) {
                            if (data.results[0].msg === "Already submited") {
                                toast.error("You have already submited a request for this application");
                                this.setState({ open: false });
                                this.setState({ summary: false });
                            } else {
                                toast.success("Your request has been submited");
                                let NewList = [data.results]
                               
                                NewList[0].map((item, key) =>
                                    this.notifyPanelmembers(item.Email, item.Phone, item.Name)
                                )
                                this.setState({ open: false });
                                this.setState({ summary: false });
                            }
                        }else{
                            this.setState({ open: false });
                            this.setState({ summary: false });
                            toast.warning("Your request has been submited but no approver is defined in the system", "success");
                        }
                     
                        
                        
                       
                    } else {
                        toast.error(  data.message);
                    }
                })
            )
            .catch(err => {
                toast.error( err.message);
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
                            this.fetchApplicantDetails();
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
        const data = {
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
            FilingDate: new Date(k.FilingDate).toLocaleDateString(),
            TenderName: k.TenderName,
            Status: k.Status,
            TenderType: k.TenderType,
            TenderSubCategory: k.TenderSubCategory,
            TenderTypeDesc: k.TenderTypeDesc,
            TenderCategory: k.TenderCategory,
            Timer: k.Timer,
            TenderValue: k.TenderValue,
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
                                {new Date(k.FilingDate).toLocaleDateString()}
                            </a>
                        ),
                        ApplicationREf: (
                            <a onClick={e => this.handViewApplication(k, e)}>
                                {k.ApplicationREf}
                            </a>
                        ),
                        Status: (
                            <span>
                                <b
                                    
                                    onClick={e => this.handViewApplication(k, e)}
                                >
                                    {k.Status}
                </b>
                            </span>
                        ),

                        action: (
                            k.Status ==="WITHDRAWN"?
                                <p>-</p> : <span>
                                    <a
                                        style={{ color: "#007bff" }}
                                        onClick={e => this.handViewApplication(k, e)}
                                    >
                                        {" "}
                                        WITHDRAW{" "}
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
                        <ToastContainer/>
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
                                    CASE WITHDRAWAL{" "}
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
                                                                    Reason
                                                                         </label>
                                                                <textarea
                                                                    
                                                                    class="form-control"
                                                                   name="WithdrawalReason"
                                                                    value={this.state.WithdrawalReason}
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
                                                               <button
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
                            <div className="col-lg-10">
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
                                            STATUS:
                                                    <span className="text-success">
                                                        {" "}
                                                        {this.state.Status}
                                                    </span>
                                               
                                        </h2>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-lg-2">
                                <div className="row wrapper ">
                                    <button
                                        type="button"
                                        style={{ marginTop: 40 }}
                                        onClick={this.openWithdraw}
                                        className="btn btn-primary float-right"
                                    >
                                        WITHDRAW </button>&nbsp;
                                    <button
                                        type="button"
                                        style={{ marginTop: 40 }}
                                        onClick={this.GoBack}
                                        className="btn btn-warning float-left"
                                    >
                                        &nbsp; Back </button>
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
                           
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <ToastContainer />
                        <div className="row wrapper border-bottom white-bg page-heading">
                            <div className="col-lg-12">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <h2>Case Withdrawals</h2>
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

export default CaseWithdrawal;

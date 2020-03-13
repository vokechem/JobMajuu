import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import CKEditor from "ckeditor4-react";
import popup from "./../../Styles/popup.css";
import axios from "axios";
import Modal from 'react-awesome-modal';
import { ToastContainer, toast } from "react-toastify";
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);

var dateFormat = require("dateformat");
class adjournment extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openRequest: false,
            ApplicantUserEmail: data.Email,
            ApplicantPhone: data.Phone,
            ApplicantUserName: data.Name,
            Applications: [],
            ApplicationDocuments:[],
            DocumentsAvailable:false,
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
            ApplicantCode: "",
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
            selectedFile: null,
            loaded: 0,
            ApplicantPostalCode: "",
            ApplicantPOBox: "",
            ApplicantTown: "",
         
        };


        this.handleInputChange = this.handleInputChange.bind(this);
      
    }
    onEditorChange = evt => {
        this.setState({
            GroundDescription: evt.editor.getData()
        });
    };
    closeModal = () => {
        this.setState({ open: false });
        this.setState({ DocumentsAvailable: false, });
    };
    maxSelectFile = event => {
        let files = event.target.files; // create file object
        if (files.length > 1) {
            const msg = "Only One file can be uploaded at a time";
            event.target.value = null; // discard selected file
            toast.warn(msg);
            return false;
        }
        return true;
    };
    onChangeHandler = event => {
        //for multiple files
        var files = event.target.files;
        if (this.maxSelectFile(event)) {
            this.setState({
                selectedFile: files,
                loaded: 0
            });
        }
    };
    onClickHandler = event => {
        event.preventDefault();
        if (this.state.DocumentDescription){
        if (this.state.selectedFile) {
            const data = new FormData();

            for (var x = 0; x < this.state.selectedFile.length; x++) {
                data.append("file", this.state.selectedFile[x]);
            }
            axios
                .post("/api/upload/Document", data, {
                    // receive two parameter endpoint url ,form data
                    onUploadProgress: ProgressEvent => {
                        this.setState({
                            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                        });
                    }
                })
                .then(res => {
                    this.saveDocuments(res.data);
                    
                })
                .catch(err => {
                    toast.error("upload fail");
                });
        } else {
            toast.warn("Please select a file to upload");
            }
        } else {
            swal("","Document description is required","error")
        }

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
    openWithdraw = e => {
        e.preventDefault();
        this.setState({ open: true });
    }
    saveDocuments(FileName) {
      
            let datatosave = {
                
                ApplicationNo: this.state.ApplicationNo,
                Description: this.state.DocumentDescription,
                Path: process.env.REACT_APP_BASE_URL + "/Documents",
                Name: FileName
            };
        fetch("/api/adjournment/Documents", {
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
                            toast.success("upload success");
                            var rows = this.state.ApplicationDocuments; 
                            let datapush = {
                                FileName: FileName,
                                Description: this.state.DocumentDescription
                            };
                            rows.push(datapush);
                            this.setState({ ApplicationDocuments: rows });
                            this.setState({ DocumentsAvailable: true });
                            this.setState({
                                loaded: 0
                            });
                        } else {
                            toast.error("Could not be saved please try again!");
                            // swal("Saved!", "Could not be saved please try again", "error");
                        }
                    })
                )
                .catch(err => {
                    swal("", "Could not be saved please try again", "error");
                });
       
    }
    GoBack = e => {
        e.preventDefault();
        this.setState({ summary: false });
    };
    showupload=e=>{
        this.setState({ DocumentsAvailable: !this.state.DocumentsAvailable, });
    }
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
            Reason: this.state.GroundDescription
        };

        this.postData("/api/adjournment", data);

    };
    sendBulkNtification = (ApproverMail, ApproverMobile, ApproverName) => {

        let applicantMsg =
            "New request to adjourn application:" +
            this.state.ApplicationNo +
            " has been submited and is awaiting your review.";
     
        this.SendSMS(ApproverMobile, applicantMsg);
      
        this.SendMail(
            this.state.ApplicationNo,
            ApproverMail,
            "case adjourn Approver",
            "CASE ADJOURNMENT REQUEST",
            ApproverName
        );

    };

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
                        if (data.results[0].msg === "Already submited") {
                            swal("", "You have already submited a request for this application", "error");
                            this.setState({ open: false });
                            this.setState({ summary: false });
                        } else {
                            let applicantMsg1 =
                                "Your request to adjourn application :" +
                                this.state.ApplicationNo +
                                " has been received and is awaiting approval.";
                            this.SendSMS(this.state.ApplicantPhone, applicantMsg1);
                            this.SendMail(
                                this.state.ApplicationNo,
                                this.state.ApplicantUserEmail,
                                "case adjourn Applicant",
                                "CASE ADJOURNMENT REQUEST",
                                this.state.ApplicantUserName
                            );
                            if (data.results.length > 0) {
                                data.results.map((item, key) =>
                                    this.sendBulkNtification(item.Email, item.Phone, item.Name)

                                );

                                
                            }                          
                            swal("", "Your request has been submited", "success");
                            this.setState({ open: false });
                            this.setState({ summary: false });
                            this.setState({ DocumentsAvailable: false, });
                        }


                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("", err.message, "error");
            });
    }
    handleDeleteDocument = d => {
       alert(d)

        swal({
            text: "Are you sure that you want to remove this document?",
            icon: "warning",
            dangerMode: true,
            buttons: true
        }).then(willDelete => {
            if (willDelete) {
                return fetch("/api/adjournment/" + d, {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify(data)
                })
                    .then(response =>
                        response.json().then(data => {
                            if (data.success) {
                                var rows = [...this.state.ApplicationDocuments];
                                const filtereddata = rows.filter(
                                    item => item.FileName !== d
                                );
                              
                                this.setState({ ApplicationDocuments: filtereddata });
                            } else {
                                swal("", "Remove Failed", "error");
                            }
                        })
                    )
                    .catch(err => {
                        swal("", "Remove Failed", "error");
                    });
            }
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
                label: "PE",
                field: "PE",
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
                if (k.Status === "HEARING IN PROGRESS") {
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
                                    {k.Status }
                </b>
                            </span>
                        ),

                        action: (
                            <span>
                                <a
                                    style={{ color: "#007bff" }}
                                    onClick={e => this.handViewApplication(k, e)}
                                >
                                    {" "}
                                   ADJOURNMENT {" "}
                                </a>
                            </span>
                        )
                    };
                    Rowdata1.push(Rowdata);
                }
            });
        }

        let headingstyle = {
            color: "#7094db",
            cursor: "pointer"
        };



        if (this.state.summary) {
            return (
                <div>
                    <Modal visible={this.state.open} width="70%" height="600" effect="fadeInUp" >
                        <a style={{ float: "right", color: "red", margin: "10px" }} href="javascript:void(0);" onClick={() => this.closeModal()}><i class="fa fa-close"></i></a>
                        <div style={{ overflow: "scroll", height:"600px"}}>
                            <h4 style={{ "text-align": "center", color: "#1c84c6" }}> CASE ADJOURNMENT</h4>
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
                                                        <CKEditor
                                                            data={this.state.RequestDescription}
                                                            onChange={this.onEditorChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 style={headingstyle} onClick={this.showupload}>Upload documents?</h5>
                                            {this.state.DocumentsAvailable ? (

                                                <div>
                                                    <div class="row">
                                                        <div class="col-sm-5">
                                                            <label for="Document" className="font-weight-bold">
                                                                Document
                                                             </label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                name="file"
                                                                onChange={this.onChangeHandler}
                                                                multiple
                                                            />


                                                        </div>
                                                        <div class="col-sm-6">
                                                            <label
                                                                for="DocumentDescription"
                                                                className="font-weight-bold"
                                                            >
                                                                Description{" "}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                name="DocumentDescription"
                                                                onChange={this.handleInputChange}
                                                                value={this.state.DocumentDescription}

                                                            />
                                                        </div>
                                                        <div class="col-sm-1">
                                                            <button style={{ marginTop: "26px" }}
                                                                type="button"
                                                                class="btn btn-success "
                                                                onClick={this.onClickHandler}
                                                            >
                                                                Upload
                                                        </button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 ">

                                                            <div className="col-lg-11 ">
                                                                <table className="table table-sm">
                                                                    <th>ID</th>
                                                                    <th>Document Description</th>
                                                                    <th>FileName</th>

                                                                    <th>Actions</th>
                                                                    {this.state.ApplicationDocuments.map((k, i) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{i + 1}</td>
                                                                                <td>{k.Description}</td>
                                                                                <td>{k.FileName}</td>

                                                                                <td>
                                                                                    <a
                                                                                        onClick={e =>
                                                                                            this.handleDeleteDocument(k.FileName, e)
                                                                                        }
                                                                                        className="text-danger"
                                                                                    >
                                                                                        Remove
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
                                            ) : null}
                                            <br />
                                            <div className=" row">
                                                <div className="col-sm-10" />

                                                <div className="col-sm-2">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Submit
                                                        </button>

                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                               </Modal>
                    {/* <Popup
                        open={this.state.open}
                      
                        onClose={this.closeModal}
                    >
                        <div className={popup.modal}>
                            <a className="close" onClick={this.closeModal}>
                                &times;
                    </a>

                            <div className={popup.header} className="font-weight-bold">
                                {" "}
                               {" "}
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
                                                            <CKEditor
                                                                data={this.state.RequestDescription}
                                                                onChange={this.onEditorChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 style={headingstyle} onClick={this.showupload}>Upload documents?</h5>
                                                {this.state.DocumentsAvailable ? (
                                               
                                               <div>
                                                  <div class="row">
                                                    <div class="col-sm-5">
                                                        <label for="Document" className="font-weight-bold">
                                                            Document
                                                             </label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            name="file"
                                                            onChange={this.onChangeHandler}
                                                            multiple
                                                        />
                                                    
                                                       
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <label
                                                            for="DocumentDescription"
                                                            className="font-weight-bold"
                                                        >
                                                            Description{" "}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="DocumentDescription"
                                                            onChange={this.handleInputChange}
                                                            value={this.state.DocumentDescription}
                                                            
                                                        />
                                                    </div>
                                                    <div class="col-sm-1">
                                                        <button style={{marginTop:"26px"}}
                                                            type="button"
                                                            class="btn btn-success "
                                                            onClick={this.onClickHandler}
                                                        >
                                                            Upload
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 ">
                                                       
                                                        <div className="col-lg-11 ">
                                                            <table className="table table-sm">
                                                                <th>ID</th>
                                                                <th>Document Description</th>
                                                                <th>FileName</th>
                                                              
                                                                <th>Actions</th>
                                                                {this.state.ApplicationDocuments.map( (k, i)=> {
                                                                    return (
                                                                        <tr>
                                                                            <td>{i + 1}</td>
                                                                            <td>{k.Description}</td>
                                                                            <td>{k.FileName}</td>
                                                                           
                                                                            <td>                                                                                
                                                                                <a                                                                                  
                                                                                    onClick={e =>
                                                                                        this.handleDeleteDocument(k.FileName, e)
                                                                                    }
                                                                                    className="text-danger"
                                                                                >
                                                                                   Remove
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
                                                ) : null}
                                                <br/>
                                                    <div className=" row">
                                                        <div className="col-sm-10" />
                                                      
                                                        <div className="col-sm-2">
                                                           <button
                                                                    type="submit"
                                                                    className="btn btn-primary"
                                                                >
                                                                    CONFIRM
                                                        </button>

                                                        </div>
                                                  
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup> */}

                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-9">
                            <ToastContainer />
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
                        <div className="col-lg-3">
                            <div className="row wrapper ">
                                <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    onClick={this.openWithdraw}
                                    className="btn btn-primary float-right"
                                >
                                    REQUEST ADJOURNMENT </button>&nbsp;
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
                                        </tr>{" "}
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
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-12">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>My Applications</h2>
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

export default adjournment;

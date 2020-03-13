import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-awesome-modal";
import CKEditor from "ckeditor4-react";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
var dateFormat = require("dateformat");

class PEadditionalsubmissions extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            openRequest: false,
            Board: data.Board,

            ApplicantUserEmail: data.Email,
            ApplicantPhone: data.Phone,
            ApplicantUserName: data.Name,
            Applications: [],
            AdditionalSubmisions: [],
            AdditionalSubmisionsDocuments:[],
            TenderNo: "",
            ApplicationID: "",
            TenderID: "",
            TenderValue: "",
            ApplicationID: "",
            TenderName: "",
            PEID: "",
            AwardDate: "",
            StartDate: "",
            ClosingDate: "",
            ApplicationREf: "",
            ApplicantID: "",
            EntryType: "",
            RequestDescription: "",
            GroundDescription: "",
            summary: false,
            Confidential:false,
            AdditionalDescription: "",
            ApplicantDetails: [],
            ApplicantCode: "",
            Applicantname: "",
            FilingDate: "",
            PEName: "",
            ApplicationNo: "",
            selectedFile: null,
            loaded: 0,
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
            UploadedFilename: "",
            ApplicantPostalCode: "",
            ApplicantPOBox: "",
            ApplicantTown: "",
            WithdrawalReason: ""
        };

    }
    closeModal = () => {
        this.setState({ open: false });
    };

    fetchMyApplications = () => {
        fetch("/api/applications/" + localStorage.getItem("UserName") + "/PE", {
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

    checkDocumentRoles = (CreatedBy) => {      
           
        if (this.state.Board) {
          
            return true;
        }
        if (localStorage.getItem("UserName")=== CreatedBy) {
            return true;
        }
       
            return false;
        
    }

    // fetchApplicantDetails = () => {
    //     fetch("/api/applicants/" + localStorage.getItem("UserName"), {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-access-token": localStorage.getItem("token")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(ApplicantDetails => {

    //             if (ApplicantDetails.length > 0) {
    //                 this.setState({
    //                     ApplicantPostalCode: ApplicantDetails[0].PostalCode
    //                 });
    //                 this.setState({
    //                 ApplicantCode: ApplicantDetails[0].ApplicantCode,
    //                 ApplicantPOBox: ApplicantDetails[0].POBox ,
    //                 ApplicantTown: ApplicantDetails[0].Town ,
    //                 ApplicantDetails: ApplicantDetails ,
    //                 Applicantname: ApplicantDetails[0].Name ,
    //                 ApplicantLocation: ApplicantDetails[0].Location ,
    //                 ApplicantMobile: ApplicantDetails[0].Mobile ,
    //                 ApplicantEmail: ApplicantDetails[0].Email ,
    //                 ApplicantPIN: ApplicantDetails[0].PIN ,
    //                 ApplicantWebsite: ApplicantDetails[0].Website ,
    //                 ApplicantID: ApplicantDetails[0].ID });
                   
    //             } else {
    //                 swal("", ApplicantDetails.message, "error");
    //             }
    //         })
    //         .catch(err => {
    //             swal("", err.message, "error");
    //         });
    // };
    fetchAdditionalSubmisions = (ApplicationID) => {
        this.setState({
            AdditionalSubmisions: []
        });
        fetch("/api/additionalsubmissions/" + ApplicationID +"/PE", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(AdditionalSubmisions => {

                if (AdditionalSubmisions.length > 0) {
                    this.setState({
                        AdditionalSubmisions: AdditionalSubmisions
                    });

                } else {
                    toast.error(AdditionalSubmisions.message);
                }
            })
            .catch(err => {
                toast.error(err.message);

            });
    };
    fetchAdditionalSubmisionsDocuments = (ApplicationID) => {
       
        this.setState({
            AdditionalSubmisionsDocuments: []
        });
        fetch("/api/additionalsubmissions/" + ApplicationID + "/PE/Documents", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(AdditionalSubmisions => {
             
                if (AdditionalSubmisions.length > 0) {
                    this.setState({
                        AdditionalSubmisionsDocuments: AdditionalSubmisions
                    });

                } else {
                    toast.error(AdditionalSubmisions.message);
                }
            })
            .catch(err => {
                toast.error(err.message);

            });
    };
    openWithdraw = e => {
        e.preventDefault();
        this.setState({ open: true });
    }

    GoBack = e => {
        e.preventDefault();
        this.setState({ summary: false });
    };
    handleSubmit = event => {
        event.preventDefault();
        const data = {
          
            ApplicationID: this.state.ApplicationID,
            Description: this.state.AdditionalDescription,
           
        };
        this.postData("/api/additionalsubmissions", data);
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
                       swal("","Submited successfully","success")
                        this.fetchAdditionalSubmisions(this.state.ApplicationID);
                        this.setState({ open: false })
                    } else {
                        toast.error(data.message);
                    }
                })
            )
            .catch(err => {
                toast.error(err.message);
            });
    }
    Savedocument(url = ``, data = {}) {
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
                       swal("","Upload Completed","success")
                        this.fetchAdditionalSubmisionsDocuments(this.state.ApplicationID);
                           } else {
                        toast.error(data.message);
                    }
                })
            )
            .catch(err => {
                toast.error(err.message);
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
    fetchApplicantDetails = (ApplicantID) => {
        let dat = {
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
                     ApplicantPostalCode: ApplicantDetails[0].PostalCode,
                     ApplicantPOBox: ApplicantDetails[0].POBox ,
                     ApplicantTown: ApplicantDetails[0].Town ,
                     ApplicantDetails: ApplicantDetails,
                     Applicantname: ApplicantDetails[0].Name ,
                     ApplicantLocation: ApplicantDetails[0].Location ,
                     ApplicantMobile: ApplicantDetails[0].Mobile ,
                     ApplicantEmail: ApplicantDetails[0].Email ,
                     ApplicantPIN: ApplicantDetails[0].PIN ,
                     ApplicantWebsite: ApplicantDetails[0].Website ,
                  ApplicantID: ApplicantDetails[0].ID });

                } else {
                    toast.error( ApplicantDetails.message);
                }
            })
            .catch(err => {
                toast.error( err.message);
            });
    };
    handleDeleteDocument= d => {
        
        swal({
            text: "Are you sure that you want to remove this attachemnt?",
            icon: "warning",
            dangerMode: true,
            buttons: true
        }).then(willDelete => {
            if (willDelete) {
                return fetch("/api/additionalsubmissions/" + d.FileName+"/Document", {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token")
                    }
                })
                    .then(response =>
                        response.json().then(data => {
                            if (data.success) {
                                swal("","Removed successfully","success");
                                this.fetchAdditionalSubmisionsDocuments(this.state.ApplicationID);
                            } else {
                                swal("","Remove Failed","error");
                            }
                        })
                    )
                    .catch(err => {
                        swal("", "Remove Failed", "error");
                    });
            }
        });
    };
    handViewApplication = k => {
      
        const data = {
            ApplicationID: k.ID,
            PEPOBox: k.PEPOBox,
            PEPostalCode: k.PEPostalCode,
            PETown: k.PETown,
            PEPostalCode: k.PEPostalCode,
            PEMobile: k.PEMobile,
            PEEmail: k.PEEmail,
            PEWebsite: k.PEWebsite,
            TenderID: k.TenderID,
            ApplicationNo: k.ApplicationNo,
            TenderNo: k.TenderNo,
            ApplicationREf: k.ApplicationREf,
            PEName: k.PEName,
            FilingDate: new Date(k.FilingDate).toLocaleDateString(),
            AwardDate: new Date(k.AwardDate).toLocaleDateString(),
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
        this.fetchApplicantDetails(k.ApplicantID)
        this.fetchAdditionalSubmisions(k.ID);
        this.fetchAdditionalSubmisionsDocuments(k.ID)
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
    onEditorChange = evt => {
        this.setState({
            AdditionalDescription: evt.editor.getData()
        });
    };
    onClickHandler = event => {
        event.preventDefault();
        if (!this.state.DocumentDesc){
            swal("","Document Description is required","error");
            return;
        }
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
                    this.setState({
                        UploadedFilename: res.data
                    });
                    const data = {
                        DocName: res.data,
                        ApplicationID: this.state.ApplicationID,
                        Description: this.state.DocumentDesc,
                        FilePath: process.env.REACT_APP_BASE_URL + "/Documents",
                     
                        Confidential: this.state.Confidential
                    };
                    this.Savedocument("/api/additionalsubmissions/Documents", data);
                   
                    // localStorage.setItem("UserPhoto", res.data);
                })
                .catch(err => {
                    toast.error("upload fail");
                });
        } else {
            toast.warn("Please select a file to upload");
        }
    };
    handleInputChange = event => {
        // event.preventDefault();
        // this.setState({ [event.target.name]: event.target.value });
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
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
    ViewFile = (k, e) => {     
        let filepath = k.Path + "/" + k.FileName;       
        window.open(filepath);
        
    };
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
                        <span>
                            <a
                                style={{ color: "#007bff" }}
                                onClick={e => this.handViewApplication(k, e)}
                            >
                                {" "}
                                Add{" "}
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
        let ViewFile = this.ViewFile;
        if (this.state.summary) {
            return (
                <div>
                    <ToastContainer />
                    <Modal
                        visible={this.state.open}
                        width="80%"
                        height="80%"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div className="ibox-content" style={{ overflow: "scroll", height: "100%" }}>
                        <a
                            style={{ float: "right", color: "red", margin: "10px" }}
                            href="javascript:void(0);"
                            onClick={() => this.closeModal()}
                        >
                            <i class="fa fa-close"></i>
                        </a>
                        <div>
                            <h4 style={{ "text-align": "center", color: "#1c84c6" }}>
                                 ADDITIONAL SUBMISSION
                            </h4>
                            <div className="container-fluid" >
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
                                                            Background Information
                                                                         </label>
                                                        <CKEditor

                                                            onChange={this.onEditorChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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
                                                    <div class="form-group">
                                                        <Progress
                                                            max="100"
                                                            color="success"
                                                            value={this.state.loaded}
                                                        >
                                                            {Math.round(this.state.loaded, 2)}%
                              </Progress>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        class="btn btn-success "
                                                        onClick={this.onClickHandler}
                                                    >
                                                        Upload
                                                 </button>
                                                </div>
                                                <div class="col-sm-5">
                                                    <label
                                                        for="Document"
                                                        className="font-weight-bold"
                                                    >
                                                      Document Description
                                                     </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="DocumentDesc"
                                                        onChange={this.handleInputChange}
                                                        value={this.state.DocumentDesc}
                                                        
                                                    />
                                                </div>
                                                <div className="col-sm-2">
                                                    <div className="form-group">
                                                        <br />
                                                        <br />
                                                        <input
                                                            className="checkbox"
                                                            id="Confidential"
                                                            type="checkbox"
                                                            name="Confidential"
                                                            defaultChecked={this.state.Confidential}
                                                            onChange={this.handleInputChange}
                                                        />{" "}
                                                        <label
                                                            htmlFor="Confidential"
                                                            className="font-weight-bold"
                                                        >
                                                            Confidential
                                  </label>
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
                                                            className="btn btn-primary float-right"
                                                        >
                                                            Submit
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                      <div className=" row" >
                                                <table className="table table-borderless table-sm">
                                                        <thead className="thead-light">
                                                    <th>ID</th>
                                                    <th>Description</th>
                                                            <th>Date Submited</th>
                                                            <th> Submited By</th>
                                                    <th>Actions</th>
                                                        </thead>
                                                        {this.state.AdditionalSubmisionsDocuments.map( (k, i)=> {
                                                        return (
                                                            k.CreatedBy === localStorage.getItem("UserName") ?
                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td>   {k.Description}</td>
                                                                <td>
                                                                    {new Date(k.Create_at).toLocaleDateString()}
                                                                </td>
                                                                    <td>   {k.SubmitedBy}</td>

                                                                <td>
                                                                    <a onClick={e => ViewFile(k, e)} className="text-success">
                                                                        <i class="fa fa-eye" aria-hidden="true"></i>View Attachemnt
                                                                     </a>|
                                                                     {
                                                                            k.Category ==="Applicant"?
                                                                     
                                                                      <a
                                                                        style={{ color: "#f44542" }}
                                                                        onClick={e =>
                                                                            this.handleDeleteDocument(
                                                                                k,
                                                                                e
                                                                            )
                                                                        }
                                                                    >
                                                                        &nbsp; Remove
                                                                          </a>:null}
                                                                </td>
                                                            </tr>:null
                                                        );
                                                    })}
                                                </table>

                                            </div>
                                        </form>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </Modal>
                   

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
                                        STATUS:
                                        <span className="text-success">
                                            {this.state.Status}
                                        </span>

                                    </h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-4">
                            <div className="row wrapper ">
                                {this.state.Status === "WITHDRAWN" ?
                                    null : <button
                                        type="button"
                                        style={{ marginTop: 40 }}
                                        onClick={this.openWithdraw}
                                        className="btn btn-primary float-right"
                                    >
                                        Submit Aditional Submission </button>
                                }
                                &nbsp;
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
                                        {/* <tr>
                                            <td className="font-weight-bold"> Tender Value:</td>
                                            <td className="font-weight-bold">
                                                {this.formatNumber(this.state.TenderValue)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> FilingDate:</td>
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
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 ">
                                <h3 style={headingstyle}>Additional Submissions</h3>
                                <div className="col-lg-11 border border-success rounded">
                                    <h2>Background Information</h2>
                                  
                                        {this.state.AdditionalSubmisions.map(function (k, i) {
                                            return (
                                               
                                                k.CreatedBy === localStorage.getItem("UserName") ?
                                                    <p>
                                                        {ReactHtmlParser(k.Description)}
                                                    </p> : null                                                  
                                               
                                            );
                                        })}
                                    <h2>Attachments</h2>

                                    <table className="table table-borderless table-sm">
                                        <thead className="thead-light">
                                            <th>ID</th>
                                            <th>Description</th>
                                            <th>Date Uploaded</th>
                                            <th>Actions</th>
                                        </thead>
                                        {this.state.AdditionalSubmisionsDocuments.map((k, i) => {
                                            return (
                                                k.CreatedBy === localStorage.getItem("UserName") ?                                                
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>   {k.Description}</td>
                                                    <td>
                                                        {new Date(k.Create_at).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        <a onClick={e => ViewFile(k, e)} className="text-success">
                                                            <i class="fa fa-eye" aria-hidden="true"></i>View Attachemnt
                                                                     </a>|
                                                                      <a
                                                            style={{ color: "#f44542" }}
                                                            onClick={e =>
                                                                this.handleDeleteDocument(
                                                                    k,
                                                                    e
                                                                )
                                                            }
                                                        >
                                                            &nbsp; Remove </a>
                                                    </td>
                                                    </tr> : null
                                            );
                                        })}
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
                                    <h2>Applications</h2>
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

export default PEadditionalsubmissions;

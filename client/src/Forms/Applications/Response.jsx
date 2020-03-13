import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";
var dateFormat = require("dateformat");
var _ = require("lodash");
var dateFormat = require("dateformat");
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
class Response extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ResponseDocuments: [],
            ResponseDetails: [],
            AdditionalSubmisionsDocuments: [],
            AdditionalSubmisions: [],
            Response: [],
            PrayersDetails: [],
            GroundsDetails: [],
            NewDeadLine: "",
            Reason: "",
            Board: data.Board,
            GroundResponse: "",
            GroundNo: "",
            selectedFile: "",
            loaded: 0,
            ResponseID: "",
            grounddesc: "",
            summary: false,
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
            ApplicantID: "",
            ApplicationNo: "",
            Name: "",
            ResponseDate: "",
            BackgroundInformation:"",
            ResponseType: "",
            TenderNo: ""
        };
    }
    checkDocumentRoles = () => {

        if (this.state.Board) {
            return true;
        }        

        return false;

    }
    fetchAdditionalSubmisions = (ApplicationID) => {
        this.setState({
            AdditionalSubmisions: []
        });
        fetch("/api/additionalsubmissions/" + ApplicationID + "/PE", {
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
    fetchResponseDocuments = ResponseID => {
        fetch("/api/PEResponse/Documents/" + ResponseID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ResponseDocuments => {
                if (ResponseDocuments.length > 0) {
                    this.setState({ ResponseDocuments: ResponseDocuments });
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchBackgrounInformation = (ApplicationNo) => {
        this.setState({
            BackgroundInformation: []
        });
        fetch("/api/PEResponse/BackgrounInformation/" +ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ResponseDetails => {
                if (ResponseDetails.length > 0) {
                   
                    this.setState({
                        
                        BackgroundInformation: ResponseDetails[0].BackgroundInformation
                    });
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };
    fetchResponseDetails = ResponseID => {
        fetch("/api/PEResponse/Details/" + ResponseID, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ResponseDetails => {
                if (ResponseDetails.length > 0) {

                    this.setState({ ResponseDetails: ResponseDetails });
                    const UserRoles = [_.groupBy(ResponseDetails, "GroundType")];

                    if (UserRoles[0].Prayers) {
                        this.setState({ PrayersDetails: UserRoles[0].Prayers });
                    }
                    if (UserRoles[0].Grounds) {
                        this.setState({ GroundsDetails: UserRoles[0].Grounds });
                    }
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchResponse = () => {
        fetch("/api/PEResponse/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Response => {
                if (Response.length > 0) {
                    this.setState({ Response: [] });
                    this.setState({ Response: Response });
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
                            this.fetchResponse();
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
    fetchApplicantDetails = Applicant => {
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
    handViewResponse = k => {
        let ResponseID = k.ResponseID;
        let data = {
            ApplicationNo: k.ApplicationNo,
            Name: k.Name,
            ResponseDate: k.ResponseDate,
            ResponseID: k.ResponseID,
            ResponseType: k.ResponseType,
            TenderNo: k.TenderNo,
            TenderValue: k.TenderValue
        };
        this.setState(data);
        this.setState({ ResponseDocuments: [] });
        this.setState({ ResponseDetails: [] });
        this.fetchResponseDocuments(ResponseID);
        this.fetchResponseDetails(ResponseID);
        this.fetchApplicantDetails(k.Applicantusername);
        this.setState({ summary: true });
        this.fetchAdditionalSubmisions(k.ID);
        this.fetchBackgrounInformation(k.ApplicationNo);
        this.fetchAdditionalSubmisionsDocuments(k.ID)
    };
    formatNumber = num => {
        let newtot = Number(num).toFixed(2);
        return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    GoBack = e => {
        e.preventDefault();
        this.setState({ summary: false });
    };
    ViewFile = (k, e) => {
        if(k.FileName){
            let filepath = k.Path + "/" + k.FileName;
            window.open(filepath);
        }else{
            let filepath = process.env.REACT_APP_BASE_URL + "/" + k.Path + "/" + k.Name;
            window.open(filepath);
        }
      
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
    render() {
        const ColumnData = [
            {
                label: "ApplicationNo",
                field: "ApplicationNo",
                sort: "asc",
                width: 200
            },
            {
                label: "ResponseType",
                field: "ResponseType",
                sort: "asc",
                width: 200
            },
            {
                label: "ResponseDate",
                field: "ResponseDate"
            },
            {
                label: "TenderNo",
                field: "TenderNo"
            },
            {
                label: "TenderName",
                field: "TenderName"
            },
            {
                label: "action",
                field: "action",
                sort: "asc",
                width: 200
            }
        ];
        let Rowdata1 = [];
        const rows = [...this.state.Response];
        if (rows.length > 0) {
            rows.forEach(k => {
                const Rowdata = {
                    ApplicationNo: k.ApplicationNo,
                    ResponseType: k.ResponseType,
                   
                    ResponseDate: dateFormat(
                        new Date(k.ResponseDate).toLocaleDateString(),
                        "mediumDate"
                    ),
                    TenderNo: k.TenderNo,
                    TenderName: k.Name,
                    action: (
                        <span>
                            <a
                                className="fa fa-edit"
                                style={{ color: "#007bff" }}
                                onClick={e => this.handViewResponse(k, e)}
                            >
                                View
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
                    <ToastContainer/>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-11">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Response</h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-1">     
                                              
                                <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                onClick={this.GoBack}
                                    className="btn btn-warning"
                                >
                            &nbsp; Close
                            </button>
                           
                            
                        </div>
                    </div>

                    <br />
                    <div className="border-bottom white-bg p-4">
                        <div className="row">
                            <div className="col-sm-10">
                                <h3 style={headingstyle}> Application Details</h3>
                                <div className="col-lg-12 border border-success rounded">
                                    <table className="table table-borderless table-sm">
                                        <tr>
                                            <td className="font-weight-bold"> APPLICATION:</td>
                                            <td> {this.state.ApplicationNo}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> TENDER NO:</td>
                                            <td> {this.state.TenderNo}</td>
                                        </tr>

                                        <tr>
                                            <td className="font-weight-bold"> NAME:</td>

                                            <td> {this.state.Name}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> VALUE:</td>
                                            <td> {this.formatNumber(this.state.TenderValue)} </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Date:</td>
                                            <td className="font-weight-bold">
                                              
                                                {dateFormat(
                                                    new Date(
                                                        this.state.ResponseDate
                                                    ).toLocaleDateString(),
                                                    "mediumDate"
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold"> Type:</td>
                                            <td>{this.state.ResponseType}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-sm-10">
                                <h3 style={headingstyle}> Applicant Details</h3>
                                <div className="col-lg-12 border border-success rounded">
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
                        </div>

                        <br />
                        <div className="row">
                            <div className="col-sm-10">
                                <h3 style={headingstyle}> Response Details</h3>
                                <div className="col-lg-12 border border-success rounded">
                                    {
                                        this.state.BackgroundInformation? <div>
                                            <h3>Background Information</h3>
                                            {ReactHtmlParser(
                                                this.state.BackgroundInformation
                                            )}
                                        </div>:null
                                    }
                                    <h3>Response to Applicant Grounds</h3>
                                    {this.state.GroundsDetails.map(function (k, i) {
                                        return (
                                            <div>
                                                <h3 style={headingstyle}>GroundNo: {k.GroundNO}</h3>
                                                <h3 style={headingstyle}>Response</h3>
                                                {ReactHtmlParser(k.Response)}
                                            </div>
                                        );
                                    })}
                                    <h3>Response to Applicant Requests</h3>

                                    {this.state.PrayersDetails.map(function (k, i) {
                                        return (
                                            <div>
                                                <h3 style={headingstyle}>RequestNo: {k.GroundNO}</h3>
                                                <h3 style={headingstyle}>Response</h3>
                                                {ReactHtmlParser(k.Response)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <br />
                        <div className="row">
                            <div className="col-sm-10">
                                <h3 style={headingstyle}> Documents Attached</h3>
                                <div className="col-lg-12 border border-success rounded">
                                    <table className="table table-sm">
                                        <thead className="thead-light">
                                        <th>#</th>
                                        <th>Document Description</th>
                                        <th>FileName</th>
                                        <th>Actions</th>
                                        </thead>

                                        {this.state.ResponseDocuments.map( (k, i)=> {
                                            return (
                                                k.Confidential ?
                                                    this.checkDocumentRoles() ?
                                                  <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{k.Description}</td>
                                                            <td>{k.FileName}</td>
                                                    <td>
                                                        <a
                                                            onClick={e => ViewFile(k, e)}
                                                            className="text-success"
                                                        >
                                                            <i class="fa fa-eye" aria-hidden="true"></i>View
                                                                   </a>
                                                    </td>
                                                    </tr>
                                                     :null
                                                    :
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{k.Description}</td>
                                                        <td>{k.Name}</td>
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
                        </div>
                        <div className="row">
                            <div className="col-lg-12 ">
                                <h3 style={headingstyle}>Additional Submissions</h3>
                                <div className="col-lg-11 border border-success rounded">
                                    <h2>Background Information</h2>

                                    {this.state.AdditionalSubmisions.map(function (k, i) {
                                        return (
                                            <p>
                                                <h5>
                                                    {" "}
                                                    Submited By. {k.SubmitedBy} - {k.Category} (
                          {dateFormat(k.Create_at, "default")})
                        </h5>
                                                {ReactHtmlParser(k.Description)}
                                            </p>
                                        );
                                    })}
                                    <h2>Attachments</h2>
                                    <table className="table table-borderless table-sm">
                                        <thead className="thead-light">
                                            <th>ID</th>
                                            <th>Description</th>
                                            <th>Date Submited</th>
                                            <th>Submited By</th>
                                            <th>Actions</th>
                                        </thead>
                                        {this.state.AdditionalSubmisionsDocuments.map((k, i) => {
                                            return k.Confidential ? (
                                                this.checkDocumentRoles() ? (
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td> {k.Description}</td>
                                                        <td>{dateFormat(k.Create_at, "default")}</td>
                                                        <td>
                                                            {" "}
                                                            {k.SubmitedBy} - {k.Category}
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
                                                ) : null
                                            ) : (
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td> {k.Description}</td>
                                                        <td>{dateFormat(k.Create_at, "default")}</td>
                                                        <td>
                                                            {" "}
                                                            {k.SubmitedBy} - {k.Category}
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
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer />
                    <div>
                        <div className="row wrapper border-bottom white-bg page-heading">
                            <div className="col-lg-10">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <h2>Procuring Entities Response</h2>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-lg-2">
                                <Link to="/">
                                    <button
                                        type="button"
                                        style={{ marginTop: 40 }}
                                        className="btn btn-warning"
                                    >
                                        &nbsp; Close
                                </button>
                                </Link>
                            </div>
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

export default Response;

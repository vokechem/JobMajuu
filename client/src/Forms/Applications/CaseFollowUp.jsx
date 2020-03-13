import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";
import Modal from 'react-awesome-modal';
var dateFormat = require("dateformat");
var _ = require("lodash");
class CaseFollowUp extends Component {
    constructor() {
        super();
        this.state = {
            Documents: [],
            Applications: [],
            Findings: [],
            Decisionorders: [],
            Issues: [],
            TenderName: "",
            ApplicantDetails: [],
            privilages: [],
            Confidential: false,
            ApplicationNo: "",
            PEDetails: [],
            summary: false,
            open: false,
            Orders: false,
            TenderName: "",
            FilingDate: "",
            BackgroundInformation: "",
            AwardDate: "",
            TenderNo: "",
            TenderValue: "",
            TenderCategory: "",
            TenderSubCategory: "",
            TenderType: "",

            FollowUpRequired: false,
            RefertoDG: false,
            Closed: false,
            DecisionDate: "",
            selectedFile: null,
            loaded: 0,
            IsUpdateFindings: false,
            Description: "",
            IsUpdateissues: false,
            openViewer: false,
            openIssuesModal: false,
            openFindingsModal: false,
            loaded: 0,
            Number: "",
            Action: ""

        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.HandlePrevieView = this.HandlePrevieView.bind(this)

    }
    openModal = () => {
        this.setState({ open: true });

    }
    fetchBackgroundInformation = ApplicationNo => {
        this.setState({ BackgroundInformation: "" });
        fetch("/api/Decision/" + ApplicationNo, {
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
                        BackgroundInformation: ApplicantDetails[0].Backgroundinformation
                    });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    closeModal = () => {
        this.setState({ open: false });
    }

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

    fetchOrders = (ApplicationNo) => {

        this.setState({ Decisionorders: [] });
        fetch("/api/decisionorders/" + ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PEDetails => {

                if (PEDetails.length > 0) {

                    this.setState({ Decisionorders: PEDetails });
                } else {
                    swal("", PEDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchIssues = (ApplicationNo) => {
        this.setState({ Issues: [] });
        fetch("/api/issuesfordetermination/" + ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PEDetails => {
                if (PEDetails.length > 0) {

                    this.setState({ Issues: PEDetails });
                } else {
                    swal("", PEDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchFindings = (ApplicationNo) => {

        this.setState({ Findings: [] });
        fetch("/api/findingsonissues/" + ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PEDetails => {
                if (PEDetails.length > 0) {

                    this.setState({ Findings: PEDetails });
                } else {
                    swal("", PEDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchDocuments = (ApplicationNo) => {
        this.setState({ Documents: [] });
        fetch("/api/decisiondocuments/" + ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(PEDetails => {
                if (PEDetails.length > 0) {

                    this.setState({ Documents: PEDetails });
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
    };
    fetchApplications = () => {
        this.setState({ Applications: [] });
        fetch("/api/CaseFollowUp", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Applications => {
                if (Applications.length > 0) {
                    this.setState({ Applications: Applications });
                } else {
                    swal("", Applications.message, "error");
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
                            this.fetchApplications()
                            this.ProtectRoute();
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




    HandlePrevieView = (d) => {

        let filepath = d.Path + "/" + d.Name
        var res = filepath.split(".");
        if (res[1] == "pdf") {
            this.setState({ openViewer: true });
        }
        if (res[1] == "PDF") {
            this.setState({ openViewer: true });
        }

        this.setState({ FileURL: filepath });

    }

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
    fetchInterestedParties = ApplicationNo => {
        this.setState({ InterestedParties: [] });
        fetch("/api/interestedparties/" + ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {
                    this.setState({ InterestedParties: ApplicantDetails });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchBoardMembers = ApplicationNo => {
        this.setState({ Boardmembers: [] });
        fetch("/api/GeneratePanelList/" + ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {
                    this.setState({ Boardmembers: ApplicantDetails });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchAttendance = ApplicationNo => {
        this.setState({ Attendance: [] });
        fetch("/api/Decision/" + ApplicationNo + "/Attendance", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {
                    this.setState({ Attendance: ApplicantDetails });
                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    HandleView = k => {

        const data = {
            ApplicationNo: k.ApplicationNo,
            summary: true,
            TenderName: k.TenderName,
            FilingDate: k.FilingDate,
            Status: k.Status,
            AwardDate: k.AwardDate,
            TenderNo: k.TenderNo,
            TenderValue: k.TenderValue,
            TenderCategory: k.TenderCategory,
            TenderSubCategory: k.TenderSubCategory,
            TenderType: k.TenderType,

            DecisionDate: dateFormat(
                new Date(k.DecisionDate).toLocaleDateString(),
                "isoDate"
            ),
            FollowUpRequired: k.Followup,
            RefertoDG: k.Referral,
            Closed: k.Closed
        };
        this.setState(data);
        this.fetchInterestedParties(k.ApplicationNo);
        this.fetchBoardMembers(k.ApplicationNo)
        this.fetchAttendance(k.ApplicationNo)
        this.fetchApplicantDetails(k.ApplicationNo)
        this.fetchPEDetails(k.ApplicationNo)
        this.fetchDocuments(k.ApplicationNo)
        this.fetchIssues(k.ApplicationNo)
        this.fetchFindings(k.ApplicationNo)
        this.fetchOrders(k.ApplicationNo)
        this.fetchBackgroundInformation(k.ApplicationNo);

    };

    PrintPDF = () => {
        let app = this.state.ApplicantDetails[0].Name;
        let pe = this.state.PEDetails[0].Name;
        const data = {
            Applicationno: this.state.ApplicationNo,
            Issues: this.state.Issues,
            Orders: this.state.Decisionorders,
            Findings: this.state.Findings,
            Attendance: this.state.Attendance,
            DecisionDate: dateFormat(new Date(this.state.DecisionDate).toLocaleDateString(), "mediumDate"
            ),

            InterestedParties: this.state.InterestedParties,
            Boardmembers: this.state.Boardmembers,
            ApplicantName: app,
            PEName: pe,
            BackgroundInformation: this.state.BackgroundInformation,
            Applicationstatus: this.state.Status,
            FilingDate: dateFormat(
                new Date(this.state.FilingDate).toLocaleDateString(),
                "mediumDate"
            ),
            TenderNo: this.state.TenderNo,
            TenderName: this.state.TenderName,
            AwardDate: dateFormat(
                new Date(this.state.AwardDate).toLocaleDateString(),
                "mediumDate"
            ),
            TenderValue: this.state.TenderValue,
            TenderCategory: this.state.TenderCategory,
            TenderSubCategory: this.state.TenderSubCategory,
            TenderType: this.state.TenderType
        };
        fetch("/api/GenerateDecision", {
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
                        let filepath =
                            process.env.REACT_APP_BASE_URL +
                            "/Decisions/" +
                            this.state.ApplicationNo +
                            ".pdf";
                        this.setState({ FileURL: filepath, openViewer: true });
                        //swal("", "Printed", "success");
                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    };
    closeViewerModal = () => {
        this.setState({ openViewer: false });
    };
    render() {
        let FormStyle = {
            margin: "20px"
        };

        let headingstyle = {
            color: "#7094db"
        };

        const ColumnData = [
            {
                label: "ApplicationNo",
                field: "ApplicationNo",
                sort: "asc",
                width: 200
            },
            {
                label: "Procuring Entity",
                field: "ProcuringEntity",
                sort: "asc",
                width: 200
            },
            {
                label: "Tender Details",
                field: "TenderName",
                sort: "asc",
                width: 200
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
            rows.forEach(k => {
                const Rowdata = {
                    ApplicationNo: k.ApplicationNo,
                    ProcuringEntity: k.PEName,
                    TenderName: k.TenderName,

                    action: (
                        <span>

                            <a style={{ color: "#007bff" }}
                                onClick={e => this.HandleView(k, e)}
                            >
                                More
                                 </a>
                        </span>
                    )
                };
                Rowdata1.push(Rowdata);
            });
        }



        if (this.state.summary) {

            return (
                <div>
                    <ToastContainer />
                    <Modal
                        visible={this.state.openViewer}
                        width="80%"
                        height="600"
                        effect="fadeInUp"
                        onClickAway={() => this.closeViewerModal()}
                    >
                        <div>
                            <a
                                style={{ float: "right", color: "red", margin: "10px" }}
                                href="javascript:void(0);"
                                onClick={() => this.closeViewerModal()}
                            >
                                Close
                </a>

                            <object
                                width="100%"
                                height="570"
                                data={this.state.FileURL}
                                type="application/pdf"
                            >
                                {" "}
                            </object>
                        </div>
                    </Modal>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-10">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Application No: <span style={headingstyle}>{this.state.ApplicationNo}</span>  </h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-2">
                            <div className="row wrapper ">

                                <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    // onClick={this.openModal}
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
                                <form style={FormStyle}>
                                    <div class="row">

                                        <div class="col-sm-12">
                                            <input
                                                type="text"

                                                disabled

                                                value={this.state.TenderName}
                                                className="form-control"
                                            />
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
                                                                        <td>{r.POBox + "-" + r.PostalCode + " " + r.Town}</td>

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
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 ">
                                <h3 style={headingstyle}>Background Information</h3>
                                <div className="row border border-success rounded bg-white">
                                    <div class="col-sm-12">
                                        <br />

                                        <div>
                                            <table class="table table-sm">

                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {ReactHtmlParser(
                                                                this.state.BackgroundInformation
                                                            )}
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 ">
                                <h3 style={headingstyle}>
                                    Issues for Determinations
                                        </h3>
                                <div className="row border border-success rounded bg-white">
                                    <div class="col-sm-12">


                                        <br />

                                        <div>
                                            <table class="table table-sm">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">NO</th>
                                                        <th scope="col"> Description</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.Issues.map((r, i) =>

                                                        <tr>
                                                            <td>{r.NO}</td>
                                                            <td>
                                                                {ReactHtmlParser(r.Description)}

                                                            </td>

                                                        </tr>

                                                    )}
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 ">
                                <h3 style={headingstyle}>
                                    Findings on Issues
                                        </h3>
                                <div className="row border border-success rounded bg-white">
                                    <div class="col-sm-12">


                                        <br />

                                        <div>
                                            <table class="table table-sm">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">NO</th>
                                                        <th scope="col">Decision</th>
                                                        <th scope="col"> Description</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.Findings.map((r, i) =>

                                                        <tr>
                                                            <td>{r.NO}</td>
                                                            <td>{r.Actions}</td>

                                                            <td>
                                                                {ReactHtmlParser(r.Description)}

                                                            </td>

                                                        </tr>

                                                    )}
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 ">
                                <h3 style={headingstyle}>
                                    Orders
                                        </h3>
                                <div className="row border border-success rounded bg-white">
                                    <div class="col-sm-12">

                                        <br />

                                        <div>
                                            <table class="table table-sm">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">NO</th>
                                                        <th scope="col"> Description</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.Decisionorders.map((r, i) =>

                                                        <tr>
                                                            <td>{r.NO}</td>
                                                            <td>
                                                                {ReactHtmlParser(r.Description)}

                                                            </td>

                                                        </tr>

                                                    )}
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 ">
                                <h3 style={headingstyle}>
                                    Decision Documents
                                        </h3>
                                <div className="row border border-success rounded bg-white">
                                    <div class="col-sm-12">

                                        <br />

                                        <div>
                                            <table class="table table-sm">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">NO</th>
                                                        <th scope="col">Document Description</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.Documents.map((r, i) =>

                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>
                                                                {r.Description}

                                                            </td>
                                                            <td>
                                                                {" "}
                                                                <span>
                                                                    <a style={{ color: "#007bff" }}
                                                                        onClick={e => this.HandlePrevieView(r, e)}
                                                                    >
                                                                        View
                                                                    </a> |
                                                                </span>
                                                            </td>
                                                        </tr>

                                                    )}
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 ">
                                <h3 style={headingstyle}>
                                    Decision
                                        </h3>
                                <div className="row border border-success rounded bg-white">
                                    <div class="col-sm-12">

                                        <form

                                            onSubmit={this.handleSubmit}
                                        >
                                            <br />
                                            <div classname="row">
                                                <div class="col-sm-6">
                                                    <label
                                                        for="Location"
                                                        className="font-weight-bold"
                                                    >
                                                        Decision Date
                                                 </label>

                                                    <input
                                                        type="date"
                                                        name="DecisionDate"
                                                        required
                                                        defaultValue={this.state.DecisionDate}
                                                        className="form-control"
                                                        onChange={this.handleInputChange}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <div className="col-sm-2">
                                                    <input
                                                        className="checkbox"
                                                        id="Confidential"
                                                        type="checkbox"
                                                        name="FollowUpRequired"
                                                        disabled
                                                        defaultChecked={this.state.FollowUpRequired}
                                                        onChange={this.handleInputChange}
                                                    />&nbsp;Follow Up Required
                                                </div>
                                                <div className="col-sm-2">
                                                    <input
                                                        className="checkbox"
                                                        id="RefertoDG"
                                                        type="checkbox"
                                                        name="RefertoDG"
                                                        disabled
                                                        defaultChecked={this.state.RefertoDG}
                                                        onChange={this.handleInputChange}
                                                    />&nbsp;Refer to DG
                                                </div>
                                                <div className="col-sm-2">
                                                    <input
                                                        className="checkbox"
                                                        id="Closed"
                                                        type="checkbox"
                                                        name="Closed"
                                                        disabled
                                                        defaultChecked={this.state.Closed}
                                                        onChange={this.handleInputChange}
                                                    />&nbsp;Closed
                                                </div>
                                            </div>
                                            <br />

                                            <div className="row">
                                                <div className="col-sm-10"></div>
                                                <div className="col-sm-2">
                                                    {/* <button
                                                        className="btn btn-success"
                                                        type="button"
                                                        onClick={this.PrintPDF}
                                                    >
                                                        Print
                                                        </button> */}
                                                    &nbsp;
                                                    <button
                                                        className="btn btn-warning"
                                                        type="button"
                                                        onClick={this.switchMenu}
                                                    >
                                                        Close
                                                         </button>
                                                </div>
                                            </div>
                                            <br />
                                        </form>
                                    </div>
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
                                        <h2>CASE FOLLOW UP</h2>
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

export default CaseFollowUp;

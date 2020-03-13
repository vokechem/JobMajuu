import React, { Component } from "react";
import swal from "sweetalert";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Link } from "react-router-dom";
import GoogleDocsViewer from "react-google-docs-viewer";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactPlayer from 'react-player'
import Modal from 'react-awesome-modal';
var _ = require("lodash");
class CaseProceedings extends Component {
    constructor() {
        super();
        this.state = {
            Documents: [],
            Applications: [],
            TenderName: "",
            ApplicantDetails: [],
            privilages: [],
            Vedios: [],
            Audios: [],
            ApplicationNo: "",
            PEDetails: [],
            summary: false,
            open: false,
            isDocuments: false,
            isVedios: false,
            isAudio: false,
            selectedFile: null,
            loaded: 0,
            Description: "",
            openViewer: false,
            FileURL: "",
            MediaURL: "",
            openPlayer: false,


        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.HandlePrevieView = this.HandlePrevieView.bind(this)
    }
    openModal() {
        this.setState({ open: true });

    }



    closeModal() {
        this.setState({ open: false });
    }
    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
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

        if (actionMeta.name === "Branch") {


            this.fetchVenuesPerBranch(UserGroup.value, UserGroup.label);
        }
        if (actionMeta.name === "VenueID") {
            this.setState({ VenueID: UserGroup.value });
            this.setState({ RoomName: UserGroup.label });


        }
        this.setState({ [actionMeta.name]: UserGroup.value });
    };
    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    fetchDocuments = (ApplicationNo) => {
        this.setState({ Documents: [] });
        fetch("/api/HearingInProgress/" + ApplicationNo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Documents => {
                if (Documents.length > 0) {
                    const data = [_.groupBy(Documents, "Category")];
                    if (data[0].Documents) {
                        this.setState({ Documents: data[0].Documents });
                    }
                    if (data[0].Vedio) {
                        this.setState({ Vedios: data[0].Vedio });
                    }
                    if (data[0].Audio) {
                        this.setState({ Audios: data[0].Audio });
                    }


                } else {
                    swal("", Documents.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchApplications = () => {
        this.setState({ Applications: [] });
        fetch("/api/HearingInProgress/1/1", {
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
    handleDocumentsUploadClick = () => {
        this.setState({ open: true });
        this.setState({ isDocuments: true });
        this.setState({ isAudio: false });
        this.setState({ isVedios: false });

    }
    handleAudioUploadClick = () => {
        this.setState({ open: true });
        this.setState({ isDocuments: false });
        this.setState({ isAudio: true });
        this.setState({ isVedios: false });

    }
    handleVedioUploadClick = () => {
        this.setState({ open: true });
        this.setState({ isDocuments: false });
        this.setState({ isAudio: false });
        this.setState({ isVedios: true });

    }
    switchMenu = e => {
        this.setState({ summary: false });
    }
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
    checkMimeType = event => {
        let files = event.target.files;
        let err = []; // create empty array
        const types = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err[x] = files[x].type + " is not a supported format\n";
                // assign message to array
            }
        }
        for (var z = 0; z < err.length; z++) {
            // loop create toast massage
            event.target.value = null;

            toast.error(err[z]);
        }
        return true;
    };
    closeViewerModal = () => {
        this.setState({ openViewer: false });
    }
    closePlyer = () => {
        this.setState({ openPlayer: false });
    }
    handleDeleteDocument = (d, Category) => {


        swal({
            text: "Are you sure that you want to remove this attachment?",
            icon: "warning",
            dangerMode: true,
            buttons: true
        }).then(willDelete => {
            if (willDelete) {
                return fetch("/api/HearingInProgress/" + d.Name, {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token")
                    }
                })
                    .then(response =>
                        response.json().then(data => {
                            if (data.success) {
                                if (Category === "Documents") {
                                    var rows = [...this.state.Documents];
                                    const filtereddata = rows.filter(
                                        item => item.Name !== d.Name
                                    );
                                    this.setState({ Documents: filtereddata });
                                }
                                if (Category === "Audios") {
                                    var rows = [...this.state.Audios];
                                    const filtereddata = rows.filter(
                                        item => item.Name !== d.Name
                                    );
                                    this.setState({ Audios: filtereddata });
                                }
                                if (Category === "Vedios") {
                                    var rows = [...this.state.Vedios];
                                    const filtereddata = rows.filter(
                                        item => item.Name !== d.Name
                                    );
                                    this.setState({ Vedios: filtereddata });
                                }

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
    HandlePrevieView = (d) => {

        let filepath = process.env.REACT_APP_BASE_URL + "/HearingAttachments/Documents/" + d.Name
        this.setState({ openViewer: true });
        this.setState({ FileURL: filepath });

    }
    HandleViewPlayer = (d) => {

        let filepath = process.env.REACT_APP_BASE_URL + "/HearingAttachments/Vedios/" + d.Name
        this.setState({ openPlayer: true });
        this.setState({ MediaURL: filepath });

    }
    handleViewPlayeAudio = (d) => {
        let filepath = process.env.REACT_APP_BASE_URL + "/HearingAttachments/Audios/" + d.Name
        this.setState({ openPlayer: true });
        this.setState({ MediaURL: filepath });
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
    HandleView = k => {
        const data = {
            ApplicationNo: k.ApplicationNo,
            summary: true,
            TenderName: k.TenderName,
            Status: k.Status
        };
        this.setState(data);
        this.fetchApplicantDetails(k.ApplicationNo)
        this.fetchPEDetails(k.ApplicationNo)
        this.fetchDocuments(k.ApplicationNo);
    };
    checkMimeType = event => {
        let files = event.target.files;
        let err = []; // create empty array
        if (this.state.isDocuments) {
            const types = ["application/pdf", "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
                "application/vnd.ms-word.document.macroEnabled.12",
                "application/vnd.ms - word.template.macroEnabled.12",
                "application/vnd.ms-excel",
                "application/vnd.ms-excel",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
                "application/vnd.ms-excel.sheet.macroEnabled.12",
                "application/vnd.ms-excel.template.macroEnabled.12",
                "application/vnd.ms-excel.addin.macroEnabled.12",
                "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
                "application/vnd.ms-powerpoint",
                "application/vnd.ms-powerpoint",
                "application/vnd.ms-powerpoint",
                "application/vnd.ms-powerpoint",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "application/vnd.openxmlformats-officedocument.presentationml.template",
                "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
                "application/vnd.ms-powerpoint.addin.macroEnabled.12",
                "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
                "application/vnd.ms-powerpoint.template.macroEnabled.12",
                "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
                "application/vnd.ms-access"
            ]
            for (var x = 0; x < files.length; x++) {

                if (types.every(type => files[x].type !== type)) {
                    err[x] = files[x].type + " is not a supported format\n";
                    // assign message to array
                }
            }
            for (var z = 0; z < err.length; z++) {
                // loop create toast massage
                event.target.value = null;
                toast.error(err[z]);
            }
            return true;
        }
        if (this.state.isVedios) {
            const types = ["video/mp4", "video/x-flv", "application/x-mpegURL", "video/MP2T", "video/3gpp", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv"];
            //const types = ["image/png", "image/jpeg", "image/gif"];
            for (var x = 0; x < files.length; x++) {

                if (types.every(type => files[x].type !== type)) {
                    err[x] = files[x].type + " is not a supported format\n";
                    // assign message to array
                }
            }
            for (var z = 0; z < err.length; z++) {
                // loop create toast massage
                event.target.value = null;
                toast.error(err[z]);
            }
            return true;
        }
        if (this.state.isAudio) {
            const types = [
                "audio/flac",
                "audio/mpegurl",
                "audio/mpegurl",
                "audio/mp4",
                "audio/mp4",
                "audio/mpeg",
                "audio/ogg",
                "audio/ogg",
                "audio/x-scpls", "text/plain",
                "audio/wav"
            ];
            for (var x = 0; x < files.length; x++) {

                if (types.every(type => files[x].type !== type)) {
                    err[x] = files[x].type + " is not a supported format\n";
                    // assign message to array
                }
            }
            for (var z = 0; z < err.length; z++) {
                // loop create toast massage
                event.target.value = null;
                toast.error(err[z]);
            }
            return true;
        }

    };
    onChangeHandler = event => {
        //for multiple files
        var files = event.target.files;
        if (this.maxSelectFile(event) && this.checkMimeType(event)) {
            this.setState({
                selectedFile: files,
                loaded: 0
            });
        }
    };
    onClickHandler = event => {
        event.preventDefault();
        if (this.state.selectedFile) {
            if (this.state.isDocuments) {
                const data = new FormData();
                for (var x = 0; x < this.state.selectedFile.length; x++) {
                    data.append("file", this.state.selectedFile[x]);
                }
                axios.post("/api/upload/Docs/1", data, {
                    // receive two parameter endpoint url ,form data
                    onUploadProgress: ProgressEvent => {
                        this.setState({
                            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                        });
                    }
                })
                    .then(res => {
                        let path = process.env.REACT_APP_BASE_URL + "/HearingAttachments/Documents"
                        this.saveDocuments(res.data, "Documents", path);

                    })
                    .catch(err => {
                        toast.error("upload fail");
                    });
            }
            if (this.state.isVedios) {
                const data = new FormData();
                for (var x = 0; x < this.state.selectedFile.length; x++) {
                    data.append("file", this.state.selectedFile[x]);
                }
                axios.post("/api/upload/Vedios/1", data, {
                    // receive two parameter endpoint url ,form data
                    onUploadProgress: ProgressEvent => {
                        this.setState({
                            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                        });
                    }
                })
                    .then(res => {
                        let path = process.env.REACT_APP_BASE_URL + "/HearingAttachments/Vedios"
                        this.saveDocuments(res.data, "Vedio", path);

                    })
                    .catch(err => {
                        toast.error("upload fail");
                    });
            }
            if (this.state.isAudio) {
                const data = new FormData();
                for (var x = 0; x < this.state.selectedFile.length; x++) {
                    data.append("file", this.state.selectedFile[x]);
                }
                axios.post("/api/upload/Audios/1", data, {
                    // receive two parameter endpoint url ,form data
                    onUploadProgress: ProgressEvent => {
                        this.setState({
                            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                        });
                    }
                })
                    .then(res => {
                        let path = process.env.REACT_APP_BASE_URL + "/HearingAttachments/Audios"
                        this.saveDocuments(res.data, "Audio", path);

                    })
                    .catch(err => {
                        toast.error("upload fail");
                    });
            }

        } else {
            toast.warn("Please select a file to upload");
        }
    };
    saveDocuments(FileName, Category, path) {
        let datatosave = {
            ApplicationNo: this.state.ApplicationNo,
            Description: this.state.Description,
            Path: path,
            Name: FileName,
            Category: Category
        };
        fetch("/api/HearingInProgress", {
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
                        if (Category === "Documents") {
                            var rows = this.state.Documents;
                            let datapush = {
                                ApplicationNo: this.state.ApplicationNo,
                                Path: path,
                                Category: Category,
                                Name: FileName,
                                Description: this.state.Description
                            };
                            rows.push(datapush);
                            this.setState({ Documents: rows });
                        }
                        if (Category === "Audio") {
                            var rows = this.state.Audios;
                            let datapush = {
                                ApplicationNo: this.state.ApplicationNo,
                                Path: path,
                                Category: Category,
                                Name: FileName,
                                Description: this.state.Description
                            };
                            rows.push(datapush);
                            this.setState({ Audios: rows });
                        }
                        if (Category === "Vedio") {
                            var rows = this.state.Vedios;
                            let datapush = {
                                ApplicationNo: this.state.ApplicationNo,
                                Path: path,
                                Category: Category,
                                Name: FileName,
                                Description: this.state.Description
                            };
                            rows.push(datapush);
                            this.setState({ Vedios: rows });
                        }

                        this.setState({ open: false });

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
                                Details
                                 </a>
                        </span>
                    )
                };
                Rowdata1.push(Rowdata);
            });
        }



        if (this.state.summary) {
            let childdiv = {
                margin: "30px"
            };

            return (
                <div>
                    <Modal visible={this.state.openPlayer} width="1000" height="700" effect="fadeInUp" onClickAway={() => this.closePlyer()}>


                        <a style={{ float: "right", color: "red", margin: "10px" }} href="javascript:void(0);" onClick={() => this.closePlyer()}>Close</a>
                        <br />
                        <div className="container-fluid">
                            <div className="col-sm-12">
                                <div style={{ "overflow-y": "scroll", height: "680px" }}>
                                    <ReactPlayer
                                        url={this.state.MediaURL}
                                        className='react-player'
                                        playing
                                        controls="true"
                                        width="700"
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-10">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <h2>Application No: <span style={headingstyle}>{this.state.ApplicationNo}</span> Status: <span>{this.state.Status}</span> </h2>
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-2">
                            <div className="row wrapper ">

                                <button
                                    type="button"
                                    style={{ marginTop: 40 }}
                                    onClick={this.openModal}
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
                                <form style={FormStyle} onSubmit={this.SaveTenders}>
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
                        <br />
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 border border-success rounded">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <nav>
                                            <div class="nav nav-tabs " id="nav-tab" role="tablist">
                                                <a
                                                    class="nav-item nav-link active font-weight-bold"
                                                    id="nav-home-tab"
                                                    data-toggle="tab"
                                                    href="#nav-home"
                                                    role="tab"
                                                    aria-controls="nav-home"
                                                    aria-selected="true"
                                                >
                                                    Documents{" "}
                                                </a>
                                                <a
                                                    class="nav-item nav-link font-weight-bold"
                                                    id="nav-profile-tab"
                                                    data-toggle="tab"
                                                    href="#nav-profile"
                                                    role="tab"
                                                    aria-controls="nav-profile"
                                                    aria-selected="false"
                                                >
                                                    Audio
                                             </a>
                                                <a
                                                    class="nav-item nav-link font-weight-bold"
                                                    id="nav-Attachments-tab"
                                                    data-toggle="tab"
                                                    href="#nav-Attachments"
                                                    role="tab"
                                                    aria-controls="nav-Attachments"
                                                    aria-selected="false"
                                                >
                                                    Video
                                                 </a>

                                            </div>
                                        </nav>
                                        <Modal visible={this.state.open} width="600" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                            <div>
                                                <a style={{ float: "right", margin: "10px", color: "red" }} href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                                                <br />
                                                <h4 style={{ "text-align": "center", color: "#1c84c6" }}>Upload</h4>
                                                <div className="container-fluid">
                                                    <div className="col-sm-12">
                                                        <div className="ibox-content">
                                                            <form onSubmit={this.onClickHandler}>
                                                                <div className=" row">
                                                                    <div className="col-sm">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="exampleInputPassword1"
                                                                                className="font-weight-bold"
                                                                            >
                                                                                Description
                                                                                 </label>
                                                                            <input
                                                                                onChange={this.handleInputChange}
                                                                                value={this.state.Description}
                                                                                type="text"
                                                                                required
                                                                                name="Description"
                                                                                className="form-control"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" row">
                                                                    <div className="col-sm">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="exampleInputPassword1"
                                                                                className="font-weight-bold"
                                                                            >
                                                                                Browse
                                                                                 </label>
                                                                            <input
                                                                                type="file"
                                                                                className="form-control"
                                                                                name="file"
                                                                                onChange={this.onChangeHandler}
                                                                                multiple
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
                                                                                class="btn btn-success "

                                                                            >
                                                                                Upload
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
                                        <ToastContainer />
                                        <div class="tab-content " id="nav-tabContent">
                                            <div
                                                class="tab-pane fade show active"
                                                id="nav-home"
                                                role="tabpanel"
                                                aria-labelledby="nav-home-tab"
                                                style={childdiv}
                                            >
                                                <div>
                                                    <table class="table table-sm">
                                                        <thead>
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
                                                                                    </a>|
                                                                            
                                                                        </span>
                                                                    </td>
                                                                </tr>

                                                            )}
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                  

                                                    <br />
                                                </div>



                                            </div>
                                            <div
                                                class="tab-pane fade"
                                                id="nav-profile"
                                                role="tabpanel"
                                                style={childdiv}
                                                aria-labelledby="nav-profile-tab"
                                            >
                                                <div>
                                                    <table class="table table-sm">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">NO</th>
                                                                <th scope="col"> Description</th>
                                                                <th scope="col">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.Audios.map((r, i) =>

                                                                <tr>
                                                                    <td>{i + 1}</td>
                                                                    <td>
                                                                        {r.Description}

                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        <span>
                                                                            <a style={{ color: "#007bff" }}
                                                                                onClick={e => this.handleViewPlayeAudio(r, e)}
                                                                            >
                                                                                View
                                                                                    </a>|
                                                                            
                                                                        </span>
                                                                    </td>
                                                                </tr>

                                                            )}
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                 

                                                    <br />
                                                </div>
                                            </div>
                                            <div
                                                class="tab-pane fade"
                                                id="nav-Attachments"
                                                role="tabpanel"
                                                style={childdiv}
                                                aria-labelledby="nav-Attachments-tab"
                                            >
                                                <div>
                                                    <table class="table table-sm">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">NO</th>
                                                                <th scope="col">Description</th>
                                                                <th scope="col">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.Vedios.map((r, i) =>

                                                                <tr>
                                                                    <td>{i + 1}</td>
                                                                    <td>
                                                                        {r.Description}

                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        <span>
                                                                            <a style={{ color: "#007bff" }}
                                                                                onClick={e => this.HandleViewPlayer(r, e)}
                                                                            >
                                                                                View
                                                                                    </a>|
                                                                               
                                                                        </span>
                                                                    </td>
                                                                </tr>

                                                            )}
                                                        </tbody>
                                                    </table>
                                                    <br />
                                                 

                                                    <br />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Modal visible={this.state.openViewer} width="1000" height="500" effect="fadeInUp" onClickAway={() => this.closeViewerModal()}>
                            <div>

                                <a style={{ float: "right", color: "red", margin: "10px" }} href="javascript:void(0);" onClick={() => this.closeViewerModal()}>Close</a>

                                <object width="100%" height="450" data={this.state.FileURL}></object>
                            </div>
                        </Modal>



                    



                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <div className="row wrapper border-bottom white-bg page-heading">
                            <div className="col-lg-10">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <h2>Case Proceedings</h2>
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

export default CaseProceedings;

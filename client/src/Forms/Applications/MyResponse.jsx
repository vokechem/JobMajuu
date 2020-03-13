import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CKEditor from "ckeditor4-react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
var dateFormat = require("dateformat");
class MyResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ApplicationGrounds: [],
      ResponseDocuments: [],
      ResponseDetails: [],
      Response: [],
      NewDeadLine: "",
      Reason: "",
      GroundResponse: "",
      GroundNo: "",
      selectedFile: "",
      loaded: 0,
      ResponseID: "",
      grounddesc: "",
      ApplicationID: "",
      summary: "",
      DocumentDesc: "",
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
      Responsedesc: "",
      ResponseType: "",
      TenderNo: "",
      ResponseStatus: ""
    };
    this.handViewResponse = this.handViewResponse.bind(this);
    this.fetchApplicationGrounds = this.fetchApplicationGrounds.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

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
          this.setState({ ResponseDocuments: [] });
          this.setState({ ResponseDocuments: ResponseDocuments });
        }
      })
      .catch(err => {
        swal("", err.message, "error");
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
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchResponse = () => {
    fetch("/api/PEResponse/" + localStorage.getItem("UserName"), {
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
      ApplicationID: k.ApplicationID,
      ResponseDate: k.ResponseDate,
      ResponseID: k.ResponseID,
      ResponseType: k.ResponseType,
      TenderNo: k.TenderNo,
      TenderValue: k.TenderValue,
      ResponseStatus: k.Status
    };
    this.setState(data);
    this.fetchApplicationGrounds(k.ApplicationNo);
    this.setState({ ResponseDocuments: [] });
    this.setState({ ResponseDetails: [] });
    this.fetchResponseDocuments(ResponseID);
    this.fetchResponseDetails(ResponseID);
    this.fetchApplicantDetails(k.Applicantusername);
    this.setState({ summary: "summary" });
  };
  onEditorChange(evt) {
    this.setState({
      Responsedesc: evt.editor.getData()
    });
  }
  SwitchMenu = e => {
    this.setState({ summary: "" });
  };
  fetchApplicationGrounds = ApplicationID => {
    fetch("/api/grounds/GroundsOnly/" + ApplicationID, {
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
  handleEditClick = e => {
    this.setState({ summary: "Update" });
  };
  formatNumber = num => {
    let newtot = Number(num).toFixed(2);
    return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  ViewFile = (k, e) => {
    let filepath = process.env.REACT_APP_BASE_URL + "/" + k.Path + "/" + k.Name;
    window.open(filepath);
  };

  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    if (actionMeta.name === "GroundNo") {
      const filtereddata = this.state.ApplicationGrounds.filter(
        item => item.GroundNO == UserGroup.value
      );
      const filteredresponse = this.state.ResponseDetails.filter(
        item => item.GroundNO == UserGroup.value
      );

      if (filteredresponse.length > 0) {
        this.setState({ Responsedesc: filteredresponse[0].Response });
      } else {
        this.setState({ Responsedesc: " " });
      }

      if (filtereddata.length > 0) {
        this.setState({ grounddesc: filtereddata[0].Description });
      } else {
        this.setState({ grounddesc: "No description given." });
      }
    }
    this.setState({ showAction: false });
  };
  openAttachmentsTab() {
    document.getElementById("nav-profile-tab").click();
  }
  CompleteSubmision = event => {
    event.preventDefault();
    const data = {
      PEResponseID: this.state.ResponseID,
      ApplicationNo: this.state.ApplicationNo,
      UserID: localStorage.getItem("UserName")
    };

    fetch("/api/PEResponse/SubmitResponse/1", {
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
            swal("", "Your Response has been submited!", "success");
            this.setState({ summary: "" });
            // send email and sms to ppra
            //and redirect to response
          } else {
            swal("", "Your response could not be submited!", "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  UpdatePeResponseDetails = event => {
    event.preventDefault();
    const data = {
      PEResponseID: this.state.ResponseID,
      GroundNo: this.state.GroundNo,
      UserID: localStorage.getItem("UserName"),
      GroundType: "Grounds for Appeal",
      Response: this.state.Responsedesc
    };

    fetch("/api/PEResponse/Updatedetails/1", {
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
            swal("", "Your Response has been updated!", "success");
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
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
  checkFileSize = event => {
    let files = event.target.files;
    let size = 200000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  SavePEResponseDocuments(Documentname) {
    const data = {
      PERsponseID: this.state.ResponseID,
      Name: Documentname,
      Description: this.state.DocumentDesc,
      Path: "Documents"
    };
    fetch("/api/PEResponse/Documents", {
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
            this.fetchResponseDocuments(this.state.ResponseID);
            swal("", "Document uploaded!", "success");
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  }
  handleDocumentSubmit = event => {
    event.preventDefault();
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
          this.SavePEResponseDocuments(res.data);
          // this.setState({
          //     Logo: res.data
          // });
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
  handleDeleteDocument = (d, e) => {
    e.preventDefault();
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/PEResponse/DeleteDocument/" + d.Name, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                var rows = [...this.state.ResponseDocuments];
                const filtereddata = rows.filter(item => item.Name !== d.Name);
                this.setState({ ResponseDocuments: filtereddata });
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
            "isoDate"
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
    let photostyle1 = {
      height: 150,
      width: 200
    };

    let formcontainerStyle = {
      border: "1px solid grey",
      "border-radius": "10px",
      background: "white"
    };
    let FormStyle = {
      margin: "20px"
    };
    let childdiv = {
      margin: "30px"
    };
    let Grounds = [...this.state.ApplicationGrounds].map((k, i) => {
      return {
        value: k.GroundNO,
        label: k.GroundNO
      };
    });

    if (this.state.summary === "summary") {
      return (
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>
                    Response for Application:{" "}
                    <span className="font-weight-bold text-success">
                      {" "}
                      {this.state.ApplicationNo}
                    </span>
                    &nbsp; &nbsp; Response Type:
                    <span className="font-weight-bold text-success">
                      {" "}
                      {this.state.ResponseType}
                    </span>
                  </h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-2">
              <button
                type="button"
                style={{ marginTop: 40 }}
                onClick={this.SwitchMenu}
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
                          "isoDate"
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
                <h3 style={headingstyle}> Response to Applicant Grounds</h3>
                <h3>BackgroundInformation</h3>
                <p>{this.state.BackgrounInformation}</p>
                <div className="col-lg-12 border border-success rounded">
                  {this.state.ResponseDetails.map(function(k, i) {
                    if (k.GroundType === "Grounds") {
                      return (
                        <div>
                          <h3 style={headingstyle}>GroundNo: {k.GroundNO}</h3>

                          <h3>Response</h3>
                          {ReactHtmlParser(k.Response)}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10">
                <h3 style={headingstyle}> Response to Applicant Requests</h3>
                <div className="col-lg-12 border border-success rounded">
                  {this.state.ResponseDetails.map(function(k, i) {
                    if (k.GroundType === "Prayers") {
                      return (
                        <div>
                          <h3 style={headingstyle}>GroundNo: {k.GroundNO}</h3>
                          <h3>BackgroundInformation</h3>
                          <p>{k.BackgrounInformation}</p>

                          <h3>Response</h3>
                          {ReactHtmlParser(k.Response)}
                        </div>
                      );
                    }
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
                    <th>#</th>
                    <th>Document Description</th>
                    <th>FileName</th>

                    {this.state.ResponseDocuments.map(function(k, i) {
                      return (
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

            <br />
            {this.state.ResponseStatus === "Submited" ? null : (
              <div className="row">
                <div className="col-sm-8"></div>
                <div className="col-sm-1">
                  <Link
                    to={{
                      pathname: "/PEResponse",
                      ApplicationNo: this.state.ApplicationNo,
                      ApplicationID: this.state.ApplicationID
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: 30 }}
                    >
                      Edit Response
                    </button>
                  </Link>

                  {/* <button
                    className="btn btn-primary"
                    onClick={this.handleEditClick}
                  >
                    Edit
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else if (this.state.summary === "Update") {
      let handleDeleteDocument = this.handleDeleteDocument;
      return (
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>
                    Response for Application:{" "}
                    <span className="font-weight-bold text-success">
                      {" "}
                      {this.state.ApplicationNo}
                    </span>
                    &nbsp; &nbsp; Response Type:
                    <span className="font-weight-bold text-success">
                      {" "}
                      {this.state.ResponseType}
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
                  onClick={this.SwitchMenu}
                  className="btn btn-primary float-left"
                >
                  &nbsp; Back
                </button>
              </div>
            </div>
          </div>
          <p></p>
          <div className="row">
            {/* <div className="col-lg-1"></div> */}
            <div className="col-lg-12 ">
              <div className="col-lg-12 ">
                <div style={formcontainerStyle}>
                  <br />

                  {this.state.ResponseType === "No Objection" ? (
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
                            Response{" "}
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
                            Attachements
                          </a>
                        </div>
                      </nav>

                      <div class="tab-content " id="nav-tabContent">
                        <div
                          class="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                          style={childdiv}
                        >
                          {/* <form style={FormStyle} onSubmit={this.SaveTenders}> */}
                          <div style={formcontainerStyle}>
                            <form
                              style={FormStyle}
                              onSubmit={this.UpdatePeResponseDetails}
                            >
                              <div class="row">
                                <div class="col-sm-3">
                                  <label
                                    style={headingstyle}
                                    for="Location"
                                    className="font-weight-bold"
                                  >
                                    Select Ground
                                  </label>

                                  <Select
                                    name="GroundNo"
                                    // value={Counties.filter(
                                    //     option =>
                                    //         option.label === this.state.County
                                    // )}
                                    onChange={this.handleSelectChange}
                                    options={Grounds}
                                    required
                                  />
                                </div>
                              </div>
                              <br />
                              <div class="row">
                                <div class="col-sm-12">
                                  <h3 style={headingstyle}>
                                    Ground Description
                                  </h3>
                                  <br />
                                  {ReactHtmlParser(this.state.grounddesc)}
                                </div>
                              </div>
                              <br />
                              <div class="row">
                                <div class="col-sm-12">
                                  <h3 style={headingstyle}>Your Response</h3>
                                  <br />
                                  <CKEditor
                                    onChange={this.onEditorChange}
                                    data={this.state.Responsedesc}
                                  />
                                </div>
                              </div>
                              <br />
                              <div className=" row">
                                <div className="col-sm-2" />
                                <div className="col-sm-8" />
                                <div className="col-sm-1">
                                  <button
                                    type="submit"
                                    className="btn btn-primary float-right"
                                  >
                                    Update
                                  </button>
                                </div>
                                <div className="col-sm-1">
                                  <button
                                    type="button"
                                    onClick={this.openAttachmentsTab}
                                    className="btn btn-primary float-left"
                                  >
                                    {" "}
                                    Next
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div
                          class="tab-pane fade"
                          id="nav-profile"
                          role="tabpanel"
                          style={childdiv}
                          aria-labelledby="nav-profile-tab"
                        >
                          <div style={formcontainerStyle}>
                            <ToastContainer />
                            <form
                              style={FormStyle}
                              onSubmit={this.handleDocumentSubmit}
                            >
                              <div class="row">
                                <div class="col-sm-6">
                                  <label
                                    for="Document"
                                    className="font-weight-bold"
                                  >
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
                                    type="submit"
                                    class="btn btn-success "
                                    // onClick={this.onClickHandler}
                                  >
                                    Upload
                                  </button>{" "}
                                </div>
                                <div class="col-sm-6">
                                  <label
                                    for="Document"
                                    className="font-weight-bold"
                                  >
                                    Description
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="DocumentDesc"
                                    onChange={this.handleInputChange}
                                    value={this.state.DocumentDesc}
                                    required
                                  />
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <table className="table table-sm">
                                  <th>#</th>
                                  <th>Document Description</th>
                                  <th>FileName</th>
                                  <th>Actions</th>
                                  {this.state.ResponseDocuments.map(function(
                                    k,
                                    i
                                  ) {
                                    return (
                                      <tr>
                                        <td>{i + 1}</td>
                                        <td>{k.Description}</td>
                                        <td>{k.Name}</td>
                                        <td>
                                          {" "}
                                          <span>
                                            <a
                                              style={{ color: "#f44542" }}
                                              onClick={e =>
                                                handleDeleteDocument(k, e)
                                              }
                                            >
                                              &nbsp; Remove
                                            </a>
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </table>
                              </div>
                              <br />
                              <div className=" row">
                                <div className="col-sm-10" />

                                <div className="col-sm-2">
                                  <button
                                    type="button"
                                    onClick={this.CompleteSubmision}
                                    className="btn btn-primary float-left"
                                  >
                                    {" "}
                                    SUBMIT NOW
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {this.state.ResponseType === "Preliminary Objection" ? (
                    <div class="col-sm-12">
                      <h3 style={headingstyle}>Fees Description</h3>

                      <div className="col-lg-10 border border-success rounded">
                        <div className="row"></div>
                        <br />
                        <div className="row">
                          <table class="table table-sm">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fees description</th>
                                <th scope="col">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Fees Description</td>
                                <td className="font-weight-bold">
                                  {this.formatNumber(5000)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <br />
                      <h3 style={headingstyle}>payment options</h3>
                      <div className="col-lg-10 border border-success rounded">
                        <div className="row"></div>
                        <br />
                        <div className="row">
                          <div className="col-lg-1"></div>
                          <h3 style={headingstyle}>
                            REFFERENCE NUMBER: &nbsp;
                            <span className="font-weight-bold text-danger">
                              {this.state.ApplicationNo}
                            </span>{" "}
                            <span className="font-weight-bold text-warning">
                              &nbsp;&nbsp;&nbsp; Quote this Reference Number
                              when making payment.
                            </span>
                          </h3>
                        </div>
                        <br />

                        <div className="row">
                          <div className="col-lg-1"></div>
                          <h3 style={headingstyle}>
                            {" "}
                            &nbsp; &nbsp; &nbsp;Select Payment Mode{" "}
                          </h3>
                        </div>
                        <div className="row">
                          <div className="col-lg-1"></div>
                          <div className="col-lg-2">
                            <img
                              style={photostyle1}
                              src={
                                process.env.REACT_APP_BASE_URL +
                                "/images/bank.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="col-lg-2">
                            <img
                              style={photostyle1}
                              src={
                                process.env.REACT_APP_BASE_URL +
                                "/images/mpesa.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="col-lg-2">
                            <img
                              style={photostyle1}
                              src={
                                process.env.REACT_APP_BASE_URL +
                                "/images/card.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="col-lg-4"></div>
                        </div>
                        <br />
                      </div>
                    </div>
                  ) : null}
                  <br />
                </div>
              </div>
            </div>
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
                    <h2>My Response</h2>
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
          <div id="divIdToPrint">
            <TableWrapper>
              <Table Rows={Rowdata1} columns={ColumnData} />
            </TableWrapper>
          </div>
        </div>
      );
    }
  }
}

export default MyResponse;

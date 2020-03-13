import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import Table from "../../Table";
import TableWrapper from "../../TableWrapper";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";
import { ToastContainer, toast } from "react-toastify";
import { Progress } from "reactstrap";
import axios from "axios";
var dateFormat = require("dateformat");
var jsPDF = require("jspdf");
require("jspdf-autotable");
var _ = require("lodash");
class JudicialReview extends Component {
  constructor() {
    super();
    this.state = {
      casedetails: [],
      privilages: [],
      selectedFile: null,
      loaded: 0,
      ApplicantDetails: [],
      ApplicationNo: "",
      PEDetails: [],
      summary: false,
      Unbooking: false,
      JudicialDocuments: [],
      JudicialDetails: [],
      JRinterestedparties: [],
      JRUsers: [],
      AddJudicialReview: false,

      jDateofCourtRulling: "",
      jCaseNO: "",
      jDateofReplyingAffidavit: "",
      Ruling: "",
      Status: ""
    };
  }
  closeJudicialReview = () => {
    this.setState({ AddJudicialReview: false });
  };
  handleSelectChange = (County, actionMeta) => {
    this.setState({ [actionMeta.name]: County.value });
  };

  openJudicialReview = () => {
    this.setState({ AddJudicialReview: true });
  };
  SaveJudicailReviewDocs(Documentname) {
    const data = {
      ApplicationNo: this.state.ApplicationNo,
      Name: Documentname,
      Description: this.state.DocumentDesc,
      Path: process.env.REACT_APP_BASE_URL + "/Documents"
    };
    fetch("/api/JudicialReview/Documents", {
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
            this.fetchJudicialDocuments(this.state.ApplicationNo);
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
  fetchJudicialDocuments = ApplicationNo => {
    this.setState({ JudicialDocuments: [] });

    fetch("/api/JudicialReview/" + ApplicationNo, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(JudicialDocuments => {
        if (JudicialDocuments.length > 0) {
          this.setState({ JudicialDocuments: JudicialDocuments });

          this.setState({ JudicialDocuments: JudicialDocuments });
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchJudicialDetails = ApplicationNo => {
    this.setState({ JudicialDetails: [] });

    fetch("/api/JudicialReview/" + ApplicationNo + "/Details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(JudicialDetails => {
        if (JudicialDetails.length > 0) {
          this.setState({ JudicialDetails: JudicialDetails });
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchPEDetails = ApplicationNo => {
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
  fetchApplicantDetails = ApplicationNo => {
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

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  fetchcasedetails = () => {
    this.setState({ casedetails: [] });
    fetch("/api/JudicialReview", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(casedetails => {
        if (casedetails.length > 0) {
          this.setState({ casedetails: casedetails });
        } else {
          toast.error(casedetails.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchJRUsers = ApplicationID => {
    this.setState({
      JRUsers: []
    });
    fetch("/api/JudicialReview/JrUsers/" + ApplicationID + "/Applicant", {
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
            JRUsers: AdditionalSubmisions
          });
        } else {
          toast.error(AdditionalSubmisions.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
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
              this.fetchcasedetails();
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
  };
  ViewFile = (k, e) => {
    let filepath = k.Path + "/" + k.FileName;
    window.open(filepath);
    //this.setState({ openFileViewer: true });
  };
  fetchJRinterestedparties = ApplicationID => {
    this.setState({ JRinterestedparties: [] });
    fetch("/api/interestedparties/" + ApplicationID + "/JR", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(interestedparties => {
        if (interestedparties.length > 0) {
          this.setState({ JRinterestedparties: interestedparties });
        } else {
          toast.error(interestedparties.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  ScheduleCase = k => {
    const data = {
      ApplicationNo: k.ApplicationNo,
      summary: true,
      PEName: k.PEName,
      FilingDate: k.FilingDate,
      PEServedOn: k.PEServedOn
    };
    this.setState(data);
    this.fetchJRUsers(k.ApplicationNo);
    this.fetchJRinterestedparties(k.ApplicationNo);
    this.fetchApplicantDetails(k.ApplicationNo);
    this.fetchJudicialDocuments(k.ApplicationNo);
    this.fetchJudicialDetails(k.ApplicationNo);
    this.fetchPEDetails(k.ApplicationNo);
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
          this.SaveJudicailReviewDocs(res.data);
        })
        .catch(err => {
          toast.error("upload fail");
        });
    } else {
      toast.warn("Please select a file to upload");
    }
  };
  handleJudicialReviewSubmit = event => {
    event.preventDefault();

    let datatosave = {
      ApplicationNo: this.state.ApplicationNo,
      DateofCourtRulling: this.state.jDateofCourtRulling,
      CaseNO: this.state.jCaseNO,

      Status: this.state.Status
    };
    fetch("/api/JudicialReview", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(datatosave)
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            swal("", "Added successfully", "success");
            this.setState({ AddJudicialReview: false });
            this.fetchJudicialDetails(this.state.ApplicationNo);
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        toast.error("Could not be added please try again");
      });
  };
  handleDeleteDocument = d => {
    swal({
      text: "Are you sure that you want to remove this document?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/JudicialReview/" + d.Name, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                this.fetchJudicialDocuments(this.state.ApplicationNo);
                toast.success("Deleted");
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
    let handleDeleteDocument = this.handleDeleteDocument;
    let FormStyle = {
      margin: "30px"
    };
    let childdiv = {
      margin: "30px"
    };
    let headingstyle = {
      color: "#7094db"
    };

    const ColumnData = [
      {
        label: "Application No",
        field: "Name",
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
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];

    const rows = [...this.state.casedetails];
    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
          Name: k.ApplicationNo,
          ProcuringEntity: k.PEName,

          action: (
            <span>
              <a
                style={{ color: "#007bff" }}
                onClick={e => this.ScheduleCase(k, e)}
              >
                View
              </a>
            </span>
          )
        };
        Rowdata1.push(Rowdata);
      });
    }

    let DivvenuesStyle = {
      width: "90%",
      margin: "0 auto"
    };

    let ViewFile = this.ViewFile;
    const Courts = [...this.state.JudicialDetails].map((k, i) => {
      return {
        value: k.CaseNO,
        label: k.CaseNO + "-" + k.Court
      };
    });
    let StatusOptions = [
      {
        value: "Successful",
        label: "Successful"
      },
      {
        value: "Not Successful",
        label: "Not Successful"
      }
    ];
    if (this.state.summary) {
      return (
        <div>
          <ToastContainer />
          <Modal
            visible={this.state.AddJudicialReview}
            width="70%"
            height="450px"
            effect="fadeInUp"
          >
            <div style={{ "overflow-y": "scroll", height: "440px" }}>
              <a
                style={{
                  float: "right",
                  color: "red",
                  margin: "10px"
                }}
                href="javascript:void(0);"
                onClick={() => this.closeJudicialReview()}
              >
                <i class="fa fa-close"></i>
              </a>
              <div>
                <h4
                  style={{
                    "text-align": "center",
                    color: "#1c84c6"
                  }}
                >
                  Judicial Review
                </h4>
                <div className="container-fluid">
                  <div>
                    <div>
                      <div className="col-sm-12">
                        <div className="ibox-content">
                          <div class="row">
                            <div class="col-sm-12">
                              <nav>
                                <div
                                  class="nav nav-tabs "
                                  id="nav-tab"
                                  role="tablist"
                                >
                                  <a
                                    class="nav-item nav-link active font-weight-bold"
                                    id="nav-home-tab"
                                    data-toggle="tab"
                                    href="#nav-home"
                                    role="tab"
                                    aria-controls="nav-home"
                                    aria-selected="true"
                                  >
                                    Final Judgement{" "}
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
                                    Judicial Attachments
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
                                  <form
                                    onSubmit={this.handleJudicialReviewSubmit}
                                  >
                                    <div className=" row">
                                      <div className="col-md-6">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <label
                                              htmlFor="exampleInputPassword1"
                                              className="font-weight-bold"
                                            >
                                              JR-NO
                                            </label>
                                          </div>
                                          <div className="col-md-8">
                                            <Select
                                              name="jCaseNO"
                                              onChange={this.handleSelectChange}
                                              options={Courts}
                                              required
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <label
                                              htmlFor="exampleInputPassword1"
                                              className="font-weight-bold"
                                            >
                                              Status
                                            </label>
                                          </div>
                                          <div className="col-md-8">
                                            <Select
                                              name="Status"
                                              onChange={this.handleSelectChange}
                                              options={StatusOptions}
                                              required
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className=" row">
                                      {/* <div className="col-md-6">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <label
                                              htmlFor="exampleInputPassword1"
                                              className="font-weight-bold"
                                            >
                                              Date of Replying Affidavit
                                            </label>
                                          </div>
                                          <div className="col-md-8">
                                            <input
                                              onChange={this.handleInputChange}
                                              value={
                                                this.state
                                                  .jDateofReplyingAffidavit
                                              }
                                              type="date"
                                              required
                                              name="jDateofReplyingAffidavit"
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                      </div> */}
                                      <div className="col-md-6">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <label
                                              htmlFor="exampleInputPassword1"
                                              className="font-weight-bold"
                                            >
                                              Date of Court Rulling
                                            </label>
                                          </div>
                                          <div className="col-md-8">
                                            <input
                                              onChange={this.handleInputChange}
                                              value={
                                                this.state.jDateofCourtRulling
                                              }
                                              type="date"
                                              required
                                              name="jDateofCourtRulling"
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className=" row">
                                      <div className="col-md-6">
                                        {/* <div className="row">
                                          <div className="col-md-4">
                                            <label
                                              htmlFor="exampleInputPassword1"
                                              className="font-weight-bold"
                                            >
                                              Ruling
                                            </label>
                                          </div>
                                          <div className="col-md-8">
                                            <textarea
                                              onChange={this.handleInputChange}
                                              value={this.state.Ruling}
                                              type="text"
                                              required
                                              name="Ruling"
                                              className="form-control"
                                            />
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>

                                    <br />
                                    <div className="col-sm-12 ">
                                      <div className=" row">
                                        <div className="col-sm-9" />
                                        <div className="col-sm-3">
                                          <button
                                            type="submit"
                                            className="btn btn-primary"
                                          >
                                            Save
                                          </button>
                                          &nbsp; &nbsp;
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={this.closeJudicialReview}
                                          >
                                            Close
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div
                                  class="tab-pane fade"
                                  id="nav-profile"
                                  role="tabpanel"
                                  style={childdiv}
                                  aria-labelledby="nav-profile-tab"
                                >
                                  <div class="row">
                                    <div class="col-sm-6">
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
                                        class="btn btn-success float-right"
                                        onClick={this.handleDocumentSubmit}
                                      >
                                        Upload
                                      </button>{" "}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <table className="table table-sm">
                                      <th>#</th>
                                      <th>Action Description</th>
                                      <th>Document Description</th>
                                      <th>Document Date</th>
                                      <th>Date Submited</th>
                                      <th>Actions</th>

                                      {this.state.JudicialDocuments.map(
                                        function(k, i) {
                                          return (
                                            <tr>
                                              <td>{i + 1}</td>
                                              <td>{k.ActionDescription}</td>
                                              <td>{k.Description}</td>
                                              <td>{k.DocumentDate}</td>

                                              <td>{k.Created_At}</td>
                                              <td>
                                                <span>
                                                  <a
                                                    style={{ color: "#007bff" }}
                                                    onClick={e =>
                                                      ViewFile(k, e)
                                                    }
                                                  >
                                                    &nbsp; View
                                                  </a>
                                                  |
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
                                        }
                                      )}
                                    </table>
                                  </div>
                                  <div className=" row">
                                    <div className="col-sm-9" />
                                    <div className="col-sm-3">
                                      &nbsp; &nbsp;
                                      <button
                                        type="button"
                                        className="btn btn-danger float-right"
                                        onClick={this.closeJudicialReview}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ToastContainer />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>
                    Judicial Review For Application:{" "}
                    <span style={headingstyle}>{this.state.ApplicationNo}</span>{" "}
                  </h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-3">
              <div className="row wrapper ">
                <button
                  className="btn btn-primary  "
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.openJudicialReview}
                >
                  Add Judicial Updates
                </button>
                &nbsp;
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.switchMenu}
                  className="btn btn-warning  "
                >
                  Back
                </button>
              </div>
            </div>
          </div>
          <div className="wrapper wrapper-content animated fadeInRight">
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-10  rounded bg-white">
                <br />
                <div class="row">
                  <div class="col-sm-6" style={{ "margin-left": "30" }}>
                    <h3 style={headingstyle}>Judicial Review</h3>
                  </div>
                </div>

                {this.state.JudicialDetails.map((k, i) => {
                  return (
                    <form style={FormStyle}>
                      <div class="row">
                        <div class="col-sm-2">
                          <label
                            for="ApplicantID"
                            className="font-weight-bold "
                          >
                            JR-NO{" "}
                          </label>
                        </div>

                        <div class="col-sm-4">
                          <div className="form-group">
                            <input
                              type="text"
                              name="ApplicationNo"
                              disabled
                              value={k.CaseNO}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="col-sm-12 ">
                            <div className="row border border-success rounded ">
                              <table
                                style={{ margin: "10px" }}
                                className="table table-borderless table-sm"
                              >
                                <div>
                                  <tr>
                                    <td className="font-weight-bold">Court:</td>
                                    <td>{k.Court}</td>
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">Town:</td>
                                    <td>{k.Town}</td>
                                  </tr>

                                  <tr>
                                    <td className="font-weight-bold">
                                      Description:
                                    </td>
                                    <td>{k.Description}</td>
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">
                                      Date Filed:
                                    </td>
                                    {k.DateFilled ? (
                                      <td>
                                        {dateFormat(k.DateFilled, "mediumDate")}
                                      </td>
                                    ) : null}
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">
                                      Applicant:
                                    </td>
                                    <td>{k.Applicant}</td>
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">
                                      Date Recieved:
                                    </td>
                                    {k.DateRecieved ? (
                                      <td>
                                        {dateFormat(
                                          k.DateRecieved,
                                          "mediumDate"
                                        )}
                                      </td>
                                    ) : null}
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">
                                      Date of Court Rulling:
                                    </td>
                                    {k.DateofCourtRulling ? (
                                      <td>
                                        {dateFormat(
                                          k.DateofCourtRulling,
                                          "mediumDate"
                                        )}
                                      </td>
                                    ) : null}
                                  </tr>

                                  <tr>
                                    <td className="font-weight-bold">
                                      Status:
                                    </td>
                                    <td>{k.Status}</td>
                                  </tr>
                                </div>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  );
                })}
                <form style={FormStyle}>
                  <h3 style={headingstyle}>Interested Parties</h3>
                  <div className="row border border-success rounded">
                    <table
                      style={{ margin: "10px" }}
                      className="table table-sm"
                    >
                      <thead className="thead-light">
                        <th>Org Name</th>
                        <th>ContactName</th>
                        <th>Designation</th>
                        <th>Email</th>
                        <th>TelePhone</th>
                        <th>Mobile</th>
                        <th>PhysicalAddress</th>
                        {/* <th>Actions</th> */}
                      </thead>
                      {this.state.JRinterestedparties.map((r, i) => (
                        <tr>
                          <td>{r.Name}</td>
                          <td> {r.ContactName} </td>
                          <td> {r.Designation} </td>
                          <td> {r.Email} </td>
                          <td> {r.TelePhone} </td>
                          <td> {r.Mobile} </td>
                          <td> {r.PhysicalAddress} </td>
                          {/* <td>
                                  <span>
                                    <a
                                      style={{ color: "#f44542" }}
                                      onClick={e =>
                                        handleDeleteJRInterestedparty(r, e)
                                      }
                                    >
                                      &nbsp; Remove
                                    </a>
                                  </span>
                                </td> */}
                        </tr>
                      ))}
                    </table>
                  </div>
                </form>
                <form style={FormStyle}>
                  <h3 style={headingstyle}>Documents</h3>
                  <div className="row border border-success rounded">
                    <table
                      style={{ margin: "10px" }}
                      className="table table-sm"
                    >
                      <th>#</th>
                      <th>Action Description</th>
                      <th>Document Description</th>
                      <th>Document Date</th>
                      <th>Date Submited</th>
                      <th>Actions</th>

                      {this.state.JudicialDocuments.map(function(k, i) {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{k.ActionDescription}</td>
                            <td>{k.Description}</td>
                            <td>{k.DocumentDate}</td>

                            <td>{k.Created_At}</td>
                            <td>
                              <span>
                                <a
                                  style={{ color: "#007bff" }}
                                  onClick={e => ViewFile(k, e)}
                                >
                                  &nbsp; View
                                </a>
                                {/* |
                                <a
                                  style={{ color: "#f44542" }}
                                  onClick={e => handleDeleteDocument(k, e)}
                                >
                                  &nbsp; Remove
                                </a> */}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </form>
                <form style={FormStyle}>
                  <h3 style={headingstyle}>Staff Handling</h3>
                  <div className="row border border-success rounded">
                    <table
                      style={{ margin: "10px" }}
                      className="table table-sm"
                    >
                      <thead className="thead-light">
                        <th>UserName</th>
                        <th>Name</th>
                        <th>Role</th>
                        {/* <th>Actions</th> */}
                      </thead>
                      {this.state.JRUsers.map((r, i) => (
                        <tr>
                          <td>{r.UserName}</td>
                          <td> {r.Name} </td>
                          <td> {r.Role} </td>
                          {/* <td>
                            <span>
                              <a
                                style={{ color: "#f44542" }}
                                onClick={e =>
                                  handleDeleteJrUsers(r, e)
                                }
                              >
                                &nbsp; Remove
                                          </a>
                            </span>
                          </td> */}
                        </tr>
                      ))}
                    </table>
                  </div>
                </form>
                <br />
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
                    <h2>Judicial Review</h2>
                  </li>
                </ol>
              </div>
              <div className="col-lg-2">
                <div className="row wrapper ">
                  <Link to="/">
                    <button
                      type="button"
                      style={{ marginTop: 40 }}
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
      );
    }
  }
}

export default JudicialReview;

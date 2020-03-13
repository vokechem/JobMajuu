import React, { Component } from "react";
import swal from "sweetalert";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import Modal from "react-awesome-modal";
class DecisionsUploads extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      ApplicationNo: "",
      selectedFile: null,
      openViewer: false,
      FileURL: "",
      loaded: 0,
      Documents: []
    };
  }
  fetchDocuments = ApplicationNo => {
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
          toast.error(PEDetails.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
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
    const types = ["application/pdf"];
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
  saveDocuments(FileName, path) {
    let datatosave = {
      ApplicationNo: this.state.ApplicationNo,
      Description: "Decision document",
      path: path,
      Name: FileName,
      Confidential: false
    };
    fetch("/api/decisiondocuments", {
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
            var rows = this.state.Documents;
            let datapush = {
              ApplicationNo: this.state.ApplicationNo,
              Path: path,
              Name: FileName,
              Status: "Draft",
              Description: "Decision Document"
            };
            rows.push(datapush);
            this.setState({ Documents: rows, open: false });
          } else {
            toast.error("Could not be saved please try again!");
            // swal("Saved!", "Could not be saved please try again", "error");
          }
        })
      )
      .catch(err => {
        toast.error(err.messag);
      });
  }
  UploadBankSlip = event => {
    event.preventDefault();
    if (this.state.selectedFile) {
      const data = new FormData();

      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }
      axios
        .post("/api/upload/decision", data, {
          // receive two parameter endpoint url ,form data
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        })
        .then(res => {
          let path = process.env.REACT_APP_BASE_URL + "/Decisions";
          this.saveDocuments(res.data, path);
        })
        .catch(err => {
          toast.error("upload fail");
        });
    } else {
      toast.warn("Please select a file to upload");
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

  fetchApplications = () => {
    fetch("/api/Decision/1/1/1", {
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
          toast.error(Applications.message);
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
              this.fetchApplications();
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

  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    this.fetchDocuments(UserGroup.value);
  };
  handleDeleteDocument = d => {
    swal({
      text: "Are you sure that you want to remove this attachment?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/decisiondocuments/" + d.Name, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                toast.success("Removed");
                var rows = [...this.state.Documents];
                const filtereddata = rows.filter(item => item.Name !== d.Name);
                this.setState({ Documents: filtereddata });
              } else {
                toast.error("Remove Failed");
              }
            })
          )
          .catch(err => {
            toast.error("Remove Failed");
          });
      }
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
  SendMail = (Name, email, ID, subject, ApplicationNo) => {
    const emaildata = {
      to: email,
      subject: subject,
      ID: ID,
      Name: Name,
      ApplicationNo: ApplicationNo
    };

    fetch("/api/NotifyApprover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(emaildata)
    })
      .then(response => response.json().then(data => {}))
      .catch(err => {
        //swal("Oops!", err.message, "error");
      });
  };
  sendBulkNtification = (AproverEmail, AproverMobile, Name, ApplicationNo) => {
    this.SendSMS(
      AproverMobile,
      "New Decision Report for ApplicationNo:" +
        ApplicationNo +
        " has been submited and it's awaiting your review."
    );
    this.SendMail(
      Name,
      AproverEmail,
      "DECISION REPORT",
      "DECISION REPORT APPROVAL",
      ApplicationNo
    );
  };
  subMitDecision = () => {
    fetch(
      "/api/decisiondocuments/" + this.state.ApplicationNo + "/SubmitDecision",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            if (data.results.length > 0) {
              data.results.map((item, key) =>
                this.sendBulkNtification(
                  item.Email,
                  item.Phone,
                  item.Name,
                  item.ApplicationNo
                )
              );
            }
          } else {
            toast.error("Could not be submited please try again");
          }
          toast.success("Submited successfuly");

          this.setState({ summary: false });
        })
      )
      .catch(err => {
        toast.error("Could not be added please try again");
      });
  };
  closeViewerModal = () => {
    this.setState({ openViewer: false });
  };
  HandlePrevieView = d => {
    let filepath = d.Path + "/" + d.Name;
    this.setState({ openViewer: true, FileURL: filepath });
  };
  render() {
    const Applications = [...this.state.Applications].map((k, i) => {
      return {
        value: k.ApplicationNo,
        label: k.ApplicationNo
      };
    });
    let FormStyle = {
      margin: "20px"
    };

    return (
      <div>
        <div>
          <ToastContainer />
          <Modal
            visible={this.state.openViewer}
            width="80%"
            height="600"
            effect="fadeInUp"
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
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Decision Upload</h2>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div>
          <br />
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10 border border-success rounded bg-white">
              <div style={FormStyle}>
                <div class="row">
                  <div class="col-sm-2">
                    <label for="ApplicantID" className="font-weight-bold ">
                      Application No
                    </label>
                  </div>
                  <div class="col-sm-3">
                    <div className="form-group">
                      <Select
                        name="ApplicationNo"
                        defaultInputValue={this.state.ApplicationNo}
                        onChange={this.handleSelectChange}
                        options={Applications}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-md-4">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="font-weight-bold"
                        >
                          Decision Document
                        </label>
                      </div>
                      <div className="col-md-8">
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
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-1">
                    <button
                      type="submit"
                      class="btn btn-success "
                      onClick={this.UploadBankSlip}
                    >
                      Upload
                    </button>
                  </div>
                </div>

                <hr />
                <table class="table table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">NO</th>
                      <th scope="col">Document Description</th>
                      <th scope="col">Document Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Documents.map((r, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{r.Description}</td>
                        <td>{r.Status}</td>
                        <td>
                          {" "}
                          <span>
                            <a
                              style={{ color: "#007bff" }}
                              onClick={e => this.HandlePrevieView(r, e)}
                            >
                              View
                            </a>{" "}
                            |
                            {r.Status === "Approved" ? null : (
                              <a
                                style={{ color: "#f44542" }}
                                onClick={e => this.handleDeleteDocument(r, e)}
                              >
                                &nbsp; Remove
                              </a>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br />
                <div className="row">
                  <div className="col-sm-9"></div>
                  <div className="col-sm-3">
                    <button
                      className="btn btn-primary "
                      onClick={this.subMitDecision}
                    >
                      Submit For Approval
                    </button>
                    &nbsp;
                    <Link to="/">
                      <button
                        type="button"
                        className="btn btn-warning float-right "
                      >
                        Close
                      </button>
                    </Link>
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DecisionsUploads;

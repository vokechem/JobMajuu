import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-awesome-modal";
import CKEditor from "ckeditor4-react";
import axios from "axios";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
var dateFormat = require("dateformat");
var _ = require("lodash");
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
class CaseAnalysis extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      interestedparties: [],
      AdditionalSubmisions: [],
      AdditionalSubmisionsDocuments: [],
      PE: [],
      ApplicationsProgress: [],
      stdtenderdocs: [],
      Board: data.Board,
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
      AdendumDescription: "",
      EntryType: "",
      RequestDescription: "",
      GroundDescription: "",
      profile: true,
      summary: false,
      ApplicationClosingDate: "",
      Documenttype: "",
      DocumenttypeID: "",

      DocumentDescription: "",
      AddedAdendums: [],
      AdendumStartDate: "",
      RequestsAvailable: false,
      GroundsAvailable: false,
      AdendumsAvailable: false,
      AdendumClosingDate: "",
      AddAdedendums: false,
      ApplicantDetails: [],
      Applicantname: "",
      ApplicationGrounds: [],
      ApplicationDocuments: [],
      Applicationfees: [],
      FilingDate: "",
      PEName: "",
      ApplicationNo: "",
      openView: false,
      GroundNO: "",
      AwardDate: "",
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
      ResponseDocuments: [],
      ResponseDetails: [],
      GroundsDetails: [],
      PrayersDetails: [],
      openPartiesSubmissionsModal: false,
      CaseTitle: "",
      Description: "",
      CaseAnalysis: [],
      isUpdate: false,
      openUploadModal: false,
      DocDescription: "",
      selectedFile: "",
      loaded: 0,
      CaseAnalysisDocuments: [],
      openViewer: false,
      FileURL: ""
    };
    this.fetchApplicantDetails = this.fetchApplicantDetails.bind(this);

    this.fetchAdditionalSubmisions = this.fetchAdditionalSubmisions.bind(this);
  }
  checkDocumentRoles = () => {
    if (this.state.Board) {
      return true;
    }

    return false;
  };
  handleDeleteDocument = d => {
    swal({
      text: "Are you sure that you want to remove this document?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/PEResponse/DeleteDocument/" + d.Name, {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                this.fetchResponseDocuments();
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
  fetchCaseAnalysisDocuments = Applicationno => {
    this.setState({ CaseAnalysisDocuments: [] });
    fetch("/api/Caseanalysis/" + Applicationno + "/Documents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(BankSlips => {
        if (BankSlips.length > 0) {
          this.setState({
            CaseAnalysisDocuments: BankSlips,
            openUploadModal: false
          });
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  SaveBankSlip(Filename) {
    let data = {
      ApplicationNo: this.state.ApplicationNo,
      DocName: Filename,
      Description: this.state.DocDescription,
      FilePath: process.env.REACT_APP_BASE_URL + "/CaseAnalysis"
    };
    fetch("/api/Caseanalysis/Documents", {
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
            toast.success("upload complete");
            this.fetchCaseAnalysisDocuments(this.state.ApplicationNo);
          } else {
            toast.error("Error occured while saving uploaded document");
          }
        })
      )
      .catch(err => {
        toast.error("Error occured while saving uploaded document");
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
        .post("/api/upload/CaseAnalysis", data, {
          // receive two parameter endpoint url ,form data
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        })
        .then(res => {
          this.SaveBankSlip(res.data);
        })
        .catch(err => {
          toast.error("upload fail");
        });
    } else {
      toast.warn("Please select a file to upload");
    }
  };
  openPartiesSubmissionsModal = () => {
    this.setState({
      Description: "",
      CaseTitle: "",
      openPartiesSubmissionsModal: true,
      isUpdate: false
    });
  };
  openopenUploadModal = () => {
    this.setState({ openUploadModal: true });
  };
  CloseopenUploadModal = () => {
    this.setState({ openUploadModal: false });
  };
  ClosePartiesSubmissionsModal = () => {
    this.setState({
      Description: "",
      CaseTitle: "",
      openPartiesSubmissionsModal: false,
      isUpdate: false
    });
  };
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
          // swal("", ApplicantDetails.message, "error");
        }
      })
      .catch(err => {
        //  swal("", err.message, "error");
      });
  };
  fetchApplications = () => {
    fetch("/api/Applications", {
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
          //  swal("", ApplicantDetails.message, "error");
        }
      })
      .catch(err => {
        // swal("", err.message, "error");
      });
  };
  fetchApplicationGrounds = Applicationno => {
    fetch("/api/grounds/" + Applicationno, {
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
        // swal("", err.message, "error");
      });
  };
  formatNumber = num => {
    let newtot = Number(num).toFixed(2);
    return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  fetchApplicationfees = Applicationno => {
    fetch("/api/applicationfees/" + Applicationno, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Applicationfees => {
        if (Applicationfees.length > 0) {
          this.setState({ Applicationfees: Applicationfees });
          this.setState({ TotalAmountdue: Applicationfees[0].total });
        }
      })
      .catch(err => {
        //  swal("", err.message, "error");
      });
  };
  fetchApplicationDocuments = Applicationno => {
    fetch("/api/applicationdocuments/" + Applicationno, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(ApplicationDocuments => {
        if (ApplicationDocuments.length > 0) {
          this.setState({ ApplicationDocuments: ApplicationDocuments });
        } else {
          //   swal("", ApplicationDocuments.message, "error");
        }
      })
      .catch(err => {
        // swal("", err.message, "error");
      });
  };

  handleswitchMenu = e => {
    e.preventDefault();
    if (this.state.profile === false) {
      this.setState({ profile: true });
    } else {
      this.setState({ profile: false });
    }
  };
  GoBack = e => {
    e.preventDefault();
    this.setState({ summary: false });
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
  closeViewerModal = () => {
    this.setState({ openViewer: false });
  };
  fetchTenderAdendums = TenderID => {
    fetch("/api/tenderaddendums/" + TenderID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(AddedAdendums => {
        if (AddedAdendums.length > 0) {
          this.setState({ AddedAdendums: AddedAdendums });
        }
      })
      .catch(err => {
        // swal("", err.message, "error");
      });
  };
  fetchApplicationProgress = Applicationno => {
    fetch("/api/applications/" + Applicationno + "/1/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(ApplicationsProgress => {
        if (ApplicationsProgress.length > 0) {
          this.setState({ ApplicationsProgress: ApplicationsProgress });
        }
      })
      .catch(err => {
        // swal("", err.message, "error");
      });
  };

  fetchResponseDocuments = ApplicationNo => {
    fetch("/api/PEResponse/Documents/" + ApplicationNo, {
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
  fetchBackgrounInformation = ApplicationNo => {
    this.setState({
      BackgroundInformation: []
    });
    fetch("/api/PEResponse/BackgrounInformation/" + ApplicationNo, {
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
  fetchResponseDetails = ApplicationNo => {
    fetch(
      "/api/PEResponse/GetPEResponseDetailsPerApplication/" + ApplicationNo,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
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
  handViewApplication = k => {
    this.setState({ ApplicationsProgress: [] });
    this.setState({ AddedAdendums: [] });
    this.setState({ ApplicationGrounds: [] });
    this.setState({ ApplicationDocuments: [] });
    this.setState({ Applicationfees: [] });
    this.setState({ TotalAmountdue: "" });
    this.fetchApplicationGrounds(k.ID);
    this.fetchApplicationfees(k.ID);
    this.fetchApplicationDocuments(k.ID);
    this.fetchTenderAdendums(k.TenderID);
    this.fetchAdditionalSubmisions(k.ID);
    this.fetchAdditionalSubmisionsDocuments(k.ID);
    this.fetchinterestedparties(k.ID);
    this.fetchApplicantDetails(k.Applicantusername);
    this.fetchApplicationProgress(k.ApplicationNo);
    this.fetchCaseAnalysis(k.ApplicationNo);
    //pe response
    this.setState({ ResponseDocuments: [] });
    this.setState({ ResponseDetails: [] });
    this.fetchResponseDocuments(k.ApplicationNo);
    this.fetchResponseDetails(k.ApplicationNo);
    this.fetchBackgrounInformation(k.ApplicationNo);
    this.fetchCaseAnalysisDocuments(k.ApplicationNo);

    const data = {
      PEPOBox: k.PEPOBox,
      PEPostalCode: k.PEPostalCode,
      PETown: k.PETown,
      PEPostalCode: k.PEPostalCode,
      PEMobile: k.PEMobile,
      PEEmail: k.PEEmail,
      caseOfficer: k.caseOfficer,
      PEWebsite: k.PEWebsite,
      TenderID: k.TenderID,
      ApplicationID: k.ID,
      ApplicationNo: k.ApplicationNo,
      TenderNo: k.TenderNo,
      ApplicationREf: k.ApplicationREf,
      PEName: k.PEName,
      FilingDate: dateFormat(
        new Date(k.FilingDate).toLocaleDateString(),
        "mediumDate"
      ),
      ApplicationClosingDate: k.ClosingDate,
      TenderName: k.TenderName,
      Status: k.Status,
      TenderValue: k.TenderValue,
      StartDate: dateFormat(
        new Date(k.StartDate).toLocaleDateString(),
        "mediumDate"
      ),
      ClosingDate: dateFormat(
        new Date(k.ClosingDate).toLocaleDateString(),
        "mediumDate"
      ),
      AwardDate: dateFormat(
        new Date(k.AwardDate).toLocaleDateString(),
        "mediumDate"
      ),
      TenderType: k.TenderType,
      TenderSubCategory: k.TenderSubCategory,
      TenderTypeDesc: k.TenderTypeDesc,
      TenderCategory: k.TenderCategory,
      Timer: k.Timer,
      PaymentStatus: k.PaymentStatus
    };
    this.setState({ summary: true });
    this.setState(data);
  };
  ViewFile = (k, e) => {
    console.log(k);
    let filepath = k.Path + "/" + k.FileName;
    window.open(filepath);
    //this.setState({ openFileViewer: true });
  };
  handleInputChange = event => {
    // event.preventDefault();
    // this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  fetchinterestedparties = ApplicationID => {
    this.setState({ interestedparties: [] });
    fetch("/api/interestedparties/" + ApplicationID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(interestedparties => {
        if (interestedparties.length > 0) {
          this.setState({ interestedparties: interestedparties });
        } else {
          toast.error(interestedparties.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  onIssuesEditorChange = evt => {
    this.setState({
      Description: evt.editor.getData()
    });
  };
  fetchAdditionalSubmisionsDocuments = ApplicationID => {
    this.setState({
      AdditionalSubmisionsDocuments: []
    });
    fetch(
      "/api/additionalsubmissions/" + ApplicationID + "/Applicant/Documents",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
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
  fetchCaseAnalysis = ApplicationNo => {
    this.setState({ CaseAnalysis: [] });
    fetch("/api/Caseanalysis/" + ApplicationNo, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(PEDetails => {
        if (PEDetails.length > 0) {
          this.setState({ CaseAnalysis: PEDetails });
        } else {
          swal("", PEDetails.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  handlePartySubmisionSubmit = event => {
    event.preventDefault();

    const data = {
      Title: this.state.CaseTitle,
      Description: this.state.Description,
      ApplicationNo: this.state.ApplicationNo
    };
    fetch("/api/Caseanalysis", {
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
            swal("", "Added Successfully", "success");
            this.setState({
              Description: "",
              CaseTitle: "",
              isUpdate: false
            });
            this.fetchCaseAnalysis(this.state.ApplicationNo);
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  fetchAdditionalSubmisions = ApplicationID => {
    this.setState({
      AdditionalSubmisions: []
    });
    fetch("/api/additionalsubmissions/" + ApplicationID + "/Applicant", {
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
  handleDeleteCaseAnalysisSections = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch(
          "/api/Caseanalysis/" + this.state.ApplicationNo + "/" + d.Title,
          {
            method: "Delete",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                toast.success("Removed");
                this.fetchCaseAnalysis(this.state.ApplicationNo);
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
  handleDeleteCaseAnalysisDocument = (d, e) => {
    swal({
      text: "Are you sure that you want to remove this document?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/Caseanalysis/" + d.FileName, {
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
                this.fetchCaseAnalysisDocuments(this.state.ApplicationNo);
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
  PrintPDF = () => {
    const data = {
      Applicationno: this.state.ApplicationNo,
      Applicationdate: dateFormat(this.state.FilingDate, "mediumDate"),
      PEName: this.state.PEName,
      ApplicantName: this.state.Applicantname,
      TenderNo: this.state.TenderNo,
      TenderName: this.state.TenderName,
      DateAppealExpires: dateFormat(
        this.state.ApplicationClosingDate,
        "mediumDate"
      ),
      CaseAnalysis: this.state.CaseAnalysis
    };
    fetch("/api/GenerateCaseAnalysis", {
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
              "/CaseAnalysis/" +
              this.state.ApplicationNo +
              ".pdf";
            //   let filepath =

            //       "http://localhost:3001/CaseAnalysis/" +
            //       this.state.ApplicationNo +
            //       ".pdf";
            this.setState({ FileURL: filepath, openViewer: true });
            //swal("", "Printed", "success");
          } else {
            toast.success(data.message);
          }
        })
      )
      .catch(err => {
        toast.success(err.message);
      });
  };

  handleEditAnalysisSections = d => {
    this.setState({
      CaseTitle: d.Title,
      Description: d.Description,
      openPartiesSubmissionsModal: true,
      isUpdate: true
    });
  };

  render() {
    const ColumnData = [
      {
        label: "ApplicationNo",
        field: "ApplicationNo"
      },
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
          ApplicationNo: k.ApplicationNo,
          TenderName: k.TenderName,
          PE: k.PEName,
          FilingDate: dateFormat(
            new Date(k.FilingDate).toLocaleDateString(),
            "mediumDate"
          ),

          Status: k.Status,

          action: (
            <span>
              <a
                className="fa fa-edit"
                style={{ color: "#007bff" }}
                onClick={e => this.handViewApplication(k, e)}
              >
                {" "}
                View{" "}
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
    let childdiv = {
      margin: "30px"
    };
    let FormStyle = {
      margin: "20px"
    };
    let formcontainerStyle = {
      border: "1px solid grey",
      "border-radius": "10px"
    };
    let ViewFile = this.ViewFile;
    let handleDeleteCaseAnalysisDocument = this
      .handleDeleteCaseAnalysisDocument;
    if (this.state.summary) {
      return (
        <div>
          <ToastContainer />
          <Modal
            visible={this.state.openUploadModal}
            width="900"
            height="360"
            effect="fadeInUp"
          >
            <div style={{ "overflow-y": "scroll", height: "350px" }}>
              <a
                style={{
                  float: "right",
                  color: "red",
                  margin: "10px"
                }}
                href="javascript:void(0);"
                onClick={() => this.CloseopenUploadModal()}
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
                  Case Analysis Documents
                </h4>
                <div className="container-fluid">
                  <div className="col-sm-12">
                    <div className="ibox-content">
                      <div>
                        <div className="col-lg-12 border border-success rounded">
                          <div style={FormStyle}>
                            <div className=" row">
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      Document Description
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={this.state.DocDescription}
                                      type="text"
                                      required
                                      name="DocDescription"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />

                            <div class="row">
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      Select Document
                                    </label>
                                  </div>
                                  <div className="col-md-8">
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
                                      class="btn btn-success "
                                      onClick={this.UploadBankSlip}
                                    >
                                      Upload
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-md-9"></div>
                          <div className="col-md-3">
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={this.CloseopenUploadModal}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            visible={this.state.openPartiesSubmissionsModal}
            width="80%"
            height="600px"
            effect="fadeInUp"
          >
            <div style={{ "overflow-y": "scroll", height: "570px" }}>
              <a
                style={{ float: "right", color: "red", margin: "10px" }}
                href="javascript:void(0);"
                onClick={() => this.ClosePartiesSubmissionsModal()}
              >
                Close
              </a>
              <h4 style={{ "text-align": "center", color: "#1c84c6" }}>
                {" "}
                Description
              </h4>

              <div className="container-fluid">
                <div className="col-sm-12">
                  <div className="ibox-content">
                    <form onSubmit={this.handlePartySubmisionSubmit}>
                      <div className=" row">
                        <div
                          className="col-sm-6"
                          style={{ "margin-left": "10px" }}
                        >
                          <label
                            htmlFor="exampleInputPassword1"
                            className="font-weight-bold"
                          >
                            Add Title
                          </label>

                          {this.state.isUpdate ? (
                            <input
                              onChange={this.handleInputChange}
                              value={this.state.CaseTitle}
                              type="text"
                              required
                              name="CaseTitle"
                              className="form-control"
                              disabled
                            />
                          ) : (
                            <input
                              onChange={this.handleInputChange}
                              value={this.state.CaseTitle}
                              type="text"
                              required
                              name="CaseTitle"
                              className="form-control"
                            />
                          )}
                        </div>
                      </div>
                      <br />
                      <div classname="row">
                        <div class="col-sm-12">
                          <label for="Name" className="font-weight-bold">
                            Description
                          </label>
                          <CKEditor
                            data={this.state.Description}
                            onChange={this.onIssuesEditorChange}
                          />
                        </div>
                      </div>
                      <br />
                      <div class="row">
                        <div className="col-sm-10"></div>
                        <div className="col-sm-2">
                          <button className="btn btn-primary" type="submit">
                            Save
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={this.ClosePartiesSubmissionsModal}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
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
            <div className="col-lg-11">
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
                    STATUS:{" "}
                    {this.state.Status === "DECLINED" ? (
                      <span className="text-danger"> {this.state.Status}</span>
                    ) : (
                      <span className="text-success"> {this.state.Status}</span>
                    )}
                  </h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-1">
              <div className="row wrapper ">
                &nbsp;
                <button
                  style={{ margin: "10px" }}
                  className="btn btn-warning float-right"
                  type="button"
                  onClick={this.GoBack}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <p></p>
          <div className="border-bottom white-bg p-4">
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
                      Case Analysis{" "}
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
                      Application Details
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
                      PE Response
                    </a>
                  </div>
                </nav>
                <ToastContainer />
                <div class="tab-content " id="nav-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    style={childdiv}
                  >
                    &nbsp;&nbsp;
                    <h3
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={this.openopenUploadModal}
                    >
                      {" "}
                      Upload Already writen Case Analysis
                    </h3>
                    {this.state.CaseAnalysisDocuments.length > 0 ? (
                      <table className="table table-borderless table-sm">
                        <thead className="thead-light">
                          <th>ID</th>
                          <th>Description</th>
                          <th>Date Uploaded</th>
                          <th>Submited By</th>
                          <th>Actions</th>
                        </thead>
                        {this.state.CaseAnalysisDocuments.map((k, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td> {k.Description}</td>
                              <td>{dateFormat(k.Create_at, "default")}</td>
                              <td> {k.SubmitedBy}</td>

                              <td>
                                <a
                                  onClick={e => ViewFile(k, e)}
                                  className="text-success"
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                  View
                                </a>
                                |{" "}
                                <a
                                  onClick={e =>
                                    handleDeleteCaseAnalysisDocument(k, e)
                                  }
                                  className="text-danger"
                                >
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                  Remove
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </table>
                    ) : null}
                    <br />
                    &nbsp;&nbsp;
                    <h3
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={this.openPartiesSubmissionsModal}
                    >
                      {" "}
                      Write Case Analysis Online
                    </h3>
                    {this.state.CaseAnalysis.map((r, i) => (
                      <div>
                        <h3
                          style={{ headingstyle }}
                          className="font-weight strong"
                        >
                          {r.Title}
                        </h3>
                        <tr>
                          <td>{ReactHtmlParser(r.Description)}</td>
                          <td>
                            {" "}
                            <span>
                              <a
                                style={{ color: "Blue" }}
                                onClick={e =>
                                  this.handleEditAnalysisSections(r, e)
                                }
                              >
                                &nbsp; Edit
                              </a>
                              |
                              <a
                                style={{ color: "#f44542" }}
                                onClick={e =>
                                  this.handleDeleteCaseAnalysisSections(r, e)
                                }
                              >
                                &nbsp; Remove
                              </a>
                            </span>
                          </td>
                        </tr>
                      </div>
                    ))}
                    <div>
                      <div className="row">
                        <div className="col-sm-10"></div>
                        <div className="col-sm-2">
                          <button
                            className="btn btn-success"
                            type="button"
                            onClick={this.PrintPDF}
                          >
                            preview
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-warning"
                            type="button"
                            onClick={this.GoBack}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-profile-tab"
                  >
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <h3 style={headingstyle}>Case Officer</h3>
                          </div>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              value={this.state.caseOfficer}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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
                          <table className="table table-borderless table-sm ">
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
                        <h3 style={headingstyle}>Interested Parties</h3>
                        <div className="col-lg-11 border border-success rounded">
                          <br />
                          <table className="table table-sm">
                            <thead className="thead-light">
                              <th>Org Name</th>
                              <th>ContactName</th>
                              <th>Designation</th>
                              <th>Email</th>
                              <th>TelePhone</th>
                              <th>Mobile</th>
                              <th>PhysicalAddress</th>
                            </thead>
                            {this.state.interestedparties.map((r, i) => (
                              <tr>
                                <td>{r.Name}</td>
                                <td> {r.ContactName} </td>
                                <td> {r.Designation} </td>
                                <td> {r.Email} </td>
                                <td> {r.TelePhone} </td>
                                <td> {r.Mobile} </td>
                                <td> {r.PhysicalAddress} </td>
                              </tr>
                            ))}
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
                              <td className="font-weight-bold">
                                {" "}
                                Application Date:
                              </td>
                              <td> {this.state.FilingDate}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold">
                                {" "}
                                Date of Notification of Award/Occurrence of
                                Breach:
                              </td>
                              <td> {this.state.AwardDate}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold">
                                {" "}
                                Application Timing:
                              </td>
                              <td> {this.state.Timer}</td>
                            </tr>{" "}
                            <tr>
                              <td className="font-weight-bold"> TenderNo:</td>
                              <td> {this.state.TenderNo}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold"> TenderName:</td>
                              <td> {this.state.TenderName}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold">
                                {" "}
                                Tender Value:
                              </td>
                              <td className="font-weight-bold">
                                {" "}
                                {this.formatNumber(this.state.TenderValue)}
                              </td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold"> TenderType:</td>
                              <td> {this.state.TenderTypeDesc}</td>
                            </tr>
                            {this.state.TenderType === "B" ? (
                              <tr>
                                <td className="font-weight-bold">
                                  {" "}
                                  TenderCategory:
                                </td>
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
                          <h3 style={headingstyle}>Tender Addendums</h3>
                          <table className="table table-borderless table-sm ">
                            <th>No</th>
                            <th>StartDate</th>
                            <th>ClosingDate</th>
                            <th>Description</th>

                            {this.state.AddedAdendums.map((r, i) => (
                              <tr>
                                <td className="font-weight-bold">
                                  {r.AdendumNo}
                                </td>

                                <td className="font-weight-bold">
                                  {dateFormat(
                                    new Date(r.StartDate).toLocaleDateString(),
                                    "mediumDate"
                                  )}
                                </td>
                                <td className="font-weight-bold">
                                  {dateFormat(
                                    new Date(
                                      r.ClosingDate
                                    ).toLocaleDateString(),
                                    "mediumDate"
                                  )}
                                </td>
                                <td className="font-weight-bold">
                                  {r.Description}
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-12 ">
                        <h3 style={headingstyle}>Grounds for Appeal</h3>
                        <div className="col-lg-11 border border-success rounded">
                          {this.state.ApplicationGrounds.map(function(k, i) {
                            if (k.EntryType === "Grounds for Appeal") {
                              return (
                                <p>
                                  <h3>Ground NO:{k.GroundNO}</h3>

                                  {ReactHtmlParser(k.Description)}
                                </p>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-12 ">
                        <h3 style={headingstyle}>Requested Orders</h3>

                        <div className="col-lg-11 border border-success rounded">
                          {this.state.ApplicationGrounds.map(function(k, i) {
                            if (k.EntryType === "Requested Orders") {
                              return (
                                <p>
                                  <h3>Request NO:{k.GroundNO}</h3>

                                  {ReactHtmlParser(k.Description)}
                                </p>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-12 ">
                        <h3 style={headingstyle}>Documents Attached</h3>
                        <div className="col-lg-11 border border-success rounded">
                          <table className="table table-sm">
                            <thead className="thead-light">
                              <th>ID</th>
                              <th>Document Description</th>
                              <th>FileName</th>
                              <th>Date Submited</th>
                              <th>Actions</th>
                            </thead>
                            {this.state.ApplicationDocuments.map((k, i) => {
                              return k.Confidential ? (
                                this.checkDocumentRoles() ? (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{k.Description}</td>
                                    <td>{k.FileName}</td>
                                    <td>
                                      {dateFormat(
                                        new Date(
                                          k.DateUploaded
                                        ).toLocaleDateString(),
                                        "mediumDate"
                                      )}
                                    </td>
                                    <td>
                                      <a
                                        onClick={e => ViewFile(k, e)}
                                        className="text-success"
                                      >
                                        <i
                                          class="fa fa-eye"
                                          aria-hidden="true"
                                        ></i>
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                ) : null
                              ) : (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td>{k.Description}</td>
                                  <td>{k.FileName}</td>
                                  <td>
                                    {dateFormat(
                                      new Date(
                                        k.DateUploaded
                                      ).toLocaleDateString(),
                                      "mediumDate"
                                    )}
                                  </td>
                                  <td>
                                    <a
                                      onClick={e => ViewFile(k, e)}
                                      className="text-success"
                                    >
                                      <i
                                        class="fa fa-eye"
                                        aria-hidden="true"
                                      ></i>
                                      View
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
                    <div className="row">
                      <div className="col-lg-12 ">
                        <h3 style={headingstyle}>Fees</h3>
                        <div className="col-lg-11 border border-success rounded">
                          <div class="col-sm-8">
                            <table class="table table-sm">
                              <thead className="thead-light">
                                <th scope="col">#</th>
                                <th scope="col">Fees description</th>
                                <th scope="col">Value</th>
                              </thead>
                              <tbody>
                                {this.state.Applicationfees.map((r, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{r.EntryType}</td>
                                    <td className="font-weight-bold">
                                      {this.formatNumber(r.AmountDue)}
                                    </td>
                                  </tr>
                                ))}
                                <tr>
                                  <th></th>
                                  <th>Total Amount</th>
                                  <th className="font-weight-bold text-danger">
                                    {" "}
                                    {this.formatNumber(
                                      this.state.TotalAmountdue
                                    )}
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                            {this.state.PaymentStatus === "Not Submited" ? (
                              <h4>
                                Fees Status:{" "}
                                <span className="text-danger">NOT PAID</span>{" "}
                              </h4>
                            ) : null}
                            {this.state.PaymentStatus === "Approved" ? (
                              <h4>
                                Fees Status:{" "}
                                <span className="text-success">PAID</span>{" "}
                              </h4>
                            ) : null}
                            {this.state.PaymentStatus === "Submited" ? (
                              <h4>
                                Fees Status:{" "}
                                <span className="text-warning">
                                  Payment Pending Confirmation
                                </span>{" "}
                              </h4>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 ">
                        <h3 style={headingstyle}>Additional Submissions</h3>
                        <div className="col-lg-11 border border-success rounded">
                          <h2>Background </h2>

                          {this.state.AdditionalSubmisions.map(function(k, i) {
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
                              <th>Date Uploaded</th>
                              <th>Submited By</th>
                              <th>Actions</th>
                            </thead>
                            {this.state.AdditionalSubmisionsDocuments.map(
                              (k, i) => {
                                return this.checkDocumentRoles() ? (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td> {k.Description}</td>
                                    <td>
                                      {dateFormat(k.Create_at, "default")}
                                    </td>
                                    <td>
                                      {" "}
                                      {k.SubmitedBy} - {k.Category}
                                    </td>

                                    <td>
                                      <a
                                        onClick={e => ViewFile(k, e)}
                                        className="text-success"
                                      >
                                        <i
                                          class="fa fa-eye"
                                          aria-hidden="true"
                                        ></i>
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                ) : null;
                              }
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="nav-Attachments"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-Attachments-tab"
                  >
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 style={headingstyle}> Response Details</h3>
                        <div className="col-lg-12 border border-success rounded">
                          {this.state.BackgroundInformation ? (
                            <div>
                              <h3>Background </h3>
                              {ReactHtmlParser(
                                this.state.BackgroundInformation
                              )}
                            </div>
                          ) : null}
                          <h3>Response to Applicant Grounds</h3>
                          {this.state.GroundsDetails.map(function(k, i) {
                            return (
                              <div>
                                <h3 style={headingstyle}>
                                  GroundNo: {k.GroundNO}
                                </h3>
                                <h3 style={headingstyle}>Response</h3>
                                {ReactHtmlParser(k.Response)}
                              </div>
                            );
                          })}
                          <h3>Response to Applicant Requests</h3>

                          {this.state.PrayersDetails.map(function(k, i) {
                            return (
                              <div>
                                <h3 style={headingstyle}>
                                  RequestNo: {k.GroundNO}
                                </h3>
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
                      <div className="col-sm-12">
                        <h3 style={headingstyle}> Documents Attached</h3>
                        <div className="col-lg-12 border border-success rounded">
                          <table className="table table-sm">
                            <thead className="thead-light">
                              <th>#</th>
                              <th>Document Description</th>
                              <th>FileName</th>
                              <th>Actions</th>
                            </thead>

                            {this.state.ResponseDocuments.map((k, i) => {
                              return k.Confidential ? (
                                this.checkDocumentRoles() ? (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{k.Description}</td>
                                    <td>{k.FileName}</td>
                                    <td>
                                      <a
                                        onClick={e => ViewFile(k, e)}
                                        className="text-success"
                                      >
                                        <i
                                          class="fa fa-eye"
                                          aria-hidden="true"
                                        ></i>
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                ) : null
                              ) : (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td>{k.Description}</td>
                                  <td>{k.Name}</td>
                                  <td>
                                    <a
                                      onClick={e => ViewFile(k, e)}
                                      className="text-success"
                                    >
                                      <i
                                        class="fa fa-eye"
                                        aria-hidden="true"
                                      ></i>
                                      View
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
                          <h2>Background </h2>

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
                              <th>Date Uploaded</th>
                              <th>Submited By</th>
                              <th>Actions</th>
                            </thead>
                            {this.state.AdditionalSubmisionsDocuments.map(
                              (k, i) => {
                                return this.checkDocumentRoles() ? (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td> {k.Description}</td>
                                    <td>
                                      {dateFormat(k.Create_at, "default")}
                                    </td>
                                    <td>
                                      {" "}
                                      {k.SubmitedBy} - {k.Category}
                                    </td>

                                    <td>
                                      <a
                                        onClick={e => ViewFile(k, e)}
                                        className="text-success"
                                      >
                                        <i
                                          class="fa fa-eye"
                                          aria-hidden="true"
                                        ></i>
                                        View
                                      </a>
                                    </td>
                                  </tr>
                                ) : null;
                              }
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
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
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-11">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2> CASE ANALYSIS</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-1">
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

          <TableWrapper>
            <Table Rows={Rowdata1} columns={ColumnData} />
          </TableWrapper>
        </div>
      );
    }
  }
}

export default CaseAnalysis;

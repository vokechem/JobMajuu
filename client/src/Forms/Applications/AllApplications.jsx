import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import "react-toastify/dist/ReactToastify.css";
import ReactHtmlParser from "react-html-parser";
import Modal from "react-awesome-modal";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Progress } from "reactstrap";
var _ = require("lodash");
var dateFormat = require("dateformat");
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
class AllApplications extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      interestedparties: [],
      JRinterestedparties: [],
      AdditionalSubmisions: [],
      AdditionalSubmisionsDocuments: [],
      PE: [],
      ApplicationsProgress: [],
      stdtenderdocs: [],
      Board: data.Board,
      CaseOfficerCount: data.CaseOfficerCount,
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
      IsUpdate: false,
      Documenttype: "",
      DocumenttypeID: "",
      selectedFile: null,
      loaded: 0,
      openTracking: false,
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
      AddJudicialReview: false,
      jDateReceived: "",
      jDateFilled: "",
      jCaseNO: "",
      jDescription: "",
      jApplicant: "",
      jCourt: "",
      Towns: [],
      jTown: "",
      selectedFile: "",
      JudicialDocuments: [],
      loaded: 0,
      Users: [],
      UserName: "",
      JRUsers: [],
      jrRole: "",
      DocumentDate: "",
      ActionDate: "",
      ActionDescription: ""
    };
    this.fetchApplicantDetails = this.fetchApplicantDetails.bind(this);
    this.Resetsate = this.Resetsate.bind(this);
    this.fetchAdditionalSubmisions = this.fetchAdditionalSubmisions.bind(this);
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
  checkDocumentRoles = () => {
    
    if (this.state.Board) {
      return true;
    } 
    if (+this.state.CaseOfficerCount> +0) {
      return true;
    }
    
    return false;
  };
  fetchTowns = () => {
    fetch("/api/Towns", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Towns => {
        if (Towns.length > 0) {
          this.setState({ Towns: Towns });
        } else {
          // swal("Oops!", "Invalid Postal Code", "error");
        }
      })
      .catch(err => {
        toast.error(err.message);
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
      this.Resetsate();
    }
  };
  GoBack = e => {
    e.preventDefault();
    this.setState({ summary: false });
  };

  Resetsate() {
    const data = {
      TenderNo: "",
      TenderID: "",
      TenderValue: "",
      ApplicationID: "",
      TenderName: "",
      PEID: "",
      StartDate: "",
      ClosingDate: "",
      ApplicationREf: "",
      AdendumDescription: "",
      EntryType: "",
      RequestDescription: "",
      GroundDescription: "",
      ApplicationGrounds: [],
      ApplicationDocuments: [],
      Applicationfees: [],
      FilingDate: "",
      PEName: "",
      ApplicationNo: "",
      AddedAdendums: [],
      AdendumStartDate: "",
      RequestsAvailable: false,
      GroundsAvailable: false,
      AdendumsAvailable: false,
      AdendumClosingDate: "",
      AddAdedendums: false,
      IsUpdate: false
    };
    this.setState(data);
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
              this.fetchApplications();
              this.fetchTowns();
              this.fetchUsers();
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
    this.fetchJRinterestedparties(k.ApplicationNo);
    this.fetchJRUsers(k.ApplicationNo);
    this.fetchApplicantDetails(k.Applicantusername);
    this.fetchApplicationProgress(k.ApplicationNo);
    this.fetchJudicialDocuments(k.ApplicationNo);
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
      PaymentStatus: k.PaymentStatus,
      summary: true
    };

    this.setState(data);
  };
  ViewFile = (k, e) => {
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
  openModal = () => {
    this.setState({ openTracking: true });
  };
  closeModal = () => {
    this.setState({ openTracking: false });
  };
  handleJudicialReviewSubmit = event => {
    event.preventDefault();
    let datatosave = {
      ApplicationNo: this.state.ApplicationNo,
      DateFilled: this.state.jDateFilled,
      jDateReceived: this.state.jDateReceived,
      CaseNO: this.state.jCaseNO,
      Description: this.state.jDescription,
      Applicant: this.state.jApplicant,
      Court: this.state.jCourt,
      Town: this.state.jTown
    };
    fetch("/api/JudicialReview", {
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
            swal("", "Added successfully", "success");
            //this.setState({ AddJudicialReview:false})
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        toast.error("Could not be added please try again");
      });
  };
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
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  SaveJudicailReviewDocs(Documentname) {
    const data = {
      ApplicationNo: this.state.ApplicationNo,
      Name: Documentname,
      DocumentDate: this.state.DocumentDate,
      ActionDate: this.state.ActionDate,
      ActionDescription: this.state.ActionDescription,
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
  UpdateSentEmails = () => {
    fetch("/api/JudicialReview/UpdateSentMails", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response => response.json().then(data => {}))
      .catch(err => {
        //swal("Oops!", err.message, "error");
      });
  };
  SendMail = (
    Name,
    email,
    ID,
    subject,
    ApplicationNo,
    ActionDescription,
    ActionDate
  ) => {
    const emaildata = {
      to: email,
      subject: subject,
      ID: ID,
      Name: Name,
      ApplicationNo: ApplicationNo,
      ActionDate: ActionDate,
      ActionDescription: ActionDescription
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
  sendBulkNtification1 = (
    AproverEmail,
    AproverMobile,
    Name,
    ApplicationNo,
    ActionDescription,
    ActionDate
  ) => {
    this.SendSMS(
      AproverMobile,
      "New Judicial Review Action for ApplicationNo:" +
        ApplicationNo +
        " has been received."
    );
    this.SendMail(
      Name,
      AproverEmail,
      "Judicial Review",
      "JUDICIAL REVIEW UPDATE",
      ApplicationNo,
      ActionDescription,
      ActionDate
    );
  };
  sendBulkNtification = (AproverEmail, AproverMobile, Name, ApplicationNo) => {
    var rows = [...this.state.JudicialDocuments];
    const filtereddata = rows.filter(item => item.ActionSent === "No");
    if (filtereddata.length > 0) {
      filtereddata.map((item, key) =>
        this.sendBulkNtification1(
          AproverEmail,
          AproverMobile,
          Name,
          ApplicationNo,
          item.ActionDescription,
          item.ActionDate
        )
      );
    }
    this.UpdateSentEmails();
  };
  SendUsersNotification = () => {
    // console.log(this.state.JRUsers);
    if (this.state.JRUsers.length > 0) {
      this.state.JRUsers.map((item, key) =>
        this.sendBulkNtification(
          item.Email,
          item.Phone,
          item.Name,
          this.state.ApplicationNo
        )
      );
    }
  };
  handleUsersSubmit = event => {
    event.preventDefault();
    let datatosave = {
      UserName: this.state.UserName,
      ApplicationNo: this.state.ApplicationNo,
      jrRole: this.state.jrRole
    };
    fetch("/api/JudicialReview/Users/JRusers", {
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
            toast.success("Added successfully");
            this.fetchJRUsers(this.state.ApplicationNo);
            let setstatedata = {
              UserName: "",
              jrRole: ""
            };
            this.setState(setstatedata);
          } else {
            toast.error(data.message);
            //swal("", "Could not be added please try again", "error");
          }
        })
      )
      .catch(err => {
        toast.error("Could not be added please try again");
      });
  };
  handleInterestedPartySubmit = event => {
    event.preventDefault();

    let datatosave = {
      Name: this.state.InterestedPartyName,
      ApplicationNO: this.state.ApplicationNo,
      ContactName: this.state.InterestedPartyContactName,
      Email: this.state.InterestedPartyEmail,
      TelePhone: this.state.InterestedPartyTelePhone,
      Mobile: this.state.InterestedPartyMobile,
      PhysicalAddress: this.state.InterestedPartyPhysicalAddress,
      PostalCode: this.state.InterestedPartyPostalCode,
      Town: this.state.InterestedPartyTown,
      POBox: this.state.InterestedPartyPOBox,
      Designation: this.state.InterestedPartyDesignation
    };
    fetch("/api/interestedparties/JRInterestedParty", {
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
            // this.setState({ Grounds: datatosave });
            var rows = this.state.JRinterestedparties;
            rows.push(datatosave);
            this.setState({ JRinterestedparties: rows });
            toast.success("Added successfully");
            let setstatedata = {
              InterestedPartyContactName: "",
              InterestedPartyName: "",
              InterestedPartyEmail: "",
              InterestedPartyTelePhone: "",
              InterestedPartyMobile: "",
              InterestedPartyPhysicalAddress: "",
              InterestedPartyPOBox: "",
              InterestedPartyPostalCode: "",
              InterestedPartyTown: "",
              InterestedPartyDesignation: "",
              AddInterestedParty: false
            };
            this.setState(setstatedata);
          } else {
            toast.error(data.message);
            //swal("", "Could not be added please try again", "error");
          }
        })
      )
      .catch(err => {
        toast.error("Could not be added please try again");
      });
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
  fetchUsers = () => {
    fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Users => {
        if (Users.length > 0) {
          const GroupedUsers = [_.groupBy(Users, "Category")];
          this.setState({ Users: GroupedUsers[0].System_User });
        } else {
          swal("", Users.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
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
  handleDeleteJRInterestedparty = d => {
    swal({
      text: "Are you sure that you want to remove this user?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch(
          "/api/JudicialReview/" +
            d.Name +
            "/" +
            this.state.ApplicationNo +
            "/JRInterestedParty",
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                this.fetchJRinterestedparties(this.state.ApplicationNo);
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
  handleDeleteJrUsers = d => {
    swal({
      text: "Are you sure that you want to remove this user?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch(
          "/api/JudicialReview/" + d.UserName + "/" + this.state.ApplicationNo,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token")
            }
          }
        )
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                this.fetchJRUsers(this.state.ApplicationNo);
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
    let handleDeleteJrUsers = this.handleDeleteJrUsers;
    let handleDeleteJRInterestedparty = this.handleDeleteJRInterestedparty;
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
    const Users = [...this.state.Users].map((k, i) => {
      return {
        value: k.Username,
        label: k.Name
      };
    });

    let headingstyle = {
      color: "#7094db"
    };
    let childdiv = {
      margin: "30px"
    };
    let ViewFile = this.ViewFile;
    let Courts = [
      {
        value: "HIGH COURT",
        label: "HIGH COURT"
      },
      {
        value: "COURT OF APPEAL",
        label: "COURT OF APPEAL"
      },
      {
        value: "SUPREME COURT",
        label: "SUPREME COURT"
      }
    ];
    const Towns = [...this.state.Towns].map((k, i) => {
      return {
        value: k.Town,
        label: k.Town
      };
    });
    if (this.state.summary) {
      return (
        <div>
          <ToastContainer />
          <Modal
            visible={this.state.AddJudicialReview}
            width="90%"
            height="70%"
            effect="fadeInUp"
          >
            <div>
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
              <h4
                style={{
                  "text-align": "center",
                  color: "#1c84c6"
                }}
              >
                Judicial Review
              </h4>

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
                    JR Information
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
                    Attachments
                  </a>

                  <a
                    class="nav-item nav-link font-weight-bold"
                    id="nav-InterestedParties-tab"
                    data-toggle="tab"
                    href="#nav-InterestedParties"
                    role="tab"
                    aria-controls="InterestedParties"
                    aria-selected="false"
                  >
                    Interested Parties
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
                    Staff Handling
                  </a>
                  {/* <a
                    class="nav-item nav-link font-weight-bold"
                    id="nav-Fees-tab"
                    data-toggle="tab"
                    href="#nav-Fees"
                    role="tab"
                    aria-controls="nav-Fees"
                    aria-selected="false"
                  >
                    Fees
                  </a> */}
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
                  <div>
                    <div className="container-fluid">
                      <div style={{ "overflow-y": "scroll", height: "370px" }}>
                        <div className="col-sm-12">
                          <div className="ibox-content">
                            <form onSubmit={this.handleJudicialReviewSubmit}>
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
                                      <input
                                        onChange={this.handleInputChange}
                                        value={this.state.jCaseNO}
                                        type="text"
                                        required
                                        name="jCaseNO"
                                        className="form-control"
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
                                        Description
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        onChange={this.handleInputChange}
                                        value={this.state.jDescription}
                                        type="text"
                                        required
                                        name="jDescription"
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className=" row">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label
                                        htmlFor="exampleInputPassword1"
                                        className="font-weight-bold"
                                      >
                                        Date Filed
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        onChange={this.handleInputChange}
                                        value={this.state.jDateFilled}
                                        type="date"
                                        required
                                        name="jDateFilled"
                                        className="form-control"
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
                                        Date Received
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        onChange={this.handleInputChange}
                                        value={this.state.jDateReceived}
                                        type="date"
                                        required
                                        name="jDateReceived"
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className=" row">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label
                                        htmlFor="exampleInputPassword1"
                                        className="font-weight-bold"
                                      >
                                        Court
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <Select
                                        name="jCourt"
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
                                        Applicant
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <input
                                        onChange={this.handleInputChange}
                                        value={this.state.jApplicant}
                                        type="text"
                                        required
                                        name="jApplicant"
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className=" row">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label
                                        htmlFor="exampleInputPassword1"
                                        className="font-weight-bold"
                                      >
                                        Town
                                      </label>
                                    </div>
                                    <div className="col-md-8">
                                      <Select
                                        name="jTown"
                                        onChange={this.handleSelectChange}
                                        options={Towns}
                                        required
                                      />
                                    </div>
                                  </div>
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
                        </div>
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
                  <div>
                    <div className="container-fluid">
                      <div style={{ "overflow-y": "scroll", height: "370px" }}>
                        <div className="col-sm-12">
                          <div className="ibox-content">
                            <div class="row">
                              <div class="col-sm-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      for="Document"
                                      className="font-weight-bold"
                                    >
                                      Action Date
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="ActionDate"
                                      onChange={this.handleInputChange}
                                      value={this.state.ActionDate}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      for="Document"
                                      className="font-weight-bold"
                                    >
                                      Document Date
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="DocumentDate"
                                      onChange={this.handleInputChange}
                                      value={this.state.DocumentDate}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div class="row">
                              <div class="col-sm-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      for="Document"
                                      className="font-weight-bold"
                                    >
                                      Document Description
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="DocumentDesc"
                                      onChange={this.handleInputChange}
                                      value={this.state.DocumentDesc}
                                    />
                                  </div>
                                </div>
                                <p></p>
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      for="Document"
                                      className="font-weight-bold"
                                    >
                                      Action Description
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ActionDescription"
                                      onChange={this.handleInputChange}
                                      value={this.state.ActionDescription}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      for="Document"
                                      className="font-weight-bold"
                                    >
                                      Document
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
                                      class="btn btn-success float-right"
                                      onClick={this.handleDocumentSubmit}
                                    >
                                      Upload
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />

                            <div className="row">
                              <table className="table table-sm">
                                <th>#</th>
                                <th>Action Description</th>
                                <th>Document Description</th>
                                <th>Document Date</th>
                                <th>Date Submited</th>
                                <th>Actions</th>

                                {this.state.JudicialDocuments.map(function(
                                  k,
                                  i
                                ) {
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
                                })}
                              </table>
                            </div>
                            <br />
                            <div className="col-sm-12 ">
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
                  <div className="container-fluid">
                    <div style={{ "overflow-y": "scroll", height: "400px" }}>
                      <div className="col-sm-12">
                        <div className="ibox-content">
                          <ToastContainer />
                          <form onSubmit={this.handleUsersSubmit}>
                            <div className=" row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-2">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      User
                                    </label>
                                  </div>
                                  <div className="col-md-10">
                                    <Select
                                      name="UserName"
                                      // value={Users.filter(
                                      //   option =>
                                      //     option.label === this.state.Name
                                      // )}
                                      //defaultInputValue={this.state.Name}
                                      onChange={this.handleSelectChange}
                                      options={Users}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-2">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      Role
                                    </label>
                                  </div>
                                  <div className="col-md-10">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={this.state.jrRole}
                                      type="text"
                                      required
                                      name="jrRole"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />

                            <div className=" row">
                              <div className="col-sm-11"></div>
                              <div className="col-sm-1">
                                <button
                                  type="submit"
                                  className="btn btn-primary float-right"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 ">
                          <div className="col-lg-12 ">
                            <table className="table table-sm">
                              <thead className="thead-light">
                                <th>UserName</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                              </thead>
                              {this.state.JRUsers.map((r, i) => (
                                <tr>
                                  <td>{r.UserName}</td>
                                  <td> {r.Name} </td>
                                  <td> {r.Role} </td>
                                  <td>
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e => handleDeleteJrUsers(r, e)}
                                      >
                                        &nbsp; Remove
                                      </a>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-10"></div>
                        <div className="col-sm-2">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={this.SendUsersNotification}
                          >
                            Send Notification
                          </button>
                          &nbsp;
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
                </div>

                <div
                  class="tab-pane fade"
                  id="nav-InterestedParties"
                  role="tabpanel"
                  style={childdiv}
                  aria-labelledby="nav-InterestedParties-tab"
                >
                  <div className="container-fluid">
                    <div style={{ "overflow-y": "scroll", height: "400px" }}>
                      <div className="col-sm-12">
                        <div className="ibox-content">
                          <ToastContainer />
                          <form onSubmit={this.handleInterestedPartySubmit}>
                            <div className=" row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      Organization Name
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={this.state.InterestedPartyName}
                                      type="text"
                                      required
                                      name="InterestedPartyName"
                                      className="form-control"
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
                                      Contact Name
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={
                                        this.state.InterestedPartyContactName
                                      }
                                      type="text"
                                      required
                                      name="InterestedPartyContactName"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className=" row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      Designation
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={
                                        this.state.InterestedPartyDesignation
                                      }
                                      type="text"
                                      required
                                      name="InterestedPartyDesignation"
                                      className="form-control"
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
                                      Email
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={this.state.InterestedPartyEmail}
                                      type="email"
                                      required
                                      name="InterestedPartyEmail"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className=" row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      Mobile
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={this.state.InterestedPartyMobile}
                                      type="number"
                                      required
                                      name="InterestedPartyMobile"
                                      className="form-control"
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
                                      TelePhone
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={
                                        this.state.InterestedPartyTelePhone
                                      }
                                      type="number"
                                      required
                                      name="InterestedPartyTelePhone"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className=" row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      POBox
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={this.state.InterestedPartyPOBox}
                                      type="number"
                                      required
                                      name="InterestedPartyPOBox"
                                      className="form-control"
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
                                      Postal Code
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={
                                        this.state.InterestedPartyPostalCode
                                      }
                                      type="text"
                                      required
                                      name="InterestedPartyPostalCode"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className=" row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-4">
                                    <label
                                      htmlFor="exampleInputPassword1"
                                      className="font-weight-bold"
                                    >
                                      Physical Address
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={
                                        this.state
                                          .InterestedPartyPhysicalAddress
                                      }
                                      type="text"
                                      required
                                      name="InterestedPartyPhysicalAddress"
                                      className="form-control"
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
                                      Town
                                    </label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      onChange={this.handleInputChange}
                                      value={this.state.InterestedPartyTown}
                                      type="text"
                                      required
                                      name="InterestedPartyTown"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="col-sm-12 ">
                              <div className=" row">
                                <div className="col-sm-11 "></div>
                                <div className="col-sm-1 ">
                                  <button
                                    type="submit"
                                    className="btn btn-primary float-right"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 ">
                          <div className="col-lg-12 ">
                            <table className="table table-sm">
                              <thead className="thead-light">
                                <th>Org Name</th>
                                <th>ContactName</th>
                                <th>Designation</th>
                                <th>Email</th>
                                <th>TelePhone</th>
                                <th>Mobile</th>
                                <th>PhysicalAddress</th>
                                <th>Actions</th>
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
                                  <td>
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
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="col-sm-12 ">
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

                {/* <div
                  class="tab-pane fade"
                  id="nav-Fees"
                  role="tabpanel"
                  style={childdiv}
                  aria-labelledby="nav-Fees-tab"
                ></div> */}
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
            <div className="col-lg-4">
              <div className="row wrapper ">
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.openModal}
                  className="btn btn-success float-right"
                >
                  Track progress
                </button>{" "}
                &nbsp;
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.openJudicialReview}
                  className="btn btn-primary"
                >
                  {" "}
                  Judicial Review
                </button>
                &nbsp;
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.GoBack}
                  className="btn btn-warning float-left"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
          <p></p>
          <div className="border-bottom white-bg p-4">
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
                      <td className="font-weight-bold"> Application Date:</td>
                      <td> {this.state.FilingDate}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold">
                        {" "}
                        Date of Notification of Award/Occurrence of Breach:
                      </td>
                      <td> {this.state.AwardDate}</td>
                    </tr>
                    <tr>
                      <td className="font-weight-bold"> Application Timing:</td>
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
                      <td className="font-weight-bold"> Tender Value:</td>
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
                  <h3 style={headingstyle}>Tender Addendums</h3>
                  <table className="table table-borderless table-sm ">
                    <th>No</th>
                    <th>StartDate</th>
                    <th>ClosingDate</th>
                    <th>Description</th>

                    {this.state.AddedAdendums.map((r, i) => (
                      <tr>
                        <td className="font-weight-bold">{r.AdendumNo}</td>

                        <td className="font-weight-bold">
                          {dateFormat(
                            new Date(r.StartDate).toLocaleDateString(),
                            "mediumDate"
                          )}
                        </td>
                        <td className="font-weight-bold">
                          {dateFormat(
                            new Date(r.ClosingDate).toLocaleDateString(),
                            "mediumDate"
                          )}
                        </td>
                        <td className="font-weight-bold">{r.Description}</td>
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
                                new Date(k.DateUploaded).toLocaleDateString(),
                                "mediumDate"
                              )}
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
                          <td>{k.Description}</td>
                          <td>{k.FileName}</td>
                          <td>
                            {dateFormat(
                              new Date(k.DateUploaded).toLocaleDateString(),
                              "mediumDate"
                            )}
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
                            {this.formatNumber(this.state.TotalAmountdue)}
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
                        Fees Status: <span className="text-success">PAID</span>{" "}
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
                  <h2>Background Information</h2>

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
          <Modal
            visible={this.state.openTracking}
            width="900"
            height="500"
            effect="fadeInUp"
          >
            <div style={{ overflow: "scroll" }}>
              <a
                style={{ float: "right", margin: "10px", color: "red" }}
                href="javascript:void(0);"
                onClick={() => this.closeModal()}
              >
                Close
              </a>
              <br />
              <h4 style={{ "text-align": "center", color: "#1c84c6" }}>
                APPLICATION {this.state.ApplicationNo}
              </h4>

              <div className="container-fluid">
                <div style={{ "overflow-y": "scroll", height: "400px" }}>
                  <table className="table  table-sm  table-striped">
                    <thead class="thead-light">
                      <th>Date</th>
                      <th>Action</th>
                      <th>User</th>
                      <th>Status</th>
                    </thead>

                    {this.state.ApplicationsProgress.map((r, i) =>
                      r.Status === "Pending" ? (
                        <tr>
                          <td>{dateFormat(r.Date, "default")}</td>

                          <td> {r.ExpectedAction}</td>
                          <td> {r.User}</td>
                          <td>{r.Status}</td>
                        </tr>
                      ) : (
                        <tr>
                          <td>{dateFormat(r.Date, "default")}</td>
                          <td> {r.Action}</td>
                          <td> {r.User}</td>
                          <td>{r.Status}</td>
                        </tr>
                      )
                    )}
                  </table>
                </div>
              </div>
            </div>
          </Modal>
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
                  <h2> APPLICATIONS SUBMITED</h2>
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

export default AllApplications;

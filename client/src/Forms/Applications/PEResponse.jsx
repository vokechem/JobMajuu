import React, { Component } from "react";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import CKEditor from "ckeditor4-react";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";
import Modal from "react-awesome-modal";
var dateFormat = require("dateformat");
var _ = require("lodash");
class PEResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ApplicationGrounds: [],
      ResponseDocuments: [],
      PreliminaryObjectionsFeesPaymentDetails: [],
      interestedparties: [],
      PreliminaryObjectionsFees: [],
      PrayersDetails: [],
      ApplicationRequests: [],
      GroundsDetails: [],
      BankSlips: [],
      Confidential: false,
      ApplicationClosingDate: this.props.location.ApplicationClosingDate,
      ApplicationNo: this.props.location.ApplicationNo,
      ApplicationID: this.props.location.ApplicationID,
      NewDeadLine: "",
      BackgroundInfo: false,
      Reason: "",
      Groundtype: "",
      open: false,
      openPaymentModal: false,
      GroundResponse: "",
      GroundNo: "",
      selectedFile: "",
      loaded: 0,
      BackgroundInformation: "",
      ResponseID: "",
      grounddesc: "",
      showAction: true,
      Action: "",
      InitialSubmision: true,
      AddInterestedParty: false,

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
      TenderTypeDesc: "",
      PaymentType: "",
      ChequeDate: "",
      CHQNO: "",
      paymenttypes: [],
      Banks: []
    };
    this.onEditorChange = this.onEditorChange.bind(this);
    this.SavePEResponse = this.SavePEResponse.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onDeadlineEditorChange = this.onDeadlineEditorChange.bind(this);
    this.OpenRequestsModal = this.OpenRequestsModal.bind(this);
    this.OpenGroundsModal = this.OpenGroundsModal.bind(this);
  }
  fetchPaymentTypes = () => {
    this.setState({ paymenttypes: [] });

    fetch("/api/paymenttypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(paymenttypes => {
        if (paymenttypes.length > 0) {
          this.setState({ paymenttypes: paymenttypes });
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchResponseDocuments = () => {
    this.setState({ ResponseDocuments: [] });

    fetch("/api/PEResponse/Documents/" + this.state.ResponseID, {
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
  fetchBackgrounInformation = () => {
    this.setState({
      BackgroundInformation: []
    });
    fetch("/api/PEResponse/BackgrounInformation/" + this.state.ApplicationNo, {
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
  fetchResponseDetails = () => {
    this.setState({ PrayersDetails: [],
    GroundsDetails: [] });
    fetch(
      "/api/PEResponse/GetPEResponseDetailsPerApplication/" +
        this.state.ApplicationNo,
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
          this.setState({ ResponseID: ResponseDetails[0].PEResponseID });
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
        toast.error(err.message);
      });
  };
  fetchApplicationGrounds = () => {
    fetch("/api/grounds/GroundsOnly/" + this.state.ApplicationNo, {
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
  fetchApplicationPrayers = () => {
    fetch("/api/grounds/PrayersOnly/" + this.state.ApplicationNo, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(ApplicationRequests => {
        if (ApplicationRequests.length > 0) {
          this.setState({ ApplicationRequests: ApplicationRequests });
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  openAttachmentsTab() {
    document.getElementById("nav-profile-tab").click();
  }
  OpenFeesTab() {
    document.getElementById("nav-Fees-tab").click();
  }
  onDeadlineEditorChange(evt) {
    this.setState({
      Reason: evt.editor.getData()
    });
  }
  onEditorChange = evt => {
    this.setState({
      GroundResponse: evt.editor.getData()
    });
  };
  onBackgroundEditorChange = evt => {
    this.setState({
      BackgroundInformation: evt.editor.getData()
    });
  };
  fetchBankSlips = Applicationno => {
    this.setState({ BankSlips: [] });
    fetch("/api/applicationfees/" + Applicationno + "/Bankslips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(BankSlips => {
        if (BankSlips.length > 0) {
          const UserRoles = [_.groupBy(BankSlips, "Category")];
          if (UserRoles[0].PreliminaryObjection) {
            this.setState({ BankSlips: UserRoles[0].PreliminaryObjection });
          }
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  SaveBankSlip(Filename) {
    let data = {
      ApplicationID: this.state.ApplicationID,
      filename: Filename,
      Category: "PreliminaryObjection"
    };
    fetch("/api/applicationfees/BankSlip", {
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
            this.fetchBankSlips(this.state.ApplicationID);
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
        .post("/api/upload/BankSlips", data, {
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
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    if (this.state.ApplicationNo){
      this.fetchApplicationGrounds();
      this.fetchApplicationPrayers();
      this.fetchPreliminaryObjectionsFeesPaymentDetails();
      this.fetchResponseDetails();
      this.fetchBackgrounInformation();
      this.fetchBankSlips(this.state.ApplicationID);
    }
   
    if (actionMeta.name === "GroundNo") {
      const filtereddata = this.state.ApplicationGrounds.filter(
        item => item.GroundNO == UserGroup.value
      );

      if (filtereddata.length > 0) {
        this.setState({ grounddesc: filtereddata[0].Description });
      } else {
        this.setState({ grounddesc: "No description given." });
      }
    }
    if (actionMeta.name === "GroundNoPrayers") {
      this.setState({ GroundNo: UserGroup.value });
      const filtereddata = this.state.ApplicationRequests.filter(
        item => item.GroundNO == UserGroup.value
      );

      if (filtereddata.length > 0) {
        this.setState({ grounddesc: filtereddata[0].Description });
      } else {
        this.setState({ grounddesc: "No description given." });
      }
    }
    this.setState({ showAction: false });
  };
  SaveBackgroundInformation = event => {
    event.preventDefault();
    const data = {
      ApplicationNo: this.state.ApplicationNo,
      ResponseType: this.state.Action,
      UserID: localStorage.getItem("UserName"),
      BackgroundInformation: this.state.BackgroundInformation
    };

    fetch("/api/PEResponse/BackgroundInformation", {
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
            swal("", "Background Information save", "success");
            this.setState({ BackgroundInfo: false });
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  };

  SaveNoObjectionResponse = event => {
    event.preventDefault();
    const data = {
      ApplicationNo: this.state.ApplicationNo,
      ResponseType: this.state.Action,
      UserID: localStorage.getItem("UserName")
    };
    if (this.state.InitialSubmision) {
      this.SavePEResponse("/api/PEResponse/", data);
    } else {
      this.SavePEResponseDetails(this.state.ResponseID);
    }
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
      ApplicationNo: ApplicationNo,
      PEName: localStorage.getItem("LoogedinCompay")
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
  notifyPanelmembers = (AproverMobile, Name, AproverEmail) => {
    this.SendSMS(
      AproverMobile,
      "New deadline extension request has been submited and it's awaiting your review."
    );
    this.SendMail(
      Name,
      AproverEmail,
      "DeadlineExtension",
      "REQUEST FOR DEADLINE EXTENSION",
      "ApplicationNo"
    );
  }
  handleSubmitDeadlinerequest = event => {
    event.preventDefault();
    const data = {
      Newdate: this.state.NewDeadLine,
      ApplicationNo: this.state.ApplicationNo,
      Reason: this.state.Reason,
      UserID: localStorage.getItem("UserName")
    };
    fetch("/api/PEResponse/DeadlineExtension", {
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
            swal("", "Request Submited", "success");            
            if (data.results) {

              let NewList = [data.results]
              NewList[0].map((item, key) => {
                
                this.notifyPanelmembers(item.Phone, item.Name, item.Email)
                
              }
              )
            } else {

            }

            window.location = "#/PEApplications";
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  handleInputChange = event => {
    // event.preventDefault();
    // this.setState({ [event.target.name]: event.target.value });
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  SavePEResponseDetails(ResponseID) {
    const data = {
      PERsponseID: ResponseID,
      GrounNo: this.state.GroundNo,

      Groundtype: this.state.Groundtype,
      Response: this.state.GroundResponse,
      UserID: localStorage.getItem("UserName")
    };
    fetch("/api/PEResponse/Details", {
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
            this.fetchResponseDetails();
            swal("", "Your Response has been added!", "success");
            this.setState({ GroundResponse: " ", grounddesc: " " });
          } else {
            swal("", "Could not be added", "success");
          }
        })
      )
      .catch(err => {
        swal("", "Could not be added", "success");
        // toast.error(err.message);
      });
  }
  SavePaymentdetails = () => {
    if (!this.state.DateofPayment) {
      swal("", "Date of payment is required", "error");
      return;
    }
    if (!this.state.PaymentReference) {
      swal("", "Reference is required", "error");
      return;
    }
    if (!this.state.AmountPaid) {
      swal("", "Amount paid is required", "error");
      return;
    }
    if (!this.state.PaidBy) {
      swal("", "Paid by is required", "error");
      return;
    }
    if (+this.state.TotalAmountdue > +this.state.AmountPaid) {
      toast.warn("Amount paid is less than amount due");
    }
    let data = {
      ApplicationID: this.state.ApplicationID,
      Paidby: this.state.PaidBy,
      Reference: this.state.PaymentReference,
      DateOfpayment: this.state.DateofPayment,
      AmountPaid: this.state.AmountPaid,
      PaymentType: this.state.PaymentType,
      ChequeDate: this.state.ChequeDate,
      CHQNO: this.state.CHQNO,
      Category: "PreliminaryObjectionsFees"
    };
    fetch("/api/applicationfees/1/Paymentdetails", {
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
            this.setState({ openPaymentModal: false });
            toast.success("Payment details save successfuly");
            this.fetchPreliminaryObjectionsFeesPaymentDetails();
          } else {
            toast.error(data.message);
          }
        })
      )
      .catch(err => {
        toast.error(err.message);
      });
  };

  SavePEResponse(url = ``, data = {}) {
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
            if (data.ResponseID[0].msg === "Already Responded") {
              this.setState({ ResponseID: data.ResponseID[0].ID });
              this.setState({ InitialSubmision: false });
              this.SavePEResponseDetails(data.ResponseID[0].ID);
            } else {
              this.setState({ ResponseID: data.ResponseID[0].ID });
              this.setState({ InitialSubmision: false });
              this.SavePEResponseDetails(data.ResponseID[0].ID);
            }
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  }
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
          this.setState({ Applicationfees: [] });
          this.setState({ Applicationfees: Applicationfees });
          this.setState({ TotalAmountdue: Applicationfees[0].total });
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchPreliminaryObjectionsFeesPaymentDetails = () => {
    this.setState({ PreliminaryObjectionsFeesPaymentDetails: [] });
    fetch(
      "/api/applicationfees/" +
        this.state.ApplicationID +
        "/PreliminaryObjectionsFeesPaymentDetails",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }
    )
      .then(res => res.json())
      .then(PreliminaryObjectionsFeesPaymentDetails => {
        if (PreliminaryObjectionsFeesPaymentDetails.length > 0) {
          this.setState({
            PreliminaryObjectionsFeesPaymentDetails: PreliminaryObjectionsFeesPaymentDetails
          });
        } else {
          toast.error(PreliminaryObjectionsFeesPaymentDetails.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchPreliminaryObjectionsFees = () => {
    this.setState({ PreliminaryObjectionsFees: [] });
    fetch("/api/applicationfees/1/PreliminaryObjectionsFees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(PreliminaryObjectionsFees => {
        if (PreliminaryObjectionsFees.length > 0) {
          this.setState({
            PreliminaryObjectionsFees: PreliminaryObjectionsFees
          });
        } else {
          toast.error(PreliminaryObjectionsFees.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchinterestedparties = () => {
    // this.setState({ interestedparties: [] });
    // fetch("/api/interestedparties/" + this.state.ApplicationID, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-access-token": localStorage.getItem("token")
    //   }
    // })
    //   .then(res => res.json())
    //   .then(interestedparties => {
    //     if (interestedparties.length > 0) {
    //       this.setState({ interestedparties: interestedparties });
    //     } else {
    //       toast.error(interestedparties.message);
    //     }
    //   })
    //   .catch(err => {
    //     toast.error(err.message);
    //   });
  };
  fetchBanks = () => {
    this.setState({ Banks: [] });

    fetch("/api/Banks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Banks => {
        if (Banks.length > 0) {
          this.setState({ Banks: Banks });
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
              this.fetchinterestedparties();
              this.fetchPreliminaryObjectionsFees();


           
              this.fetchBanks();
              this.fetchPaymentTypes();
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
  handleGround = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/PEResponse/" + d.ID, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                toast.success("Removed ");
                this.fetchResponseDetails();
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
  formatNumber = num => {
    let newtot = Number(num).toFixed(2);
    return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
  handleDeleteBankSlip = d => {
    swal({
      text: "Are you sure that you want to remove this slip?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/applicationfees/" + d, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                var rows = [...this.state.BankSlips];
                const filtereddata = rows.filter(item => item.Name !== d);
                this.setState({ BankSlips: filtereddata });
                toast.success("Removed successfully");
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
  checkMimeType = event => {
    let files = event.target.files;
    let err = []; // create empty array
    const types = ["application/pdf"];
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] =
          files[x].type +
          " is not a supported format.Pfd files only are allowed\n";
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
      Path: process.env.REACT_APP_BASE_URL + "/Documents",
      Confidential: this.state.Confidential
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
            this.fetchResponseDocuments();
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
  CompletePreliminaryObjectionSubmision = event => {
    event.preventDefault();
    if (this.state.PreliminaryObjectionsFeesPaymentDetails.length > 0) {
      const data = {
        PEResponseID: this.state.ResponseID,
        ApplicationNo: this.state.ApplicationNo,
        UserID: localStorage.getItem("UserName")
      };
      fetch("/api/PEResponse/SubmitPePreliminaryObjection/1", {
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
              let NewList = [data.results];
              if (NewList.length > 0) {
                NewList[0].map((item, key) => {
                  if (item.Role === "Incomplete") {
                    let smstext =
                      "Dear " +
                      item.Name +
                      ".PE has submited payment details for Filling Preliminary Objection for application:" +
                      this.state.ApplicationNo +
                      ".You are required confirm the payment.";
                    this.SendSMS(item.Mobile, smstext);
                    this.SendMail(
                      item.Name,
                      item.Email,
                      "Preliminary Objections Fees Approval",
                      "FEES APPROVAL",
                      this.state.ApplicationNo
                    );
                  } else {
                    let smstext =
                      "Dear " +
                      item.Name +
                      ".A response for Application" +
                      this.state.ApplicationNo +
                      "has been sent by the Procuring Entity.";
                    this.SendSMS(item.Mobile, smstext);
                    this.SendMail(
                      item.Name,
                      item.Email,
                      "PEresponseOthers",
                      "PE RESPONSE: " + this.state.ApplicationNo,
                      this.state.ApplicationNo
                    );
                  }
                });
              }
              swal("", "Your Response has been submited!", "success");
              window.location = "#/MyResponse";
            } else {
              swal("", "Your response could not be submited!", "error");
            }
          })
        )
        .catch(err => {
          swal("Oops!", err.message, "error");
        });
    } else {
      swal(
        "",
        "Preliminary Objection can only be submited after submiting payment details.",
        "error"
      );
    }
  };
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
            let NewList = [data.results];
            if (NewList.length > 0) {
              NewList[0].map((item, key) => {
                if (item.Role === "Case officer") {
                  let smstext =
                    "Dear " +
                    item.Name +
                    ".PE has submited a response for Application" +
                    this.state.ApplicationNo +
                    ".You are required to form a panel and submit it for review.";
                  this.SendSMS(item.Mobile, smstext);
                  this.SendMail(
                    item.Name,
                    item.Email,
                    "PEresponseCaseOfficer",
                    "PE RESPONSE: " + this.state.ApplicationNo,
                    this.state.ApplicationNo
                  );
                } else if (item.Role === "PE") {
                  let smstext =
                    "Dear " +
                    item.Name +
                    ".Your response for Application" +
                    this.state.ApplicationNo +
                    "has been received.You will be notified when hearing date will be set.";
                  this.SendSMS(item.Mobile, smstext);
                  this.SendMail(
                    item.Name,
                    item.Email,
                    "PEresponsePE",
                    "PE RESPONSE: " + this.state.ApplicationNo,
                    this.state.ApplicationNo
                  );
                } else {
                  let smstext =
                    "Dear " +
                    item.Name +
                    ".A response for Application" +
                    this.state.ApplicationNo +
                    "has been sent by the Procuring Entity.";
                  this.SendSMS(item.Mobile, smstext);
                  this.SendMail(
                    item.Name,
                    item.Email,
                    "PEresponseOthers",
                    "PE RESPONSE: " + this.state.ApplicationNo,
                    this.state.ApplicationNo
                  );
                }
              });
            }
            swal("", "Your Response has been submited!", "success");
            // send email and sms to ppra
            //and redirect to response
            window.location = "#/MyResponse";
          } else {
            swal("", "Your response could not be submited!", "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  closeAddInterestedParty = () => {
    this.setState({ AddInterestedParty: false });
  };
  handleDeleteInterestedparty = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/interestedparties/" + d.ID, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                toast.success("Removed successfully");
                this.fetchinterestedparties(this.state.ApplicationID);
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
  AddNewInterestedparty = () => {
    this.setState({ AddInterestedParty: true });
  };
  handleInterestedPartySubmit = event => {
    event.preventDefault();

    if (this.state.ApplicationID) {
      let datatosave = {
        Name: this.state.InterestedPartyName,
        ApplicationID: this.state.ApplicationID,
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
      fetch("/api/interestedparties", {
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
              var rows = this.state.interestedparties;
              rows.push(datatosave);
              this.setState({ interestedparties: rows });
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
          swal("", "Could not be added please try again", "error");
        });
    } else {
      swal(
        "",
        "Please ensure You have an selected an application to respond to.",
        "error"
      );
    }
  };
  closeRequestModal = () => {
    this.setState({ openRequest: false });
  };
  closeGroundsModal = () => {
    this.setState({ open: false });
  };
  OpenGroundsModal = e => {
    e.preventDefault();
    this.setState({
      open: true,
      Groundtype: "Grounds",
      grounddesc: "",
      GroundResponse: ""
    });
  };
  OpenbackgroundInformation = e => {
    e.preventDefault();
    this.setState({ BackgroundInfo: true });
  };
  handleEditBackgroundInformation = () => {
    this.setState({ BackgroundInfo: true });
  };
  closebackgroundInformation = () => {
    this.setState({ BackgroundInfo: false });
  };
  OpenRequestsModal = e => {
    e.preventDefault();
    this.setState({
      open: true,
      Groundtype: "Prayers",
      grounddesc: "",
      GroundResponse: ""
    });
  };
  openInterestedPartiesTab() {
    document.getElementById("nav-InterestedParties-tab").click();
  }
  ClosePaymentModal = () => {
    this.setState({ openPaymentModal: false });
  };
  OpenPaymentModal = () => {
    this.setState({ openPaymentModal: true });
  };
  render() {
    let headingstyle = {
      color: "#7094db"
    };
    let divstyle = {
      margin: "50",

      "padding-left": 40,
      "padding-right": 40,
      "padding-top": 20
    };
    let formcontainerStyle = {
      border: "1px solid grey",
      "border-radius": "10px",
      background: "white"
    };
    let FormStyle = {
      margin: "10px"
    };
    let childdiv = {
      margin: "10px"
    };

    let Grounds = [...this.state.ApplicationGrounds].map((k, i) => {
      return {
        value: k.GroundNO,
        label: k.GroundNO
      };
    });
    let ApplicationPrayers = [...this.state.ApplicationRequests].map((k, i) => {
      return {
        value: k.GroundNO,
        label: k.GroundNO
      };
    });
    let paymenttypes = [...this.state.paymenttypes].map((k, i) => {
      return {
        value: k.ID,
        label: k.Description
      };
    });
    let Actions = [
      {
        value: "Memorandum of Response",
        label: "Memorandum of Response"
      },
      {
        value: "Preliminary Objection",
        label: "Preliminary Objection"
      },
      {
        value: "Request Extension of deadline",
        label: "Request Extension of deadline"
      }
    ];
    let handleDeleteDocument = this.handleDeleteDocument;
    return (
      <div>
        <ToastContainer />
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <h2 className="font-weight-bold">
                  APPLICATION NO: {this.state.ApplicationNo}
                </h2>
              </li>
            </ol>
          </div>
          <div className="col-lg-2">
            <div className="row wrapper ">
              <Link to="/PEApplications">
                <button
                  style={{ margin: "10px" }}
                  type="button"
                  className="btn btn-warning float-right "
                >
                  Close
                </button>
              </Link>
            </div>
          </div>
        </div>
        <p></p>

        <div className="row">
          {/* <div className="col-lg-1"></div> */}
          <div className="col-lg-12 ">
            <h3 style={headingstyle}>{this.state.Action}</h3>
            <div className="col-lg-12 ">
              <div style={formcontainerStyle}>
                {this.state.showAction ? (
                  <form style={divstyle}>
                    <div class="row">
                      <div class="col-sm-6">
                        <label for="Location" className="font-weight-bold">
                          Select Action
                        </label>

                        <Select
                          name="Action"
                          // value={Counties.filter(
                          //     option =>
                          //         option.label === this.state.County
                          // )}
                          onChange={this.handleSelectChange}
                          options={Actions}
                          required
                        />
                      </div>
                    </div>
                    <br />
                  </form>
                ) : null}
                <br />
                {this.state.Action === "Request Extension of deadline" ? (
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
                            style={divstyle}
                            onSubmit={this.handleSubmitDeadlinerequest}
                          >
                            <div classname="row">
                              <div class="col-sm-6">
                                <label
                                  for="Location"
                                  className="font-weight-bold"
                                >
                                  Requested Deadline
                                </label>
                                {this.state.ApplicationClosingDate ? (
                                  <input
                                    type="date"
                                    name="NewDeadLine"
                                    required
                                    defaultValue={this.state.NewDeadLine}
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    max={dateFormat(
                                      new Date(
                                        this.state.ApplicationClosingDate
                                      ).toLocaleDateString(),
                                      "isoDate"
                                    )}
                                  />
                                ) : null}
                              </div>
                            </div>
                            <br />
                            <div classname="row">
                              <div class="col-sm-12">
                                <label for="Name" className="font-weight-bold">
                                  Reason
                                </label>
                                <CKEditor
                                  onChange={this.onDeadlineEditorChange}
                                />
                              </div>
                            </div>
                            <br />
                            <div class="row">
                              <div className="col-sm-11"></div>
                              <div className="col-sm-1">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.state.Action === "Memorandum of Response" ? (
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
                        {" "}
                        <div style={FormStyle}>
                          <Modal
                            visible={this.state.BackgroundInfo}
                            width="80%"
                            height="500px"
                            effect="fadeInUp"
                          >
                            <div
                              style={{
                                "overflow-y": "scroll",
                                height: "450px"
                              }}
                            >
                              <a
                                style={{
                                  float: "right",
                                  color: "red",
                                  margin: "10px"
                                }}
                                href="javascript:void(0);"
                                onClick={() =>
                                  this.closebackgroundInformation()
                                }
                              >
                                <i class="fa fa-close"></i>
                              </a>
                              <h3
                                style={{
                                  "text-align": "center",
                                  color: "#1c84c6"
                                }}
                              >
                                Background Information
                              </h3>
                              <hr />
                              <div className="container-fluid">
                                <div className="col-sm-12">
                                  <div className="scroll">
                                    <form
                                      style={FormStyle}
                                      onSubmit={this.SaveBackgroundInformation}
                                    >
                                      <div class="row">
                                        <div class="col-sm-12">
                                          <label
                                            style={headingstyle}
                                            for="Location"
                                            className="font-weight-bold"
                                          >
                                            Background Information
                                          </label>
                                          <CKEditor
                                            data={
                                              this.state.BackgroundInformation
                                            }
                                            onChange={
                                              this.onBackgroundEditorChange
                                            }
                                          />
                                        </div>
                                      </div>

                                      <br />
                                      <div className=" row">
                                        <div className="col-sm-10" />
                                        <div className="col-sm-2">
                                          <button
                                            type="submit"
                                            className="btn btn-primary float-right"
                                          >
                                            Save
                                          </button>
                                          &nbsp;&nbsp;
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Modal>
                          <Modal
                            visible={this.state.open}
                            width="80%"
                            height="650px"
                            effect="fadeInUp"
                          >
                            <div
                              style={{
                                "overflow-y": "scroll",
                                height: "600px"
                              }}
                            >
                              <a
                                style={{
                                  float: "right",
                                  color: "red",
                                  margin: "10px"
                                }}
                                href="javascript:void(0);"
                                onClick={() => this.closeGroundsModal()}
                              >
                                <i class="fa fa-close"></i>
                              </a>
                              <h3
                                style={{
                                  "text-align": "center",
                                  color: "#1c84c6"
                                }}
                              >
                                Respond to {this.state.Groundtype}
                              </h3>
                              <hr />
                              <div className="container-fluid">
                                <div className="col-sm-12">
                                  <div className="scroll">
                                    <form
                                      style={FormStyle}
                                      onSubmit={this.SaveNoObjectionResponse}
                                    >
                                      <div class="row">
                                        <div class="col-sm-4">
                                          <label
                                            style={headingstyle}
                                            for="Location"
                                            className="font-weight-bold"
                                          >
                                            Select Ground
                                          </label>
                                          {this.state.Groundtype ===
                                          "Grounds" ? (
                                            <Select
                                              name="GroundNo"
                                              onChange={this.handleSelectChange}
                                              options={Grounds}
                                              required
                                            />
                                          ) : (
                                            <Select
                                              name="GroundNoPrayers"
                                              onChange={this.handleSelectChange}
                                              options={ApplicationPrayers}
                                              required
                                            />
                                          )}
                                        </div>
                                      </div>

                                      <h3 style={headingstyle}>
                                        Ground Description
                                      </h3>

                                      <div class="row">
                                        <div class="col-sm-12">
                                          <br />
                                          {ReactHtmlParser(
                                            this.state.grounddesc
                                          )}
                                        </div>
                                      </div>

                                      <div class="row">
                                        <div class="col-sm-12">
                                          <b style={headingstyle}>
                                            Our Response
                                          </b>
                                          <br />
                                          <CKEditor
                                            data={this.state.GroundResponse}
                                            onChange={this.onEditorChange}
                                          />
                                        </div>
                                      </div>
                                      <br />
                                      <div className=" row">
                                        <div className="col-sm-10" />
                                        <div className="col-sm-2">
                                          <button
                                            type="submit"
                                            className="btn btn-primary"
                                          >
                                            Save
                                          </button>
                                          &nbsp;&nbsp;
                                          <button
                                            type="button"
                                            onClick={this.closeGroundsModal}
                                            className="btn btn-danger"
                                          >
                                            {" "}
                                            Close
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                    <br />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Modal>
                          <label for="Name" className="font-weight-bold">
                            1.Add Background Information &nbsp; &nbsp; &nbsp;
                            &nbsp;
                          </label>
                          <button
                            className="btn btn-info"
                            type="button"
                            onClick={this.OpenbackgroundInformation}
                          >
                            Add
                          </button>
                          <br />
                          <br />
                          <div className="row">
                            <table className="table table-striped table-sm">
                              <thead className="thead-light">
                                <th>Background Information</th>
                                <th>Action</th>
                              </thead>

                              <tr>
                                <td>
                                  {ReactHtmlParser(
                                    this.state.BackgroundInformation
                                  )}
                                </td>
                                <td>
                                  {this.state.BackgroundInformation ? (
                                    <span>
                                      <a
                                        style={{ color: "#3352FF" }}
                                        onClick={e =>
                                          this.handleEditBackgroundInformation(
                                            e
                                          )
                                        }
                                      >
                                        &nbsp; Edit
                                      </a>
                                    </span>
                                  ) : null}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <label for="Name" className="font-weight-bold">
                            2.Respond to Grounds for appeal &nbsp; &nbsp; &nbsp;
                            &nbsp;
                          </label>
                          <button
                            className="btn btn-info"
                            type="button"
                            onClick={this.OpenGroundsModal}
                          >
                            Add
                          </button>
                          <br />
                          <br />
                          <div className="row">
                            <table className="table table-striped table-sm">
                              <thead className="thead-light">
                                <th>GroundNO</th>

                                <th>Response</th>
                                <th>Action</th>
                              </thead>
                              {this.state.GroundsDetails.map((r, i) => (
                                <tr>
                                  <td className="font-weight-bold">
                                    {r.GroundNO}
                                  </td>

                                  <td>{ReactHtmlParser(r.Response)}</td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e => this.handleGround(r, e)}
                                      >
                                        &nbsp; Remove
                                      </a>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>

                          <br />
                          <label for="Name" className="font-weight-bold">
                            3.Respond to Requested Orders &nbsp; &nbsp; &nbsp;
                            &nbsp;
                          </label>
                          <button
                            className="btn btn-info"
                            type="button"
                            onClick={this.OpenRequestsModal}
                          >
                            Add
                          </button>
                          <br />
                          <br />
                          <div className="row">
                            <table className="table table-striped table-sm">
                              <thead class="thead-light">
                                <th>OrderNo</th>

                                <th>Response</th>
                                <th>Action</th>
                              </thead>
                              {this.state.PrayersDetails.map((r, i) => (
                                <tr>
                                  <td className="font-weight-bold">
                                    {r.GroundNO}
                                  </td>

                                  <td>{ReactHtmlParser(r.Response)}</td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e => this.handleGround(r, e)}
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
                        <br />
                        <div className="row">
                          <div className="col-sm-11"></div>
                          <div className="col-sm-1">
                            <button
                              type="button"
                              onClick={this.openInterestedPartiesTab}
                              className="btn btn-success"
                            >
                              {" "}
                              &nbsp; &nbsp; Next &nbsp; &nbsp;
                            </button>
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
                        <Modal
                          visible={this.state.AddInterestedParty}
                          width="900"
                          height="450"
                          effect="fadeInUp"
                        >
                          <a
                            style={{
                              float: "right",
                              color: "red",
                              margin: "10px"
                            }}
                            href="javascript:void(0);"
                            onClick={() => this.closeAddInterestedParty()}
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
                              Interested Party
                            </h4>
                            <div className="container-fluid">
                              <div className="col-sm-12">
                                <div className="ibox-content">
                                  <form
                                    onSubmit={this.handleInterestedPartySubmit}
                                  >
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
                                              value={
                                                this.state.InterestedPartyName
                                              }
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
                                                this.state
                                                  .InterestedPartyContactName
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
                                                this.state
                                                  .InterestedPartyDesignation
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
                                              value={
                                                this.state.InterestedPartyEmail
                                              }
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
                                              value={
                                                this.state.InterestedPartyMobile
                                              }
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
                                                this.state
                                                  .InterestedPartyTelePhone
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
                                              value={
                                                this.state.InterestedPartyPOBox
                                              }
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
                                                this.state
                                                  .InterestedPartyPostalCode
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
                                              value={
                                                this.state.InterestedPartyTown
                                              }
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
                                            onClick={
                                              this.closeAddInterestedParty
                                            }
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
                        </Modal>

                        <div style={formcontainerStyle}>
                          <div style={FormStyle}>
                            <h3 style={headingstyle}>Interested Parties</h3>

                            <div className="row">
                              <div class="col-sm-11">
                                <table className="table table-sm">
                                  <thead class="thead-light">
                                    <th>Org Name</th>
                                    <th>ContactName</th>
                                    <th>Designation</th>
                                    <th>Email</th>
                                    <th>TelePhone</th>
                                    <th>Mobile</th>
                                    <th>PhysicalAddress</th>
                                    <th>Actions</th>
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
                                      <td>
                                        {" "}
                                        <span>
                                          <a
                                            style={{ color: "#f44542" }}
                                            onClick={e =>
                                              this.handleDeleteInterestedparty(
                                                r,
                                                e
                                              )
                                            }
                                          >
                                            &nbsp; Remove
                                          </a>
                                          {/* {this.state.alert} */}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </table>
                              </div>
                            </div>
                            <div className=" row">
                              <div className="col-sm-10" />
                              <div className="col-sm-2">
                                <button
                                  className="btn btn-primary"
                                  onClick={this.AddNewInterestedparty}
                                >
                                  ADD
                                </button>
                                &nbsp;
                                <button
                                  type="button"
                                  onClick={this.openAttachmentsTab}
                                  className="btn btn-success"
                                >
                                  {" "}
                                  &nbsp; Next
                                </button>
                                &nbsp;&nbsp;
                              </div>
                            </div>
                            <br />
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
                        <div style={formcontainerStyle}>
                          <form
                            style={FormStyle}
                            onSubmit={this.handleDocumentSubmit}
                          >
                            <div class="row">
                              <div class="col-sm-5">
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
                                  class="btn btn-success "
                                  // onClick={this.onClickHandler}
                                >
                                  Upload
                                </button>{" "}
                              </div>
                              <div class="col-sm-5">
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
                            <br />
                            <div className="row">
                              <table className="table table-sm-7">
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
                              <div className="col-sm-9" />

                              <div className="col-sm-3">
                                <button
                                  type="button"
                                  onClick={this.CompleteSubmision}
                                  className="btn btn-primary"
                                >
                                  {" "}
                                  SUBMIT NOW
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/PEApplications">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    &nbsp; Close
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {this.state.Action === "Preliminary Objection" ? (
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
                          id="nav-profile-tab"
                          data-toggle="tab"
                          href="#nav-profile"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                        >
                          Attachements
                        </a>
                        <a
                          class="nav-item nav-link font-weight-bold"
                          id="nav-Fees-tab"
                          data-toggle="tab"
                          href="#nav-Fees"
                          role="tab"
                          aria-controls="nav-Fees"
                          aria-selected="false"
                        >
                          FEES
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
                        {" "}
                        <div style={FormStyle}>
                          <Modal
                            visible={this.state.BackgroundInfo}
                            width="80%"
                            height="500px"
                            effect="fadeInUp"
                          >
                            <div
                              style={{
                                "overflow-y": "scroll",
                                height: "450px"
                              }}
                            >
                              <a
                                style={{
                                  float: "right",
                                  color: "red",
                                  margin: "10px"
                                }}
                                href="javascript:void(0);"
                                onClick={() =>
                                  this.closebackgroundInformation()
                                }
                              >
                                <i class="fa fa-close"></i>
                              </a>
                              <h3
                                style={{
                                  "text-align": "center",
                                  color: "#1c84c6"
                                }}
                              >
                                Background Information
                              </h3>
                              <hr />
                              <div className="container-fluid">
                                <div className="col-sm-12">
                                  <div className="scroll">
                                    <form
                                      style={FormStyle}
                                      onSubmit={this.SaveBackgroundInformation}
                                    >
                                      <div class="row">
                                        <div class="col-sm-12">
                                          <label
                                            style={headingstyle}
                                            for="Location"
                                            className="font-weight-bold"
                                          >
                                            Background Information
                                          </label>
                                          <CKEditor
                                            data={
                                              this.state.BackgroundInformation
                                            }
                                            onChange={
                                              this.onBackgroundEditorChange
                                            }
                                          />
                                        </div>
                                      </div>

                                      <br />
                                      <div className=" row">
                                        <div className="col-sm-10" />
                                        <div className="col-sm-2">
                                          <button
                                            type="submit"
                                            className="btn btn-primary float-right"
                                          >
                                            Save
                                          </button>
                                          &nbsp;&nbsp;
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Modal>
                          <Modal
                            visible={this.state.open}
                            width="80%"
                            height="650px"
                            effect="fadeInUp"
                          >
                            <div
                              style={{
                                "overflow-y": "scroll",
                                height: "600px"
                              }}
                            >
                              <a
                                style={{
                                  float: "right",
                                  color: "red",
                                  margin: "10px"
                                }}
                                href="javascript:void(0);"
                                onClick={() => this.closeGroundsModal()}
                              >
                                <i class="fa fa-close"></i>
                              </a>
                              <div>
                                <h3
                                  style={{
                                    "text-align": "center",
                                    color: "#1c84c6"
                                  }}
                                >
                                  Respond to {this.state.Groundtype}
                                </h3>
                                <hr />
                                <div className="container-fluid">
                                  <div className="col-sm-12">
                                    <div className="scroll">
                                      <form
                                        style={FormStyle}
                                        onSubmit={this.SaveNoObjectionResponse}
                                      >
                                        <div class="row">
                                          <div class="col-sm-4">
                                            <label
                                              style={headingstyle}
                                              for="Location"
                                              className="font-weight-bold"
                                            >
                                              Select Ground
                                            </label>
                                            {this.state.Groundtype ===
                                            "Grounds" ? (
                                              <Select
                                                name="GroundNo"
                                                onChange={
                                                  this.handleSelectChange
                                                }
                                                options={Grounds}
                                                required
                                              />
                                            ) : (
                                              <Select
                                                name="GroundNoPrayers"
                                                onChange={
                                                  this.handleSelectChange
                                                }
                                                options={ApplicationPrayers}
                                                required
                                              />
                                            )}
                                          </div>
                                        </div>
                                        <h3 style={headingstyle}>
                                          Ground Description
                                        </h3>

                                        <div class="row">
                                          <div class="col-sm-12">
                                            <br />
                                            {ReactHtmlParser(
                                              this.state.grounddesc
                                            )}
                                          </div>
                                        </div>

                                        <div class="row">
                                          <div class="col-sm-12">
                                            <b style={headingstyle}>
                                              Our Response
                                            </b>
                                            <br />
                                            <CKEditor
                                              data={this.state.GroundResponse}
                                              onChange={this.onEditorChange}
                                            />
                                          </div>
                                        </div>
                                        <br />
                                        <div className=" row">
                                          <div className="col-sm-10" />
                                          <div className="col-sm-2">
                                            <button
                                              type="submit"
                                              className="btn btn-primary"
                                            >
                                              Save
                                            </button>
                                            &nbsp;&nbsp;
                                            <button
                                              type="button"
                                              onClick={this.closeGroundsModal}
                                              className="btn btn-danger"
                                            >
                                              {" "}
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
                          </Modal>
                          <label for="Name" className="font-weight-bold">
                            1.Add Background Information &nbsp; &nbsp; &nbsp;
                            &nbsp;
                          </label>
                          <button
                            className="btn btn-info"
                            type="button"
                            onClick={this.OpenbackgroundInformation}
                          >
                            Add
                          </button>
                          <br />
                          <br />
                          <div className="row">
                            <table className="table table-striped table-sm">
                              <thead className="thead-light">
                                <th>Background Information</th>
                                <th>Action</th>
                              </thead>

                              <tr>
                                <td className="font-weight-bold">
                                  {ReactHtmlParser(
                                    this.state.BackgroundInformation
                                  )}
                                </td>
                                <td>
                                  {this.state.BackgroundInformation ? (
                                    <span>
                                      <a
                                        style={{ color: "#3352FF" }}
                                        onClick={e =>
                                          this.handleEditBackgroundInformation(
                                            e
                                          )
                                        }
                                      >
                                        &nbsp; Edit
                                      </a>
                                    </span>
                                  ) : null}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <label for="Name" className="font-weight-bold">
                            2.Respond to Grounds for appeal &nbsp; &nbsp; &nbsp;
                            &nbsp;
                          </label>
                          <button
                            className="btn btn-info"
                            type="button"
                            onClick={this.OpenGroundsModal}
                          >
                            Add
                          </button>
                          <br />
                          <br />
                          <div className="row">
                            <table className="table table-striped table-sm">
                              <thead class="thead-light">
                                <th>GroundNO</th>

                                <th>Response</th>
                                <th>Action</th>
                              </thead>
                              {this.state.GroundsDetails.map((r, i) => (
                                <tr>
                                  <td className="font-weight-bold">
                                    {r.GroundNO}
                                  </td>

                                  <td className="font-weight-bold">
                                    {ReactHtmlParser(r.Response)}
                                  </td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e => this.handleGround(r, e)}
                                      >
                                        &nbsp; Remove
                                      </a>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>

                          <br />
                          <label for="Name" className="font-weight-bold">
                            2.Respond to Requested Orders &nbsp; &nbsp; &nbsp;
                            &nbsp;
                          </label>
                          <button
                            className="btn btn-info"
                            type="button"
                            onClick={this.OpenRequestsModal}
                          >
                            Add
                          </button>
                          <br />
                          <br />
                          <div className="row">
                            <table className="table table-striped table-sm">
                              <thead class="thead-light">
                                <th>OrderNo</th>

                                <th>Response</th>
                                <th>Action</th>
                              </thead>
                              {this.state.PrayersDetails.map((r, i) => (
                                <tr>
                                  <td className="font-weight-bold">
                                    {r.GroundNO}
                                  </td>

                                  <td className="font-weight-bold">
                                    {ReactHtmlParser(r.Response)}
                                  </td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e => this.handleGround(r, e)}
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
                        <br />
                        <div className="row">
                          <div className="col-sm-11"></div>
                          <div className="col-sm-1">
                            <button
                              type="button"
                              onClick={this.openInterestedPartiesTab}
                              className="btn btn-success"
                            >
                              {" "}
                              &nbsp; &nbsp; Next &nbsp; &nbsp;
                            </button>
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
                        <Modal
                          visible={this.state.AddInterestedParty}
                          width="900"
                          height="450"
                          effect="fadeInUp"
                          onClickAway={() => this.closeAddInterestedParty()}
                        >
                          <div style={{ "overflow-y": "scroll" }}>
                            <a
                              style={{
                                float: "right",
                                color: "red",
                                margin: "10px"
                              }}
                              href="javascript:void(0);"
                              onClick={() => this.closeAddInterestedParty()}
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
                                Interested Party
                              </h4>
                              <div className="container-fluid">
                                <div className="col-sm-12">
                                  <div className="ibox-content">
                                    <form
                                      onSubmit={
                                        this.handleInterestedPartySubmit
                                      }
                                    >
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state.InterestedPartyName
                                                }
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state
                                                    .InterestedPartyContactName
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state
                                                    .InterestedPartyDesignation
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state
                                                    .InterestedPartyEmail
                                                }
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state
                                                    .InterestedPartyMobile
                                                }
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state
                                                    .InterestedPartyTelePhone
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state
                                                    .InterestedPartyPOBox
                                                }
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state
                                                    .InterestedPartyPostalCode
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
                                                onChange={
                                                  this.handleInputChange
                                                }
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
                                                onChange={
                                                  this.handleInputChange
                                                }
                                                value={
                                                  this.state.InterestedPartyTown
                                                }
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
                                              onClick={
                                                this.closeAddInterestedParty
                                              }
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
                        </Modal>

                        <div style={formcontainerStyle}>
                          <div style={FormStyle}>
                            <h3 style={headingstyle}>Interested Parties</h3>

                            <div className="row">
                              <div class="col-sm-11">
                                <table className="table table-sm">
                                  <th>Org Name</th>
                                  <th>ContactName</th>
                                  <th>Designation</th>
                                  <th>Email</th>
                                  <th>TelePhone</th>
                                  <th>Mobile</th>
                                  <th>PhysicalAddress</th>
                                  <th>Actions</th>

                                  {this.state.interestedparties.map((r, i) => (
                                    <tr>
                                      <td>{r.Name}</td>
                                      <td> {r.ContactName} </td>
                                      <td> {r.Designation} </td>
                                      <td> {r.Email} </td>
                                      <td> {r.TelePhone} </td>
                                      <td> {r.Mobile} </td>
                                      <td> {r.PhysicalAddress} </td>
                                      <td>
                                        {" "}
                                        <span>
                                          <a
                                            style={{ color: "#f44542" }}
                                            onClick={e =>
                                              this.handleDeleteInterestedparty(
                                                r,
                                                e
                                              )
                                            }
                                          >
                                            &nbsp; Remove
                                          </a>
                                          {/* {this.state.alert} */}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </table>
                              </div>
                            </div>
                            <div className=" row">
                              <div className="col-sm-9" />
                              <div className="col-sm-3">
                                <button
                                  className="btn btn-primary"
                                  onClick={this.AddNewInterestedparty}
                                >
                                  ADD
                                </button>
                                &nbsp;
                                <button
                                  type="button"
                                  onClick={this.openAttachmentsTab}
                                  className="btn btn-success"
                                >
                                  {" "}
                                  &nbsp; Next
                                </button>
                                &nbsp;&nbsp;
                              </div>
                            </div>
                            <br />
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
                        <div style={formcontainerStyle}>
                          <form
                            style={FormStyle}
                            onSubmit={this.handleDocumentSubmit}
                          >
                            <div class="row">
                              <div class="col-sm-5">
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
                                  class="btn btn-success "
                                  // onClick={this.onClickHandler}
                                >
                                  Upload
                                </button>{" "}
                              </div>
                              <div class="col-sm-5">
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
                            <br />
                            <div className="row">
                              <table className="table table-sm-7">
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
                              <div className="col-sm-11" />

                              <div className="col-sm-1">
                                <button
                                  type="button"
                                  onClick={this.OpenFeesTab}
                                  className="btn btn-success"
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
                        id="nav-Fees"
                        role="tabpanel"
                        style={childdiv}
                        aria-labelledby="nav-Fees-tab"
                      >
                        <div style={formcontainerStyle}>
                          <Modal
                            visible={this.state.openPaymentModal}
                            width="900"
                            height="550"
                            effect="fadeInUp"
                          >
                            <div
                              style={{
                                "overflow-y": "scroll",
                                height: "545px"
                              }}
                            >
                              <a
                                style={{
                                  float: "right",
                                  color: "red",
                                  margin: "10px"
                                }}
                                href="javascript:void(0);"
                                onClick={() => this.ClosePaymentModal()}
                              >
                                <i class="fa fa-close"></i>
                              </a>
                              <div>
                                <ToastContainer />
                                <h4
                                  style={{
                                    "text-align": "center",
                                    color: "#1c84c6"
                                  }}
                                >
                                  Payment Details
                                </h4>
                                <div className="container-fluid">
                                  <div className="col-sm-12">
                                    <div className="ibox-content">
                                      <div>
                                        <div className="col-lg-12 border border-success rounded">
                                          <div style={FormStyle}>
                                            <div className=" row">
                                              <div className="col-md-6">
                                                <div className="row">
                                                  <div className="col-md-4">
                                                    <label
                                                      htmlFor="exampleInputPassword1"
                                                      className="font-weight-bold"
                                                    >
                                                      Amount Paid
                                                    </label>
                                                  </div>
                                                  <div className="col-md-8">
                                                    <input
                                                      onChange={
                                                        this.handleInputChange
                                                      }
                                                      value={
                                                        this.state.AmountPaid
                                                      }
                                                      type="number"
                                                      required
                                                      step="0.01"
                                                      min="0"
                                                      name="AmountPaid"
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
                                                      Date of Payment
                                                    </label>
                                                  </div>
                                                  <div className="col-md-8">
                                                    <input
                                                      onChange={
                                                        this.handleInputChange
                                                      }
                                                      value={
                                                        this.state.DateofPayment
                                                      }
                                                      type="date"
                                                      required
                                                      name="DateofPayment"
                                                      className="form-control"
                                                      max={this.state.Today}
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
                                                      {" "}
                                                      Payment Type
                                                    </label>
                                                  </div>
                                                  <div className="col-md-8">
                                                    <Select
                                                      name="PaymentType"
                                                      value={this.state.PEID}
                                                      value={paymenttypes.filter(
                                                        option =>
                                                          option.value ===
                                                          this.state.PaymentType
                                                      )}
                                                      //defaultInputValue={this.state.TenderType}
                                                      onChange={
                                                        this.handleSelectChange
                                                      }
                                                      options={paymenttypes}
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
                                                      Payment Reference
                                                    </label>
                                                  </div>
                                                  <div className="col-md-8">
                                                    <input
                                                      onChange={
                                                        this.handleInputChange
                                                      }
                                                      value={
                                                        this.state
                                                          .PaymentReference
                                                      }
                                                      type="text"
                                                      required
                                                      name="PaymentReference"
                                                      className="form-control"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <br />
                                            {this.state.PaymentType == "4" ? (
                                              <div className=" row">
                                                <div className="col-md-6">
                                                  <div className="row">
                                                    <div className="col-md-4">
                                                      <label
                                                        htmlFor="exampleInputPassword1"
                                                        className="font-weight-bold"
                                                      >
                                                        {" "}
                                                        CHQNO
                                                      </label>
                                                    </div>
                                                    <div className="col-md-8">
                                                      <input
                                                        onChange={
                                                          this.handleInputChange
                                                        }
                                                        value={this.state.CHQNO}
                                                        type="text"
                                                        required
                                                        name="CHQNO"
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
                                                        ChequeDate
                                                      </label>
                                                    </div>
                                                    <div className="col-md-8">
                                                      <input
                                                        onChange={
                                                          this.handleInputChange
                                                        }
                                                        value={
                                                          this.state.ChequeDate
                                                        }
                                                        type="date"
                                                        required
                                                        name="ChequeDate"
                                                        className="form-control"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : null}
                                            <br />
                                            <div className=" row">
                                              <div className="col-md-6">
                                                <div className="row">
                                                  <div className="col-md-4">
                                                    {this.state.PaymentType ==
                                                    "1" ? (
                                                      <label
                                                        htmlFor="exampleInputPassword1"
                                                        className="font-weight-bold"
                                                      >
                                                        MobileNo
                                                      </label>
                                                    ) : (
                                                      <label
                                                        htmlFor="exampleInputPassword1"
                                                        className="font-weight-bold"
                                                      >
                                                        Paid By
                                                      </label>
                                                    )}
                                                  </div>
                                                  <div className="col-md-8">
                                                    <input
                                                      onChange={
                                                        this.handleInputChange
                                                      }
                                                      value={this.state.PaidBy}
                                                      type="text"
                                                      required
                                                      name="PaidBy"
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
                                                      Payment slip
                                                    </label>
                                                  </div>
                                                  <div className="col-md-8">
                                                    <input
                                                      type="file"
                                                      className="form-control"
                                                      name="file"
                                                      onChange={
                                                        this.onChangeHandler
                                                      }
                                                      multiple
                                                    />
                                                    <div class="form-group">
                                                      <Progress
                                                        max="100"
                                                        color="success"
                                                        value={
                                                          this.state.loaded
                                                        }
                                                      >
                                                        {Math.round(
                                                          this.state.loaded,
                                                          2
                                                        )}
                                                        %
                                                      </Progress>
                                                    </div>
                                                    <button
                                                      type="submit"
                                                      class="btn btn-success "
                                                      onClick={
                                                        this.UploadBankSlip
                                                      }
                                                    >
                                                      Upload
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                      type="button"
                                                      onClick={
                                                        this.SavePaymentdetails
                                                      }
                                                      className="btn btn-primary"
                                                    >
                                                      Save
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <br />
                                            <div class="row">
                                              <div className="col-md-12">
                                                <table className="table table-sm">
                                                  <th scope="col">Slip</th>
                                                  <th scope="col">Action</th>
                                                  {this.state.BankSlips.map(
                                                    (r, i) => (
                                                      <tr>
                                                        <td>{r.Name}</td>
                                                        <td>
                                                          <span>
                                                            <a
                                                              style={{
                                                                color: "#f44542"
                                                              }}
                                                              onClick={e =>
                                                                this.handleDeleteBankSlip(
                                                                  r.Name,
                                                                  e
                                                                )
                                                              }
                                                            >
                                                              &nbsp; Remove
                                                            </a>
                                                          </span>
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                          <div className="col-md-7"></div>
                                          <div className="col-md-5">
                                            <button
                                              type="button"
                                              className="btn btn-warning float-right"
                                              onClick={this.ClosePaymentModal}
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

                          <form
                            style={FormStyle}
                            onSubmit={this.handleDocumentSubmit}
                          >
                            <div className="row">
                              <div className="col-sm-8">
                                <h3 style={headingstyle}>Fees Details</h3>
                                <table className="table table-striped table-sm">
                                  <thead class="thead-light">
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                  </thead>
                                  {this.state.PreliminaryObjectionsFees.map(
                                    (r, i) => (
                                      <tr>
                                        <td className="font-weight-bold">
                                          {r.Description}
                                        </td>

                                        <td className="font-weight-bold">
                                          {r.MaxFee}
                                        </td>
                                        <td className="font-weight-bold">
                                          <button
                                            type="button"
                                            onClick={this.OpenPaymentModal}
                                            className="btn btn-success"
                                          >
                                            Add Payment Details
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </table>
                              </div>
                              <div
                                class="col-sm-4 "
                                style={{ backgroundColor: "#e9ecef" }}
                              >
                                <br />
                                <h3 style={headingstyle}>Payment Options</h3>
                                {this.state.Banks.map((r, i) => (
                                  <div>
                                    <tr>
                                      <td className="font-weight-bold">
                                        Bank:
                                      </td>
                                      <td>&nbsp;&nbsp;&nbsp;{r.Name}</td>
                                    </tr>
                                    <tr>
                                      <td className="font-weight-bold">
                                        Account/NO:
                                      </td>
                                      <td>&nbsp;&nbsp;&nbsp;{r.AcountNo}</td>
                                    </tr>
                                    <tr>
                                      <td className="font-weight-bold">
                                        Branch:
                                      </td>
                                      <td>&nbsp;&nbsp;&nbsp;{r.Branch}</td>
                                    </tr>
                                  </div>
                                ))}
                                <h3 style={headingstyle}>Mpesa</h3>
                                {this.state.Banks.map((r, i) => (
                                  <div>
                                    <tr>
                                      <td className="font-weight-bold">
                                        PayBill:
                                      </td>
                                      <td>&nbsp;&nbsp;&nbsp;{r.PayBill}</td>
                                    </tr>
                                    <tr>
                                      <td className="font-weight-bold">
                                        Account/NO:
                                      </td>
                                      <td>&nbsp;&nbsp;&nbsp;{r.AcountNo}</td>
                                    </tr>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-10">
                                <h3 style={headingstyle}>Payment Details</h3>
                                <table className="table table-striped table-sm">
                                  <thead class="thead-light">
                                    <th>DateOfpayment</th>
                                    <th>AmountPaid</th>
                                    <th>Reference</th>

                                    <th>Payment Type</th>
                                  </thead>
                                  {this.state.PreliminaryObjectionsFeesPaymentDetails.map(
                                    (r, i) => (
                                      <tr>
                                        <td className="font-weight-bold">
                                          {r.DateOfpayment}
                                        </td>

                                        <td className="font-weight-bold">
                                          {r.AmountPaid}
                                        </td>
                                        <td className="font-weight-bold">
                                          {r.Refference}
                                        </td>

                                        <td>{r.PaymentType}</td>
                                      </tr>
                                    )
                                  )}
                                </table>
                              </div>
                            </div>

                            <br />
                            <div className=" row">
                              <div className="col-sm-9" />

                              <div className="col-sm-3">
                                &nbsp;&nbsp;
                                <button
                                  type="button"
                                  onClick={
                                    this.CompletePreliminaryObjectionSubmision
                                  }
                                  className="btn btn-primary"
                                >
                                  {" "}
                                  SUBMIT NOW
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/PEApplications">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    &nbsp; Close
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
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
  }
}

export default PEResponse;

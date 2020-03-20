import React, { Component } from "react";
import swal from "sweetalert";
import Table from "./../../Table";
import TableWrapper from "./../../TableWrapper";
import Select from "react-select";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../Styles/tablestyle.css";
import CKEditor from "ckeditor4-react";
import ReactHtmlParser from "react-html-parser";
import Modal from "react-awesome-modal";
var _ = require("lodash");
let userdateils = localStorage.getItem("UserData");
let data = JSON.parse(userdateils);
var dateFormat = require("dateformat");
class Registration extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      Confidential: false,
      openRequest: false,
      Registration: [],
      Parent: [],
      Applications: [],
      PE: [],
      PaymentDetails: [],
      BankSlips: [],
      interestedparties: [],
      Banks:[],
      NextOFKin: [],
      Educational: [],
      MySiblings:[],
      IDNumber:""  ,
      Fullname:"" ,
      Gender:""  ,
      Phone:""  ,
      DOB:""  ,
      Email:""  ,
      Country:""  ,
      Passport:""  ,
      Religion:""  ,
      Marital:""  ,
      Height:""  ,
      Weight:"" ,
      Languages:"" ,
      Skills:"",
      Decription:"",
      Period:"",
      Institution:"",
      AddEducational:false,
      AddGuardians:false,
      AddNextOFKin:false,
      AddSiblings:false,
      EducationalInstitution:"",
      EducationalPeriod:"" ,
      EducationalDecription:"",
      GuardianName:"",
      GuardianIDNO:"",
      GuardianRelationship:"",
      NextOFKinName:"" ,
      NextOfRelationship:"",
      NextOfCurrentResident:"",
      NextOfContact:"" ,
      SiblingName:"",
      SiblingsSex:"" ,
       SiblingsAge:"",
       Institution:"",
       Decription: "",
       Name: "",
       ParentID:"",
       Relationship:"",
       KRelationship:"",
       Period: "",
       SiblingName: "",
       Age: "",
       Sex: "",
       KinName:"",
       CurrentResident:"",
       Contact:"",
      Today: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      TenderNo: "",
      TenderID: "",
      ApplicationCreated_By: "",
      TenderValue: 0,
      ApplicationID: "",
      TenderName: "",
      PaymentType:"",
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
      openPaymentModal: false,
      TenderTypes: [],
      selectedFile: null,
      loaded: 0,
      DocumentDescription: "",
      AddedAdendums: [],
      AdendumStartDate: "",
      RequestsAvailable: false,
      GroundsAvailable: false,
      AdendumsAvailable: false,
      AdendumClosingDate: "",
      AdendumNo: "",
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
      DocumentsAvailable: false,
      GroundNO: "",
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
      TenderType: "",
      ApplicantPostalCode: "",
      ApplicantPOBox: "",
      ApplicantTown: "",
      
      AddInterestedParty: false,
      alert: null,
      Timer: "",
      Unascertainable: false,
      Ascertainable: false,
      ShowPaymentDetails: false,
      Status:"",
      AmountPaid: "",
      DateofPayment: "",
      PaymentReference: "",
      PaidBy: "",
      paymenttypes:[],
      PaymentType:"",
      ChequeDate:"",
      CHQNO:""
    };
    this.handViewRegistration = this.handViewRegistration.bind(this);
    this.Resetsate = this.Resetsate.bind(this);
    this.SaveApplication = this.SaveApplication.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.SaveTenderdetails = this.SaveTenderdetails.bind(this);
    this.CompletedApplication = this.CompletedApplication.bind(this);
  }
  checkDocumentRoles = CreatedBy => {
    if (this.state.Board) {
      return true;
    }
    if (localStorage.getItem("UserName") === CreatedBy) {
      return true;
    }

    return false;
  };
  fetchBanks = () => {
    this.setState({ Banks: [] });
   
    fetch("/api/Banks" , {
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
  closeAddSiblings = () => {
    this.setState({ AddSiblings: false });
  };
  closeAddEducational = () => {
    this.setState({ AddEducational: false });
  };
  closeAddGuardians = () => {
    this.setState({ AddGuardians: false });
  };
  
  closeAddNextOFKin = () => {
    this.setState({ AddNextOFKin: false });
  };
  
  closeAddInterestedParty = () => {
    this.setState({ AddInterestedParty: false });
  };
  closeModal = () => {
    this.setState({ open: false });
  };
  onEditorChange = evt => {
    this.setState({
      GroundDescription: evt.editor.getData()
    });
  };
  onEditor2Change = evt => {
    this.setState({
      RequestDescription: evt.editor.getData()
    });
  };

  closeFileViewModal = () => {
    this.setState({ openFileViewer: true });
  };
  ViewFile = (k, e) => {
    let filepath = k.Path + "/" + k.FileName;
    window.open(filepath);
    //this.setState({ openFileViewer: true });
  };
  ClosePaymentModal = () => {
    this.setState({ openPaymentModal: false });
  };
  OpenPaymentModal = () => {
    this.setState({ openPaymentModal: true });
  };
  closeRequestModal = () => {
    this.setState({ openRequest: false });
  };
  OpenGroundsModal = e => {
    e.preventDefault();
    this.setState({ open: true });
  };
  OpenRequestsModal = e => {
    e.preventDefault();
    this.setState({ openRequest: true });
  };
  fetchMyApplications = IDNumber => {
    this.setState({ IDNumber: [] });
    fetch("/api/Registration/" + IDNumber + "/Applicant", {
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
        swal("", err.message, "error");
      });
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
          this.setState({ AdendumsAvailable: true });
        } else {
          this.setState({ AddAdedendums: false });
          this.setState({ AdendumsAvailable: false });
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchApplicationfees = Applicationno => {
    this.setState({ Applicationfees: [] });
    this.setState({ TotalAmountdue: "" });
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
        swal("", err.message, "error");
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
          swal("", ApplicationDocuments.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchApplicantDetails = () => {
    fetch("/api/Registration/", {
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
  
            Gender: ApplicantDetails[0].Gender,
            Phone: ApplicantDetails[0].Phone,
            DOB: ApplicantDetails[0].DOB,
            Email: ApplicantDetails[0].Email,
            Country: ApplicantDetails[0].Country,
            Passport: ApplicantDetails[0].Passport,
            Religion: ApplicantDetails[0].Religion,
            Marital: ApplicantDetails[0].Marital,
            Height: ApplicantDetails[0].Height,
            Weight: ApplicantDetails[0].Weight,
            Languages: ApplicantDetails[0].Languages,
            Skills: ApplicantDetails[0].Skills,
            IDNumber:ApplicantDetails[0].IDNumber
          });
          this.fetchMyApplications(ApplicantDetails[0].IDNumber);
        } else {
          swal("", ApplicantDetails.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  DeleteRequest = d => {
    const data = {
      ApplicationID: this.state.ApplicationID,
      EntryType: d.EntryType,
      Description: d.Description
    };

    return fetch("/api/grounds/" + 1, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            var rows = [...this.state.ApplicationGrounds];
            const filtereddata = rows.filter(
              item => item.Description !== d.Description
            );
            this.setState({ ApplicationGrounds: filtereddata });
          } else {
            swal("", "Remove Failed", "error");
          }
        })
      )
      .catch(err => {
        swal("", "Remove Failed", "error");
      });
  };
  handleDeleteRequest = d => {
    const data = {
      ApplicationID: this.state.ApplicationID,
      EntryType: d.EntryType,
      Description: d.Description
    };

    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/grounds/" + 1, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                var rows = [...this.state.ApplicationGrounds];
                const filtereddata = rows.filter(
                  item => item.Description !== d.Description
                );
                this.setState({ ApplicationGrounds: filtereddata });
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
  handleDeleteGuardian = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/Parent/" + d.ID, {
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
                this.fetchParent(this.state.IDNumber);
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
  handleDeleteEducational = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/Educational/" + d.ID, {
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
                this.fetchEducational(this.state.IDNumber);
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
  handleDeleteSiblings = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/Siblings/" + d.ID, {
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
                this.fetchSiblings(this.state.IDNumber);
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
  
  handleDeleteNextOFKin = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/NextOFKin/" + d.ID, {
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
                this.fetchNextOFKin(this.state.IDNumber);
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
  handleDeleteDocument = d => {
    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/applicationdocuments/" + d.FileName, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                var rows = [...this.state.ApplicationDocuments];
                const filtereddata = rows.filter(
                  item => item.FileName !== d.FileName
                );
                this.setState({ ApplicationDocuments: filtereddata });
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
  handleDeleteGround = d => {
    const data = {
      ApplicationID: this.state.ApplicationID,
      EntryType: d.EntryType,
      Description: d.Description
    };

    swal({
      text: "Are you sure that you want to remove this record?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/grounds/" + 1, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                var rows = [...this.state.ApplicationGrounds];
                const filtereddata = rows.filter(
                  item => item.Description !== d.Description
                );
                this.setState({ ApplicationGrounds: filtereddata });
              } else {
                swal("", data.message, "error");
              }
            })
          )
          .catch(err => {
            swal("", err.message, "error");
          });
      }
    });
  };
  SaveRegistration = event => {
      event.preventDefault();
      const data = {
        IDNumber: this.state.IDNumber,
        Fullname: this.state.Fullname,
        Gender: this.state.Gender,
        Phone: this.state.Phone,
        DOB: this.state.DOB,
        Email: this.state.Email,
        Country: this.state.Country,
        Passport: this.state.Passport,
        Religion: this.state.Religion,
        Marital: this.state.Marital,
        Height: this.state.Height,
        Weight: this.state.Weight,
        Languages: this.state.Languages,
        Skills: this.state.Skills,
      };
        this.postData("/api/Registration", data);
    };
  UpdateTenderdetails = () => {
    if (this.state.TenderType === "B") {
      if (!this.state.TenderCategory) {
        toast.error("Tender category is required.");
        return;
      }
      if (!this.state.TenderSubCategory) {
        toast.error("Tender subcategory is required.");
        return;
      }
    }
    let data = {
      TenderNo: this.state.TenderNo,
      TenderName: this.state.TenderName,
      PEID: this.state.PEID,
      StartDate: this.state.StartDate,
      ClosingDate: this.state.ClosingDate,
      TenderValue: this.state.TenderValue,
      TenderType: this.state.TenderType,
      TenderSubCategory: this.state.TenderSubCategory,
      TenderCategory: this.state.TenderCategory
    };

    fetch("/api/tenders/" + this.state.TenderID, {
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
            this.UpdateApplication();
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("!", err.message, "error");
      });
  };
  UpdateApplication = () => {
    let data = {
      TenderID: this.state.TenderID,
      ApplicantID: this.state.ApplicantID,
      PEID: this.state.PEID
    };
    fetch("/api/applications/" + this.state.ApplicationNo, {
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
            let newdata = {
              TenderValue: "0",
              TenderType: "",
              TenderSubCategory: "",
              TenderCategory: ""
            };
            this.setState(newdata);
            this.UpdateApplicationFees();
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  UpdateApplicationFees() {
    fetch("/api/applicationfees/" + this.state.ApplicationID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            toast.success("Information updated");
            this.fetchApplicationfees(this.state.ApplicationID);
          } else {
            toast.error(data.message);
            // swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        toast.error(err.message);
        // swal("", err.message, "error");
      });
  }
  SubmitApplicationForReview = () => {
    this.SubmitApplication();
    this.sendApproverNotification();
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
    let data = {
      ApplicationID: this.state.ApplicationID,
      Paidby: this.state.PaidBy,
      Reference: this.state.PaymentReference,
      DateOfpayment: this.state.DateofPayment,
      AmountPaid: this.state.AmountPaid,
      PaymentType: this.state.PaymentType,
      ChequeDate: this.state.ChequeDate,
      CHQNO: this.state.CHQNO,
      Category: "Applicationfees"
    };
   
    if (+this.state.TotalAmountdue > +this.state.AmountPaid) {
      swal({
        text: "Amount paid is less than amount due.Do you want to Continue",
        icon: "warning",
        dangerMode: true,
        buttons: true
      }).then(willDelete => {
        if (willDelete) {
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
                  //toast.success("Payment details save successfuly");
                  swal("","Payment details save successfuly","success")
                 
                } else {
                  toast.error(data.message);
                }
              })
            )
            .catch(err => {
              toast.error(err.message);
            });
        }
      });
    } else {
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
              toast.success("Payment details save successfuly");
              swal("", "Payment details save successfuly", "success")
              // this.SubmitApplication();
              // this.sendApproverNotification();
            } else {
              toast.error(data.message);
            }
          })
        )
        .catch(err => {
          toast.error(err.message);
        });
    }
  };

  SaveTenderdetails(Timer) {
    if (this.state.TenderType === "B") {
      if (!this.state.TenderCategory) {
        toast.error("Tender category is required.");
        return;
      } else {
        if (this.state.TenderCategory === "Other Tenders") {
        } else {
          if (!this.state.TenderSubCategory) {
            toast.error("Tender subcategory is required.");
            return;
          }
        }
      }
    }
    if (this.state.TenderType === "B") {
      let data = {
        TenderNo: this.state.TenderNo,
        TenderName: this.state.TenderName,
        PEID: this.state.PEID,
        StartDate: this.state.StartDate,
        ClosingDate: this.state.ClosingDate,
        TenderValue: 0,
        TenderType: this.state.TenderType,
        TenderSubCategory: this.state.TenderSubCategory,
        TenderCategory: this.state.TenderCategory,
        Timer: Timer
      };
      fetch("/api/tenders", {
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
              this.setState({ TenderID: data.results[0].TenderID });
              this.SaveApplication(data.results[0].TenderID);
              if (this.state.AdendumDescription) {
                //this.saveTenderAdendums(data.results[0].TenderID);
              }
              //document.getElementById("nav-profile-tab").click();
            } else {
              toast.error(data.message);
              // swal("", data.message, "error");
            }
          })
        )
        .catch(err => {
          toast.error(err.message);
          //swal("", err.message, "error");
        });
    } else {
      let data = {
        TenderNo: this.state.TenderNo,
        TenderName: this.state.TenderName,
        PEID: this.state.PEID,
        StartDate: this.state.StartDate,
        ClosingDate: this.state.ClosingDate,
        TenderValue: this.state.TenderValue,
        TenderType: this.state.TenderType,
        TenderSubCategory: this.state.TenderSubCategory,
        TenderCategory: this.state.TenderCategory,
        Timer: Timer
      };
      fetch("/api/tenders", {
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
              this.setState({ TenderID: data.results[0].TenderID });
              this.SaveApplication(data.results[0].TenderID);
              if (this.state.AdendumDescription) {
                //this.saveTenderAdendums(data.results[0].TenderID);
              }
              //document.getElementById("nav-profile-tab").click();
            } else {
              toast.error(data.message);
              // swal("", data.message, "error");
            }
          })
        )
        .catch(err => {
          toast.error(err.message);
          //swal("", err.message, "error");
        });
    }
  }
  saveGroundsDescriptions(EntryType) {
    if (this.state.ApplicationID) {
      let datatosave = {
        ApplicationID: this.state.ApplicationID,
        EntryType: EntryType,
        Description: this.state.GroundDescription,
        GroundNO: this.state.GroundNO
      };
      fetch("/api/grounds", {
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
             
              var rows = this.state.ApplicationGrounds;
              rows.push(datatosave);
              this.setState({ ApplicationGrounds: rows ,
              GroundDescription: "" ,
              GroundsAvailable: true ,
               open: false ,
              GroundNO: "" });
              toast.success("Saved Successfuly");
            } else {
              toast.error("Could not be added please try again");
              // swal("", , "error");
            }
          })
        )
        .catch(err => {
          toast.error("Could not be added please try again");
        });
    } else {
      toast.error(
        "Please ensure You have filled tender details before filling grounds and requests."
      );
    }
  }
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
  saveRequests(EntryType) {
    if (this.state.ApplicationID) {
      let datatosave = {
        ApplicationID: this.state.ApplicationID,
        EntryType: EntryType,
        Description: this.state.RequestDescription,
        GroundNO: this.state.GroundNO
      };
      fetch("/api/grounds", {
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
              var rows = this.state.ApplicationGrounds;
              rows.push(datatosave);
              this.setState({ ApplicationGrounds: rows ,
               RequestDescription: "" ,
               RequestsAvailable: true ,
               GroundNO: "" , openRequest: false });
              toast.success("Saved Successfuly");
            } else {
              toast.error("Could not be added please try again");
            }
          })
        )
        .catch(err => {
          toast.error("Could not be added please try again");
        });
    } else {
      toast.error(
        "Please ensure You have filled tender details before filling grounds and requests."
      );
    }
  }
  saveDocuments(FileName) {
    if (this.state.ApplicationID) {
      //save

      let datatosave = {
        ApplicationID: this.state.ApplicationID,
        Description: this.state.DocumentDescription,
        Path: process.env.REACT_APP_BASE_URL + "/Documents",
        FileName: FileName,
        Confidential: this.state.Confidential
      };
      fetch("/api/applicationdocuments", {
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
              var rows = this.state.ApplicationDocuments;
              let datapush = {
                FileName: FileName,
                Description: this.state.DocumentDescription
              };
              rows.push(datapush);
              this.setState({ ApplicationDocuments: rows });
              this.setState({
                DocumentsAvailable: true,
                DocumentDescription: ""
              });
              this.setState({
                loaded: 0
              });
            } else {
              toast.error("Could not be saved please try again!");
              // swal("Saved!", "Could not be saved please try again", "error");
            }
          })
        )
        .catch(err => {
          swal("", "Could not be saved please try again", "error");
        });
    } else {
      toast.error(
        "Please ensure You have filled tender details before filling grounds and requests."
      );
      // alert("Please ensure You have filled tender details before filling grounds and requests.")
    }
  }
  handleGroundsSubmit = event => {
    event.preventDefault();
    this.saveGroundsDescriptions("Grounds for Appeal");
  };
  handleRequestSubmit = event => {
    event.preventDefault();
    this.saveRequests("Requested Orders");
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
          toast.error("Could not be added please try again");
        });
    } else {
      toast.error(
        "Please ensure You have filled tender details before adding interested parties."
      );
    }
  };
//kelvin was here
handleEducationalSubmit = event => {
  event.preventDefault();
  if (this.state.IDNumber) {
    let datatosave = {
      IDNumber:this.state.IDNumber,
      Institution:this.state.EducationalInstitution,
      Period:this.state.EducationalPeriod ,
      Decription:this.state.EducationalDecription
    };
    fetch("/api/Educational", {
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
            var rows = this.state.Educational;
            rows.push(datatosave);
            this.setState({ Educational: rows });
            toast.success("Added successfully");
            let setstatedata = {
              
              EducationalInstitution:"",
               EducationalPeriod:"" ,
               EducationalDecription:"",
              AddEducational: false
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
  } else {
    toast.error(
      "Please ensure."
    );
  }
};
handleGuardianSubmit = event => {
  event.preventDefault();
  if (this.state.IDNumber) {
    let datatosave = {
      IDNumber:this.state.IDNumber,
      Name:this.state.GuardianName,
      ParentID:this.state.GuardianIDNO,
      Relationship:this.state.GuardianRelationship,
    };
    fetch("/api/Parent", {
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
            var rows = this.state.Parent;
            rows.push(datatosave);
            this.setState({ Parent: rows });
            toast.success("Added successfully");
            let setstatedata = {
              GuardianName:"",
              GuardianIDNO:"",
              GuardianRelationship:"",
              AddGuardians: false
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
  } else {
    toast.error(
      "Please ensure."
    );
  }
 };
 //kelvin was here 
 handleNextOFKINSubmit = event => {
  event.preventDefault();
  if (this.state.IDNumber) {
    let datatosave = {
      IDNumber:this.state.IDNumber,
      KinName:this.state.NextOFKinName,
      KRelationship:this.state.NextOfRelationship,
      CurrentResident:this.state.NextOfCurrentResident,
      Contact:this.state.NextOfContact,

    };
    fetch("/api/NextOFKin", {
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
            var rows = this.state.NextOFKin;
            rows.push(datatosave);
            this.setState({ NextOFKin: rows });
            toast.success("Added successfully");
            let setstatedata = {
              NextOFKinName:"" ,
              NextOfRelationship:"",
              NextOfCurrentResident:"",
              NextOfContact:"" ,
              AddNextOFKin: false
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
  } else {
    toast.error(
      "Please ensure."
    );
  }
 };

handleSiblingsSubmit = event => {
  event.preventDefault();
  if (this.state.IDNumber) {
    let datatosave = {
      IDNumber:this.state.IDNumber,
      SiblingName:this.state.SiblingName,
      Sex:this.state.SiblingsSex,
      Age:this.state.SiblingsAge
    };
    fetch("/api/Siblings", {
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
            var rows = this.state.MySiblings;
            rows.push(datatosave);
            this.setState({ MySiblings: rows });
            toast.success("Added successfully");
            let setstatedata = {
              
              SiblingName:"",
              SiblingsSex:"" ,
               SiblingAge:"",
              AddSiblings: false
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
  } else {
    toast.error(
      "Please ensure."
    );
  }
};
  Savefees(ApplicantID) {
    let data = {
      ApplicationID: ApplicantID
    };
    fetch("/api/applicationfees", {
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
            this.fetchApplicationfees(this.state.ApplicationID);
          } else {
            toast.error("Error occured while generating fees");
          }
        })
      )
      .catch(err => {
        toast.error("Error occured while generating fees");
      });
  }
  SaveApplication(_TenderID) {
    let data = {
      TenderID: _TenderID,
      ApplicantID: this.state.ApplicantID,
      PEID: this.state.PEID
    };
    fetch("/api/applications", {
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
            this.setState({ ApplicationID: data.results[0].ApplicationID });
            this.setState({ ApplicationNo: data.results[0].ApplicationNo });
            this.setState({ ApplicationREf: data.results[0].ApplicationREf });
            this.Savefees(data.results[0].ApplicationID);
            toast.success("Tender details saved");
            // let newdata = {
            //   TenderValue: "0",
            //   TenderType: "",
            //   TenderSubCategory: "",
            //   TenderCategory: ""
            // };
            // this.setState(newdata);
          } else {
            toast.error(data.message);
            //swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        toast.error(err.message);
        // swal("", err.message, "error");
      });
  }
  handleswitchMenu = e => {
    e.preventDefault();
    if (this.state.profile === false) {
      this.setState({ profile: true, IsUpdate: false });
    } else {
      this.setState({ profile: false, IsUpdate: false });
      this.Resetsate();
    }
  };
  GoBack = e => {
    e.preventDefault();
    this.setState({ summary: false });
  };
  EditApplication = e => {
    if (this.state.profile === false) {
      this.setState({ profile: true });
    } else {
      this.setState({ profile: false });
    }
    this.setState({ GroundsAvailable: true });
    this.setState({ RequestsAvailable: true });
    this.setState({ IsUpdate: true });

    this.setState({ DocumentsAvailable: true });
    if (this.state.TenderType === "A") {
      this.setState({
        Ascertainable: true,
        Unascertainable: false,
        ShowSubcategory: false
      });
    } else {
      this.setState({
        Ascertainable: false,
        Unascertainable: true,
        ShowSubcategory: true
      });
    }
  };
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    if (actionMeta.name === "TenderType") {
      if (UserGroup.value === "A") {
        this.setState({
          Ascertainable: true,
          Unascertainable: false,
          ShowSubcategory: false
        });
      } else {
        this.setState({
          Ascertainable: false,
          Unascertainable: true,
          ShowSubcategory: false
        });
      }
    }
    if (actionMeta.name === "TenderCategory") {
      if (UserGroup.value === "Unquantified Tenders") {
        this.setState({ ShowSubcategory: true });
      } else if (UserGroup.value === "Pre-qualification") {
        this.setState({ ShowSubcategory: true });
      } else {
        this.setState({ ShowSubcategory: false });
      }
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
  Resetsate() {
    const data = {
      IDNumber:""  ,
      Fullname:"" ,
      Gender:""  ,
      Phone:""  ,
      DOB:""  ,
      Email:""  ,
      Country:""  ,
      Passport:""  ,
      Religion:""  ,
      Marital:""  ,
      Height:""  ,
      Weight:"" ,
      Languages:"" ,
      Skills:"",
      AddEducational:false,
      AddGuardians:false,
      AddNextOFKin:false,
      AddSiblings:false,
      EducationalInstitution:"",
      EducationalPeriod:"" ,
      EducationalDecription:"",
      GuardianName:"",
      GuardianIDNO:"",
      GuardianRelationship:"",
      NextOFKinName:"" ,
      NextOfRelationship:"",
      NextOfCurrentResident:"",
      NextOfContact:"" ,
      SiblingName:"",
      SiblingsSex:"" ,
       SiblingsAge:"",
      IsUpdate: false,
      DocumentsAvailable: false
    };
    this.setState(data);
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
  onClickHandler = event => {
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
          this.saveDocuments(res.data);
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
          if (UserRoles[0].ApplicationFees) {
            this.setState({ BankSlips: UserRoles[0].ApplicationFees });
          }
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchPaymentDetails = ApplicationID => {
    this.setState({ PaymentDetails: [] });
    fetch("/api/applicationfees/" + ApplicationID + "/PaymentDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(PaymentDetails => {
        if (PaymentDetails.length > 0) {
          this.setState({ PaymentDetails: PaymentDetails });
        }
      })
      .catch(err => {
        toast.error(err.message);
        //swal("", err.message, "error");
      });
  };
  SaveBankSlip(Filename) {
    let data = {
      ApplicationID: this.state.ApplicationID,
      filename: Filename,
      Category: "ApplicationFees"
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
  fetchNextOFKin = IDNumber => {
    this.setState({ Parent: [] });
    fetch("/api/NextOFKin/" + IDNumber, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(NextOFKin => {
        if (NextOFKin.length > 0) {
          this.setState({ NextOFKin: NextOFKin });
        } else {
          toast.error(NextOFKin.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchRegistration = IDNumber => {
    this.setState({ Registration: [] });
    fetch("/api/Registration/" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Registration => {
        if (Registration.length > 0) {
          this.setState({ Registration: Registration });
        } else {
          toast.error(Registration.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchSiblings = IDNumber => {
    this.setState({ MySiblings: [] });
    fetch("/api/Siblings/" + IDNumber, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(MySiblings => {
        if (MySiblings.length > 0) {
          this.setState({ MySiblings: MySiblings });
        } else {
          toast.error(MySiblings.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  
  fetchEducational = IDNumber => {
    this.setState({ Educational: [] });
    fetch("/api/Educational/" + IDNumber, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Educational => {
        if (Educational.length > 0) {
          this.setState({ Educational: Educational });
        } else {
          toast.error(Educational.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchParent = IDNumber => {
    this.setState({ Educational: [] });
    fetch("/api/Parent/" + IDNumber, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Parent => {
        if (Parent.length > 0) {
          this.setState({ Parent: Parent });
        } else {
          toast.error(Parent.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchPE = () => {
    fetch("/api/PE", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(PE => {
        if (PE.length > 0) {
          this.setState({ PE: PE });
        } else {
          swal("", PE.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  fetchTenderTypes = () => {
    fetch("/api/tendertypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(TenderTypes => {
        if (TenderTypes.length > 0) {
          this.setState({ TenderTypes: TenderTypes });
        } else {
          toast.err(TenderTypes.message);
        }
      })
      .catch(err => {
      //  toast.err(err.message);
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
              this.fetchPE();
              this.fetchTenderTypes();
              this.fetchApplicantDetails();
              this.fetchEducational();
              this.fetchParent();
              this.fetchNextOFKin();
              this.fetchRegistration();
              this.fetchSiblings();
              this.fetchBanks();
              this.fetchPaymentTypes()
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
  handViewRegistration = k => {
    this.setState({
      EducationalDetails: [],
      SiblingDetails: [],
      ApplicationDocuments: [],
      Guardiandetails: [],
      NextOFKinDetails: []
    });
    this.fetchRegistration(k.ID);
    this.fetchEducational(k.IDNumber);
    this.fetchMyApplications(k.IDNumber);
    this.fetchNextOFKin(k.IDNumber);
    this.fetchParent(k.IDNumber);
    this.fetchSiblings(k.IDNumber);
    const data = {
      IDNumber:k.IDNumber,
      Fullname: k.Fullname,
      Phone: k.Phone,
      Email: k.Email,
      Gender: k.Gender,
      DOB: k.DOB,
      Country: k.Country,
      Passport: k.Passport,
      Religion: k.Religion,
      Marital: k.Marital,
      Height: k.Height,
      Weight: k.Weight,
      Languages: k.Languages,
      Skills: k.Skills,
      Institution: k.Institution,
      Decription: k.Decription,
      Name: k.Name,
      ParentID: k.ParentID,
      Relationship: k.Relationship,
      KRelationship:k.KRelationship,
      Period: k.Period,
      SiblingName: k.SiblingName,
      Age: k.Age,
      Sex: k.Sex,
      KinName:k.KinName,
      CurrentResident:k.CurrentResident,
      Contact:k.Contact,
      summary: true,
      ApplicationCreated_By: k.Created_By,
      PaymentStatus: k.PaymentStatus,
    };

    this.setState(data);
  };

  showAttacmentstab = e => {
    e.preventDefault();
    document.getElementById("nav-Attachments-tab").click();
  };
  showSiblingstab = e => {
    e.preventDefault();
    document.getElementById("nav-Siblings-tab").click();
  };
  showProfiletab = e => {
    e.preventDefault();
    document.getElementById("nav-profile-tab").click();
  };
  openFeesTab() {
    document.getElementById("nav-Fees-tab").click();
  }
  openInterestedPartiesTab() {
    document.getElementById("nav-InterestedParties-tab").click();
  }
  AddNewEducational = () => {
    this.setState({ AddEducational: true });
  };
  AddNewSiblings = () => {
    this.setState({ AddSiblings: true });
  };
  AddNewInterestedparty = () => {
    this.setState({ AddInterestedParty: true });
  };
  AddNewGuardians = () => {
    this.setState({ AddGuardians: true });
  };
  
  AddNewNextOFKin = () => {
    this.setState({ AddNextOFKin: true });
  };
  AddpaymentDetails = () => {
    this.setState({ ShowPaymentDetails: !this.state.ShowPaymentDetails });
  };
  notifyPanelmembers = (AproverMobile, Name, AproverEmail, Msg) => {
    if (Msg === "Applicant") {
      
           this.SendMail(
             this.state.ApplicationNo,
        AproverEmail,
        "Applicant",
        "APPLICATION ACKNOWLEDGEMENT"
      );
    } else if (Msg === "Approver") {
      this.SendSMS(
        AproverMobile,
        "New application has been submited and it's awaiting your review."
      );
      this.SendMail(
        this.state.ApplicationNo,
        AproverEmail,
        "Approver",
        "APPLICATION APPROVAL"
      );
    }
   

  }
  ReSubmitApplication = () => {
    fetch("/api/applications/" + this.state.ApplicationID+"/Resubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            swal("", "Your Application has been submited", "success");
            let applicantMsg =
              "Your Application with Reference:" +
              this.state.ApplicationNo +
              " has been Received";
            this.SendSMS(this.state.ApplicantPhone, applicantMsg);
            if (data.results.length > 0) {
              let NewList = [data.results]
              NewList[0].map((item, key) =>
                this.notifyPanelmembers(item.Mobile, item.Name, item.Email, item.Msg)
              )
            }
            this.setState({
              profile: true,
              summary: false,
              openPaymentModal: false,
              Status: "Submited"
            });
            this.fetchMyApplications(this.state.ApplicantID);
          } else {
            toast.error(data.message);
          }
        })
      )
      .catch(err => {
        toast.error(err.message);
      });
  }
  SubmitApplication=()=> {
    fetch("/api/applications/" + this.state.ApplicationID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            swal("", "Your Application has been submited", "success");
            let applicantMsg =
              "Your Application with Reference:" +
              this.state.ApplicationNo +
              " has been Received";
            this.SendSMS(this.state.ApplicantPhone, applicantMsg);
            this.setState({
              profile: true,
              summary: false,
              openPaymentModal: false,
              Status: "Submited"
            });
            this.fetchMyApplications(this.state.ApplicantID);
          } else {
            toast.error(data.message);
          }
        })
      )
      .catch(err => {
        toast.error(err.message);
      });
  }
  CompletedApplication = () => {
    if (this.state.ShowPaymentDetails) {
      this.SavePaymentdetails();
      //this.SubmitApplication();
    } else {
      if (this.state.Status ==="DECLINED"){
        this.ReSubmitApplication();
      }else{
        this.SubmitApplication();
      }
      
    }
  };
  UpdateData(url = ``, data = {}) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          this.fetchPE();

          if (data.success) {
            swal("", "Record has been Updated!", "success");
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
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
          this.fetchPE();

          if (data.success) {
            swal("", "Record has been saved!", "success");
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  render() {
    const PE = [...this.state.PE].map((k, i) => {
      return {
        value: k.PEID,
        label: k.Name
      };
    });
    let TenderTypes = [...this.state.TenderTypes].map((k, i) => {
      return {
        value: k.Code,
        label: k.Description
      };
    });
    let paymenttypes = [...this.state.paymenttypes].map((k, i) => {
      return {
        value: k.ID,
        label: k.Description
      };
    });
    let TenderSubCategories = [
      {
        value: "Simple",
        label: "Simple"
      },
      {
        value: "Medium",
        label: "Medium"
      },
      {
        value: "Complex",
        label: "Complex"
      }
    ];
    let TenderCategories = [
      {
        value: "Pre-qualification",
        label: "Pre-qualification"
      },
      {
        value: "Unquantified Tenders",
        label: "Unquantified Tenders"
      },
      {
        value: "Other Tenders",
        label: "Other Tenders"
      }
    ];
    const ColumnData = [
     
      {
        label: "FullName",
        field: "Fullname",
        sort: "asc"
      },
      { label: "IDNumber", field: "IDNumber" },

      {
        label: "Phone",
        field: "Phone",
        sort: "asc"
      },
      {
        label: "Email",
        field: "Email",
        sort: "asc"
      },
      {
        label: "Gender",
        field: "Gender",
        sort: "asc"
      },
      {
        label: "Action",
        field: "Action",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];
    const rows = [...this.state.Registration];
    // if (rows.length > 0) {
    //   rows.map((k, i) => {
    //     let Rowdata = {
    
    //       FullName: (
    //         <a onClick={e => this.handViewApplication(k, e)}>{k.Fullname}</a>
    //       ),
    //       // PE: <a onClick={e => this.handViewApplication(k, e)}>{k.PEName}</a>,
    //       // FilingDate: (
    //       //   <a onClick={e => this.handViewApplication(k, e)}>
    //       //     {dateFormat(
    //       //       new Date(k.FilingDate).toLocaleDateString(),
    //       //       "mediumDate"
    //       //     )}
    //       //   </a>
    //       // ),
    //       // ApplicationREf: (
    //       //   <a onClick={e => this.handViewApplication(k, e)}>
    //       //     {k.ApplicationREf}
    //       //   </a>
    //       // ),
    //       // Status: (
    //       //   <a
    //       //     className="font-weight-bold"
    //       //     onClick={e => this.handViewApplication(k, e)}
    //       //   >
    //       //     {k.Status}
    //       //   </a>
    //       // ),
          // Action: (
          //   <span>
          //     <a
          //       style={{ color: "#007bff" }}
          //       onClick={e => this.handViewApplication(k, e)}
          //     >
          //       {" "}
          //       View{" "}
          //     </a>
          //   </span>
          // )
    //     };
    //     Rowdata1.push(Rowdata);
    //   });
    // }
    if (rows.length > 0) {
      rows.forEach(k => {
        const Rowdata = {
            Fullname: (
              <a onClick={e => this.handViewRegistration(k, e)}>
                {k.Fullname}
              </a>
            ),
            IDNumber: (
              <a onClick={e => this.handViewRegistration(k, e)}>
                {k.IDNumber}
              </a>
            ),
            Gender: (
              <a onClick={e => this.handViewRegistration(k, e)}>
                {k.Gender}
              </a>
            ),
            Phone: (
              <a onClick={e => this.handViewRegistration(k, e)}>
                {k.Phone}
              </a>
            ),
            Email: (
              <a onClick={e => this.handViewRegistration(k, e)}>
                {k.Email}
              </a>
            ),
            Action: (
              <span>
                <a
                  style={{ color: "#007bff" }}
                  onClick={e => this.handViewRegistration(k, e)}
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
    let FormStyle = {
      margin: "20px"
    };
    let formcontainerStyle = {
      border: "1px solid grey",
      "border-radius": "10px"
    };
    let form2containerStyle = {
      border: "1px solid grey",
      "border-radius": "10px",
      margin: "50"
    };
    let divconatinerstyle = {
      width: "95%",
      margin: "0 auto",
      backgroundColor: "white"
    };

    let childdiv = {
      margin: "30px"
    };
    let adendumslink = {
      "margin-left": "40px",
      color: "blue"
    };
    let headingstyle = {
      color: "#FFC300 "
    };
    let ViewFile = this.ViewFile;

    if (this.state.profile) {
      if (this.state.summary) {
        return (
          <div>
            <ToastContainer />
            <div className="row wrapper border-bottom white-bg page-heading">
              <div className="col-lg-10">
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <h2 className="font-weight-bold">
                      ID Number:{" "}
                      <span className="font-weight-bold text-success">
                        {" "}
                        {this.state.IDNumber}
                      </span>
                    </h2>
                  </li>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <li>
                    <h2 className="font-weight-bold">
                      Name:{" "}
                      <span className="font-weight-bold text-success">
                        {" "}
                        {this.state.Fullname}
                      </span>
                    </h2>
                  </li>
                </ol>
              </div>
              <div className="col-lg-2">
                <div className="row wrapper "></div>
              </div>
            </div>
            <p></p>
            <div className="border-bottom white-bg p-4">
              <div className="row">
                <div className="col-sm-6">
                <h3 style={headingstyle}>Applicant Details</h3>
                  <div className="col-lg-10 border border-success rounded">
                    <table className="table table-borderless table-sm">
                      <tr>
                        <td className="font-weight-bold"> Fullname:</td>
                        <td> {this.state.Fullname}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> EMAIL:</td>
                        <td> {this.state.Email}</td>
                      </tr>

                      <tr>
                        <td className="font-weight-bold"> Mobile:</td>

                        <td> {this.state.Phone}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Gender:</td>

                        <td> {this.state.Gender}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Date of Birth:</td>

                        <td> {this.state.DOB}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Nationality:</td>
                        <td> {this.state.Country}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="col-lg-6">
                <h3 style={headingstyle}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h3>
                
                  <div className="col-lg-10 border border-success rounded">
                    <table className="table table-borderless table-sm">
                      <tr>
                        <td className="font-weight-bold"> Religion:</td>
                        <td> {this.state.Religion}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Marital Status:</td>
                        <td> {this.state.Marital}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Height:</td>
                        <td> {this.state.Height}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Weight:</td>
                        <td> {this.state.Weight}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Languages:</td>
                        <td> {this.state.Languages}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold"> Skills:</td>
                        <td> {this.state.Skills}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-lg-12 ">
                  <h3 style={headingstyle}>Education Details</h3>
                  <div className="col-lg-11 border border-success rounded">
                    <table className="table table-sm">
                      <thead className="thead-light">
                        <th>Institution</th>
                        <th>Course</th>
                        <th>Period</th>
                      </thead>
                      {this.state.Educational.map((r, i) => (
                        <tr>
                          <td>{r.Institution}</td>
                          <td> {r.Decription} </td>
                          <td> {r.Period} </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-lg-12 ">
                  <h3 style={headingstyle}>Guaridan Details</h3>
                  <div className="col-lg-11 border border-success rounded">
                    <table className="table table-sm">
                      <thead className="thead-light">
                        <th>Name</th>
                        <th>ID number</th>
                        <th>Relationship</th>
                      </thead>
                      {this.state.Parent.map((r, i) => (
                        <tr>
                          <td>{r.Name}</td>
                          <td> {r.ParentID} </td>
                          <td> {r.Relationship} </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-lg-12 ">
                  <h3 style={headingstyle}>Next of kin Details</h3>
                  <div className="col-lg-11 border border-success rounded">
                    <table className="table table-sm">
                      <thead className="thead-light">
                        <th>Name</th>
                        <th>Relationship</th>
                        <th>Current Resident</th>
                        <th>Contact</th>
                      </thead>
                      {this.state.NextOFKin.map((r, i) => (
                        <tr>
                          <td>{r.KinName}</td>
                          <td> {r.KRelationship} </td>
                          <td> {r.CurrentResident} </td>
                          <td> {r.Contact} </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-lg-12 ">
                  <h3 style={headingstyle}>Siblings Details</h3>
                  <div className="col-lg-11 border border-success rounded">
                    <table className="table table-sm">
                      <thead className="thead-light">
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                      </thead>
                      {this.state.MySiblings.map((r, i) => (
                        <tr>
                          <td>{r.SiblingName}</td>
                          <td> {r.Sex} </td>
                          <td> {r.Age} </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              <br/>
              <div className="row">
                      <div className="col-lg-9"></div>
                      <div className="col-lg-3">
                        &nbsp; &nbsp;
                        <button
                          type="button"
                          onClick={this.GoBack}
                          className="btn btn-danger"
                        >
                          Back
                        </button>
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
              <div className="col-lg-10">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <h2>Job majuu Applicants</h2>
                  </li>
                </ol>
              </div>
              <div className="col-lg-2">
                <div className="row wrapper ">
                  <button
                    type="button"
                    style={{ marginTop: 40 }}
                    onClick={this.handleswitchMenu}
                    className="btn btn-primary float-left"
                  >
                    &nbsp; New Registration
                  </button>
                </div>
                {/* <div classname="col-lg-1"></div> */}
              </div>
            </div>

            <TableWrapper>
              <Table Rows={Rowdata1} columns={ColumnData} />
            </TableWrapper>
          </div>
        );
      }
    } else {
      return (
        <div>
          <ToastContainer />
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-11">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {this.state.IsUpdate ? (
                    <h2 className="font-weight-bold">
                    </h2>
                  ) : (
                    <h2>New Registration</h2>
                  )}
                </li>
              </ol>
            </div>
            <div className="col-lg-1">
              <div className="row wrapper "></div>
            </div>
          </div>
          <p></p>
          <div style={divconatinerstyle}>
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
                    Personal Info{" "}
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
                      Educational Details
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
                      Guardians/parent Details
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
                    Next of kin
                    </a>
                    <a
                      class="nav-item nav-link font-weight-bold"
                      id="nav-Siblings-tab"
                      data-toggle="tab"
                      href="#nav-Siblings"
                      role="tab"
                      aria-controls="nav-Siblings"
                      aria-selected="false"
                    >
                      Siblings
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
                      Attachments
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
                      <form style={FormStyle} onSubmit={this.SaveRegistration}>
                      <div className=" row">
                      <div class="col-sm-2">
                            <label for="Fullname" className="font-weight-bold">
                              Full Name
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Fullname"
                              onChange={this.handleInputChange}
                              value={this.state.Fullname}
                              required
                            />
                          </div>
                          <div class="col-sm-2">
                            <label for="IDNumber" className="font-weight-bold">
                              ID Number
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="IDNumber"
                              onChange={this.handleInputChange}
                              value={this.state.IDNumber}
                              required
                            />
                          </div>
                        </div>
                        <br/>
                        <div className=" row">
                      <div class="col-sm-2">
                            <label for="Gender" className="font-weight-bold">
                              Gender
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Gender"
                              onChange={this.handleInputChange}
                              value={this.state.Gender}
                              required
                            />
                          </div>
                          <div class="col-sm-2">
                            <label for="Phone" className="font-weight-bold">
                              Mobile number
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Phone"
                              onChange={this.handleInputChange}
                              value={this.state.Phone}
                              required
                            />
                          </div>
                        </div>
                        <br/>
                        <div className=" row">
                      <div class="col-sm-2">
                            <label for="Email" className="font-weight-bold">
                              Email Address
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Email"
                              onChange={this.handleInputChange}
                              value={this.state.Email}
                              required
                            />
                          </div>
                          <div class="col-sm-2">
                            <label for="DOB" className="font-weight-bold">
                              Date Of birth
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="date"
                              class="form-control"
                              name="DOB"
                              onChange={this.handleInputChange}
                              value={this.state.DOB}
                              required
                            />
                          </div>
                        </div>
    <br/>
                        <div className=" row">
                      <div class="col-sm-2">
                            <label for="Country" className="font-weight-bold">
                            Nationality
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Country"
                              onChange={this.handleInputChange}
                              value={this.state.Country}
                              required
                            />
                          </div>
                          <div class="col-sm-2">
                            <label for="Passport" className="font-weight-bold">
                              Passport
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Passport"
                              onChange={this.handleInputChange}
                              value={this.state.Passport}
                              required
                            />
                          </div>
                        </div>
                        <br/>
                        <div className=" row">
                      <div class="col-sm-2">
                            <label for="Religion" className="font-weight-bold">
                            Religion
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Religion"
                              onChange={this.handleInputChange}
                              value={this.state.Religion}
                              required
                            />
                          </div>
                          <div class="col-sm-2">
                            <label for="Marital" className="font-weight-bold">
                              Marital
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Marital"
                              onChange={this.handleInputChange}
                              value={this.state.Marital}
                              required
                            />
                          </div>
                        </div>
  
                        <br/>
                        <div className=" row">
                      <div class="col-sm-2">
                            <label for="Height" className="font-weight-bold">
                            height
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Height"
                              onChange={this.handleInputChange}
                              value={this.state.Height}
                              required
                            />
                          </div>
                          <div class="col-sm-2">
                            <label for="Weight" className="font-weight-bold">
                              Weight
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Weight"
                              onChange={this.handleInputChange}
                              value={this.state.Weight}
                              required
                            />
                          </div>
                        </div>
                        <br/>
                        <div className=" row">
                      <div class="col-sm-2">
                            <label for="Languages" className="font-weight-bold">
                            Languages
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Languages"
                              onChange={this.handleInputChange}
                              value={this.state.Languages}
                              required
                            />
                          </div>
                          <div class="col-sm-2">
                            <label for="Skills" className="font-Skills-bold">
                            Skills
                            </label>
                          </div>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control"
                              name="Skills"
                              onChange={this.handleInputChange}
                              value={this.state.Skills}
                              required
                            />
                          </div>
                        </div>
  
                        <br />

                        <p></p>
                        <div className=" row">
                          <div className="col-sm-9" />
                          <div className="col-sm-1">
                            <button
                              type="submit"
                              className="btn btn-primary float-right"
                            >
                              Save
                            </button>
                          </div>
                          <div className="col-sm-2">
                           
                              <div>
                              <button
                                className="btn btn-success"
                                onClick={this.showProfiletab}
                              >
                                Next &nbsp;
                              </button>
                                &nbsp;&nbsp;
                                <button
                                  type="button"
                                  onClick={this.handleswitchMenu}
                                  className="btn btn-warning"
                                >
                                  &nbsp; Close
                                </button>
                              </div>
                          
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* </form> */}
                    <div>
                      <br />

                      <br />
                      <i className="font-weight-bold">
                        If false information is input in the system, the
                        applicant risks job.
                      </i>
                    </div>
                  </div>

                  {/* Educational details tab */}
                  <div
                    class="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-profile-tab"
                  >
                    <Modal
                      visible={this.state.AddEducational}
                      width="800"
                      height="300"
                      effect="fadeInUp"
                    >
                      <a
                        style={{ float: "right", color: "red", margin: "10px" }}
                        href="javascript:void(0);"
                        onClick={() => this.closeAddEducational()}
                      >
                        <i class="fa fa-close"></i>
                      </a>
                      <div>
                        <h4
                          style={{ "text-align": "center", color: "#1c84c6" }}
                        >
                          Educational details
                        </h4>
                        <div className="container-fluid">
                          <div className="col-sm-12">
                            <div className="ibox-content">
                              <form onSubmit={this.handleEducationalSubmit}>
                                <div className=" row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="exampleInputPassword1"
                                          className="font-weight-bold"
                                        >
                                          Institution name
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={this.state.EducationalInstitution}
                                          type="text"
                                          required
                                          name="EducationalInstitution"
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
                                          Course
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .EducationalDecription
                                          }
                                          type="text"
                                          required
                                          name="EducationalDecription"
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
                                          Period
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .EducationalPeriod
                                          }
                                          type="text"
                                          required
                                          name="EducationalPeriod"
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
                                        onClick={this.closeAddEducational}
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
                        <h3 style={headingstyle}>Educational Details</h3>

                        <div className="row">
                          <div class="col-sm-11">
                            <table className="table table-sm">
                              <thead className="thead-light">
                                <th>Institution</th>
                                <th>Course</th>
                                <th>period</th>
                                <th>Actions</th>
                              </thead>
                              {this.state.Educational.map((r, i) => (
                                <tr>
                                  <td>{r.Institution}</td>
                                  <td> {r.Decription} </td>
                                  <td> {r.Period} </td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e =>
                                          this.handleDeleteEducational(r, e)
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
                              onClick={this.AddNewEducational}
                            >
                              ADD
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              onClick={this.openInterestedPartiesTab}
                              className="btn btn-success"
                            >
                              {" "}
                              &nbsp; Next
                            </button>
                            &nbsp;&nbsp;
                            <button
                              type="button"
                              onClick={this.handleswitchMenu}
                              className="btn btn-warning"
                            >
                              &nbsp; Close
                            </button>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
               
{/* Parent /guardian tab */}
                  <div
                    class="tab-pane fade"
                    id="nav-InterestedParties"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-InterestedParties-tab"
                  >
                      <Modal
                      visible={this.state.AddGuardians}
                      width="800"
                      height="300"
                      effect="fadeInUp"
                    >
                      <a
                        style={{ float: "right", color: "red", margin: "10px" }}
                        href="javascript:void(0);"
                        onClick={() => this.closeAddGuardians()}
                      >
                        <i class="fa fa-close"></i>
                      </a>
                      <div>
                        <h4
                          style={{ "text-align": "center", color: "#1c84c6" }}
                        >
                          Guardian Details
                        </h4>
                        <div className="container-fluid">
                          <div className="col-sm-12">
                            <div className="ibox-content">
                              <form onSubmit={this.handleGuardianSubmit}>
                                <div className=" row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="exampleInputPassword1"
                                          className="font-weight-bold"
                                        >
                                          Guardian Name
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={this.state.GuardianName}
                                          type="text"
                                          required
                                          name="GuardianName"
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
                                          GuardianID NO
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .GuardianIDNO
                                          }
                                          type="text"
                                          required
                                          name="GuardianIDNO"
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
                                          Relationship
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .GuardianRelationship
                                          }
                                          type="text"
                                          required
                                          name="GuardianRelationship"
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
                                        onClick={this.closeAddGuardians}
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
                        <h3 style={headingstyle}>Guardian Details</h3>

                        <div className="row">
                          <div class="col-sm-11">
                            <table className="table table-sm">
                              <thead className="thead-light">
                                <th>Guardian Name</th>
                                <th>Guardian IDNO</th>
                                <th>Relationship</th>
                                <th>Actions</th>
                              </thead>
                              {this.state.Parent.map((r, i) => (
                                <tr>
                                  <td>{r.Name}</td>
                                  <td> {r.ParentID} </td>
                                  <td> {r.Relationship} </td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e =>
                                          this.handleDeleteGuardian(r, e)
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
                              onClick={this.AddNewGuardians}
                            >
                              ADD
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              onClick={this.openFeesTab}
                              className="btn btn-success"
                            >
                              {" "}
                              &nbsp; Next
                            </button>
                            &nbsp;&nbsp;
                            <button
                              type="button"
                              onClick={this.handleswitchMenu}
                              className="btn btn-warning"
                            >
                              &nbsp; Close
                            </button>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>

 
{/* next of kin tab */}
<div
                    class="tab-pane fade"
                    id="nav-Fees"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-Fees-tab"
                  >
                     <div
                    class="tab-pane fade"
                    id="nav-Fees"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-Fees-tab"
                  ></div>
                     <div
                    class="tab-pane fade"
                    id="nav-Fees"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-Fees-tab"
                  ></div>
                      <Modal
                      visible={this.state.AddNextOFKin}
                      width="800"
                      height="300"
                      effect="fadeInUp"
                    >
                      <a
                        style={{ float: "right", color: "red", margin: "10px" }}
                        href="javascript:void(0);"
                        onClick={() => this.closeAddNextOFKin()}
                      >
                        <i class="fa fa-close"></i>
                      </a>
                      <div>
                        <h4
                          style={{ "text-align": "center", color: "#1c84c6" }}
                        >
                          Next of kin details
                        </h4>
                        <div className="container-fluid">
                          <div className="col-sm-12">
                            <div className="ibox-content">
                              <form onSubmit={this.handleNextOFKINSubmit}>
                                <div className=" row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="exampleInputPassword1"
                                          className="font-weight-bold"
                                        >
                                           Name
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={this.state.NextOFKinName}
                                          type="text"
                                          required
                                          name="NextOFKinName"
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
                                          Relationship
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .NextOfRelationship
                                          }
                                          type="text"
                                          required
                                          name="NextOfRelationship"
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
                                          Current Residence
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .NextOfCurrentResident
                                          }
                                          type="text"
                                          required
                                          name="NextOfCurrentResident"
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
                                          Contact
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .NextOfContact
                                          }
                                          type="text"
                                          required
                                          name="NextOfContact"
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
                                        onClick={this.closeAddNextOfKin}
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
                        <h3 style={headingstyle}>Next OF Details</h3>

                        <div className="row">
                          <div class="col-sm-11">
                            <table className="table table-sm">
                              <thead className="thead-light">
                                <th>Name</th>
                                <th>Relationship</th>
                                <th>CurrentResident</th>
                                <th>Contact</th>
                                <th>Actions</th>
                              </thead>
                              {this.state.NextOFKin.map((r, i) => (
                                <tr>
                                  <td>{r.KinName}</td>
                                  <td> {r.KRelationship} </td>
                                  <td> {r.CurrentResident} </td>
                                  <td> {r.Contact} </td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e =>
                                          this.handleDeleteNextOFKin(r, e)
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
                              onClick={this.AddNewNextOFKin}
                            >
                              ADD
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              onClick={this.showSiblingstab}
                              className="btn btn-success"
                            >
                              {" "}
                              &nbsp; Next
                            </button>
                            &nbsp;&nbsp;
                            <button
                              type="button"
                              onClick={this.handleswitchMenu}
                              className="btn btn-warning"
                            >
                              &nbsp; Close
                            </button>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div> 
 {/* Siblings tab */}
                <div
                    class="tab-pane fade"
                    id="nav-Siblings"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-Siblings-tab"
                  >
                      <Modal
                      visible={this.state.AddSiblings}
                      width="800"
                      height="300"
                      effect="fadeInUp"
                    >
                      <a
                        style={{ float: "right", color: "red", margin: "10px" }}
                        href="javascript:void(0);"
                        onClick={() => this.closeAddSiblings()}
                      >
                        <i class="fa fa-close"></i>
                      </a>
                      <div>
                        <h4
                          style={{ "text-align": "center", color: "#1c84c6" }}
                        >
                          Siblings details
                        </h4>
                        <div className="container-fluid">
                          <div className="col-sm-12">
                            <div className="ibox-content">
                              <form onSubmit={this.handleSiblingsSubmit}>
                                <div className=" row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label
                                          htmlFor="exampleInputPassword1"
                                          className="font-weight-bold"
                                        >
                                           name
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={this.state.SiblingName}
                                          type="text"
                                          required
                                          name="SiblingName"
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
                                          Gender
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .SiblingsSex
                                          }
                                          type="text"
                                          required
                                          name="SiblingsSex"
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
                                          Age
                                        </label>
                                      </div>
                                      <div className="col-md-8">
                                        <input
                                          onChange={this.handleInputChange}
                                          value={
                                            this.state
                                              .SiblingsAge
                                          }
                                          type="text"
                                          required
                                          name="SiblingsAge"
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
                                        onClick={this.closeAddSiblings}
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
                        <h3 style={headingstyle}>Siblings Details</h3>

                        <div className="row">
                          <div class="col-sm-11">
                          <table className="table table-sm">
                              <thead className="thead-light">
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Actions</th>
                              </thead>
                              {this.state.MySiblings.map((r, i) => (
                                <tr>
                                  <td>{r.SiblingName}</td>
                                  <td> {r.Sex} </td>
                                  <td> {r.Age} </td>
                                  <td>
                                    {" "}
                                    <span>
                                      <a
                                        style={{ color: "#f44542" }}
                                        onClick={e =>
                                          this.handleDeleteNextOFKin(r, e)
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
                              onClick={this.AddNewSiblings}
                            >
                              ADD
                            </button>
                            &nbsp;
                            <button onClick={() => window.location.reload(false)}
                            className="btn btn-success"
                            >Submit</button>

                            &nbsp;&nbsp;
                            <button
                              type="button"
                              onClick={this.handleswitchMenu}
                              className="btn btn-warning"
                            >
                              &nbsp; Close
                            </button>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                    {/* Attachemnt tab */}
                    <div
                    class="tab-pane fade"
                    id="nav-Attachments"
                    role="tabpanel"
                    style={childdiv}
                    aria-labelledby="nav-Attachments-tab"
                  >
                    <div style={formcontainerStyle}>
                      <form style={FormStyle} onSubmit={this.onClickHandler}>
                        <div class="row">
                          <div class="col-sm-6">
                            <label
                              for="DocumentDescription"
                              className="font-weight-bold"
                            >
                              Description{" "}
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="DocumentDescription"
                              onChange={this.handleInputChange}
                              value={this.state.DocumentDescription}
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
                        <div class="row">
                          <div class="col-sm-6">
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
                              type="submit"
                              class="btn btn-success "
                              // onClick={this.onClickHandler}
                            >
                              Upload
                            </button>{" "}
                          </div>
                        </div>
                        <br />
                        <div class="row">
                          <div class="col-sm-8">
                            {this.state.DocumentsAvailable ? (
                              <table class="table table-sm">
                                <thead className="thead-light">
                                  <th scope="col">#</th>
                                  <th scope="col">File Description</th>
                                  <th scope="col">Action</th>
                                </thead>
                                <tbody>
                                  {this.state.ApplicationDocuments.map(
                                    (r, i) => (
                                      <tr>
                                        <td>{i + 1}</td>
                                        <td>{r.Description}</td>
                                        {/* <td>{r.FileName}</td> */}
                                        <td>
                                          <span>
                                            <a
                                              style={{ color: "#f44542" }}
                                              onClick={e =>
                                                this.handleDeleteDocument(r, e)
                                              }
                                            >
                                              &nbsp; Remove
                                            </a>
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            ) : null}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-10"></div>
                          <div class="col-sm-2">
                          <button
                              className="btn btn-primary"
                              onClick={this.CompletedApplication}
                            >
                              SUBMIT
                            </button>
                            &nbsp;&nbsp;
                            <button
                              type="button"
                              onClick={this.handleswitchMenu}
                              className="btn btn-warning"
                            >
                              &nbsp; Close
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  </div>
                </div>
              </div>
            </div>
       </div>
      );
    }
  }
}

export default Registration;

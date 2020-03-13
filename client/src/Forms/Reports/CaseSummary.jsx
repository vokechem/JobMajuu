import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
var dateFormat = require("dateformat");

class CaseSummary extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      AddedAdendums: [],
      Orders: [],
      Applicationfees: [],
      ApplicationGrounds: [],
      ResponseDetails: [],
      InterestedParties: [],
      ApplicationNo: "",
      ApplicantName: "",
      AdditionalSubmisions: [],
      PEName: "",
      File: "",
      FilePath: "",
      TotalBalance: "",
      TotalPaid: "",
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
      ApplicantID: ""
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.Downloadfile = this.Downloadfile.bind(this);
  }
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
            ApplicantPOBox:
              ApplicantDetails[0].POBox + "-" + ApplicantDetails[0].PostalCode
          });
          this.setState({ ApplicantTown: ApplicantDetails[0].Town });
          this.setState({ ApplicantMobile: ApplicantDetails[0].Mobile });
          this.setState({ ApplicantEmail: ApplicantDetails[0].Email });
          this.setState({ ApplicantWebsite: ApplicantDetails[0].Website });
          this.setState({ ApplicantName: ApplicantDetails[0].Name });
        } else {
          swal("", ApplicantDetails.message, "error");
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
          let Rowdata1 = [];
          let Rowdata2 = [];

          ApplicationGrounds.map((k, i) => {
            if (k.EntryType === "Grounds for Appeal") {
              Rowdata1.push(k);
            } else {
              Rowdata2.push(k);
            }
          });

          this.setState({ ApplicationGrounds: Rowdata1 });
          this.setState({ Orders: Rowdata2 });
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
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
          let Rowdata1 = [];
          let TotalBalance = 0;
          let TotalPaid = 0;
          Applicationfees.map((k, i) => {
            let balance = +k.AmountDue - +k.AmountPaid;
            TotalBalance = +TotalBalance + +balance;
            TotalPaid = +TotalPaid + +k.AmountPaid;
            let data = {
              EntryType: k.EntryType,
              AmountDue: this.formatNumber(k.AmountDue),
              AmountPaid: this.formatNumber(k.AmountPaid),
              Balance: this.formatNumber(balance)
            };
            Rowdata1.push(data);
          });
          this.setState({ TotalBalance: this.formatNumber(TotalBalance) });
          this.setState({ TotalPaid: this.formatNumber(TotalPaid) });
          this.setState({ Applicationfees: Rowdata1 });
          this.setState({
            TotalAmountdue: this.formatNumber(Applicationfees[0].total)
          });
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
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    var rows = [...this.state.Applications];
    const filtereddata = rows.filter(
      item => item.ApplicationNo === UserGroup.value
    );

    let data = {
      Applicationstatus: filtereddata[0].Status,
      FilingDate: filtereddata[0].FilingDate,
      PEPOBox: filtereddata[0].PEPOBox + "-" + filtereddata[0].PEPostalCode,
      PETown: filtereddata[0].PETown,
      PEEmail: filtereddata[0].PEEmail,
      PEMobile: filtereddata[0].PEMobile,
      PEWebsite: filtereddata[0].PEWebsite,
      PEName: filtereddata[0].PEName,
      TenderName: filtereddata[0].TenderName,
      TenderType: filtereddata[0].TenderTypeDesc,
      AwardDate: filtereddata[0].AwardDate,
      TenderValue: filtereddata[0].TenderValue,
      TenderNo: filtereddata[0].TenderNo,
      Timer: filtereddata[0].Timer,
      ApplicantName: filtereddata[0].ApplicantName,

      AddedAdendums: [],
      TotalBalance: "",
      TotalPaid: "",
      ApplicationGrounds: [],
      Orders: [],
      ApplicationDocuments: [],
      Applicationfees: [],
      TotalAmountdue: ""
    };
    this.setState(data);
    this.fetchAdditionalSubmisions(UserGroup.value);
    this.fetchInterestedParties(UserGroup.value);
    this.fetchApplicationGrounds(filtereddata[0].ID);
    this.fetchApplicationfees(filtereddata[0].ID);
    this.fetchTenderAdendums(filtereddata[0].TenderID);
    this.fetchApplicantDetails(filtereddata[0].Applicantusername);
    this.fetchResponseDetails(UserGroup.value);
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
  fetchResponseDetails = ApplicationNo => {
    fetch("/api/GenerateCaseSummary/" + ApplicationNo, {
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
  PrintFile = () => {
    let filepath = process.env.REACT_APP_BASE_URL + "/Cases/" + this.state.File;
    window.open(filepath);
  };
  formatNumber = num => {
    let newtot = Number(num).toFixed(2);
    return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  fetchAdditionalSubmisions = ApplicationNo => {
    this.setState({
      AdditionalSubmisions: []
    });
    fetch("/api/additionalsubmissions/" + ApplicationNo, {
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
          //toast.error(AdditionalSubmisions.message);
        }
      })
      .catch(err => {
        //toast.error(err.message);
      });
  };
  Downloadfile = () => {
    this.setState({ FilePath: "" });
    if (this.state.ApplicationNo) {
      const data = {
        TotalAmountdue: this.state.TotalAmountdue,
        Applicationstatus: this.state.Applicationstatus,
        Applicationno: this.state.ApplicationNo,
        ApplicantName: this.state.ApplicantName,
        PEName: this.state.PEName,
        AddedAdendums: this.state.AddedAdendums,
        Orders: this.state.Orders,
        Applicationfees: this.state.Applicationfees,
        ApplicationGrounds: this.state.ApplicationGrounds,
        ResponseDetails: this.state.ResponseDetails,
        TenderType: this.state.TenderType,
        Timer: this.state.Timer,
        InterestedParties: this.state.InterestedParties,
        AdditionalSubmisions: this.state.AdditionalSubmisions,
        AwardDate: dateFormat(
          new Date(this.state.AwardDate).toLocaleDateString(),
          "mediumDate"
        ),
        LogoPath: process.env.REACT_APP_BASE_URL + "/images/Harambee.png",
        TotalBalance: this.state.TotalBalance,
        TotalPaid: this.state.TotalPaid,
        FilingDate: dateFormat(
          new Date(this.state.FilingDate).toLocaleDateString(),
          "mediumDate"
        ),
        PEPOBox: this.state.PEPOBox,
        PETown: this.state.PETown,
        PEEmail: this.state.PEEmail,
        PEMobile: this.state.PEMobile,
        PEWebsite: this.state.PEWebsite,

        TenderName: this.state.TenderName,
        TenderNo: this.state.TenderNo,
        TenderValue: this.formatNumber(this.state.TenderValue),

        ApplicantPOBox: this.state.ApplicantPOBox,
        ApplicantTown: this.state.ApplicantTown,
        ApplicantMobile: this.state.ApplicantMobile,
        ApplicantEmail: this.state.ApplicantEmail,
        ApplicantWebsite: this.state.ApplicantWebsite
      };

      fetch("/api/GenerateCaseSummary", {
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
              let filename = this.state.ApplicationNo + ".pdf";

              this.setState({
                File: filename,
                FilePath: process.env.REACT_APP_BASE_URL + "/Cases/" + filename
              });
            } else {
              swal("", "Error occured while printing the report", "error");
            }
          })
        )
        .catch(err => {
          //swal("Oops!", err.message, "error");
        });
    } else {
      swal("", "Select Application No to Continue", "error");
    }
  };
  render() {
    let FormStyle = {
      margin: "20px"
    };
    const ApplicationNoOptions = [...this.state.Applications].map((k, i) => {
      return {
        value: k.ApplicationNo,
        label: k.ApplicationNo + "-" + k.PEName
      };
    });
    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Case Summary</h2>
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
                      Select Application NO{" "}
                    </label>
                  </div>
                  <div class="col-sm-4">
                    <div className="form-group">
                      <Select
                        name="ApplicationNo"
                        onChange={this.handleSelectChange}
                        options={ApplicationNoOptions}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-sm-1">
                    <button
                      onClick={this.Downloadfile}
                      className="btn btn-primary"
                      type="button"
                    >
                      Preview
                    </button>
                  </div>
                  &nbsp;
                  <div class="col-sm-1">
                    <button
                      onClick={this.PrintFile}
                      className="btn btn-success"
                      type="button"
                    >
                      Print
                    </button>
                  </div>
                </div>
                <hr />
                <br />

                <object
                  width="100%"
                  height="450"
                  data={this.state.FilePath}
                  type="application/pdf"
                >
                  {" "}
                </object>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseSummary;

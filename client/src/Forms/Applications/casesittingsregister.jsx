import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
var dateFormat = require("dateformat");

class casesittingsregister extends Component {
  constructor() {
    super();
    this.state = {
      Date: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Venue: "",
      Branch: "",
      VenueID: "",
      ApplicationNo: "",
      Logo: "",
      Name: "",
      MobileNo: "",
      IdNO: "",
      Email: "",
      Category: "",
      Designation: "",
      FirmFrom: "",
      summary: "Step 1",
      RegisterID: "",
      registraionisOpen: false,
      Applications: [],
      casesittingsregister: [],
      Users: []
    };
    this.handlePublicself = this.handlePublicself.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  resetState() {
    let data = {
      // Date: dateFormat(new Date().toLocaleDateString(), "isoDate"),
      Venue: "",
      Branch: "",
      VenueID: "",
      ApplicationNo: "",
      Logo: "",
      Name: "",
      MobileNo: "",
      IdNO: "",
      Category: "",
      summary: "Step 1",
      RegisterID: "",
      Designation: "",
      FirmFrom: ""
    };
    this.setState(data);
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
    if (this.state.summary === "ppra") {
      if (name === "IdNO") {
        const filtereddata = this.state.Users.filter(
          item => item.IDnumber == value
        );
        if (filtereddata.length > 0) {
          this.setState({
            Name: filtereddata[0].Name,
            MobileNo: filtereddata[0].Phone,
            Email: filtereddata[0].Email,
            Designation: "Staff",
            FirmFrom: "PPRA"
          });
        } else {
          this.setState({
            Name: "",
            MobileNo: "",
            Email: "",
            Designation: "Staff",
            FirmFrom: "PPRA"
          });
        }
      }
    } else {
      if (name === "IdNO") {
        const filtereddata = this.state.casesittingsregister.filter(
          item => item.IDNO == value
        );
        if (filtereddata.length > 0) {
          this.setState({
            Name: filtereddata[0].Name,
            MobileNo: filtereddata[0].MobileNo,
            Email: filtereddata[0].Email,
            Designation: filtereddata[0].Designation,
            FirmFrom: filtereddata[0].FirmFrom
          });
        } else {
          this.setState({
            Name: "",
            MobileNo: "",
            Email: "",
            Designation: "",
            FirmFrom: ""
          });
        }
      }
    }
  };
  handleSelfPublicSubmit = event => {
    event.preventDefault();
    if (this.state.summary === "ppra") {
      const data = {
        RegisterID: this.state.RegisterID,
        Name: this.state.Name,
        IDNO: this.state.IdNO,
        MobileNo: this.state.MobileNo,
        Category: "PPRA",
        Email: this.state.Email,
        Designation: "Staff",
        FirmFrom: "PPRA"
      };
      this.postSelfRegistrationData(
        "/api/casesittingsregister/SelfRegistration",
        data
      );
    } else {
      const data = {
        RegisterID: this.state.RegisterID,
        Name: this.state.Name,
        IDNO: this.state.IdNO,
        MobileNo: this.state.MobileNo,
        Category: this.state.Category,
        Email: this.state.Email,
        Designation: this.state.Designation,
        FirmFrom: this.state.FirmFrom
      };
      this.postSelfRegistrationData(
        "/api/casesittingsregister/SelfRegistration",
        data
      );
    }
  };
  handleSubmit = event => {
    event.preventDefault();

    const data = {
      VenueID: this.state.VenueID,
      ApplicationNo: this.state.ApplicationNo,
      Date: this.state.Date
    };

    this.postData("/api/casesittingsregister", data);
  };
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
          if (data.success) {
            this.setState({ RegisterID: data.results[0].RegisterID });
            this.setState({ summary: "Step 2" });
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  postSelfRegistrationData(url = ``, data = {}) {
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
            if (data.results[0].msg === "Success") {
              swal("", "Registration successful", "success");

              this.resetState();
            } else {
              swal("", "You are already registered", "error");

              this.resetState();
            }
          } else {
            swal("", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  fetchApplications = () => {
    fetch("/api/casesittingsregister", {
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
          toast.error(casesittingsregister.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  fetchcasesittingsregister = () => {
    fetch("/api/casesittingsregister/1/1/Attendancelist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(casesittingsregister => {
        if (casesittingsregister.length > 0) {
          this.setState({ casesittingsregister: casesittingsregister });
        } else {
          toast.error(casesittingsregister.message);
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };
  CheckIfOpen = Applicationno => {
    fetch("/api/casesittingsregister/" + Applicationno + "/CheckifOpen", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(Applications => {
        if (Applications.results.length > 0) {
          return "true";
        } else {
          return false;
        }
      })
      .catch(err => {
        return false;
      });
  };
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });

    if (actionMeta.name === "ApplicationNo") {
      var rows = [...this.state.Applications];
      const filtereddata = rows.filter(
        item => item.ApplicationNo == UserGroup.value
      );

      fetch("/api/casesittingsregister/" + UserGroup.value + "/CheckifOpen", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(Applications => {
          if (Applications.results.length > 0) {
            let data = {
              Date: dateFormat(new Date().toLocaleDateString(), "isoDate"),
              registraionisOpen: true,
              VenueID: filtereddata[0].VenueID,
              Venue: filtereddata[0].VenueName,
              Branch: filtereddata[0].BranchName
            };
            this.setState(data);
          } else {
            swal("", "Registration for this siiting has been closed", "error");
          }
        })
        .catch(err => {
          swal("", "Registration for this siiting has been closed", "error");
        });
    }
  };
  fetchCompanyDetails = () => {
    fetch("/api/configurations/" + 1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // this.setState({ CompanyDetails: data });
          this.setState({ Logo: data[0].Logo });
          //localStorage.setItem("CompanyLogo", data[0].Logo);
        } else {
          // swal("Oops!", data.message, "error");
        }
      })
      .catch(err => {
        // swal("Oops!", err.message, "error");
      });
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
          this.setState({ Users: Users });
        } else {
          swal("", Users.message, "error");
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
              this.fetchCompanyDetails();
              this.fetchcasesittingsregister();
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
  GoBack = e => {
    e.preventDefault();
    this.setState({ summary: "Step 1" });
  };
  handlePublicself = e => {
    e.preventDefault();
    this.setState({ summary: "Public" });
  };
  handlePPRA = e => {
    e.preventDefault();
    this.setState({ summary: "ppra" });
  };
  render() {
    let divconatinerstyle = {
      width: "100%",
      margin: "0 auto",
      backgroundColor: "white"
    };
    let FormStyle = {
      margin: "10px"
    };
    let formcontainerStyle = {
      border: "1px solid grey",
      borderRadius: "10px",
      width: "80%",
      margin: "0 auto"
    };
    let HeadingStyle = {
      marginLeft: "20px",
      paddingTop: "10px",
      color: "#7094db"
    };
    let photostyle = {
      height: 130,
      width: 170,
      background: "#a7b1c2",
      margin: 10,
      borderRadius: 20
    };
    const ApplicationOptions = [...this.state.Applications].map((k, i) => {
      return {
        value: k.ApplicationNo,
        label: k.ApplicationNo
      };
    });
    let CategoryOptions = [
      {
        value: "PE",
        label: "Procuring Entity"
      },
      {
        value: "Applicant",
        label: "Applicant"
      },
      {
        value: "InterestedParty",
        label: "Interested Party"
      },
      {
        value: "Press",
        label: "Press"
      },
      {
        value: "Others",
        label: "Others"
      }
    ];
    let CategoryOptions1 = [
      {
        value: "PPRA",
        label: "PPRA"
      }
    ];
    if (this.state.summary === "Step 1") {
      return (
        <div>
          <ToastContainer />
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>CASE SITTING REGISTRATION</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-2">
              <div className="row wrapper ">
                <Link to="/">
                  <button
                    type="button"
                    style={{ marginTop: 40 }}
                    className="btn btn-primary float-left"
                  >
                    &nbsp; Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <br />
          <div style={divconatinerstyle}>
            <div className="text-center">
              <h2 style={HeadingStyle}>Step One</h2>
            </div>
            <div style={formcontainerStyle}>
              <form style={FormStyle} onSubmit={this.handleSubmit}>
                <br />
                <div className="row">
                  <div className="col-sm-6">
                    <label for="PEID" className="font-weight-bold">
                      Application NO{" "}
                    </label>
                    <div className="form-group">
                      <Select
                        name="ApplicationNo"
                        value={ApplicationOptions.filter(
                          option => option.label === this.state.ApplicationNo
                        )}
                        onChange={this.handleSelectChange}
                        options={ApplicationOptions}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label for="TenderNo" className="font-weight-bold">
                      Date
                    </label>
                    <input
                      type="date"
                      name="StartDate"
                      required
                      defaultValue={this.state.Date}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label for="Branch" className="font-weight-bold">
                      Branch
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Branch"
                      value={this.state.Branch}
                      required
                      disabled
                    />
                  </div>

                  <div className="col-sm-6">
                    <label for="Venue" className="font-weight-bold">
                      Venue{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Venue"
                      value={this.state.Venue}
                      required
                      disabled
                    />
                  </div>
                </div>
                <p></p>
                <div className=" row">
                  <div className="col-sm-2" />
                  <div className="col-sm-8" />
                  <div className="col-sm-2">
                    {this.state.registraionisOpen ? (
                      <button
                        type="submit"
                        className="btn btn-primary float-right"
                      >
                        Continue
                      </button>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
            <br />
          </div>
        </div>
      );
    }
    if (this.state.summary === "Step 2") {
      return (
        <div>
          <ToastContainer />
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>CASE SITTING RTEGISTRATION</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-2">
              <div className="row wrapper ">
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.GoBack}
                  className="btn btn-warning float-left"
                >
                  &nbsp; Back{" "}
                </button>
              </div>
            </div>
          </div>
          <br />
          <div style={divconatinerstyle}>
            <div className="text-center">
              <h2 style={HeadingStyle}>Step Two</h2>
            </div>
            <div style={formcontainerStyle}>
              <div className="text-center">
                <img
                  src={
                    process.env.REACT_APP_BASE_URL +
                    "/profilepics/" +
                    this.state.Logo
                  }
                  style={photostyle}
                />
                <h3>CASE NO: {this.state.ApplicationNo}</h3>
                <br />
                <h3>SELF REGISTRATION </h3>
                <br />
                <button
                  className="btn btn-success"
                  style={{ width: "270px" }}
                  onClick={this.handlePublicself}
                >
                  PE,Applicant,Interested Party,Others
                </button>
                <br />
                <br />
                <br />
                <button
                  className="btn btn-success"
                  style={{ width: "270px", marginBottom: "10px" }}
                  onClick={this.handlePPRA}
                >
                  PPRA STAFF
                </button>
              </div>
              <br />
            </div>
            <br />
          </div>
        </div>
      );
    }
    if (this.state.summary === "Public") {
      return (
        <div>
          <ToastContainer />
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>CASE SITTING REGISTRATION</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-2">
              <div className="row wrapper ">
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.GoBack}
                  className="btn btn-warning float-left"
                >
                  &nbsp; Back{" "}
                </button>
              </div>
            </div>
          </div>
          <br />
          <div style={divconatinerstyle}>
            <div className="text-center">
              <h2 style={HeadingStyle}>Self Registration</h2>
            </div>

            <div style={formcontainerStyle}>
              <form style={FormStyle} onSubmit={this.handleSelfPublicSubmit}>
                <div className="text-center">
                  {/* <img
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/profilepics/" +
                      this.state.Logo
                    }
                    style={photostyle}
                  /> */}
                  <h3>CASE NO: {this.state.ApplicationNo}</h3>

                  <h3>SELF REGISTRATION </h3>
                  <h3>Date:{this.state.Date}</h3>
                </div>
                <div className="row">
                  <div className="col-sm-2">
                    <label for="PEID" className="font-weight-bold">
                      Identification NO{" "}
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="IdNO"
                        defaultValue={this.state.IdNO}
                        value={this.state.IdNO}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <label for="TenderNo" className="font-weight-bold">
                      Name
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="Name"
                      value={this.state.Name}
                      required
                      onChange={this.handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-2">
                    <label for="Branch" className="font-weight-bold">
                      Mobile No
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="number"
                      className="form-control"
                      name="MobileNo"
                      value={this.state.MobileNo}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-sm-2">
                    <label for="Venue" className="font-weight-bold">
                      Category{" "}
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <Select
                      name="Category"
                      onChange={this.handleSelectChange}
                      options={CategoryOptions}
                      required
                    />
                  </div>
                </div>
                <p></p>
                <div className=" row">
                  <div className="col-sm-2">
                    <label for="Branch" className="font-weight-bold">
                      Email
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="email"
                      className="form-control"
                      name="Email"
                      value={this.state.Email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-sm-2">
                    <label for="Branch" className="font-weight-bold">
                      Designation
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="Designation"
                      value={this.state.Designation}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <p></p>
                <div className=" row">
                  <div className="col-sm-2">
                    <label for="Branch" className="font-weight-bold">
                      Firm From
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="FirmFrom"
                      value={this.state.FirmFrom}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-2">
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <br />
          </div>
        </div>
      );
    }
    if (this.state.summary === "ppra") {
      return (
        <div>
          <ToastContainer />
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>CASE SITTING RTEGISTRATION</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-2">
              <div className="row wrapper ">
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.GoBack}
                  className="btn btn-warning float-left"
                >
                  &nbsp; Back{" "}
                </button>
              </div>
            </div>
          </div>
          <br />
          <div style={divconatinerstyle}>
            <div className="text-center">
              <h2 style={HeadingStyle}>Self Registration</h2>
            </div>

            <div style={formcontainerStyle}>
              <form style={FormStyle} onSubmit={this.handleSelfPublicSubmit}>
                <div className="text-center">
                  {/* <img
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/profilepics/" +
                      this.state.Logo
                    }
                    style={photostyle}
                  /> */}
                  <h3>CASE NO: {this.state.ApplicationNo}</h3>

                  <h3>SELF REGISTRATION </h3>
                  <h3>Date:{this.state.Date}</h3>
                </div>
                <div className="row">
                  <div className="col-sm-2">
                    <label for="PEID" className="font-weight-bold">
                      Identification NO{" "}
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="IdNO"
                        defaultValue={this.state.IdNO}
                        value={this.state.IdNO}
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-2">
                    <label for="TenderNo" className="font-weight-bold">
                      Name
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="Name"
                      value={this.state.Name}
                      required
                      onChange={this.handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-2">
                    <label for="Branch" className="font-weight-bold">
                      Mobile No
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="number"
                      className="form-control"
                      name="MobileNo"
                      value={this.state.MobileNo}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-sm-2">
                    <label for="Branch" className="font-weight-bold">
                      Email
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="email"
                      className="form-control"
                      name="Email"
                      value={this.state.Email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>

                <p></p>
                <div className=" row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-2">
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <br />
          </div>
        </div>
      );
    }
  }
}

export default casesittingsregister;

import React, { Component } from "react";
import { Progress } from "reactstrap";
import swal from "sweetalert";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var jsPDF = require("jspdf");
require("jspdf-autotable");

class configurations extends Component {
  constructor() {
    super();
    this.state = {
      Name: "",
      PhysicalAdress: "",
      Street: "",
      PoBox: "",
      PostalCode: "",
      Town: "",
      Telephone1: "",
      Telephone2: "",
      Mobile: "",
      Fax: "",
      Email: "",
      Website: "",
      PIN: "",
      Logo: "",
      selectedFile: null,
      Code: "",
      profile: true,
      CompanyDetails: [{}],
      ID: ""
    };
    this.handleswitchMenu = this.handleswitchMenu.bind(this);
  }

  exportpdf() {
    var doc = new jsPDF();
    // You can use html:
    doc.autoTable({ html: "#my-table" });

    // Or JavaScript:
    // doc.autoTable({
    //   head: [["Name", "Email", "Country"]],
    //   body: [
    //     ["David", "david@example.com", "Sweden"],
    //     ["Castille", "castille@example.com", "Norway"]
    //     // ...
    //   ]
    // });

    doc.save("table.pdf");
  }
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
          this.setState({ CompanyDetails: data });
        } else {
          swal("", data.message, "error");
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
              this.fetchCompanyDetails();
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
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  maxSelectFile = event => {
    let files = event.target.files; // create file object
    if (files.length > 1) {
      const msg = "Only one image can be uploaded at a time";
      event.target.value = null; // discard selected file
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkMimeType = event => {
    let files = event.target.files;
    let err = []; // create empty array
    const types = ["image/png", "image/jpeg", "image/gif"];
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
    let size = 2000000;
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
  onClickHandler = () => {
    if (this.state.selectedFile) {
      const data = new FormData();
      // var headers = {
      //   "Content-Type": "multipart/form-data",
      //   "x-access-token": localStorage.getItem("token")
      // };

      //for single files
      //data.append("file", this.state.selectedFile);
      //for multiple files
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }
      axios
        .post("/api/upload", data, {
          // receive two parameter endpoint url ,form data
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        })
        .then(res => {
          this.setState({
            Logo: res.data
          });
          // localStorage.setItem("UserPhoto", res.data);
          toast.success("upload success");
        })
        .catch(err => {
          toast.error("upload fail");
        });
    } else {
      toast.warn("Please select a photo to upload");
    }
  };
  onChangeHandler = event => {
    //for multiple files
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkFileSize(event) &&
      this.checkMimeType(event)
    ) {
      this.setState({
        selectedFile: files,
        loaded: 0
      });

      //for single file
      // this.setState({
      //   selectedFile: event.target.files[0],
      //   loaded: 0
      // });
    }
  };
  setnewstate() {
    this.setState({ Name: this.state.CompanyDetails[0].Name });

    this.setState({ Street: this.state.CompanyDetails[0].Street });
    this.setState({ PoBox: this.state.CompanyDetails[0].PoBox });
    this.setState({ PostalCode: this.state.CompanyDetails[0].PostalCode });
    this.setState({ Town: this.state.CompanyDetails[0].Town });
    this.setState({ Telephone1: this.state.CompanyDetails[0].Telephone1 });
    this.setState({ Telephone2: this.state.CompanyDetails[0].Telephone2 });
    this.setState({ Mobile: this.state.CompanyDetails[0].Mobile });
    this.setState({ Fax: this.state.CompanyDetails[0].Fax });
    this.setState({ Email: this.state.CompanyDetails[0].Email });
    this.setState({ Website: this.state.CompanyDetails[0].Website });
    this.setState({ PIN: this.state.CompanyDetails[0].PIN });
    this.setState({ Code: this.state.CompanyDetails[0].Code });
    this.setState({ Logo: this.state.CompanyDetails[0].Logo });
    this.setState({
      PhysicalAdress: this.state.CompanyDetails[0].PhysicalAdress
    });
  }
  handleswitchMenu = e => {
    e.preventDefault();
    if (this.state.profile === false) {
      this.setState({ profile: true });
    } else {
      this.setState({ profile: false });
    }

    this.setnewstate();
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      Name: this.state.Name,
      PhysicalAdress: this.state.PhysicalAdress,
      Street: this.state.Street,
      PoBox: this.state.PoBox,
      PostalCode: this.state.PostalCode,
      Town: this.state.Town,
      Telephone1: this.state.Telephone1,
      Telephone2: this.state.Telephone2,
      Mobile: this.state.Mobile,
      Fax: this.state.Fax,
      Email: this.state.Email,
      Website: this.state.Website,
      PIN: this.state.PIN,
      Logo: this.state.Logo,
      Code: this.state.Code
    };

    this.postData("/api/configurations", data);
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
            swal("", "Record has been saved!", "success");

            this.setState({ profile: true });
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
    let photostyle = {
      height: 180,
      width: 220
    };
    let divstyles = {
      margin: "0 auto",
      marginTop: "30px",

      width: "80%"
    };
    let divstyles1 = {
      borderRadius: "10px",
      background: "white",
      borderstyle: "solid",
      border: " 1px  grey",
      paddingTop: "15px",
      paddingLeft: "20px",
      paddingBottom: "20px"
    };

    if (this.state.profile) {
      return (
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-11">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>System Configurations</h2>
                  {/* <button onClick={this.exportpdf}>PDF</button> */}
                </li>
              </ol>
            </div>
          </div>
          <div style={divstyles}>
            <strong>Company information</strong>
            <hr />
            <div style={divstyles1}>
              <div className="row ">
                <div class="col-sm-3">
                  <img
                    src={
                      process.env.REACT_APP_BASE_URL +
                      "/profilepics/" +
                      this.state.CompanyDetails[0].Logo
                    }
                    alt=""
                    style={photostyle}
                  />
                </div>
                <div class="col-sm-4">
                  <h2>{this.state.CompanyDetails[0].Name}</h2>
                  <a>{this.state.CompanyDetails[0].Website}</a>
                  <h3>{this.state.CompanyDetails[0].Email}</h3>
                  <h3>{this.state.CompanyDetails[0].PhysicalAdress}</h3>
                </div>
                <div class="col-sm-3">
                  <h3>
                    Mobile:&nbsp; &nbsp; &nbsp;
                    {this.state.CompanyDetails[0].Mobile}
                  </h3>
                  <h3>
                    Email:&nbsp; &nbsp;&nbsp; &nbsp;
                    {this.state.CompanyDetails[0].Email}
                  </h3>
                  <h3>
                    Fax:&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    {this.state.CompanyDetails[0].Fax}
                  </h3>

                  <h3>
                    Town:&nbsp; &nbsp; &nbsp; &nbsp;
                    {this.state.CompanyDetails[0].Town}
                  </h3>
                  <h3>
                    Street:&nbsp; &nbsp; &nbsp;
                    {this.state.CompanyDetails[0].Street}
                  </h3>
                </div>
                <div class="col-sm-2" />
              </div>
              <div className="row">
                <div class="col-sm-11" />
                <div class="col-sm-1">
                  <button
                    type="button"
                    style={{ marginTop: 40 }}
                    onClick={this.handleswitchMenu}
                    className="btn btn-primary float-left"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-11">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>System Configurations</h2>
                </li>
              </ol>
            </div>
            <div className="col-lg-1">
              <div className="row wrapper ">
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.handleswitchMenu}
                  className="btn btn-primary float-left "
                >
                  Go back
                </button>
              </div>
            </div>
          </div>

          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputEmail4">
                    Code
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Code"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Code}
                    name="Code"
                  />
                </div>

                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputPassword4">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Name"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Name}
                    name="Name"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputPassword4">
                    Telephone1
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Telephone1"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Telephone1}
                    name="Telephone1"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputState">
                    Telephone2
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="Telephone2"
                    placeholder="Telephone2"
                    onChange={this.handleInputChange}
                    value={this.state.Telephone2}
                    name="Telephone2"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputPassword4">
                    Mobile
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Mobile"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Mobile}
                    name="Mobile"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputState">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="Email"
                    placeholder="Email"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Email}
                    name="Email"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputPassword4">
                    Website
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="Website"
                    placeholder="Website"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Website}
                    name="Website"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputState">
                    PIN
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="PIN"
                    placeholder="PIN"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.PIN}
                    name="PIN"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="inputCity">
                    PoBox
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="PoBox"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.PoBox}
                    name="PoBox"
                  />
                </div>
                <div class="form-group col-md-4">
                  <label class="font-weight-bold" for="inputState">
                    Town
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="Town"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Town}
                    name="Town"
                  />
                </div>
                <div class="form-group col-md-2">
                  <label class="font-weight-bold" for="inputZip">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="PostalCode"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.PostalCode}
                    name="PostalCode"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="font-weight-bold" for="inputState">
                    Physical Adress
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="PhysicalAdress"
                    placeholder="PhysicalAdress"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.PhysicalAdress}
                    name="PhysicalAdress"
                  />
                </div>
                <div class="form-group col-md-2">
                  <label class="font-weight-bold" for="inputState">
                    Street
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="Street"
                    placeholder="Street"
                    required
                    onChange={this.handleInputChange}
                    value={this.state.Street}
                    name="Street"
                  />
                </div>
                <div className="col-md-5">
                  <div className="form-group files">
                    <label class="font-weight-bold" for="inputState">
                      Logo
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      onChange={this.onChangeHandler}
                      multiple
                    />
                  </div>
                  <div class="form-group">
                    <Progress
                      max="100"
                      color="success"
                      value={this.state.loaded}
                    >
                      {Math.round(this.state.loaded, 2)}%
                    </Progress>
                  </div>
                </div>{" "}
                <div className="col-md-1">
                  <br />
                  <p />
                  <button
                    type="button"
                    class="btn btn-success "
                    onClick={this.onClickHandler}
                  >
                    Upload
                  </button>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      );
    }
  }
}

export default configurations;

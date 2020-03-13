import React, { Component } from "react";
import swal from "sweetalert";
import { Progress } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
var dateFormat = require("dateformat");

class ApplicantProfile extends Component {
    constructor() {
        super();
        this.state = {
            PE: [],
            Counties: [],
            privilages: [],
            Towns: [],
            PIN: "",
            Companyregistrationdate: "",
            RegistrationNo: "",
            Name: "",
            Location: "",
            County: "",
            CountyCode:"",
            POBox: "",
            PostalCode: "",
            Town: "",
            Email: "",
            Website: "",
            Mobile: "",
            Telephone: "",
            Logo: "",
            selectedFile: null,
            ApplicantCode:"",
            PEType:"",
            ApplicantID:""

        };     
    }
    maxSelectFile = event => {
        let files = event.target.files; // create file object
        if (files.length > 1) {
            const msg = "Only 1 image can be uploaded at a time";
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

        }
    };

    fetchApplicantDetails = () => {          
        fetch("/api/applicants/" + localStorage.getItem("UserName"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {
                    const data = {
                        Name: ApplicantDetails[0].Name,
                        PIN: ApplicantDetails[0].PIN,
                        RegistrationNo: ApplicantDetails[0].RegistrationNo,
                        Name: ApplicantDetails[0].Name,
                        Location: ApplicantDetails[0].Location,
                        County: ApplicantDetails[0].County,
                        POBox: ApplicantDetails[0].POBox,
                        PostalCode: ApplicantDetails[0].PostalCode,
                        Town: ApplicantDetails[0].Town,
                        Email: ApplicantDetails[0].Email,
                        Website: ApplicantDetails[0].Website,
                        Mobile: ApplicantDetails[0].Mobile,
                        Telephone: ApplicantDetails[0].Telephone,
                        Logo: ApplicantDetails[0].Logo,
                        CountyCode: ApplicantDetails[0].CountyCode,
                        ApplicantCode: ApplicantDetails[0].ApplicantCode,
                        ApplicantID: ApplicantDetails[0].ID,
                        Companyregistrationdate: dateFormat(new Date(ApplicantDetails[0].RegistrationDate).toLocaleDateString(), "isoDate"),
                        
                    };
                    this.setState(data);
                    // this.setState({ ApplicantDetails: ApplicantDetails });
                  

                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchPEDetails = () => {
       
        fetch("/api/PEUsers/" + localStorage.getItem("UserName"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(ApplicantDetails => {
                if (ApplicantDetails.length > 0) {
                    const data = {
                        Name: ApplicantDetails[0].Name,
                        PIN: ApplicantDetails[0].PIN,
                        RegistrationNo: ApplicantDetails[0].RegistrationNo,
                        Name: ApplicantDetails[0].Name,
                        Location: ApplicantDetails[0].Location,
                        County: ApplicantDetails[0].County,
                        POBox: ApplicantDetails[0].POBox,
                        PostalCode: ApplicantDetails[0].PostalCode,
                        Town: ApplicantDetails[0].Town,
                        Email: ApplicantDetails[0].Email,
                        Website: ApplicantDetails[0].Website,
                        Mobile: ApplicantDetails[0].Mobile,
                        Telephone: ApplicantDetails[0].Telephone,
                        Logo: ApplicantDetails[0].Logo,
                        CountyCode: ApplicantDetails[0].CountyCode,
                        ApplicantCode: ApplicantDetails[0].ApplicantCode,
                        ApplicantID: ApplicantDetails[0].ID,
                        PEType: ApplicantDetails[0].PEType,
                        Companyregistrationdate: dateFormat(new Date(ApplicantDetails[0].RegistrationDate).toLocaleDateString(), "isoDate"),
                    };
                    this.setState(data);
                    // this.setState({ ApplicantDetails: ApplicantDetails });


                } else {
                    swal("", ApplicantDetails.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };
    fetchCounties = () => {
        fetch("/api/counties", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Counties => {
                if (Counties.length > 0) {
                    this.setState({ Counties: Counties });
                } else {
                    swal("", Counties.message, "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };

    fetchTown = (Code) => {

        fetch("/api/Towns/" + Code, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(Towns => {
                if (Towns.length > 0) {

                    this.setState({ Town: Towns[0].Town });
                } else {
                    // swal("Oops!", "Invalid Postal Code", "error");
                }
            })
            .catch(err => {
                swal("", err.message, "error");
            });
    };

    handleInputChange = event => {
        // event.preventDefault();
        // this.setState({ [event.target.name]: event.target.value });
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        if (name === "PostalCode") {
            this.fetchTown(value)
        }
        this.setState({ [name]: value });
    };
    handleSelectChange = (UserGroup, actionMeta) => {
       
            this.setState({ CountyCode: UserGroup.value });
            this.setState({ [actionMeta.name]: UserGroup.label });
       
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
                            this.fetchCounties();
                            let UserCategory = localStorage.getItem("UserCategory");
                            if (UserCategory === "PE") {
                                this.fetchPEDetails();
                            } else {
                                this.fetchApplicantDetails();
                            }
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
    handleSubmit = event => {
        event.preventDefault();
        const data = {
            Name:this.state.Name,
            Location: this.state.Location,
            POBox: this.state.POBox,
            PostalCode: this.state.PostalCode,
            Town: this.state.Town,
            Mobile: this.state.Mobile,
            Telephone: this.state.Telephone,
            Email: this.state.Email,
            Logo: this.state.Logo,
            Website: this.state.Website,           
            County: this.state.CountyCode,
            Companyregistrationdate: this.state.Companyregistrationdate,
            PIN: this.state.PIN,
            RegistrationNo: this.state.RegistrationNo,
            Username: localStorage.getItem("UserName")   
          
        };
        let UserCategory = localStorage.getItem("UserCategory");
        if (UserCategory === "PE") {
            const pedata = {
                Name: this.state.Name,
                Location: this.state.Location,
                POBox: this.state.POBox,
                PostalCode: this.state.PostalCode,
                Town: this.state.Town,
                Mobile: this.state.Mobile,
                Telephone: this.state.Telephone,
                Email: this.state.Email,
                Logo: this.state.Logo,
                Website: this.state.Website,
                County: this.state.CountyCode,
                Companyregistrationdate: this.state.Companyregistrationdate,
                PIN: this.state.PIN,
                RegistrationNo: this.state.RegistrationNo,
                Username: localStorage.getItem("UserName"),
                PEType: this.state.PEType
            };
            this.postPEData("/api/PE/" + this.state.ApplicantCode, pedata);
        } else {
            this.postData("/api/applicants/" + this.state.ApplicantCode, data);
        }
        
        
    }; 
    postPEData(url = ``, data = {}) {
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
                    if (data.success) {
                        swal("", "Record has been updated!", "success");
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
                        swal("", "Record has been updated!", "success");
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
        const Counties = [...this.state.Counties].map((k, i) => {
            return {
                value: k.Code,
                label: k.Name
            };
        });
        let Signstyle = {
            height: 100,
            width: 150
        };
        let divstyle={
            margin:"50",
            background:"white",
            "padding-left": 40,
            "padding-right": 40,
            "padding-top":20
        }
        return (
            <div>
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <h2>{this.state.Name}</h2>
                        </li>
                    </ol>
                </div>
                    <ToastContainer/>
                <div className="col-lg-2">
                      </div>   </div>
                      <br/>
                <div style={divstyle}>
                    <form onSubmit={this.handleSubmit}>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="Name" className="font-weight-bold">
                                    Name                  </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Name"
                                    onChange={this.handleInputChange}
                                    value={this.state.Name}
                                    required
                                />
                            </div>
                            <div class="col-sm-6">
                                <label for="Location" className="font-weight-bold">
                                    County</label>

                                <Select
                                    name="County"
                                    value={Counties.filter(
                                        option =>
                                            option.label === this.state.County
                                    )}
                                    onChange={this.handleSelectChange}
                                    options={Counties}
                                    required
                                />
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="Email" className="font-weight-bold">
                                    Email  </label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="Email"
                                    onChange={this.handleInputChange}
                                    value={this.state.Email}
                                    required
                                />
                            </div>
                            <div class="col-sm-6">
                                <label for="Location" className="font-weight-bold">
                                    Location
                          </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Location"
                                    onChange={this.handleInputChange}
                                    value={this.state.Location}
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="PO BOXs" className="font-weight-bold">
                                    PO BOX        </label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="POBox"
                                    onChange={this.handleInputChange}
                                    value={this.state.POBox}
                                    required
                                />
                            </div>
                            <div class="col-sm-3">
                                <label for="PostalCode" className="font-weight-bold">
                                    Postal Code
                          </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="PostalCode"
                                    onChange={this.handleInputChange}
                                    value={this.state.PostalCode}
                                    required
                                />
                            </div>
                            <div class="col-sm-3">
                                <label for="Town" className="font-weight-bold">
                                    Town
                          </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Town"
                                    onChange={this.handleInputChange}
                                    value={this.state.Town}
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <label for="Mobile" className="font-weight-bold">
                                    Mobile  </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    name="Mobile"
                                    onChange={this.handleInputChange}
                                    value={this.state.Mobile}
                                    required
                                />
                            </div>
                            <div class="col-sm-3">
                                <label for="Telephone" className="font-weight-bold">
                                    Telephone </label>
                                <input
                                    type="number"
                                    class="form-control"
                                    name="Telephone"
                                    onChange={this.handleInputChange}
                                    value={this.state.Telephone}
                                    required
                                />
                            </div>
                            <div class="col-sm-6">
                                <label for="Website" className="font-weight-bold">
                                    Website </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="Website"
                                    onChange={this.handleInputChange}
                                    value={this.state.Website}
                                    required
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <label for="Telephone" className="font-weight-bold">
                                    Registration No </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="RegistrationNo"
                                    onChange={this.handleInputChange}
                                    value={this.state.RegistrationNo}
                                    required
                                />
                            </div>
                            <div class="col-sm-3">
                                <label for="Telephone" className="font-weight-bold">
                                    PIN </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="PIN"
                                    onChange={this.handleInputChange}
                                    value={this.state.PIN}
                                    required
                                />
                            </div>

                            <div class="col-sm-6">
                                <label for="Companyregistrationdate" className="font-weight-bold">
                                    Registration Date                  </label>
                                <input
                                    type="date"
                                    name="Companyregistrationdate"
                                    required
                                    defaultValue={this.state.Companyregistrationdate}
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    id="Companyregistrationdate"

                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="Logo" className="font-weight-bold">
                                    Logo       </label>
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
                                    type="button"
                                    class="btn btn-success "
                                    onClick={this.onClickHandler}
                                >
                                    Upload
                          </button>
                            </div>
                            <div class="col-sm-6">
                                <br />
                                <div className="form-group">
                                    <img
                                        alt=""
                                        className=""
                                        src={
                                            process.env.REACT_APP_BASE_URL +
                                            "/profilepics/" +
                                            this.state.Logo
                                        }
                                       
                                        style={Signstyle}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" row">
                            <div className="col-sm-2" />
                            <div className="col-sm-8" />
                            <div className="col-sm-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary float-right"
                                >
                                    UPDATE
                                                </button>
                            </div>
                        </div>
                    </form>

                </div>

        </div>
                );
            }
        }
        
        export default ApplicantProfile;

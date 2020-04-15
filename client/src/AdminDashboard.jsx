import React, { Component } from "react";
import swal from "sweetalert";
import { Progress } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Modal from 'react-awesome-modal';
var dateFormat = require("dateformat");
class AdminDashboard extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            PE: [],
            Counties: [],
            privilages: [],
            Towns: [],         
            PIN:"",
            RegistrationNo:"",
            Name: "",
            Location: "",
            County: "",
            POBox: "",
            PostalCode: "",
            Town: "",
            Email: "",
            Website: "",
            Mobile: "",
            Telephone: "",  
            Logo: "",
            isUpdate: false,
            selectedFile: null,
            redirect: false,          
            Companyregistrationdate:"",
            Procuringentity:""
            
        };
              this.handleInputChange = this.handleInputChange.bind(this);
    }

    openModal=()=> {
        this.setState({ open: true });
      
    }
    closeModal = () => {
        this.setState({ open: false });
    }
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
    setRedirect = () => {
        this.setState({
            redirect: true
        });
    };
   
    handleSelectChange = (County, actionMeta) =>{
        this.setState({ [actionMeta.name]: County.value });      
        if (County.value ==="PE"){
            this.setState({ open: true });
        }
        if (actionMeta.name==="Procuringentity"){
            let selectedPe = County.value ;
            var rows = [...this.state.PE];
            const filtereddata = rows.filter(
                item => item.PEID == selectedPe
            );
            // County: "NAIROBI"
            // CountyCode: "047"
            let newdetails={
                PIN: filtereddata[0].PIN,
                RegistrationNo: filtereddata[0].RegistrationNo,
                Name: filtereddata[0].Name,
                Location: filtereddata[0].Location,
                County: filtereddata[0].CountyCode,
                POBox: filtereddata[0].POBox,
                PostalCode: filtereddata[0].PostalCode,
                Town: filtereddata[0].Town,
                Email: filtereddata[0].Email,
                Website: filtereddata[0].Website,
                Mobile: filtereddata[0].Mobile,
                Telephone: filtereddata[0].Telephone,
                Logo: filtereddata[0].Logo,
           
                Companyregistrationdate: dateFormat(new Date(filtereddata[0].RegistrationDate).toLocaleDateString(), "isoDate")
                   
            }
            this.setState(newdetails);
           
        }
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
                    swal("Oops!", Counties.message, "error");
                }
            })
            .catch(err => {
                swal("Oops!", err.message, "error");
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
                swal("Oops!", err.message, "error");
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
   
    maxSelectFile = event => {
        let files = event.target.files; // create file object
        if (files.length > 1) {
            const msg = "Only One image can be uploaded at a time";
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
    componentDidMount() {
        this.fetchCounties();
        this.fetchPE()
    }
    handleSubmit = event => {
        event.preventDefault();
         
        const Logindata = {
            Name: this.state.Name,
            Username: this.state.PIN,
            Email: this.state.Email,
            Phone: this.state.Mobile,
            Password: this.state.LoginPassword,
            Category: this.state.LoginCategory,
            IDnumber: this.state.PIN,         
            DOB: this.state.Companyregistrationdate,
        };
        if (this.state.LoginPassword == this.state.ConfirmPassword) {
            if (this.state.County){
                this.postloginData("/api/Signup", Logindata);
            }else{
                swal("", "County is required", "error");
            }
           
        } else {
            swal("","Password and Confirm password do not match","error");
        }
       
     
    };
    postPEUsers(url = ``, data = {}) {
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
                        swal("Saved!", "Registration has been Successful! please check you email to get your verification code", "success");
                        setTimeout(function () {

                        }, 7000);
                        this.setRedirect();

                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    }
    postPEData(url = ``, data = {}) {
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
                        swal("", "Registration has been Successful! please check you email to get your verification code", "success");
                        setTimeout(function () {

                        }, 7000);
                        this.setRedirect();

                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("Oops!", "Error occured while creating account", "error");
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
                       if (data.success) {
                        swal("", "Registration has been Successful! please check you email to get your verification code", "success");
                        setTimeout(function () {
                           
                        }, 7000);
                           this.setRedirect();
                       
                    } else {
                        swal("", data.message, "error");
                    }
                })
            )
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    }   
    postloginData(url = ``, data = {}) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response =>
                response.json().then(response => {
                    if (response.success) {
                       
                        const datatoPost = {

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
                            County: this.state.County,
                            Companyregistrationdate: this.state.Companyregistrationdate,
                            PIN: this.state.PIN,
                            RegistrationNo: this.state.RegistrationNo,
                            UserName: this.state.PIN
                        }; 
                        if (this.state.LoginCategory==="PE"){
                            let pedata={
                                UserName: this.state.PIN, 
                                Procuringentity: this.state.Procuringentity,
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
                                County: this.state.County,
                                Companyregistrationdate: this.state.Companyregistrationdate,
                                PIN: this.state.PIN,
                                RegistrationNo: this.state.RegistrationNo
                               
                            }
                            localStorage.setItem("Unverifiedusername", this.state.PIN);
                            this.SendMail(response.activationCode);
                            this.postPEData("/api/PEUsers", pedata)
                        }else{
                            localStorage.setItem("Unverifiedusername", this.state.PIN);
                            this.SendMail(response.activationCode);
                            this.postData("/api/applicants", datatoPost);  
                        }
                        
                     
                      
                    } else {
                        let resmsg = response.message;
                        if (resmsg.match(/(^|\W)Duplicate($|\W)/)) {
                            if (resmsg.match(/(^|\W)MobileNo($|\W)/)) {
                                swal("", "MobileNo Already registered", "error");
                            } else if (resmsg.match(/(^|\W)Username($|\W)/)) {
                                swal("", "An account for this instituition already exist.Use reset password to get new password", "error");
                            }
                            else if (resmsg.match(/(^|\W)Email($|\W)/)) {
                                swal("", "Email is already registered", "error");
                            } else if (resmsg.match(/(^|\W)PRIMARY($|\W)/)) {
                                swal("", "An account for this instituition already exist.Use reset password to get new password", "error");

                            }else{
                                swal("", "Registration failed", "error");
                            }

                            
                            
                        }else{
                            swal("","Registration failed", "error");
                        }
                        
                    }
                })
            )
            .catch(err => {
                swal("Oops!", err.message, "error");
            });
    }
    SendMail(activationCode) {
        const emaildata = {
            to: this.state.Email,
            subject: "EMAIL ACTIVATION",
            name: this.state.Name,
            Username: this.state.PIN,
            activationCode: activationCode,
           category:"Registration"
        };
        fetch("/api/sendMail/CreatAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emaildata)
        })
            .then(response =>
                response.json().then(data => {
                    // if (data.success) {
                    // } else {
                    //     //swal("Saved!", data.message, "error");
                    // }
                })
            )
            .catch(err => {
                //swal("Oops!", err.message, "error");
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
            width: 300
        };
        let divconatinerstyle = {
            "margin-top":"30px",
            "padding-top":"50px",
            width: "100%",
            margin: "0 auto",
            // 
        };
        let childdiv = {
            margin: "30px"
        };
        
        let Categories = [
            { value: "Applicant", label: "Applicants/Suppliers/Interested Party" },
            {
                value: "PE",
                label: "Procuring Entity"
            }
        ];
        let rowstyle={
            backgroundColor: "white"
        }
        const PE = [...this.state.PE].map((k, i) => {
            return {
                value: k.PEID,
                label: k.Name
            };
        });
        if (this.state.redirect) {
            return (window.location = "#/EmailVerification");
        }
            return (
                <div className="container">
                
                    <div style={divconatinerstyle}>
                        <ToastContainer />
                        <div className="row">
                            <div class="col-sm-12">                              
                                <div style={rowstyle}> 
                                    <div style={{
                                        backgroundColor: " #e74c3c",marginTop:"10px"}}>
                                        <br/>
                                        <h2 style={{ "text-align": "center", color: "white",marginBottom:"20px" }}>ARCMS USER REGISTRATION</h2>
                                        <hr />   
                                    </div>                                                               
                                    <div style={childdiv}>
                                        
                                        <form onSubmit={this.handleSubmit}>
                                                <div class="row">
                                                  
                                                    <div class="col-sm-6">
                                                        <label for="Name" className="font-weight-bold">
                                                            Category                  </label>
                                                        <Select
                                                            name="LoginCategory"
                                                            //value={this.state.LoginCategory}
                                                            onChange={this.handleSelectChange}
                                                            options={Categories}
                                                            required
                                                        />
                                                    </div>

                                                </div>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <label for="Name" className="font-weight-bold">
                                                       Organization Name                  </label>
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
                                                                option.value === this.state.County
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
                                                <div class="col-sm-3">
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
                                                    <div class="col-sm-3">
                                                        <label for="Companyregistrationdate" className="font-weight-bold">
                                                            Registration Date                  </label>
                                                        <input
                                                            type="date"
                                                            name="Companyregistrationdate"
                                                            required
                                                        value={this.state.Companyregistrationdate}
                                                            className="form-control"
                                                            onChange={this.handleInputChange}
                                                            id="Companyregistrationdate"

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
                                                <div class="col-sm-3">
                                                    <label for="Username" className="font-weight-bold">
                                                        Password                  </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="LoginPassword"
                                                        id="LoginPassword"
                                                        required
                                                        onChange={this.handleInputChange}
                                                        value={this.state.LoginPassword}
                                                    />
                                                </div> 
                                                    <div class="col-sm-3">
                                                        <label for="Name" className="font-weight-bold">
                                                            Confirm password                  </label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            name="ConfirmPassword"
                                                            id="ConfirmPassword"
                                                            required
                                                            onChange={this.handleInputChange}
                                                            value={this.state.ConfirmPassword}
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
                                                            {Math.round(this.state.loaded, 2)}%</Progress>
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
                                                            src={process.env.REACT_APP_BASE_URL +"/profilepics/" + this.state.Logo}
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
                                                        Save
                                                </button>
                                                </div>
                                            </div>
                                        </form>
                                           
                                           
                                       

                                        <p></p>
                                        <div className="row">
                                            <div className="card-footer col-sm-12">
                                                <div className="d-flex justify-content-center links">
                                                    Already have an account?{" "}
                                                    <Link to="/login">Login</Link>
                                                </div>

                                            </div>
                                        </div>
                                       
                                    </div>
                                 
                                </div>
                            </div>
                        </div>                      
                    </div>

                    <Modal visible={this.state.open} width="600" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <a style={{ float: "right", color: "red", margin: "10px" }} href="javascript:void(0);" onClick={() => this.closeModal()}><i class="fa fa-close"></i></a>
                        <div>
                            <h4 style={{ "text-align": "center", color: "#1c84c6" }}>Procuring Entity</h4>
                            <div className="container-fluid">
                                <div className="col-sm-12">
                                    <div className="ibox-content">
                                        <form onSubmit={this.handleSubmit}>
                                            <div class="row">

                                                <div class="col-sm-11">
                                                    <label for="Username" className="font-weight-bold">
                                                        Select Institution </label>
                                                    <Select
                                                        name="Procuringentity"

                                                        onChange={this.handleSelectChange}
                                                        options={PE}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <br />
                                            <div className=" row">
                                                <div className="col-sm-11" />
                                                <div className="col-sm-1">
                                                    <button
                                                        type="button"
                                                        onClick={this.closeModal}
                                                        className="btn btn-primary float-right"
                                                    >
                                                        Select
                                                </button>
                                                </div>
                                                
                                                

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Modal>

                </div>
            );
        
    }
}

export default AdminDashboard;

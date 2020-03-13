import React, { Component } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirect: false,
      msg1: "",
      answer: "",
      Correctanswer: "",
      MobileNO: "",
      SMSCode: "",
      UserSMSCode: "",
      MobileVerified: false,
      ShowVerificationText: false,
      token: "",
      VerifyEmailWindow: false,
      stopcounter: true
    };
    this.VerifySMS = this.VerifySMS.bind(this);
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    this.postData("/api/login", data);
  };

  postData(url = ``, data = {}, req, res) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          if (data.success) {
            let Code = Math.floor(100000 + Math.random() * 900000);
            //  this.SendSMS(data.userdata.Phone, Code);
            //timer start
            this.setState({ stopcounter: false });

            var i = 120;
            var inv = setInterval(() => {
              if (i > 0) {
                document.getElementById("counter").innerHTML = --i;
              } else {
                this.setState({ stopcounter: true });
                clearInterval(inv);
              }
            }, 60000 / 60);

            //timer
            const statedata = {
              ShowVerificationText: true,
              SMSCode: Code,
              MobileNO: data.userdata.Phone,
              token: data.token
            };
            this.setState(statedata);
            localStorage.setItem("UserName", data.userdata.Username);
            localStorage.setItem("UserData", JSON.stringify(data.userdata));
            localStorage.setItem("UserPhoto", data.userdata.Photo);
            localStorage.setItem("UserCategory", data.userdata.Category);
          } else {
            let Msgg = data.message;
            if (Msgg === "Email Not Verified!") {
              let emailaddress = data.userdata.Email;
              let activationCode = data.userdata.ActivationCode;
              localStorage.setItem(
                "Unverifiedusername",
                data.userdata.Username
              );
              swal({
                title: "Email Not verified",
                text: "Click OK to send verification code to your email",
                icon: "warning",
                dangerMode: false
              }).then(ValidateNow => {
                if (ValidateNow) {
                  alert("Verification Code has been sent to your email");
                  this.setState({
                    VerifyEmailWindow: true
                  });
                  this.SendMail(activationCode, emailaddress);
                }
              });
            } else {
              swal("", data.message, "error");
            }
          }
        })
      )
      .catch(err => {
        swal("", err.message, "error");
      });
  }
  SendMail(activationCode, email) {
    const emaildata = {
      to: email,
      subject: "EMAIL ACTIVATION",
      activationCode: activationCode
    };
    fetch("/api/sendMail/EmailVerification", {
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
          //   swal("", "Email Could not be sent", "error");
          // }
        })
      )
      .catch(err => {
        //swal("Oops!", err.message, "error");
      });
  }
  SendSMS(MobileNumber, Code) {
    let message =
      "Your Activation Code is: " +
      Code +
      " Use this to activate your account.";
    let data = {
      MobileNumber: MobileNumber,
      Message: message
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
  VerifySMS = () => {
    alert(this.state.SMSCode);
    if (this.state.UserSMSCode) {
      if (this.state.SMSCode == this.state.UserSMSCode) {
        this.setState({
          MobileVerified: true
        });
        localStorage.setItem("token", this.state.token);
        this.setRedirect();
      } else {
        this.setState({ msg1: "Wrong Verification code" });
        this.setState({
          MobileVerified: false
        });
      }
    } else {
      alert("SMS Code is required");
    }
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return (window.location = "/");
    }
    if (this.state.VerifyEmailWindow) {
      return (window.location = "#/EmailVerification");
    }

    let pstyle = {
      color: "red"
    };
    let btnstyle = {
      background: "#1ab394",
      color: "white"
    };
    return (
      <div className="container">
        <div className="row vertical-center-row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title text-center">Sign In</h3>
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <label htmlFor="Datereceived" className="font-weight-bold">
                      Username/Email
                    </label>
                    {/* <p>{process.env.REACT_APP_BASE_URL}</p> */}
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                      </div>
                      <input
                        type="text"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Username"
                        required
                        onChange={this.handleInputChange}
                        name="username"
                        value={this.state.username}
                      />
                    </div>
                    <label htmlFor="Datereceived" className="font-weight-bold">
                      Password
                    </label>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-key" />
                        </span>
                      </div>
                      <input
                        type="password"
                        id="inputpassword"
                        className="form-control"
                        placeholder="password"
                        required
                        onChange={this.handleInputChange}
                        value={this.state.password}
                        name="password"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Datereceived"
                        className="font-weight-bold"
                      >
                        SMS Verification Code
                      </label>

                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.handleInputChange}
                          value={this.state.UserSMSCode}
                          name="UserSMSCode"
                        />{" "}
                        &nbsp; &nbsp;
                        {this.state.stopcounter ? (
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary  text-uppercase float-left"
                          >
                            Get SMS Code
                          </button>
                        ) : (
                            <b
                              style={btnstyle}
                              className="btn btn-sm btn-btn-primary"
                              id="counter"
                            ></b>
                          )}
                      </div>
                      <label
                        htmlFor="Datereceived"
                        className="font-weight-bold"
                        style={pstyle}
                      >
                        {this.state.msg1}
                      </label>
                    </div>
                  </form>
                  <div className="input-group form-group text">
                    <button
                      style={btnstyle}
                      className="btn  btn-primary form-control"
                      onClick={this.VerifySMS}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                {/* <div className="d-flex justify-content-center links">
                  Don't have an account?{" "}
                  <Link to="/createacc">Create Account</Link>
                </div> */}
                <br />
                <div className="d-flex justify-content-center">
                  <Link to="ForgotPassword">Forgot your password?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

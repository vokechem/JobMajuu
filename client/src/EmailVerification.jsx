import React, { Component } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class EmailVerification extends Component {
  constructor() {
    super();
    this.state = {
      Code: "",
      redirect: false
    };

    this.generatenumbers = this.generatenumbers.bind(this);
  }
  generatenumbers() {
    var min = 1;
    var max = 100;
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    var rand1 = Math.floor(Math.random() * (max - min + 1) + min);
    var Correctanswer = rand + rand1;
    this.setState({ Value1: rand });
    this.setState({ Value2: rand1 });
    this.setState({ Correctanswer: Correctanswer });
  }

  generatenew = event => {
    this.generatenumbers();
  };
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: localStorage.getItem("Unverifiedusername"),
      Code: this.state.Code
    };
    this.postData("/api/EmailVerification", data);
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
            if (data.results[0].msg === "Email Verified") {
              alert("Email Verified,You can now login");
              this.setRedirect();
            } else {
              toast.warn(data.results[0].msg);
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

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      // return <Redirect to="/Home" />;
      return (window.location = "#/login");
    }

    return (
      <div className="container">
        <div className="row vertical-center-row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card">
                <div className="card-body">
                  <ToastContainer />
                  <h3 className="card-title text-center">EMAIL VERIFICATION</h3>
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <label htmlFor="Datereceived" className="font-weight-bold">
                      Verification Code
                    </label>
                    <div className="input-group form-group">
                      <input
                        type="text"
                        id="inputEmail"
                        className="form-control"
                        required
                        onChange={this.handleInputChange}
                        name="Code"
                        value={this.state.Code}
                      />
                    </div>

                    <button
                      className="btn btn-lg btn-primary  text-uppercase float-right"
                      type="submit"
                    >
                      Verify
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailVerification;

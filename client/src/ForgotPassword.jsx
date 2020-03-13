import React, { Component } from "react";
import swal from "sweetalert";

import { Redirect } from "react-router-dom";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      redirect: false
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      Email: this.state.Email
    };
    this.postData("/api/ResetPassword", data);
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
            alert("Password has been changed,Please check your Email");
            this.setRedirect();
          } else {
            swal("", data.results, "error");
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
      return <Redirect to="/Login" push />;
      // return (window.location = "#/login");
    }

    return (
      <div className="container">
        <div className="row vertical-center-row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title text-center">RESET PASSWORD</h3>
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <label htmlFor="Datereceived" className="font-weight-bold">
                      Email
                    </label>
                    <div className="input-group form-group">
                      <input
                        type="email"
                        className="form-control"
                        required
                        onChange={this.handleInputChange}
                        value={this.state.Email}
                        name="Email"
                      />
                    </div>

                    <button
                      className="btn btn-lg btn-primary  text-uppercase float-right"
                      type="submit"
                    >
                      Reset password
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

export default ForgotPassword;

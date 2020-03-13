import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
import { Link } from "react-router-dom";
var dateFormat = require("dateformat");

class CloseRegistrations extends Component {
  constructor() {
    super();
    this.state = {
      ApplicationNo: "",

      Applications: []
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handleSubmit = event => {
    event.preventDefault();
    swal({
      text:
        "Are you sure that you want to close registraion for this application?",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        return fetch("/api/casesittingsregister/" + this.state.ApplicationNo, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                swal("", "Closed successfully", "success");
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
  //   handleSubmit = event => {
  //     event.preventDefault();

  //     const data = {

  //       ApplicationNo: this.state.ApplicationNo,

  //     };

  //     this.postData("/api/casesittingsregister", data);
  //   };
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
          swal("", Applications.message, "error");
        }
      })
      .catch(err => {
        swal("", err.message, "error");
      });
  };
  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });

    if (actionMeta.name === "ApplicationNo") {
      var rows = [...this.state.Applications];
      const filtereddata = rows.filter(
        item => item.ApplicationNo == UserGroup.value
      );
      this.setState({
        Date: dateFormat(new Date().toLocaleDateString(), "isoDate")
      });
      this.setState({ VenueID: filtereddata[0].VenueID });
      this.setState({ Venue: filtereddata[0].VenueName });
      this.setState({ Branch: filtereddata[0].BranchName });
    }
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
  GoBack = e => {
    e.preventDefault();
    this.setState({ summary: "Step 1" });
  };

  render() {
    let divconatinerstyle = {
      width: "80%",
      margin: "0 auto",
      backgroundColor: "white"
    };
    let FormStyle = {
      margin: "20px"
    };

    const ApplicationOptions = [...this.state.Applications].map((k, i) => {
      return {
        value: k.ApplicationNo,
        label: k.ApplicationNo
      };
    });

    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <h2>CLOSE SITTING REGISTRATION</h2>
              </li>
            </ol>
          </div>
          <div className="col-lg-2">
            <div className="row wrapper ">
              <Link to="/">
                <button
                  type="button"
                  style={{ marginTop: 40 }}
                  onClick={this.openModal}
                  className="btn btn-warning  "
                >
                  &nbsp; Close
                </button>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <div style={divconatinerstyle}>
          {/* <div>
            <h2 style={HeadingStyle}>CLOSE SITTING REGISTRATION</h2>
          </div> */}
          <div>
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
              </div>

              <p></p>
              <div className=" row">
                <div className="col-sm-6">
                  <button
                    type="submit"
                    className="btn btn-primary float-center"
                  >
                    Close
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

export default CloseRegistrations;

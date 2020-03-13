import React, { Component } from "react";
import swal from "sweetalert";
import Select from "react-select";
class HearingNotices extends Component {
  constructor() {
    super();
    this.state = {
      Applications: [],
      ApplicationNo: "",
      FilePath: ""
    };
  }

  handleSelectChange = (UserGroup, actionMeta) => {
    this.setState({ [actionMeta.name]: UserGroup.value });
    let FilePath =
      process.env.REACT_APP_BASE_URL +
      "/HearingNotices/" +
      UserGroup.value +
      ".pdf";

    this.setState({ FilePath: FilePath });
  };
  fetchApplications = () => {
    fetch("/api/HearingNotices", {
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
  Downloadfile = () => {
    let filepath =
      process.env.REACT_APP_BASE_URL +
      "/HearingNotices/" +
      this.state.ApplicationNo +
      ".pdf";
    window.open(filepath);
  };
  render() {
    let FormStyle = {
      margin: "20px"
    };
    const ApplicationNoOptions = [...this.state.Applications].map((k, i) => {
      return {
        value: k.ApplicationNo,
        label: k.ApplicationNo
      };
    });

    return (
      <div>
        <div>
          <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <h2>Hearing Notices</h2>
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
                      Application NO{" "}
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
                  <div class="col-sm-2">
                    <button
                      onClick={this.Downloadfile}
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

export default HearingNotices;

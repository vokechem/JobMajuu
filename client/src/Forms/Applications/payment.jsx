import React, { Component } from "react";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
class payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Applicationfees: [],
      ApplicationID: this.props.location.ApplicationID,
      ApplicationNo: this.props.location.ApplicationNo
    };
  }

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
          this.setState({ Applicationfees: [] });
          this.setState({ Applicationfees: Applicationfees });
          this.setState({ TotalAmountdue: Applicationfees[0].total });
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
              this.fetchApplicationfees(this.state.ApplicationID);
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
  formatNumber = num => {
    let newtot = Number(num).toFixed(2);
    return newtot.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  render() {
    let headingstyle = {
      color: "#7094db"
    };
    let photostyle1 = {
      height: 150,
      width: 200
    };
    return (
      <div>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-10">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <h2 className="font-weight-bold">
                  APPLICATION NO: {this.state.ApplicationNo}
                </h2>
              </li>
            </ol>
          </div>
          <div className="col-lg-2">
            <div className="row wrapper ">
              <Link to="/Applications">
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
        <p></p>

        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 ">
            <h3 style={headingstyle}>Fees Description</h3>

            <div className="col-lg-10 border border-success rounded">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Fees description</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.Applicationfees.map((r, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{r.EntryType}</td>
                      <td className="font-weight-bold">
                        {this.formatNumber(r.AmountDue)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th></th>
                    <th>Total Amount</th>
                    <th className="font-weight-bold text-danger">
                      {" "}
                      {this.formatNumber(this.state.TotalAmountdue)}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-1"></div>
          <h3 style={headingstyle}>
            &nbsp; &nbsp; &nbsp; REFFERENCE NUMBER: &nbsp;
            <span className="font-weight-bold text-danger">
              {this.state.ApplicationNo}
            </span>{" "}
            <span className="font-weight-bold text-warning">
              &nbsp;&nbsp;&nbsp; Quote this Reference Number when making
              payment.
            </span>
          </h3>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-1"></div>
          <h3 style={headingstyle}>
            {" "}
            &nbsp; &nbsp; &nbsp;Select Payment Mode{" "}
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-2">
            <img
              style={photostyle1}
              src={process.env.REACT_APP_BASE_URL + "/images/bank.jpg"}
              alt=""
            />
          </div>
          <div className="col-lg-2">
            <img
              style={photostyle1}
              src={process.env.REACT_APP_BASE_URL + "/images/mpesa.jpg"}
              alt=""
            />
          </div>
          <div className="col-lg-2">
            <img
              style={photostyle1}
              src={process.env.REACT_APP_BASE_URL + "/images/card.jpg"}
              alt=""
            />
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  }
}

export default payment;

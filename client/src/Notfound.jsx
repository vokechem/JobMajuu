import React, { Component } from "react";

class Notfound extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const divStyle = {
      margin: "200px"
    };
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <div style={divStyle} />
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <h1>
              <a href="/" className="btn btn-link">
                Back to Home
              </a>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Notfound;

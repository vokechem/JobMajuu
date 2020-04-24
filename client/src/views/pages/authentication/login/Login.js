import React from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { Mail, Lock} from "react-feather"
import { history } from "../../../../history"
import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"
class Login extends React.Component {
  state = {
    activeTab: "1",
    email : "",
    password: ""
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
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
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                      <CardBody>
                        <h4>Login</h4>
                        <p>Welcome back, please login to your account.</p>
                        <Form onSubmit={e => e.preventDefault()}>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="email"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>Email</Label>
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={e => this.setState({ password: e.target.value })}
                            />
                            <div className="form-control-position">
                              <Lock size={15} />
                            </div>
                            <Label>Password</Label>
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left">
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
                           <Button.Ripple color="primary" outline>
                           Register                           
                          </Button.Ripple>
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
                          </FormGroup>
                       
                        </Form>
                        <div className="d-flex justify-content-between">
                            <Button.Ripple color="primary" outline>
                             Register                           
                            </Button.Ripple>
                            <Button.Ripple color="primary" type="submit" onClick={() => history.push("/")}>
                                Login 
                            </Button.Ripple>
                          </div>
                      </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Login

import React from "react";
import { Container, Row, Col } from "reactstrap";
import Login from "./Login";
import Register from "./Register";

const Auth = (props) => {
    return (
        <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Register updateToken={props.updateToken} />
                </Col>
                <Col className="login-col">
                    <Login updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;
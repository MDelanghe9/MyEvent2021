import React, { useState } from "react";
import "../../App.css";
import {
    Row,
    Col,
    Form,
  } from "react-bootstrap";
  import FloatingLabel from "react-bootstrap-floating-label";

export function AccountBox(props) {
    return(
    <Row className="w-100">
        <Col className="w-100">
            <div className="topContainer w-100">
                <div className="backDrop">
                </div>
            </div>

            <div className="headerContainer w-75">
                <div className="headerText">
                    Login
                </div>
                <p className="textForm"></p>
            </div>

        <div className="formContainer">
            <FloatingLabel controlId="pseudoLogin" label="Connexion GOOGLE" className="mb-3">
                <Form.Control type="pseudo" placeholder="TotoDu59" />
            </FloatingLabel>
        </div>
        </Col>
    </Row>
    )
}
import React, { useState } from "react";
import "../../App.css";
import {
    Row,
    Col,
    Form,
  } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import GoogleLoginUtils from  '../../components/utils/GoogleLoginUtils'
import GoogleLogoutUtils from '../../components/utils/GoogleLogoutUtils';

function AccountBox(props) {
    
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

            <div className='formContainer'>
                <div className='mb-3'><GoogleLoginUtils {...props}/></div>
                <div className='mb-3'><GoogleLogoutUtils {...props}/></div>
            </div>
            {/* <div className="formContainer">
                <FloatingLabel controlId="pseudoLogin" label="pseudo" className="mb-3">
                    <Form.Control type="pseudo" placeholder="TotoDu59" />
                </FloatingLabel>

                <FloatingLabel controlId="emailLogin" label="emailLogin" className="mb-3">
                    <Form.Control type="email" placeholder="exemple@gmail.com" />
                </FloatingLabel>

                <FloatingLabel controlId="passwordLogin" label="password" className="mb-3">
                    <Form.Control type="password" placeholder="Mot de passe" />
                </FloatingLabel>

                <FloatingLabel controlId="g" label="google">
                    <Form.Control type="g" placeholder="google connexion" />
                </FloatingLabel>
            </div> */}
        </Col>
    </Row>
    )
}

export default AccountBox;

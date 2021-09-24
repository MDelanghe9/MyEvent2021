import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import NavLogin from "../components/navBarLogin";
import Footer from "../components/footer";
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    Modal,
    Dropdown,
    PopoverTitle
  } from "react-bootstrap";

function LoginPage(props) {


  useEffect(() => {
  });

  return (
    <>
    <NavLogin />
        <Container>
            <Row className=" w-100">
                <Col className="event-list text-center imgRandomHome">
                    <div className="absolutTitle imgConcert">
                        <p>ANNULER</p>
                        <img src="https://www.ulyn.net/img1/1029379_2.jpeg?c=2"
                            alt="photo concerts" width="100%" height="auto"/>
                    </div>
                   
                </Col>
            </Row>
        </Container>
      <Footer/>
    </>
  );
}

export default LoginPage;
import React, {Component} from 'react';
import '../App.css';
import { MDBCol, MDBIcon } from "mdbreact";
import {AiOutlineSearch} from 'react-icons/ai';

const SearchBar = () => {
    return (
      <MDBCol md="6">
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend">
            <AiOutlineSearch/>
            <MDBIcon className="text-white" icon="search" />
          </div>
          <input className="form-control my-0 py-1" type="text" placeholder=" Rechercher" aria-label="Search" />
        </div>
      </MDBCol>
    );
  }
  
  export default SearchBar;
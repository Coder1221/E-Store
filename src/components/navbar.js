import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import logo from './logo.png';
import cart from './cart.png';

export default class Navbar extends Component {
    render() {
        return (
        <Nav className="navbar navbar-expand-md  navbar-dark">
             <Link to="/">
               <img src={logo} alt="store" height="50" className="navbar-brand"/>
            </Link>
          
          {/* <nav class="nav">
              <a class="nav-link active" >Active</a>
              <a class="nav-link" >Link</a>
              <a class="nav-link disabled">Disabled</a>
          </nav> */}

          <div class="nav-link disabled mx-auto">
            Centered element
          </div>

          <Link to="/cart" className="ml-auto">
               <img src={cart} alt="store" height="50" className="navbar-brand"/>
          </Link>
        </Nav>
    )}
};

const Nav = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;
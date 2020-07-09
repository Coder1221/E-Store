import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import cart from './cart.png';
import {ProductConsumer} from '../context';

export default class Navbar extends Component {
    render() {
      return (
        <ProductConsumer>
        {value=>{
          return(
        
        <Nav className="navbar navbar-expand-md  navbar-dark">
             <Link to="/">
               <img src={logo} alt="store" height="50" className="navbar-brand"/>
            </Link>
          

          <nav className="nav">
              
              <a className="nav-link active" onClick={()=>{
                  console.log('jerere')
                }} >Recommendations</a>


              <a className="nav-link active">Top sold</a>

              <FacebookLogin
                  appId="1956864841113341"
                  fields="name,email,picture"
                  callback={(response)=>{value.responseFacebook(response)}}
                  render={renderProps => (
                      <BUTTON onClick={renderProps.onClick} disabled={value.button_dis}>
                      {value.user_id}
                      </BUTTON>
              )}/>
          </nav>


          <div className="nav-link disabled mx-auto">
            Welcome to Fashionista
          </div>

          <Link to="/cart" className="ml-auto">
               <img src={cart} alt="store" height="50" className="navbar-brand"/>
          </Link>
        </Nav>
        )}}
          </ProductConsumer>
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

const BUTTON = styled.button`
  background: var(--mainBlue);
  color :white;
  border-style: hidden;
`;
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import cart from './cart.png';


export default class Navbar extends Component {
    render() {
      const responseFacebook = (response) => {
     
        console.log(response, '--------------------->');
        console.log('<--------------------------->')
        console.log(response['id'])
        console.log(response['name'])
     
      }
        return (
        <Nav className="navbar navbar-expand-md  navbar-dark">
             <Link to="/">
               <img src={logo} alt="store" height="50" className="navbar-brand"/>
            </Link>
          

          <nav className="nav">
              
              <a className="nav-link active" href="#" onClick={()=>{
                  console.log('jerere')
                }} >Recommendations</a>

              <a className="nav-link" href='#'>Top sold</a>
              <FacebookLogin
                  appId="1956864841113341"
                  fields="name,email,picture"
                  callback={responseFacebook}
                  render={renderProps => (
                    <button onClick={renderProps.onClick}>This is my custom FB button</button>
                  )}
                />


          </nav>


          <div className="nav-link disabled mx-auto">
            Welcome to Fashionista
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
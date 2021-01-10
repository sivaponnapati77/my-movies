import React, { Component } from "react";
import Movies from "../Modal/Movies";
import api from "../Services/MoviesApi";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
} from "mdbreact";

type MyProps = {};
type state = { myMovies: Movies[]; request_token: String; session_id: string };
class NavBar extends Component<MyProps, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      myMovies: [],
      request_token: "",
      session_id: "",
    };
  }

  render() {
    return (
      <div>
        <MDBNavbar color="default-color" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">My Movie</strong>
          </MDBNavbarBrand>
          <MDBCollapse id="navbarCollapse3" isOpen={true} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="/searchMovies">Search Movies</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/wishlist">My WishList</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/favorite">My Favorites</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default () => (
  <div>
    <NavBar />
  </div>
);

import React, { Component } from "react";
import Movies from "../Modal/Movies";
import "../MovieSearch/MovieSearch.css";
import api from "../Services/MoviesApi";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
} from "mdbreact";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardGroup,
} from "mdbreact";

type MyProps = {};
type state = { myMovies: Movies[]; request_token: String; session_id: string };
class MovieSearch extends Component<MyProps, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      myMovies: [],
      request_token: "",
      session_id: "",
    };
  }

  componentDidMount() {
    var getSessionId = localStorage.getItem("session_id") || "";
    if (getSessionId == "") {
      api
        .tokenAccess()
        .then((tokenResponse) => {
          this.setState({ request_token: tokenResponse.request_token });
          alert(
            "https://www.themoviedb.org/authenticate/" +
              tokenResponse.request_token
          );
          return tokenResponse;
        })
        .then((tokenResponse) => {
          api
            .createSessions(tokenResponse.request_token)
            .then((sessionResponse) => {
              console.log("session", sessionResponse.success);
              if (sessionResponse.success !== true) {
                alert(
                  "https://www.themoviedb.org/authenticate/" +
                    tokenResponse.request_token
                );
              } else {
                this.setState({ session_id: sessionResponse.session_id });
                localStorage.setItem("session_id", this.state.session_id);
              }
            });
        });
    }
  }

  search(event: any) {
    console.log("event", event.target.value);
    if (event.target.value !== "") {
      api
        .searcMovie(event.target.value)
        .then((searchMovies) => this.setState({ myMovies: searchMovies }));
    } else {
      this.setState({ myMovies: [] });
    }
  }

  addFavorite(movieid: number) {
    var getSessionId = localStorage.getItem("session_id") || "";
    api.PostFavorite(getSessionId, movieid).then((response) => {
      console.log("addfavo", response);
    });
  }

  addWishlist(movieid: number) {
    var getSessionId = localStorage.getItem("session_id") || "";
    api.PostWishlist(getSessionId, movieid).then((response) => {
      console.log("addWish", response);
    });
  }

  render() {
    return (
      <div>
        <div
          style={{ textAlign: "center", color: "red", paddingBottom: "20px" }}
        >
          <p>Search Movies</p>
          <input type="text" onChange={this.search.bind(this)}></input>
        </div>
        <MDBCardGroup>
          <MDBRow>
            {this.state.myMovies.map((movie, index) => (
              <MDBCol className="padd" md="3">
                <MDBCard testimonial>
                  <MDBCardImage
                    src={
                      "https://www.themoviedb.org/t/p/w220_and_h330_face/" +
                      movie.poster_path
                    }
                    alt="MDBCard image cap"
                    top
                    hover
                    overlay="white-slight"
                  />
                  <MDBCardBody>
                    <MDBCardTitle tag="h5">{movie.title}</MDBCardTitle>
                    <MDBBtn
                      color="primary"
                      onClick={() => this.addFavorite(movie.id)}
                    >
                      Favorite
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      onClick={() => this.addWishlist(movie.id)}
                    >
                      Wishlist
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBCardGroup>
      </div>
    );
  }
}

export default () => (
  <div>
    <MovieSearch />
  </div>
);

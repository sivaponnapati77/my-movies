import React, { Component } from "react";
import Movies from "../Modal/Movies";
import api from "../Services/MoviesApi";
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
type state = { myMovies: Movies[]; request_token: String; session_id: String };
class MyWishlist extends Component<MyProps, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      myMovies: [],
      request_token: "",
      session_id: "",
    };
  }

  componentDidMount() {
    var session = localStorage.getItem("session_id") || "";
    console.log("session", session);
    var token = api.getWatchlist(session).then((favoriteResponse) => {
      this.setState({ myMovies: favoriteResponse.results });
    });
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center", color: "red" }}>
          <p>My WishList Movies</p>
        </div>
        <MDBCardGroup>
          <MDBRow>
            {this.state.myMovies.map((movie, index) => (
              <MDBCol md="3">
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
    <MyWishlist />
  </div>
);

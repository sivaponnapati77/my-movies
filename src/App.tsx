import React from 'react';
import './App.css';
import MovieSearch from './MovieSearch/MovieSearch';
import NavBar from './NavBar/NavBar';
import Myfavorites from './Myfavorites/Myfavorites';
import MyWishlist from './MyWishlist/MyWishlist';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
      <NavBar/>
        <Switch>
          <Route path="/searchMovies" component={MovieSearch}>
          </Route>
          <Route path="/favorite" component={Myfavorites}>
          </Route>
          <Route path="/wishlist" component={MyWishlist}>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

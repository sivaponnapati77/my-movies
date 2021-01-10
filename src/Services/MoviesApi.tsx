var baseurl =
  "https://api.themoviedb.org/3/search/movie?api_key=43a53ff30fc0727cf205538c16c53bf9";

export default {
  searcMovie,
  tokenAccess,
  createSessions,
  PostFavorite,
  getFavorites,
  getWatchlist,
  PostWishlist,
};

async function searcMovie(query: String) {
  var apiBuild =
    baseurl + "&language=en-US&query=" + query + "&include_adult=false";
  return fetch(apiBuild)
    .then((res) => res.json())
    .then(
      (resoponse) => {
        var moviesSearchResult = resoponse.results;
        return moviesSearchResult;
      },
      (error) => {
        return error;
      }
    );
}

async function tokenAccess() {
  var apiBuild =
    "https://api.themoviedb.org/3/authentication/token/new?api_key=43a53ff30fc0727cf205538c16c53bf9";
  return fetch(apiBuild)
    .then((res) => res.json())
    .then(
      (resoponse) => {
        console.log("resoponse", resoponse);
        return resoponse;
      },
      (error) => {
        return error;
      }
    );
}

async function createSessions(request_token: String) {
  var apiBuild =
    "https://api.themoviedb.org/3/authentication/session/new?api_key=43a53ff30fc0727cf205538c16c53bf9&request_token=" +
    request_token;
  return fetch(apiBuild)
    .then((res) => res.json())
    .then(
      (resoponse) => {
        console.log("resoponse", resoponse);
        return resoponse;
      },
      (error) => {
        return error;
      }
    );
}

async function PostFavorite(session_id: string, movieId: number) {
  var apiBuild =
    "https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=43a53ff30fc0727cf205538c16c53bf9&session_id=" +
    session_id;
  var opts = {
    media_type: "movie",
    media_id: movieId,
    favorite: true,
  };
  return fetch(apiBuild, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
  }).then(function (response) {
    return response.json();
  });
}

async function PostWishlist(session_id: string, movieId: number) {
  var apiBuild =
    "https://api.themoviedb.org/3/account/548/watchlist?api_key=43a53ff30fc0727cf205538c16c53bf9&session_id=" +
    session_id;
  var opts = {
    media_type: "movie",
    media_id: movieId,
    watchlist: true,
  };
  return fetch(apiBuild, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
  }).then(function (response) {
    return response.json();
  });
}

async function getWatchlist(sessionId: string) {
  var apiBuild =
    "https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=43a53ff30fc0727cf205538c16c53bf9&language=en-US&session_id=" +
    sessionId +
    "&sort_by=created_at.asc&page=1";
  return fetch(apiBuild)
    .then((res) => res.json())
    .then(
      (resoponse) => {
        console.log("resoponse", resoponse);
        return resoponse;
      },
      (error) => {
        return error;
      }
    );
}

async function getFavorites(sessionId: string) {
  var apiBuild =
    "https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=43a53ff30fc0727cf205538c16c53bf9&language=en-US&session_id=" +
    sessionId +
    "&sort_by=created_at.asc&page=1";
  console.log("apiBuild", apiBuild);
  return fetch(apiBuild)
    .then((res) => res.json())
    .then(
      (resoponse) => {
        console.log("resoponse", resoponse);
        return resoponse;
      },
      (error) => {
        return error;
      }
    );
}

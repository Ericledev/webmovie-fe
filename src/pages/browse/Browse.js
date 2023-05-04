import React, { useState } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import classes from "./Browse.module.css";
import Original from "./Original";
import ListMovies from "./ListMovies";
import MovieDetail from "./MovieDetail";
//import { ErrorBoundary } from "react-error-boundary";

function Browse(props) {
  const [movieTrend, setMovieTrend] = useState({});
  const [isShowDetailTrend, setIsShowDetailTrend] = useState(false);
  const [movieTopRated, setMovieTopRated] = useState({});
  const [isShowDetailTopRated, setIsShowDetailTopRated] = useState(false);
  const [movieAction, setMovieAction] = useState({});
  const [isShowDetailAction, setIsShowDetailAction] = useState(false);
  const [movieComedy, setMovieComedy] = useState({});
  const [isShowDetailComedy, setIsShowDetailComedy] = useState(false);
  const [movieHorror, setMovieHorror] = useState({});
  const [isShowDetailHorror, setIsShowDetailHorror] = useState(false);
  const [movieRomance, setMovieRomance] = useState({});
  const [isShowDetailRomance, setIsShowDetailRomance] = useState(false);
  const [movieDocumentaries, setMovieDocumentaries] = useState({});
  const [isShowDetailDocumentaries, setIsShowDetailDocumentaries] =
    useState(false);
  const [movieOriginal, setMovieOriginal] = useState({});
  const [isShowDetailOriginal, setIsShowDetailOriginal] = useState(false);

  const handleOnClickMovie = (e) => {
    // create movieObject when click image
    const movieObject = {
      id: e.target.dataset.id,
      title: e.target.dataset.title,
      releaseDate: e.target.dataset.releaseDate,
      vote: e.target.dataset.vote,
      overview: e.target.dataset.overview,
      backdrop: e.target.dataset.backdrop,
    };
    // Check target(movie) that is clicked, in-order to show the detail of that movie
    switch (e.target.dataset.type) {
      case props.requests.fetchTrending:
        if (movieTrend.id !== e.target.dataset.id) {
          setIsShowDetailTrend(true);
        } else {
          setIsShowDetailTrend(false);
        }
        setMovieTrend(movieObject);
        break;
      case props.requests.fetchTopRated:
        if (movieTopRated.id !== e.target.dataset.id) {
          setIsShowDetailTopRated(true);
        } else {
          setIsShowDetailTopRated(false);
        }
        setMovieTopRated(movieObject);
        break;
      case props.requests.fetchActionMovies:
        if (movieAction.id !== e.target.dataset.id) {
          setIsShowDetailAction(true);
        } else {
          setIsShowDetailAction(false);
        }
        setMovieAction(movieObject);
        break;
      case props.requests.fetchComedyMovies:
        if (movieComedy.id !== e.target.dataset.id) {
          setIsShowDetailComedy(true);
        } else {
          setIsShowDetailComedy(false);
        }
        setMovieComedy(movieObject);
        break;
      case props.requests.fetchHorrorMovies:
        if (movieHorror.id !== e.target.dataset.id) {
          setIsShowDetailHorror(true);
        } else {
          setIsShowDetailHorror(false);
        }
        setMovieHorror(movieObject);
        break;
      case props.requests.fetchRomanceMovies:
        if (movieRomance.id !== e.target.dataset.id) {
          setIsShowDetailRomance(true);
        } else {
          setIsShowDetailRomance(false);
        }
        setMovieRomance(movieObject);
        break;
      case props.requests.fetchDocumentaries:
        if (movieDocumentaries.id !== e.target.dataset.id) {
          setIsShowDetailDocumentaries(true);
        } else {
          setIsShowDetailDocumentaries(false);
        }
        setMovieDocumentaries(movieObject);
        break;
      case props.requests.fetchNetOriginal:
        if (movieOriginal.id !== e.target.dataset.id) {
          setIsShowDetailOriginal(true);
        } else {
          setIsShowDetailOriginal(false);
        }
        setMovieOriginal(movieObject);
        break;
    }
  };
  // show movie in detail base on kind of movie(movieType)
  const contentDetail = (movieType) => {
    return (
      <>
        <MovieDetail
          apiKey={props.apiKey}
          userId={props.userId}
          movieDetail={movieType}
        />
      </>
    );
  };

  return (
    <div className={classes.app}>
      <div className={classes.hearder}>
        <NavBar />
        <Banner fetchNetflixOriginals={props.requests.fetchNetflixOriginals} />
      </div>
      <div className={classes.content}>
        <div className={classes.original} onClick={handleOnClickMovie}>
          <Original
            fetchNetflixOriginals={props.requests.fetchNetflixOriginals}
          />
        </div>
        {isShowDetailOriginal && contentDetail(movieOriginal)}
        {/* Section Trend Movies */}
        <h3>Xu hướng</h3>
        <div className={classes.endPoint} onClick={handleOnClickMovie}>
          <ListMovies endPoint={props.requests.fetchTrending} />
        </div>
        {isShowDetailTrend && contentDetail(movieTrend)}
        {/* Section TopRated Movies */}
        <h3>Xếp hạng cao</h3>
        <div className={classes.endPoint} onClick={handleOnClickMovie}>
          <ListMovies endPoint={props.requests.fetchTopRated} />
        </div>
        {isShowDetailTopRated && contentDetail(movieTopRated)}
        {/* Section Action Movies */}
        <h3>Hành động</h3>
        <div className={classes.endPoint} onClick={handleOnClickMovie}>
          <ListMovies endPoint={props.requests.fetchActionMovies} />
        </div>
        {isShowDetailAction && contentDetail(movieAction)}
        {/* Section Comedy Movies */}
        <h3>Hài</h3>
        <div className={classes.endPoint} onClick={handleOnClickMovie}>
          <ListMovies endPoint={props.requests.fetchComedyMovies} />
        </div>
        {isShowDetailComedy && contentDetail(movieComedy)}
        {/* Section Horror Movies */}
        <h3>Kinh dị</h3>
        <div className={classes.endPoint} onClick={handleOnClickMovie}>
          <ListMovies endPoint={props.requests.fetchHorrorMovies} />
        </div>
        {isShowDetailHorror && contentDetail(movieHorror)}
        {/* Section Romance Movies */}
        <h3>Lãng mạn</h3>
        <div className={classes.endPoint} onClick={handleOnClickMovie}>
          <ListMovies endPoint={props.requests.fetchRomanceMovies} />
        </div>
        {isShowDetailRomance && contentDetail(movieRomance)}
        {/* Section Documentaries Movies */}
        <h3>Tài liệu</h3>
        <div className={classes.endPoint} onClick={handleOnClickMovie}>
          <ListMovies endPoint={props.requests.fetchDocumentaries} />
        </div>
        {isShowDetailDocumentaries && contentDetail(movieDocumentaries)}
      </div>
    </div>
  );
}

export default Browse;

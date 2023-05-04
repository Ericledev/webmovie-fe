import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../browse/NavBar";
import SearchForm from "./SearchForm";
import MovieDetail from "../browse/MovieDetail";
import classes from "./Search.module.css";
import useHTTP from "../../hooks/use-http";

const applyData = (setData, data) => {
  setData([...data.results]);
};

const Search = (props) => {
  // results fetch movies with key-word
  const [results, setResults] = useState([]);
  const [resultsGenre, setResultsGenre] = useState([]);
  const [resultsLanguage, setResultsLanguage] = useState([]);
  const [resultsMediaTypeList, setResultsMediaTypeList] = useState([]);
  const [movieDetail, setMovieDetail] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowList, setIsShowList] = useState(false);
  const { isLoading, error, sendRequest } = useHTTP();

  // load data from server add to "select"
  const getGenreList = useCallback(() => {
    sendRequest(
      {
        url: `${process.env.REACT_APP_URL_BE}${props.fetchGenreList}`,
      },
      applyData.bind(null, setResultsGenre) // respone data from SV to results
    );
  }, [sendRequest, props.fetchGenreList]);

  const getLanguageList = useCallback(() => {
    sendRequest(
      {
        url: `${process.env.REACT_APP_URL_BE}${props.fetchLanguageList}`,
      },
      applyData.bind(null, setResultsLanguage) // respone data from SV to results
    );
  }, [sendRequest, props.fetchLanguageList]);

  const getResultsMediaTypeList = useCallback(() => {
    sendRequest(
      {
        url: `${process.env.REACT_APP_URL_BE}${props.fetchMediaTypeList}`,
      },
      applyData.bind(null, setResultsMediaTypeList) // respone data from SV to results
    );
  }, [sendRequest, props.fetchMediaTypeList]);

  useEffect(() => {
    getGenreList();
    getLanguageList();
    getResultsMediaTypeList();
  }, [getGenreList, getLanguageList, getResultsMediaTypeList]);

  const submitRequest = useCallback(
    (dataSubmit) => {
      // send request to SV
      sendRequest(
        {
          // Old Code
          // url:
          //   `https://api.themoviedb.org/3` +
          //   props.fetchSearch +
          //   `&query=` +
          //   value,

          // New Code
          url: `${process.env.REACT_APP_URL_BE}${props.fetchSearch}`,
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: dataSubmit,
        },
        applyData.bind(null, setResults) // respone data from SV to results
      );
      setIsShowList(true); // show movies list
      setIsShowDetail(false); // hide movie detail
    },
    [sendRequest, props.fetchSearch]
  );

  // resetHandler to hide movies of list & detail
  const resetHandler = useCallback(() => {
    setIsShowList(false);
    setIsShowDetail(false);
  }, []);

  // show detail of movie when click on the image
  const showDetailHandler = (e) => {
    // find out the movie with pass id
    const detail = results.filter(
      (item) => item.id === Number(e.target.dataset.id)
    );
    // if found out movie pass id, then add it to movieDetail & show up, else hide
    if (detail.length > 0) {
      if (Number(e.target.dataset.id) !== Number(movieDetail.id)) {
        setIsShowDetail(true); // show movie detail

        // New code
        setMovieDetail({
          id: detail[0].id,
          title: detail[0].title,
          overview: detail[0].overview,
          backdrop: detail[0].backdrop_path,
          releaseDate: detail[0].release_date || detail[0].first_air_date,
          vote: detail[0].vote_average,
        });
      } else {
        setIsShowDetail(false); //hide movie detail
      }
    }
  };

  let movieList;
  if (results.length > 0) {
    movieList = results.map((item) => {
      return (
        <div className={classes.movie} key={item.id}>
          <img
            src={process.env.REACT_APP_URL_IMAGE_THIRD_PARTY + item.poster_path}
            alt={item.title}
            data-id={item.id}
          />
        </div>
      );
    });
  } else {
    movieList = <p className={classes.not_found}>Not found the film</p>;
  }

  return (
    <div className={classes.app}>
      {/* NavBar */}
      <div className={classes.nav_container}>
        <NavBar />
      </div>
      {/* Search form */}
      <div className={classes.form_container}>
        <SearchForm
          onSubmit={submitRequest}
          onReset={resetHandler}
          genre={resultsGenre}
          media_type_list={resultsMediaTypeList}
          language={resultsLanguage}
        />
      </div>
      {/* Show movie list */}
      {isShowList && <h3>Search results</h3>}
      {isLoading && <p className={classes.loading}>Loading...</p>}
      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.results} onClick={showDetailHandler}>
        {isShowList && movieList}
      </div>
      {/* Show movie detail */}
      {isShowDetail && (
        <MovieDetail
          apiKey={props.apiKey}
          userId={props.userId}
          movieDetail={movieDetail}
        />
      )}
    </div>
  );
};

export default Search;

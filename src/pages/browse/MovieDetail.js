import React, { useEffect, useState, useRef } from "react";
//import YouTube from "react-youtube";
import useHTTP from "../../hooks/use-http";
import classes from "./MovieDetail.module.css";

const applyData = (isMounted, setResults, data) => {
  // Old code
  // filter the movies under type "Trailer"
  // let trailerData = data.results.filter((item) => {
  //   return item.type === "Trailer";
  // });
  // if not found, filter movies under type "Teaser"
  // if (trailerData.length === 0) {
  //   trailerData = data.results.filter((item) => {
  //     return (item.type === item.type) === "Teaser";
  //   });
  // }

  if (isMounted.current) {
    setResults([...data]);
  }
};

const MovieDetail = (props) => {
  const [results, setResults] = useState([]);
  const { isLoading, error, sendRequest } = useHTTP();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    // Send request to SV with ID
    sendRequest(
      {
        // Old Code
        //url: `https://api.themoviedb.org/3/movie/${props.movieDetail.id}/videos?api_key=${props.apiKey}`,
        // New Code
        url: `${process.env.REACT_APP_URL_BE}/api/movies/video/?film_id=${props.movieDetail.id}&token=${props.apiKey}&userId=${props.userId}`,
      },
      applyData.bind(null, isMounted, setResults)
    );
    // componentWillUnMount
    return () => {
      isMounted.current = false;
    };
  }, [props.movieDetail.id, props.apiKey, props.userId, sendRequest]);

  // config attribute of Youtube component.
  // const opts = {
  //   height: "400",
  //   width: "100%",
  //   playerVars: {
  //     autoplay: 0,
  //   },
  // };
  let url = "";
  // console.log("CHECK RESULTS: ", results);
  // console.log("CHECK RESULTS from props: ", props.movieDetail);
  if (results.length > 0) {
    url = `${process.env.REACT_APP_URL_YOUTUBE}/${results[0].key}`;
  }
  return (
    <div className={classes.movie_detail}>
      {/* show content of movie detail */}
      <div className={classes.content_detail}>
        <h1>{props.movieDetail.title}</h1>
        <p className={classes.release_date}>
          Release date: {props.movieDetail.releaseDate}
        </p>
        <p className={classes.vote}>Vote: {props.movieDetail.vote} / 10</p>
        <p className={classes.overview}>{props.movieDetail.overview}</p>
      </div>
      {/* Show trailer of movie (Youtube) or backdrop (if do not have trailer) */}
      {isLoading && <p className={classes.loading}>Loading...</p>}
      <div className={classes.youtube}>
        {error && (
          <img
            src={
              process.env.REACT_APP_URL_IMAGE_THIRD_PARTY +
              props.movieDetail.backdrop
            }
            alt={props.movieDetail.title}
          />
        )}
        {!error && results.length <= 0 && (
          <img
            src={
              process.env.REACT_APP_URL_IMAGE_THIRD_PARTY +
              props.movieDetail.backdrop
            }
            alt={props.movieDetail.title}
          />
        )}
        {!error && (
          <iframe width="100%" height="400" src={url} title={url}></iframe>
          // <YouTube videoId={results[0].key} opts={opts} />
        )}
      </div>
    </div>
  );
};

export default React.memo(MovieDetail);

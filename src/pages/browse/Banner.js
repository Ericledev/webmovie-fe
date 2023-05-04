import classes from "./Banner.module.css";
import React, { useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/use-http";

// apply data from API
// const applyData = (setResults, data) => {
//   setResults([...data.results]);
// };

const Banner = (props) => {
  const [results, setResults] = useState([]);
  const { isLoading, error, sendRequest } = useHTTP();
  const isMounted = useRef(true);
  useEffect(() => {
    sendRequest(
      {
        // Old Code
        //url: `https://api.themoviedb.org/3${props.fetchNetflixOriginals}`,
        // New Code
        url: `${process.env.REACT_APP_URL_BE}${props.fetchNetflixOriginals}`,
      },
      (data) => {
        if (isMounted.current) {
          setResults([...data.results]);
        }
      }
    );

    // UNMOUNTED
    return () => {
      isMounted.current = false;
    };
  }, []);

  // show banner
  let banner = <div></div>;
  if (results.length > 0) {
    // get random index of movie in the list
    const indexRadom = Math.floor(Math.random() * results.length + 1);
    banner = (
      <>
        <div className={classes.img}>
          <img
            src={
              process.env.REACT_APP_URL_IMAGE_THIRD_PARTY +
              results[indexRadom].backdrop_path
            }
            alt={results[indexRadom].name}
          />
        </div>
        <div className={classes.content}>
          <h1>{results[indexRadom].title}</h1>
          <h1>{results[indexRadom].name}</h1>
          <div className={classes.button}>
            <button className={classes.btnPlay}>Play</button>
            <button className={classes.btnMyList}>My List</button>
          </div>
          <div className={classes.overview}>{results[indexRadom].overview}</div>
        </div>
      </>
    );
  }

  return (
    <>
      {isLoading && <p className={classes.loading}>Loading ...</p>}
      {error && <p className={classes.error}>{error}</p>}
      {!error && banner}
    </>
  );
};
export default React.memo(Banner);

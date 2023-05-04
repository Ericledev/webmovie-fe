import classes from "./Original.module.css";
import React, { useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/use-http";

const Original = (props) => {
  const [results, setResults] = useState([]);
  const { isLoading, error, sendRequest } = useHTTP();
  const isMounted = useRef(true);

  // componentDidMount
  useEffect(() => {
    // Send request to SV
    sendRequest(
      {
        url: `${process.env.REACT_APP_URL_BE}${props.fetchNetflixOriginals}`,
      },
      // apply data into the results
      (data) => {
        if (isMounted.current) {
          setResults([...data.results]);
        }
      }
    );

    // componentWillUnMount
    return () => {
      isMounted.current = false;
    };
  }, []);

  // amination when pointer move-over & leave
  const pointerOutHandler = (e) => {
    e.target.classList.add(classes.mouse_over_out);
    e.target.classList.remove(classes.mouse_over_in);
  };

  const pointerOverHandler = (e) => {
    e.target.classList.add(classes.mouse_over_in);
    e.target.classList.remove(classes.mouse_over_out);
  };

  // Show movies list
  let content;
  if (results.length > 0) {
    content = results.map((item) => {
      return (
        <div className={classes.movie} key={item.id}>
          <img
            src={process.env.REACT_APP_URL_IMAGE_THIRD_PARTY + item.poster_path}
            alt={item.title}
            data-id={item.id}
            data-title={item.title ? item.title : item.name}
            data-release-date={
              item.release_date ? item.release_date : item.first_air_date
            }
            data-vote={item.vote_average}
            data-overview={item.overview}
            data-backdrop={item.backdrop_path}
            data-type={props.endPoint}
            onPointerOver={pointerOverHandler}
            onPointerOut={pointerOutHandler}
          />
        </div>
      );
    });
  }

  return (
    <>
      {isLoading && <p className={classes.loading}>Loading...</p>}
      {!error && results.length > 0 && content}
      {error && <p className={classes.error}>{error}</p>}
    </>
  );
};
export default React.memo(Original);

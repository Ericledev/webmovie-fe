import classes from "./ListMovies.module.css";
import React, { useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/use-http";

const ListMovies = (props) => {
  const [results, setResults] = useState([]);
  const { isLoading, error, sendRequest } = useHTTP();
  const isMounted = useRef(true);
  const movieRef = useRef();

  // handle amination when mouse over & leave the images.
  const pointerOutHandler = (e) => {
    e.target.classList.add(classes.mouse_over_out);
    e.target.classList.remove(classes.mouse_over_in);
  };
  const pointerOverHandler = (e) => {
    e.target.classList.add(classes.mouse_over_in);
    e.target.classList.remove(classes.mouse_over_out);
  };

  useEffect(() => {
    sendRequest(
      {
        // Old Code
        //url: `https://api.themoviedb.org/3${props.endPoint}`,
        // New Code
        url: `${process.env.REACT_APP_URL_BE}${props.endPoint}`,
      },
      (data) => {
        if (isMounted.current) {
          setResults([...data.results]);
        }
      }
    );

    // UNMOUNTED;
    return () => {
      isMounted.current = false;
    };
  }, []);

  let content;
  if (results.length > 0) {
    content = results.map((item) => {
      return (
        <div className={classes.movie} key={item.id} ref={movieRef}>
          <img
            src={
              process.env.REACT_APP_URL_IMAGE_THIRD_PARTY + item.backdrop_path
            }
            alt={item.title ? item.title : item.name}
            data-id={item.id}
            data-title={item.title ? item.title : item.name}
            data-release-date={
              item.release_date ? item.release_date : item.first_air_date
            }
            data-vote={item.vote_average}
            data-overview={item.overview}
            data-backdrop={item.backdrop_path}
            data-type={props.endPoint}
            onPointerOut={pointerOutHandler}
            onPointerOver={pointerOverHandler}
          />
        </div>
      );
    });
  }

  // console.log("CHECK LISTMOVIES: ", results);
  return (
    <>
      {isLoading && <p className={classes.loading}>Loading...</p>}
      {!error && results.length > 0 && content}
      {error && <p className={classes.error}>{error}</p>}
    </>
  );
};
export default React.memo(ListMovies);

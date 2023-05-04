import { memo, useEffect, useRef, useState } from "react";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const inputRef = useRef();
  const languageRef = useRef();
  const genreRef = useRef();
  const mediaTypeListRef = useRef();
  const yearRef = useRef();
  const btnSearchRef = useRef();
  const [years, setYear] = useState([]);
  const showYear = () => {
    const arrYear = [];
    let year = new Date().getFullYear() + 1;
    let i = year - 10;
    while (--year >= i) {
      arrYear.push(year);
    }
    setYear([...arrYear]);
  };

  useEffect(() => {
    showYear();
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  // onClick Search
  const searchHandler = () => {
    //validation empty
    if (inputRef.current.value.trim() === "") {
      inputRef.current.focus();
      alert("Please enter your search value!");
      return;
    }
    const dataSubmit = {
      keyword: inputRef.current.value.trim(),
      language: languageRef.current.value,
      genre: genreRef.current.value,
      year: yearRef.current.value,
      media_type: mediaTypeListRef.current.value,
    };
    // call onSubmit with value parameter
    props.onSubmit(dataSubmit);
  };
  // onClick Reset btn
  const resetHandler = () => {
    inputRef.current.value = "";
    genreRef.current.value = "all";
    languageRef.current.value = "all";
    mediaTypeListRef.current.value = "all";
    yearRef.current.value = "all";

    inputRef.current.focus();
    props.onReset();
  };
  // handle input when press "Enter"
  const enterHandler = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      btnSearchRef.current.focus();
      searchHandler();
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* Input value to search */}
      <div className={classes.input}>
        <input type={"text"} ref={inputRef} onKeyDown={enterHandler} />
        <div className={classes.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
          </svg>
        </div>
      </div>

      <div className={classes.selectContainer}>
        {/* Genre select */}
        <label>Genre</label>
        <select ref={genreRef}>
          <option value="all" key={"all"}>
            All
          </option>
          {props.genre.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        {/* Language select */}
        <label>Language</label>
        <select ref={languageRef}>
          <option value="all" key={"all"}>
            All
          </option>
          {props.language.map((item) => {
            return (
              <option value={item.code} key={item.code}>
                {item.name}
              </option>
            );
          })}
        </select>
        {/* Media Type List select */}
        <label>Type of media</label>
        <select ref={mediaTypeListRef}>
          {props.media_type_list.map((item) => {
            return (
              <option value={item} key={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </option>
            );
          })}
        </select>
        {/* Media Type List select */}
        <label>Year</label>
        <select ref={yearRef}>
          <option value="all" key="all">
            All
          </option>
          {years.map((year) => {
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div className={classes.controller}>
        {/* Reset button */}
        <button
          className={classes.reset}
          type={"submit"}
          onClick={resetHandler}
        >
          RESET
        </button>
        {/* Search button */}
        <button
          className={classes.search}
          onClick={searchHandler}
          ref={btnSearchRef}
        >
          SEARCH
        </button>
      </div>
    </form>
  );
};
export default memo(SearchForm);

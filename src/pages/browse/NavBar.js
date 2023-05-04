import classes from "./NavBar.module.css";
import { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const imgRef = useRef();
  const nav = useNavigate();
  const [transparent, setTransparent] = useState(true);

  // handle event when scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      setTransparent(false);
      return;
    }
    setTransparent(true);
  });

  // reach to Search page when click search icon
  const searchHandler = () => {
    //window.location.href = "/search";
    nav("/search");
  };
  // reach to home page when click Movie App
  const homeHandler = () => {
    // window.location.href = "/";
    nav("/");
  };

  const classessName = transparent ? classes.nav : classes.transparent;
  return (
    <div className={classessName} ref={imgRef}>
      {/* Movie App content */}
      <div className={classes.text} onClick={homeHandler}>
        Movie App
      </div>
      {/* Icon Search */}
      <div className={classes.icon} onClick={searchHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
        </svg>
      </div>
    </div>
  );
};

export default memo(NavBar);

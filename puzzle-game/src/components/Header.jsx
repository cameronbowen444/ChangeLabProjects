import React from "react";
import logo from "../assets/logo.png";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div>
          <div className="">
            {location.pathname === "/" && <h1 className="title2">ようこそ!</h1>}
            <h3 className="title">
              日本な久片
              <span className="close">Pieces of Japan</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

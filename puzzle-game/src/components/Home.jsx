import React, { useEffect, useState } from "react";
import { puzzles } from "../util/data";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import fuji from "../assets/fuji.png";

const Home = () => {
  const puzzleList = Object.values(puzzles);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % puzzleList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* TOP */}
      <div className="home">
        <div className="home-writing">
          <span>全部のパズルを</span>
          <span className="green">解けるか。</span>
        </div>
        <img src={fuji} alt="" className="fuji-img" />
        <div className="home-btns">
          <Link to={"/puzzle"} className="home-btn">
            <span>プレイ</span>
            <span>PLAY</span>
          </Link>

          <Link to={""} className="home-btn">
            <span>設定</span>
            <span>SETTINGS</span>
          </Link>
        </div>

        <Link
          className="image-box-home"
          to="/puzzle"
          state={{ puzzleId: puzzleList[currentIndex].id }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={puzzleList[currentIndex].id}
              src={puzzleList[currentIndex].image}
              alt={puzzleList[currentIndex].title}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </Link>

        <div className="banner">
          <a
            href="https://changelab.studio/contact-us/"
            rel="noopener noreferrer"
            className=" web-link hide"
          >
            Contact Us!
          </a>
          <a
            href="https://changelab.studio/"
            rel="noopener noreferrer"
            className="web-link"
          >
            www.changelab.studio
          </a>
          <a
            href="https://changelab.studio/contact-us/"
            rel="noopener noreferrer"
            className=" web-link hide"
          >
            お問い合わせ！
          </a>
        </div>
      </div>

      {/* FEATURED */}
      <div className="featured">
        <h5 className="title">Featured Puzzles</h5>

        <div className="items">
          <div>
            <Link
              className="image-box"
              to="/puzzle"
              state={{ puzzleId: puzzleList[0].id }}
            >
              <img src={puzzleList[0].image} alt="" />
            </Link>
            <Link
              className="home-btn"
              to="/puzzle"
              state={{ puzzleId: puzzleList[0].id }}
            >
              <span>あの夏の音</span>
              <span>That sound of summer</span>
            </Link>
          </div>
          <div>
            <Link
              className="image-box"
              to="/puzzle"
              state={{ puzzleId: puzzleList[1].id }}
            >
              <img src={puzzleList[1].image} alt="" />
            </Link>
            <Link
              className="home-btn"
              to="/puzzle"
              state={{ puzzleId: puzzleList[1].id }}
            >
              <span>一緒に庭で</span>
              <span>Together in the Garden</span>
            </Link>
          </div>
          <div>
            <Link
              className="image-box"
              to="/puzzle"
              state={{ puzzleId: puzzleList[2].id }}
            >
              <img src={puzzleList[2].image} alt="" />
            </Link>
            <Link
              className="home-btn"
              to="/puzzle"
              state={{ puzzleId: puzzleList[2].id }}
            >
              <span>日本らしい午後</span>
              <span>A Japanese Afternoon</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div>
          <h3 className="title">
            日本な久片
            <span className="close">Pieces of Japan</span>
          </h3>
        </div>
        <div className="card">
          <p>
            Made Possible By Our Team at Change Lab Studios Thank You So Much
            for Your Kindness and Hard Work!!!
          </p>
          <br />
          <p>Programmer - Cameron Bowen</p>
          <p>Artist - Ryelin Pickard</p>
        </div>
        <img src={logo} alt="logo" className="logo2" />
      </div>
    </>
  );
};

export default Home;

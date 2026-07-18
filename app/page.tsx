"use client";

import { useState } from "react";
import Image from "next/image";
import button from "../public/assets/buttin-icon-shrunk.svg";

export default function Home() {
  const [hoverState, setHoverState] = useState("");

  return (
    <section id="home" className="container">
      <div className={`home-rectangle home-rectangle--left ${hoverState === "right" ? "hidden" : ""}`}></div>
      <div className={`home-rectangle home-rectangle--right ${hoverState === "left" ? "hidden" : ""}`}></div>
      <div className="row">
        <div className={`home-button ${hoverState === "right" ? "hidden" : ""}`}>
          <div className="home-button--rectangle"></div>
          <div
            className="home-button--wrapper"
            onMouseEnter={() => setHoverState("left")}
            onMouseLeave={() => setHoverState("")}
          >
            <Image src={button} alt="left" />
            <div className="home-button--text">DISCOVER A.I.</div>
          </div>
        </div>
        <div className={`home-title ${hoverState !== "" ? `home-title--${hoverState}` : ""}`}>
          <div className="home-title--top">Sophisticated</div>
          <div className="home-title--bottom">skincare</div>
        </div>
        <div className={`home-button ${hoverState === "left" ? "hidden" : ""}`}>
          <div className="home-button--rectangle"></div>
          <div
            className="home-button--wrapper"
            onMouseEnter={() => setHoverState("right")}
            onMouseLeave={() => setHoverState("")}
          >
            <div className="home-button--text">TAKE TEST</div>
            <Image src={button} alt="right" style={{ rotate: "180deg" }} />
          </div>
        </div>
      </div>
      <div className="home-info">
        Skinstric developed an A.I. that creates
        a highly-personalised routine tailored to
        what your skin needs.
      </div>
    </section>
  );
}

import Image from "next/image"
import button from "../public/assets/buttin-icon-shrunk.svg"

export default function Home() {
  return (
    <section id="home" className="container">
      <div className="home-rectangle home-rectangle--left"></div>
      <div className="home-rectangle home-rectangle--right"></div>
      <div className="row">
        <div className="home-button">
          <div className="home-button--rectangle"></div>
          <div className="home-button--wrapper">
            <Image src={button} alt="left"/>
            <div className="home-button--text">DISCOVER A.I.</div>
          </div>
        </div>
        <h1>Sophisticated skincare</h1>
        <div className="home-button">
          <div className="home-button--rectangle"></div>
          <div className="home-button--wrapper">
            <div className="home-button--text">TAKE TEST</div>
            <Image src={button} alt="right" style={{rotate:"180deg"}}/>
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

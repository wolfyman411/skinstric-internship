import React from 'react'
import "./select.css"
import Image from 'next/image'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import Link from 'next/link';

export default function page() {
  return (
    <section id="select" className="container">
        <div className="row">
            <div className="select-analysis">
                <div className="select-analysis--header">A.I. ANALYSIS</div>
                <div className="select-analysis--footer">a.i. has estimated the following.<br/>fix estimated information if needed.</div>
            </div>
            <div className="options--wrapper">
                <div className="pulse">
                    <div className="option-rect--pulse"></div>
                    <div className="option-rect--pulse"></div>
                    <div className="option-rect--pulse"></div>
                    <div className="option-rect--pulse"></div>
                </div>
                <Link href={"/summary"} className="option">
                    <div className="option-square"></div>
                    <div className="option-text">demographics</div>
                </Link>
                <div className="option">
                    <div className="option-square"></div>
                    <div className="option-text">cosmetic<br/>concerns</div>
                </div>
                <div className="option">
                    <div className="option-square"></div>
                    <div className="option-text">weather</div>
                </div>
                <div className="option">
                    <div className="option-square"></div>
                    <div className="option-text">skin type<br/>details</div>
                </div>
            </div>
             <div className="buttons--wrapper">
                <div className="testing-back">
                    <Link href="/result" className="home-button--wrapper">
                        <Image src={button} alt="back"/>
                        <div className="back-button--text">BACK</div>
                    </Link>
                </div>
                <div className="testing-back">
                    <Link href="/summary" className="home-button--wrapper">
                        <div className="back-button--text back-button--text--right">GET SUMMARY</div>
                        <Image src={button} alt="next" style={{rotate:"180deg"}}/>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

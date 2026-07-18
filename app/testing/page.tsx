import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import "./testing.css"

export default function page() {
  return (
    <section id="testing" className="container">
        <div className="row">
            <div className="testing-analysis">to start analysis</div>
            <div className="testing-form">
                <div className="testing-rectangle"></div>
                <div className="testing-rectangle"></div>
                <div className="testing-rectangle"></div>
                <div className="testing-subtitle">click to type</div>
                <input type="text" className="testing-input" placeholder='Introduce Yourself'/>
            </div>
            <div className="testing-back">
                <Link href="/" className="home-button--wrapper">
                    <Image src={button} alt="right"/>
                    <div className="testing-button--text">BACK</div>
                </Link>
            </div>
        </div>
    </section>
  )
}

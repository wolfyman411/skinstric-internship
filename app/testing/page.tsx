import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import button from "../../public/assets/buttin-icon-shrunk.svg";

export default function page() {
  return (
    <section id="testing">
      <div className="container">
        <div className="row">
            <div className="testing-analysis">to start analysis</div>
            <div className="testing-form">

            </div>
            <div className="testing-back">
                <Link href="/" className="home-button--wrapper">
                    <Image src={button} alt="right"/>
                    <div className="testing-button--text">BACK</div>
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}

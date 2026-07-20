"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import "./testing.css"

export default function page() {

  const [currentForm,setCurrentForm] = useState(0)
  const [name,setName] = useState("")
  const [location,setLocation] = useState("")
  const [processing,setProcessing] = useState(false)
  const [finished,setFinished] = useState(false)

  function submitName() {
    console.log("test")
    if (name.length > 0) {
        setCurrentForm(currentForm+1)
    }
  }

  function submitForm() {
    if (location.length > 0) {
        setCurrentForm(currentForm+1)
    }
    setProcessing(true)
  }

  function formHTML() {
    if (processing) {
        return (
            <>
            <div className="testing-subtitle--bigger">Processing...</div>
            <div className="testing-dots">
                <div className="testing-dot"></div>
                <div className="testing-dot"></div>
                <div className="testing-dot"></div>
            </div>
            </>
        )
    }
    else {
        if (finished) {
            return (
            <>
                <div className="testing-subtitle--bigger">Thank You!</div>
                <div className="testing-subtitle">Proceed to the next step</div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="testing-subtitle">click to type</div>
                    {displayHTML()}
                </>
            )
        }
    }
  }

  function displayHTML() {
    if (currentForm === 0) {
        return (
            <input
                key="name"
                type="text"
                className="testing-input"
                placeholder='Introduce Yourself'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && submitName()}
                style={{maxWidth:"430px"}}
            />
        )
    }
    else if (currentForm === 1) {
        return (
            <input
                key="location"
                type="text"
                className="testing-input"
                placeholder='Where are you from?'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && submitForm()}
            />
        )
    }
  }

  return (
    <section id="testing" className="container">
        <div className="row">
            <div className="testing-analysis">to start analysis</div>
            <div className="testing-form">
                <div className="testing-rectangle"></div>
                <div className="testing-rectangle"></div>
                <div className="testing-rectangle"></div>
                {formHTML()}
            </div>
            <div className="buttons--wrapper">
                <div className="testing-back">
                    <Link href="/" className="home-button--wrapper">
                        <Image src={button} alt="back"/>
                        <div className="testing-button--text">BACK</div>
                    </Link>
                </div>
                {finished && (
                    <div className="testing-back">
                        <Link href="/result" className="home-button--wrapper">
                            <div className="testing-button--text testing-button--text--right">PROCEED</div>
                            <Image src={button} alt="next" style={{rotate:"180deg"}}/>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </section>
  )
}

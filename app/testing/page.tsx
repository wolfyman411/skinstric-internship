"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import styles from "./testing.module.css"
import axios from 'axios';
import Processing from '@/components/Processing';

export default function page() {

  const [currentForm,setCurrentForm] = useState(0)
  const [name,setName] = useState("")
  const [location,setLocation] = useState("")
  const [processing,setProcessing] = useState(false)
  const [finished,setFinished] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const regex = /^[A-Za-z\s]+$/

  function submitName() {
    if (name.trim().length > 0) {
        if (regex.test(name)) {
            setErrorMessage("")
            setCurrentForm(currentForm+1)
        }
        else {
            setErrorMessage("Please only include valid letters! (no numbers or symbols)")
        }
    }
    else {
        setErrorMessage("Please input your name!")
    }
  }

  async function submitForm() {
    if (location.trim().length > 0) {
        if (!regex.test(location)) {
            setErrorMessage("Please only include valid letters! (no numbers or symbols)")
            return
        }
    }
    else {
        setErrorMessage("Please input your location!")
        return
    }
    setProcessing(true)

    // Send info
    axios
    .post("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",{
        name,
        location,
    })
    .then((response) => {
        if (response.data.success) {
            setFinished(true)
        }
        else {
            setFinished(false)
            setProcessing(false)
            setCurrentForm(0)
            setErrorMessage("An error has occurred, please resubmit!")
        }
    })
  }

  function formHTML() {
    if (processing && !finished) {
        return (
            <Processing/>
        )
    }
    else {
        if (finished) {
            return (
                <>
                <div className={styles["testing-subtitle--bigger"]}>Thank You!</div>
                <div className={styles["testing-subtitle"]}>Proceed to the next step</div>
                </>
            )
        }
        else {
            return (
                <>
                <div className={styles["testing-subtitle"]}>click to type</div>
                <div className={styles["testing-error"]}>{errorMessage}</div>
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
                className={styles["testing-input"]}
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
                className={styles["testing-input"]}
                placeholder='Where are you from?'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && submitForm()}
            />
        )
    }
  }

  return (
    <section className={`${styles.testing} container`}>
        <div className="row">
            <div className={styles["testing-analysis"]}>to start analysis</div>
            <div className={styles["testing-form"]}>
                <div className={styles["testing-rectangle"]}></div>
                <div className={styles["testing-rectangle"]}></div>
                <div className={styles["testing-rectangle"]}></div>
                {formHTML()}
            </div>
            <div className={styles["buttons--wrapper"]}>
                <div className="testing-back">
                    <Link href="/" className="home-button--wrapper">
                        <Image src={button} alt="back"/>
                        <div className="back-button--text">BACK</div>
                    </Link>
                </div>
                {finished && (
                    <div className="testing-back">
                        <Link href="/result" className="home-button--wrapper">
                            <div className="back-button--text back-button--text--right">PROCEED</div>
                            <Image src={button} alt="next" style={{rotate:"180deg"}}/>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </section>
  )
}

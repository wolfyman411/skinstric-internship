import React from 'react'
import styles from "./select.module.css"
import Image from 'next/image'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import Link from 'next/link';

export default function page() {
  return (
    <section className={`${styles.select} container`}>
        <div className="row">
            <div className={styles["select-analysis"]}>
                <div className={styles["select-analysis--header"]}>A.I. ANALYSIS</div>
                <div className={styles["select-analysis--footer"]}>a.i. has estimated the following.<br/>fix estimated information if needed.</div>
            </div>
            <div className={styles["options--wrapper"]}>
                <div className="pulse">
                    <div className={styles["option-rect--pulse"]}></div>
                    <div className={styles["option-rect--pulse"]}></div>
                    <div className={styles["option-rect--pulse"]}></div>
                    <div className={styles["option-rect--pulse"]}></div>
                </div>
                <Link href={"/summary"} className={styles.option}>
                    <div className={styles["option-square"]}></div>
                    <div className={styles["option-text"]}>demographics</div>
                </Link>
                <div className={styles.option}>
                    <div className={styles["option-square"]}></div>
                    <div className={styles["option-text"]}>cosmetic<br/>concerns</div>
                </div>
                <div className={styles.option}>
                    <div className={styles["option-square"]}></div>
                    <div className={styles["option-text"]}>weather</div>
                </div>
                <div className={styles.option}>
                    <div className={styles["option-square"]}></div>
                    <div className={styles["option-text"]}>skin type<br/>details</div>
                </div>
            </div>
             <div className={styles["buttons--wrapper"]}>
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

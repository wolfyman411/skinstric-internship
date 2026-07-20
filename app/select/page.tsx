import React from 'react'
import "./select.css"

export default function page() {
  return (
    <section id="select" className="container">
        <div className="row">
            <div className="select-analysis">
                <div className="select-analysis--header">A.I. ANALYSIS</div>
                <div className="select-analysis--footer">a.i. has estimated the following.<br/>fix estimated information if needed.</div>
            </div>
            <div className="options--wrapper">
                <div className="option">
                    <div className="option-square"></div>
                    <div className="option-text">demographics</div>
                </div>
                <div className="option">
                    <div className="option-square"></div>
                    <div className="option-text">demographics</div>
                </div>
                <div className="option">
                    <div className="option-square"></div>
                    <div className="option-text">demographics</div>
                </div>
                <div className="option">
                    <div className="option-square"></div>
                    <div className="option-text">demographics</div>
                </div>
            </div>
        </div>
    </section>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import './summary.css'
import Image from 'next/image'
import Link from 'next/link'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import radioButtion from "../../public/assets/radio-button.svg"
import radioButtionChecked from "../../public/assets/radio-button-checked.svg"
import { ArcElement, Chart, DoughnutController, Tooltip } from 'chart.js';
import { defaultDemo, getSortedInfo } from '@/public/demographics'

Chart.register(DoughnutController, ArcElement, Tooltip)

export default function page() {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const [displayItems, setDisplayItems] = useState<[string, number][]>([])

  useEffect(() => {
    if (!chartRef.current) return

    const chart = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [96, 4],
          backgroundColor: ['#1A1B1C', '#C1C2C3'],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '98%',
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
      },
    })

    return () => chart.destroy()
  }, [])

  useEffect(() => {
    getDisplay("race")
  },[])

  function getDisplay(type:string) {
    setDisplayItems(getSortedInfo(defaultDemo,type))
  }

  function changeDisplay(e:Element,type:string) {
    const tabs = document.querySelectorAll(".chart-tab")

    for (const tab of tabs) {
        tab.classList.remove("chart-tab--active")
    }

    e.classList.add("chart-tab--active")
    getDisplay(type)
  }

  function itemHTML([category, value]: [string, number],index:number) {

    return (
        <div className="chart-option" key={index}>
            <div className="chart-option--left">
                <Image src={radioButtion} alt='radioButton' className="chart-option--icon"></Image>
                <div className="chart-option--name">{category}</div>
            </div>
            <div className="chart-option--right">{Math.floor(value*100)} %</div>
        </div>
    )
  }

  return (
    <section id="summary" className="container">
        <div className="row">
            <div className="summary-analysis">
                <div className="summary-analysis--analysis">a.i. analysis</div>
                <div className="summary-analysis--title">demographics</div>
                <div className="summary-analysis--subtitle">predicted race & age</div>
            </div>
            <div className="analysis-chart--wrapper">
                <div className="chart-tabs">
                    <div className="chart-tab chart-tab--active" onClick={(e) => changeDisplay(e.currentTarget,"race")}>
                        <div className="chart-tab--line"></div>
                        <div className="chart-tab--selection">east asian</div>
                        <div className="chart-tab--title">race</div>
                    </div>
                    <div className="chart-tab" onClick={(e) => changeDisplay(e.currentTarget,"age")}>
                        <div className="chart-tab--line"></div>
                        <div className="chart-tab--selection">20-29</div>
                        <div className="chart-tab--title">age</div>
                    </div>
                    <div className="chart-tab" onClick={(e) => changeDisplay(e.currentTarget,"sex")}>
                        <div className="chart-tab--line"></div>
                        <div className="chart-tab--selection">female</div>
                        <div className="chart-tab--title">sex</div>
                    </div>
                </div>
                <div className="chart-display">
                    <div className="chart-tab--line"></div>
                    <div className='chart-display--wrapper'>
                        <div className="chart-display--title">East asian</div>
                        <div className="chart-display--graph--wrapper">
                            <canvas ref={chartRef} className="chart-display--graph" />
                            <div className="chart-display--graph-text">
                                <div>96</div>
                                <div className="chart-display--graph-percentage">%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart-options--wrapper">
                    <div className="chart-tab--line"></div>
                    <div className="chart-options--top">
                        <div className="chart-options--top-item">Race</div>
                        <div className="chart-options--top-item">A.I. confidence</div>
                    </div>
                    <div className="chart-options">
                        {
                            displayItems.map((item,index) => (
                                itemHTML(item,index)
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="summary-footer">
                <div className="testing-back">
                    <Link href="/select" className="home-button--wrapper">
                        <Image src={button} alt="back"/>
                        <div className="back-button--text">BACK</div>
                    </Link>
                </div>
                <div className="disclaimer">If A.I. estimate is wrong, select the correct one.</div>
                <div className="footer-buttons">
                    <div className="footer-button">reset</div>
                    <Link href={"/select"} className="footer-button">confirm</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

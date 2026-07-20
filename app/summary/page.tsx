'use client'

import React, { useEffect, useRef } from 'react'
import './summary.css'
import Image from 'next/image'
import Link from 'next/link'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import { ArcElement, Chart, DoughnutController, Tooltip } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip)

export default function page() {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

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
                    <div className="chart-tab chart-tab--active">
                        <div className="chart-tab--line"></div>
                        <div className="chart-tab--selection">east asian</div>
                        <div className="chart-tab--title">race</div>
                    </div>
                    <div className="chart-tab">
                        <div className="chart-tab--line"></div>
                        <div className="chart-tab--selection">20-29</div>
                        <div className="chart-tab--title">age</div>
                    </div>
                    <div className="chart-tab">
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
                            <div className="chart-display--graph-text">96%</div>
                        </div>
                    </div>
                </div>
                <div className="chart-options--wrapper">
                    <div className="chart-options--top">
                        <div className="chart-options--top-item">Race</div>
                        <div className="chart-options--top-item">A.I. confidence</div>
                    </div>
                    <div className="chart-options">
                        <div className="chart-option">
                            <div className="chart-option--left">
                                <div className="chart-option--icon"></div>
                                <div className="chart-option--name">asian</div>
                            </div>
                            <div className="chart-option--right">87 %</div>
                        </div>
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
                    <div className="footer-button footer-button--reset">reset</div>
                    <div className="footer-button footer-button--reset">confirm</div>
                </div>
            </div>
        </div>
    </section>
  )
}

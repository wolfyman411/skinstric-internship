'use client'

import React, { useEffect, useRef, useState } from 'react'
import './summary.css'
import Image from 'next/image'
import Link from 'next/link'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import radioButtion from "../../public/assets/radio-button.svg"
import radioButtionChecked from "../../public/assets/radio-button-checked.svg"
import { ArcElement, Chart, DoughnutController, Tooltip } from 'chart.js';
import { defaultDemo, Demographics, getHighest, getSortedInfo } from '@/public/demographics'
import { useBoundStore } from '@/public/zustand/zustand'

Chart.register(DoughnutController, ArcElement, Tooltip)

export default function page() {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const [displayItems, setDisplayItems] = useState<[string, number][]>([])
  const [displayCategory,setDisplayCategory] = useState("")
  const [selectedItem, setSelectedItem] = useState<[string, number]>(["", 0])
  const setDemo = useBoundStore((state:any) => state.setDemographics)
  const demo:Demographics = useBoundStore((state:any) => state.demographics)
  const setRace = useBoundStore((state:any) => state.setRace)
  const setAge = useBoundStore((state:any) => state.setAge)
  const setSex = useBoundStore((state:any) => state.setSex)
  const getRace:[string,number] = useBoundStore((state:any) => state.race)
  const getAge:[string,number] = useBoundStore((state:any) => state.age)
  const getSex:[string,number] = useBoundStore((state:any) => state.sex)

  useEffect(() => {
    // If demo doesn't exist, force it to use the temp one
    if (!demo.race) {
        setDemo(defaultDemo)
        setRace(getHighest(defaultDemo,"race"))
        setAge(getHighest(defaultDemo,"age"))
        setSex(getHighest(defaultDemo,"sex"))
        setDisplayItems(getSortedInfo(defaultDemo,"race"))
    } else {
        getDisplay("race")
    }
  },[])

  useEffect(() => {
    if (!chartRef.current) return

    const chart = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [Math.floor(selectedItem[1]*100), 100-Math.floor(selectedItem[1]*100)],
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
  }, [selectedItem, demo])

  function getDisplay(type:string) {
    setDisplayItems(getSortedInfo(demo,type))
    setDisplayCategory(type)
  }

  function changeDisplay(e:Element,type:string) {
    const tabs = document.querySelectorAll(".chart-tab")

    for (const tab of tabs) {
        tab.classList.remove("chart-tab--active")
    }

    e.classList.add("chart-tab--active")

    if (type === "race") {
        setSelectedItem(getRace)
    }
    else if (type === "age") {
        setSelectedItem(getAge)
    }
    else {
        setSelectedItem(getSex)
    }

    getDisplay(type)
  }

  function changeSelectedItem(e:Element,info:[string,number]) {

    const options = document.querySelectorAll(".chart-option")

    for (const option of options) {
        option.classList.remove("chart-option--active")
    }

    e.classList.add("chart-option--active")

    if (displayCategory === "race") {
        setRace(info)
    }
    else if (displayCategory === "age") {
        setAge(info)
    }
    else {
        setSex(info)
    }

    
    setSelectedItem([info[0],info[1]])
  }

  function itemHTML([category, value]: [string, number],index:number) {

    return (
        <div className={`chart-option ${category === selectedItem[0] ? "chart-option--active" : ""}`} key={index} onClick={(e) => changeSelectedItem(e.currentTarget,[category,value])}>
            <div className="chart-option--left">
                <Image src={radioButtionChecked} alt='radioButton' className="chart-option--icon--checked"></Image>
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
                        <div className="chart-tab--selection">{getRace[0]}</div>
                        <div className="chart-tab--title">race</div>
                    </div>
                    <div className="chart-tab" onClick={(e) => changeDisplay(e.currentTarget,"age")}>
                        <div className="chart-tab--line"></div>
                        <div className="chart-tab--selection">{getAge[0]}</div>
                        <div className="chart-tab--title">age</div>
                    </div>
                    <div className="chart-tab" onClick={(e) => changeDisplay(e.currentTarget,"sex")}>
                        <div className="chart-tab--line"></div>
                        <div className="chart-tab--selection">{getSex[0]}</div>
                        <div className="chart-tab--title">sex</div>
                    </div>
                </div>
                <div className="chart-display">
                    <div className="chart-tab--line"></div>
                    <div className='chart-display--wrapper'>
                        <div className="chart-display--title">{selectedItem[0]}</div>
                        <div className="chart-display--graph--wrapper">
                            <canvas ref={chartRef} className="chart-display--graph" />
                            <div className="chart-display--graph-text">
                                <div>{Math.floor(selectedItem[1] * 100)}</div>
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

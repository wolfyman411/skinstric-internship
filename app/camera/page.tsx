"use client"

import React, { useEffect, useState } from 'react'
import "./camera.css"
import camera_icon from "../../public/assets/camera.svg"
import camera_shot from "../../public/assets/camera_shot.svg"
import diamond from "../../public/assets/radio-button.svg"
import Image from 'next/image'
import Link from 'next/link'
import button from "../../public/assets/buttin-icon-shrunk.svg";

export default function page() {

  useEffect(() => {
    getCamera()
  },[])

  async function getCamera() {
    const loadingContainer = document.querySelector(".loading__wrapper")
    const videoContainer = document.querySelector(".video__wrapper")

    setTimeout(() => {
        loadingContainer?.classList.add("fade--out")
        videoContainer?.classList.add("fade--in")
    },1000)
  }

  return (
    <section id="camera" className="container">
        <div className="row">
            <div className="wrapper__wrapper">
                <div className="loading__wrapper">
                    <div className="loading-rect"></div>
                    <div className="loading-rect"></div>
                    <div className="loading-rect"></div>
                    <div className="loading__header">
                        <Image src={camera_icon} alt="camera" className='loading__img'/>
                        <div className="loading__text">Setting Up Camera ... </div>
                    </div>
                    <div className="loading__footer">
                        <div className="loading__footer--info">to get better results make sure to have</div>
                        <div className="loading__footer--stubs">
                            <div className="loading__footer--stub">
                                <Image src={diamond} alt="diamond" className='loading__footer--image'/>
                                <div className="loading__footer--text">neutral expression</div>
                            </div>
                            <div className="loading__footer--stub">
                                <Image src={diamond} alt="diamond" className='loading__footer--image'/>
                                <div className="loading__footer--text">frontal pose</div>
                            </div>
                            <div className="loading__footer--stub">
                                <Image src={diamond} alt="diamond" className='loading__footer--image'/>
                                <div className="loading__footer--text">adequate lighting</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="video__wrapper">
                    <div className="camera-shot--wrapper">
                        <div className="camera-shot__text">take picture</div>
                        <Image src={camera_shot} alt='camera_shot' className='camera-shot__img'/>
                    </div>
                    <div className="video__footer">
                        <div className="video__footer--left">
                            <div className="testing-back">
                                <Link href="/select" className="home-button--wrapper">
                                    <Image src={button} alt="back"/>
                                    <div className="back-button--text">BACK</div>
                                </Link>
                            </div>
                        </div>
                        <div className="video__footer--center">
                            <div className="loading__footer--info">to get better results make sure to have</div>
                            <div className="loading__footer--stubs">
                                <div className="loading__footer--stub">
                                    <Image src={diamond} alt="diamond" className='loading__footer--image'/>
                                    <div className="loading__footer--text">neutral expression</div>
                                </div>
                                <div className="loading__footer--stub">
                                    <Image src={diamond} alt="diamond" className='loading__footer--image'/>
                                    <div className="loading__footer--text">frontal pose</div>
                                </div>
                                <div className="loading__footer--stub">
                                    <Image src={diamond} alt="diamond" className='loading__footer--image'/>
                                    <div className="loading__footer--text">adequate lighting</div>
                                </div>
                            </div>
                        </div>
                        <div className="video__footer--right">
                            <div className="testing-back">
                                <Link href="/select" className="home-button--wrapper">
                                    <div className="back-button--text back-button--text--right">PROCEED</div>
                                    <Image src={button} alt="back" style={{rotate:"180deg"}}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

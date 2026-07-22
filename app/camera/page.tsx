"use client"

import React, { useEffect, useRef, useState } from 'react'
import "./camera.css"
import camera_icon from "../../public/assets/camera.svg"
import camera_shot from "../../public/assets/camera_shot.svg"
import diamond from "../../public/assets/radio-button.svg"
import Image from 'next/image'
import Link from 'next/link'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useBoundStore } from '@/public/zustand/zustand'
import { Demographics } from '@/public/demographics'

export default function page() {

  const [stream,setStream] = useState<MediaStream | undefined>()
  const [picture,setPicture] = useState<string | undefined>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const navigator_next = useRouter()
  const setDemographics = useBoundStore((state:any) => state.setDemographics)

  useEffect(() => {
    getCamera()
  },[])

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream
        }

        return () => {
            stream?.getTracks().forEach(track => track.stop())
        }
    }, [stream])

  async function getCamera() {
    const loadingContainer:HTMLElement|null = document.querySelector(".loading__wrapper")
    const videoContainer:HTMLElement|null = document.querySelector(".video__wrapper")

    const mediaStream = await navigator.mediaDevices.getUserMedia({video:true})
    setStream(mediaStream)

    loadingContainer?.style.setProperty("opacity", "0")
    videoContainer?.style.setProperty("opacity", "1")
  }

    function takePicture() {

        const video = videoRef.current

        if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            return
        }

        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const context = canvas.getContext("2d")
        if (!context) return

        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        setPicture(canvas.toDataURL("image/jpeg", 0.9))
    }

    function backLogic() {
        if (picture) {
            setPicture(undefined)
            getCamera()
        }
        else {
            navigator_next.push("/result")
        }
    }

    async function sendData() {
        const processingContainer:HTMLElement|null = document.querySelector(".processing__wrapper")
        const videoContainer:HTMLElement|null = document.querySelector(".video__wrapper")

        videoContainer?.style.setProperty("opacity", "0")
        processingContainer?.style.setProperty("opacity", "1")

        axios
        .post("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",{
            image:picture,
        })
        .then((response) => {
            if (response.data.success) {
                alert("Image analyzed successfully!")
                navigator_next.push("/select")
                const newDemo:Demographics = {
                    race: response.data.data.race,
                    age: response.data.data.age,
                    gender: response.data.data.gender,
                }
                setDemographics(newDemo)
            }
            else {
                alert("Image upload failed, try again.")
                navigator_next.push("/camera")
            }
        })
    }

  return (
    <section id="camera" className="container">
        <div className="row">
            <div className="wrapper__wrapper">
                <div className="processing__wrapper">
                    <div className="loading-rect"></div>
                    <div className="loading-rect"></div>
                    <div className="loading-rect"></div>
                    <div className="loading__header">
                        <div className="processing__text">Analyzing Image ... </div>
                    </div>
                </div>
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
                    <div className="video__stream--wrapper">
                        {picture ? (
                            <>
                                <div className="picture-taken__text">Great Shot!</div>
                                <img src={picture} alt="picture" />
                            </>
                        ) : (
                            <video ref={videoRef} autoPlay muted playsInline />
                        )}
                    </div>
                    {!picture && (
                        <div className="camera-shot--wrapper" onClick={takePicture}>
                            <div className="camera-shot__text">take picture</div>
                            <Image src={camera_shot} alt='camera_shot' className='camera-shot__img'/>
                        </div>
                    )}
                    <div className="video__footer">
                        <div className="video__footer--left">
                            <div className="testing-back">
                                <div className="home-button--wrapper" onClick={backLogic}>
                                    <Image src={button} alt="back"/>
                                    <div className="back-button--text">BACK</div>
                                </div>
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
                        <div className={`video__footer--right ${!picture && " hidden"}`}>
                            <div className="testing-back">
                                <div className="home-button--wrapper" onClick={sendData}>
                                    <div className="back-button--text back-button--text--right">PROCEED</div>
                                    <Image src={button} alt="back" style={{rotate:"180deg"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

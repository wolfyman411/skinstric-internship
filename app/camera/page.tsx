import React from 'react'
import "./camera.css"
import camera_icon from "../../public/assets/camera.svg"
import diamond from "../../public/assets/radio-button.svg"
import Image from 'next/image'

export default function page() {
  return (
    <section id="camera" className="container">
        <div className="row">
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
        </div>
    </section>
  )
}

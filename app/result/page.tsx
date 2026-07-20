import React from 'react'
import "./result.css"
import camera_img from '../../public/assets/camera.svg'
import gallery_img from '../../public/assets/gallery.svg'
import pointer_img from '../../public/assets/pointer.svg'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
  return (
    <section id="result" className='container'>
        <div className="row">
            <div className="result-analysis">to start analysis</div>
            <div className="options-container">
                <div className="option--wrapper">
                    <div className="option-rect"></div>
                    <div className="option-rect"></div>
                    <div className="option-rect"></div>
                    <Image src={pointer_img} alt='pointer' className='pointer'/>
                    <Image src={camera_img} alt='camera' className='option-icon'/>
                    <div className="option-text">allow a.i.<br/>to scan your face</div>
                </div>
                <div className="option--wrapper">
                    <div className="option-rect"></div>
                    <div className="option-rect"></div>
                    <div className="option-rect"></div>
                    <Image src={pointer_img} alt='pointer' className='pointer pointer--right'/>
                    <Image src={gallery_img} alt='gallery' className='option-icon'/>
                    <div className="option-text option-text--right">allow a.i.<br/>to access gallery</div>
                </div>
            </div>
            <div className="result-back">
                <Link href="/testing" className="home-button--wrapper">
                    <Image src={button} alt="back"/>
                    <div className="back-button--text">BACK</div>
                </Link>
            </div>
        </div>
    </section>
  )
}

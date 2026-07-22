'use client'

import React, { useEffect, useRef, useState } from 'react'
import "./result.css"
import camera_img from '../../public/assets/camera.svg'
import gallery_img from '../../public/assets/gallery.svg'
import pointer_img from '../../public/assets/pointer.svg'
import button from "../../public/assets/buttin-icon-shrunk.svg";
import Image from 'next/image'
import Link from 'next/link'
import Processing from '@/components/Processing'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useBoundStore } from '@/public/zustand/zustand'
import { Demographics } from '@/public/demographics'

export default function page() {
    const galleryInputRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [openPopup, setOpenPopup] = useState(false)
    const navigator = useRouter()
    const setDemographics = useBoundStore((state:any) => state.setDemographics)

    useEffect(() => {
        if (selectedImage) {
            getImageData()
        }
    },[selectedImage])

    async function getImageData() {
        if (!selectedImage) return

        const image = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(reader.error)
            reader.readAsDataURL(selectedImage)
        })

        // Send API
        axios
        .post("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",{
            image,
        })
        .then((response) => {
            if (response.data.success) {
                alert("Image analyzed successfully!")
                navigator.push("/select")
                const newDemo:Demographics = {
                    race: response.data.data.race,
                    age: response.data.data.age,
                    gender: response.data.data.gender,
                }
                setDemographics(newDemo)
            }
            else {
                alert("Image upload failed, try again.")
                setSelectedImage(null)
            }
        })
    }

    function openCamera() {
        setOpenPopup(false)
    }

    function openGallery() {
        galleryInputRef.current?.click()
    }

    function handleGalleryChange(event: React.ChangeEvent<HTMLInputElement>) {
        const image = event.target.files?.[0]

        if (image) {
            setSelectedImage(image)
        }
    }

    function defaultHTML() {
        return (
            <>
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleGalleryChange}
                hidden
            />
            <div className="option--wrapper">
                <div className="option-rect"></div>
                <div className="option-rect"></div>
                <div className="option-rect"></div>
                <Image src={pointer_img} alt='pointer' className='pointer'/>
                <Image src={camera_img} alt='camera' className='option-icon' onClick={() => setOpenPopup(true)}/>
                <div className="option-text">allow a.i.<br/>to scan your face</div>
                {openPopup && popupHTML()}
            </div>
            <div className="option--wrapper" onClick={openGallery}>
                <div className="option-rect"></div>
                <div className="option-rect"></div>
                <div className="option-rect"></div>
                <Image src={pointer_img} alt='pointer' className='pointer pointer--right'/>
                <Image src={gallery_img} alt='gallery' className='option-icon'/>
                <div className="option-text option-text--right">allow a.i.<br/>to access gallery</div>
            </div>
            </>
        )
    }

    function loadingHTML() {
        return (
            <div className='processing--wrapper'>
                <div className="option-rect"></div>
                <div className="option-rect"></div>
                <div className="option-rect"></div>
                <Processing/>
            </div>
        )
    }

    function popupHTML() {
        return (
            <div className="popup__wrapper">
                <div className="popup__text">Allow A.I to access your camera</div>
                <div className="popup__footer">
                    <div className="popup__btn" onClick={() => setOpenPopup(false)}>Deny</div>
                    <div className="popup__btn" onClick={() => openCamera()}>Allow</div>
                </div>
            </div>
        )
    }

  return (
    <section id="result" className='container'>
        <div className="row">
            <div className="result-analysis">to start analysis</div>
            <div className="options-container">
                {selectedImage ? loadingHTML() : defaultHTML()}
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

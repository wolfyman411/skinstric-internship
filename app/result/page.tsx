'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from "./result.module.css"
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
    const navigator_next = useRouter()
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
                setSelectedImage(null)
            }
        })
    }

    function openCamera() {
        setOpenPopup(false)

        navigator.permissions.query({name:"camera"})
        .then((result) => {
            if (result.state === "granted") {
                console.log("camera granted")
                navigator_next.push("/camera")
            }
            else if (result.state === "prompt") {
                navigator.mediaDevices.getUserMedia({video:true})
                openCamera()
                return
            }
            else if (result.state === "denied") {
                console.log("camera denied")
            }
        })
        .catch((error) => {
            console.log("denied")
        })
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
            <div className={styles["option--wrapper"]}>
                <div className={styles["option-rect"]}></div>
                <div className={styles["option-rect"]}></div>
                <div className={styles["option-rect"]}></div>
                <Image src={pointer_img} alt='pointer' className={styles.pointer}/>
                <Image src={camera_img} alt='camera' className={styles["option-icon"]} onClick={() => setOpenPopup(true)}/>
                <div className={styles["option-text"]}>allow a.i.<br/>to scan your face</div>
                {openPopup && popupHTML()}
            </div>
            <div className={styles["option--wrapper"]} onClick={openGallery}>
                <div className={styles["option-rect"]}></div>
                <div className={styles["option-rect"]}></div>
                <div className={styles["option-rect"]}></div>
                <Image src={pointer_img} alt='pointer' className={`${styles.pointer} ${styles["pointer--right"]}`}/>
                <Image src={gallery_img} alt='gallery' className={styles["option-icon"]}/>
                <div className={`${styles["option-text"]} ${styles["option-text--right"]}`}>allow a.i.<br/>to access gallery</div>
            </div>
            </>
        )
    }

    function loadingHTML() {
        return (
            <div className={styles["processing--wrapper"]}>
                <div className={styles["option-rect"]}></div>
                <div className={styles["option-rect"]}></div>
                <div className={styles["option-rect"]}></div>
                <Processing/>
            </div>
        )
    }

    function popupHTML() {
        return (
            <div className={styles["popup__wrapper"]}>
                <div className={styles["popup__text"]}>Allow A.I to access your camera</div>
                <div className={styles["popup__footer"]}>
                    <div className={styles["popup__btn"]} onClick={() => setOpenPopup(false)}>Deny</div>
                    <div className={styles["popup__btn"]} onClick={() => openCamera()}>Allow</div>
                </div>
            </div>
        )
    }

  return (
    <section className={`${styles.result} container`}>
        <div className="row">
            <div className={styles["result-analysis"]}>to start analysis</div>
            <div className={styles["options-container"]}>
                {selectedImage ? loadingHTML() : defaultHTML()}
            </div>
            <div className={styles["result-back"]}>
                <Link href="/testing" className="home-button--wrapper">
                    <Image src={button} alt="back"/>
                    <div className="back-button--text">BACK</div>
                </Link>
            </div>
        </div>
    </section>
  )
}

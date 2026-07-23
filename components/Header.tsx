"use client"

import React from 'react'
import styles from "./header.module.css"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {

  const pathname = usePathname()

  function headerReturn() {
    if (pathname === "/" || pathname === "/testing" || pathname === "/result") {
      return " INTRO "
    }
    else {
      return " ANALYSIS "
    }
  }

  function isWhite() {
    if (pathname === "/camera") {{
      return true
    }}
    return false
  }

  return (
    <div className={`${styles["header"]} container ${pathname === "/summary" && styles["header--background"]}`}>
      <Link href="/" className={styles["header-left"]}>
        <div className={`${styles["logo-text"]} ${isWhite() && styles["logo-text--white"]}`}>SKINSTRIC</div>
        <div className={`${styles["tab-text"]} ${isWhite() && styles["tab-text--white"]}`}>[ {headerReturn()} ]</div>
      </Link>
      {pathname === "/" && (
        <div className={styles["button-simple"]}>ENTER CODE</div>
      )}
    </div>
  )
}

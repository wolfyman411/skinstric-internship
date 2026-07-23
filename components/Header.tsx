"use client"

import React from 'react'
import styles from "./header.module.css"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {

  const pathname = usePathname()

  function headerReturn() {
    if (pathname === "/" || pathname === "/testing") {
      return " INTRO "
    }
    else {
      return " ANALYSIS "
    }
  }

  return (
    <div className={`${styles["header"]} container`}>
      <Link href="/" className={styles["header-left"]}>
        <div className={styles["logo-text"]}>SKINSTRIC</div>
        <div className={styles["tab-text"]}>[ {headerReturn()} ]</div>
      </Link>
      {pathname === "/" && (
        <div className={styles["button-simple"]}>ENTER CODE</div>
      )}
    </div>
  )
}

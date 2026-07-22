"use client"

import React from 'react'
import "./header.css"
import { usePathname } from 'next/navigation'

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
    <header className='container'>
      <div className="header-left">
        <div className='logo-text'>SKINSTRIC</div>
        <div className='tab-text'>[ {headerReturn()} ]</div>
      </div>
      {pathname === "/" && (
        <div className='button-simple'>ENTER CODE</div>
      )}
    </header>
  )
}

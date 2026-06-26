import React from 'react'
import ApplyVisaHome from './components/ApplyVisaHome'
import Navbar from './layouts/Navbar'
import Privilege from './components/Privilege'
import ApplyOnlineSection from './components/ApplyCard'
import HowToUse from './components/HowToUse'
import Footer from './components/Footer'
export default function VisaApply() {
  return (
    <main>
         <Navbar/>
         <ApplyVisaHome/>
         <Privilege/>
         <ApplyOnlineSection/>
         <HowToUse/>
         <Footer/>
    </main>
  )
}

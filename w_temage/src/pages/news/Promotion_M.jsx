import Contac from '@/componet/home_page/Contac'
import Promotion from '@/componet/home_page/Promotion'
import Image_cpn from '@/componet/Image_cpn'
import React from 'react'

const Promotion_M = () => {
  return (
    <div><Image_cpn  desktopSrc="/bg_p/p01.jpeg"
        mobileSrc="/bg_p/p01.jpeg"
        className="rounded-xl shadow-md"/>

      <Promotion />


      <Contac /></div>
  )
}

export default Promotion_M
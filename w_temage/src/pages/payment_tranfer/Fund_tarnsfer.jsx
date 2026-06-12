import React from 'react'
import { Cpn_Fund_tranfer } from '../production_fina/componet/Cpn_Fund_tranfer'
import Contac from '@/componet/home_page/Contac'
import Image_cpn from '@/componet/Image_cpn'

const Fund_tarnsfer = () => {
  return (
    <div>
  <Image_cpn  desktopSrc="/bg_p/t001.jpeg"
        mobileSrc="/bg_p/t001.jpeg"
        className="rounded-xl shadow-md"/>

      <Cpn_Fund_tranfer />


      <Contac />
    </div>
  )
}

export default Fund_tarnsfer
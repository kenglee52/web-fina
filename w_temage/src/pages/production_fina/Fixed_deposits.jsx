import Image_cpn from '@/componet/Image_cpn'
import React from 'react'
import Cpn_Fixed_deposits from './componet/Cpn_Fixed_deposits'
import Contac from '@/componet/home_page/Contac'
import Cpn_Ditail from './componet/Cpn_Ditail'

const Fixed_deposits = () => {
  return (
    <div>
        <Image_cpn   desktopSrc="/bg_p/p03.jpeg"
        mobileSrc="/bg_p/p03.jpeg"
        className="rounded-xl shadow-md"/>


        <Cpn_Fixed_deposits />
          <Cpn_Ditail/>
         <Contac />
    </div>
  )
}

export default Fixed_deposits
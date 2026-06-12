import Image_cpn from '@/componet/Image_cpn'
import React from 'react'
import Cpn_personaloan from './production_fina/componet/Cpn_personaloan'
import Contac from '@/componet/home_page/Contac'
import Cpn_Ditail from './production_fina/componet/Cpn_Ditail'

const Personal_loan = () => {
  return (
   <div>
        <Image_cpn  desktopSrc="/bg_p/p002.jpeg"
        mobileSrc="/bg_p/p002.jpeg"
        className="rounded-xl shadow-md"/>

        <Cpn_personaloan  />
          <Cpn_Ditail/>
        <Contac/>
    </div>
  )
}

export default Personal_loan
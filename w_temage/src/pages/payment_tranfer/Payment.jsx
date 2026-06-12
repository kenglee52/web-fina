import Contac from '@/componet/home_page/Contac'
import Image_cpn from '@/componet/Image_cpn'
import React from 'react'
import Cpn_Payment from '../production_fina/componet/Cpn_Payment'

const Payment = () => {
  return (
    <div>
      <Image_cpn  desktopSrc="/bg_p/payment.jpeg"
        mobileSrc="/bg_p/payment.jpeg"
        className="rounded-xl shadow-md"/>

        <Cpn_Payment  />
        
        <Contac/>
    </div>
  )
}

export default Payment
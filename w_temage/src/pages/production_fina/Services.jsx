import Image_cpn from '@/componet/Image_cpn'
import React from 'react'
import Cpn_servcie from './componet/Cpn_servcie'
import Contac from '@/componet/home_page/Contac'
import Cpn_Ditail from './componet/Cpn_Ditail'

const Services = () => {
  return (
   <div>
      <Image_cpn
        desktopSrc="/bg_p/p001.jpeg"
        mobileSrc="/bg_p/p001.jpeg"
        className="rounded-xl shadow-md"
      />
      <Cpn_servcie/>
        <Cpn_Ditail/>
      <Contac/>
    </div>
  )
}

export default Services
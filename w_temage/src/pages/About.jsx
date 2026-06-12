import History_of_fina from '@/componet/about/History_of_fina'
import Image_about from '@/componet/about/Image_about'
import Location from '@/componet/about/Location'
import Slie_iconPartner from '@/componet/about/Slie_iconPartner'
import Why_choose from '@/componet/about/Why_choose'
import Contac from '@/componet/home_page/Contac'
import Fina_mySelf from '@/componet/home_page/Fina_mySelf'
import React from 'react'

const About = () => {
  return (
    <div>


      <Image_about />
      <History_of_fina/>
      <Why_choose />
      <Slie_iconPartner />
      <Location />
      <Fina_mySelf />
      <Contac />
    </div>
  )
}

export default About
import React from "react";
import Image_cpn from "@/componet/Image_cpn";
import Cpn_saving from "./componet/Cpn_saving";
import Contac from "@/componet/home_page/Contac";
import Cpn_Ditail from "./componet/Cpn_Ditail";

const Saving_account = () => {
  return (
    <div>
      <Image_cpn
        desktopSrc="/bg_p/p004.jpeg"
        mobileSrc="/bg_p/p004.jpeg"
        className="rounded-xl shadow-md"
      />

      <Cpn_saving/>

<Cpn_Ditail/>
      <Contac />
    </div>
  );
};

export default Saving_account;

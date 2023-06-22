import { Component } from "solid-js";
import Logo from "../assets/logogo.png"
import { CompanyType } from "../pages/Companies";

const CompanyView = (props:CompanyType)=> {
    return (
        <div id="post" class="flex flex-col w-full rounded-[1rem] bg-[#171717] mt-10  border-[1px] border-solid border-white/[0.15]">
        <div id="textInfo" class="px-6 py-6">
        <div id="thumbnail" class="w-[8rem] h-[8rem] overflow-clip rounded-[1rem] mt-[-4rem] ">
                <img src={Logo}/>

            </div>

            <div id="headline" class="mt-4">
                <h1 class="text-white text-[1.6rem] font-bold leading-8 text">{props.Name}</h1>
            </div>

            <p id="subtext" class="text-white opacity-75 mt-2 font-thin " >Bugun sizlar bilan mobil ilovalar yaratish uchun eng mashhur uslubni ko’rib chiqamiz. Nima uchun u eng mashhur dasturlash vositasi ekanligi</p>
        </div>
        
            <div id="stats" class="w-full flex flex-row px-6 py-6 gap-12">
                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">32 Maqolalar</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">06 Vakansiyalar</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyView
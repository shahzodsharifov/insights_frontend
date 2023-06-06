import { Component } from "solid-js";
import Logo from "../assets/logogo.png"

const CompanyLists:Component = () => {
    return(
        <div id="companyList" class="flex flex-col gap-4 bg-[#171717] px-6 py-6 rounded-[1rem]" >
            <h1 class="text-white md:text-[1.2rem] font-bold">Kompaniyalar</h1>
            <div id="c1" class="flex flex-row items-center gap-2" >
               <div id="image" class="w-10 h-10 overflow-clip rounded-[30rem]">
                <img src={Logo}/>
               </div>
                <p class="text-lg text-white">EverbestLab</p>
            </div>

            <div id="c2" class="flex flex-row items-center gap-2" >
               <div id="image" class="w-10 h-10 overflow-clip rounded-[30rem]">
                <img src={Logo}/>
               </div>
                <p class="text-lg text-white">UIC Group</p>
            </div>

            <div id="c3" class="flex flex-row items-center gap-2" >
               <div id="image" class="w-10 h-10 overflow-clip rounded-[30rem]">
                <img src={Logo}/>
               </div>
                <p class="text-lg text-white">Najot Ta'lim</p>
            </div>
            <p class="text-[#ffffffc4] text-[1rem]">Hamma kompaniyalar</p>
        </div>
    )
}

export default CompanyLists
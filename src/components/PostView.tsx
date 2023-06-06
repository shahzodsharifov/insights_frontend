

import { Component } from "solid-js";
import Logo from "../assets/logogo.png"

const PostView = ()=> {
    return (
        <div id="vacancy" class="flex flex-col w-full rounded-[1rem] bg-[#171717]  px-6 py-4 " >
            <p id="employerName" class="text-white" >EverbestLab Ltd</p>
              <div id="headline" class="mt-4">
                <h1 class="text-white text-[1.6rem] font-bold leading-8 text">Full-stack NodeJS Dasturchi</h1>
            </div>
        
            <div id="stats" class="w-full flex flex-row mt-4 gap-12">
                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">Tashkent</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">Full-time</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">$2.000</p>
                </div>
            </div>
        </div>
    )
}

export default PostView
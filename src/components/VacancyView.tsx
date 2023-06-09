import { Component, createRenderEffect, createSignal } from "solid-js";
import Logo from "../assets/logogo.png"
import axios from "axios";

type VaccancyProps = {
    title: string,
    jobType: string,
    location: string,
    salary: string
    employerId: string

}

const VacancyView = (props: VaccancyProps)=> {
    const [usrName, setUsrName] = createSignal("")

    const instance = axios.create({
        withCredentials: true,
        
      });

    createRenderEffect(()=>{
        instance.get(`https://13.49.228.160443/api/users/${props.employerId}`).then((user)=> {
            console.log(user.data.data.user)
            setUsrName(user.data.data.user.Name)
           
        })
    },[])

    return (
        <div id="vacancy" class="flex flex-col w-full rounded-[1rem] bg-[#171717]  px-6 py-4 " >
            <p id="employerName" class="text-white" >{usrName()}</p>
              <div id="headline" class="mt-4">
                <h1 class="text-white text-[1.6rem] font-bold leading-8 text">{props.title}</h1>
            </div>
        
            <div id="stats" class="w-full flex flex-row mt-4 gap-12">
                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{props.location}</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{props.jobType}</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{props.salary} so'm</p>
                </div>
            </div>
        </div>
    )
}

export default VacancyView
import { Component, For, Show, createEffect, createResource, createSignal } from "solid-js";
import Navigation from "../components/Navigation";
import CompanyView from "../components/CompanyView";
import Sidebar from "../components/Sidebar";
import Vacancies from "../components/VacanciesList";
import LoginModal from "../components/LoginModal";
import axios, { AxiosResponse } from "axios";
import { createStore } from "solid-js/store";
import Default from "../assets/default.png"
import MyProfileView from "../components/MyProfileView";
import PostView from "../components/PostView";
import Post from "../components/Post";
import { useLocation } from "@solidjs/router";
import Logo from "../assets/logogo.png"

export type PostType = {
  id: string,
  Thumbnail: string,
  author_id: string,
  body: string,
  category: string,
  comments: [],
  headline: string,
  subtitle: string
}

const VaccancyDetails =()=> {
  const location = useLocation()
  console.log(location.pathname)
  var path = location.pathname.split("/")
  
  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
  const[hasLoaded, setLoaded] = createSignal(false)
  const [vaccancyData, setVaccancyData] = createStore({
    ID: "",
    title: "",
    location: "",
    salary: "",
    employer_id: "",
    type: "",
    requirements: [],
    conditions: [],
    info: "",
    CreatedAt: "",
    
  })
  const [usrName, setUsrName] = createSignal("")
  const [usrPhoto, setUsrPhoto] = createSignal("")
  const instance = axios.create({
    withCredentials: true,
    
  });


    







  



   
  createEffect(() => {
   
    instance.get(`https://insightsbackend.onrender.com/api/vaccancies/${path[2]}`).then((theVaccancy) => {
    
        console.log(theVaccancy.data.data.vaccancy)
      
        setVaccancyData(theVaccancy.data.data.vaccancy)

      //   instance.get(`https://insightsbackend.onrender.com/api/users/${thePost.data.data.post.author_id}`).then((user)=> {
      //     console.log(user.data.data.user)
      //     setUsrName(user.data.data.user.Name)
      //     setUsrPhoto(user.data.data.user.Photo)
      // })

      }
        
        
        )
     
    
  },[])


  //  if (getUser.state === "pending") {
  //   return <h1>Loading</h1>;
  // }



  return (
    

    


  <>
     <div id='mainBody' class="flex flex-col w-full bg-[#0C0C0C]" >
  
  <div class='sticky top-0 z-10'>
  
  <Navigation setLoginModalShow={setLoginModalShow} setCreateModalShow={setCreateModalShow} createModalShow={createModalShow} />
  </div>
  
  <Show when={loginModalShow()==true}>
  <div id='loginModal' class='md:fixed flex flex-row justify-center items-center md:w-full md:h-full z-20 bg-white/50 md:top-0 md:left-0'  >
  <LoginModal  setLoginModalShow={setLoginModalShow}/>
  </div>
  </Show>
  <div id='contents' class='w-full h-full b-[#0C0C0C] flex flex-row px-8 py-6 gap-6 justify-center' >
  
  <div id='sidebar'  class='w-1/4 fixed left-14'>
  <Sidebar setLoginModalShow={setLoginModalShow}/>
  </div>
  
  <div id="postBody" class="flex flex-col w-2/4 gap-8 px-16 min-h-[100vh]">
  
    <div class="rounded-[12px] bg-[#171717] px-[20px] py-[20px] ">



    <h1 class="text-white mt-4 text-[1.8rem] font-bold ">{vaccancyData.title}</h1>
    <p class="text-white text-[20px] font-bold mt-4 " >Talablar</p>
    {vaccancyData.requirements.map((req)=> 
      <p  class="text-white text-[16px]">-{req}</p>
    )}
     <p class="text-white text-[20px] font-bold mt-4 " >Biz taklif qilamiz</p>
     {vaccancyData.conditions.map((con)=> 
      <p class="text-white">-{con}</p>
    )}
     <p class="text-white text-[20px] font-bold mt-4 " >Qo'shimcha Ma'lumot</p>
     
    <p class="text-white text-[16px]  "> {vaccancyData.info}</p>

    <div id="stats" class="w-full flex flex-row mt-4 gap-12  mb-4">
                <div class="flex flex-row gap-1 items-center" >
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="https://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.992 5.99178C11.6594 3.2648 7.7697 2.53125 4.84714 5.02835C1.92458 7.52545 1.51312 11.7005 3.80823 14.6538C5.71645 17.1093 11.4914 22.2881 13.3841 23.9643C13.5959 24.1518 13.7017 24.2456 13.8252 24.2824C13.933 24.3146 14.051 24.3146 14.1588 24.2824C14.2823 24.2456 14.3881 24.1518 14.5999 23.9643C16.4926 22.2881 22.2676 17.1093 24.1758 14.6538C26.4709 11.7005 26.1097 7.49918 23.1369 5.02835C20.1641 2.55752 16.3246 3.2648 13.992 5.99178Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-white opacity-75">32</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="https://www.w3.org/2000/svg">
                <path d="M9.3329 11.0833H13.9996M9.3329 15.1667H17.4996M14.5829 23.3333C20.0597 23.3333 24.4996 18.8935 24.4996 13.4167C24.4996 7.93984 20.0597 3.5 14.5829 3.5C9.10608 3.5 4.66623 7.93984 4.66623 13.4167C4.66623 14.525 4.84806 15.5909 5.1835 16.586C5.30973 16.9606 5.37285 17.1478 5.38423 17.2917C5.39548 17.4337 5.38698 17.5333 5.35183 17.6714C5.31624 17.8113 5.23766 17.9567 5.08051 18.2476L3.17224 21.7797C2.90005 22.2836 2.76395 22.5355 2.79441 22.7299C2.82094 22.8992 2.92061 23.0483 3.06694 23.1376C3.23494 23.2401 3.51975 23.2106 4.08937 23.1518L10.0639 22.5342C10.2448 22.5155 10.3353 22.5061 10.4177 22.5093C10.4988 22.5124 10.5561 22.52 10.6352 22.5382C10.7156 22.5568 10.8167 22.5957 11.0189 22.6736C12.125 23.0997 13.3267 23.3333 14.5829 23.3333Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-white opacity-75">06</p>
                </div>
            </div>
    </div>
    
  </div>
  
  <div class='w-1/4  right-16 absolute pl-4'  >
  <div class=''>
  <Vacancies/>
  </div>
  </div>
  
  </div>
  </div>
  
  </>
  
  

  )}


  




export default VaccancyDetails
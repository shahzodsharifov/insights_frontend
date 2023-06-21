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

const EventDetails =()=> {
  const location = useLocation()
  console.log(location.pathname)
  var path = location.pathname.split("/")
  
  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
  const[hasLoaded, setLoaded] = createSignal(false)
  const [eventData, setEventData] = createStore({
    ID: "",
    title: "",
    speakers: [],
    eventType: "",
    info: "",
    location:"",
    organizer_id: "",
    date: "",
    CreatedAt: ""

    
  })
  const [usrName, setUsrName] = createSignal("")
  const [usrPhoto, setUsrPhoto] = createSignal("")
  const instance = axios.create({
    withCredentials: true,
    
  });


    







  



   
  createEffect(() => {
   
    instance.get(`https://api.noted.today/api/events/${path[2]}`).then((theEvent) => {
    
        console.log(theEvent.data.data.event)
      
        setEventData(theEvent.data.data.event)

        instance.get(`https://api.noted.today/api/users/${theEvent.data.data.event.organizer_id}`).then((user)=> {
          console.log(user.data.data.user)
          setUsrName(user.data.data.user.Name)
          setUsrPhoto(user.data.data.user.Photo)
      })

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
  <div id='contents' class='w-full min-h-[100vh] b-[#0C0C0C] flex flex-row px-8 py-6 gap-6 justify-center' >
  
  <div id='sidebar' class=' md:w-1/5 z-10 w-full fixed max-sm:bottom-0  md:left-14'>
  <Sidebar setLoginModalShow={setLoginModalShow}/>
  </div>
  
  <div id="postBody" class="flex flex-col md:w-2/4 gap-8 md:px-16">
  
    <div class="rounded-[12px] bg-[#171717]  p-[20px]">
    <h1 class="text-white text-[1.8rem] font-bold">{eventData.title}</h1>
    <div class="flex flex-row gap-4">
        <p class="text-white text-[17px] opacity-50" >{usrName()}</p>
        <p class="text-white text-[17px] opacity-50">{eventData.eventType}</p>
    </div>
    <p class="text-white text-[17px] mt-4"> {eventData.info}</p>
    <p class="text-white text-[20px] font-bold mt-4">Spikerlar</p>
    {eventData.speakers.map((e)=> <p class="text-white">{e}</p>)}
    <p class="text-white text-[20px] font-bold mt-4">Qachon va qayerda</p>
    <p class="text-white text-[20]">{eventData.date}</p>
    <p class="text-white text-[20]">{eventData.location}</p>

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


  




export default EventDetails
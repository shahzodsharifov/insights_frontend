import { Component, For, Show, createEffect, createSignal } from "solid-js";
import Navigation from "../components/Navigation";
import CompanyView from "../components/CompanyView";
import Sidebar from "../components/Sidebar";
import LoginModal from "../components/LoginModal";
import VacancyView from "../components/VacancyView";
import CompanyLists from "../components/CompanyLists";
import VacanciesList from "../components/VacanciesList";
import axios from "axios";
import EventsView from "../components/EventsView";
import { Link } from "@solidjs/router";


export type EventType = {
  ID: string,
  title: string,
  date: string,
  location: string,
  speakers: [],
  eventType:string,
  organizer_id: string,
  CreatedAt: Date,

}

const Events:Component =()=> {

  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
  const [events, setEvents] = createSignal<Array<EventType>>([])

  const instance = axios.create({
    withCredentials: true
  })

  createEffect(() => {
    instance.get("http://13.49.228.160:80/api/events")
    .then((tEvents)=> {
      console.log(tEvents.data)
      tEvents.data.data.events.map((e:EventType)=> {
        setEvents([...events(), e])
      })
      
    })
  },[])
    return(

        <>
           <div id='mainBody' class="flex flex-col w-full bg-[#0C0C0C]" >
    
    <div class='sticky top-0 z-10'>
    <Navigation setLoginModalShow={setLoginModalShow} setCreateModalShow={setCreateModalShow} createModalShow={createModalShow}/>
    </div>
    
  <Show when={loginModalShow()==true}>
  <div id='loginModal' class='md:fixed flex flex-row justify-center items-center md:w-full md:h-full z-20 bg-white/50 md:top-0 md:left-0'  >
      <LoginModal  setLoginModalShow={setLoginModalShow}/>
    </div>
  </Show>
    <div id='contents'  class='w-full min-h-[100vh] bg-[#0C0C0C] flex flex-col md:flex-row md:px-8 md:py-6 md:gap-6 md:justify-center' >

    <div id='sidebar' class=' md:w-1/5 z-10 w-full fixed max-sm:bottom-0  md:left-14'>
      <Sidebar setLoginModalShow={setLoginModalShow}/>
    </div>



    <div id="events" class='md:w-2/4 flex flex-col gap-6 md:py-0 py-4 px-5 md:px-14 '>
      <h1 class="text-white font-bold  md:text-[1.8rem] max-sm:text-[2rem]" >Tadbirlar</h1>
        <div class="flex flex-col md:gap-4 w-full md:mt-4" >
          <For each={events()}>{(theEvent, i) =>
            <Link href={`/events/${theEvent.ID}`}>
              <EventsView
                title={theEvent.title}
                eventType={theEvent.eventType}
                organizerId={theEvent.organizer_id}
                when={theEvent.date}
                location={theEvent.location}
                

              />
            
            </Link>
          }

          </For>
        </div>
    </div>

    <div class={`sm:hidden md:w-1/4 md:h-[40rem] md:flex md:flex-col  md:absolute md:right-16 md:pl-4`}  >
    <CompanyLists/>
    <div class='mt-6'>
    <VacanciesList/>
    </div>
    </div>


    </div>
   </div>
        </>
        
    )
}

export default Events
import { Show, createEffect, createSignal } from "solid-js"
import Navigation from "../components/Navigation"
import LoginModal from "../components/LoginModal"
import Sidebar from "../components/Sidebar"
import Logo from "../assets/logogo.png"
import { URL } from "url"
import { uploadFile, UploadClient } from '@uploadcare/upload-client'
import { createSign } from "crypto"
import axios from "axios"
import { useLocation } from "@solidjs/router"
import { JSX } from "solid-js/jsx-runtime";
import { createStore } from "solid-js/store"
import { DateTimePicker } from 'date-time-picker-solid'
import moment from "moment"
import "flowbite"


const EventsCreator = () => {
    const [loginModalShow, setLoginModalShow] = createSignal(false)
    const [createModalShow, setCreateModalShow] = createSignal(false)
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
    const [previewUrl, setPreviewUrl] = createSignal<string | null>(null);
    const [showBtn, setShowBtn] = createSignal(false)
    const [usrDetails, setUsrDetails]= createStore({
      id: "",
      name: "",
      photo: ""
    })
    const [photoId, setPhotoId]= createSignal("")
    const [theDate, setTheDate] = createSignal("")
    const [theTitle, setTheTitle] = createSignal("")
    const [theLocation, setTheLocation]= createSignal("")
    // const [thePrice, setThePrice] = createSignal("")
    const [theEventType, setTheEventType] = createSignal("")
    const [theInfo, setTheInfo] = createSignal("")

    const [selectJobType, setSelectJobType] = createSignal(false)

    var reqList:Array<String> = ["","","","","","","","","","","","","","","","",];
    var offerList:Array<String>=["","","","","","","","","","","","","","","","",];
    const [elements, setElements] = createSignal<JSX.Element[]>([ <input type="text" onChange={(e)=> {
        console.log(e.target.parentElement?.id)
        for(let i=0; i<reqList.length; i++) {
          
            if(i == parseInt(e.target.parentElement!.id)) {
                reqList[i] = e.target.value
            } 
        }
        console.log(reqList)
    }} class="md:w-full border-[1px] border-[#ffffff55] rounded-[0.4rem] bg-transparent text-[1rem] text-white px-2 py-2 outline-none"/>]);
    const [conElements, setConElements] = createSignal<JSX.Element[]>([ <input type="text" 
    onChange={(e)=> {
      console.log(e.target.parentElement?.id)
      for(let i=0; i<offerList.length; i++) {
        
          if(i == parseInt(e.target.parentElement!.id)) {
              offerList[i] = e.target.value
          } 
      }
      console.log(offerList)
  }}
    class="md:w-full border-[1px] border-[#ffffff55] rounded-[0.4rem] bg-transparent text-[1rem] text-white px-2 py-2 outline-none"/>]);
    // const[reqList, setReqList] = createSignal([])
    // const[offerList, setOfferList] = createSignal([])


  

    const handleAddElement = () => {
      const newElement = <input type="text"
      onChange={(e)=> {
        console.log(e.target.parentElement?.id)
        for(let i=0; i<reqList.length; i++) {
          reqList[i] == e.target.value
            if(i == parseInt(e.target.parentElement!.id)) {
                console.log("it is equal")
                reqList[i] = e.target.value
            } 
        }
        console.log(reqList)
        console.log(elements().length)
    }}
      class="md:w-full border-[1px] border-[#ffffff55] rounded-[0.4rem] bg-transparent text-[1rem] text-white px-2 py-2 outline-none"/>
      setElements(prevElements => [...prevElements, newElement]);
    };

    const handleConElement = () => {
        const newElement = <input type="text" 
        onChange={(e)=> {
          console.log(e.target.parentElement?.id)
          for(let i=0; i<offerList.length; i++) {
            offerList[i] == e.target.value
              if(i == parseInt(e.target.parentElement!.id)) {
                  console.log("it is equal")
                  offerList[i] = e.target.value
              } 
          }
          console.log(offerList)
          console.log(conElements().length)
      }}
        class="md:w-full border-[1px] border-[#ffffff55] rounded-[0.4rem] bg-transparent text-[1rem] text-white px-2 py-2 outline-none"/>
        setConElements(prevElements => [...prevElements, newElement]);
      };

    const handleReqDel = () => {
      console.log('trying to delete')
  
      setElements(elements().filter((el, index)=> {
        return index !== elements().length -1
      } ))
      reqList.splice(elements().length-1,1)
      console.log(elements());
    }  

    const handleOfferDel = () => {
      console.log('trying to delete')
  
      setConElements(conElements().filter((el, index)=> {
        return index !== conElements().length -1
      } ))
      offerList.splice(conElements().length-1,1)
      console.log(conElements());
    }  

    const location = useLocation();
    const id = location.state
    console.log(id)
    const client = new UploadClient({ publicKey: 'a44544398a2b6eaff0f5' })

    const instance = axios.create({
      withCredentials: true,
      
    });
  
    const handleSubmit = () => {
      console.log("submit")
      console.log(theTitle())
      console.log(theEventType())

      console.log(theLocation())
      console.log(reqList.filter((_,index) => {
        return index < elements().length -1
      }))
      console.log(theInfo())
      instance.post(`http://localhost:8000/api/users/${usrDetails.id}/addEvent`, {
        Title: theTitle(),
        Date: theDate(),
        Location: theLocation(),
        EventType: theEventType(),
        Info: theInfo(),
        Speakers: reqList.filter((_,index) => {
          return index <= elements().length -1
        }),
      })
      .then((res)=> {
        console.log(res)
      })
    }


    createEffect(() => {
      instance.get("http://localhost:8000/api/users/me", {

      })
      .then((response)=> {
      
        console.log(response)
        setUsrDetails({
          name: response.data.data.user.name,
          photo: response.data.data.user.photo,
          id: response.data.data.user.id
  
        })
      })
      .catch((err)=> {
       
      } )
    },[])

    return (
      <>
       <div class='sticky top-0 z-10'>
        <Navigation setLoginModalShow={setLoginModalShow} setCreateModalShow={setCreateModalShow} createModalShow={createModalShow} />
        </div>

        <div id='mainBody' class="flex flex-col w-full h-[100vw] bg-[#0C0C0C] items-center" >
    
        
        <Show when={loginModalShow()==true}>
        <div id='loginModal' class='md:fixed flex flex-row justify-center items-center md:w-full md:h-full z-20 bg-white/50 md:top-0 md:left-0'  >
        <LoginModal  setLoginModalShow={setLoginModalShow}/>
        </div>
        </Show>

        <div id='editorBox' class=' flex flex-col md:w-[40rem] h-auto border-box m md:mt-[2rem] md:rounded-[1rem] px-6 py-6  bg-[#171717] ' >

            <h1 class="text-white text-[2rem] font-bold">Tadbir E'loni Yaratish</h1>
            <div id="editBody" class="w-full h-auto mt-4">
            <input type="text" placeholder="Tadbir nomi" onChange={(e)=> setTheTitle(e.target.value)} class="md:w-full border-[1px] border-[#ffffff55] rounded-[0.4rem] bg-transparent text-[1rem] text-white px-2 py-2 outline-none"/>

            <div id="choices" class="flex flex-row justify-between mt-4">
            <div id="jobType" class="flex flex-row justify-between align-baselin items-center  px-2 py-2 w-[9rem] border-[1px] border-[#ffffff55] rounded-[0.4rem]">
            <Show when={theEventType().length >1} fallback={
                 <p class="text-[#e8f6ff] opacity-60">Tadbir turi</p>
            }>
                 <p class="text-[#e8f6ff] ">{theEventType()}</p>
            </Show>
            <div onClick={()=> setSelectJobType(!selectJobType())}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="white" stroke-opacity={0.75} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            </div>
            <Show when={selectJobType()}>
            <div id="modalList" class="flex flex-col md:gap-1 md:mt-12 md:w-[8rem] md:px-4 md:py-3 md:rounded-[0.5rem] justify-center text-white absolute bg-[#35373B] select-none cursor-pointer">
            <p onClick={()=> {
                setTheEventType("Offline")
                setSelectJobType(false)
            }}>Offlayn</p>
            <p onClick={()=> {
                setTheEventType("Online")
                setSelectJobType(false)
            }}>Onlayn</p>
            </div>
            </Show>
           <div>
          
           </div>
            <input type="text" placeholder={theEventType()=="Online" ? "Platforma nomi" :"Manzil(Shahar nomi)"  } onChange={(e)=> setTheLocation(e.target.value)} class="md:w-1/3 border-[1px] border-[#ffffff55] rounded-[0.4rem] bg-transparent text-[1rem] text-white px-2 py-2 outline-none"/>
            
            {/* <div class="relative max-w-sm">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="#ffffff55" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
              </div>
              <input inline-datepicker type="date" class="bg-transparent border border-[#ffffff55] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Sanani tanlang"/>
            </div> */}

            <div class="relative flex flex-row justify-between ">
            <input
            type="date"
            placeholder="Select a date"
            onChange={(e)=> setTheDate(e.target.value.toString())}
            class=" pl-4 bg-transparent pr-4 py-2 border border-[#ffffff55] rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"/>
  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="#ffffff55" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
             
  </div>
</div>
            


         
           
       
            </div>

            <h1 class="text-white text-[20px] font-bold mt-4">Spikerlar</h1>
            <div class="flex flex-col mt-2 gap-2">
            {elements().map((e, i) => 
                <div  id={i.toString()} onChange={(val)=> {
                    console.log("error occured there!")
                }}>{e}</div>
            )}
           <div class="flex flex-row gap-2">
           <Show when={elements().length<16} fallback={<p class="text-white text-[17px]">Maximum 16ta talab qo'yish mumkin</p>}>
             <button onClick={handleAddElement} class="w-[4rem] flex flex-row items-center justify-center bg-[#35373B] p-2 rounded-[0.4rem] text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#ffffff79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </button>
             </Show>

             <Show when={elements().length>1}>
             <button onClick={handleReqDel} class="w-[4rem] flex flex-row items-center justify-center bg-[#35373B] p-2 rounded-[0.4rem] text-white">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#ffffff79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


            </button>
             </Show>
           </div>

            </div>

         
            <h1 class="text-white text-[20px] font-bold mt-4">Qo'shimcha Ma'lumot</h1>
            <textarea onChange={(e) => setTheInfo(e.target.value)} class="w-full h-[8rem] border-[1px] border-[#ffffff55] rounded-[0.4rem] bg-transparent text-[1rem] text-white px-2 py-2 outline-none  resize-none overflow-hidden p-4"/>

            </div>

            <button class="mb-4 mt-6 bg-white rounded-[0.4rem] w-[10rem] h-[2.5rem]" onClick={()=> handleSubmit() }>Joylash</button>


        </div>
   </div>
      </>
    )
}

export default EventsCreator
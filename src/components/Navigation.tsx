import { Accessor, Component, Setter, Show, createEffect, createSignal } from "solid-js";
import {Link, Router, useLocation, useParams} from "@solidjs/router"
import CreateModal from "./CreateModal";
import { useRouter } from "@solidjs/router/dist/routing";
import axios from "axios";
import { createStore } from "solid-js/store";
import Default from "../assets/default.png"
import NavLogin from "./NavLogin";
import SearchModal from "./SearchModal";


type NavProps = {
    setLoginModalShow: Setter<Boolean>
    setCreateModalShow:Setter<Boolean>
    createModalShow: Accessor<Boolean>
 
}
const Navigation = (props:NavProps) => {
    const params = useParams()
    const pathName = useLocation().pathname
    const [isLogin, setLogin] = createSignal(false)
    const [usrDetails, setUsrDetails]= createStore({
      id: "",
      name: "",
      photo: ""
    })
    const [showSeachBar, setSearchBar]= createSignal(false)
    const instance = axios.create({
      withCredentials: true,
      
    });

    const [search, setSearch] = createSignal("")
    const [showSearchModal, setSearchModal] = createSignal(false)
  
    createEffect(()=> {
      instance.get("http://localhost:8000/api/users/me")
      .then((response)=> {
        setLogin(true)
        console.log(response)
        setUsrDetails({
          name: response.data.data.user.name,
          photo: response.data.data.user.photo,
          id: response.data.data.user.id
  
        })
      })
      .catch((err)=> {
        setLogin(false)
      } )
    },[])
    
    return(
        <div id='nav' class='flex flex-row w-full md:w-full px-5 md:justify-between h-16 md:h-20 bg-[#171717] md:py-4 md:px-16 md:gap-6 items-center justify-between' >
        <Link href="/" class="w-1/4">
        <div id='logo' class="font-bold text-[#ffffff]  text-2xl full" onClick={() => {
          
        }}  >insight.uz</div>
        </Link>
  
    <Show when={pathName != "/editor" && pathName != "/newVaccancy" && pathName !="/newEvent"}>
    <div id='centerForms' class='flex flex-row items-center gap-2 md:justify-between w-auto md:w-2/4 md:px-8' >
       <Show when={window.innerWidth<700}>
       <div class="md:hidden" onClick={()=> setSearchBar(!showSeachBar())}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity={showSeachBar()? "1":"0.55"}>
          <path d="M28 28L20.0001 20M22.6667 13.3333C22.6667 18.488 18.488 22.6667 13.3333 22.6667C8.17868 22.6667 4 18.488 4 13.3333C4 8.17868 8.17868 4 13.3333 4C18.488 4 22.6667 8.17868 22.6667 13.3333Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </svg>
        </div>
       </Show>
        <div id='searchBar' class={showSeachBar()  && window.innerWidth< 700 ? "absolute flex flex-row h-[5rem]  w-full justify-between bg-[#171717] items-center top-14 left-0   px-4   " : "hidden md:flex md:flex-row  justify-between bg-[#35373B] items-center  px-3 py-2 rounded-md"}>
          <input placeholder='Izlash'  class='bg-[#35373B] md:bg-transparent  md:w-[21.5rem] w-full rounded-[8px]   md:rounded-0 outline-none text-white md:p-0 p-3' onInput={(e) => {
            setSearch(e.target.value)
            console.log(search().length)
            if(search().length>0) {
              setSearchModal(true)
            } else {
              setSearchModal(false)
            }
          }}/>
          <div class="hidden md:inline-block">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.75">
          <path d="M28 28L20.0001 20M22.6667 13.3333C22.6667 18.488 18.488 22.6667 13.3333 22.6667C8.17868 22.6667 4 18.488 4 13.3333C4 8.17868 8.17868 4 13.3333 4C18.488 4 22.6667 8.17868 22.6667 13.3333Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </svg>
          </div>
  
        </div>
       <Show when={showSearchModal()}>
       <div class="absolute max-sm:mt-[20rem] max-sm:left-[20px] md:mt-[8rem] max-sm:pr-9 w-full md:w-[24.5rem]">
          <SearchModal searchQuery={search()} />
        </div>
       </Show>

     

        <div class="flex flex-col">
        <div id='createPost' onClick={()=> {
          props.setCreateModalShow(!props.createModalShow())
          console.log(props.createModalShow())}
        } class="flex flex-row md:w-[8rem] items-center justify-center gap-2 bg-[#35373B] py-2 px-2  md:px-3 md:py-2 rounded-md">
       
  
       <p class={"hidden md:inline-block text-white opacity-75 font-normal select-none cursor-pointer"}>Yaratish</p>
      <div class="md:hidden">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-opacity={0.75} stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      </div>
      <div class="hidden md:inline-block">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="white" stroke-opacity={0.75} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>
      </div>

      </div>
      <Show when={props.createModalShow() == true} >
      <CreateModal setLoginModalShow={props.setLoginModalShow} setCreateModalShow={props.setCreateModalShow} isLoggedIn={isLogin} userID={usrDetails.id}/>
      </Show>
        </div>
        </div>

    </Show>
  
     {/* <Show when={isLogin() ==false}>
     <div id='user' class='flex flex-row gap-1 items-center w-1/4 justify-end text-white select-none cursor-pointer' onClick={()=> props.setLoginModalShow(true)}>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 20C11.7733 20 8.01442 22.0408 5.62135 25.208C5.1063 25.8896 4.84877 26.2304 4.85719 26.691C4.8637 27.0469 5.08717 27.4959 5.36718 27.7156C5.72961 28 6.23185 28 7.23633 28H24.7637C25.7682 28 26.2704 28 26.6329 27.7156C26.9129 27.4959 27.1363 27.0469 27.1429 26.691C27.1513 26.2304 26.8938 25.8896 26.3787 25.208C23.9856 22.0408 20.2268 20 16 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>Login</p>
  
      </div>
     </Show> */}

    
    <div class="hidden md:w-1/4 md:flex md:flex-row md:justify-end ">
    <Show when={isLogin() == true} fallback={<NavLogin setLoginModalShow={props.setLoginModalShow}/>} >
        <Link href="/profile" class='flex flex-row gap-2 items-center w-full md:justify-end text-white select-none cursor-pointer ' >
        <div id='user' class="flex flex-row gap-2 items-center  " onClick={()=> props.setLoginModalShow(true)}>
        <div class="w-[2.5rem] h-[2.5rem] rounded-[0.4rem] overflow-clip">
        <img class="w-full h-full" src={usrDetails.photo == "" ? Default : Default}/>
        </div>
      <p>{usrDetails.name}</p>
  
      </div>
        </Link>
     </Show>
    </div>
 
  
      </div>
    
      
    )
}

export default Navigation
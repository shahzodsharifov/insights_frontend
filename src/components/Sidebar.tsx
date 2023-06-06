import { Accessor, Component, Setter, Show, createEffect, createSignal } from "solid-js";
import {useParams, useSearchParams, Link, useLocation} from "@solidjs/router"
import NavLogin from "./NavLogin";
import Default from "../assets/default.png"
import axios from "axios";
import { createStore } from "solid-js/store";

type SidebarProps = {
    setLoginModalShow: Setter<Boolean>
}


const Sidebar= (props:SidebarProps) => {
    const params = useParams()
    const locaction = useLocation()
    const pathName = useLocation().pathname
    const [isLogin, setLogin] = createSignal(false)
    const [usrDetails, setUsrDetails]= createStore({
        id: "",
        name: "",
        photo: ""
      })
    const instance = axios.create({
        withCredentials: true
    })


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

    return (
        <div id="list" class="bg-[#262626] md:bg-transparent w-full flex flex-row md:flex-col  justify-between md:gap-0 py-2 px-5 md:pr-4 md:px-0">
        <Link href="/">
        <div id="1" class={pathName == "/" ? "md:flex md:flex-row md:gap-2 md:rounded-[0.5rem] max-sm:bg-transparent bg-[#35373B] py-2 px-2" : "md:flex md:flex-row md:gap-2 px-2 py-2 md:opacity-100 opacity-50"} onClick={()=> {
                console.log("cliekc")
                 
            }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6244 2.33325H9.90961C9.70022 2.33325 9.59552 2.33325 9.50309 2.36513C9.42135 2.39333 9.3469 2.43934 9.28513 2.49984C9.21528 2.56826 9.16846 2.6619 9.07481 2.84919L4.17481 12.6492C3.95119 13.0964 3.83937 13.3201 3.86623 13.5018C3.88968 13.6606 3.97748 13.8026 4.10897 13.8946C4.25955 13.9999 4.50957 13.9999 5.00961 13.9999H12.2494L8.74945 25.6666L22.9747 10.9144C23.4547 10.4167 23.6946 10.1679 23.7087 9.95495C23.7208 9.77012 23.6445 9.59048 23.503 9.47096C23.34 9.33325 22.9943 9.33325 22.3029 9.33325H13.9994L16.6244 2.33325Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p  class="hidden md:inline-block text-white text-xl">Mashhur</p>

            </div>


        </Link>
          <Link href="/companies">
          <div id="2"  class={pathName == "/companies" ? "md:flex md:flex-row md:gap-2 md:rounded-[0.5rem] max-sm:bg-transparent bg-[#35373B] py-2 px-2" : "md:flex md:flex-row md:gap-2 px-2 py-2 md:opacity-100 opacity-50"}onClick={()=>{
                console.log("clicked again")
              
            } }>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8333 12.8333H7.23331C5.92652 12.8333 5.27313 12.8333 4.774 13.0877C4.33496 13.3114 3.978 13.6683 3.7543 14.1074C3.49998 14.6065 3.49998 15.2599 3.49998 16.5667V24.5M24.5 24.5V7.23333C24.5 5.92654 24.5 5.27315 24.2457 4.77402C24.022 4.33498 23.665 3.97802 23.226 3.75432C22.7268 3.5 22.0734 3.5 20.7666 3.5H16.5666C15.2599 3.5 14.6065 3.5 14.1073 3.75432C13.6683 3.97802 13.3113 4.33498 13.0876 4.77402C12.8333 5.27315 12.8333 5.92654 12.8333 7.23333V24.5M25.6666 24.5H2.33331M16.9166 8.16667H20.4166M16.9166 12.8333H20.4166M16.9166 17.5H20.4166" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

                <p class="hidden md:inline-block text-white text-xl">Kompaniyalar</p>

            </div>
          </Link>

            <Link href="/vaccancies">
            <div id="3"  class={pathName == "/vaccancies" ? "md:flex md:flex-row md:gap-2 md:rounded-[0.5rem] max-sm:bg-transparent bg-[#35373B] py-2 px-2" : "md:flex md:flex-row md:gap-2 px-2 py-2 md:opacity-100 opacity-50"}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.6666 8.16667C18.6666 7.0817 18.6666 6.53922 18.5474 6.09413C18.2238 4.88631 17.2803 3.94289 16.0725 3.61926C15.6274 3.5 15.0849 3.5 14 3.5C12.915 3.5 12.3725 3.5 11.9274 3.61926C10.7196 3.94289 9.77621 4.88631 9.45257 6.09413C9.33331 6.53922 9.33331 7.0817 9.33331 8.16667M6.06665 24.5H21.9333C23.2401 24.5 23.8935 24.5 24.3926 24.2457C24.8317 24.022 25.1886 23.665 25.4123 23.226C25.6666 22.7269 25.6666 22.0735 25.6666 20.7667V11.9C25.6666 10.5932 25.6666 9.93982 25.4123 9.44069C25.1886 9.00164 24.8317 8.64469 24.3926 8.42098C23.8935 8.16667 23.2401 8.16667 21.9333 8.16667H6.06665C4.75986 8.16667 4.10646 8.16667 3.60734 8.42098C3.16829 8.64469 2.81134 9.00164 2.58763 9.44069C2.33331 9.93982 2.33331 10.5932 2.33331 11.9V20.7667C2.33331 22.0735 2.33331 22.7269 2.58763 23.226C2.81134 23.665 3.16829 24.022 3.60734 24.2457C4.10646 24.5 4.75986 24.5 6.06665 24.5Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

                <p  class="hidden md:inline-block text-white text-xl">Vakansiyalar</p>

            </div>
            </Link>

            <Link href="/events">
            <div id="4"  class={pathName == "/events" ? "md:flex md:flex-row md:gap-2 md:rounded-[0.5rem] max-sm:bg-transparent bg-[#35373B] py-2 px-2" : "md:flex md:flex-row md:gap-2 px-2 py-2 md:opacity-100 opacity-50"}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5 11.6666H3.5M18.6667 2.33325V6.99992M9.33333 2.33325V6.99992M10.5 18.6666L12.8333 20.9999L18.0833 15.7499M9.1 25.6666H18.9C20.8602 25.6666 21.8403 25.6666 22.589 25.2851C23.2475 24.9496 23.783 24.4141 24.1185 23.7556C24.5 23.0069 24.5 22.0268 24.5 20.0666V10.2666C24.5 8.3064 24.5 7.32631 24.1185 6.57762C23.783 5.91905 23.2475 5.38362 22.589 5.04806C21.8403 4.66659 20.8602 4.66659 18.9 4.66659H9.1C7.13982 4.66659 6.15972 4.66659 5.41103 5.04806C4.75247 5.38362 4.21703 5.91905 3.88148 6.57762C3.5 7.32631 3.5 8.3064 3.5 10.2666V20.0666C3.5 22.0268 3.5 23.0069 3.88148 23.7556C4.21703 24.4141 4.75247 24.9496 5.41103 25.2851C6.15972 25.6666 7.13982 25.6666 9.1 25.6666Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
                <p  class="hidden md:inline-block text-white text-xl">Tadbirlar</p>

            </div>

            </Link>

            <div class={pathName == "/profile" ? "md:hidden md:flex-row md:gap-2 md:rounded-[0.5rem] max-sm:bg-transparent bg-[#35373B] " : "md:hidden md:gap-2  md:opacity-100 opacity-50"}>
            <Show when={isLogin() == true} fallback={<NavLogin setLoginModalShow={props.setLoginModalShow}/>} >
        <Link href="/profile" class='flex flex-row gap-2 items-center md:w-1/4 max-sm:w-[44px] max-sm:h-[44px]   justify-center text-white select-none cursor-pointer ' >
        <div id='user' class="flex flex-row gap-2 justify-center items-center" onClick={()=> props.setLoginModalShow(true)}>
        <div class="w-[28px] h-[28px] max-sm:flex max-sm:flex-row max-sm:items-center  justify-center rounded-[50%] overflow-clip">
        <img class="w-full h-full" src={Default}/>
        </div>
      <p class="hidden md:inline-block">Hello my friend</p>
  
      </div>
        </Link>
     </Show>
            </div>
            
            <div id="secondList" class="hidden mt-20 md:flex md:flex-col gap-0">
            <Link href="/programming">
            
            <div id="1" class={pathName == "/programming" && window.innerWidth > 700?"flex flex-row gap-2 text-xl px-2 rounded-[0.5rem] bg-[#35373B] py-2" :"flex flex-row gap-2 text-xl px-2 py-2"}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.6666 10.5H2.33331M16.3333 20.4167L19.25 17.5L16.3333 14.5833M11.6666 14.5833L8.74998 17.5L11.6666 20.4167M2.33331 9.1L2.33331 18.9C2.33331 20.8602 2.33331 21.8403 2.71479 22.589C3.05035 23.2475 3.58578 23.783 4.24435 24.1185C4.99304 24.5 5.97313 24.5 7.93331 24.5H20.0666C22.0268 24.5 23.0069 24.5 23.7556 24.1185C24.4142 23.783 24.9496 23.2475 25.2852 22.589C25.6666 21.8403 25.6666 20.8602 25.6666 18.9V9.1C25.6666 7.13982 25.6666 6.15973 25.2852 5.41103C24.9496 4.75247 24.4142 4.21704 23.7556 3.88148C23.0069 3.5 22.0268 3.5 20.0666 3.5L7.93331 3.5C5.97313 3.5 4.99304 3.5 4.24435 3.88148C3.58578 4.21703 3.05035 4.75247 2.71479 5.41103C2.33331 6.15972 2.33331 7.13982 2.33331 9.1Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

                <p  class="hidden md:inline-block text-white text-xl ">Dasturlash</p>

            </div>
            </Link>

            <div id="2" class={pathName == "/design" && window.innerWidth > 700?"flex flex-row gap-2 text-xl px-2 rounded-[0.5rem] bg-[#35373B] py-2" :"flex flex-row gap-2 text-xl px-2 py-2"}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.1666 7.00007L7.58544 8.51631C7.16194 8.60101 6.95019 8.64336 6.77776 8.74634C6.62531 8.83738 6.49566 8.96202 6.39867 9.11075C6.28897 9.27899 6.2383 9.48891 6.13697 9.90873L2.33331 25.6667M2.33331 25.6667L18.0913 21.8631C18.5111 21.7617 18.7211 21.7111 18.8893 21.6014C19.038 21.5044 19.1627 21.3747 19.2537 21.2223C19.3567 21.0499 19.399 20.8381 19.4837 20.4146L21 12.8334M2.33331 25.6667L11.1836 16.8164M24.3467 9.18014L18.8199 3.65333C18.3579 3.19131 18.1269 2.9603 17.8605 2.87375C17.6262 2.79762 17.3738 2.79762 17.1395 2.87375C16.8731 2.9603 16.6421 3.19131 16.18 3.65333L15.3199 4.51347C14.8579 4.97549 14.6269 5.2065 14.5403 5.47288C14.4642 5.7072 14.4642 5.9596 14.5403 6.19392C14.6269 6.4603 14.8579 6.69131 15.3199 7.15333L20.8467 12.6801C21.3087 13.1422 21.5397 13.3732 21.8061 13.4597C22.0404 13.5359 22.2928 13.5359 22.5272 13.4597C22.7935 13.3732 23.0246 13.1422 23.4866 12.6801L24.3467 11.82C24.8087 11.358 25.0397 11.127 25.1263 10.8606C25.2024 10.6263 25.2024 10.3739 25.1263 10.1395C25.0397 9.87316 24.8087 9.64215 24.3467 9.18014ZM12.8333 12.8334C14.122 12.8334 15.1666 13.8781 15.1666 15.1667C15.1666 16.4554 14.122 17.5001 12.8333 17.5001C11.5446 17.5001 10.5 16.4554 10.5 15.1667C10.5 13.8781 11.5446 12.8334 12.8333 12.8334Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

                <p  class="hidden md:inline-block text-white text-xl ">Dizayn</p>

            </div>

            <div id="3" class={pathName == "/marketing" && window.innerWidth > 700?"flex flex-row gap-2 text-xl px-2 rounded-[0.5rem] bg-[#35373B] py-2" :"flex flex-row gap-2 text-xl px-2 py-2"}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 19.8333L4.66665 25.6666M17.5 19.8333L23.3333 25.6666M14 2.33325V4.66659M14 25.6666V19.8333M6.06665 19.8333H21.9333C23.2401 19.8333 23.8935 19.8333 24.3926 19.5789C24.8317 19.3552 25.1886 18.9983 25.4123 18.5592C25.6666 18.0601 25.6666 17.4067 25.6666 16.0999V8.39992C25.6666 7.09313 25.6666 6.43973 25.4123 5.94061C25.1886 5.50156 24.8317 5.14461 24.3926 4.9209C23.8935 4.66659 23.2401 4.66659 21.9333 4.66659H6.06665C4.75986 4.66659 4.10646 4.66659 3.60734 4.9209C3.16829 5.14461 2.81134 5.50156 2.58763 5.94061C2.33331 6.43973 2.33331 7.09313 2.33331 8.39992V16.0999C2.33331 17.4067 2.33331 18.0601 2.58763 18.5592C2.81134 18.9983 3.16829 19.3552 3.60734 19.5789C4.10646 19.8333 4.75986 19.8333 6.06665 19.8333Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

                <p  class="hidden md:inline-block text-white text-xl ">Marketing</p>

            </div>
            </div>
        </div>
    )
}

export default Sidebar
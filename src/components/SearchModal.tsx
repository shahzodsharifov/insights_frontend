import { For, createEffect, createSignal } from "solid-js"
import Logo from "../assets/logogo.png"
import axios from "axios"
import { Link, useLocation, useNavigate } from "@solidjs/router"

type SearchModalTypes = {
    searchQuery: string
}

export type User = {
    ID: string,
    Photo: string,
    Name: string,
    Username: string,
    Email: string,
    Role: string,
    followers: [],
    following: [],
    posts: [],
    events: [],
    vaccancies: [],

}

const SearchModal = (props:SearchModalTypes) => {
    const instance = axios.create({
        withCredentials: true,
    })

    const nav = useNavigate()
    const loc = useLocation()
    const [theUsers, setTheUsers] = createSignal<Array<User>>([])
    createEffect(()=>{
        instance.get(`https://13.49.228.160:443/api/users/search/${props.searchQuery}`).then((users)=> {
            console.log(users.data.data.users)
            setTheUsers(users.data.data.users)
        })
    },)
    return (
        <div class=" w-full flex flex-col gap-4 bg-[#35373B] rounded-[8px] p-4">
            <div id="people" class="flex flex-col" >
              <For each={theUsers()}>{(user, i)=> 
              
       
             <Link href={`/users/${user.ID}`}>
              <div class="flex flex-row gap-1 items-center align-baseline" >
                  <div class="w-[40px] h-[40px] overflow-clip rounded-[32px] ">
                <img src={Logo} class="object-contain"  />
                </div>
                <p class="text-white">{user.Name}</p>
              
              </div>
             </Link>
          
              }</For>
            </div>
            <div id="posts">
                <p class="text-white">Just text here</p>
            </div>
        </div>
    )
}

export default SearchModal
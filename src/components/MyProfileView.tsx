import { Accessor, Component, Setter, Show, createEffect } from "solid-js";
import Logo from "../assets/logogo.png"
import Default from "../assets/default.png"
import { useLocation } from "@solidjs/router";
import axios from "axios";
import { UserRelationship } from "../pages/OtherProfile";
type MyProfileViewProps = {
    photo: string
    name: string
    bio: string
    username: string
    postsLengh: number,
    followersLength: number,
    followingLength: number,
    isFollowing: boolean,
    followerID: string,
    followingID: string,
    setFollowing: Setter<UserRelationship[]>,
    setUFollowers: Setter<UserRelationship[]>,
    following: Accessor<UserRelationship[]>
    areYouFollowing: Setter<boolean>



}

const instance = axios.create({
    withCredentials: true,
    
  });


//   createEffect(()=> {
//     instance.get()
//   },[])

const MyProfileView = (props:MyProfileViewProps)=> {
    const path = useLocation()
    return (
        <div id="profile" class="flex flex-col w-full rounded-[1rem] bg-[#171717] border-[1px] border-solid border-white/[0.15]">
        <div id="textInfo" class="px-6 py-6 flex flex-row gap-8">
        <div id="thumbnail" class="w-[8rem] md:h-[8rem] max-sm:h-[6rem]  overflow-clip rounded-[1rem]  ">
                <img src={props.photo == "default.png" ? Default : Default}/>

            </div>

            <div id="headline" class="md:mt-4 max-sm:mt-2">
                <h1 class="text-white md:text-[2rem] max-sm:text-[1.6rem] font-bold leading-8 ">{props.name}</h1>
                <p class="text-white text-[1.2rem] max-sm:text-[1rem] md:mt-2 max-sm:mt-0 opacity-60">{props.username}</p>
            </div>

           
        </div>
        <div class="bg-red px-6">
        </div>
       <p id="subtext" class=" float-right text-white opacity-75 mt-2 font-thin px-6 " >{props.bio}</p>
            <div id="stats" class="w-full flex flex-row px-6 py-6 max-sm:justify-center md:gap-12 max-sm:gap-4">
                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{props.postsLengh} Maqolalar</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{props.followersLength} Obunachilar</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{props.followingLength} Obunalar</p>
                </div>
            </div>
        </div>


    )
}

export default MyProfileView
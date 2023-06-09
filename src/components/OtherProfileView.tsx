import { Accessor, Component, Setter, Show, createEffect, createSignal } from "solid-js";
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
    areYouFollowing: Setter<boolean>
    followerID: string,
    followingID: string,



}

const instance = axios.create({
    withCredentials: true,
    
  });


//   createEffect(()=> {
//     instance.get()
//   },[])

const OtherProfileView = (props:MyProfileViewProps)=> {



    const path = useLocation()

    const [isFollowing, setIsFollowing] = createSignal(false)
    const [otherFollowers, setOtherFollowers] = createSignal<Array<UserRelationship>>([])
    const [otherFollowing, setOtherFollowing] = createSignal<Array<UserRelationship>>([])

    createEffect(()=>{
        instance.get(`https://13.49.228.160:443/api/users/${props.followingID}/following`).then((res)=> {
            console.log("this is", res.data)
            setOtherFollowing(res.data)
    
          })

          instance.get(`https://13.49.228.160:443/api/users/${props.followingID}/followers`).then((res)=> {
            console.log("this is", res.data)
            setOtherFollowers(res.data)
    
          })

          instance.get(`https://13.49.228.160:443/api/users/${props.followerID}/following`).then((res)=> {
            console.log("this is", res.data)
            setOtherFollowing(res.data)
            res.data.map((rel:UserRelationship)=> {
              console.log(rel.FollowerID)
              if(props.followingID == rel.FollowingID) {
                setIsFollowing(true)
              }
            })
          })
    },[])
    return (
        <div id="profile" class="flex flex-col w-full rounded-[1rem] bg-[#171717]">
        <div id="textInfo" class="px-6 py-6 flex flex-row gap-8">
        <div id="thumbnail" class="w-[8rem] h-[8rem] overflow-clip rounded-[1rem]  ">
                <img src={props.photo == "default.png" ? Default : Default}/>

            </div>

            <div id="headline" class="mt-4">
                <h1 class="text-white text-[2rem] font-bold leading-8 text">{props.name}</h1>
                <p class="text-white text-[1.2rem] mt-2 opacity-60">{props.username}</p>
            </div>

           
        </div>
        <div class="bg-red px-6">

        <Show when={isFollowing()} fallback={
              <button class="bg-white rounded-[4px]  w-[8rem] text-center h-[2.5rem]" onClick={()=> {
                
                instance.post(`https://13.49.228.160:443/api/users/263945d0-453c/following`, {
                    followerID: props.followerID,
                    followingID: props.followingID
                }).then((response)=>{
                    instance.get(`https://13.49.228.160:443/api/users/${props.followingID}/followers`).then((res)=> {
                        setOtherFollowers(res.data)
                        console.log(res.data, "these are the followers")
                     
                      })
                    console.log(response.data)
                    instance.get(`https://13.49.228.160:443/api/users/${props.followerID}/following`).then((res)=> {
                    
                    res.data.map((rel:UserRelationship)=> {
                      console.log(rel.FollowerID)
                      if(props.followingID == rel.FollowingID) {
                        setIsFollowing(true)
                      }
                    })
                  })
                    
                })

              
              }}>Obuna Bo'lish</button>
     
        }>
            <button class="bg-white rounded-[4px]  w-[10rem] text-center h-[2.5rem]" onClick={()=> {

                instance.post(`https://13.49.228.160:443/api/users/263945d0-453c/unfollow`, {
                    followerID: props.followerID,
                    followingID: props.followingID
                }).then((response)=>{
                    console.log(response.data)
                    // setIsFollowing(false)
                    instance.get(`https://13.49.228.160:443/api/users/${props.followingID}/followers`).then((res)=> {
                        setOtherFollowers(res.data)
                        console.log(res.data,"done deal")
                     
                      })

                    instance.get(`https://13.49.228.160:443/api/users/${props.followerID}/following`).then((res)=> {
                        console.log(res.data)

                        if(res.data.length > 0) {
                            res.data.map((rel:UserRelationship)=> {
                                console.log(rel.FollowerID)
                                if(props.followingID == rel.FollowingID) {
                                  setIsFollowing(true)
                                }
                              })
                        } else {
                            setIsFollowing(false)
                        }
                      })
                  
                })

           


            }}>Obunani Bekor Qilish</button>
     
            </Show>    
        </div>
       <p id="subtext" class=" float-right text-white opacity-75 mt-2 font-thin px-6 " >{props.bio}</p>
            <div id="stats" class="w-full flex flex-row px-6 py-6 gap-12">
                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{1} Maqolalar</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{otherFollowers().length} Obunachilar</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <p class="text-white opacity-75">{otherFollowing().length} Obunalar</p>
                </div>
            </div>
        </div>


    )
}

export default OtherProfileView
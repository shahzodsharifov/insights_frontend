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
import { type } from "os";
import OtherProfileView from "../components/OtherProfileView";

export type UserRelationship = {
  FollowerID: string,
  FollowingID: string
}
export type PostType = {
  ID: string,
  Thumbnail: string,
  author_id: string,
  body: string,
  category: string,
  comments: [],
  headline: string,
  subtitle: string
}

const OtherProfile =()=> {

  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
  const [me, setMe] = createSignal("")
  const [areYouFollowing, setAreYouFollowing] = createSignal(false)
  const [following, setFollowing] = createSignal<Array<UserRelationship>>([])
  const [uFollowers, setUFollowers] = createSignal<Array<UserRelationship>>([])
  const [uFollowing, setUFollowing] = createSignal<Array<UserRelationship>>([])
  const[hasLoaded, setLoaded] = createSignal(false)
  const [posts, setPosts] = createSignal<Array<PostType>>([])
  const [user, setUserData] = createStore({
    id: "",
    name: "",
    username: "",
    bio: "",
    email:"",
    photo: "",
    followers: [],
    following: [],
    posts: [],
  })
  const instance = axios.create({
    withCredentials: true,
    
  });


    







  

  const location = useLocation()
  console.log(location.pathname)
  var path = location.pathname.split("/")

  
  createEffect(() => {

    
    instance.get(`https://13.49.228.160:443/api/users/${path[2]}`).then((theUser)=> {
        setUserData({
            id: theUser.data.data.user.ID,
            name: theUser.data.data.user.Name,
            username: theUser.data.data.user.Username,
            photo: theUser.data.data.user.Photo,
            bio: theUser.data.data.user.Bio,
            email: theUser.data.data.user.Email,


            
        })

        instance.get(`https://13.49.228.160:443/api/users/${theUser.data.data.user.ID}/posts`).then((thePosts)=> {
            setPosts(thePosts.data)
        })
    })

    instance.get("https://13.49.228.160:443/api/users/me",).then((theMe)=> {
      console.log(theMe.data.data.user.id)
      setMe(theMe.data.data.user.id)

      instance.get(`https://13.49.228.160:443/api/users/${me()}/following`).then((res)=> {
        setFollowing(res.data)
        following().map((rel:UserRelationship)=> {
          console.log(rel.FollowerID)
          if(path[2] == rel.FollowingID) {
            setAreYouFollowing(true)
          }
        })
      })



    })

    instance.get(`https://13.49.228.160:443/api/users/${path[2]}/following`).then((res)=> {
      setUFollowing(res.data)
   
    })

    instance.get(`https://13.49.228.160:443/api/users/${path[2]}/followers`).then((res)=> {
      setUFollowers(res.data)
   
    })

    



  },[])


  console.log(posts())

  
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
  <div id='contents'class='w-full min-h-[100vh] bg-[#0C0C0C] flex flex-col md:flex-row md:px-8 md:py-6 md:gap-6 md:justify-center' >
  
  <div id='sidebar'  class=' md:w-1/5 z-10 w-full fixed max-sm:bottom-0  md:left-14'>
  <Sidebar setLoginModalShow={setLoginModalShow}/>
  </div>
  
  <div id="companiesBody" class='md:w-2/4 flex flex-col gap-6 md:py-0 py-4 px-5 md:px-14 '>
     
  <OtherProfileView name={user.name} username={user.username} photo={user.photo} areYouFollowing={setAreYouFollowing} followerID={me()} followingID={path[2]} bio={user.bio}  />
  <div class="flex flex-col gap-6">
   <For each={posts()}>{(post, i )=> 

    <Post postID={post.ID} headline={post.headline} authorId={post.author_id} subheadline={post.subtitle} Thumbnail={post.Thumbnail}/>
   }

   </For>
 
  
  
  </div>    
  </div>
  
  <div class={`sm:hidden md:w-1/4 md:h-[40rem] md:flex md:flex-col  md:absolute md:right-16 md:pl-4`} >
  <div class=''>
  <Vacancies/>
  </div>
  </div>
  
  </div>
  </div>
  
  </>
  
  

  )


  
  }
  //   else {
  //   <h1>Loading</h1>
  //  }


export default OtherProfile
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
import { UserRelationship } from "./OtherProfile";


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

const Profile:Component =()=> {

  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
  const[hasLoaded, setLoaded] = createSignal(false)
  const [areYouFollowing, setAreYouFollowing] = createSignal(false)
  const [rels, setRelationship] = createSignal<Array<UserRelationship>>([])
  const [myFollowers, setMyFollowers] = createSignal<Array<UserRelationship>>([])
  const [myFollowings, setMyFollowings] = createSignal<Array<UserRelationship>>([])
  const [posts, setPosts] = createSignal<Array<PostType>>([])
  const [user, setUserData] = createStore({
    id: "",
    name: "",
    username: "",
    bio: "",
    photo: "",
    followers: [],
    following: [],
    posts: [],
  })
  const instance = axios.create({
    withCredentials: true,
    
  });


    






  const fetchUser = async () => {

      const res = await fetch("https://13.49.228.160:80/api/users/me", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });


      // const data = await res.json();
      // console.log(data);
    
      return await res.json()
    
  }

  fetchUser()
  
  const [getUser] = createResource(fetchUser, {
    deferStream: true,
    
  })


   console.log(getUser.state)
   var userPosts:any = []
  createEffect(() => {
    if (getUser()) {
      var theUsr = getUser().data.user
      console.log(getUser().data.user)

     
  
      instance.get(`https://13.49.228.160:80/api/users/${theUsr.id}/posts`).then((thePosts) => {
        console.log(thePosts.data)
        thePosts.data.map((e:PostType)=> {
          setPosts([...posts(), e])
        })



       
      })
      setUserData({
        id: theUsr.id,
        name: theUsr.name ,
        username: theUsr.username,
        bio: theUsr.bio,
        photo: theUsr.photo,
      })

      
      instance.get(`https://13.49.228.160:80/api/users/${user.id}/followers`).then((res)=> {
        setMyFollowers(res.data)
        console.log(res.data,"done deal")
     
      })

      instance.get(`https://13.49.228.160:80/api/users/${user.id}/following`).then((res)=> {
        setMyFollowings(res.data)
        console.log(res.data,"done deal")
     
      })
      setLoaded(true)
    
      
    }
  },[])


  //  if (getUser.state === "pending") {
  //   return <h1>Loading</h1>;
  // }
  console.log(posts())
  if (getUser.state === "errored") {
    return <h1>Error</h1>;
  }

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
  <div id='contents' class='w-full min-h-[100vh] bg-[#0C0C0C] flex flex-col md:flex-row md:px-8 md:py-6 md:gap-6 md:justify-center'  >
  
  <div id='sidebar'  class=' md:w-1/5 z-10 w-full fixed max-sm:bottom-0  md:left-14'>
  <Sidebar setLoginModalShow={setLoginModalShow}/>
  </div>
  
  <div id="companiesBody"  class='md:w-2/4 flex flex-col gap-6 md:py-0 py-4 px-5 md:px-14 '>
     
  <MyProfileView name={user.name} username={user.username} photo={user.photo} bio={user.bio} followersLength={myFollowers().length} followingLength={myFollowings().length} postsLengh={user.posts.length} isFollowing={false} followerID="" followingID="" setFollowing={setRelationship} areYouFollowing={setAreYouFollowing} following={rels} setUFollowers={setAreYouFollowing}/>
  <div class="flex flex-col gap-6">
   <For each={posts()}>{(post, i )=> 

    <Post postID={post.ID} headline={post.headline} authorId={post.author_id} subheadline={post.subtitle} Thumbnail={post.Thumbnail}/>
   }

   </For>
 
  
  
  </div>    
  </div>
  
  <div class={`sm:hidden md:w-1/4 md:h-[40rem] md:flex md:flex-col  md:absolute md:right-16 md:pl-4`}  >
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


export default Profile
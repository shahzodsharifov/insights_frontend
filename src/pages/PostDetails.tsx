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
import CommentView from "../components/CommentView";

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
export type LikeType = {
  post_id: string,
  user_id: string,
}
export type CommentType = {
  ID: string,
  Body: string,
  author_id: string,
  CreatedAt: string,
  post_id: string
}

const PostDetails =()=> {
  const location = useLocation()
  console.log(location.pathname)
  var path = location.pathname.split("/")
  
  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
  const[hasLoaded, setLoaded] = createSignal(false)
  const [post, setPostData] = createStore({
    ID: "",
    Thumbnail: "",
    headline: "",
    subtitle: "",
    body: "",
    author_id: "",
    date: "",
    likes: [],
    
  })
  const [usrName, setUsrName] = createSignal("")
  const [usrPhoto, setUsrPhoto] = createSignal("")
  const[me, setMe] = createSignal("")
  const [postLikes, setPostLikes] = createSignal<Array<LikeType>>([])
  const [didILike, setDidILike] = createSignal(false)
  const [myComment, setMyComment] = createSignal("")
  const [postComments, setPostComments] = createSignal<Array<CommentType>>([])
  const [stopPost, setStopPost] = createSignal(false)
  const instance = axios.create({
    withCredentials: true,
    
  });


    







  



   
  createEffect(() => {
   
    instance.get(`https://insightsbackend.onrender.com/api/posts/${path[2]}`).then((thePost) => {
    
        console.log(thePost.data.data.post)
      
        setPostData(thePost.data.data.post)

        instance.get(`https://insightsbackend.onrender.com/api/users/${thePost.data.data.post.author_id}`).then((user)=> {
          console.log(user.data.data.user)
          setUsrName(user.data.data.user.Name)
          setUsrPhoto(user.data.data.user.Photo)
      })

      }
        
        
        )

     instance.get(`https://insightsbackend.onrender.com/api/posts/${path[2]}/comments`)
     .then((theComments) => {
      console.log(theComments.data)
      theComments.data.map((theComment:CommentType)=> {
          console.log(theComment)
          setPostComments([...postComments(), theComment])
      })
     })   

     instance.get(`https://insightsbackend.onrender.com/api/posts/${path[2]}/likes`).then((theLikes)=> {
      console.log(theLikes.data)
      setPostLikes(theLikes.data)
      for(let i=0; i<postLikes().length; i++) {
        console.log(postLikes()[i])
        if(postLikes()[i].user_id == me()) {
          setDidILike(true)
        }
      }
     })

     instance.get("https://insightsbackend.onrender.com/api/users/me").then((theMe) => {
      setMe(theMe.data.data.user.id)

     } )
     
  },[])
    
  console.log(postComments())
  console.log(didILike())
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
  <div id='contents' class='w-full min-h-[100vh] bg-[#0C0C0C] flex flex-col md:flex-row md:px-8 md:py-6 md:gap-6 md:justify-center' >
  
  <div id='sidebar'   class=' md:w-1/5 z-10 w-full fixed max-sm:bottom-0  md:left-14'>
  <Sidebar setLoginModalShow={setLoginModalShow}/>
  </div>
  
  <div id="postBody" class='md:w-2/4 flex flex-col gap-6 md:py-0 py-4 px-5 md:px-14 '>
  
    <div class="rounded-[1.2rem] bg-[#171717]  ">
    <div id="header" class="flex flex-row justify-between items-center px-[1rem] mt-2">
                <div class="flex flex-row gap-2 items-center" >
                    <div class="w-12 h-12 overflow-clip rounded-[10rem]">
                        <img src={Logo}/>
                    </div>
                    <p class="text-white opacity-75">{usrName()}</p>
                </div>
                <p id="date" class="text-white">25.04.23</p>
            </div>
    <div class="w-full h-[24rem] overflow-hidden mt-4">
        <img  src={`https://ucarecdn.com/${post.Thumbnail}/-/scale_crop/600x600/center/`}  width={600} height={600} class="object-contain"/>
    </div>

    <h1 class="text-white mt-4 text-[1.8rem] font-bold  px-[1rem]">{post.headline}</h1>
    <p class="text-white text-[1.2rem]  px-[1rem]" >{post.subtitle}</p>
    <p class="text-white text-[1.2rem] mt-4 px-[1rem]"> {post.body}</p>

    <div id="stats" class="w-full flex flex-row mt-4 gap-12 pl-4  mb-4">
                <div class="flex flex-row gap-1 items-center" >
               <Show when={didILike()} fallback={
                 <svg onClick={()=> {
                  console.log("clickedd")
                  setDidILike(true)
                  console.log(didILike())
                  instance.post(`https://insightsbackend.onrender.com/api/posts/${path[2]}/likePost`, {
                    post_id: path[2],
                    user_id: me()
                  }).then(()=> {
                    instance.get(`https://insightsbackend.onrender.com/api/posts/${path[2]}/likes`).then((theLikes)=> {
                      console.log(theLikes.data)
                      setPostLikes(theLikes.data)
                      for(let i=0; i<postLikes().length; i++) {
                        console.log(postLikes()[i])
                        if(postLikes()[i].user_id == me()) {
                          setDidILike(true)
                        }
                      }
                     })
                  })

                
                  
                 }} width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="https://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M13.992 5.99178C11.6594 3.2648 7.7697 2.53125 4.84714 5.02835C1.92458 7.52545 1.51312 11.7005 3.80823 14.6538C5.71645 17.1093 11.4914 22.2881 13.3841 23.9643C13.5959 24.1518 13.7017 24.2456 13.8252 24.2824C13.933 24.3146 14.051 24.3146 14.1588 24.2824C14.2823 24.2456 14.3881 24.1518 14.5999 23.9643C16.4926 22.2881 22.2676 17.1093 24.1758 14.6538C26.4709 11.7005 26.1097 7.49918 23.1369 5.02835C20.1641 2.55752 16.3246 3.2648 13.992 5.99178Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
               }>
                   <svg onClick={()=> {
                    console.log("clickedd", post.ID)
                    setDidILike(false)
                    console.log(didILike())
                    instance.post(`https://insightsbackend.onrender.com/api/posts/${path[2]}/unlikePost`, {
                      post_id: path[2],
                      user_id: me()
                    }).then(()=> {
                      instance.get(`https://insightsbackend.onrender.com/api/posts/${path[2]}/likes`).then((theLikes)=> {
                        console.log(theLikes.data)
                        setPostLikes(theLikes.data)
                        for(let i=0; i<postLikes().length; i++) {
                          console.log(postLikes()[i])
                          if(postLikes()[i].user_id == me()) {
                            setDidILike(true)
                          }
                        }
                       })
                    })

                   
                    
                   }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0776 5.13581C10.0783 2.7984 6.74422 2.16964 4.23917 4.31001C1.73412 6.45038 1.38144 10.029 3.34867 12.5604C4.98429 14.6651 9.93424 19.1041 11.5566 20.5408C11.7381 20.7016 11.8288 20.7819 11.9347 20.8135C12.0271 20.8411 12.1282 20.8411 12.2206 20.8135C12.3264 20.7819 12.4172 20.7016 12.5987 20.5408C14.221 19.1041 19.171 14.6651 20.8066 12.5604C22.7738 10.029 22.4642 6.42787 19.9161 4.31001C17.368 2.19216 14.077 2.7984 12.0776 5.13581Z" stroke="#FF4C4C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.58446 5.50003C4.38446 3.50003 6.58446 3.33336 7.58446 3.50003L12.5845 4.5L19.0845 3.50003L22.5845 9C22.0845 9.83333 20.4845 12.3 18.0845 15.5C15.6845 18.7 12.7511 20.1667 11.5845 20.5C9.9178 19.1667 5.98446 15.7 3.58446 12.5C0.584459 8.5 2.58446 8.00003 3.58446 5.50003Z" fill="#FF4C4C"/>
        </svg>



               </Show>
                <p class="text-white opacity-75">{postLikes().length}</p>
                </div>

                <div class="flex flex-row gap-1 items-center" >
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="https://www.w3.org/2000/svg">
                <path d="M9.3329 11.0833H13.9996M9.3329 15.1667H17.4996M14.5829 23.3333C20.0597 23.3333 24.4996 18.8935 24.4996 13.4167C24.4996 7.93984 20.0597 3.5 14.5829 3.5C9.10608 3.5 4.66623 7.93984 4.66623 13.4167C4.66623 14.525 4.84806 15.5909 5.1835 16.586C5.30973 16.9606 5.37285 17.1478 5.38423 17.2917C5.39548 17.4337 5.38698 17.5333 5.35183 17.6714C5.31624 17.8113 5.23766 17.9567 5.08051 18.2476L3.17224 21.7797C2.90005 22.2836 2.76395 22.5355 2.79441 22.7299C2.82094 22.8992 2.92061 23.0483 3.06694 23.1376C3.23494 23.2401 3.51975 23.2106 4.08937 23.1518L10.0639 22.5342C10.2448 22.5155 10.3353 22.5061 10.4177 22.5093C10.4988 22.5124 10.5561 22.52 10.6352 22.5382C10.7156 22.5568 10.8167 22.5957 11.0189 22.6736C12.125 23.0997 13.3267 23.3333 14.5829 23.3333Z" stroke="white" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-white opacity-75">{postComments().length}</p>
                </div>
            </div>

    </div>


    <div id="commenSection" class="bg-[#171717] rounded-[12px] p-[24px]">
      
      
      <h1 class="text-white text-[20px] font-bold">Izohlar</h1>
      <div class="w-full h-auto mt-2 bg-[#35373B] rounded-[8px] p-[12px] flex flex-col">
      <div role="textbox" contentEditable={true} class="text-white outline-none mt-2" onFocusOut={(e)=> {
          console.log(e.target.innerHTML)
         setMyComment(e.target.innerHTML)}
      } >
         Mening fikrim...
      </div>   
      <div>
      <button 
      onClick={()=> {
        setStopPost(true)
        setTimeout(()=> setStopPost(false), 3000)
        console.log(myComment())
        console.log(post.author_id)
        
        instance.get("https://insightsbackend.onrender.com/api/users/me").then((me) => {
          console.log(me.data.data.user)
          instance.post(`https://insightsbackend.onrender.com/api/posts/${path[2]}/createComment`,
          {
            body: myComment(),
            author_id: me.data.data.user.id
          }
          )
          .then((res)=> {
            console.log(res.data)
            instance.get(`https://insightsbackend.onrender.com/api/posts/${path[2]}/comments`)
            .then((theComments) => {
             console.log(theComments.data)
             theComments.data.map((theComment:CommentType)=> {
                 console.log(theComment)
                 setPostComments([...postComments(), theComment])
             })
            })
  
          })
        })

      }}
      class={stopPost()? "w-[6rem] h-[2rem mt-2 opacity-50 pointer-events-none select-none bg-white rounded-[8px] px-4 py-1 float-right":"w-[6rem] h-[2rem mt-2 bg-white rounded-[8px] px-4 py-1 float-right"}>Joylash</button>   
     
      </div>
      </div>

   <div class="mt-6 flex flex-col gap-6">
  <For each={postComments()}>
    {(comment, i) => 
      <CommentView ID={comment.ID} Body={comment.Body} author_id={comment.author_id} post_id={comment.post_id} CreatedAt={comment.CreatedAt}/>
    }
  </For>
   </div>

      </div>
  </div>

 
  
  <div class={`max-sm:hidden md:w-1/4 md:h-[40rem] md:flex md:flex-col  md:absolute md:right-16 md:pl-4`}  >
  <div class=''>
  <Vacancies/>
  </div>
  </div>
  
  </div>
  </div>
  
  </>
  
  

  )}


  




export default PostDetails
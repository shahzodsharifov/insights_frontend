import { Component, Show, createEffect, createSignal } from "solid-js";
import Logo from "../assets/logogo.png"
import axios from "axios";
import { CommentType, LikeType } from "../pages/PostDetails";
import { Link } from "@solidjs/router";

type PostProps = {
    postID: string,
    headline: string,
    subheadline: string,
    Thumbnail:string,
    authorId: string,
}

const Post= (props:PostProps)=> {
    console.log(props.authorId)

    const [usrName, setUsrName] = createSignal("")
    const [usrPhoto, setUsrPhoto] = createSignal("")
    const [didILike, setDidILike] = createSignal(false)
    const [postLikes, setPostLikes] = createSignal<Array<LikeType>>([])
    const [postComments, setPostComments] = createSignal<Array<CommentType>>([])
    const[me, setMe] = createSignal("")
    const instance = axios.create({
        withCredentials: true,
        
      });

    createEffect(()=>{
      instance.get("https://13.49.228.160443/api/users/me").then((theMe) => {
        console.log(theMe.data.data.user.id)
        setMe(theMe.data.data.user.id)


  
       }
        )

       
        instance.get(`https://13.49.228.160443/api/posts/${props.postID}/likes`).then((theLikes)=> {
          console.log(theLikes.data)
          setPostLikes(theLikes.data)
          for(let i=0; i<postLikes().length; i++) {
            console.log(postLikes()[i], me())
            if(postLikes()[i].user_id == me()) {
              console.log("you liked it bruh")
              setDidILike(true)
            }
          }
         })


        instance.get(`https://13.49.228.160443/api/posts/${props.postID}/comments`)
        .then((theComments) => {
         console.log(theComments.data)
          setPostComments(theComments.data)
        })   

        instance.get(`https://13.49.228.160443/api/users/${props.authorId}`).then((user)=> {
            console.log(user.data.data.user)
            setUsrName(user.data.data.user.Name)
            setUsrPhoto(user.data.data.user.Photo)
        })



    
            console.log(didILike(), "crap!")
    },[])

    return (
        <div id="post" class="flex flex-col w-full rounded-[1rem] bg-[#171717]">
            <Link href={`/posts/${props.postID}`}>
            <div id="textInfo" class="px-6 py-6">
        <div id="header" class="flex flex-row justify-between">
                <div class="flex flex-row gap-2 items-center" >
                    <div class="w-8 h-8 overflow-clip rounded-[10rem]">
                        <img src={Logo}/>
                    </div>
                    <p class="text-white opacity-75">{usrName()}</p>
                </div>
                <p id="date" class="text-white">25.04.23</p>
            </div>

            <div id="headline" class="mt-4">
                <h1 class="text-white text-[1.6rem] font-bold leading-8 text">{props.headline}</h1>
            </div>

            <p id="subtext" class="text-white opacity-75 mt-2 font-thin " >{props.subheadline}</p>
        </div>
            <div id="thumbnail" class="w-full md:h-[28rem]  overflow-hidden">
                <img src={`https://ucarecdn.com/${props.Thumbnail}/-/scale_crop/600x600/center/`} width={600} height={600} class="object-contain" alt="post thumbnail " />

            </div>
            </Link>
            <div id="stats" class="w-full md:h-full h-[4rem] h-auto flex flex-row px-6 py-6 gap-12">
                <div class="flex flex-row gap-1 items-center" >
                <Show when={didILike()} fallback={
                 <svg onClick={()=> {
                  console.log("clickedd")
                  setDidILike(true)
                  console.log(didILike())
                  instance.post(`https://13.49.228.160443/api/posts/${props.postID}/likePost`, {
                    post_id: props.postID,
                    user_id: me()
                  }).then(()=> {
                    instance.get(`https://13.49.228.160443/api/posts/${props.postID}/likes`).then((theLikes)=> {
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
                    console.log("clickedd", props.postID, "kl")
                    setDidILike(false)
                    console.log(didILike())
                    instance.post(`https://13.49.228.160443/api/posts/${props.postID}/unlikePost`, {
                      post_id: props.postID,
                      user_id: me(),
                    }).then(()=> {
                      instance.get(`https://13.49.228.160443/api/posts/${props.postID}/likes`).then((theLikes)=> {
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

                   
                    
                   }}width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
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
    )
}

export default Post
import { createEffect, createSignal } from "solid-js"
import Logo from "../assets/logogo.png"
import { CommentType } from "../pages/PostDetails"
import axios from "axios"
const CommentView = (props: CommentType) => {

    const [authorName, setAuthorName] = createSignal("")
    const [usrPhoto, setUsrPhoto] = createSignal("")


    const instance = axios.create({
        withCredentials: true
    })
    createEffect(() => {
        instance.get(`https://api.noted.today/api/users/${props.author_id}`).then((user)=> {
            console.log(user.data.data.user.Name)
            setAuthorName(user.data.data.user.Name)
            setUsrPhoto(user.data.data.user.Photo)
            console.log(authorName())
        })
    },[])
    console.log(authorName())
    return (
     <div>
           <div id="header" class="flex flex-row gap-2">
            <img src={Logo} class="overflow-clip rounded-[40px] object-cover w-[44px] h-[44px]" />
            <div id="header info" class="flex flex-col ">
                <p class="text-white text-[17px]">{authorName()}</p>
                <p class="text-white opacity-50 text-[16px]">{new Date(props.CreatedAt).toLocaleString()}</p>
            </div>

               </div>

               <p id="userComment" class="ml-1 mt-1 text-white text-[17px]">{props.Body}</p>

 
     </div>
    )
}

export default CommentView
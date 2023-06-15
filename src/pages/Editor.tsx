import { Show, createSignal } from "solid-js"
import Navigation from "../components/Navigation"
import LoginModal from "../components/LoginModal"
import Sidebar from "../components/Sidebar"
import Logo from "../assets/logogo.png"
import { URL } from "url"
import { uploadFile, UploadClient } from '@uploadcare/upload-client'
import { createSign } from "crypto"
import axios from "axios"
import { useLocation, useNavigate } from "@solidjs/router"
import LoadingModal from "../components/LoadingModal"
import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import Editorr from "@stfy/react-editor.js"
import Quote from "@editorjs/quote"
import NestedList from "@editorjs/nested-list"
import Paragraph from "@editorjs/paragraph"
import { ToolConstructable } from '@editorjs/editorjs';




const Editor = () => {
    const [loginModalShow, setLoginModalShow] = createSignal(false)
    const [createModalShow, setCreateModalShow] = createSignal(false)
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
    const [previewUrl, setPreviewUrl] = createSignal<string | null>(null);
    const [showBtn, setShowBtn] = createSignal(false)

    const [photoId, setPhotoId]= createSignal("")
    const [theImage, setTheImage] = createSignal()
    const [theHeadline, setTheHeadline] = createSignal("")
    const [theSubheadline, setSubheadline]= createSignal("")
    const [loading, setLoading]= createSignal(false)
    const [theBody, setBody] = createSignal("")
    const [theCategory, setTheCategory] = createSignal("Dasturlash")
    const location = useLocation();
    const nav = useNavigate()
    const id = location.state
    console.log(id)
    const client = new UploadClient({ publicKey: 'a44544398a2b6eaff0f5' })

    const instance = axios.create({
      withCredentials: true,
      
    });

    

    // const TheEditor = new EditorJS({
    //   holder: "editorjs",
      
    //   tools: {
      
    //     header: {
         
    //       class: Header as unknown as ToolConstructable,
    //       config: {
    //         levels: [1,2,3,4,5,6],
    //         defaultLevel: 1,
    //         placeholder: "Sarlavha"
    //                   },
                                  
    //     },

       
    //     paragraph: Paragraph,
    //     quote: {
    //       class: Quote
    //     },
    //     nestedList: NestedList
        
    //   },
    //   inlineToolbar: true,
    //   i18n: {

    //     messages: {
    //       ui: {
    //         "inlineToolBar": {
    //           "converter": {
    //             "Convert to": "Boshqa elementga aylantirish"
    //           }
    //         },
    //         "toolbar": {
    //           "toolbox": {
    //             "Add": "Qo'shish"
    //           }
    //         }
    //       },

    //       toolNames: {
    //         "Text": "Paragraf",
    //         "Heading": "Sarlavha",
    //         "List": "Ro'yxat",
    //         "Warning": "Ogohlantirish",
    //         "Checklist": "Nazorat ro'yxati",
    //         "Quote": "Iqtibos",
    //         "Code": "Kod",
    //         "Delimiter": "Ajratuvchi",
    //         "Raw HTML": "HTML-fragment",
    //         "Table": "Jadval",
    //         "Link": "Havola",
    //         "Marker": "Marker",
    //         "Bold": "Qalin",
    //         "Italic": "Kursiv",
    //         "InlineCode": "Monospace",
    //       },


    //       tools: {
    //         "warning": {
    //           "Title": "No'm",
    //           "Message": "Xabar",
    //         },
    //         "link": {
    //           "Add a link": "Havola qo'shish",

    //         }

    //       },

    //       blockTunes: {

    //         "delete": {
    //           "Delete": "O'chirish",
    //         },

    //         "moveUp": {
    //           "Move up": "Yuqoriga ko'tarish",
              
    //         },

    //         "moveDown": {
    //           "Move down": "Pastga tushurish",
    //         }
    //       },


    //     }
    //   }
    // })

    // const DEFAULT_INITIAL_DATA = () => {
    //   return {
    //     "time": new Date().getTime(),
    //     "blocks": [
    //       {
    //         "type": "header",
    //         "data": {
    //           "text": "This is my awesome editor!",
    //           "level": 1
    //         }
    //       },
    //     ]
    //   }
    // }
     



   
    function handleFileInputChange(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
        return;
      }
  
      const file = inputElement.files[0];
      
      setSelectedFile(() => file);
  
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }


    const editorStyles = {
      
    }

    return (
      <>
       <div class='sticky top-0 z-10'>
        <Navigation setLoginModalShow={setLoginModalShow} setCreateModalShow={setCreateModalShow} createModalShow={createModalShow} />
        </div>

        <div id='mainBody' class="flex flex-col w-full h-[100vh] bg-[#0C0C0C] items-center" >
    
        
        <Show when={loginModalShow()==true}>
        <div id='loginModal' class='md:fixed flex flex-row justify-center items-center md:w-full md:h-full z-20 bg-white/50 md:top-0 md:left-0'  >
        <LoginModal  setLoginModalShow={setLoginModalShow}/>
        </div>
        </Show>

        <div id='editorBox' class=' flex flex-col md:w-[40rem]   border-box m md:mt-[2rem] md:rounded-[1rem] px-6 py-6  bg-[#171717] ' >
           <Show when={loading()}>
           <div class="md:fixed flex flex-row justify-center items-center md:w-full md:h-full z-20 bg-white/50 md:top-0 md:left-0">
              <LoadingModal/>
            </div>
           </Show>
            <div onMouseOver={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}  
            class="w-full h-[16rem] overflow-hidden  border-[3px] rounded-[0.5rem] flex flex-row justify-center items-center bg-[#0C0C0C]  border-dashed  border-white">
               <Show when={selectedFile() == null}>
              <button class="text-white opacity-50 text-[1.2rem]">
              Rasm joylash
              <input type="file" onChange={handleFileInputChange} value={'siejdkslejsldkj'} class=" z-1 ml-[-10rem] opacity-0 absolute"  />
              </button>
               </Show>

              <Show when={selectedFile() != null && showBtn()}>
              <div class="absolute">
              <button class="text-white text-[1.2rem] bg-[#0C0C0Cdf] p-4 rounded-[0.4rem]">
              Boshqa rasm tanlash
              <input type="file" onChange={handleFileInputChange} value={'siejdkslejsldkj'} class=" z-1 ml-[-10rem] opacity-0 absolute"  />
              </button>
              </div>
               </Show>
               <Show when={selectedFile() !=null}>
               <img alt="preview image" class="object-cover w-full h-full" src={previewUrl() ?? ''} />
               </Show>
            </div>
            <div class="flex flex-row gap-2 mt-4">
              <p onClick={()=> setTheCategory("Dasturlash")} class={theCategory()=="Dasturlash" ? "bg-white px-4 py-2 cursor-pointer rounded-[12px] text-black transition-all-[0.4s]" : "transition-all-[0.4s] cursor-pointer bg-transparent px-4 py-2 rounded-[12px] text-white border-white border-[1px]" } >Dasturlash</p>
              <p onClick={()=> setTheCategory("Dizayn")} class={theCategory()=="Dizayn" ? "bg-white px-4 py-2 rounded-[12px] text-black transition-all-[0.4s] cursor-pointer" : "transition-all-[0.2s] bg-transparent px-4 py-2 rounded-[12px] text-white border-white border-[1px] cursor-pointer" } >Dizayn</p>
              <p onClick={()=> setTheCategory("Marketing")}class={theCategory()=="Marketing" ? "bg-white px-4 py-2 rounded-[12px] text-black transition-all-[0.4s] cursor-pointer" : "transition-all-[0.2s] bg-transparent px-4 py-2 rounded-[12px] text-white border-white border-[1px] cursor-pointer " } >Marketing</p>

            </div>
          
            
            <div id="editorjs"  class=" outline-none w-full h-auto mt-4 text-white">

             <div  onInput={(e)=>{
              setTheHeadline(e.currentTarget.innerText)
               console.log(e.currentTarget.innerText,"this")
            }} contentEditable={true} class="md:w-full h-auto border-none bg-transparent break-words font-bold text-[2rem] text-white outline-none">Hey man</div>
            <textarea placeholder="Kichik sarlavha" maxLength={200} onChange={(e)=> setSubheadline(e.target.value)} class="w-full overflow-clip md:h-[5rem] h-[8rem] bg-transparent text-[1rem] text-white outline-none resize-none "/>
            <textarea placeholder="Paragraf" maxLength={3000} onChange={(e)=> setBody(e.target.value)} class="w-full z-0 mt-2 overflow-clip h-full bg-transparent text-[1rem] text-white outline-none resize-none "/> 

    
            </div>

            <button class={theBody().length==0 ||  selectedFile() == null || theSubheadline().length == 0? "mb-4 md:mt-6 max-sm:mt-16 bg-white rounded-[0.8rem]  w-full md:w-[10rem]  h-[3.5rem] md:h-[2.5rem] opacity-50 pointer-events-none select-none z-1": "z-1 mb-4 mt-6 bg-white rounded-[0.8rem] w-[10rem] h-[2.5rem] "} onClick={async ()=> {
              // const result = await uploadFile(
              //   selectedFile()!,
              //   {
              //     publicKey: 'a44544398a2b6eaff0f5',
              //     store: 'auto',
              //     metadata: {
              //       subsystem: 'js-client',
              //       pet: 'cat'
              //     }
              //   }
              // )
              setLoading(true)
              client.uploadFile(selectedFile()!).then((file) => {
                setPhotoId(file.uuid)
                console.log(file.uuid)
                instance.post(`https://api.noted.today/api/users/${id}/addPost`, {
                  Headline: theHeadline(),
                  Subtitle: theSubheadline(),
                  Body: theBody(),
                  Thumbnail: file.uuid,
                  Category: theCategory()
                }).then((res)=> {
                  console.log(res.data.data)
                  setLoading(false)
                  nav("/")
                  
                })
              })




            }}>Joylash</button>


        </div>
   </div>
      </>
    )
}

export default Editor
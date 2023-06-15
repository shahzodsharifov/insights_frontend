import { Navigate } from "@solidjs/router"
import { useNavigate } from "@solidjs/router"
import axios from "axios"
import { Show, createSignal } from "solid-js"
import {createStore} from "solid-js/store"
import LoadingModal from "./LoadingModal"


const LoginModal = (props:any) => {
  console.log(document.cookie)

  const nav = useNavigate()
  const [isCompany, setCompany] = createSignal(false)
  const [nameErr, setNameErr] = createSignal("")
  const [usernameErr, setUsernameErr] = createSignal("")
  const [emailErr, setEmailErr] = createSignal("")
  const [passwordErr, setPasswordErr] = createSignal("")
  const [genErr, setGenErr] = createSignal("")
  const [loading, setLoading]= createSignal(false)
  

  const instance = axios.create({
    withCredentials: true,
    
  });

    const [showLogin, setShowLogin] = createSignal(false)
    const [form, setForm] = createStore({
      name: "",
      username: "",
      email: "",
      password:"",
    })

    const updateFormField = (fieldName: string) => (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      setForm({
        [fieldName]: inputElement.value
      });
    };
 
  
    const handleSubmit = () => {
      var theRole = "user";
      if(isCompany()) {
        theRole = "company"
      }
      setLoading(true)
      instance.post("https://api.noted.today/api/auth/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        role: theRole,
      }).then((response) => {
        setLoading(false)
        setShowLogin(true)
        console.log(response.headers)
      })
    }

    const handleLogin = () => {
      setLoading(true)
      instance.post("https://api.noted.today/api/auth/login", {
        email: form.email,
        password: form.password
      }).then((response) => {
        setLoading(false)
        console.log(response)

        if(response.status == 200) {
          nav("/profile")
        }

        if(response.status == 400) {
          setGenErr("Xato email yoki xato parol")
        }
        
      })
    }
   
        return (
         <>
           <Show when={loading()}>
           <div class="md:fixed flex flex-row justify-center items-center w-full h-full z-20 bg-white/50 md:top-0 md:left-0">
              <LoadingModal modalStatus="Biroz kuting..."/>
            </div>
           </Show>
          <Show when={showLogin()===false}>
              <div class="bg-[#171717] max-sm:w-full max-sm:px-5 max-sm:h-[100vh] md:w-[24rem] md:h-[auto] flex flex-col  md:px-12 md:rounded-[1.2rem] md:py-10">
               <div class="flex flex-row justify-end">
              <div onClick={()=> {
                props.setLoginModalShow(false)
                console.log("clicked")
              }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff" xmlns="https://www.w3.org/2000/svg">
               <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-opacity={0.75} stroke-width="2"  stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
       
              </div>
               </div>
               <h1 class="text-white md:text-[1.6rem] max-sm:text-[2rem] max-sm:mt-12 font-bold">Ro&apos;yhatdan O&apos;tish</h1>
               <form class="flex flex-col gap-4  mt-5">
                   <div class="w-full">
                   <input class={nameErr().length>0?"px-2 text-white border-solid border-[#ff3950] border-2 outline-none w-full h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 ":"px-2 text-white outline-none w-full  h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 "} 
                   onChange={(e) => {
                    setNameErr("")
                    updateFormField("name")(e)
                    if(form.name.length<3) {
                      setNameErr("Ism kamida 3-harfdan iborat bo'lishi kerak")
                    }
                    if(form.name.length>32) {
                      setNameErr("Ism maximum 32 harf bo'lishi mumkin")
                    }
                    
                    } } type="text" placeholder="Ism va Familiya"/>

                    <p class={nameErr().length>0 ? "transition-all ease-in-out delay-50 text-red-500 mt-2 text-[14px]": "transition-all ease-out hidden"}>{nameErr()}</p>
            
                   </div>
                   <div>
                   <input class={usernameErr().length>0?"px-2 text-white border-solid border-[#ff3950] border-2 outline-none w-full h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 ":"px-2 text-white outline-none w-full h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 "}
                     onChange={(e) => {
                      setUsernameErr("")
                      updateFormField("username")(e)
                      if(form.username.length<4) {
                        setUsernameErr("Username kamida 4-harfdan iborat bo'lishi kerak")
                      }
                      if(form.username.length>16) {
                        setUsernameErr("Username maximum 16-harf bo'lishi mumkin")
                      }
                      
                      } }
                   type="text"  placeholder="Username" />
                   <p  class={usernameErr().length>0 ? "transition-all ease-in-out delay-50 text-red-500 mt-2 text-[14px]": "transition-all ease-out hidden"}>{usernameErr()}</p>
                
                   </div>
                    
                    <div>
                    <input  class={emailErr().length>0?"px-2 text-white border-solid border-[#ff3950] border-2 outline-none w-full h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 ":"px-2 text-white outline-none w-full h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 "}
                    type="text" 
                    onChange={(e) => {
                      updateFormField("email")(e)
                      setEmailErr("")
                      var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

                      if(regex.test(form.email) == false) {
                        setEmailErr("Xato email formati")
                      }
                    
                    } } placeholder="Pochta"/>
                   <p  class={emailErr().length>0 ? "transition-all ease-in-out delay-50 text-red-500 mt-2 text-[14px]": "transition-all ease-out hidden"}>{emailErr()}</p>
                
                    </div>

                  <div>
                  <input  class={passwordErr().length>0?"px-2 text-white border-solid border-[#ff3950] border-2 outline-none w-full h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 ":"px-2 text-white outline-none w-full h-12 rounded-[0.4rem] placeholder:text-white bg-white/25 "}
                   type="text"
                   
                   onKeyUp={(e) => {
                    updateFormField("password")(e) 
                    setPasswordErr("")
                      if(form.password.length<8) {
                        setPasswordErr("Parol kamida 8-harfdan iborat bo'lishi kerak")
                      }
                      if(form.password.length>24) {
                        setPasswordErr("Username maximum 24 harf bo'lishi mumkin")
                      }
                   }} placeholder="Parol"/>
                   <p class={passwordErr().length>0 ? "transition-all ease-in-out delay-50 text-red-500 mt-2 text-[14px]": "transition-all ease-out hidden"}>{passwordErr()}</p>
                
                  </div>
                   <div class="flex items-center mb-4">
    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-[50%] focus:ring-blue-500" checked={isCompany()} onClick={()=> {
      console.log(isCompany())
      setCompany(!isCompany())
      console.log(isCompany())
    }}/>
    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kompaniya uchun akkaunt?</label>
</div>
                   <button class={form.email.length == 0 || form.name.length == 0 || form.password.length == 0 || form.email.length ==0 || nameErr().length>0 || usernameErr().length>0 || emailErr().length>0 || passwordErr().length>0 ?"bg-white opacity-50 select-none pointer-events-none h-12 rounded-[0.4rem]" :"bg-white h-12 select-none rounded-[0.4rem]" }
                   onClick={(e)=> {
                    e.preventDefault()
                    console.log(form)
                    handleSubmit()
                    } }>Ro&apos;yhatdan O&apos;tish</button>
               </form>
               <div class="flex flex-row gap-2">
               <p class="text-white md:text-[1rem] opacity-75 mt-4" >Akkauntingiz bormi?</p>
               <p class="text-white md:text-[1rem] mt-4" onClick={(e)=> {
                    e.preventDefault()
                    setShowLogin(true)
                    setEmailErr("")
                    setPasswordErr("")
               }} >Login</p>
               </div>
            </div>
          </Show>

            <Show when={showLogin()} >
                <div class="bg-[#171717] md:w-[24rem] md:h-[32rem] flex flex-col max-sm:w-full max-sm:h-[100vh] max-sm:px-5  md:px-12 md:rounded-[1.2rem] md:py-10">
                   <div class="flex flex-row justify-end">
                  <div onClick={()=> props.setLoginModalShow(false)}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff" xmlns="https://www.w3.org/2000/svg">
                   <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-opacity={0.75} stroke-width="2"  stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
           
                  </div>
                   </div>
                   <h1 class="text-white md:text-[1.6rem] max-sm:text-[2rem] font-bold mt-12">Login</h1>
                   <form class="flex flex-col gap-4 mt-5">
                       <input  class="px-2 outline-none h-12 rounded-[0.4rem] placeholder:text-white text-white bg-white/25"type="text" onChange={(e) => updateFormField("email")(e) } placeholder="Pochta"/>
                       <input  class="px-2 outline-none h-12 rounded-[0.4rem] placeholder:text-white text-white bg-white/25" type="text"onKeyUp={(e) => updateFormField("password")(e) } placeholder="Parol"/>
                       <p class={genErr().length>0 ? "transition-all ease-in-out delay-50 text-red-500 mt-2 text-[14px]": "transition-all ease-out hidden"}>{genErr()}</p>
                
             
                       <button class={form.email.length == 0 || form.password.length==0 ?"bg-white opacity-50 select-none pointer-events-none h-12 rounded-[0.4rem]" :"bg-white h-12 select-none rounded-[0.4rem]" } onClick={(e) => {
                         e.preventDefault()
                         console.log(form)
                         handleLogin()
                       }} >Login</button>
                   </form>
                   <div class="flex flex-row gap-2">
                   <p class="text-white md:text-[1rem] opacity-75 mt-4" >Akkauntingiz yo&apos;qmi?</p>
                   <p class="text-white md:text-[1rem] mt-4" onClick={()=> setShowLogin(false)}>Ro&apos;yhatdan O&apos;tish</p>
                   </div>
                </div>
            </Show>
         </>
           )
    }

    


export default LoginModal
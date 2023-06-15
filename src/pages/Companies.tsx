import { Component, For, Show, createEffect, createSignal } from "solid-js";
import Navigation from "../components/Navigation";
import CompanyView from "../components/CompanyView";
import Sidebar from "../components/Sidebar";
import Vacancies from "../components/VacanciesList";
import LoginModal from "../components/LoginModal";
import axios from "axios";
import { comma } from "postcss/lib/list";
export type CompanyType = {
  ID: string,
  Email: string,
  Role: string,
  Username: string,
  Name: string

}

const Companies =()=> {
  const [companies, setCompanies] = createSignal<Array<CompanyType>>([])
  const instance = axios.create({
    withCredentials: true,
    
  });

  createEffect(()=> {
    instance.get("https://api.noted.today/api/companies/").then((theCompanies) => {
      console.log(theCompanies.data)
      theCompanies.data.companies.map((e:CompanyType)=> {
        setCompanies([...companies(), e])
      })



     
    })
    
  },[])

  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
    return(

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

     <div id='sidebar' class=' md:w-1/5 z-10 w-full fixed max-sm:bottom-0  md:left-14'>
      <Sidebar setLoginModalShow={setLoginModalShow}/>
    </div>

    <div id="companiesBody" class='md:w-2/4 flex flex-col gap-6 md:py-0 py-4 px-5 md:px-14 '>
      <h1 class="text-white font-bold  md:text-[1.8rem] max-sm:text-[2rem]">Kompaniyalar</h1>
           <For each={companies()}>{(company,i) =>
           
           <CompanyView Email={company.Email} Name={company.Name} Role={company.Role} ID={company.ID} Username={company.Username}/>
           }
           </For>
    </div>

    <div class={`max-sm:hidden md:w-1/4 md:h-[40rem] md:flex md:flex-col  md:absolute md:right-16 md:pl-4`}>
    <div class='mt-6'>
    <Vacancies/>
    </div>
    </div>

    </div>
   </div>
        </>
        
    )
}

export default Companies
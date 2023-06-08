import { Component, For, Show, createEffect, createSignal, onMount } from 'solid-js';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import CompanyLists from './components/CompanyLists';
import Post from './components/Post';
import Companies from './pages/Companies';
import LoginModal from './components/LoginModal';
import VacanciesList from './components/VacanciesList';
import axios, { Axios } from 'axios';
import { PostType } from './pages/Profile';
import { Link } from '@solidjs/router';
import LoadingModal from './components/LoadingModal';




const App: Component = () => {

  const[trendingPosts, setTrendingPosts] = createSignal<Array<PostType>>([])

  const instance = axios.create({
    withCredentials: true,
    
  });
  createEffect(() => {
    instance.get("http://13.49.228.160:80/api/posts/trendingPosts").then((tPosts) => {
      console.log(tPosts.data)
      tPosts.data.data.post.map((e:PostType)=> {
        setTrendingPosts([...trendingPosts(), e])
      }
      
      )
    })
  },[])



  console.log(document.cookie)
  
  const [loginModalShow, setLoginModalShow] = createSignal(false)
  const [createModalShow, setCreateModalShow] = createSignal(false)
  
  return (
   <>
   <div id='mainBody' class="flex flex-col w-full min-h-[100vh] bg-[#0C0C0C]" >
    
    <div class='w-full sticky top-0 z-10'>
    <Navigation setLoginModalShow={setLoginModalShow} setCreateModalShow={setCreateModalShow} createModalShow={createModalShow}/>
    </div>

  <Show when={loginModalShow()==true}>
  <div id='loginModal' class='md:fixed flex flex-row justify-center items-center md:w-full md:h-full z-20 bg-white/50 md:top-0 md:left-0'  >
      <LoginModal  setLoginModalShow={setLoginModalShow}/>
    </div>
  </Show>

    <div id='contents' class='w-full bg-[#0C0C0C] flex flex-col md:flex-row md:px-8 md:py-6 md:gap-6 md:justify-center' >

    <div id='sidebar' class=' md:w-1/5 z-10 w-full fixed max-sm:bottom-0  md:left-14'>
       <Sidebar setLoginModalShow={setLoginModalShow}/>
    </div>

    <div id='mainContent' class='md:w-2/4 flex  flex-col gap-6 md:py-0 py-4 px-5 md:px-14 '>
  
    <For each={trendingPosts().reverse()}>{(post, i) =>
     
    
      <Post postID={post.ID} headline={post.headline} authorId={post.author_id} subheadline={post.subtitle} Thumbnail={post.Thumbnail}/>

    }

    </For>
    </div>

    <div class={`sm:hidden md:w-1/4 md:h-[40rem] md:flex md:flex-col  md:absolute md:right-16 md:pl-4`}  >
    <CompanyLists/>
    <div class='mt-6'>
    <VacanciesList/>
    </div>
    </div>

    </div>
   </div>
   </>
  );
};

export default App;

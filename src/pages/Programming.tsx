import { Component, For, Show, createEffect, createSignal, onMount } from 'solid-js';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import CompanyLists from '../components/CompanyLists';
import Post from '../components/Post';
import Companies from '../pages/Companies';
import LoginModal from '../components/LoginModal';
import VacanciesList from '../components/VacanciesList';
import axios, { Axios } from 'axios';
import { PostType } from '../pages/Profile';
import { Link } from '@solidjs/router';




const Programming= () => {

  const[trendingPosts, setTrendingPosts] = createSignal<Array<PostType>>([])

  const instance = axios.create({
    withCredentials: true,
    
  });


  createEffect(() => {
    instance.get("https://api.noted.today/api/posts/topics/Dasturlash",{

  
  }
 
    ).then((tPosts) => {
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
   <div id='mainBody' class="flex flex-col w-full bg-[#0C0C0C]" >
    
    <div class='sticky top-0 z-10'>
    <Navigation setLoginModalShow={setLoginModalShow} setCreateModalShow={setCreateModalShow} createModalShow={createModalShow}/>
    </div>

  <Show when={loginModalShow()==true}>
  <div id='loginModal' class='md:fixed flex flex-row justify-center items-center md:w-full md:h-full z-20 bg-white/50 md:top-0 md:left-0'  >
      <LoginModal  setLoginModalShow={setLoginModalShow}/>
    </div>
  </Show>

    <div id='contents' class='w-full min-h-[100vh] b-[#0C0C0C] flex flex-row px-8 py-6 gap-6 justify-center' >

    <div id='sidebar' class='w-1/5 fixed left-14'>
      <Sidebar setLoginModalShow={setLoginModalShow}/>
    </div>

    <div id='mainContent' class='w-2/4 flex flex-col gap-6 px-14'>
    <For each={trendingPosts().reverse()}>{(post, i) =>
     
      <Link href={`/posts/${post.ID}`}>
      <Post postID={post.ID} headline={post.headline} authorId={post.author_id} subheadline={post.subtitle} Thumbnail={post.Thumbnail} createdAt={post.CreatedAt}/>
      </Link>
    }

    </For>
    </div>

    <div class={`w-1/4 h-[40rem]  absolute right-16 pl-4`}  >
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

export default Programming;

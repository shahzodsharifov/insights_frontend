import { Setter } from "solid-js"

type NavLoginProps = {
    setLoginModalShow: Setter<Boolean>}

const NavLogin = (props: NavLoginProps) => {
    return (
    <>
      <div id='user' class='hidden md:flex md:flex-row  gap-1 items-center w-full justify-end text-white select-none cursor-pointer' onClick={()=> props.setLoginModalShow(true)}>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 20C11.7733 20 8.01442 22.0408 5.62135 25.208C5.1063 25.8896 4.84877 26.2304 4.85719 26.691C4.8637 27.0469 5.08717 27.4959 5.36718 27.7156C5.72961 28 6.23185 28 7.23633 28H24.7637C25.7682 28 26.2704 28 26.6329 27.7156C26.9129 27.4959 27.1363 27.0469 27.1429 26.691C27.1513 26.2304 26.8938 25.8896 26.3787 25.208C23.9856 22.0408 20.2268 20 16 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="">Login</p>
  
      </div>

      <div id='user' class=' py-2 px-2 md:hidden flex flex-col  gap-1 items-center justify-center md:w-1/4  md:justify-end text-white select-none cursor-pointer' onClick={()=> props.setLoginModalShow(true)}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 20C11.7733 20 8.01442 22.0408 5.62135 25.208C5.1063 25.8896 4.84877 26.2304 4.85719 26.691C4.8637 27.0469 5.08717 27.4959 5.36718 27.7156C5.72961 28 6.23185 28 7.23633 28H24.7637C25.7682 28 26.2704 28 26.6329 27.7156C26.9129 27.4959 27.1363 27.0469 27.1429 26.691C27.1513 26.2304 26.8938 25.8896 26.3787 25.208C23.9856 22.0408 20.2268 20 16 20Z" stroke="white" stroke-width="2"  stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z" stroke="white" stroke-width="2"  stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="hidden md:inline-block">Login</p>
  
      </div>
        </>
    )
}

export default NavLogin
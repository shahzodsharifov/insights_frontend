import { Link } from "@solidjs/router"
import { Accessor, Setter } from "solid-js"

type ModalProps = {
    userID: string
    isLoggedIn: Accessor<boolean>,
    setLoginModalShow: Setter<boolean>
    setCreateModalShow: Setter<boolean>
}

const CreateModal = (props:ModalProps) => {
    return (
        <>
        <div id="modalList" onClick={()=> {
            if(props.isLoggedIn() == false) {
                
                props.setLoginModalShow(true)
                props.setCreateModalShow(false)
            }
        }} class="flex flex-col gap-1 mt-12  max-sm:right-5 w-[8rem] px-4 py-3 rounded-[0.5rem] justify-center text-white fixed bg-[#35373B] select-none cursor-pointer">
           <Link state={props.userID}  class={props.isLoggedIn() == false? "pointer-events-none": ""}  href="/editor">
           <p>Maqola</p>
           </Link>
          <Link state={props.userID} class={props.isLoggedIn() == false? "pointer-events-none": ""}  href="/newVaccancy">
          <p>Vakansiya</p>
          </Link>
            <Link state={props.userID} class={props.isLoggedIn() == false? "pointer-events-none": ""} href="/newEvent">
            <p>E'lon</p>
            </Link>
        </div>
        </>
    )
}

export default CreateModal
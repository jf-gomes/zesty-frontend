import { IoMdClose } from "react-icons/io";
import './CloseBtn.css'

export default function CloseBtn({ close }){
    return (
        <div className="closeBtnDiv">
            <IoMdClose onClick={() => close(false)} className="iconBtn" size={24} />
        </div>
    )
}
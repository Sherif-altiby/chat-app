import React, { useContext } from "react";
import add from '../img/add.png'
import cam from '../img/cam.png'
import more from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from "../components/context/ChatContext";

const Chat = () => {
  const { data, block, setBlock } = useContext(ChatContext);
  
  return (
    <div className='chat' >
      <div className="chat_info">
      <div className="icon" onClick={()=>setBlock(!block)} ><i className="fa-solid fa-bars"></i></div>
        <span> {data.user?.displayName} </span>
        <div className="setting"> 
        <img src={cam} alt="" />
        <img src={add} alt="" />
        <img src={more} alt="" />
         </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
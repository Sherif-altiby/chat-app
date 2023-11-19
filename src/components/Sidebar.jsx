import Navbar from '../components/Navbar'
import Search from '../components/Search'
import Chats from '../components/Chats'
import { ChatContext } from "../components/context/ChatContext";
import { useContext } from 'react';

const Sidebar = () => {
 
  const { block } =useContext(ChatContext)

  return (
    <div className={block === true ? "sidebar block" : "sidebar"} >
     <Navbar />
     <Search />
     <Chats />
    </div>
  )
}

export default Sidebar
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext'
const Navbar = () => {

  const { currentUser } = useContext(AuthContext)
  const { setBlock } = useContext(ChatContext)

  return (
    <div className='navbar' >
      <div className="logo">
        <h3>  Chat </h3>
      </div>
      <div className="user">
      <img src={currentUser.photoURL} alt="" />
        <div className="username"> {currentUser.displayName} </div>
        <button className="btn" onClick={()=>signOut(auth)} >Logout</button>
      </div>
        <div className="exite" onClick={()=>setBlock(false)} > X </div>
    </div>
  )
}

export default Navbar
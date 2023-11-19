import '../style.scss'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Loading from '../components/Loading'

const Home = () => {
  return (
    <div className='home_page' >
      <Loading />
      <div className="container ">
      <Sidebar />
       <Chat />
      </div>
    </div>
  )
}

export default Home
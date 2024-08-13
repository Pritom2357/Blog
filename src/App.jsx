import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Container from './components/container/Container'
import b from './b.png'
import Logo from './components/Logo'
import Logoutbutton from './components/Header/Logoutbutton'
import { Header } from './components'
import Footer from './components/Footer/Footer'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(()=>setLoading(false));
  }, [])
  
  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header/>
          <main className='min-h-[calc(100vh-100px)] bg-slate-100'>
            <Outlet/>
          </main>
        <Footer/>
      </div>
    </div>
  ):null;
}

export default App

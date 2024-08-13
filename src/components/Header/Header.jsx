import React from 'react'
import {Container, Logo, Logoutbutton} from '../index'
import {Link, NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Menu } from 'lucide-react';
import IonIcon from '@reacticons/ionicons';
import { useState } from 'react'

function Header() {
  const authStatus = useSelector((state)=>state.auth.status);
  const [val, setVal] = useState("menu");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const ontoggle=()=>{
    val === "menu"? setVal("close"):setVal("menu");
    active?setActive(false):setActive(true);
  }

  const navItems = [
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Posts",
      slug:"/all-posts",
      active:authStatus
    },
    {
      name:"Yours",
      slug:"/your-posts",
      active:authStatus
    },
    {
      name:"Add",
      slug:"/add-post",
      active:authStatus
    },
  ]
    
  return (
    <header className='py-3 shadow bg-slate-200'>
        <Container>
          <nav className='flex flex-wrap justify-center items-center w-full'>
            <div>
              <Link to='/'>
                <Logo/>
              </Link>
            </div>
            <div className={`ml-auto duration-700 md:static absolute z-10 min-h-[60vh] md:min-h-fit left-0 w-full flex items-center md:w-auto  ${active?'top-[9%] bg-slate-200 opacity-80 text-2xl font-semibold': 'top-[-100%]'}`}>
              <ul className={`flex m-auto order-2 md:flex-row flex-col md:items-center ${active?'gap-8':''}`}>
                  {navItems.map((item)=>
                  item.active?(
                    <li key={item.name}>
                      <NavLink to={item.slug}
                        className={({isActive})=>
                        `inline-block px-6 py-2 duration-200 hover:bg-orange-600 hover:text-white rounded-full
                        text-xl ${isActive?"underline underline-offset-8 decoration-orange-600": "text-black"}`}
                        >
                          {item.name}
                      </NavLink>
                    </li>
                  ):null
                )}
                </ul>
            </div>
              <ul className='flex ml-auto order-2'>
                {authStatus && (
                  <li>
                    <Logoutbutton/>
                  </li>
                )}
                {!authStatus && (
                    <li key='Login'>
                    <NavLink to='/login'
                      className={({isActive})=>
                      `inline-block px-4 py-2 duration-200 
                      text-xl font-semibold hover:bg-orange-600 hover:text-white rounded-full ${isActive?"underline underline-offset-8 decoration-orange-600": "text-black"}`}
                      >
                        Login
                    </NavLink>
                  </li>
                )}
                {!authStatus && (
                    <li key='Signup'>
                    <NavLink to='/signup'
                      className={({isActive})=>
                      `inline-block px-4 py-2 duration-200
                      text-xl font-semibold hover:bg-orange-600 hover:text-white rounded-full ${isActive?"underline underline-offset-8 decoration-orange-600": "text-black"}`}
                      >
                        Sign up
                    </NavLink>
                  </li>
                )}
                <div className='m-auto md:hidden'>
                <IonIcon name={val} className= 'text-3xl cursor-pointer mt-2' onClick={ontoggle}/>
                </div>
              </ul>
          </nav>
        </Container>
    </header>
  )
}

export default Header
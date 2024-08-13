import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Authlayout, Login, Signup } from './components/index.js'

import Home from './Pages/Home.jsx'
import Yourpost from './Pages/Yourpost.jsx'
import AddPost from './Pages/Addpost.jsx'
import Editpost from './Pages/Editpost.jsx'
import Post from './Pages/Post.jsx'
import Allposts from './Pages/Allposts.jsx'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path: '/login',
        element:(
          <Authlayout authentication={false}>
            <Login/>
          </Authlayout>
        )
      },
      {
        path: '/signup',
        element:(
          <Authlayout authentication={false}>
            <Signup/>
          </Authlayout>
        )
      },
      {
        path: '/all-posts',
        element:(
          <Authlayout authentication>
            {" "}
            <Allposts/>
          </Authlayout>
        )
      },
      {
        path: '/your-posts',
        element:(
          <Authlayout authentication>
            {" "}
            <Yourpost/>
          </Authlayout>
        )
      },
      {
        path: '/add-post',
        element:(
          <Authlayout authentication>
            {" "}
            <AddPost/>
          </Authlayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element:(
          <Authlayout authentication>
            {" "}
            <Editpost/>
          </Authlayout>
        )
      },
      {
        path:'/post/:slug',
        element:<Post/>
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition: Bounce
        />
        <ToastContainer/>
    </Provider>
  </React.StrictMode>,
)

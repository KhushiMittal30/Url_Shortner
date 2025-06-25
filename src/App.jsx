import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Auth from './pages/auth'
import RedirectLink from './pages/redirect-link'
import Dashboard from './pages/dashboard'

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/:id",
        element:<RedirectLink/> //the short link 
      },
      {
        path:"/link/:id",
        element:<Link/>  //has all the stats for the link and to create a dynamic link we have the id
      },
      {
        path:"/auth",
        element:<Auth/>
      },
    ]
  }
])

function App() {

  return <RouterProvider router={router}/> //router prop
}

export default App

import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Auth from './pages/auth'
import RedirectLink from './pages/redirect-link'
import Dashboard from './pages/dashboard'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'
import Link from './pages/link'

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
        element: <RequireAuth>
        <Dashboard/>
        </RequireAuth>
      },
      {
        path:"/:id",
        element:<RedirectLink/> //the short link 
      },
      {
        path:"/link/:id",
        element:<RequireAuth>
                   <Link/>  //has all the stats for the link and to create a dynamic link we have the id
               </RequireAuth>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
    ]
  }
])

function App() {

  return(
  <UrlProvider>
    <RouterProvider router={router}/> //router prop
  </UrlProvider>
)}

export default App

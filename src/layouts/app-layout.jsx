import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container px-12">
        <Header/>
        <Outlet/>
        {/* / //renders the child route elemtn if there exists a one */}
      </main>
      {/* footer */}
      <div className= "p-10 text-center bg-gray-800 mt-10">
        Welcome to my app
      </div>
    </div>
  );
}

export default AppLayout

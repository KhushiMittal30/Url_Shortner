import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {DropdownMenu,  DropdownMenuContent,DropdownMenuItem, DropdownMenuLabel,DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {LinkIcon, LogOut} from "lucide-react";
import { UrlState } from '../context'
import useFetch from '../hooks/use-fetch'
import { logout } from '../db/apiAuth'
import { BarLoader } from 'react-spinners'

const Header = () => {

  const navigate = useNavigate();
  // const user = false ;
  const{user, fetchUser} = UrlState();
  console.log("user is ", user)

  const{loading, fn:fnLogout} = useFetch(logout);
  
  return( 
    <>
    <nav className="py-4 flex justify-between items-center" >
      <Link to= "/">
        <img src="/logo.png" className='h-16' alt='Logo'></img>
      </Link>
      <div>
        {!user ? (
        <Button onClick ={() => navigate("/auth") }>Login</Button>
        ) : (
           <DropdownMenu>
              <DropdownMenuTrigger className="w-8 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profilepic} className ="object-content"/>
                  <AvatarFallback>KM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger >
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-1 h-4 w-4"></LinkIcon>
                       My Links
                     </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-1 h-4 w-4 text-red-400"></LogOut>
                  <span onClick={()=>{
                     fnLogout().then(()=>{
                       navigate("/");
                     });
                  }}>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        )}
      </div>
    </nav>
        {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
    </>
  );
}

export default Header

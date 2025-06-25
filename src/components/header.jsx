import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {DropdownMenu,  DropdownMenuContent,DropdownMenuItem, DropdownMenuLabel,DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {LinkIcon, LogOut} from "lucide-react";

const Header = () => {

  const navigate = useNavigate();
  const user = false ;
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>KM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger >
              <DropdownMenuContent>
                <DropdownMenuLabel>Khushi Mittal</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LinkIcon className="mr-1 h-4 w-4"></LinkIcon>
                       <span>My Links</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-1 h-4 w-4 text-red-400"></LogOut>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        )
      }
      </div>
    </nav>
    </>
  );
}

export default Header

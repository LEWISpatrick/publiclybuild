'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'
import {
  Book,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const UserButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const userButtonItems = [


    {
      label: 'Billing',
      icon: CreditCard
    },
 
  ]
  // Random gradient colors for Avatar

  const router = useRouter()
  const session = useCurrentUser()

  const onClick = () => {
    router.push('/register')
  }
  const Logout = () => {
    signOut()
    router.push('/login')
  }
  const Payment = async () => {
  
    try {
      setIsLoading(true)
      const response = await axios.post('/api/checkout')
      window.location.href = response.data.url
    } catch (error) {
      toast.error('An error occured! Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {!session ? (
        <div>
          <Link
            href="/register"
            className="flex md:hidden items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:bg-primary/10 px-2 py-2"
          >
            <LogOut className="h-5.5 w-5" />
          </Link>

          <Button
            type="submit"
            onClick={onClick}
            className="px-5 rounded-md hidden md:flex"
          >
            Get Started
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* User Avatar / Logo */}
            <Avatar className="cursor-pointer">
              <AvatarImage src={session.image ? session.image : ''} alt="pfp" />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700"></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          {/* Content */}
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel className="py-0 pt-1">
              {session?.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="opacity-70 text-sm font-normal">
              {session?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Main Icons */}
            <DropdownMenuGroup>
              {userButtonItems.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <button onClick={Payment} className="flex">
                    <item.icon className="mr-2 mt-0.5 h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {/* Logout Button */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={Logout} className="cursor-pointer">
              <LogOut className="mr-2 mt-0.5 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default UserButton

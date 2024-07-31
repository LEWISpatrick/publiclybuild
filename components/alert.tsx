'use client'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Palette, RocketIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { useState, useTransition } from 'react'
import { Form } from '@/components/ui/form'

export function AlertDemo() {
  const [email, setEmail] = useState('')
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      const data = await response.json()

      if (data.message) {
        toast.success(data.message)
        setEmail('')
      } else {
        console.error(data, 'ha')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="w-full max-w-6xl px-6 py-4">
      <Alert className="flex flex-col sm:flex-row gap-4 justify-between px-6 rounded-xl border-0 ring ring-primary/20 ring-inset text-secondary bg-primary/15 text-black dark:text-white cursor-default">
        <div>
          <AlertTitle className="flex gap-1">
            <RocketIcon className="h-4 w-4" />
            Heads up!
          </AlertTitle>
          <AlertDescription className="flex">
            <p>$4.99 for the first 5 clients </p>
          
          </AlertDescription>
        </div>
       
      </Alert>
    </div>
  )
}

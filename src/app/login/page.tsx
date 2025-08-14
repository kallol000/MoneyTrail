"use client"
import { login, signup } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid'
import { Loader } from 'rsuite';

export default function LoginPage() {

  const [ errorMessage, setErrorMessage ] = useState<boolean>( false )
  const [isLoginPending, startLoginTransition] = useTransition()

  const handleLogin = async ( formData: FormData ) => {
    startLoginTransition( async () => {
      const result = await login( formData )
      if ( result?.error ) {
        setErrorMessage(true)
      }
    })
  }

  return (
    <div className='p-16 '>
      <div className='flex flex-col items-center mb-16'>
        <div className='text-4xl font-semibold'>Welcome!</div>
        <div className='text-xl '>Login or SignUp to start tracking your expenses today</div>
      </div>
    <div className='flex justify-center'>

      <form className='w-1/3 flex flex-col gap-4 p-4 items-center '>
          <Input placeholder='email' id="email" name="email" type="email" required />
          <Input placeholder='password' id="password" name="password" type="password" required />
        <div className = "flex gap-4">
            <Button className='min-w-30 rounded-[50px] cursor-pointer' formAction={ handleLogin }>{ isLoginPending ? `Loading...`  : `Log in` }</Button>
            <Button className='min-w-30 rounded-[50px] cursor-pointer' formAction={ signup }>{ `Sign Up` }</Button>
          </div>
          { errorMessage &&
            <div className='flex items-center gap-2'>
              <ExclamationTriangleIcon className='size-4 text-red-500' />
              <p className='text-sm'>Invalid Login credentials</p> 
            </div>
          }

      </form>
    </div>
    </div>
  )
}
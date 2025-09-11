"use client"
import { login, passwordReset, signup } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid'
import Spinner from '@/components/ui/spinner'

export default function LoginPage() {

  const [ errorMessage, setErrorMessage ] = useState<boolean>( false )
  const [forgotPasswordNotification, setForgotPasswordNotification] = useState<boolean>(false)
  const [isLoginPending, startLoginTransition] = useTransition()
  const [isSignupPending, startSignupTransition] = useTransition()
  const [isPasswordResetPending, startPasswordResetTransition] = useTransition()


  const handleLogin = async ( formData: FormData ) => {
    startLoginTransition( async () => {
      const result = await login( formData )
      if ( result?.error ) {
        setErrorMessage(true)
      }
    })
  }

  const handleSignup = async ( formData: FormData ) => {
    startSignupTransition( async () => {
      const result = await signup( formData )
      if ( result?.error ) {
        setErrorMessage(true)
      }
    })
  }

  const handlePasswordReset = async ( formData: FormData ) => {
    startPasswordResetTransition( async () => {
      const result = await passwordReset( formData )
      setForgotPasswordNotification(true)
    })
  }

  return (
    <div className='p-16 '>
      <div className='flex flex-col items-center mb-16'>
        <div className='text-5xl text-identity font-bold'>MONEYTRAIL</div>
        <div className='text-xl '>Your own expense tracker</div>
      </div>
    <div className='flex justify-center'>

      <form className='w-4/5 min-w-[350px] max-w-[500px] flex flex-col gap-4 p-4 items-center '>
          <Input placeholder='email' id="email" name="email" type="email" required />
          <Input placeholder='password' id="password" name="password" type="password" />
        <div className = "flex gap-4 mt-8">
            <Button className='min-w-30 rounded-[50px] cursor-pointer' formAction={ handleLogin }>{ isLoginPending ? <Spinner /> : `Log in` }</Button>
            <Button className='min-w-30 rounded-[50px] cursor-pointer' formAction={ handleSignup }>{ isSignupPending ? <Spinner /> : `Sign Up` }</Button>
          </div>
          { errorMessage &&
            <div className='flex items-center gap-2'>
              <ExclamationTriangleIcon className='size-4 text-red-500' />
              <p className='text-sm'>Invalid Credentials</p> 
            </div>
          }
          { forgotPasswordNotification &&
            <div className='flex items-center gap-2'>
              <p className='text-sm'>A password reset mail has been sent to your mail id. Pleae check and follow the steps</p> 
            </div>
          }
          { !forgotPasswordNotification && 
          <Button variant= "link" formAction={handlePasswordReset}>Forgot Password? { isPasswordResetPending ? <Spinner /> : null } </Button>
          }

      </form>
    </div>
    </div>
  )
}
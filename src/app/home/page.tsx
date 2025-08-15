import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { createClient } from '../utils/supabase/server'
import { logOut } from '../login/actions';
import { getIncome } from '../api/income/route';

export default async function Home() {
  const supabase = await createClient()

//   const { data, error } = await supabase.auth.getUser()
//   if (error || !data?.user) {
//     redirect('/login')
//   }

    const res = await getIncome()
    const data = await res.json()
    // if ( error ) {  
    //   redirect('/login')
    // }
    
    console.log(data)
  return (
    <div className='flex flex-col justify-center items-center'>
      <p> Hello </p>
      <form>
        <Button formAction={logOut}>Logout</Button>
      </form>
    </div>
    
  )
}
import { redirect } from 'next/navigation'

import { createClient } from '../utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

//   const { data, error } = await supabase.auth.getUser()
//   if (error || !data?.user) {
//     redirect('/login')
//   }

    const { data, error } = await supabase.from( "income" ).select();
    if ( error ) {
        redirect('/login')
    }
    
    console.log(data)
  return (
    <div>
      <p> Hello </p>
    </div>
    
  )
}
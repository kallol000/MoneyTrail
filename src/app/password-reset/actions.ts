'use server'
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
// import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function resetPassword(formData: FormData) {
    
    const headerList = await headers()
    const referer =  headerList.get("referer")! //referer holds the url in string type
    const urlObject = new URL(referer)
    const code = urlObject.searchParams.get("code")
    const password = formData.get('passwordreset') as string

    if(code) {
        const supabase = await createClient()
        await supabase.auth.exchangeCodeForSession(code)
        
        const {error} =  await supabase.auth.updateUser({ password: password })
        
        if(error) {
            console.log(error)
            redirect('/error')
        }
        redirect('/password-reset-successful')
    }

}
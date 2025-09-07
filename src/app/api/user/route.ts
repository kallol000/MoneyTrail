// import { createClient } from "@/app/utils/supabase/client";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
    
    if(error) {
      return new Response(JSON.stringify({message:error.message}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}
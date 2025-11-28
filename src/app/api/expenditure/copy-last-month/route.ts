// import { createClient } from "@/app/utils/supabase/client";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year")!);
  const month = parseInt(searchParams.get("month")!);
  const categoryId = parseInt(searchParams.get("categoryId")!);

  
  const supabase = await createClient()
  // console.log("API called with:", year, month, categoryId);
    
    const { data, error } = await supabase.rpc("copy_expenses_from_last_month", { p_category_id: categoryId, p_year: year, p_month:month });
    
    if(error) {
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}
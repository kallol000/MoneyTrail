import { createClient } from '../../utils/supabase/client';


// get user details
export async function getUser() {

    const supabase = createClient()

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


// get user's income data
export async function getIncome() {

    const supabase = createClient()

    const { data, error } = await supabase
      .from("income")
      .select()
    
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


// get an user's expenditure categories
export async function getUserCategories() {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("user_categories")
      .select( `id, name` )
    
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

// get an user's expenditure details
export async function getMonthlyExpenses(userId: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase.rpc("get_monthly_expenses", { p_user_id: userId });
    
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
  
  // get an user's expenditure for a day for a particular category
  export async function getOneDayExpense( date:string, categoryId: number ) {
    
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("expenses")
      .select(`id, amount, description, category_id, date`)
      .eq('date', date)
      .eq('category_id', categoryId)

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

  // get an user's date wise expenditures
  export async function getDateWiseExpenses( year: number, month: number ) {
    
    const supabase = createClient()
    
    const { data, error } = await supabase.rpc("get_date_wise_monthly_expenses", { p_year: year, p_month:month });
    
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
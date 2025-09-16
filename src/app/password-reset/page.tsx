
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { resetPassword } from "./actions"


export default async function Page() {

    // const code = "abcd"

    return (
        
        <div className='p-16 '>
            <div className='flex flex-col items-center mb-8'>
                <div className='text-xl font-semibold'>Reset your password</div>
            </div>
            <div className='flex justify-center'>

            <form className='w-4/5 min-w-[350px] max-w-[500px] flex flex-col gap-4 p-4 items-center '>
                <Input placeholder='password' id="passwordreset" name="passwordreset" type="password" required />
                <div className = "flex gap-4 mt-8">
                    <Button className='min-w-30 rounded-[50px] cursor-pointer' formAction={ resetPassword }>{  `Reset` }</Button>
                </div>

            </form>
            </div>
        </div>
    )
}
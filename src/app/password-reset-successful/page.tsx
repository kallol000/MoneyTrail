import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function PasswordResetNotification() {
    return(
        <div className="grid p-16 justify-center items-center min-h-screen">
            <span className="flex items-center ">
                <span>Your password has been updated sucessfully</span>
                
                <Link href={'/login'}>
                    <Button className="text-md text-action" variant={"link"}>
                        Login
                    </Button>
                </Link>
            </span>
        </div>
    )
}
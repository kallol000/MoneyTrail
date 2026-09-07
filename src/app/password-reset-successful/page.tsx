import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function PasswordResetNotification() {
    return(
        <div className="grid px-6 py-12 sm:p-16 justify-center items-center min-h-dvh text-center">
            <span className="flex flex-wrap items-center justify-center gap-1">
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
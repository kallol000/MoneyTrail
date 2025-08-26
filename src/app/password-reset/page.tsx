
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { resetPassword } from "./actions"


export default async function Page() {

    // const code = "abcd"

    return (
        <div>
            <form>
                <Input placeholder='password' id="passwordreset" name="passwordreset" type="password" required />
                <Button formAction={resetPassword}>Submit</Button>
            </form>
        </div>
    )
}
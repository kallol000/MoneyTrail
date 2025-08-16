import { ReactNode } from "react";

export default function Navbar({children} : {children: ReactNode}) {
    return(
        <div className="flex justify-between shadow-xs p-4">
            {children}
        </div>
    )
}
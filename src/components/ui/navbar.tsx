import { ReactNode } from "react";

export default function Navbar({children} : {children: ReactNode}) {
    return(
        <div className="row-span-2 grid grid-cols-10 items-center shadow-xs">
            {children}
        </div>
    )
}
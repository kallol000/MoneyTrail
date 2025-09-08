import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cardProps } from "@/app/utils/lib/types"

const rupeesymbol = "\u20B9";

export  default function UserCard({variant, title, description, data}: cardProps) {
  return (
    <Card className={`w-full h-full ${variant === "identity" ? "bg-identity text-white": ""} `}>
      <div className="p-4 flex flex-col h-full justify-center">
        <div className="leading-none font-semibold" >{title}</div>
        <div className="h-full text-4xl font-bold flex items-center">
          {data ? rupeesymbol : ""} {data}
        </div>
      </div>
      {/* <CardHeader>
      </CardHeader> */}
      {/* <CardContent className={variant === "identity" ? "text-4xl font-bold": "text-xl font-semibold"}> */}
      {/* <CardTitle></CardTitle>
      <CardContent className="h-full text-4xl font-bold flex items-center">
      </CardContent> */}
    </Card>
  )
}

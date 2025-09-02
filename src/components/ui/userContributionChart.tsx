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

export  default function UserContributionChart({variant, title, description, data}: cardProps) {
  return (
    <Card className={`w-full h-full ${variant === "identity" ? "bg-identity text-white": ""} `}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {/* <CardContent className={variant === "identity" ? "text-4xl font-bold": "text-xl font-semibold"}> */}
      <CardContent className="text-4xl font-bold">
          <div className="grid grid-cols-42 gap-2">
            {new Array(180).fill("") .map((_, index) => (
                <div key={index} className={`w-5 h-5 ${Math.random() > 0.5 ? "bg-green-500": "bg-gray-300"} rounded-sm`}></div>
            ))}

          </div>
      </CardContent>
    </Card>
  )
}

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { link } from "fs"

type carouselItemType = {
  title: string;
  link: string;
}

const carouselItemsContent = [{
    title: "Set up your expenditure categories and track daily expenditure at ease",
    link: ""
  },{
    title: "Always be on top of your expenditures, with insights that you control",
    link:""
  }
]

export function HomeCarousel() {


  const carouselItems = carouselItemsContent.map((item, index) => (
    <CarouselItem key={index}>
      <Card className="">
        <CardContent className="flex flex-col aspect-video items-center justify-start p-6 ">
          <div className="text-xl">{item.title}</div>
        </CardContent>
      </Card>
    </CarouselItem>
  ))

  return (
    <Carousel className="w-full max-w-4xl">
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}

        {carouselItems}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

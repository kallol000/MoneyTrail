'use client'
import * as React from "react"
import { useMediaQuery } from "@/app/utils/lib/hooks/useMediaQuery"
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

  const isDesktop = useMediaQuery("(min-width:768px)");


  const carouselItems = carouselItemsContent.map((item, index) => (
    <CarouselItem key={index} >
      <Card className="bg-secondary">
        <CardContent className="flex flex-col  items-center">
          <div className="text-xs">{item.title}</div>
        </CardContent>
      </Card>
    </CarouselItem>
  ))

  return (
    <Carousel className="col-span-10 row-span-5 row-start-5 max-w-4/5 md:max-w-3/5">
      <CarouselContent className="row-start-5">
        {carouselItems}
      </CarouselContent>
      {isDesktop ? 
        <>
          <CarouselPrevious />
          <CarouselNext /> 
        </>
        :
        null
      }
    </Carousel>
  )
}

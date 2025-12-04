'use client'
import useSWR from 'swr'
import Image from 'next/image'
import { Produto } from '@/models/interfaces'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




export default function ProductCard({ title, description, price, rating, image }: Produto) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Image className='text-black'
            key={image}
            src={image}
            alt={title}
            width={200}
            height={200}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{price}</p>
      </CardContent>
      <CardFooter>
        <p>{rating.rate}</p>
      </CardFooter>
    </Card>
  )
}
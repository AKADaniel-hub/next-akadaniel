'use client'
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { Produto } from '@/models/interfaces'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Search } from 'lucide-react'


const API = 'https://deisishop.pythonanywhere.com'
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function Page() {

  const [filteredData, setFilteredData] = useState('');


  const { data, error, isLoading } = useSWR<Produto[]>(`${API}/products`, fetcher)

  if (error) return <p className="p-4">Erro: {error.message}</p>
  if (isLoading) return <p className="p-4">A carregar...</p>
  if (!data || data.length === 0) return <p className="p-4">Não há dados</p>



  return (
    <>

      <div className='flex items-center gap-4 w-80'>
        <label htmlFor="filter" >Filtro: </label>
        <input type="text" id="filter" className='bg-purple-500 w-80 rounded-xl px-4 py-2 text-center placeholder:text-center' onChange={((e) => { setFilteredData(e.target.value) })} />

        <label htmlFor="ordenacao"></label>
        <select id="ordenacao" className='bg-purple-500 w-80 rounded-xl px-4 py-2 text-center placeholder:text-center'>
          <option value="">Ordenar por</option>
          <option value="preco-crescente">Preço Crescente</option>
          <option value="preco-decrescente">Preço Decrescente</option>
          <option value="alfabeticamente">A-Z</option>
          <option value="alfabeticamente-invertida">Z-A</option>
        </select>

      </div>


      <main className="p-4 grid grid-cols-3 gap-4">

        {data
          .filter(produto => produto.title.includes(filteredData))
          .map(product => (



            <Link key={product.id} href={`/produtos/${product.id}`} className="block">
              <article className="bg-purple-500 rounded-xl p-3 m-0 flex flex-col items-center gap-3">
                <h2 className="font-semibold text-center">{product.title}</h2>

                {product.image ? (
                  <Image
                    src={String(product.image).startsWith('http') ? String(product.image) : API + String(product.image)}
                    alt={product.title}
                    width={150}
                    height={100}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="w-[150px] h-[100px] bg-gray-200 rounded-md" />
                )}


                <p className="text-sm">Rate: {product.rating?.rate ?? '—'}</p>

                <p className="text-sm text-center line-clamp-2">{product.description}</p>


                <Button>Click me</Button>

              </article>
            </Link>
          ))}
      </main>

    </>
  )
}

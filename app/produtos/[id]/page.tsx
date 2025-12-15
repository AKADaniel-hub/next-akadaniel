'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { Produto } from '@/models/interfaces'
import { useEffect, useState } from 'react'


const API = 'https://deisishop.pythonanywhere.com'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function Page() {

  //
  // A. Estados e constantes

  // estado produto

  const [produto, setProduto] = useState<Produto | undefined>(undefined);

  //
  // B. Obter dados

  const params = useParams()
  const id = Number(params.id) // ID da URL

  console.log("id", id)
  const { data, error, isLoading } = useSWR<Produto[]>(`${API}/products`, fetcher)


  //
  // C. Efeitos


  useEffect(() => {
    if (!data) return;
    const encontrado = data.find(p => Number(p.id) === id)
    setProduto(encontrado)
    console.log("produto", encontrado)
  }, [data])

  // // Filtra pelo id
  // const produto = data.find(p => Number(p.id) === id)
  // if (!produto) return <p className="p-4">Produto não encontrado</p>


  //
  // D. Renderizacao

  if (error) return <p className="p-4">Erro: {error.message}</p>
  if (isLoading) return <p className="p-4">A carregar...</p>
  if (!data || data.length === 0) return <p className="p-4">Não há produtos</p>


  if (!produto) return <p className="p-4">Produto não encontrado</p>

  return (

    

<main className="p-4 flex flex-col gap-4 bg-white rounded">
      <h2 className="font-bold text-lg">{produto.title}</h2>

      {produto.image ? (
        <Image
          src={String(produto.image).startsWith('http') ? produto.image : API + produto.image}
          alt={produto.title}
          width={200}
          height={200}
          className="rounded"
        />
      ) : (
        <div className="w-[200px] h-[200px] bg-gray-200 rounded" />
      )}

      <p className="text-sm">{produto.description}</p>
      <p className="text-sm font-bold">Preço: {produto.price ?? '—'} €</p>
      <p className="text-sm">Avaliação: {produto.rating?.rate ?? '—'}</p>

      <Link href="/loja" className="text-blue-600 underline">
        ← Voltar
      </Link>
    </main>
    
  )
}

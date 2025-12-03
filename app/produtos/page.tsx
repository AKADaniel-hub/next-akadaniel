'use client'
import useSWR from 'swr'
import Image from 'next/image'
import { Produto } from '@/models/interfaces'

const API = 'https://deisishop.pythonanywhere.com'
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function Page() {
  const { data, error, isLoading } = useSWR<Produto[]>(`${API}/products`, fetcher)

  if (error) return <p className="p-4">Erro: {error.message}</p>
  if (isLoading) return <p className="p-4">A carregar...</p>
  if (!data || data.length === 0) return <p className="p-4">Não há dados</p>

  return (
    <main className="p-4 space-y-4">
      {data.map(produto => (
        <article key={produto.id} className="flex items-center gap-4">
          <h2 className="w-48 font-semibold">{produto.title}</h2>

          {produto.image ? (
            <Image
              src={String(produto.image).startsWith('http') ? String(produto.image) : API + String(produto.image)}
              alt={produto.title}
              width={100}
              height={100}
              className="rounded"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded" />
          )}
        </article>
      ))}
    </main>
  )
}

'use client'

import useSWR from 'swr'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Produto } from '@/models/interfaces'

const API = 'https://deisishop.pythonanywhere.com'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function Page() {
  const params = useParams()
  const rawCategoria = params?.categoria ?? ''
  const categoria = decodeURIComponent(String(rawCategoria)).toLowerCase()

  const { data, error, isLoading } = useSWR<Produto[]>(`${API}/products`, fetcher)

  if (error) return <p className="p-4">Erro: {error.message}</p>
  if (isLoading) return <p className="p-4">A carregar...</p>
  if (!data || data.length === 0) return <p className="p-4">Não há dados</p>

  // filtra produtos pela categoria (garantindo comparação em string, lowercase)
  const produtosFiltrados = data.filter((p: any) => {
    const cat = (p.category ?? '').toString().toLowerCase()
    return cat === categoria
  })

  if (produtosFiltrados.length === 0) {
    return (
      <>
        <h2 className="text-xl font-bold p-4">Produtos da categoria: {categoria}</h2>
        <p className="p-4">Nenhum produto nesta categoria.</p>
        <Link href="/categorias" className="text-blue-600 ml-4">← Voltar</Link>
      </>
    )
  }

  return (
    <>
      <h2 className="text-xl font-bold p-4">Produtos da categoria: {categoria}</h2>

      <div className="p-4 grid grid-cols-2 gap-4">
        {produtosFiltrados.map((prod: any) => (
          <article key={prod.id ?? prod.title} className="bg-white p-3 rounded shadow">
            <h3 className="font-semibold">{prod.title}</h3>

            {prod.image ? (
              <Image
                src={String(prod.image).startsWith('http') ? prod.image : API + String(prod.image)}
                alt={prod.title}
                width={150}
                height={150}
                className="mt-2 rounded"
              />
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-200 mt-2 rounded" />
            )}

            <p className="mt-2 text-sm">{prod.description}</p>
            <p className="mt-1 text-sm">Rate: {prod.rating?.rate ?? '—'}</p>

            <div className="mt-3">
              <Link href={`/produtos/${prod.id}`} className="text-blue-600">Ver produto</Link>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

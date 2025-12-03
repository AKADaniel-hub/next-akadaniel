'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const API = 'https://deisishop.pythonanywhere.com'

interface Produto {
  id: number
  title: string
  description: string
  category: string
  price?: number
  image?: string
  rating?: { rate: number; count: number }
}

export default function CategoriaPage() {
  const params = useParams()
  const categoriaIndex = Number(params?.categoria ?? 0)

  const [categorias, setCategorias] = useState<string[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // buscar categorias
        const resCat = await fetch(`${API}/categories`)
        if (!resCat.ok) throw new Error('Erro ao carregar categorias')
        const catData: string[] = await resCat.json()
        setCategorias(catData)

        // buscar produtos
        const resProd = await fetch(`${API}/products`)
        if (!resProd.ok) throw new Error('Erro ao carregar produtos')
        const prodData: Produto[] = await resProd.json()
        setProdutos(prodData)
      } catch (err: any) {
        setError(err.message ?? 'Erro')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="p-4">A carregar...</p>
  if (error) return <p className="p-4 text-red-600">Erro: {error}</p>
  if (!categorias[categoriaIndex]) return <p className="p-4">Categoria não encontrada</p>

  const categoriaNome = categorias[categoriaIndex]

  const produtosFiltrados = produtos.filter(
    p => p.category.toLowerCase() === categoriaNome.toLowerCase()
  )

  return (
    <main className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Produtos da categoria: {categoriaNome}
      </h2>

      {produtosFiltrados.length === 0 ? (
        <p>Nenhum produto nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {produtosFiltrados.map(prod => (
            <article key={prod.id} className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold">{prod.title}</h3>

              {prod.image ? (
                <img
                  src={prod.image.startsWith('http') ? prod.image : API + prod.image}
                  alt={prod.title}
                  className="w-full h-40 object-cover mt-2 rounded"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 mt-2 rounded" />
              )}

              <p className="mt-2 text-sm">{prod.description}</p>
              <p className="mt-1 text-sm font-bold">Preço: {prod.price ?? '—'} €</p>

              <Link
                href={`/produtos/${prod.id}`}
                className="text-blue-600 underline mt-2 block"
              >
                Ver produto
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link href="/categorias" className="text-blue-600 underline">
          ← Voltar para categorias
        </Link>
      </div>
    </main>
  )
}

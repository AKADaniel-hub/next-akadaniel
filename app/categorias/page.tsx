'use client'

import useSWR from "swr"
import Link from "next/link"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function Page() {

  const url = "https://deisishop.pythonanywhere.com/categories"

  const { data, error, isLoading } = useSWR<string[]>(url, fetcher)

  if (error) return <p>Erro: {error.message}</p>
  if (isLoading) return <p>A carregar...</p>
  if (!data) return <p>Não há dados</p>

  return (
    <>
      <h2 className="text-black mb-3">Categorias</h2>

      <ul className="space-y-2">
        {data.map((catg, i) => (
          <li key={i}>
            <Link href={`/categorias/${i}`} className="text-black underline">
              {catg}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

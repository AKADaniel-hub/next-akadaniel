'use client'
import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { Produto } from '@/models/interfaces'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

const API = 'https://deisishop.pythonanywhere.com'
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function Page() {

  const [filteredData, setFilteredData] = useState('')
  const [ordenacao, setOrdenacao] = useState('')
  const [cart, setCart] = useState<Produto[]>([])
  const [estudanteDEISI, setEstudanteDEISI] = useState(false)
  const [cupom, setCupom] = useState('')
  const [respostaCompra, setRespostaCompra] = useState('')

  const { data, error, isLoading } = useSWR<Produto[]>(`${API}/products`, fetcher)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const adicionarCarrinho = (produto: Produto) => {
    setCart(prev => [...prev, produto])
  }

  const removerCarrinho = (produto: Produto) => {
    setCart(prev => prev.filter((p, i) => i !== prev.findIndex(x => x.id === produto.id)))
  }

  const buy = () => {
    fetch("https://deisishop.pythonanywhere.com/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: estudanteDEISI,
        coupon: cupom
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(() => {
        setCart([])
        setRespostaCompra("Compra realizada com sucesso!")
      })
      .catch(() => {
        console.log("Erro ao comprar")
        setRespostaCompra("Erro ao comprar")
      })
  }

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0)

  if (error) return <p className="p-4">Erro: {error.message}</p>
  if (isLoading) return <p className="p-4">A carregar...</p>
  if (!data || data.length === 0) return <p className="p-4">Não há dados</p>

  return (
    <>

      {/* Filtro e Ordenação */}
      <div className='flex items-center gap-4 w-80'>
        <label htmlFor="filter">Filtro: </label>


        <input
          type="text"
          id="filter"
          className='bg-purple-500 w-80 rounded-xl px-4 py-2 text-center placeholder:text-center'
          onChange={e => setFilteredData(e.target.value)}
        />


        <select
          id="ordenacao"
          value={ordenacao}
          onChange={e => setOrdenacao(e.target.value)}
          className='bg-purple-500 w-80 rounded-xl px-4 py-2 text-center placeholder:text-center'
        >
          <option value="">Ordenar por</option>
          <option value="preco-crescente">Preço Crescente</option>
          <option value="preco-decrescente">Preço Decrescente</option>
          <option value="alfabeticamente">A-Z</option>
          <option value="alfabeticamente-invertida">Z-A</option>
        </select>


      </div>

      {/* Lista de produtos */}
      <main className="p-4 grid grid-cols-3 gap-4">
        {data
          .filter(produto => produto.title.includes(filteredData))
          .slice()
          .sort((a, b) => {
            switch (ordenacao) {
              case "preco-crescente":
                return a.price - b.price
              case "preco-decrescente":
                return b.price - a.price
              case "alfabeticamente":
                return a.title.localeCompare(b.title)
              case "alfabeticamente-invertida":
                return b.title.localeCompare(a.title)
              default: return 0
            }
          })
          .map(product => (
            <article key={product.id} className="bg-purple-500 rounded-xl p-4 flex flex-col items-center text-center h-full">
              <h2 className="font-semibold text-center">{product.title}</h2>

              <Link href={`/produtos/${product.id}`} className="flex flex-col items-center gap-3 flex-1 w-full">
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

                <p className="text-sm font-bold">Price: ${product.price}</p>
                <p className="text-sm">Rate: {product.rating?.rate ?? '—'}</p>
                <p className="text-sm text-center line-clamp-2">{product.description}</p>
              </Link>

              <Button
                className="mt-4 w-full"
                onClick={() => adicionarCarrinho(product)}
              >
                Adicionar ao carrinho
              </Button>
            </article>
          ))}
      </main>

      {/* Carrinho */}
      <div className="p-4 bg-purple-300 rounded-xl mt-6">
        <h3 className="font-bold mb-2">Carrinho</h3>

        {cart.length === 0 && <p>Carrinho vazio</p>}

        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm mb-2">
            <span className="flex-1">{item.title}</span>
            <span className="mx-2">${Number(item.price).toFixed(2)}</span>
            <button
              onClick={() => removerCarrinho(item)}
              className="text-red-600 font-bold"
            >
              ❌
            </button>
          </div>
        ))}

        <hr className="my-2" />
        <p className="font-bold text-right">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Seção de compra */}
      <section className="mt-4 p-4 bg-gray-100 rounded-xl">
        <button
          className="bg-green-600 rounded-xl m-2 p-2 text-white font-bold"
          onClick={buy}
        >
          COMPRAR
        </button>

        <div className="flex items-center gap-2 m-2">
          <label>Estudante DEISI</label>
          <input
            type="checkbox"
            checked={estudanteDEISI}
            onChange={e => setEstudanteDEISI(e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2 m-2">
          <label>Cupom de desconto:</label>
          <input
            type="text"
            value={cupom}
            onChange={e => setCupom(e.target.value)}
            className="bg-blue-300 rounded-md px-2 py-1"
            placeholder="escreva"
          />
        </div>

        {respostaCompra && (
          <p className="mt-2 text-green-700 font-bold">{respostaCompra}</p>
        )}
      </section>
    </>
  )
}

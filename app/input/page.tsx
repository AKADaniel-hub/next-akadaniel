'use client'


import { useState } from "react"
import Lista from "@/components/Lista/Lista"


export default function Page() {
  const [texto, setTexto] = useState("")
  const [selecao, setSelecao] = useState("caracteristicas")


  return (
    <main className="flex flex-col justify-center items-center p-4">
      <section className="mb-4">
        <input
          type="text"
          placeholder="Escreve algo..."
          className="bg-purple-400 p-2 rounded-xl "
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <p className="text-black mt-2">Texto digitado: {texto}</p>
      </section>


      <section className="mb-4">
        <select
          className="bg-green-400 text-black p-2 rounded-xl"
          value={selecao}
          onChange={(e) => setSelecao(e.target.value)}
        >
          <option value="caracteristicas">Caracteristicas</option>
          <option value="tecnologias">Tecnologias</option>
        </select>
        <p className="mt-2 text-black">Selecionado: {selecao}</p>
      </section>


      <Lista />
    </main>
  )
}
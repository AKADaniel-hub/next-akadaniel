'use client'

import { useEffect, useState } from "react"

export default function Relogio() {
  const [hora, setHora] = useState("")

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="bg-orange-500 p-4 rounded-xl inline-block w-[70vw]">
      <h2 className="text-purple-600 mb-2">Relógio</h2>
      <p className="text-black text-2xl font-mono">{hora}</p>
    </div>
  )
}

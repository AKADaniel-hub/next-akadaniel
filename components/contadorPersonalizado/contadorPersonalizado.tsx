'use client'

import { useState } from "react"

interface ContadorPersonalizadoProps {
  title: string
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {

  const chaveTitulo = "likes " + title

  const [likes, setLikes] = useState(0)

  function adicionarLike() {
    const novosLikes = likes + 1
    setLikes(novosLikes)
    localStorage.setItem(chaveTitulo, String(novosLikes))
  }

  return (
    <button onClick={adicionarLike}>
      {likes}
    </button>
  )
}

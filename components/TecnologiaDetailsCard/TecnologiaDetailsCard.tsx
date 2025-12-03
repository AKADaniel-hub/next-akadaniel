import Link from "next/link"

interface TecnologiaDetailsCardProps {
  title: string
  img: string
  description: string
  rating: number
}

export default function TecnologiaDetailsCard({ title, description, rating }: TecnologiaDetailsCardProps) {
  return (
    <article className="bg-yellow-500 p-6 rounded-lg shadow">
      <h2 className="font-bold text-lg">{title}</h2>
      <p>{description}</p>
      <p>Nota: {rating}/10</p>

      <Link
        href="/tecnologias"
        className="font-bold bg-yellow-700 text-white px-3 py-2 rounded-xl inline-block mt-3"
      >
        Voltar
      </Link>
    </article>
  )
}

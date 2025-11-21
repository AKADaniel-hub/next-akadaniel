import Link from "next/link"

export default function caracteristicasPage() {


    const caracteristicas = [
        'JSX, sintaxe que mistura HTML e JS.',
        'Componentes, funções que retornam JSX.',
        'Componentes Reutilizáveis e Modulares.',
        'Roteamento Automático e APIs.',
        'Hooks: useState, useEffect e useSWR.',
        'Renderização Rápida e SEO Friendly.',
        'TypeScript Seguro e Escalável.',
        'Comunidade Ativa e Popularidade.'
    ]

    return (


        <>
            <h2>/caracteristicas</h2>
            <p>esta pagina está dentro da rota "/caracteristicas"</p>

            {caracteristicas.map((caracteristicas, i) => (
                <li key={i}>
                    <Link href={`/caracteristicas/${i}`}>{caracteristicas}</Link>
                </li>
            ))}
        </>
    )
}       
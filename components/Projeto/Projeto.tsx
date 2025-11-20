import Link from "next/link"

interface ProjetoProps {
    nome: string
    url: string
}



export default function Projeto({ nome, url }: ProjetoProps) {

    return (
        <article className="
        bg-orange-500
        p-2
        m-2
        rounded-xl
        ">
            <h2>{nome}</h2>
            <p>Explore o Porjeto {nome} no seguinte&nbsp;

                <Link 
                href={url} 
                className="underline bold"
                target="_blank
                ">
                    link.
                </Link>

            </p>

        </article>
    )


}
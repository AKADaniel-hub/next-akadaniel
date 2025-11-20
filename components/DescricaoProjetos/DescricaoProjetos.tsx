import Link from 'next/link'
import Projeto from '../Projeto/Projeto';

export default function DescricaoProjetos() {
    return (
        <>
            <h2>os meus Projetos</h2>
            <p>Já fiz varios projetos html, css e javascript.</p>
            <p>visita a minha pagina&nbsp;
                <Link
                    href="https://akadaniel-hub.github.io/"
                    className='font-bold underline'
                    target='_blank'
                >
                    aqui
                </Link>
            </p>



            <Projeto
                nome="loja"
                url="https://akadaniel-hub.github.io/lab7/index.html"
            />
            <Projeto
                nome="JS"
                url="https://akadaniel-hub.github.io/lab5/index.html"
            />


        </>
    );
}   
import Image from 'next/image';
import tecnologias from '@/data/tecnologias.json';
import Link from 'next/link';



export default function tecnologia() {


    return (


        <div className="
            grid 
            grid-cols-2
            gap-4
            mt-4
            ">
            {tecnologias.map((tech, i) => (
                <>
                    <Link href={`/tecnologias/${i}`}>

                        <div key={i} className="
                        bg-emerald-200
                        p-4
                        rounded-lg
                        shadow
                    
                        h-full //terem todas o mesmo tamanho
                       ">
                            <Image className='text-black'
                                src={`/tecnologias/${tech.image}`}
                                alt={`Logotipo do ${tech.title}`}
                                width={200}
                                height={200}
                            />
                            <h3 className="font-bold mt-2 text-black">{tech.title}</h3>
                            <p className="text-sm text-stone-800">{tech.description}</p>
                            <p className="text-yellow-500">{'⭐'.repeat(tech.rating)}</p>
                        </div>
                    </Link>
                </>
            ))}
        </div>
    )
}
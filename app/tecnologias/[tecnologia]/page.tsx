'use client'

import Image from 'next/image';
import tecnologias from '@/data/tecnologias.json'
import { useParams } from 'next/navigation';

export default function TecnologiaPage() {
    const params = useParams();
    const id = Number(params.tecnologia)

    return (
        <div className='
    bg-emerald-200
    p-4
    rounded-lg
    shadow
    min-h-[90vw]
    flex
    flex-col
    items-center
    '
        >
            <h2 className='font-bold mt-2 text-black'>{tecnologias[id].title}</h2>
            <Image className='text-black '
                key={tecnologias[id].image}
                src={tecnologias[id].image}
                alt={tecnologias[id].title}
                width={200}
                height={200}
            />
            <p className='text-sm text-stone-800  p-2 m-5'>{tecnologias[id].description}</p>
            <p className="text-yellow-500">{'⭐'.repeat(tecnologias[id].rating)}</p>
        </div>
    )

}
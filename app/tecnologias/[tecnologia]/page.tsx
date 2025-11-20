'use client'

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
    '

        >
            <h2 className='font-bold mt-2 text-black'>{tecnologias[id].title}</h2>
            <p className='text-sm text-stone-800'>{tecnologias[id].description}</p>

        </div>
    )

}
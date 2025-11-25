import Link from "next/link"

interface CaracteristicaProps {
    texto: string;
}

export default function Caracteristica({ texto }: CaracteristicaProps) {

    return (

        <li className="">
        
                {texto}
            
        </li>
    )
}
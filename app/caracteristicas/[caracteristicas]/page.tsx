'use client'


import Link from "next/link";
import { useParams } from "next/navigation";

export default function CaracteristicaPage() {
  const params = useParams();
  const texto = params.texto;


  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>

        {texto}

        <div style={{ marginTop: 16 }}>

          <Link href="/caracteristicas"
            className="mt-4 px-4 py-2 bg-yelow-800 text-white rounded-lg"
          >Voltar às características</Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function CaracteristicaPage({ params }: { params: { id: string } }) {
  const id = Number(params.id); // pega o índice da URL

  const caracteristicas = [
    'JSX, sintaxe que mistura HTML e JS.',
    'Componentes, funções que retornam JSX.',
    'Componentes Reutilizáveis e Modulares.',
    'Roteamento Automático e APIs.',
    'Hooks: useState, useEffect e useSWR.',
    'Renderização Rápida e SEO Friendly.',
    'TypeScript Seguro e Escalável.',
    'Comunidade Ativa e Popularidade.'
  ];

  const caracteristica = caracteristicas[id];

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        {caracteristica ? (
          <p>{caracteristica}</p>
        ) : (
          <p>Característica não encontrada.</p>
        )}

        <div style={{ marginTop: 16 }}>
          <Link href="/caracteristicas">Voltar às características</Link>
        </div>
      </div>
    </div>
  );
}

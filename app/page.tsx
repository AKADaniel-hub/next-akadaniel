import Componente1 from "@/components/Componente1/Componente1"

export default function page() {

  //variaves
  const magia = <p>JavaScript em HTML</p>

  //renderoização
  return (
    <div>
      <h2>Viva ao next</h2>
      <p>Testando o deploy automatico</p>
      <strong>Letss gooo!</strong>
      {magia}
      <Componente1 />
      <Componente1 />
      <Componente1 />
    </div>

  )

}
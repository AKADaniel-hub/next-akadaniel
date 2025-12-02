"use client"
import { useEffect, useState } from "react"

export default function ContadorPage() {

    const [count, setCount] = useState<number>(0)
    const [historico, setHistorico] = useState<number[]>([])

    useEffect(() => {
        const savedCount = localStorage.getItem("count")
        const savedHistory = localStorage.getItem("history")

        if (savedCount) setCount(Number(savedCount))
        if (savedHistory) setHistorico(JSON.parse(savedHistory))
    }, [])

    // Guardar valores sempre que mudarem
    useEffect(() => {
        localStorage.setItem("count", String(count))
        localStorage.setItem("history", JSON.stringify(historico))
        document.title = `${count}`
    }, [count, historico])


    // Determinar cor conforme valor
    const getColor = () => {
        if (count >= 0 && count <= 3) return "text-red-500"
        if (count >= 4 && count <= 7) return "text-yellow-500"
        return "text-green-500"
    }


    // funcoes
    const incrementar = () => {
        if (count < 10) {
            const novo = count + 1
            setCount(novo)
            setHistorico([...historico, novo])
        }
    }

    const decrementar = () => {
        if (count > 0) {
            const novo = count - 1
            setCount(novo)
            setHistorico([...historico, novo])
        }
    }

    const resetar = () => {
        setCount(0)
        setHistorico([...historico, 0])
    }


    return (
        <section className="bg-blue-300 p-2 pb-4 mt-6 rounded-xl">
            <h2>Contador</h2>

            {}
            <p className={getColor()}>
                Contador vai em {count} !
            </p>

            {/* botões */}
            <button
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={incrementar}
            >
                Aumentar
            </button>

            <button
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={decrementar}
            >
                Diminuir
            </button>

            <button
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                onClick={resetar}
            >
                Reset
            </button>

// nao sei se é supsoto fazer o historico desta forma ou como foi feito na aula-next-3
            {}
            <ul className="mt-3">
                {historico.map((n, i) => (
                    <li key={i}>{n}</li>
                ))}
            </ul>
        </section>
    )
}

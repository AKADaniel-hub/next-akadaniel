

'use client'


import { useState } from "react"


export default function Lista() {
    const [listaTarefas, setListaTarefas] = useState<string[]>([])
    const [novaTarefa, setNovaTarefa] = useState("")


    const adicionarTarefa = () => {
        if (novaTarefa.trim() === "") return
        setListaTarefas([...listaTarefas, novaTarefa])
        setNovaTarefa("")
    }


    const apagarTarefa = (nome: string) => {
        setListaTarefas(listaTarefas.filter((tarefa) => tarefa !== nome))
    }


    return (
        <div className="w-full max-w-md">
            <h2 className="text-purple-600 mb-2">Lista de Tarefas</h2>
            <div className="flex mb-2 gap-2">
                <input
                    type="text"
                    className="flex-1 bg-purple-400 p-2 rounded-xl"
                    placeholder="Nova tarefa"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                />
                <button onClick={adicionarTarefa} className="bg-blue-300 p-2 rounded-xl">
                    Adicionar
                </button>
            </div>
            <ul>
                {listaTarefas.map((elem, i) => (
                    <li key={i} className="flex justify-between items-center bg-emerald-300 text-black p-2 mb-1 rounded">
                        <span>{elem}</span>
                        <button
                            onClick={() => apagarTarefa(elem)}
                            className="bg-blue-500 text-white p-1 rounded"
                        >
                            Apagar
                        </button>
                    </li>
                ))}
                {listaTarefas.length === 0 && <li className="text-gray-500 italic">Nenhuma tarefa adicionada</li>}
            </ul>
        </div>
    )
}
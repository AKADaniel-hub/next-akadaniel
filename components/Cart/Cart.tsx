'use client'
import { useState, useEffect } from "react"
import { Produto } from "@/models/interfaces"

export default function Cart() {
    const [cart, setCart] = useState<Produto[]>([])

    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        setCart(storedCart)
    }


    
    useEffect(() => {
        loadCart()
        window.addEventListener("cartUpdated", loadCart)
        return () => window.removeEventListener("cartUpdated", loadCart)
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    function removerCarrinho(produto: Produto) {
        const cartData = localStorage.getItem("cart")
        const cart: Produto[] = cartData ? JSON.parse(cartData) : []

        const novoCart = cart.filter((p: Produto) => p.id !== produto.id)

        localStorage.setItem("cart", JSON.stringify(novoCart))

        setCart(novoCart)

        window.dispatchEvent(new Event("cartUpdated"))
    }

    const total = cart.reduce((acc, item) => acc + Number(item.price), 0)

    return (
        <div className="p-4 bg-purple-300 rounded-xl mt-6">
            <h3 className="font-bold mb-2">Carrinho</h3>

            {cart.length === 0 && <p>Carrinho vazio</p>}

            {/* está a remover todos com o mesmo id ,-, */}
            {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm mb-2">
                    <span className="flex-1">{item.title}</span>
                    <span className="mx-2">${Number(item.price).toFixed(2)}</span>
                    <button
                        onClick={() => removerCarrinho(item)}
                        className="text-red-600 font-bold"
                    >
                        ❌
                    </button>
                </div>
            ))}

            <hr className="my-2" />
            <p className="font-bold text-right">Total: ${total.toFixed(2)}</p>
        </div>
    )
}

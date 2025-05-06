"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

interface IData {
    name: string
    image: string
}

const HookPage = () => {
    const [characters, setCharacters] = useState<IData[] | undefined>(undefined) // Permitir undefined

    useEffect(() => {
        const load = async () => {
            const res = await fetch("https://api.disneyapi.dev/character")
            const data = await res.json()
            setCharacters(data.results) // Dados da API
        }
        load()
    }, [])

    return (
        <>
            <h1>Hook Page</h1>
            <div>
                {/* Verificando se `characters` é um array antes de chamar .map() */}
                {characters ? (
                    characters.length > 0 ? (
                        characters.map((item, index) => (
                            <div key={index}>
                                <h2>{item.name}</h2>
                                <Image src={item.image} alt={item.name} width={200} height={200} />
                            </div>
                        ))
                    ) : (
                        <p>No characters found.</p>
                    )
                ) : (
                    <p>Loading characters...</p> // Exibe enquanto `characters` ainda estiver indefinido
                )}
            </div>
        </>
    )
}

export default HookPage

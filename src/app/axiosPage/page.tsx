"use client"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import { api } from "../services/api" // ajuste o caminho se necessário

interface IData {
    name: string
    imageUrl: string
    films?: string[]
    sourceUrl?: string
}

const AxiosPage = () => {
    const [data, setData] = useState<IData[]>([])

    useEffect(() => {
        api.get("/character")
            .then((res: any) => {
                console.log("API data:", res.data.data)
                setData(res.data.data)
            })
            .catch((error) => {
                console.error("Erro ao buscar dados da API", error)
            })
    }, [])

    return (
        <>
            <h1>Axios page client side</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="flex flex-wrap gap-6 justify-center">
                {Array.isArray(data) && data.map((item, index) => (
                    <div key={index} className="my-6">
                        <h2>{item.name}</h2>
                        {item.imageUrl && (
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={200}
                                height={200}
                            />
                        )}
                        {item.films?.length > 0 && (
                            <p><strong>Filmes:</strong> {item.films.join(", ")}</p>
                        )}
                        {item.sourceUrl && (
                            <p>
                                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                                    Fonte oficial
                                </a>
                            </p>
                        )}
                    </div>
                ))}
                </div>
            </Suspense>
        </>
    )
}

export default AxiosPage

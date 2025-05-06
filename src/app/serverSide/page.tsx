import { Metadata } from "next"

type IData = {
    results: {
        name: string
        status: string
        id: string
    }[] | null // Pode ser null se não houver dados aq
}

export const metadata: Metadata = {
    title: "Lista de Personagens da Disney",
    description: "teste com consumo de api"
}

const ServerSide = async () => {

    const res = await fetch("https://api.disneyapi.dev/character")
    const data: IData = await res.json()
    
    return (
        <>
            <div>Server side page</div>
            {/* Verificando se `results` está disponível e contém itens */}
            {data?.results?.length ? (
                data.results.map((item, index) => (
                    <div key={index}>
                        <h1>{item.name}</h1>
                        <h2>{item.id}</h2>
                        <p>{item.status}</p>
                    </div>
                ))
            ) : (
                <p>Ainda carregando ou o personagem ainda não foi encontrado...</p> // Mensagem de fallback
            )}
        </>
    )
}

export default ServerSide

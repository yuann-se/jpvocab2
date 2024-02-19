import { IPostWord } from "./route"

export async function createWord({ writing, reading, translation }: IPostWord) {
    const response = await fetch('/api/word', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            writing,
            reading,
            translation,
        })
    })

    const data = await response.json()

    if (!response.ok || data.error) {
        throw new Error(data.error)
    }

    return data
}

export async function deleteWord(id: number) {
    const response = await fetch('/api/word', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })

    const data = await response.json()

    if (!response.ok || data.error) {
        throw new Error(JSON.stringify(data.error))
    }

    return data
}
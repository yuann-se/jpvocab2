'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'


export interface IWord {
    id: number,
    writing: string[],
    reading: string[],
    translation: string[],
    completePercent: number,
    isLearned: boolean,
    userId: number
}

export interface IWordsContext {
    words: IWord[] | null,
    setWords: React.Dispatch<React.SetStateAction<IWord[] | null>>
}

export const WordsContext = createContext<IWordsContext>({
    words: [],
    setWords: () => { }
})

function WordsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [words, setWords] = useState<IWord[] | null>(null)

    useEffect(() => {
        const getWords = async () => {
            try {
                const response = await fetch('/api/word', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await response.json()

                setWords(data.words)

            } catch (error) {
                console.error(error)
            }
        }

        getWords()
    }, [])

    return (
        <WordsContext.Provider value={{ words, setWords }}>
            {children}
        </WordsContext.Provider>
    )
}

export const useWordsContext = () => useContext(WordsContext)

export default WordsProvider
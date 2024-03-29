'use client'
import { getWords } from '@/app/api/word/handlers'
import React, { createContext, useContext, useEffect, useState } from 'react'


export interface IWord {
    id: number,
    createdAt: Date,
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
        getWords()
            .then(res => setWords(res))
            .catch(err => console.error(err))
    }, [])

    return (
        <WordsContext.Provider value={{ words, setWords }}>
            {children}
        </WordsContext.Provider>
    )
}

export const useWordsContext = () => useContext(WordsContext)

export default WordsProvider
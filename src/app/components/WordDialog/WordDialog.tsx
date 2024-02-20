'use client'
import React, { useEffect, useState } from 'react'
import { IWord, useWordsContext } from '../providers/WordsProvider'
import { createWord, deleteWord } from '../../api/word/handlers'
import WordDialogContent from './WordDialogContent'
import DeleteDialog from './DeleteDialog'


interface IProps {
    open: boolean,
    onClose: () => void,
    variant: 'create' | 'edit',
    word?: IWord | null
}

enum EArrayNames {
    writings = 'writings',
    readings = 'readings',
    translations = 'translations'
}

export interface IWordValues {
    writings: IWord['writing'],
    readings: IWord['reading'],
    translations: IWord['translation'],
}

export interface IFieldValues {
    selectedWriting: string,
    selectedReading: string,
    selectedTranslation: string
}

function WordDialog({ open, onClose, variant, word }: IProps) {

    const [wordValues, setWordValues] = useState<IWordValues>({
        writings: word?.writing || [],
        readings: word?.reading || [],
        translations: word?.translation || []
    })

    const [fieldValues, setFieldValues] = useState<IFieldValues>({
        selectedWriting: '',
        selectedReading: '',
        selectedTranslation: ''
    })

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const { setWords } = useWordsContext()

    useEffect(() => {
        if (open && !!word) {
            setWordValues({
                writings: word?.writing,
                readings: word?.reading,
                translations: word?.translation
            })

            setFieldValues({
                selectedWriting: '',
                selectedReading: '',
                selectedTranslation: ''
            })
        }
    }, [open])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSave = async () => {
        try {
            await createWord({
                writing: wordValues.writings,
                reading: wordValues.readings,
                translation: wordValues.translations
            })
            onClose()

        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        if (!word) return
        setisLoading(true)
        try {
            await deleteWord(word.id)
            setIsDeleteDialogOpen(false)
            onClose()
            setWords(prev => {
                if (prev) {
                    return prev.filter(w => w.id !== word.id)
                }
                return prev
            })
        } catch (error) {
            console.error(error)
        } finally {
            setisLoading(false)
        }
    }

    const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        const target = e.target as HTMLInputElement
        if (!fieldValues[target.name as keyof IFieldValues]) return
        const arrayName = target.dataset.arrayName as EArrayNames
        if (!arrayName) return
        setWordValues(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], target.value]
        }))
    }

    const handleRemove = (e: React.MouseEvent<SVGElement>) => {
        const { parentElement } = e.target as SVGElement
        const arrayName = parentElement?.dataset.arrayName as EArrayNames
        if (!arrayName) return
        const value = parentElement?.innerText
        setWordValues(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter(text => text !== value)
        }))
    }

    return (
        <>
            <DeleteDialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                handleDelete={handleDelete}
            />

            <WordDialogContent
                open={open}
                onClose={onClose}
                variant={variant}
                wordValues={wordValues}
                fieldValues={fieldValues}
                handleChange={handleChange}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                handleSave={handleSave}
                openDeleteDialog={() => setIsDeleteDialogOpen(true)}
            />
        </>
    )
}

export default WordDialog
'use client'
import React, { useEffect, useState } from 'react'
import { IWord, useWordsContext } from '../providers/WordsProvider'
import { createWord, deleteWord, updateWord } from '../../api/word/handlers'
import WordDialogContent from './WordDialogContent'
import DeleteDialog from './DeleteDialog'


interface ICommonProps {
    open: boolean,
    onClose: () => void,
}

type TVariantProps = {
    variant: 'create',
    word: never
} | {
    variant: 'edit',
    word: IWord
}

type IProps = ICommonProps & TVariantProps

export enum EArrayNames {
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

    const handleCreate = async () => {
        setisLoading(true)

        const writings = [...wordValues.writings]
        const readings = [...wordValues.readings]
        const translations = [...wordValues.translations]

        const writingInputValue = fieldValues.selectedWriting.trim()
        const readingInputValue = fieldValues.selectedReading.trim()
        const trnaslationInputValue = fieldValues.selectedTranslation.trim()

        if (writingInputValue) writings.push(writingInputValue)
        if (readingInputValue) readings.push(readingInputValue)
        if (trnaslationInputValue) translations.push(trnaslationInputValue)

        try {
            const newWord = await createWord({
                writing: writings,
                reading: readings,
                translation: translations
            })
            setWords(prev => [...(prev ?? []), newWord])
            onClose()

        } catch (error) {
            console.error(error)
        } finally {
            setisLoading(false)
        }
    }

    const handleSave = async () => {
        setisLoading(true)

        const writings = [...wordValues.writings]
        const readings = [...wordValues.readings]
        const translations = [...wordValues.translations]

        const writingInputValue = fieldValues.selectedWriting.trim()
        const readingInputValue = fieldValues.selectedReading.trim()
        const trnaslationInputValue = fieldValues.selectedTranslation.trim()

        if (writingInputValue) writings.push(writingInputValue)
        if (readingInputValue) readings.push(readingInputValue)
        if (trnaslationInputValue) translations.push(trnaslationInputValue)

        try {
            const updatedWord = await updateWord({
                id: word.id,
                writing: writings,
                reading: readings,
                translation: translations
            })
            setWords(prev => {
                if (prev) {
                    const oldWordIndex = prev.findIndex(w => w.id === word.id)
                    prev[oldWordIndex] = updatedWord
                }
                return prev
            })
            onClose()

        } catch (error) {
            console.error(error)
        } finally {
            setisLoading(false)
        }
    }

    const handleDelete = async () => {
        setisLoading(true)
        setIsDeleteDialogOpen(false)
        try {
            await deleteWord(word.id)
            setWords(prev => {
                if (prev) {
                    return prev.filter(w => w.id !== word.id)
                }
                return prev
            })
            onClose()

        } catch (error) {
            console.error(error)
        } finally {
            setisLoading(false)
        }
    }

    const handleAdd = (arrayName: EArrayNames) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return
        const target = e.target as HTMLInputElement
        const newValue = fieldValues[target.name as keyof IFieldValues]?.trim()
        if (!newValue) return
        if (wordValues[arrayName].includes(target.value)) return

        setWordValues(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], target.value]
        }))

        setFieldValues(prev => ({
            ...prev,
            [target.name]: ''
        }))
    }

    const handleRemove = (arrayName: EArrayNames, value: string) =>
        (e: React.MouseEvent<SVGElement>) => {
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
                isLoading={isLoading}
                variant={variant}
                wordValues={wordValues}
                fieldValues={fieldValues}
                handleChange={handleChange}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                handleCreate={handleCreate}
                handleSave={handleSave}
                openDeleteDialog={() => setIsDeleteDialogOpen(true)}
            />
        </>
    )
}

export default WordDialog
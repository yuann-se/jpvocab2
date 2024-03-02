'use client'
import { getPreferences } from "@/app/api/user/preferences/handlers"
import { createContext, useContext, useEffect, useState } from "react"


interface IPreferences {
    sortField: 'createdAt' | 'writing' | 'reading' | 'translation' | 'completePercent',
    sortDirection: 'asc' | 'desc',
    createButtonPosition: { x: number, y: number }
}

export interface IPreferencesContext {
    preferences: IPreferences | null,
    setPreferences: React.Dispatch<React.SetStateAction<IPreferences | null>>
}

export const PreferencesContext = createContext<IPreferencesContext>({
    preferences: null,
    setPreferences: () => { }
})

function PreferencesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [preferences, setPreferences] = useState<IPreferences | null>(null)

    useEffect(() => {
        getPreferences()
            .then(res => setPreferences(res))
            .catch(err => console.error(err))
    }, [])

    return (
        <PreferencesContext.Provider value={{
            preferences: preferences,
            setPreferences: setPreferences
        }}
        >
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferencesContext = () => useContext(PreferencesContext)

export default PreferencesProvider
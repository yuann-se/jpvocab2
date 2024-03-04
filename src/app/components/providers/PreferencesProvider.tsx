'use client'
import { getPreferences, updatePreferences } from "@/app/api/user/preferences/handlers"
import { createContext, useCallback, useContext, useEffect, useState } from "react"


interface ICreateButtonPosition {
    x: number,
    y: number,
}
export interface IPreferences {
    id: number
    sortField: 'createdAt' | 'writing' | 'reading' | 'translation' | 'completePercent',
    sortDirection: 'asc' | 'desc',
    createButtonPosition: ICreateButtonPosition
}

type TUpdateData = Partial<Pick<IPreferences, "sortField" | "sortDirection" | "createButtonPosition">>
export interface IPreferencesContext {
    preferences: IPreferences | null,
    updatePreferences: (data: TUpdateData) => Promise<void>
}


export const PreferencesContext = createContext<IPreferencesContext>({
    preferences: null,
    updatePreferences: async () => { }
})

function PreferencesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [preferences, setPreferences] = useState<IPreferences | null>(null)

    const handlePreferencesUpdate = useCallback(async (data: TUpdateData) => {
        if (!preferences) return
        try {
            const updated = await updatePreferences({ ...preferences, ...data })
            setPreferences(updated)
        } catch (error) {
            console.error(error)
        }
    }, [preferences])

    useEffect(() => {
        getPreferences()
            .then(res => setPreferences(res))
            .catch(err => console.error(err))
    }, [])

    return (
        <PreferencesContext.Provider value={{
            preferences: preferences,
            updatePreferences: handlePreferencesUpdate
        }}
        >
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferencesContext = () => useContext(PreferencesContext)

export default PreferencesProvider
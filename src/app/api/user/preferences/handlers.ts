import { IPreferences } from "@/app/components/providers/PreferencesProvider"

export async function getPreferences() {
    const response = await fetch('/api/user/preferences', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json()

    if (!response.ok || data.error) {
        throw data.error
    }

    const { preferences } = data
    preferences.createButtonPosition = JSON.parse(preferences.createButtonPosition)
    return preferences
}

export async function updatePreferences(prefs: IPreferences) {
    const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prefs)
    })

    const data = await response.json()

    if (!response.ok || data.error) {
        throw data.error
    }

    const { preferences } = data
    preferences.createButtonPosition = JSON.parse(preferences.createButtonPosition)
    return preferences
}

export async function getPreferences() {
    const response = await fetch('/api/user/preferences', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json()

    if (!response.ok || data.error) {
        throw new Error(data.error)
    }

    return data.preferences
}
export async function createUser({ email, password }: { email: string, password: string }) {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })

    const data = await response.json()

    if (!response.ok || data.error) {
        throw data.error
    }
}
import { useState } from 'react'
import { useRouter } from 'next/router'

import s from '../styles/login.module.css'

export default function Login() {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        const body = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value,
        }
        try {
            const call = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const response = await call.json()
            if (response.authorized) {
                router.push('/')
            } else {
                setErrorMsg('Not authorized')
            }
        } catch (error) {
            console.error('An unexpected error happened:', error)
            setErrorMsg('An unexpected error happened: ' + error)

        }
    }

    return (
        <div>
            <form className={s.form} onSubmit={handleSubmit}>
                <label>
                    <span>Username</span>
                    <input type="text" name="username" required />
                    <span>Password</span>
                    <input type="password" name="password" required />
                </label>

                <button type="submit">Login</button>

                {errorMsg && <p className={s.error}>{errorMsg}</p>}
            </form>
        </div>
    )
}
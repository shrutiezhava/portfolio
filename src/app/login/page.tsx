
import { Metadata } from 'next'
import LoginForm from './login-form'

export const metadata: Metadata = {
    title: 'Login | Portfolio',
    description: 'Login to access the dashboard',
}

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl dark:bg-zinc-900 border dark:border-zinc-800">
                <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}

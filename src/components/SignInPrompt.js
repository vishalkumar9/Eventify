import Link from 'next/link'

export default function SignInPrompt({ title = "Sign In Required", message = "Please sign in to continue." }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="space-y-4">
          <Link href="/sign-in">
            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Sign In
            </button>
          </Link>

          <Link href="/sign-up">
            <button className="w-full bg-[#6c47ff] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5a3dd9] transition-colors">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
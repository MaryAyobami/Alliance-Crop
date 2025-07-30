import SignUpForm from "@/components/auth/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 text-green-200">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M20 80 Q50 20 80 80" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 w-24 h-24 text-green-200">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
      <SignUpForm />
    </div>
  )
}

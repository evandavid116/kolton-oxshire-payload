'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().trim().email('Please enter a valid email').max(255),
})

export default function NewBelieverForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const result = emailSchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }
    setError('')
    setSubscribed(true)
  }

  return (
    <div className="bg-card border-2 border-accent/30 rounded-lg p-8 sm:p-10 text-center">
      <Download className="w-12 h-12 text-accent mx-auto mb-4" />
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
        Free New Believers <span className="text-accent">Guide</span>
      </h2>
      <p className="font-body text-foreground/70 mb-8 max-w-lg mx-auto">
        Subscribe to our newsletter and get the New Believers Guide — a free resource to help you
        start your journey with Jesus on the right foot.
      </p>

      {subscribed ? (
        <div>
          <p className="font-body text-accent font-semibold text-lg mb-4">
            Thank you for subscribing! God bless you! 🙏
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-wider rounded-sm hover:brightness-110 transition-all duration-300 gold-glow"
          >
            <Download className="w-4 h-4" />
            Download Guide
          </a>
        </div>
      ) : (
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors duration-200"
            />
            {error && <p className="text-patriot-red text-xs font-body mt-1 text-left">{error}</p>}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-wider rounded-sm hover:brightness-110 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}

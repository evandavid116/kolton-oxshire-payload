'use client'

import { useState } from 'react'
import { z } from 'zod'

const bookingSchema = z.object({
  fullName: z.string().trim().min(1, 'Name is required').max(100),
  churchWebsite: z.string().trim().url('Please enter a valid URL').max(255),
  churchAddress: z.string().trim().min(1, 'Church address is required').max(300),
  serviceType: z.string().trim().min(1, 'Service type is required').max(200),
  seatCount: z.string().trim().min(1, 'Seat count is required').max(50),
  pastorInviteConfirm: z.literal(true, {
    errorMap: () => ({ message: 'Only pastoral invitations are accepted' }),
  }),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(1, 'Phone number is required').max(30),
  denomination: z.string().trim().min(1, 'Denomination is required').max(150),
  twoChurches: z.string().trim().min(1, 'Please name 2 churches').max(500),
  liveStreamDetails: z.string().trim().min(1, 'Live-streaming details are required').max(2000),
  additionalInfo: z.string().trim().max(2000).optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const initialForm: BookingFormData = {
  fullName: '',
  churchWebsite: '',
  churchAddress: '',
  serviceType: '',
  seatCount: '',
  pastorInviteConfirm: false as unknown as true,
  email: '',
  phone: '',
  denomination: '',
  twoChurches: '',
  liveStreamDetails: '',
  additionalInfo: '',
}

interface BookingSectionProps {
  eyebrow?: string
  heading?: string
  description?: string
}

export default function BookingForm({
  eyebrow = 'Book Kolton',
  heading = 'Interested in Having Kolton Oxshire Minister at Your Church?',
  description = 'To request that Kolton Oxshire come to your church, we require a head pastoral invitation. Please fill out the form below with all required information to be considered.',
}: BookingSectionProps) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = bookingSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string
        if (!fieldErrors[key]) fieldErrors[key] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setSubmitting(true)
    try {
      // POST to Payload FormSubmissions collection REST API
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setErrors({ _form: 'Something went wrong. Please try again.' })
      }
    } catch {
      setErrors({ _form: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="booking" className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Thank <span className="text-accent">You!</span>
            </h2>
            <p className="font-body text-foreground/80 text-lg">
              Your request has been received. We will review your submission and get back to you
              soon. God bless!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-3">
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {heading}
            </h2>
            <p className="font-body text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors._form && (
              <p className="text-patriot-red text-sm font-body">{errors._form}</p>
            )}
            <FormField
              label="What is your first and last name?"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />
            <FormField
              label="What is the URL to your church website?"
              name="churchWebsite"
              value={form.churchWebsite}
              onChange={handleChange}
              error={errors.churchWebsite}
              placeholder="https://yourchurch.com"
              required
            />
            <FormField
              label="What is the address to the church?"
              name="churchAddress"
              value={form.churchAddress}
              onChange={handleChange}
              error={errors.churchAddress}
              required
            />
            <FormField
              label="What type of service is it?"
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              error={errors.serviceType}
              required
            />
            <FormField
              label="How many seats are there in that church?"
              name="seatCount"
              value={form.seatCount}
              onChange={handleChange}
              error={errors.seatCount}
              required
            />

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="pastorInviteConfirm"
                  checked={form.pastorInviteConfirm as unknown as boolean}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-border bg-card text-accent"
                />
                <span className="font-body text-foreground/90 text-sm">
                  I confirm this is a pastoral invitation.{' '}
                  <span className="text-patriot-red">*</span>
                </span>
              </label>
              {errors.pastorInviteConfirm && (
                <p className="text-patriot-red text-xs font-body mt-1">
                  {errors.pastorInviteConfirm}
                </p>
              )}
            </div>

            <FormField
              label="What's your email?"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <FormField
              label="A good phone number to reach you?"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
            <FormField
              label="What denomination is your church?"
              name="denomination"
              value={form.denomination}
              onChange={handleChange}
              error={errors.denomination}
              required
            />
            <FormField
              label="Name 2 churches that believe the same as your church."
              name="twoChurches"
              value={form.twoChurches}
              onChange={handleChange}
              error={errors.twoChurches}
              required
            />
            <FormTextarea
              label="In great detail, please describe what you use currently for live-streaming services."
              name="liveStreamDetails"
              value={form.liveStreamDetails}
              onChange={handleChange}
              error={errors.liveStreamDetails}
              required
            />
            <FormTextarea
              label="Is there anything additional we need to know?"
              name="additionalInfo"
              value={form.additionalInfo || ''}
              onChange={handleChange}
              error={errors.additionalInfo}
            />

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-4 bg-accent text-accent-foreground font-body font-bold text-sm uppercase tracking-wider rounded-sm hover:brightness-110 transition-all duration-300 gold-glow disabled:opacity-50"
              >
                {submitting ? 'Submitting…' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// ── Reusable form primitives ────────────────────────────────────────────────

interface FormFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  type?: string
  placeholder?: string
}

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-foreground/90 mb-2">
        {label} {required && <span className="text-patriot-red">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-card border border-border rounded-sm font-body text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors duration-200"
      />
      {error && <p className="text-patriot-red text-xs font-body mt-1">{error}</p>}
    </div>
  )
}

interface FormTextareaProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
}

function FormTextarea({ label, name, value, onChange, error, required }: FormTextareaProps) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-foreground/90 mb-2">
        {label} {required && <span className="text-patriot-red">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full px-4 py-3 bg-card border border-border rounded-sm font-body text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors duration-200 resize-y"
      />
      {error && <p className="text-patriot-red text-xs font-body mt-1">{error}</p>}
    </div>
  )
}

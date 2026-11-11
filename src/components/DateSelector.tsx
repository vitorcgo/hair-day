import { PiCalendarBlank, PiCaretDown } from 'react-icons/pi'
import type { ChangeEvent } from 'react'

type DateSelectorProps = {
  id: string
  label: string
  value: string
  onChange: (date: string) => void
  hideLabel?: boolean
  error?: string
}

export function DateSelector({ id, label, value, onChange, hideLabel = false, error }: DateSelectorProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <div className="min-w-0">
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'mb-2 block text-title-md'}>
        {label}
      </label>
      <div className="form-control relative">
        <PiCalendarBlank size={20} className="shrink-0 text-accent" aria-hidden="true" />
        <input
          id={id}
          name={id}
          type="date"
          required
          value={value}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <PiCaretDown size={16} className="pointer-events-none absolute right-3 text-muted" aria-hidden="true" />
      </div>
      {error && <p id={`${id}-error`} className="mt-2 text-sm/5 text-notice">{error}</p>}
    </div>
  )
}

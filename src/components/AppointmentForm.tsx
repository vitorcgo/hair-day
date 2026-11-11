import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { PiUserSquare } from 'react-icons/pi'
import { periods } from '../data/periods'
import { getLocalDate, isValidDate } from '../utils/date'
import type { AppointmentInput } from '../types/appointment'
import { DateSelector } from './DateSelector'

type AppointmentFormProps = {
  onAddAppointment: (appointment: AppointmentInput) => void
}

type FormErrors = Partial<Record<'date' | 'time' | 'clientName', string>>

export function AppointmentForm({ onAddAppointment }: AppointmentFormProps) {
  const [date, setDate] = useState(getLocalDate)
  const [time, setTime] = useState('')
  const [clientName, setClientName] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: FormErrors = {}

    if (!isValidDate(date)) nextErrors.date = 'Selecione uma data válida.'
    if (!periods.some((period) => period.times.includes(time))) {
      nextErrors.time = 'Selecione um dos horários disponíveis.'
    }
    if (!clientName.trim()) nextErrors.clientName = 'Informe o nome do cliente.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onAddAppointment({ date, time, clientName: clientName.trim() })
    setClientName('')
    setTime('')
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setClientName(event.target.value)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 lg:gap-8">
      <DateSelector id="appointment-date" label="Data" value={date} onChange={setDate} error={errors.date} />

      <fieldset aria-describedby={errors.time ? 'time-error' : undefined}>
        <legend className="mb-2 text-title-md">Horários</legend>
        <div className="flex flex-col gap-3">
          {periods.map((period) => (
            <div key={period.id}>
              <p className="mb-2 text-sm/5 text-muted" id={`time-${period.id}`}>{period.label}</p>
              <div role="group" aria-labelledby={`time-${period.id}`} className="grid grid-cols-4 gap-2">
                {period.times.map((slot) => (
                  <label key={slot}>
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="appointment-time"
                      value={slot}
                      checked={time === slot}
                      onChange={() => setTime(slot)}
                      required
                      aria-invalid={Boolean(errors.time)}
                      aria-describedby={errors.time ? 'time-error' : undefined}
                    />
                    <span className="time-slot">{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errors.time && <p id="time-error" className="mt-2 text-sm/5 text-notice">{errors.time}</p>}
      </fieldset>

      <div>
        <label htmlFor="client-name" className="mb-2 block text-title-md">Cliente</label>
        <div className="form-control">
          <PiUserSquare size={20} className="shrink-0 text-accent" aria-hidden="true" />
          <input
            id="client-name"
            name="clientName"
            type="text"
            autoComplete="name"
            placeholder="Nome do cliente"
            required
            value={clientName}
            onChange={handleNameChange}
            aria-invalid={Boolean(errors.clientName)}
            aria-describedby={errors.clientName ? 'client-name-error' : undefined}
          />
        </div>
        {errors.clientName && <p id="client-name-error" className="mt-2 text-sm/5 text-notice">{errors.clientName}</p>}
      </div>

      {Object.keys(errors).length > 0 && (
        <p role="alert" className="sr-only">Confira os campos indicados antes de agendar.</p>
      )}
      <button type="submit" className="primary-button -mt-2">AGENDAR</button>
    </form>
  )
}

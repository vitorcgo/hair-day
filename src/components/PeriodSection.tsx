import type { Period } from '../data/periods'
import type { Appointment } from '../types/appointment'
import { AppointmentItem } from './AppointmentItem'

type PeriodSectionProps = {
  period: Period
  appointments: Appointment[]
  onDeleteAppointment: (id: string) => void
}

export function PeriodSection({ period, appointments, onDeleteAppointment }: PeriodSectionProps) {
  const Icon = period.icon

  return (
    <section aria-labelledby={`period-${period.id}`} className="overflow-hidden rounded-lg border border-divider">
      <header className="flex items-center gap-3 border-b border-divider px-3 py-3 sm:px-5">
        <Icon size={24} className="shrink-0 text-accent" aria-hidden="true" />
        <h3 id={`period-${period.id}`} className="flex-1 text-base/6">{period.label}</h3>
        <span className="shrink-0 text-sm/5 text-muted">{period.range}</span>
      </header>
      {appointments.length > 0 ? (
        <ul className="px-3 py-3 sm:px-5 sm:py-4">
          {appointments.map((appointment) => (
            <AppointmentItem key={appointment.id} appointment={appointment} onDelete={onDeleteAppointment} />
          ))}
        </ul>
      ) : (
        <p className="px-4 py-6 text-center text-sm/5 text-muted sm:px-5 sm:py-7">
          Você ainda não tem agendamentos cadastrados nesse período.
        </p>
      )}
    </section>
  )
}

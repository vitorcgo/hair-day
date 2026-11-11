import { periods } from '../data/periods'
import type { Appointment } from '../types/appointment'
import { DateSelector } from './DateSelector'
import { PeriodSection } from './PeriodSection'

type AppointmentListProps = {
  appointments: Appointment[]
  selectedDate: string
  onDateChange: (date: string) => void
  onDeleteAppointment: (id: string) => void
}

export function AppointmentList({ appointments, selectedDate, onDateChange, onDeleteAppointment }: AppointmentListProps) {
  return (
    <main id="agenda" tabIndex={-1} aria-labelledby="agenda-title" className="min-w-0 px-2 py-8 sm:px-6 sm:py-10 md:pt-24 lg:px-10 xl:px-12 2xl:px-20">
      <div className="mx-auto max-w-175">
        <header className="mb-6 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 id="agenda-title" className="text-[1.75rem] leading-tight font-bold text-strong xl:text-title-lg xl:leading-tight">Sua agenda</h2>
            <p className="mt-3 text-sm/5 text-muted">Consulte os seus cortes de cabelo agendados por dia</p>
          </div>
          <DateSelector id="agenda-date" label="Data da agenda" hideLabel value={selectedDate} onChange={onDateChange} />
        </header>

        <div className="flex flex-col gap-3">
          {periods.map((period) => (
            <PeriodSection
              key={period.id}
              period={period}
              appointments={appointments.filter((appointment) => period.times.includes(appointment.time))}
              onDeleteAppointment={onDeleteAppointment}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

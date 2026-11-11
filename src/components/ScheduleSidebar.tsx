import { PiScissors } from 'react-icons/pi'
import { AppointmentForm } from './AppointmentForm'
import type { AppointmentInput } from '../types/appointment'

type ScheduleSidebarProps = {
  onAddAppointment: (appointment: AppointmentInput) => void
}

export function ScheduleSidebar({ onAddAppointment }: ScheduleSidebarProps) {
  return (
    <aside aria-labelledby="new-appointment-title" className="relative min-w-0 rounded-xl bg-panel px-5 pt-22 pb-8 sm:px-8 md:px-7 md:py-24 lg:px-10 xl:px-12 2xl:px-20">
      <div className="absolute top-0 left-0 flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-slot px-6 py-3 text-xl/6 text-accent">
        <span>HairDay</span>
        <PiScissors size={20} aria-hidden="true" />
      </div>
      <div className="mx-auto max-w-md md:max-w-85">
        <h1 id="new-appointment-title" className="text-2xl/8 font-bold text-strong">Agende um atendimento</h1>
        <p className="mt-2 text-sm/5 text-muted">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
        <AppointmentForm onAddAppointment={onAddAppointment} />
      </div>
    </aside>
  )
}

import { PiTrash } from 'react-icons/pi'
import type { Appointment } from '../types/appointment'

type AppointmentItemProps = {
  appointment: Appointment
  onDelete: (id: string) => void
}

export function AppointmentItem({ appointment, onDelete }: AppointmentItemProps) {
  return (
    <li className="flex min-h-11 items-center gap-2 py-1 text-base/6 sm:gap-4">
      <time dateTime={`${appointment.date}T${appointment.time}`} className="shrink-0 font-bold text-body">{appointment.time}</time>
      <span className="min-w-0 flex-1 wrap-anywhere">{appointment.clientName}</span>
      <button
        type="button"
        className="flex size-11 shrink-0 items-center justify-center rounded text-accent hover:bg-slot-hover"
        onClick={() => onDelete(appointment.id)}
        aria-label={`Excluir agendamento de ${appointment.clientName} às ${appointment.time}`}
      >
        <PiTrash size={20} aria-hidden="true" />
      </button>
    </li>
  )
}

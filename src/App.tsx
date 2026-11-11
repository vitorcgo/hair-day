import { useState } from 'react'
import { ScheduleSidebar } from './components/ScheduleSidebar'
import { AppointmentList } from './components/AppointmentList'
import { getLocalDate } from './utils/date'
import type { Appointment, AppointmentInput } from './types/appointment'
import { ThemeToggle } from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState(getLocalDate)
  const [announcement, setAnnouncement] = useState('')

  function addAppointment(input: AppointmentInput) {
    const appointment: Appointment = { ...input, id: crypto.randomUUID() }
    setAppointments((current) => [...current, appointment])
    setAnnouncement(`Agendamento de ${input.clientName} criado para ${input.time}.`)
  }

  function deleteAppointment(id: string) {
    setAppointments((current) => current.filter((appointment) => appointment.id !== id))
    setAnnouncement('Agendamento excluído.')
  }

  // A lista é derivada do estado: não precisamos armazenar uma segunda cópia.
  const visibleAppointments = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .sort((first, second) => first.time.localeCompare(second.time))

  return (
    <div className="relative mx-auto min-h-dvh max-w-400 p-2 sm:p-3 md:grid md:grid-cols-[320px_minmax(0,1fr)] lg:grid-cols-[400px_minmax(0,1fr)] xl:grid-cols-[500px_minmax(0,1fr)]">
      <a className="skip-link" href="#agenda">Ir para a agenda</a>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <ScheduleSidebar onAddAppointment={addAppointment} />
      <AppointmentList
        appointments={visibleAppointments}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onDeleteAppointment={deleteAppointment}
      />
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  )
}

export default App

export type Appointment = {
  id: string
  clientName: string
  date: string // Data local: YYYY-MM-DD.
  time: string // Horário de 24 horas: HH:mm.
}

export type AppointmentInput = Omit<Appointment, 'id'>

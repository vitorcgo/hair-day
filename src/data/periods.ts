import { PiCloudSun, PiMoonStars, PiSunHorizon } from 'react-icons/pi'

export const periods = [
  {
    id: 'morning',
    label: 'Manhã',
    range: '09h–12h',
    icon: PiSunHorizon,
    times: ['09:00', '10:00', '11:00', '12:00'],
  },
  {
    id: 'afternoon',
    label: 'Tarde',
    range: '13h–18h',
    icon: PiCloudSun,
    times: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  },
  {
    id: 'evening',
    label: 'Noite',
    range: '19h–21h',
    icon: PiMoonStars,
    times: ['19:00', '20:00', '21:00'],
  },
]

export type Period = (typeof periods)[number]

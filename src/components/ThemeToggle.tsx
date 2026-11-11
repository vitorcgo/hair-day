import { PiMoonStars, PiSun } from 'react-icons/pi'
import type { Theme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const label = theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
  const Icon = theme === 'dark' ? PiSun : PiMoonStars

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-lg border border-line bg-panel text-accent hover:bg-slot-hover sm:top-6 sm:right-6"
    >
      <Icon size={22} aria-hidden="true" />
    </button>
  )
}

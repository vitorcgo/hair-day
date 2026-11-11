import { PiMoon, PiSun } from 'react-icons/pi'
import type { Theme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const label = theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
  const Icon = theme === 'dark' ? PiMoon : PiSun

  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-label="Tema claro"
      aria-checked={theme === 'light'}
      title={label}
      className="absolute top-4 right-4 z-10 h-10 w-16 shrink-0 rounded-full border border-body/50 bg-body/5 backdrop-blur-[2px] hover:border-body sm:top-6 sm:right-6"
    >
      <span
        className={`absolute top-0.75 left-0.75 flex size-8 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm transition-transform motion-reduce:transition-none ${theme === 'light' ? 'translate-x-6' : 'translate-x-0'}`}
      >
        <Icon size={18} aria-hidden="true" />
      </span>
    </button>
  )
}

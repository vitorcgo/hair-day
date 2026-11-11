import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const date = '2026-11-10'
const emptyMessage = 'Você ainda não tem agendamentos cadastrados nesse período.'

async function addAppointment(page: Page, name: string, time: string, appointmentDate = date) {
  await page.getByLabel('Data', { exact: true }).fill(appointmentDate)
  await page.getByLabel('Cliente', { exact: true }).fill(name)
  await page.locator('form').getByText(time, { exact: true }).click()
  await page.getByRole('button', { name: 'AGENDAR', exact: true }).click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Data da agenda', { exact: true }).fill(date)
})

test('mostra os três períodos vazios e valida campos obrigatórios', async ({ page }) => {
  await expect(page.getByText(emptyMessage, { exact: true })).toHaveCount(3)
  await page.getByLabel('Data', { exact: true }).fill('')
  await page.getByRole('button', { name: 'AGENDAR', exact: true }).click()
  await expect(page.getByText('Selecione uma data válida.')).toBeVisible()
  await expect(page.getByText('Selecione um dos horários disponíveis.')).toBeVisible()
  await expect(page.getByText('Informe o nome do cliente.')).toBeVisible()
  await page.getByLabel('Cliente', { exact: true }).fill('   ')
  await page.getByRole('button', { name: 'AGENDAR', exact: true }).click()
  await expect(page.getByText('Informe o nome do cliente.')).toBeVisible()
  await expect(page.getByRole('listitem')).toHaveCount(0)
})

test('cadastra, agrupa e ordena os limites dos três períodos', async ({ page }) => {
  for (const [name, time] of [
    ['Ana', '12:00'], ['Bruno', '09:00'],
    ['Carla', '18:00'], ['Daniel', '13:00'],
    ['Elisa', '21:00'], ['Fabio', '19:00'],
  ] as const) {
    await addAppointment(page, name, time)
  }

  for (const [period, times] of [
    ['Manhã', ['09:00', '12:00']],
    ['Tarde', ['13:00', '18:00']],
    ['Noite', ['19:00', '21:00']],
  ] as const) {
    const section = page.getByRole('region', { name: period, exact: true })
    await expect(section.locator('time')).toHaveText([...times])
  }
  await expect(page.getByLabel('Cliente', { exact: true })).toHaveValue('')
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0)
})

test('filtra por data e exclui apenas o agendamento escolhido', async ({ page }) => {
  await addAppointment(page, 'Ana', '09:00')
  await addAppointment(page, 'Bruno', '09:00')
  await addAppointment(page, 'Outro dia', '09:00', '2026-11-11')
  await expect(page.getByRole('listitem')).toHaveCount(2)
  await page.getByRole('button', { name: 'Excluir agendamento de Ana às 09:00', exact: true }).click()
  await expect(page.getByRole('listitem')).toHaveCount(1)
  await expect(page.getByRole('listitem')).toContainText('Bruno')
  await page.getByLabel('Data da agenda', { exact: true }).fill('2026-11-11')
  await expect(page.getByRole('listitem')).toHaveCount(1)
  await expect(page.getByRole('listitem')).toContainText('Outro dia')
  await page.getByRole('button', { name: 'Excluir agendamento de Outro dia às 09:00', exact: true }).click()
  await expect(page.getByText(emptyMessage, { exact: true })).toHaveCount(3)
  await page.getByLabel('Data da agenda', { exact: true }).fill(date)
  await expect(page.getByRole('listitem')).toContainText('Bruno')
})

test('switch respeita 64 por 40 px e preserva o formulário e a agenda', async ({ page }) => {
  const toggle = page.getByRole('switch', { name: 'Tema claro', exact: true })
  await expect(toggle).not.toBeChecked()
  const bounds = await toggle.boundingBox()
  expect(bounds?.width).toBe(64)
  expect(bounds?.height).toBe(40)
  await expect(toggle).toHaveCSS('backdrop-filter', 'blur(2px)')
  await expect(toggle.locator('span')).toHaveCSS('background-color', 'rgb(255, 255, 255)')

  await page.getByLabel('Cliente', { exact: true }).fill('Nome em preenchimento')
  await page.locator('form').getByText('10:00', { exact: true }).click()
  await toggle.click()
  await expect(toggle).toBeChecked()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByLabel('Cliente', { exact: true })).toHaveValue('Nome em preenchimento')
  await expect(page.getByRole('radio', { name: '10:00', exact: true })).toBeChecked()
  await addAppointment(page, 'Teste de tema', '10:00')
  await toggle.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('listitem')).toContainText('Teste de tema')
})

test('permite operar horários e switch pelo teclado', async ({ page }) => {
  const first = page.getByRole('radio', { name: '09:00', exact: true })
  await first.focus()
  await first.press('ArrowRight')
  await expect(page.getByRole('radio', { name: '10:00', exact: true })).toBeChecked()
  const name = page.getByLabel('Cliente', { exact: true })
  await name.focus()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'AGENDAR', exact: true })).toBeFocused()
  const toggle = page.getByRole('switch', { name: 'Tema claro', exact: true })
  await toggle.focus()
  await page.keyboard.press('Space')
  await expect(toggle).toBeChecked()
})

test('acomoda nomes longos e erros sem rolagem horizontal', async ({ page }) => {
  await addAppointment(page, 'ClienteComNomeMuitoLongoSemEspacos'.repeat(8), '11:00')
  await page.getByRole('button', { name: 'AGENDAR', exact: true }).click()
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await expect(page.getByRole('listitem')).toHaveCount(1)
  }
})

test('registra capturas desktop e mobile nos dois temas', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await addAppointment(page, 'Ryan Dorwart', '11:00')
  await addAppointment(page, 'Livia Curtis', '13:00')
  await addAppointment(page, 'Randy Calzoni', '14:00')
  await addAppointment(page, 'Marley Franci', '16:00')
  await addAppointment(page, 'Jaylon Korsgaard', '17:00')
  await addAppointment(page, 'Maria Herwitz', '21:00')
  await page.getByLabel('Cliente', { exact: true }).fill('Helena Souza')
  await page.locator('form').getByText('20:00', { exact: true }).click()
  await page.evaluate(() => document.fonts.ready)

  const folder = path.resolve('docs/screenshots')
  await mkdir(folder, { recursive: true })
  for (const theme of ['dark', 'light']) {
    const toggle = page.getByRole('switch', { name: 'Tema claro', exact: true })
    if (theme === 'light') await toggle.click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    // Evita capturar o indicador no meio da transição.
    await toggle.locator('span').evaluate(async (element) => {
      await Promise.all(element.getAnimations().map((animation) => animation.finished))
    })
    await page.mouse.move(0, 0)
    const file = path.join(folder, `${testInfo.project.name}-${theme}.png`)
    await page.screenshot({ path: file, fullPage: true })
    await testInfo.attach(`${testInfo.project.name}-${theme}`, { path: file, contentType: 'image/png' })
  }
  expect(errors).toEqual([])
})

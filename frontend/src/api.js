// Cliente base para hablar con el backend de Django.
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`)
  const data = await res.json().catch(() => null)
  if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { data })
  return data
}

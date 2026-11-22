import { useEffect, useState } from 'react'
import { API_URL, apiGet } from './api.js'

export default function App() {
  const [estado, setEstado] = useState({ cargando: true })

  useEffect(() => {
    apiGet('/api/health/')
      .then((data) => setEstado({ data }))
      .catch((err) => setEstado({ error: err.message, data: err.data }))
  }, [])

  return (
    <main className="contenedor">
      <h1>Inquieras</h1>
      <p>Entorno de desarrollo: React + Vite ⇄ Django ⇄ MySQL (Railway)</p>

      <section className="tarjeta">
        <h2>Estado del sistema</h2>
        <p><strong>API:</strong> {API_URL}</p>
        {estado.cargando && <p>Comprobando conexión…</p>}
        {estado.error && !estado.data && (
          <p className="error">No se pudo contactar al backend ({estado.error}).</p>
        )}
        {estado.data && (
          <>
            <p>Backend: <span className="ok">✔ respondiendo</span></p>
            <p>
              Base de datos:{' '}
              {estado.data.database?.ok ? (
                <span className="ok">✔ {estado.data.database.motor} {estado.data.database.version}</span>
              ) : (
                <span className="error">✘ {estado.data.database?.error}</span>
              )}
            </p>
          </>
        )}
      </section>
    </main>
  )
}

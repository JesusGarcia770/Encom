import { Platform } from 'react-native'

// La app corre en un dispositivo/emulador, no en el navegador, así que
// "localhost" no apunta al backend: hay que usar la IP de la máquina donde
// corre `npm run dev` del backend (o 10.0.2.2 en el emulador de Android).
//
// Para no tocar código: crea un archivo `.env` en Movil/ con
//   EXPO_PUBLIC_API_URL=http://192.168.1.X:4000/api
// (Expo inyecta automáticamente las variables EXPO_PUBLIC_*).
const DEV_FALLBACK = Platform.select({
  android: 'http://10.0.2.2:4000/api',
  default: 'http://localhost:4000/api',
})

export const API_URL = process.env.EXPO_PUBLIC_API_URL || DEV_FALLBACK

// URL pública del checkout de Wompi configurada en el backend (FRONTEND_URL).
// Se usa para reconocer, dentro del WebView de pago, cuándo Wompi redirige
// de vuelta y así interceptar esa navegación en vez de dejar que abra la web.
export const CHECKOUT_RETURN_PATH = '/checkout/return'

const REQUEST_TIMEOUT = 10000

// `fetch` no falla solo si el backend es inalcanzable (IP equivocada, WiFi
// distinta a la del backend, firewall bloqueando el puerto): se queda
// colgado para siempre. Eso es lo que hace que la app "no pase" de la
// pantalla de carga inicial (GET /auth/me nunca resuelve). Este wrapper
// aborta la petición a los 10s para que todas las pantallas puedan
// mostrar un error en vez de quedarse esperando indefinidamente.
export async function apiFetch(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

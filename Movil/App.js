import { useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './src/context/AuthContext'
import { CartProvider } from './src/context/CartContext'
import { useAuth } from './src/hooks/useAuth'
import RootNavigator from './src/navigation/RootNavigator'
import LoadingScreen from './src/components/LoadingScreen'

// El splash nativo (fondo "ink" liso, ver app.json) se queda visible hasta
// que las tipografías terminan de cargar. Justo después, <AppGate> muestra
// la pantalla de carga propia de ENCOM mientras se resuelve la sesión, así
// nunca hay un salto brusco entre el splash y la app.
SplashScreen.preventAutoHideAsync().catch(() => {})

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  useEffect(() => {
    onLayoutRootView()
  }, [onLayoutRootView])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <AppGate />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

function AppGate() {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
    </>
  )
}

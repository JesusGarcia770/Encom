import { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { confirmCheckoutReturn } from '../api/checkout'
import { CHECKOUT_RETURN_PATH } from '../api/config'
import { useCart } from '../hooks/useCart'
import { colors } from '../theme/colors'

// Wompi redirige el navegador a `${FRONTEND_URL}/checkout/return?...` cuando
// el pago termina. Como no hay navegador de por medio, interceptamos esa
// navegación dentro del propio WebView, leemos los query params y llamamos
// a la misma API que usa la web (`/checkout/return`) para confirmar el pago.
export default function CheckoutWebViewScreen({ route, navigation }) {
  const { checkoutUrl } = route.params
  const { reload } = useCart()
  const [loading, setLoading] = useState(true)
  const handledRef = useRef(false)

  const handleReturn = useCallback(async (url) => {
    if (handledRef.current) return
    handledRef.current = true

    const [, queryString] = url.split('?')
    const params = Object.fromEntries(new URLSearchParams(queryString || ''))

    try {
      const data = await confirmCheckoutReturn(params)
      reload()
      navigation.replace('CheckoutResult', { status: data.status })
    } catch (err) {
      navigation.replace('CheckoutResult', { status: 'error', error: err.message })
    }
  }, [navigation, reload])

  const handleNavigationChange = (navState) => {
    if (navState.url.includes(CHECKOUT_RETURN_PATH)) {
      handleReturn(navState.url)
    }
  }

  return (
    <View style={styles.screen}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.action} />
        </View>
      )}
      <WebView
        source={{ uri: checkoutUrl }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationChange}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.includes(CHECKOUT_RETURN_PATH)) {
            handleReturn(request.url)
            return false
          }
          return true
        }}
        startInLoadingState
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  loader: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: colors.surface,
  },
})

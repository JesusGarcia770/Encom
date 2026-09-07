import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import { colors, font } from '../theme/colors'

// Pantalla de carga propia de ENCOM: se muestra justo después del splash
// nativo (fondo "ink" liso) mientras cargan las tipografías y se resuelve
// la sesión. El acento ámbar se anima para que no se sienta como un
// spinner genérico.
export default function LoadingScreen() {
  const widthAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start()
  }, [widthAnim])

  return (
    <View style={styles.screen}>
      <View style={styles.mark}>
        <Text style={styles.wordmark}>
          EN<Text style={styles.wordmarkAccent}>COM</Text>
        </Text>
        <Animated.View
          style={[
            styles.rule,
            { width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
          ]}
        />
        <Text style={styles.tagline}>Tecnología para El Salvador</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: { alignItems: 'center', width: 220 },
  wordmark: {
    fontFamily: 'System',
    fontWeight: '800',
    fontSize: 30,
    letterSpacing: 2,
    color: colors.textOnInk,
  },
  wordmarkAccent: { color: colors.signal },
  rule: {
    height: 2,
    backgroundColor: colors.signal,
    marginTop: 14,
    marginBottom: 10,
  },
  tagline: {
    fontFamily: 'System',
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.textOnInkMuted,
    textTransform: 'uppercase',
  },
})

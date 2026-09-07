import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PrimaryButton from '../components/PrimaryButton'
import { colors, font, spacing } from '../theme/colors'

const CONTENT = {
  paid: {
    icon: 'check',
    tone: colors.success,
    toneBg: colors.successBg,
    title: '¡Compra realizada!',
    text: 'Tu pago fue aprobado y tu pedido está siendo procesado.',
    cta: 'Seguir comprando',
    target: 'Catálogo',
  },
  failed: {
    icon: 'x',
    tone: colors.danger,
    toneBg: colors.dangerBg,
    title: 'El pago no fue aprobado',
    text: 'Tu transacción fue rechazada o no se completó. Puedes intentar de nuevo.',
    cta: 'Volver al carrito',
    target: 'Carrito',
  },
  error: {
    icon: 'x',
    tone: colors.danger,
    toneBg: colors.dangerBg,
    title: 'No pudimos confirmar el pago',
    text: '',
    cta: 'Volver al carrito',
    target: 'Carrito',
  },
}

export default function CheckoutResultScreen({ route, navigation }) {
  const { status, error } = route.params || {}
  const content = CONTENT[status] || CONTENT.error

  const goHome = () => navigation.replace('MainTabs', { screen: content.target })

  return (
    <View style={styles.screen}>
      <View style={[styles.iconWrap, { backgroundColor: content.toneBg }]}>
        <Feather name={content.icon} size={30} color={content.tone} />
      </View>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.text}>{error || content.text}</Text>
      <PrimaryButton title={content.cta} onPress={goHome} style={{ marginTop: spacing.xl, minWidth: 220 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  iconWrap: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { fontFamily: font.bold, fontSize: 19, color: colors.text, textAlign: 'center', marginBottom: spacing.sm },
  text: { fontFamily: font.regular, fontSize: 13.5, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
})

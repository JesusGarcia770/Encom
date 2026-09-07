import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { colors, font, radius, spacing, type } from '../theme/colors'

// Estructura compartida por login / registro / recuperar / restablecer:
// un panel de marca oscuro arriba (fijo, con el wordmark) y una "hoja"
// clara debajo que se le monta encima (radio solo en las esquinas
// superiores). Nada de tarjeta centrada flotando sobre un fondo con
// gradiente — el contraste ink/sheet hace de marco.
export default function AuthShell({ navigation, eyebrow, title, subtitle, children, footer }) {
  const insets = useSafeAreaInsets()
  const canGoBack = navigation?.canGoBack?.()

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={[styles.inkPanel, { paddingTop: insets.top + spacing.md }]}>
        {canGoBack ? (
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
            <Feather name="arrow-left" size={20} color={colors.textOnInk} />
          </Pressable>
        ) : null}
        <Text style={styles.wordmark}>
          EN<Text style={styles.wordmarkAccent}>COM</Text>
        </Text>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.sheet}
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={type.h1}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

          {children}

          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.ink },
  flex: { flex: 1 },
  inkPanel: {
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  backBtn: { marginBottom: spacing.lg, alignSelf: 'flex-start' },
  wordmark: {
    fontFamily: font.extrabold,
    fontSize: 20,
    letterSpacing: 2,
    color: colors.textOnInk,
  },
  wordmarkAccent: { color: colors.signal },
  eyebrow: {
    fontFamily: font.medium,
    fontSize: 11,
    letterSpacing: 0.6,
    color: colors.textOnInkMuted,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    marginTop: -20,
  },
  sheetContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  subtitle: {
    ...type.bodySm,
    marginTop: 6,
    marginBottom: spacing.xl,
  },
  footer: { marginTop: spacing.lg, alignItems: 'center' },
})

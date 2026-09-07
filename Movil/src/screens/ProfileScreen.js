import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PrimaryButton from '../components/PrimaryButton'
import { useAuth } from '../hooks/useAuth'
import { colors, font, radius, spacing } from '../theme/colors'

export default function ProfileScreen({ navigation }) {
  const { user, loading, logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.action} size="large" />
      </View>
    )
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <View style={styles.guestIcon}>
          <Feather name="user" size={26} color={colors.textFaint} />
        </View>
        <Text style={styles.title}>Aún no has iniciado sesión</Text>
        <Text style={styles.sub}>Inicia sesión para ver tu perfil y tus compras.</Text>
        <PrimaryButton title="Iniciar sesión" onPress={() => navigation.navigate('Login')} style={{ marginTop: spacing.xl, minWidth: 220 }} />
        <PrimaryButton title="Crear cuenta" variant="text" onPress={() => navigation.navigate('Register')} style={{ marginTop: spacing.xs }} />
      </View>
    )
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerBlock}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name?.[0]?.toUpperCase() || '?'}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.list}>
        <View style={styles.listRow}>
          <Feather name="mail" size={16} color={colors.textMuted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowLabel}>Correo</Text>
            <Text style={styles.rowValue}>{user.email}</Text>
          </View>
        </View>
        {user.phone ? (
          <>
            <View style={styles.rowDivider} />
            <View style={styles.listRow}>
              <Feather name="phone" size={16} color={colors.textMuted} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>Teléfono</Text>
                <Text style={styles.rowValue}>{user.phone}</Text>
              </View>
            </View>
          </>
        ) : null}
      </View>

      <PrimaryButton
        title={loggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
        variant="outline"
        onPress={handleLogout}
        loading={loggingOut}
        style={{ marginHorizontal: spacing.xl, marginTop: spacing.xl }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, backgroundColor: colors.surface },
  screen: { flex: 1, backgroundColor: colors.surface, paddingTop: spacing.xl },
  guestIcon: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { fontFamily: font.bold, fontSize: 17, color: colors.text, marginBottom: 6 },
  sub: { fontFamily: font.regular, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  headerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.ink,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: colors.signal, fontFamily: font.extrabold, fontSize: 22 },
  name: { fontFamily: font.bold, fontSize: 17, color: colors.text },
  email: { fontFamily: font.regular, fontSize: 12.5, color: colors.textMuted, marginTop: 2 },
  list: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  rowDivider: { height: 1, backgroundColor: colors.divider },
  rowLabel: { fontFamily: font.medium, fontSize: 10.5, letterSpacing: 0.4, textTransform: 'uppercase', color: colors.textFaint },
  rowValue: { fontFamily: font.regular, fontSize: 14, color: colors.text, marginTop: 2 },
})

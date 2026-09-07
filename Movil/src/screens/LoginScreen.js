import { useState } from 'react'
import { Text, View } from 'react-native'
import AuthShell from '../components/AuthShell'
import FormInput from '../components/FormInput'
import PrimaryButton from '../components/PrimaryButton'
import { useAuth } from '../hooks/useAuth'
import { colors, font, spacing } from '../theme/colors'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginScreen({ navigation }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    const nextFieldErrors = {}
    if (!form.email) nextFieldErrors.email = 'Ingresa tu correo.'
    else if (!EMAIL_REGEX.test(form.email)) nextFieldErrors.email = 'Correo inválido.'
    if (!form.password) nextFieldErrors.password = 'Ingresa tu contraseña.'

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      return
    }
    setFieldErrors({})

    setLoading(true)
    try {
      await login(form.email, form.password)
      navigation.replace('MainTabs')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      navigation={navigation}
      eyebrow="Bienvenido de vuelta"
      title="Inicia sesión"
      subtitle="Entra con tu cuenta para ver tu carrito y tus pedidos."
      footer={
        <Text style={{ fontFamily: font.regular, fontSize: 13, color: colors.textMuted }}>
          ¿No tienes una cuenta?{' '}
          <Text style={{ fontFamily: font.bold, color: colors.action }} onPress={() => navigation.navigate('Register')}>
            Regístrate
          </Text>
        </Text>
      }
    >
      <FormInput
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        value={form.email}
        error={fieldErrors.email}
        onChangeText={t => setForm(f => ({ ...f, email: t }))}
      />
      <FormInput
        label="Contraseña"
        placeholder="••••••••"
        secureToggle
        value={form.password}
        error={fieldErrors.password}
        onChangeText={t => setForm(f => ({ ...f, password: t }))}
      />

      <Text
        style={{ alignSelf: 'flex-end', fontFamily: font.medium, fontSize: 12.5, color: colors.textMuted, marginTop: -8, marginBottom: spacing.xl }}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        ¿Olvidaste tu contraseña?
      </Text>

      {error ? (
        <View style={{ backgroundColor: colors.dangerBg, borderRadius: 8, padding: 12, marginBottom: spacing.lg }}>
          <Text style={{ fontFamily: font.medium, fontSize: 13, color: colors.danger }}>{error}</Text>
        </View>
      ) : null}

      <PrimaryButton title={loading ? 'Ingresando...' : 'Iniciar sesión'} onPress={handleSubmit} loading={loading} />
    </AuthShell>
  )
}

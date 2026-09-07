import { useState } from 'react'
import { Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import AuthShell from '../components/AuthShell'
import FormInput from '../components/FormInput'
import PrimaryButton from '../components/PrimaryButton'
import { forgotPassword } from '../api/auth'
import { colors, font, spacing } from '../theme/colors'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [fieldError, setFieldError] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!email || !EMAIL_REGEX.test(email)) {
      setFieldError('Ingresa un correo válido.')
      return
    }
    setFieldError('')
    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <AuthShell navigation={navigation} eyebrow="Recuperar acceso" title="Revisa tu correo">
        <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
          <View style={{
            width: 56, height: 56, borderRadius: 28,
            backgroundColor: colors.successBg,
            alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
          }}>
            <Feather name="mail" size={24} color={colors.success} />
          </View>
          <Text style={{ fontFamily: font.regular, fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 21, marginBottom: spacing.xl }}>
            Enviamos un enlace de recuperación a{'\n'}
            <Text style={{ fontFamily: font.bold, color: colors.text }}>{email}</Text>. Puede tardar unos minutos.
          </Text>
          <PrimaryButton title="Volver al inicio de sesión" onPress={() => navigation.navigate('Login')} style={{ width: '100%' }} />
          <Text
            style={{ fontFamily: font.medium, fontSize: 12.5, color: colors.textMuted, marginTop: spacing.lg }}
            onPress={() => setSent(false)}
          >
            ¿No llegó? Reenviar correo
          </Text>
        </View>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      navigation={navigation}
      eyebrow="Recuperar acceso"
      title="Recuperar contraseña"
      subtitle="Ingresa tu correo y te enviaremos un enlace para restablecerla."
    >
      <FormInput
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        value={email}
        error={fieldError}
        onChangeText={setEmail}
      />

      {error ? (
        <View style={{ backgroundColor: colors.dangerBg, borderRadius: 8, padding: 12, marginBottom: spacing.lg }}>
          <Text style={{ fontFamily: font.medium, fontSize: 13, color: colors.danger }}>{error}</Text>
        </View>
      ) : null}

      <PrimaryButton title={loading ? 'Enviando...' : 'Enviar enlace'} onPress={handleSubmit} loading={loading} />
    </AuthShell>
  )
}

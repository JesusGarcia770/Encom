import { useState } from 'react'
import { Text, View } from 'react-native'
import AuthShell from '../components/AuthShell'
import FormInput from '../components/FormInput'
import PrimaryButton from '../components/PrimaryButton'
import { resetPassword } from '../api/auth'
import { useAuth } from '../hooks/useAuth'
import { colors, font, spacing } from '../theme/colors'

// El correo de recuperación abre un enlace web con el token en la URL
// (/reset-password/:token). La app no maneja ese deep link todavía, así
// que aquí se pega el código a mano — el mismo dato, sin salir de la app.
export default function ResetPasswordScreen({ navigation }) {
  const { setUser } = useAuth()
  const [form, setForm] = useState({ token: '', password: '', confirmar: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    const nextFieldErrors = {}
    if (!form.token) nextFieldErrors.token = 'Pega el código del correo.'
    if (!form.password) nextFieldErrors.password = 'Ingresa una contraseña.'
    else if (form.password.length < 6) nextFieldErrors.password = 'Mínimo 6 caracteres.'
    if (!form.confirmar) nextFieldErrors.confirmar = 'Confirma tu contraseña.'
    else if (form.password && form.password !== form.confirmar) nextFieldErrors.confirmar = 'Las contraseñas no coinciden.'

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      return
    }
    setFieldErrors({})

    setLoading(true)
    try {
      const data = await resetPassword(form.token, form.password)
      setUser(data.user)
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
      eyebrow="Último paso"
      title="Nueva contraseña"
      subtitle="Pega el código del enlace que recibiste por correo."
    >
      <FormInput
        label="Código del enlace"
        placeholder="Pega aquí el código"
        value={form.token}
        error={fieldErrors.token}
        onChangeText={t => setForm(f => ({ ...f, token: t }))}
      />
      <FormInput
        label="Nueva contraseña"
        placeholder="Mínimo 6 caracteres"
        secureToggle
        value={form.password}
        error={fieldErrors.password}
        onChangeText={t => setForm(f => ({ ...f, password: t }))}
      />
      <FormInput
        label="Confirmar contraseña"
        placeholder="••••••••"
        secureToggle
        value={form.confirmar}
        error={fieldErrors.confirmar}
        onChangeText={t => setForm(f => ({ ...f, confirmar: t }))}
      />

      {error ? (
        <View style={{ backgroundColor: colors.dangerBg, borderRadius: 8, padding: 12, marginBottom: spacing.lg }}>
          <Text style={{ fontFamily: font.medium, fontSize: 13, color: colors.danger }}>{error}</Text>
        </View>
      ) : null}

      <PrimaryButton title={loading ? 'Guardando...' : 'Restablecer contraseña'} onPress={handleSubmit} loading={loading} />
    </AuthShell>
  )
}

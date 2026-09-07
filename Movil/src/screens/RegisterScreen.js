import { useState } from 'react'
import { Text, View } from 'react-native'
import AuthShell from '../components/AuthShell'
import FormInput from '../components/FormInput'
import PrimaryButton from '../components/PrimaryButton'
import { useAuth } from '../hooks/useAuth'
import { colors, font, spacing } from '../theme/colors'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    const nextFieldErrors = {}
    if (!form.nombre) nextFieldErrors.nombre = 'Ingresa tu nombre.'
    if (!form.email) nextFieldErrors.email = 'Ingresa tu correo.'
    else if (!EMAIL_REGEX.test(form.email)) nextFieldErrors.email = 'Correo inválido.'
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
      await register({ name: form.nombre, email: form.email, password: form.password })
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
      eyebrow="Únete a ENCOM"
      title="Crea tu cuenta"
      subtitle="Guarda tu carrito y revisa tus compras desde cualquier lugar."
      footer={
        <Text style={{ fontFamily: font.regular, fontSize: 13, color: colors.textMuted }}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={{ fontFamily: font.bold, color: colors.action }} onPress={() => navigation.navigate('Login')}>
            Inicia sesión
          </Text>
        </Text>
      }
    >
      <FormInput
        label="Nombre"
        placeholder="Tu nombre"
        value={form.nombre}
        error={fieldErrors.nombre}
        onChangeText={t => setForm(f => ({ ...f, nombre: t }))}
      />
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

      <PrimaryButton title={loading ? 'Creando cuenta...' : 'Registrarme'} onPress={handleSubmit} loading={loading} />
    </AuthShell>
  )
}

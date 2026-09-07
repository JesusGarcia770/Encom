import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors, font } from '../theme/colors'

// Input de línea (sin caja, sin relleno gris): el foco se marca engrosando
// y coloreando la línea inferior, no metiendo el campo en una tarjeta.
export default function FormInput({ label, secureToggle, error, style, ...props }) {
  const [hidden, setHidden] = useState(Boolean(secureToggle))
  const [focused, setFocused] = useState(false)

  return (
    <View style={[styles.group, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrap, focused && styles.inputWrapFocused, error && styles.inputWrapError]}>
        <TextInput
          style={[styles.input, secureToggle && { paddingRight: 34 }]}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureToggle ? hidden : props.secureTextEntry}
          autoCapitalize="none"
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          {...props}
        />
        {secureToggle && (
          <Pressable style={styles.eyeBtn} onPress={() => setHidden(h => !h)} hitSlop={8}>
            <Feather name={hidden ? 'eye' : 'eye-off'} size={17} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  group: { marginBottom: 20 },
  label: {
    fontFamily: font.medium,
    fontSize: 11.5,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: 8,
  },
  inputWrap: {
    position: 'relative',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
  },
  inputWrapFocused: { borderBottomColor: colors.action },
  inputWrapError: { borderBottomColor: colors.danger },
  input: {
    paddingVertical: 10,
    fontFamily: font.regular,
    fontSize: 15.5,
    color: colors.text,
  },
  eyeBtn: {
    position: 'absolute',
    right: 2,
    padding: 6,
  },
  errorText: {
    fontFamily: font.medium,
    fontSize: 11.5,
    color: colors.danger,
    marginTop: 6,
  },
})

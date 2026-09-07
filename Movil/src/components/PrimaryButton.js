import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'
import { colors, font, radius } from '../theme/colors'

// Único color interactivo de la app (colors.action): que un botón sea azul
// significa "esto se puede tocar", en toda pantalla, sin excepción.
export default function PrimaryButton({ title, onPress, loading, disabled, variant = 'solid', style }) {
  const isOutline = variant === 'outline'
  const isText = variant === 'text'

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isText && styles.text,
        isOutline && styles.outline,
        !isOutline && !isText && styles.solid,
        (disabled || loading) && !isOutline && !isText && styles.disabled,
        pressed && !disabled && !loading && !isText && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline || isText ? colors.action : '#fff'} />
      ) : (
        <Text
          style={[
            styles.label,
            isOutline && styles.labelOutline,
            isText && styles.labelText,
            !isOutline && !isText && styles.labelSolid,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 15,
    borderRadius: radius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: { backgroundColor: colors.action },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.action,
  },
  text: { paddingVertical: 8 },
  disabled: { backgroundColor: colors.disabled },
  pressed: { backgroundColor: colors.actionPressed },
  label: { fontFamily: font.bold, fontSize: 15, letterSpacing: 0.2 },
  labelSolid: { color: '#fff' },
  labelOutline: { color: colors.action },
  labelText: { color: colors.action, fontSize: 13.5 },
})

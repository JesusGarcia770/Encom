// Sistema de diseño ENCOM — mobile.
//
// Cada color existe para cumplir un rol, no como decoración:
//   ink      -> superficie de marca (paneles oscuros, tab bar, headers)
//   action   -> el ÚNICO color interactivo (botones primarios, links, foco)
//   signal   -> acento cálido para énfasis puntual (precios, insignias, carga)
// El resto son neutros cálidos (no el gris azulado típico de UI kits).

export const colors = {
  ink: '#111820',
  inkSoft: '#1C2530',
  action: '#2C5CF6',
  actionPressed: '#2247C7',
  signal: '#FFB020',
  signalDeep: '#B4790E',

  bg: '#F5F4F1',
  surface: '#FFFFFF',
  surfaceSunken: '#ECEAE4',

  text: '#14161A',
  textMuted: '#6B6F76',
  textFaint: '#9A9DA3',
  textOnInk: '#F5F4F1',
  textOnInkMuted: 'rgba(245,244,241,0.62)',

  border: '#E3E1DB',
  borderOnInk: 'rgba(245,244,241,0.16)',
  divider: '#EDEBE5',

  success: '#1E8E5A',
  successBg: '#E8F4EC',
  warning: '#B4790E',
  warningBg: '#FBF1DF',
  danger: '#C13A2E',
  dangerBg: '#FBEAE8',

  disabled: '#C7C5BE',
  placeholder: 'rgba(20,22,26,0.35)',
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
}

// Radios deliberadamente desiguales: nada de "todo con el mismo rounded-xl".
export const radius = {
  hairline: 2,   // imágenes de producto, superficies "de catálogo"
  control: 10,   // botones, inputs, chips rectangulares
  soft: 18,       // paneles grandes (hero, resumen de carrito) — deliberadamente distinto a "control"
  pill: 999,     // etiquetas, badges
  sheet: 28,     // panel inferior tipo hoja en pantallas de auth (solo esquinas superiores)
}

export const font = {
  regular: 'Manrope_500Medium',
  medium: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extrabold: 'Manrope_800ExtraBold',
}

// Escala tipográfica con jerarquía real (no todo en 14/16).
export const type = {
  display: { fontFamily: font.extrabold, fontSize: 32, lineHeight: 38, color: colors.text },
  h1: { fontFamily: font.bold, fontSize: 22, lineHeight: 28, color: colors.text },
  h2: { fontFamily: font.bold, fontSize: 17, lineHeight: 22, color: colors.text },
  body: { fontFamily: font.regular, fontSize: 15, lineHeight: 22, color: colors.text },
  bodySm: { fontFamily: font.regular, fontSize: 13, lineHeight: 19, color: colors.textMuted },
  label: { fontFamily: font.medium, fontSize: 12.5, lineHeight: 16, color: colors.text },
  eyebrow: {
    fontFamily: font.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.1,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  micro: { fontFamily: font.medium, fontSize: 10.5, lineHeight: 13, color: colors.textFaint },
}

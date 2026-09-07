import { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PrimaryButton from '../components/PrimaryButton'
import { useCart } from '../hooks/useCart'
import { colors, font, spacing } from '../theme/colors'

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params
  const { addItem, isPending } = useCart()
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  const pending = isPending(product._id)
  const outOfStock = product.stock <= 0

  const handleAdd = async () => {
    setError('')
    try {
      await addItem(product._id)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <View style={styles.imgWrap}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Feather name="image" size={32} color={colors.textFaint} />
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>

        <View style={styles.stockRow}>
          <Feather
            name={outOfStock ? 'x-circle' : 'check-circle'}
            size={13}
            color={outOfStock ? colors.danger : colors.success}
          />
          <Text style={[styles.stock, outOfStock && { color: colors.danger }]}>
            {outOfStock ? 'Sin existencias' : `${product.stock} disponibles`}
          </Text>
        </View>

        {product.description ? (
          <>
            <View style={styles.divider} />
            <Text style={styles.descLabel}>Descripción</Text>
            <Text style={styles.desc}>{product.description}</Text>
          </>
        ) : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton
          title={outOfStock ? 'Agotado' : added ? 'Agregado al carrito' : 'Agregar al carrito'}
          onPress={handleAdd}
          disabled={outOfStock}
          loading={pending}
          style={{ marginTop: spacing.xl }}
        />
        <PrimaryButton
          title="Ir al carrito"
          variant="text"
          onPress={() => navigation.navigate('MainTabs', { screen: 'Carrito' })}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  imgWrap: { height: 280, backgroundColor: colors.surfaceSunken },
  img: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  body: { padding: spacing.xl },
  name: { fontFamily: font.bold, fontSize: 21, color: colors.text, marginBottom: 6 },
  price: { fontFamily: font.extrabold, fontSize: 24, color: colors.text, marginBottom: 12 },
  stockRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stock: { fontFamily: font.medium, fontSize: 12.5, color: colors.success },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.lg },
  descLabel: { fontFamily: font.bold, fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase', color: colors.textMuted, marginBottom: 8 },
  desc: { fontFamily: font.regular, fontSize: 14, color: colors.text, lineHeight: 21 },
  error: { fontFamily: font.medium, fontSize: 12, color: colors.danger, marginTop: 10 },
})

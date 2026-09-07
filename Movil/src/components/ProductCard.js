import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useCart } from '../hooks/useCart'
import { colors, font, radius } from '../theme/colors'

export default function ProductCard({ product, onPress }) {
  const { addItem, isPending } = useCart()
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  const pending = isPending(product._id)
  const outOfStock = product.stock <= 0

  const handleAddCart = async () => {
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
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imgWrap}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Feather name="image" size={22} color={colors.textFaint} />
          </View>
        )}
        {outOfStock && (
          <View style={styles.stockTag}>
            <Text style={styles.stockTagText}>Agotado</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        {product.description ? (
          <Text style={styles.desc} numberOfLines={2}>{product.description}</Text>
        ) : null}

        <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.btn, (pending || outOfStock) && styles.btnDisabled, added && styles.btnAdded]}
          onPress={handleAddCart}
          disabled={pending || outOfStock}
        >
          {added ? <Feather name="check" size={14} color="#fff" style={{ marginRight: 5 }} /> : null}
          <Text style={styles.btnText}>
            {outOfStock ? 'Agotado' : pending ? 'Agregando...' : added ? 'Agregado' : 'Agregar'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.hairline,
    overflow: 'hidden',
  },
  imgWrap: {
    height: 130,
    backgroundColor: colors.surfaceSunken,
  },
  img: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  stockTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.ink,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.hairline,
  },
  stockTagText: { fontFamily: font.bold, fontSize: 9.5, color: colors.textOnInk, letterSpacing: 0.3 },
  body: { padding: 12 },
  name: { fontFamily: font.medium, fontSize: 13.5, color: colors.text, marginBottom: 2 },
  desc: { fontFamily: font.regular, fontSize: 11, color: colors.textMuted, marginBottom: 6, lineHeight: 15 },
  price: { fontFamily: font.extrabold, fontSize: 16, color: colors.text, marginBottom: 10 },
  error: { fontFamily: font.medium, fontSize: 11, color: colors.danger, marginBottom: 6 },
  btn: {
    flexDirection: 'row',
    backgroundColor: colors.action,
    borderRadius: radius.control,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: { backgroundColor: colors.disabled },
  btnAdded: { backgroundColor: colors.success },
  btnText: { color: '#fff', fontFamily: font.bold, fontSize: 12.5, letterSpacing: 0.2 },
})
